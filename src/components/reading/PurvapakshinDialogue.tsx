'use client';

/**
 * PurvapakshinDialogue — the client-side dialogue surface for the
 * purvapakshin engine. Plumbing only: a transcript display, an input box,
 * a "request siddhānta response" button.
 *
 * Authority and constraints:
 *
 *   - NO PERSISTENCE. Transcript state is held in React. Closing the tab
 *     loses the conversation. The svadhyaya notebook (a separate track)
 *     is the only place transcripts may eventually be saved, and only
 *     when the learner explicitly chooses to keep one.
 *
 *   - NO TELEMETRY, NO STREAKS, NO NUDGES. (vision Part I.3 and Part XI)
 *
 *   - PROVENANCE ON EVERY PURVAPAKSHIN TURN. The route returns a `meta`
 *     event with `position_id`, `thinker`, `source_text`. The component
 *     renders these inline so the learner sees the source binding. A
 *     turn with `position_id === null` is a refusal or a malformed turn
 *     — surfaced as such, NOT as a normal objection.
 */

import { useCallback, useMemo, useRef, useState } from 'react';
import type {
  DialogueMessage,
  DialogueStreamEvent,
} from '@/lib/purvapakshin/types';

type Turn =
  | { role: 'learner'; text: string }
  | {
      role: 'purvapakshin';
      text: string;
      position_id: string | null;
      thinker?: string;
      source_text?: string;
      pending: boolean;
    }
  | {
      role: 'siddhanta';
      text: string;
      stub: boolean;
      position_id?: string | null;
    };

export type PurvapakshinDialogueProps = {
  conceptSlug: string;
  /**
   * Optional id of an approved purvapaksa position to argue from. If
   * supplied the engine is constrained to that position; if omitted the
   * engine selects from whatever is approved for this concept.
   */
  requestedPositionId?: string;
};

export function PurvapakshinDialogue({
  conceptSlug,
  requestedPositionId,
}: PurvapakshinDialogueProps) {
  const [transcript, setTranscript] = useState<Turn[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  /**
   * Build the wire-format messages to send to the route. Internal Turn
   * objects carry extra UI state; here we project to the schema-shaped
   * DialogueMessage list.
   */
  const wireMessages = useCallback(
    (extra?: DialogueMessage): DialogueMessage[] => {
      const base: DialogueMessage[] = transcript
        .filter((t) => !(t.role === 'purvapakshin' && t.pending))
        .map((t) => {
          if (t.role === 'purvapakshin') {
            const msg: DialogueMessage = { role: 'purvapakshin', text: t.text };
            if (t.position_id) msg.position_id = t.position_id;
            return msg;
          }
          if (t.role === 'siddhanta') {
            return { role: 'siddhanta', text: t.text };
          }
          return { role: 'learner', text: t.text };
        });
      return extra ? [...base, extra] : base;
    },
    [transcript],
  );

  const sendLearnerTurn = useCallback(async () => {
    const text = input.trim();
    if (!text || busy) return;
    const learner: DialogueMessage = { role: 'learner', text };
    setInput('');
    setError(null);
    setTranscript((t) => [
      ...t,
      { role: 'learner', text },
      {
        role: 'purvapakshin',
        text: '',
        position_id: null,
        pending: true,
      },
    ]);
    setBusy(true);

    const messages = wireMessages(learner);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/purvapakshin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conceptSlug,
          messages,
          requestedPositionId,
        }),
        signal: controller.signal,
      });

      if (res.status === 503) {
        setError(
          'The purvapakshin is offline (no ANTHROPIC_API_KEY in this environment).',
        );
        // Drop the pending bubble.
        setTranscript((t) =>
          t.filter((x) => !(x.role === 'purvapakshin' && x.pending)),
        );
        return;
      }
      if (!res.ok || !res.body) {
        const detail = await safeReadError(res);
        setError(detail);
        setTranscript((t) =>
          t.filter((x) => !(x.role === 'purvapakshin' && x.pending)),
        );
        return;
      }

      await consumeStream(res.body, (evt) => {
        if (evt.type === 'delta') {
          setTranscript((t) => appendDelta(t, evt.text));
        } else if (evt.type === 'meta') {
          setTranscript((t) =>
            attachMeta(t, evt.position_id, evt.thinker, evt.source_text),
          );
        } else if (evt.type === 'done') {
          setTranscript((t) => finalizePending(t));
        } else if (evt.type === 'error') {
          setError(evt.message);
          setTranscript((t) =>
            t.filter((x) => !(x.role === 'purvapakshin' && x.pending)),
          );
        }
      });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError((err as Error).message);
      }
      setTranscript((t) =>
        t.filter((x) => !(x.role === 'purvapakshin' && x.pending)),
      );
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }, [busy, conceptSlug, input, requestedPositionId, wireMessages]);

  /**
   * Request the siddhanta side — currently a stub, since the Shridhara
   * gloss corpus is not yet ingested. The route returns a quiet message
   * instead of improvising. (Vision Part VI.)
   */
  const requestSiddhanta = useCallback(async () => {
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const res = await fetch('/api/purvapakshin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conceptSlug,
          messages: wireMessages(),
          requestedPositionId,
          mode: 'siddhanta',
        }),
      });
      if (!res.ok) {
        setError(await safeReadError(res));
        return;
      }
      const data = (await res.json()) as {
        role: 'siddhanta';
        text: string;
        position_id: string | null;
        stub: boolean;
      };
      setTranscript((t) => [
        ...t,
        {
          role: 'siddhanta',
          text: data.text,
          stub: data.stub,
          position_id: data.position_id,
        },
      ]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }, [busy, conceptSlug, requestedPositionId, wireMessages]);

  const headline = useMemo(
    () =>
      requestedPositionId
        ? `Pūrvapakṣin — arguing from ${requestedPositionId}`
        : 'Pūrvapakṣin',
    [requestedPositionId],
  );

  return (
    <section className="purvapakshin-dialogue" aria-label="Pūrvapakṣin dialogue">
      <header>
        <h3>{headline}</h3>
        <p className="hint">
          A respectful opponent voices the classical objection. End every turn
          with the position id it argued from; you decide what to make of the
          objection.
        </p>
      </header>

      <ol className="transcript" aria-live="polite">
        {transcript.map((turn, i) => (
          <li key={i} className={`turn turn-${turn.role}`}>
            <TurnView turn={turn} />
          </li>
        ))}
      </ol>

      {error && (
        <div role="alert" className="dialogue-error">
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void sendLearnerTurn();
        }}
      >
        <label htmlFor="purvapakshin-input" className="sr-only">
          Your reply
        </label>
        <textarea
          id="purvapakshin-input"
          rows={3}
          value={input}
          disabled={busy}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Address the objection, or ask the pūrvapakṣin to clarify."
        />
        <div className="actions">
          <button type="submit" disabled={busy || input.trim().length === 0}>
            {busy ? 'Listening…' : 'Reply'}
          </button>
          <button
            type="button"
            onClick={() => void requestSiddhanta()}
            disabled={busy || transcript.length === 0}
            title="Surface Śrīdhara's reply where available"
          >
            Request siddhānta response
          </button>
        </div>
      </form>
    </section>
  );
}

