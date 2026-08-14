# generator

The deterministic generator that produced `main`'s entire history — calibrated
against the real scan engine over four rounds so the Production Drift Rating
sweeps every band: Minimal start, Severe peak (0.93), remediation trough
(Moderate), rising High tail.

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
