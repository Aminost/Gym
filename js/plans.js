/* Satz – splits, goals, prescriptions and the exercise-choice engine. */
(function () {
  const { SM, LIST, BY_ID } = window.SatzLib;

  // Slot codes: sub-muscle, '*' marks a main lift (more sets, compound preferred).
  const T = {
    B: {
      3: [
        { en: 'Full body A', de: 'Ganzkörper A', s: 'QV* HH* CM* LT* DS TT AB CG' },
        { en: 'Full body B', de: 'Ganzkörper B', s: 'GMX* HC CU* MB* DR BL OB GMD' },
        { en: 'Full body C', de: 'Ganzkörper C', s: 'QV* GMX DF* LT* TL BB ST AD' }
      ],
      4: [
        { en: 'Lower A', de: 'Unterkörper A', s: 'QV* HH* GMX QR CG AB' },
        { en: 'Upper A', de: 'Oberkörper A', s: 'CM* LT* DS MB TT BL' },
        { en: 'Lower B', de: 'Unterkörper B', s: 'GMX* QV* HC AD GMD CS OB' },
        { en: 'Upper B', de: 'Oberkörper B', s: 'CU* MB* LT DR TL BB ST' }
      ],
      5: [
        { en: 'Lower', de: 'Unterkörper', s: 'QV* HH* GMX HC CG AB' },
        { en: 'Upper', de: 'Oberkörper', s: 'CM* LT* DS MB TT BL' },
        { en: 'Push', de: 'Drücken', s: 'CU* DF* DS TL TT OB' },
        { en: 'Pull', de: 'Ziehen', s: 'LT* MB* DR TR BS BB LB' },
        { en: 'Legs', de: 'Beine', s: 'GMX* QV* QR GMD AD CS ST' }
      ],
      6: [
        { en: 'Push A', de: 'Drücken A', s: 'CM* DF* CU DS TT AB' },
        { en: 'Pull A', de: 'Ziehen A', s: 'LT* MB* DR BL BB LB' },
        { en: 'Legs A', de: 'Beine A', s: 'QV* HH* GMX QR CG OB' },
        { en: 'Push B', de: 'Drücken B', s: 'CU* DF* CM DS TL ST' },
        { en: 'Pull B', de: 'Ziehen B', s: 'MB* LT* DR TR BS AB' },
        { en: 'Legs B', de: 'Beine B', s: 'GMX* QV* HC GMD AD CS' }
      ]
    },
    L: {
      3: [
        { en: 'Glutes & full body A', de: 'Po & Ganzkörper A', s: 'GMX* QV* HC GMD LT* DS TT AB' },
        { en: 'Glutes & full body B', de: 'Po & Ganzkörper B', s: 'HH* GMX* QR AD CM* MB OB' },
        { en: 'Glutes & full body C', de: 'Po & Ganzkörper C', s: 'GMX* QV* HC GMD DF* LT BL' }
      ],
      4: [
        { en: 'Lower – glutes & hamstrings', de: 'Unterkörper – Po & Beinbeuger', s: 'GMX* HH* GMD HC AB' },
        { en: 'Upper A', de: 'Oberkörper A', s: 'LT* CM* DS MB TT BL' },
        { en: 'Lower – quads & glutes', de: 'Unterkörper – Beine & Po', s: 'QV* GMX* QR AD GMD CG OB' },
        { en: 'Upper B + glutes', de: 'Oberkörper B + Po', s: 'MB* DF* CU DR TL GMX' }
      ],
      5: [
        { en: 'Glutes & hamstrings', de: 'Po & Beinbeuger', s: 'GMX* HH* HC GMD AB' },
        { en: 'Upper body', de: 'Oberkörper', s: 'LT* CM* DS MB TT BL' },
        { en: 'Quads & glutes', de: 'Beine & Po', s: 'QV* GMX* QR AD CG OB' },
        { en: 'Upper body B', de: 'Oberkörper B', s: 'MB* DF* CU DR TL ST' },
        { en: 'Glutes & full body', de: 'Po & Ganzkörper', s: 'GMX* QV* HC GMD LT AB' }
      ],
      6: [
        { en: 'Glutes', de: 'Po', s: 'GMX* HH* GMD HC AB' },
        { en: 'Push', de: 'Drücken', s: 'CM* DF* DS TT ST' },
        { en: 'Quads', de: 'Beine', s: 'QV* QR AD CG OB GMX' },
        { en: 'Pull', de: 'Ziehen', s: 'LT* MB* DR BL BB' },
        { en: 'Glutes & hamstrings', de: 'Po & Beinbeuger', s: 'GMX* HH* HC GMD CS ST' },
        { en: 'Upper mix', de: 'Oberkörper gemischt', s: 'CU* LT* DS TL TR AB' }
      ]
    }
  };

  const WEEKDAYS = { 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 4, 5], 6: [0, 1, 2, 3, 4, 5] };

  const GOALS = {
    glutes: { tpl: 'L', en: 'Glutes & legs', de: 'Po & Beine', den: 'About 60 % lower body, all muscles covered', dde: 'Ca. 60 % Unterkörper, alle Muskeln abgedeckt' },
    build: { tpl: 'B', en: 'Build muscle', de: 'Muskelaufbau', den: 'Balanced, a bit more upper body', dde: 'Ausgewogen, etwas mehr Oberkörper' },
    toned: { tpl: 'B', cardio: 10, en: 'Toned & fit', de: 'Straff & fit', den: 'Even split plus a short cardio finish', dde: 'Ausgewogen plus kurzes Cardio am Ende' },
    strength: { tpl: 'B', en: 'Strength', de: 'Kraft', den: 'Heavy main lifts, low reps, long rests', dde: 'Schwere Hauptübungen, wenig Wdh., lange Pausen' },
    fatloss: { tpl: 'B', cardio: 15, en: 'Fat loss', de: 'Fettabbau', den: 'Short rests plus a cardio block each session', dde: 'Kurze Pausen plus Cardio in jeder Einheit' }
  };

  const LOWER = new Set(['glutes', 'quads', 'hams', 'adductors']);
  const UPPER = new Set(['chest', 'back', 'shoulders', 'biceps', 'triceps']);

  function parseSlots(str) {
    return str.split(' ').map(c => ({ sm: c.replace('*', ''), main: c.endsWith('*') }));
  }

  function template(profile) {
    const g = GOALS[profile.goal] || GOALS.build;
    const days = T[g.tpl][profile.days] || T[g.tpl][4];
    return days.map((d, i) => {
      const slots = parseSlots(d.s);
      if (g.cardio) slots.push({ sm: 'CA', main: false, cardio: g.cardio });
      return { i, en: d.en, de: d.de, wd: WEEKDAYS[profile.days][i], slots };
    });
  }

  // Sets / reps / rest for one exercise in one slot.
  function rx(ex, slot, profile) {
    const beg = profile.level !== 'int';
    const goal = profile.goal;
    const grp = SM[ex.sm].g;
    if (ex.cardio) return { sets: 1, reps: (slot.cardio || 10) + ' min', rest: 0, cardio: true };
    let sets = slot.main ? (beg ? 3 : 4) : (beg ? 2 : 3);
    if (goal === 'glutes' && LOWER.has(grp) && !slot.main) sets += 1;
    if (goal === 'glutes' && UPPER.has(grp) && !slot.main && !beg) sets -= 1;
    if (goal === 'build' && UPPER.has(grp) && !slot.main && !beg) sets += 1;
    sets = Math.min(sets, 4);
    let reps, rest;
    const P = {
      glutes: [['8–12', 90], ['12–15', 60]],
      build: [['6–10', 120], ['10–12', 75]],
      toned: [['10–12', 75], ['12–15', 60]],
      strength: [[beg ? '6–8' : '4–6', 180], ['8–10', 90]],
      fatloss: [['10–12', 60], ['15', 45]]
    }[goal] || [['8–12', 90], ['10–15', 60]];
    [reps, rest] = slot.main && ex.comp ? P[0] : P[1];
    if (grp === 'core' || grp === 'calves') { reps = '12–15'; rest = Math.min(rest, 60); }
    if (ex.time) { reps = beg ? '30–45 s' : '45–60 s'; rest = 45; }
    return { sets, reps, rest, side: !!ex.side };
  }

  function score(ex, slot, profile) {
    const beg = profile.level !== 'int';
    let s = 0;
    if (beg && ex.lvl === 2) s -= 10;
    if (!beg && ex.lvl === 2 && slot.main) s += 3;
    if (slot.main && ex.comp) s += 4;
    if (!slot.main && !ex.comp) s += 1;
    if (ex.cardio && ex.id === 'walk') s += 1;
    return s;
  }

  function candidates(sm) { return LIST.filter(e => e.sm === sm); }

  function pickDefault(slot, profile, avoid) {
    const c = candidates(slot.sm).map((e, idx) => ({ e, s: score(e, slot, profile) - idx * 0.01 }));
    c.sort((a, b) => b.s - a.s);
    const fresh = c.find(x => !avoid.has(x.e.id) && x.s > -5);
    return (fresh || c[0]).e;
  }

  // Resolve the whole week: user choices win, the rest gets sensible defaults that
  // vary exercises when a sub-muscle comes back later in the week.
  function buildWeek(profile, choices) {
    const days = template(profile);
    const usedIds = new Set();
    const usedOn = {}; // exId -> [dayIdx]
    for (const d of days) {
      const taken = new Set();
      d.items = d.slots.map((slot, si) => {
        let ex = null;
        const cid = choices && choices[d.i] && choices[d.i][si];
        if (cid && BY_ID[cid]) ex = BY_ID[cid];
        if (!ex || (taken.has(ex.sm) && ex.sm !== 'CA')) ex = pickDefault(slot, profile, usedIds);
        taken.add(ex.sm);
        usedIds.add(ex.id);
        (usedOn[ex.id] = usedOn[ex.id] || []).push(d.i);
        return { slot, si, ex, custom: !!cid && cid === ex.id, rx: rx(ex, slot, profile) };
      });
    }
    return { days, usedOn };
  }

  // Options for swapping one slot: every exercise of that slot's muscle group,
  // blocked when its sub-muscle is already trained by another slot that day.
  function swapOptions(week, dayIdx, slotIdx) {
    const day = week.days[dayIdx];
    const item = day.items[slotIdx];
    const group = SM[item.slot.sm].g;
    const others = {};
    day.items.forEach((it, i) => { if (i !== slotIdx) others[it.ex.sm] = it.ex; });
    return LIST.filter(e => SM[e.sm].g === group).map(e => ({
      ex: e,
      current: e.id === item.ex.id,
      blockedBy: e.sm !== 'CA' && others[e.sm] ? others[e.sm] : null,
      usedOn: (week.usedOn[e.id] || []).filter(d => d !== dayIdx)
    }));
  }

  window.SatzPlans = { GOALS, WEEKDAYS, template, buildWeek, swapOptions, rx };
})();
