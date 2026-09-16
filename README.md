# generator

The deterministic generator that produced `main`'s entire history — calibrated
against the real scan engine so the Production Drift Rating sweeps the bands:
Minimal start, a Severe peak, a remediation dip into Low, and a creep back into
High that ends below the peak.

Last calibrated 2026-09-16 against production's seal (Cloud Run revision
`drift-detector-00336`, 137 shipped rules). The hosted chart's default view
samples 10 commits evenly across the 44 (indexes 0, 5, 10, 14, 19, 24, 29, 33,
38, 43), and the plan is shaped for those points:

| sample | commit | PDR |
|---|---|---|
| 0  | 2023-05-16 scaffold | 0.04 Minimal |
| 5  | 2023-09-05 checkout form | 0.08 Minimal |
| 10 | 2024-03-05 price tag | 0.20 Low |
| 14 | 2024-07-09 order summary | 0.35 Moderate |
| 19 | 2024-10-22 recommendation rail | 0.64 High |
| 24 | 2025-03-11 rich review bodies | 0.77 Severe — peak |
| 29 | 2025-07-29 security fix, sprint ends | 0.30 Low — dip |
| 33 | 2025-11-04 black friday countdown | 0.31 Moderate |
| 38 | 2026-03-10 spring campaign banners | 0.57 High |
| 43 | 2026-08-11 landing refresh (HEAD) | 0.67 High |

Between samples the plateau reaches 0.83 (2025-04/05); a narrowed chart range
shows it. HEAD: 138 drift-hours, 52 shipped rules firing, 63 files.

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
- **Rule breadth moves PDR, density does not.** The costing basis batches
  repeat findings, so hundreds of hex/spacing/font-size findings price at about
  a minute each. Each distinct shipped rule firing in a file prices near its
  full severity weight. The third wave of knobs in `CFG` exists for that
  reason, each written against the rule's reviewed definition
  (`engine-gate/reviews/<rule>.json` in drift-detector).
- **Level 3 is heavy.** One surface moving 3 → 2 moves PDR by ~0.15 at the
  dip; tune the tail and the sprint one level at a time.
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
  re-score the sampled commits after a reseal and check which rules went quiet.
