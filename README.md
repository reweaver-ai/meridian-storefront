# generator

The deterministic generator that produced `main`'s entire history — calibrated
against the real scan engine so the Production Drift Rating sweeps every band:
Minimal start, Severe peak (0.90), remediation trough (Moderate 0.49), rising
High tail (0.67).

The tree carries a **checkout API** (`server/api/`) as well as the React app,
because almost nothing in the Security dimension is a client-side pattern and a
storefront that takes orders has a server. Its posture is part of the drift
story rather than a fixture: shipped with the 2024 spike (`api` level 2),
degraded in the express-checkout push (level 3 — interpolated SQL, a committed
payments key, md5, wildcard CORS, an all-interfaces bind, a caller-controlled
file path, a token in localStorage), hardened in the 2025 remediation sprint
(level 0), and partly regressed in the tail. At the peak the scan reports ten
Security rows; at HEAD, three. It is dependency-free (`node:http` plus a query
stub) so the final tree still typechecks with nothing installed.

    node generate.mjs ./repo
    cd repo && git remote add origin <remote> && git push --force origin main

Everything is in `generate.mjs`: the commit plan, the per-file drift-level
schedule, and the pattern densities (`CFG`). Regeneration is deterministic;
force-pushing produces fresh SHAs, which invalidates scan clone caches.

Calibration notes that took four rounds to learn:
- The engine's clean-file floor is real: hover/active/focus styles, empty
  states, list pagination, responsive breakpoints and skip-nav all fire as
  findings when absent. The templates treat them as guards that erode at
  drift level >= 2, which is both the fix and a realistic drift story.
- Factory components must vary structurally or cross-file-clone detection
  fires on the skeletons.
- The final state typechecks (`tsc --noEmit`); historical peak states are for
  scanning, not building.
