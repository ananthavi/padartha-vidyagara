# Pūrvapakṣa Positions

Curated objections from rival *darśanas*, hand-authored and shastrika-reviewed.
The AI *pūrvapakṣin* engine sources only from positions in this directory
that have `approved_by_shastrika: true` and a non-null `approved_at`.

> Hallucinated *pūrvapakṣa* is a P0 bug. (vision Part II)

## Schema

```ts
PurvapaksaPosition {
  id: string
  school: 'sautrantika' | 'yogacara' | 'madhyamaka' | 'mimamsa' | 'advaita' | 'jaina'
  thinker: string                            // e.g. "Nāgārjuna", "Candrakīrti", "Kumārila"
  source_text: string                        // e.g. "Mūlamadhyamakakārikā 1.7"
  attestation: 'attested' | 'reconstructed'
  objection_summary_en: string
  objection_summary_ml: string
  siddhanta_response_summary_en: string | null  // from Śrīdhara where available
  approved_by_shastrika: boolean
  approved_at: string | null                    // ISO 8601
}
```

## Workflow

1. A śāstrika authors the position against an actual passage in the named text.
2. `attestation` is `attested` only when the objection is present in the named
   source. `reconstructed` is reserved for positions that the tradition
   defends but for which no extant primary passage is cited.
3. The position lands in `content/purvapaksa/<school>/<slug>.json` with
   `approved_by_shastrika: false` and `approved_at: null`.
4. A second śāstrika reviews; on approval the flags are flipped together.
5. The dialectic engine reads `loadApprovedPurvapaksa()` and uses only those.

## MVP corpus

The vision (Part X) calls for 6–10 Buddhist and Advaitin objections to *samavāya*
before the *pūrvapakṣin* engine can be unlocked for the MVP node. None have
been authored yet — this directory is empty by design.
