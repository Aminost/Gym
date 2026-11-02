# Satz

A small offline training app (PWA) for the gym: a weekly plan for 3–6 days, an exercise library with animated demos, set logging and a light progress dashboard. All data stays on the phone.

**Open:** https://aminost.github.io/Gym/ → share menu → *Add to Home Screen*.

## How it works
- **Setup:** female/male (sets the default goal), goal (glutes & legs, build muscle, toned & fit, strength, fat loss), level (beginner / intermediate), days per week, language (DE / EN).
- **Plan:** fixed splits per day count. Every slot targets one muscle part (e.g. biceps long head). Within one session, exercises that hit a muscle part already trained that day are blocked. When a muscle part returns later in the week, a different exercise is suggested.
- **Library:** ~150 exercises, each with a mannequin animation that highlights the target muscle, plus equipment filters.
- **Log:** weight and reps per set, last-time values, rest timer. Progress tab shows workouts per week and the heaviest set per exercise over time.
- **Backup:** Settings → Export / Import (JSON file).

## Files
- `js/figure.js` – mannequin renderer and animation loop
- `js/motions.js` – the two poses (A ↔ B) for every movement
- `js/library.js` – exercises, sub-muscles, equipment, DE/EN names and cues
- `js/plans.js` – splits, goals, sets/reps, exercise-choice and blocking rules
- `js/app.js` – UI, logging, dashboard, settings
- `sw.js` – offline cache. **Bump `VERSION` on every change** so phones pick up updates.

## Credits
Exercise coverage and muscle targets were cross-checked against [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset) (MIT-licensed data). Its GIFs/images (© Gym visual) are **not** used; all animations here are drawn in code.
