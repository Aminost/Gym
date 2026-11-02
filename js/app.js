/* Satz – app shell: setup, training, library, progress, settings. All data stays on this device. */
(function () {
  const { SM, GROUPS, EQUIP, LIST, BY_ID } = window.SatzLib;
  const { GOALS, buildWeek, swapOptions } = window.SatzPlans;
  const MOT = window.SatzMotions;
  const FIG = window.SatzFigure;
  const KEY = 'satz:v1';

  // ---------- text ----------
  const TX = {
    train: ['Training', 'Training'], library: ['Library', 'Bibliothek'], progress: ['Progress', 'Fortschritt'], settings: ['Settings', 'Einstellungen'],
    setupTitle: ['Your training', 'Dein Training'],
    setupLead: ['Five questions and your week is ready. You can change everything later.', 'Fünf Fragen und deine Woche steht. Alles lässt sich später ändern.'],
    sex: ['Training for', 'Training für'], female: ['Female', 'Frau'], male: ['Male', 'Mann'],
    sexHelp: ['Only sets the default goal.', 'Legt nur das Standardziel fest.'],
    goal: ['Goal', 'Ziel'], level: ['Experience', 'Erfahrung'],
    beg: ['Beginner', 'Einsteiger'], int: ['Intermediate', 'Fortgeschritten'],
    levelHelp: ['Beginner: easier-to-learn exercises, fewer sets. Intermediate: barbell lifts, more sets.', 'Einsteiger: leicht erlernbare Übungen, weniger Sätze. Fortgeschritten: Langhantelübungen, mehr Sätze.'],
    days: ['Days per week', 'Tage pro Woche'], lang: ['Language', 'Sprache'],
    start: ['Build my week', 'Woche erstellen'], save: ['Save', 'Speichern'],
    rest: ['Rest', 'Pause'], restDay: ['Rest', 'Ruhe'], done: ['Done', 'Fertig'], next: ['Next', 'Als Nächstes'],
    day: ['Day', 'Tag'], of: ['of', 'von'], min: ['min', 'Min'], exercises: ['exercises', 'Übungen'], sets: ['sets', 'Sätze'],
    warmup: ['Warm-up', 'Aufwärmen'], cooldown: ['Cool-down', 'Abwärmen'], main: ['Workout', 'Training'],
    resetDay: ['Reset to suggestions', 'Vorschläge wiederherstellen'],
    swap: ['Swap', 'Tauschen'], howto: ['How to', 'Ausführung'],
    last: ['Last time', 'Letztes Mal'], noLast: ['First time – pick a weight with 2 reps left in the tank.', 'Erstes Mal – wähle ein Gewicht, bei dem noch 2 Wdh. gehen würden.'],
    perSide: ['/ side', '/ Seite'], pause: ['rest', 'Pause'],
    swapTitle: ['Swap exercise', 'Übung tauschen'], current: ['Current', 'Aktuell'],
    blockedBy: ['Same muscle part as', 'Gleicher Muskelteil wie'], usedOn: ['also on', 'auch am'],
    all: ['All', 'Alle'], search: ['Search exercises', 'Übungen suchen'],
    targets: ['Targets', 'Trainiert'], equipment: ['Equipment', 'Gerät'],
    thisWeek: ['this week', 'diese Woche'], workouts: ['workouts', 'Trainings'], last4: ['last 4 weeks', 'letzte 4 Wochen'], volume: ['kg moved this week', 'kg diese Woche bewegt'],
    perWeek: ['Workouts per week', 'Trainings pro Woche'], exProgress: ['Exercise progress', 'Übungsfortschritt'],
    topSet: ['heaviest set per session', 'schwerster Satz pro Einheit'], bests: ['Personal bests', 'Bestleistungen'],
    noData: ['Log a few sets and your progress shows up here.', 'Trag ein paar Sätze ein, dann siehst du hier deinen Fortschritt.'],
    profile: ['Profile', 'Profil'], backup: ['Backup', 'Sicherung'],
    exportBtn: ['Export backup', 'Sicherung exportieren'], importBtn: ['Import backup', 'Sicherung importieren'],
    backupHelp: ['Your data lives only on this phone. Export a backup before switching phones.', 'Deine Daten sind nur auf diesem Handy. Exportiere eine Sicherung, bevor du das Handy wechselst.'],
    imported: ['Backup imported', 'Sicherung importiert'], importFail: ['That file is not a Satz backup.', 'Diese Datei ist keine Satz-Sicherung.'],
    resetAll: ['Delete all data', 'Alle Daten löschen'], resetSure: ['Tap again to delete everything', 'Nochmal tippen, um alles zu löschen'],
    saved: ['Saved', 'Gespeichert'], install: ['Install: open the share menu and choose “Add to Home Screen”.', 'Installieren: Teilen-Menü öffnen und „Zum Home-Bildschirm“ wählen.'],
    restDone: ['Rest over – next set', 'Pause vorbei – nächster Satz'], nextSet: ['Next: set', 'Als Nächstes: Satz'], nextEx: ['Next:', 'Als Nächstes:'],
    blockNote: ['One exercise per muscle part per session. Greyed-out ones hit a part you already train today.', 'Eine Übung pro Muskelteil und Einheit. Ausgegraute treffen einen Teil, den du heute schon trainierst.'],
    progression: ['How to progress', 'So steigerst du dich'],
    prog1: ['Hit the top of the rep range on every set → add weight next time (≈ +1–2 kg upper body, +2–5 kg legs).', 'Obere Wdh.-Zahl in allen Sätzen geschafft → nächstes Mal mehr Gewicht (≈ +1–2 kg Oberkörper, +2–5 kg Beine).'],
    prog2: ['Every 6–8 weeks: one lighter week with half the sets.', 'Alle 6–8 Wochen: eine leichtere Woche mit halben Sätzen.'],
    kg: ['kg', 'kg'], reps: ['reps', 'Wdh.'], minutes: ['min', 'Min'], plus15: ['+15 s', '+15 s'],
    finishHint: ['Tick a set when it’s done – the rest timer starts.', 'Hake einen Satz ab, wenn er fertig ist – der Pausentimer startet.']
  };
  const WD = { en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] };
  const WARM = {
    lower: [['Bike or incline walk', 'Rad oder Gehen mit Steigung', '5 min'], ['Bodyweight squats', 'Kniebeugen ohne Gewicht', '10'], ['Glute bridges', 'Glute Bridges', '10'], ['Leg swings', 'Beinschwingen', '8 / side'], ['Light set of the first exercise', 'Leichter Satz der ersten Übung', '1 × 8']],
    upper: [['Rower or cross trainer', 'Rudergerät oder Crosstrainer', '5 min'], ['Arm circles, both ways', 'Armkreisen, beide Richtungen', '10'], ['Band pull-aparts', 'Band Pull-Aparts', '12'], ['Push-ups on a bench', 'Liegestütze an der Bank', '8'], ['Light set of the first exercise', 'Leichter Satz der ersten Übung', '1 × 8']]
  };
  const COOL = {
    lower: [['Hip flexor stretch', 'Hüftbeuger-Dehnung', '30 s / side'], ['Figure-4 glute stretch', 'Gesäßdehnung (Figur 4)', '30 s / side'], ['Hamstring stretch', 'Beinbeuger-Dehnung', '30 s / side'], ["Child's pose", 'Kindhaltung', '45 s']],
    upper: [['Chest stretch in a doorway', 'Brustdehnung im Türrahmen', '30 s / side'], ['Lat stretch on a bench', 'Latissimus-Dehnung an der Bank', '30 s'], ['Cross-body shoulder stretch', 'Schulterdehnung quer', '30 s / side'], ["Child's pose", 'Kindhaltung', '45 s']]
  };

  // ---------- state ----------
  let state = { profile: null, choices: {}, log: {}, ui: { tab: 'train', day: null } };
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && typeof s === 'object') state = Object.assign(state, s); } catch (e) { }
  state.ui = Object.assign({ tab: 'train', day: null }, state.ui || {});
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { } }

  const lang = () => (state.profile && state.profile.lang) || state.tmpLang || ((navigator.language || 'de').slice(0, 2) === 'de' ? 'de' : 'en');
  const t = k => (TX[k] ? TX[k][lang() === 'de' ? 1 : 0] : k);
  const L = o => (o ? (o[lang()] || o.en) : '');
  const nameOf = ex => (lang() === 'de' ? ex.de : ex.en);
  const amt = s => (lang() === 'de' ? s.replace('/ side', '/ Seite') : s);
  const planKey = () => { const p = state.profile; return `${p.days}-${p.goal}-${p.level}`; };

  // ---------- dates ----------
  const pad2 = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const today = () => iso(new Date());
  function mondayOf(dstr) { const d = new Date(dstr + 'T12:00:00'); const wd = (d.getDay() + 6) % 7; d.setDate(d.getDate() - wd); return iso(d); }
  const thisMonday = () => mondayOf(today());

  // ---------- DOM helper ----------
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (k.startsWith('aria-') && typeof v === 'boolean') { e.setAttribute(k, String(v)); continue; }
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (k === 'html') e.innerHTML = v;
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  }
  function figure(ex) {
    const f = FIG.createFigure(ex, MOT[ex.m]);
    FIG.mount(f);
    return f.svg;
  }
  const app = document.getElementById('app');

  // ---------- log helpers ----------
  const sessKey = (date, day) => `${date}#${day}`;
  function sessionsFor(day) { return Object.keys(state.log).filter(k => k.endsWith('#' + day)); }
  function isDoneSet(s) { return s && s.done; }
  function sessionHasWork(sess) { return Object.values(sess.sets || {}).some(arr => arr.some(isDoneSet)); }
  function lastFor(exId, exceptKey) {
    const keys = Object.keys(state.log).filter(k => k !== exceptKey && state.log[k].sets && state.log[k].sets[exId] && state.log[k].sets[exId].some(isDoneSet)).sort().reverse();
    return keys.length ? state.log[keys[0]].sets[exId].filter(isDoneSet) : null;
  }
  function doneDaysThisWeek() {
    const mon = thisMonday(), done = new Set();
    for (const k in state.log) { const [d, day] = k.split('#'); if (mondayOf(d) === mon && sessionHasWork(state.log[k])) done.add(+day); }
    return done;
  }

  // ---------- render root ----------
  function render() {
    FIG.sweep();
    app.innerHTML = '';
    document.documentElement.lang = lang();
    if (!state.profile) { app.append(renderSetup(false)); renderNav(false); return; }
    const tab = state.ui.tab;
    const view = tab === 'library' ? renderLibrary() : tab === 'progress' ? renderProgress() : tab === 'settings' ? renderSettings() : renderTraining();
    app.append(view);
    renderNav(true);
    requestAnimationFrame(FIG.sweep);
  }

  const ICONS = {
    train: '<path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/>',
    library: '<rect x="4" y="4" width="6" height="16" rx="1"/><rect x="14" y="4" width="6" height="16" rx="1"/>',
    progress: '<path d="M4 19h16M7 16v-5M12 16V7M17 16v-8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>'
  };
  function renderNav(show) {
    let nav = document.getElementById('nav');
    if (!show) { if (nav) nav.hidden = true; return; }
    if (!nav) { nav = h('nav', { id: 'nav', class: 'nav', 'aria-label': 'Main' }); document.body.append(nav); }
    nav.hidden = false;
    nav.innerHTML = '';
    const inner = h('div', { class: 'in' });
    for (const k of ['train', 'library', 'progress', 'settings']) {
      inner.append(h('button', { type: 'button', id: 'nav-' + k, 'aria-current': state.ui.tab === k ? 'page' : null,
        onclick: () => { state.ui.tab = k; save(); render(); window.scrollTo(0, 0); } },
        h('span', { html: `<svg viewBox="0 0 24 24">${ICONS[k]}</svg>` }), t(k)));
    }
    nav.append(inner);
  }

  // ---------- setup / profile form ----------
  function segment(id, options, value, onPick) {
    const wrap = h('div', { class: 'seg', role: 'group', id });
    for (const [v, label] of options) {
      wrap.append(h('button', { type: 'button', id: id + '-' + v, 'aria-pressed': String(v) === String(value), onclick: () => onPick(v) }, label));
    }
    return wrap;
  }
  function renderSetup(isEdit) {
    const draft = Object.assign({ sex: 'f', goal: 'glutes', level: 'beg', days: 4, lang: lang() }, state.profile || {});
    const root = h('div', { class: 'wrap' });
    const draw = () => {
      root.innerHTML = '';
      if (!isEdit) root.append(h('div', { class: 'hero' }, h('p', { class: 'eyebrow' }, 'Satz'), h('h1', null, tl('setupTitle')), h('p', null, tl('setupLead'))));
      const form = h('div', { class: 'form' });
      form.append(h('div', { class: 'q' }, h('span', { class: 'ql' }, tl('lang')),
        segment('lang', [['de', 'Deutsch'], ['en', 'English']], draft.lang, v => { draft.lang = v; draw(); })));
      form.append(h('div', { class: 'q' }, h('span', { class: 'ql' }, tl('sex')),
        segment('sex', [['f', tl('female')], ['m', tl('male')]], draft.sex, v => { draft.sex = v; if (!isEdit || !draft.goalTouched) draft.goal = v === 'f' ? 'glutes' : 'build'; draw(); }),
        h('span', { class: 'help' }, tl('sexHelp'))));
      const gl = h('div', { class: 'goal-list', id: 'goal' });
      for (const k of Object.keys(GOALS)) {
        const g = GOALS[k];
        gl.append(h('button', { type: 'button', class: 'goal', id: 'goal-' + k, 'aria-pressed': draft.goal === k, onclick: () => { draft.goal = k; draft.goalTouched = true; draw(); } },
          h('b', null, draft.lang === 'de' ? g.de : g.en), h('span', null, draft.lang === 'de' ? g.dde : g.den)));
      }
      form.append(h('div', { class: 'q' }, h('span', { class: 'ql' }, tl('goal')), gl));
      form.append(h('div', { class: 'q' }, h('span', { class: 'ql' }, tl('level')),
        segment('level', [['beg', tl('beg')], ['int', tl('int')]], draft.level, v => { draft.level = v; draw(); }), h('span', { class: 'help' }, tl('levelHelp'))));
      form.append(h('div', { class: 'q' }, h('span', { class: 'ql' }, tl('days')),
        segment('days', [[3, '3'], [4, '4'], [5, '5'], [6, '6']], draft.days, v => { draft.days = +v; draw(); })));
      form.append(h('button', { type: 'button', class: 'btn accent', id: 'save-profile', onclick: () => {
        const p = { sex: draft.sex, goal: draft.goal, level: draft.level, days: draft.days, lang: draft.lang };
        const changedPlan = !state.profile || state.profile.days !== p.days || state.profile.goal !== p.goal;
        state.profile = p; if (changedPlan) state.ui.day = null; state.ui.tab = 'train'; save(); render(); window.scrollTo(0, 0);
        if (isEdit) toast(t('saved'));
      } }, isEdit ? tl('save') : tl('start')));
      root.append(form);
    };
    const tl = k => (TX[k] ? TX[k][draft.lang === 'de' ? 1 : 0] : k);
    draw();
    return root;
  }

  // ---------- training ----------
  function week() { return buildWeek(state.profile, state.choices[planKey()] || {}); }
  function dayKind(day) {
    let lo = 0, up = 0;
    for (const it of day.items) { const g = SM[it.ex.sm].g; if (['glutes', 'quads', 'hams', 'adductors', 'calves'].includes(g)) lo++; else if (g !== 'core' && g !== 'cardio') up++; }
    return lo >= up ? 'lower' : 'upper';
  }
  function estMinutes(day) {
    let s = 8 * 60 + 5 * 60;
    for (const it of day.items) s += it.rx.cardio ? parseInt(it.rx.reps, 10) * 60 : it.rx.sets * (45 + it.rx.rest) + 40;
    return Math.round(s / 300) * 5;
  }

  function renderTraining() {
    const w = week();
    const done = doneDaysThisWeek();
    if (state.ui.day == null || state.ui.day >= w.days.length) {
      const nxt = w.days.find(d => !done.has(d.i));
      state.ui.day = nxt ? nxt.i : 0;
    }
    const day = w.days[state.ui.day];
    const root = h('div', { class: 'wrap' });
    const p = state.profile;
    root.append(h('div', { class: 'top' }, h('div', { class: 'brand' }, 'Satz', h('i', null, '.')),
      h('button', { type: 'button', class: 'pill', id: 'profile-pill', onclick: () => { state.ui.tab = 'settings'; save(); render(); } },
        `${L(GOALS[p.goal])} · ${p.days}× · ${t(p.level)}`)));

    // week strip
    const strip = h('div', { class: 'week', id: 'week' });
    for (let i = 0; i < 7; i++) {
      const d = w.days.find(x => x.wd === i);
      if (!d) { strip.append(h('div', { class: 'wd' }, h('span', { class: 'dn' }, WD[lang()][i]), h('span', { class: 'st', style: 'margin-top:10px' }, t('restDay')))); continue; }
      const isDone = done.has(d.i);
      strip.append(h('button', { type: 'button', class: 'wd' + (isDone ? ' done' : ''), id: 'day-' + d.i, 'aria-pressed': d.i === state.ui.day,
        onclick: () => { state.ui.day = d.i; save(); render(); } },
        h('span', { class: 'dn' }, WD[lang()][i]), h('span', { class: 'num' }, String(d.i + 1)), h('span', { class: 'st' }, isDone ? '✓' : '')));
    }
    root.append(strip);

    // session head
    const totalSets = day.items.reduce((a, it) => a + (it.rx.cardio ? 0 : it.rx.sets), 0);
    const hasCustom = day.items.some(it => it.custom);
    root.append(h('div', { class: 'sess' },
      h('p', { class: 'eyebrow' }, `${t('day')} ${day.i + 1} ${t('of')} ${w.days.length} · ${WD[lang()][day.wd]}`),
      h('h2', null, L(day)),
      h('div', { class: 'tags' }, h('span', { class: 'tag' }, `~${estMinutes(day)} ${t('min')}`), h('span', { class: 'tag' }, `${day.items.length} ${t('exercises')}`), h('span', { class: 'tag' }, `${totalSets} ${t('sets')}`)),
      hasCustom ? h('div', null, h('button', { type: 'button', class: 'linkbtn', id: 'reset-day', onclick: () => {
        const c = state.choices[planKey()]; if (c) delete c[day.i]; save(); render();
      } }, t('resetDay'))) : null));

    const kind = dayKind(day);
    root.append(listBlock(t('warmup'), '~8 ' + t('min'), WARM[kind], 'warm'));

    root.append(h('div', { class: 'block-h stack' }, h('h3', null, t('main')), h('span', null, t('finishHint'))));
    const cards = h('div', { class: 'cards' });
    day.items.forEach((it, idx) => cards.append(card(w, day, it, idx)));
    root.append(cards);

    root.append(listBlock(t('cooldown'), '~5 ' + t('min'), COOL[kind], 'cool'));
    root.append(h('details', { class: 'block', id: 'prog' }, h('summary', null, h('h3', null, t('progression')), h('span', null, '+')),
      h('ul', { class: 'simple' }, h('li', null, t('prog1')), h('li', null, t('prog2')))));
    return root;
  }

  function listBlock(title, meta, rows, id) {
    const d = h('details', { class: 'block', id, open: id === 'warm' ? null : null });
    d.append(h('summary', null, h('h3', null, title), h('span', null, meta)));
    const ul = h('ul', { class: 'simple' });
    for (const r of rows) ul.append(h('li', null, h('span', null, lang() === 'de' ? r[1] : r[0]), h('span', { class: 'amt' }, amt(r[2]))));
    d.append(ul);
    return d;
  }

  function card(w, day, it, idx) {
    const ex = it.ex, rx = it.rx;
    const key = sessKey(today(), day.i);
    const sess = state.log[key] || { sets: {} };
    const rows = (sess.sets[ex.id] || []);
    const last = lastFor(ex.id, key);
    const el = h('article', { class: 'card', id: 'card-' + idx });
    const repsTxt = rx.cardio ? rx.reps.replace('min', t('minutes')) : `${rx.sets} × ${rx.reps}${rx.side ? ' ' + t('perSide') : ''}`;
    const lastTxt = last ? `${t('last')}: ${last.map(s => (s.kg ? s.kg + ' kg × ' : '') + (s.reps || '–')).join(' · ')}` : (rx.cardio ? '' : t('noLast'));

    el.append(h('div', { class: 'card-top' },
      h('button', { type: 'button', class: 'figbtn', 'aria-label': t('howto') + ': ' + nameOf(ex), onclick: () => openDetail(ex) },
        h('span', { class: 'n' }, pad2(idx + 1)), figure(ex)),
      h('div', null,
        h('h4', null, nameOf(ex)),
        h('div', { class: 'sm' }, L(SM[ex.sm])),
        h('div', { class: 'rx' }, h('span', null, h('b', null, repsTxt)), rx.rest ? h('span', { class: 'muted' }, `${rx.rest} s ${t('pause')}`) : null),
        lastTxt ? h('div', { class: 'last' }, lastTxt) : null,
        h('div', { class: 'card-actions' },
          h('button', { type: 'button', class: 'linkbtn', id: `swap-${idx}`, onclick: () => openSwap(day.i, idx) }, '⇄ ' + t('swap')),
          h('button', { type: 'button', class: 'linkbtn', onclick: () => openDetail(ex) }, t('howto'))))));

    const setsEl = h('div', { class: 'sets' });
    const n = rx.cardio ? 1 : rx.sets;
    const refresh = () => {
      const arr = (state.log[key] && state.log[key].sets[ex.id]) || [];
      el.classList.toggle('complete', arr.filter(isDoneSet).length >= n);
    };
    for (let s = 0; s < n; s++) {
      const cur = rows[s] || {};
      const ph = last && last[Math.min(s, last.length - 1)] || {};
      const row = h('div', { class: 'setrow' + (cur.done ? ' done' : '') });
      const kgIn = h('input', { id: `kg-${idx}-${s}`, inputmode: 'decimal', autocomplete: 'off', placeholder: rx.cardio ? '' : (ph.kg || ''), value: cur.kg || '', 'aria-label': `${nameOf(ex)} ${t('kg')} ${s + 1}` });
      const repIn = h('input', { id: `reps-${idx}-${s}`, inputmode: 'numeric', autocomplete: 'off', placeholder: rx.cardio ? parseInt(rx.reps, 10) : (ph.reps || ''), value: cur.reps || '', 'aria-label': `${nameOf(ex)} ${t('reps')} ${s + 1}` });
      const write = (patch) => {
        const ss = state.log[key] || (state.log[key] = { sets: {} });
        const arr = ss.sets[ex.id] || (ss.sets[ex.id] = []);
        arr[s] = Object.assign({}, arr[s] || {}, patch);
        for (let i = 0; i < arr.length; i++) if (!arr[i]) arr[i] = {};
        save();
      };
      kgIn.addEventListener('change', () => write({ kg: num(kgIn.value) }));
      repIn.addEventListener('change', () => write({ reps: num(repIn.value) }));
      const tick = h('button', { type: 'button', class: 'tick', id: `tick-${idx}-${s}`, 'aria-pressed': !!cur.done, 'aria-label': `${nameOf(ex)} ${t('sets')} ${s + 1}`, html: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' });
      tick.addEventListener('click', () => {
        const nowDone = tick.getAttribute('aria-pressed') !== 'true';
        const patch = { done: nowDone };
        if (nowDone) {
          if (!kgIn.value && kgIn.placeholder) { kgIn.value = kgIn.placeholder; }
          if (!repIn.value && repIn.placeholder) { repIn.value = repIn.placeholder; }
          patch.kg = num(kgIn.value); patch.reps = num(repIn.value);
        }
        write(patch);
        tick.setAttribute('aria-pressed', nowDone); row.classList.toggle('done', nowDone); refresh();
        if (nowDone && rx.rest) {
          if (s < n - 1) startRest(rx.rest, nameOf(ex), `${t('nextSet')} ${s + 2}/${n}`);
          else if (idx < day.items.length - 1) startRest(rx.rest, nameOf(ex), `${t('nextEx')} ${nameOf(day.items[idx + 1].ex)}`);
        }
      });
      row.append(h('span', { class: 'i' }, String(s + 1)),
        rx.cardio ? h('div', { class: 'field' }, h('input', { disabled: true, value: '', placeholder: '–', 'aria-hidden': 'true' })) : h('div', { class: 'field' }, kgIn, h('span', null, 'kg')),
        h('div', { class: 'field' }, repIn, h('span', null, rx.cardio ? t('minutes') : t('reps'))), tick);
      setsEl.append(row);
    }
    el.append(setsEl);
    refresh();
    return el;
  }
  const num = v => { const x = parseFloat(String(v).replace(',', '.')); return isFinite(x) ? x : ''; };

  // ---------- sheets ----------
  let sheetEls = null;
  function openSheet(title, body, id) {
    closeSheet();
    const scrim = h('div', { class: 'scrim', onclick: closeSheet });
    const sh = h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': title, id: id || 'sheet' },
      h('div', { class: 'wrap' }, h('div', { class: 'grab' }),
        h('div', { class: 'sheet-h' }, h('h3', null, title), h('button', { type: 'button', class: 'close', 'aria-label': 'Close', onclick: closeSheet }, '×')),
        body));
    document.body.append(scrim, sh);
    document.body.style.overflow = 'hidden';
    sheetEls = [scrim, sh];
  }
  function closeSheet() {
    if (!sheetEls) return;
    sheetEls.forEach(e => e.remove()); sheetEls = null; document.body.style.overflow = '';
    FIG.sweep();
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

  function openDetail(ex) {
    const body = h('div', null,
      h('div', { class: 'bigfig' }, figure(ex)),
      h('div', { class: 'meta' }, h('span', { class: 'tag' }, `${t('targets')}: ${L(SM[ex.sm])}`), h('span', { class: 'tag' }, L(EQUIP[ex.cat]))),
      h('ol', { class: 'cues' }, ex.cues.map(c => h('li', null, lang() === 'de' ? c[1] : c[0]))));
    openSheet(nameOf(ex), body, 'detail');
  }

  function openSwap(dayIdx, slotIdx) {
    const w = week();
    const opts = swapOptions(w, dayIdx, slotIdx);
    const cats = ['all', ...new Set(opts.map(o => o.ex.cat))];
    let filter = 'all';
    const list = h('div');
    const body = h('div', null, h('p', { class: 'muted', style: 'margin:0 0 10px;font-size:14px' }, t('blockNote')));
    const chips = h('div', { class: 'chips', id: 'swap-filter' });
    const drawChips = () => {
      chips.innerHTML = '';
      for (const c of cats) chips.append(h('button', { type: 'button', class: 'chip', 'aria-pressed': filter === c, onclick: () => { filter = c; drawChips(); drawList(); } }, c === 'all' ? t('all') : L(EQUIP[c])));
    };
    const drawList = () => {
      list.innerHTML = '';
      const bySm = {};
      for (const o of opts) if (filter === 'all' || o.ex.cat === filter) (bySm[o.ex.sm] = bySm[o.ex.sm] || []).push(o);
      const curSm = opts.find(o => o.current).ex.sm;
      const rank = sm => (sm === curSm ? 0 : bySm[sm].every(o => o.blockedBy) ? 2 : 1);
      for (const sm of Object.keys(bySm).sort((a, b) => rank(a) - rank(b))) {
        const g = h('div', { class: 'lib-group' }, h('h3', null, L(SM[sm]), h('span', null, String(bySm[sm].length))));
        const rows = h('div', { class: 'rows' });
        for (const o of bySm[sm]) {
          const blocked = !!o.blockedBy;
          const why = blocked ? `${t('blockedBy')} ${nameOf(o.blockedBy)}` : (o.usedOn.length ? `${t('usedOn')} ${o.usedOn.map(d => WD[lang()][w.days[d].wd]).join(', ')}` : L(EQUIP[o.ex.cat]));
          rows.append(h('button', { type: 'button', class: 'row' + (blocked ? ' blocked' : ''), disabled: blocked, id: 'opt-' + o.ex.id,
            onclick: () => {
              const pk = planKey();
              const c = state.choices[pk] || (state.choices[pk] = {});
              const d = c[dayIdx] || (c[dayIdx] = {});
              d[slotIdx] = o.ex.id; save(); closeSheet(); render();
            } },
            h('span', { class: 'mini' }, figure(o.ex)),
            h('span', null, h('b', null, nameOf(o.ex)), h('small', { class: blocked ? 'why' : '' }, why)),
            o.current ? h('span', { class: 'badge cur' }, t('current')) : (o.usedOn.length && !blocked ? h('span', { class: 'badge used' }, WD[lang()][w.days[o.usedOn[0]].wd]) : h('span'))));
        }
        g.append(rows); list.append(g);
      }
    };
    drawChips(); drawList();
    body.append(chips, list);
    openSheet(t('swapTitle'), body, 'swap');
  }

  // ---------- library ----------
  function renderLibrary() {
    const root = h('div', { class: 'wrap' });
    const ui = state.ui;
    ui.libGroup = ui.libGroup || 'all'; ui.libEq = ui.libEq || 'all';
    root.append(h('div', { class: 'top' }, h('h2', { style: 'font-size:28px;font-weight:800' }, t('library')), h('span', { class: 'pill mono' }, String(LIST.length))));
    const q = h('input', { class: 'search', id: 'lib-search', type: 'search', placeholder: t('search'), value: ui.libQ || '' });
    const gChips = h('div', { class: 'chips', id: 'lib-groups', style: 'margin-top:10px' });
    const eChips = h('div', { class: 'chips', id: 'lib-eq', style: 'margin-top:6px' });
    const list = h('div');
    const draw = () => {
      gChips.innerHTML = ''; eChips.innerHTML = '';
      for (const g of ['all', ...Object.keys(GROUPS)]) gChips.append(h('button', { type: 'button', class: 'chip', 'aria-pressed': ui.libGroup === g, onclick: () => { ui.libGroup = g; save(); draw(); } }, g === 'all' ? t('all') : L(GROUPS[g])));
      for (const c of ['all', ...Object.keys(EQUIP)]) eChips.append(h('button', { type: 'button', class: 'chip', 'aria-pressed': ui.libEq === c, onclick: () => { ui.libEq = c; save(); draw(); } }, c === 'all' ? t('all') : L(EQUIP[c])));
      list.innerHTML = '';
      const term = (q.value || '').trim().toLowerCase();
      const bySm = {};
      for (const ex of LIST) {
        if (ui.libGroup !== 'all' && SM[ex.sm].g !== ui.libGroup) continue;
        if (ui.libEq !== 'all' && ex.cat !== ui.libEq) continue;
        if (term && !(ex.en + ' ' + ex.de).toLowerCase().includes(term)) continue;
        (bySm[ex.sm] = bySm[ex.sm] || []).push(ex);
      }
      const keys = Object.keys(bySm);
      if (!keys.length) list.append(h('div', { class: 'empty' }, '–'));
      for (const sm of keys) {
        const g = h('div', { class: 'lib-group' }, h('h3', null, L(SM[sm]), h('span', null, String(bySm[sm].length))));
        const rows = h('div', { class: 'rows' });
        for (const ex of bySm[sm]) rows.append(h('button', { type: 'button', class: 'row', onclick: () => openDetail(ex) },
          h('span', { class: 'mini' }, figure(ex)), h('span', null, h('b', null, nameOf(ex)), h('small', null, L(EQUIP[ex.cat]))), h('span', { class: 'badge' }, ex.lvl === 2 ? t('int') : t('beg'))));
        g.append(rows); list.append(g);
      }
      FIG.sweep();
    };
    q.addEventListener('input', () => { ui.libQ = q.value; draw(); });
    root.append(q, gChips, eChips, list);
    draw();
    return root;
  }

  // ---------- progress ----------
  function renderProgress() {
    const root = h('div', { class: 'wrap' });
    root.append(h('div', { class: 'top' }, h('h2', { style: 'font-size:28px;font-weight:800' }, t('progress'))));
    const sessions = Object.keys(state.log).filter(k => sessionHasWork(state.log[k])).sort();
    const mon = thisMonday();
    const weekCount = {};
    let vol = 0;
    for (const k of sessions) {
      const d = k.split('#')[0]; const m = mondayOf(d);
      weekCount[m] = (weekCount[m] || 0) + 1;
      if (m === mon) for (const arr of Object.values(state.log[k].sets)) for (const s of arr) if (isDoneSet(s) && s.kg && s.reps) vol += s.kg * s.reps;
    }
    const weeks = [];
    for (let i = 7; i >= 0; i--) { const d = new Date(mon + 'T12:00:00'); d.setDate(d.getDate() - 7 * i); weeks.push(iso(d)); }
    const last4 = weeks.slice(4).reduce((a, m) => a + (weekCount[m] || 0), 0);
    root.append(h('div', { class: 'stats' },
      h('div', { class: 'stat' }, h('b', null, `${weekCount[mon] || 0}/${state.profile.days}`), h('span', null, t('thisWeek'))),
      h('div', { class: 'stat' }, h('b', null, String(last4)), h('span', null, t('last4'))),
      h('div', { class: 'stat' }, h('b', null, vol >= 10000 ? (vol / 1000).toFixed(1) + 'k' : String(Math.round(vol))), h('span', null, t('volume')))));

    if (!sessions.length) { root.append(h('div', { class: 'panel' }, h('div', { class: 'empty' }, t('noData')))); return root; }

    // workouts per week
    const p1 = h('div', { class: 'panel' }, h('h3', null, t('perWeek')));
    p1.append(barChart(weeks.map(m => ({ label: m.slice(8, 10) + '.' + m.slice(5, 7), v: weekCount[m] || 0, now: m === mon })), state.profile.days));
    root.append(p1);

    // per exercise
    const series = {};
    for (const k of sessions) {
      const d = k.split('#')[0];
      for (const [id, arr] of Object.entries(state.log[k].sets)) {
        const top = Math.max(0, ...arr.filter(isDoneSet).map(s => +s.kg || 0));
        if (top > 0 && BY_ID[id]) (series[id] = series[id] || []).push({ d, v: top });
      }
    }
    const ids = Object.keys(series).sort((a, b) => series[b].length - series[a].length);
    if (ids.length) {
      if (!state.ui.progEx || !series[state.ui.progEx]) state.ui.progEx = ids[0];
      const sel = h('select', { class: 'sel', id: 'prog-ex', 'aria-label': t('exProgress') }, ids.map(id => h('option', { value: id, selected: id === state.ui.progEx }, nameOf(BY_ID[id]))));
      const holder = h('div');
      const drawLine = () => { holder.innerHTML = ''; holder.append(lineChart(series[state.ui.progEx])); };
      sel.addEventListener('change', () => { state.ui.progEx = sel.value; save(); drawLine(); });
      const p2 = h('div', { class: 'panel' }, h('h3', null, t('exProgress')), sel, holder, h('div', { class: 'muted', style: 'font-size:12px;margin-top:6px' }, t('topSet')));
      drawLine();
      root.append(p2);

      const bests = ids.map(id => { const s = series[id]; let b = s[0]; for (const x of s) if (x.v >= b.v) b = x; return { id, b }; })
        .sort((a, b) => (a.b.d < b.b.d ? 1 : -1)).slice(0, 8);
      const p3 = h('div', { class: 'panel' }, h('h3', null, t('bests')));
      for (const x of bests) p3.append(h('div', { class: 'pr' }, h('span', null, nameOf(BY_ID[x.id])), h('span', { class: 'mono' }, `${x.b.v} kg · ${x.b.d.slice(8, 10)}.${x.b.d.slice(5, 7)}.`)));
      root.append(p3);
    }
    return root;
  }

  const SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs, parent) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function barChart(data, target) {
    const W = 320, H = 150, pl = 22, pb = 22, pt = 14;
    const max = Math.max(target, ...data.map(d => d.v), 1);
    const s = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart', role: 'img' });
    const y = v => pt + (H - pt - pb) * (1 - v / max);
    for (let v = 0; v <= max; v += Math.max(1, Math.ceil(max / 4))) {
      svg('line', { x1: pl, x2: W, y1: y(v), y2: y(v), class: 'grid' }, s);
      const tx = svg('text', { x: pl - 6, y: y(v) + 3, 'text-anchor': 'end', class: 'ax' }, s); tx.textContent = v;
    }
    const bw = (W - pl) / data.length;
    data.forEach((d, i) => {
      const x = pl + i * bw + bw * 0.2, w = bw * 0.6;
      if (d.v) svg('rect', { x, y: y(d.v), width: w, height: y(0) - y(d.v), rx: 3, class: 'barc' + (d.now ? ' now' : '') }, s);
      const tx = svg('text', { x: x + w / 2, y: H - 6, 'text-anchor': 'middle', class: 'ax' }, s); tx.textContent = d.label;
    });
    return s;
  }
  function lineChart(pts) {
    const W = 320, H = 170, pl = 32, pr = 12, pb = 22, pt = 18;
    const vs = pts.map(p => p.v);
    let lo = Math.min(...vs), hi = Math.max(...vs);
    if (hi === lo) { hi += 5; lo = Math.max(0, lo - 5); }
    const padv = (hi - lo) * 0.15; lo = Math.max(0, lo - padv); hi += padv;
    const s = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart', role: 'img' });
    const x = i => pts.length === 1 ? (pl + W - pr) / 2 : pl + (W - pl - pr) * i / (pts.length - 1);
    const y = v => pt + (H - pt - pb) * (1 - (v - lo) / (hi - lo));
    for (let k = 0; k <= 3; k++) {
      const v = lo + (hi - lo) * k / 3;
      svg('line', { x1: pl, x2: W - pr, y1: y(v), y2: y(v), class: 'grid' }, s);
      const tx = svg('text', { x: pl - 6, y: y(v) + 3, 'text-anchor': 'end', class: 'ax' }, s); tx.textContent = Math.round(v);
    }
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p.v).toFixed(1)}`).join(' ');
    if (pts.length > 1) svg('path', { d: `${d} L${x(pts.length - 1).toFixed(1)} ${y(lo)} L${x(0).toFixed(1)} ${y(lo)} Z`, class: 'area' }, s);
    svg('path', { d, class: 'ln' }, s);
    pts.forEach((p, i) => svg('circle', { cx: x(i), cy: y(p.v), r: i === pts.length - 1 ? 4.5 : 3, class: 'dot' + (i === pts.length - 1 ? ' end' : '') }, s));
    const lastP = pts[pts.length - 1];
    const tv = svg('text', { x: Math.min(x(pts.length - 1), W - pr - 4), y: y(lastP.v) - 9, 'text-anchor': 'end', class: 'val' }, s); tv.textContent = lastP.v + ' kg';
    const t0 = svg('text', { x: pl, y: H - 6, class: 'ax' }, s); t0.textContent = pts[0].d.slice(8, 10) + '.' + pts[0].d.slice(5, 7);
    if (pts.length > 1) { const t1 = svg('text', { x: W - pr, y: H - 6, 'text-anchor': 'end', class: 'ax' }, s); t1.textContent = lastP.d.slice(8, 10) + '.' + lastP.d.slice(5, 7); }
    return s;
  }

  // ---------- settings ----------
  function renderSettings() {
    const root = h('div', { class: 'wrap' });
    root.append(h('div', { class: 'top' }, h('h2', { style: 'font-size:28px;font-weight:800' }, t('settings'))));
    root.append(h('h3', { style: 'font-size:17px;margin-top:8px' }, t('profile')));
    root.append(renderSetup(true));
    root.append(h('h3', { style: 'font-size:17px' }, t('backup')));
    root.append(h('p', { class: 'muted', style: 'font-size:14px' }, t('backupHelp')));
    const file = h('input', { type: 'file', accept: 'application/json,.json', id: 'import-file', hidden: true });
    file.addEventListener('change', () => {
      const f = file.files && file.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const d = JSON.parse(r.result);
          if (!d || d.app !== 'satz' || !d.data) throw new Error('bad');
          state = Object.assign({ profile: null, choices: {}, log: {}, ui: { tab: 'train' } }, d.data);
          state.ui = Object.assign({ tab: 'train' }, state.ui); save(); render(); toast(t('imported'));
        } catch (e) { toast(t('importFail')); }
      };
      r.readAsText(f);
    });
    root.append(h('div', { class: 'btn-row' },
      h('button', { type: 'button', class: 'btn ghost', id: 'export', onclick: exportData }, t('exportBtn')),
      h('button', { type: 'button', class: 'btn ghost', id: 'import', onclick: () => file.click() }, t('importBtn'))), file);
    let armed = false;
    const del = h('button', { type: 'button', class: 'btn danger', id: 'delete-all', style: 'margin-top:28px' }, t('resetAll'));
    del.addEventListener('click', () => {
      if (!armed) { armed = true; del.textContent = t('resetSure'); setTimeout(() => { armed = false; del.textContent = t('resetAll'); }, 4000); return; }
      try { localStorage.removeItem(KEY); } catch (e) { }
      state = { profile: null, choices: {}, log: {}, ui: { tab: 'train' } }; render();
    });
    root.append(del);
    root.append(h('p', { class: 'muted', style: 'font-size:13px;margin:22px 0 8px' }, t('install')));
    root.append(h('p', { class: 'muted', style: 'font-size:12px;margin:0 0 20px' }, 'Satz · v1'));
    return root;
  }
  function exportData() {
    const blob = new Blob([JSON.stringify({ app: 'satz', v: 1, exported: new Date().toISOString(), data: state }, null, 1)], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: `satz-backup-${today()}.json` });
    document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  // ---------- toast ----------
  let toastT = null;
  function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) { el = h('div', { id: 'toast', class: 'toast', role: 'status' }); document.body.append(el); }
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => { el.hidden = true; }, 2600);
  }

  // ---------- rest timer ----------
  let tEnd = 0, tTotal = 0, tInt = null, rang = false, wake = null;
  function timerEl() {
    let el = document.getElementById('timer');
    if (el) return el;
    el = h('div', { class: 'timer', id: 'timer', hidden: true },
      h('div', { class: 'bar', id: 'tbar' }),
      h('div', { class: 'in' }, h('div', { class: 't', id: 'tt' }, '0:00'), h('div', { class: 'what', id: 'tw' }),
        h('button', { type: 'button', id: 'tplus', onclick: () => { tEnd += 15000; tTotal += 15; rang = false; el.classList.remove('over'); } }, t('plus15')),
        h('button', { type: 'button', id: 'tskip', onclick: stopRest }, t('done'))));
    document.body.append(el);
    return el;
  }
  const fmt = s => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + pad2(s % 60); };
  function startRest(sec, name, next) {
    const el = timerEl();
    el.querySelector('#tplus').textContent = t('plus15'); el.querySelector('#tskip').textContent = t('done');
    tTotal = sec; tEnd = Date.now() + sec * 1000; rang = false;
    el.hidden = false; el.classList.remove('over'); document.body.classList.add('timer-on');
    el.querySelector('#tw').innerHTML = ''; el.querySelector('#tw').append(`${t('rest')} · ${name}`, h('small', null, next));
    clearInterval(tInt); tInt = setInterval(tick, 250); tick();
    try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(l => { wake = l; }).catch(() => { }); } catch (e) { }
  }
  function tick() {
    const el = timerEl();
    const left = (tEnd - Date.now()) / 1000;
    el.querySelector('#tt').textContent = left > 0 ? fmt(left) : 'Go';
    el.querySelector('#tbar').style.width = Math.min(100, 100 * (1 - left / tTotal)) + '%';
    if (left <= 0 && !rang) {
      rang = true; el.classList.add('over'); beep();
      el.querySelector('#tw').firstChild.textContent = t('restDone');
      setTimeout(() => { if (rang) stopRest(); }, 8000);
    }
  }
  function stopRest() {
    clearInterval(tInt); rang = false;
    const el = document.getElementById('timer'); if (el) el.hidden = true;
    document.body.classList.remove('timer-on');
    try { if (wake) { wake.release(); wake = null; } } catch (e) { }
  }
  let actx = null;
  function beep() {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.25].forEach(off => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.frequency.value = 880; o.connect(g); g.connect(actx.destination);
        const t0 = actx.currentTime + off; g.gain.setValueAtTime(0.18, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);
        o.start(t0); o.stop(t0 + 0.22);
      });
    } catch (e) { }
    try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) { }
  }
  // unlock audio on first touch (iOS)
  document.addEventListener('touchend', function once() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume(); } catch (e) { } document.removeEventListener('touchend', once); }, { passive: true });

  render();

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
  }
})();
