# Padārtha-Vidyāgāra — Vision

> The full vision document, preserved verbatim from the founding spec. Every
> technical decision in this repository is downstream of Part I. When a
> design question is ambiguous, return here first.

---

## Part I — North Star (the non-negotiables)

Build a bilingual (English + Malayalam) web environment for the deep, faithful
study of Praśastapāda's *Padārthadharmasaṅgraha*, with Śrīdhara Bhaṭṭa's
*Nyāyakandalī* surfaced as the primary commentarial layer wherever it
illuminates the root text. The learner is the scientifically educated modern
adult — engineer, physicist, philosopher, physician — who carries no Sanskrit
and no prior exposure to Indian *darśana*, but brings genuine intellectual
discipline and is willing to be slowed down.

Four founding commitments govern every design and engineering decision. If a
feature violates any of them, it does not ship.

1. **Rasa is the pedagogy, not the packaging.** The classical sequence —
   *adbhuta* (wonder) opening into *śānta* (contemplative stillness),
   defended and matured through *vīra* (the heroism of dialectic) — is the
   structural backbone of the learner's journey. *Sādhāraṇīkaraṇa* — the
   dissolution of the particular learner into the universal *sahṛdaya* — is
   the actual cognitive event we are engineering for.

2. **No drop in traditional content.** Every contemporary rephrasing, every
   visualization, every AI-generated utterance is anchored to a citable
   Sanskrit source. Untraceable claims do not enter the corpus. This is
   enforced by the data model (Part VIII), not by hope.

3. **The learner's logic is not interfered with.** No streaks, no badges, no
   leaderboards, no notifications, no pop-quizzes, no nudges, no progress
   bars in the reading view. The environment offers; the learner moves.

4. **Sanskrit is primary. English and Malayalam are doorways.** The *termini
   technici* — *dravya, guṇa, karma, sāmānya, viśeṣa, samavāya, abhāva,
   paramāṇu, dvyaṇuka, tryaṇuka, sādhāraṇīkaraṇa* — are explained, never
   replaced.

(The remaining parts II–XIII are kept in this repository's `docs/`
directory and in the canonical authoring source. See
`docs/ARCHITECTURE.md` for the engineering map and `docs/AUTHORING.md`
for the editorial workflow.)