function TurnView({ turn }: { turn: Turn }) {
  if (turn.role === 'learner') {
    return <p className="learner-text">{turn.text}</p>;
  }
  if (turn.role === 'siddhanta') {
    return (
      <div>
        <p className="siddhanta-text">{turn.text}</p>
        {turn.stub && (
          <p className="provenance-note">
            (stub — Śrīdhara&rsquo;s gloss corpus is not yet ingested)
          </p>
        )}
      </div>
    );
  }
  // purvapakshin
  return (
    <div>
      <p className="purvapakshin-text">
        {turn.text}
        {turn.pending && <span aria-hidden> …</span>}
      </p>
      {!turn.pending && (
        <p className="provenance-note">
          {turn.position_id ? (
            <>
              <span className="position-id">[{turn.position_id}]</span>
              {turn.thinker ? <> &middot; {turn.thinker}</> : null}
              {turn.source_text ? <> &middot; {turn.source_text}</> : null}
            </>
          ) : (
            <span className="no-provenance">
              No approved position cited — treat as refusal, not as objection.
            </span>
          )}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stream consumption helpers                                         */
/* ------------------------------------------------------------------ */

async function consumeStream(
  body: ReadableStream<Uint8Array>,
  onEvent: (e: DialogueStreamEvent) => void,
): Promise<void> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx: number;
    while ((idx = buffer.indexOf('\n\n')) !== -1) {
      const frame = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      const line = frame.split('\n').find((l) => l.startsWith('data: '));
      if (!line) continue;
      const payload = line.slice('data: '.length);
      try {
        onEvent(JSON.parse(payload) as DialogueStreamEvent);
      } catch {
        // Malformed frame — ignore. The route does not emit non-JSON.
      }
    }
  }
}

async function safeReadError(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as { error?: string };
    return j.error ?? `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

/* ------------------------------------------------------------------ */
/* Transcript reducers                                                */
/* ------------------------------------------------------------------ */

function appendDelta(transcript: Turn[], delta: string): Turn[] {
  const next = [...transcript];
  for (let i = next.length - 1; i >= 0; i--) {
    const t = next[i];
    if (t && t.role === 'purvapakshin' && t.pending) {
      next[i] = { ...t, text: t.text + delta };
      return next;
    }
  }
  return next;
}

function attachMeta(
  transcript: Turn[],
  positionId: string | null,
  thinker: string | undefined,
  sourceText: string | undefined,
): Turn[] {
  const next = [...transcript];
  for (let i = next.length - 1; i >= 0; i--) {
    const t = next[i];
    if (t && t.role === 'purvapakshin' && t.pending) {
      // Strip the trailing [position_id] tag from the visible text so
      // we don't render it twice (the provenance line shows it).
      const text = positionId
        ? t.text.replace(/\s*\[[a-zA-Z0-9._:-]+\]\s*$/, '')
        : t.text;
      const updated: Turn = {
        role: 'purvapakshin',
        text,
        position_id: positionId,
        pending: t.pending,
      };
      if (thinker !== undefined) updated.thinker = thinker;
      if (sourceText !== undefined) updated.source_text = sourceText;
      next[i] = updated;
      return next;
    }
  }
  return next;
}

function finalizePending(transcript: Turn[]): Turn[] {
  const next = [...transcript];
  for (let i = next.length - 1; i >= 0; i--) {
    const t = next[i];
    if (t && t.role === 'purvapakshin' && t.pending) {
      next[i] = { ...t, pending: false };
      return next;
    }
  }
  return next;
}
