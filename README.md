# generator

The deterministic generator that produced `main`'s entire history — calibrated
against the real scan engine so the Production Drift Rating sweeps the bands:
Minimal start, a Severe peak, a remediation dip into Low, and a creep back into
High that ends below the peak.

Last calibrated 2026-09-16 against **tray build 79's costing** — every finding
charged the flat fix-minutes of its severity (95/28/12), no repeat batching —
which is what users see in build 79 and what the hosted engine reports from
reweaver-ai#3518 on. Findings came from production's seal (Cloud Run revision
`drift-detector-00336`, 137 shipped rules). The hosted chart's default view
samples 10 commits evenly across the 44 (indexes 0, 5, 10, 14, 19, 24, 29, 33,
38, 43), and the plan is shaped for those points:

| sample | commit | PDR |
|---|---|---|
| 0  | 2023-05-16 scaffold | 0.03 Minimal |
| 5  | 2023-09-05 checkout form | 0.09 Minimal |
| 10 | 2024-03-05 price tag | 0.27 Low |
| 14 | 2024-07-09 order summary | 0.44 Moderate |
| 19 | 2024-10-22 recommendation rail | 0.62 High |
| 24 | 2025-03-11 rich review bodies | 0.77 Severe — peak |
| 29 | 2025-07-29 security fix, sprint ends | 0.28 Low — dip |
| 33 | 2025-11-04 black friday countdown | 0.31 Moderate |
| 38 | 2026-03-10 spring campaign banners | 0.55 High |
| 43 | 2026-08-11 landing refresh (HEAD) | 0.63 High |

Between samples the plateau reaches 0.84 (2025-05/06) and the sprint bottoms
at 0.17 (2025-08-12); a narrowed chart range shows both. HEAD: 126
drift-hours, 44 shipped rules firing, 63 files.

The tree carries a **checkout API** (`server/api/`) as well as the React app,
because almost nothing in the Security dimension is a client-side pattern and a
storefront that takes orders has a server. Its posture is part of the drift
story: shipped with the 2024 spike (`api` level 2), degraded in the
express-checkout push (level 3), hardened in the 2025 remediation sprint
(level 0), and partly regressed in the tail. It is dependency-free
(`node:http` plus a query stub).

    node generate.mjs ./repo
    cd repo && git remote add origin <remote> && git push --force origin main

Everything is in `generate.mjs`: the commit plan, the per-file drift-level
schedule, and the pattern densities (`CFG`). Regeneration is deterministic;
force-pushing produces fresh SHAs, which invalidates scan clone caches.

The final tree typechecks (`tsc --noEmit` with the package's devDependencies
installed); historical peak states are for scanning, not building.

Calibration notes:
- **Every finding is charged in full.** Under build 79's costing a file's cost
  is its finding count times severity minutes, so a level-2 file carrying
  every level-2 pattern cost 6-8 drift-hours against a 2-hour budget and the
  history saturated at 0.99. `patternsFor` gives each drifted file one rotating
  slice of its level's patterns (`SHARE`), keeping rule breadth across the
  tree while one file costs about 1/SHARE of its level. Tune `SHARE` first
  when the costing changes.
- The third wave of knobs in `CFG` exists because 26 of 137 shipped rules
  fired anywhere in the history; each is written against the rule's reviewed
  definition (`engine-gate/reviews/<rule>.json` in drift-detector).
- **Level 3 is heavy.** Tune the tail and the sprint one level
  at a time and re-score the sampled commits.
- **Shape the plan for the sampled indexes.** Adding or removing a commit
  shifts every sample. Keep the count at 44, or recompute the indexes
  (`sampleCommits` in drift-detector's `server/scan-handler.mjs`; a repo this
  size gets a 12-snapshot budget, which forces evenly-spaced sampling).
- The engine's clean-file floor is real: hover/active/focus styles, empty
  states, list pagination, responsive breakpoints and skip-nav all fire as
  findings when absent. The templates treat them as guards that erode at
  drift level >= 2.
- Factory components must vary structurally or cross-file-clone detection
  fires on the skeletons.
- Six rules stay structurally unreachable: the Tailwind family and
  touch-target-too-small. This is a plain-CSS storefront; introducing Tailwind
  to satisfy a detector would make the fixture a fiction.
- **Calibrated against a moving target.** The ship list is still being tuned;
  re-score the sampled commits after a reseal or a costing change (build 81
  prices per detector) and check which rules went quiet.
