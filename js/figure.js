/* Satz – mannequin renderer.
   Every exercise is two poses (A ↔ B) on a 200×200 canvas, side view facing right
   unless motion.v === 'f' (front view). Joints: h head, n neck/shoulder, p hip,
   le/lh far elbow/hand, re/rh near elbow/hand, lk/lf far knee/ankle, rk/rf near knee/ankle. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const J = ['h', 'n', 'p', 'le', 'lh', 're', 'rh', 'lk', 'lf', 'rk', 'rf'];
  const PAIRS = [['le', 're'], ['lh', 'rh'], ['lk', 'rk'], ['lf', 'rf']];

  function mk(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function norm(o) {
    o = Object.assign({}, o);
    for (const [l, r] of PAIRS) { if (!o[l]) o[l] = o[r]; if (!o[r]) o[r] = o[l]; }
    return o;
  }
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const len = a => Math.hypot(a[0], a[1]) || 1;
  const unit = a => mul(a, 1 / len(a));
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const f1 = v => v.toFixed(1);

  function seg(el, a, b) {
    el.setAttribute('x1', f1(a[0])); el.setAttribute('y1', f1(a[1]));
    el.setAttribute('x2', f1(b[0])); el.setAttribute('y2', f1(b[1]));
  }
  function circ(el, c) { el.setAttribute('cx', f1(c[0])); el.setAttribute('cy', f1(c[1])); }

  // Which body parts light up for each sub-muscle.
  // kind: 'torso' (from,to along neck→hip, side: +1 front / -1 back / 0 centre),
  //       'thigh'/'shin'/'upper'/'fore' (side offset), 'glute', 'gmed', 'delt'.
  const HL = {
    GMX: [{ k: 'glute' }], GMD: [{ k: 'gmed' }],
    QV: [{ k: 'thigh', s: 1 }], QR: [{ k: 'thigh', s: 1 }],
    HH: [{ k: 'thigh', s: -1 }, { k: 'glute', soft: 1 }], HC: [{ k: 'thigh', s: -1 }],
    AD: [{ k: 'thigh', s: 0 }], CG: [{ k: 'shin', s: -1 }], CS: [{ k: 'shin', s: -1 }],
    CU: [{ k: 'torso', a: 0.04, b: 0.3, s: 1 }], CM: [{ k: 'torso', a: 0.1, b: 0.45, s: 1 }],
    LT: [{ k: 'torso', a: 0.18, b: 0.62, s: -1 }], MB: [{ k: 'torso', a: 0.05, b: 0.38, s: -1 }],
    LB: [{ k: 'torso', a: 0.6, b: 0.95, s: -1 }], TR: [{ k: 'trap' }],
    DF: [{ k: 'delt', s: 1 }], DS: [{ k: 'delt', s: 0 }], DR: [{ k: 'delt', s: -1 }],
    BL: [{ k: 'upper', s: 1 }], BS: [{ k: 'upper', s: 1 }], BB: [{ k: 'fore', s: 0 }, { k: 'upper', s: 1, soft: 1 }],
    TL: [{ k: 'upper', s: -1 }], TT: [{ k: 'upper', s: -1 }],
    AB: [{ k: 'torso', a: 0.45, b: 0.95, s: 1 }], OB: [{ k: 'torso', a: 0.42, b: 0.95, s: 0 }],
    ST: [{ k: 'torso', a: 0.2, b: 0.95, s: 0 }], CA: []
  };

  const W = { torso: 26, upper: 11, fore: 9, thigh: 17, shin: 12 };

  function createFigure(ex, motion) {
    const M = motion;
    const A = norm(M.A), B = norm(Object.assign({}, M.A, M.B));
    const front = M.v === 'f';
    const face = M.face || 1;
    const svg = mk('svg', { viewBox: '0 0 200 200', class: 'fig', 'aria-hidden': 'true' });
    mk('line', { x1: 6, y1: 189, x2: 194, y2: 189, class: 'floor' }, svg);
    const scene = (ex.scene || '') + (M.scene || '');
    if (scene) { const g = mk('g', { class: 'scene' }, svg); g.innerHTML = scene; }
    const eq = Object.assign({}, M.eq || {}, ex.eq || {});

    const cables = (eq.cable || []).map(c => [c, mk('line', { class: 'cable' }, svg)]);
    const lines = (eq.line || []).map(c => [c, mk('line', { class: 'bar' }, svg)]);

    const parts = {};
    const g = (cls) => mk('g', { class: cls }, svg);
    const farG = g(front ? 'body' : 'body far');
    parts.lthigh = mk('line', { 'stroke-width': W.thigh }, farG);
    parts.lshin = mk('line', { 'stroke-width': W.shin }, farG);
    parts.lupper = mk('line', { 'stroke-width': W.upper }, farG);
    parts.lfore = mk('line', { 'stroke-width': W.fore }, farG);
    const farHL = g('hl' + (front ? '' : ' far'));
    const bodyG = g('body');
    parts.torso = mk('line', { 'stroke-width': W.torso }, bodyG);
    const torsoHL = g('hl');
    const nearLegG = g('body');
    parts.rthigh = mk('line', { 'stroke-width': W.thigh }, nearLegG);
    parts.rshin = mk('line', { 'stroke-width': W.shin }, nearLegG);
    const legHL = g('hl');
    const nearArmG = g('body');
    parts.rupper = mk('line', { 'stroke-width': W.upper }, nearArmG);
    parts.rfore = mk('line', { 'stroke-width': W.fore }, nearArmG);
    const armHL = g('hl');
    parts.head = mk('circle', { r: 11, class: 'head' }, svg);

    // highlight elements
    const hls = [];
    const spec = HL[ex.sm] || [];
    for (const h of spec) {
      const soft = h.soft ? ' soft' : '';
      if (h.k === 'torso') hls.push({ h, el: mk('line', { 'stroke-width': h.s ? 11 : 13, class: soft }, torsoHL) });
      else if (h.k === 'glute') hls.push({ h, el: mk('circle', { r: 11, class: soft }, torsoHL) });
      else if (h.k === 'gmed') {
        hls.push({ h, el: mk('circle', { r: 8 }, torsoHL) });
        if (front) hls.push({ h: { k: 'gmed2' }, el: mk('circle', { r: 8 }, torsoHL) });
      }
      else if (h.k === 'delt') {
        hls.push({ h, el: mk('circle', { r: 8, class: soft }, armHL) });
        if (front) hls.push({ h: { k: 'delt2', s: h.s }, el: mk('circle', { r: 8 }, farHL) });
      }
      else if (h.k === 'trap') hls.push({ h, el: mk('line', { 'stroke-width': 10 }, torsoHL) });
      else {
        const nearParent = (h.k === 'thigh' || h.k === 'shin') ? legHL : armHL;
        const w = { thigh: 9, shin: 7, upper: 7, fore: 6 }[h.k];
        hls.push({ h, side: 'r', el: mk('line', { 'stroke-width': w, class: soft }, nearParent) });
        hls.push({ h, side: 'l', el: mk('line', { 'stroke-width': w, class: soft }, farHL) });
      }
    }

    // equipment in front
    const dbs = (eq.db || []).map(j => [j, mk('g', { class: 'db' }, svg)]);
    dbs.forEach(([, gg]) => { mk('line', {}, gg); mk('line', { class: 'cap' }, gg); mk('line', { class: 'cap' }, gg); });
    const kbs = (eq.kb || []).map(j => [j, mk('circle', { r: 8, class: 'kb' }, svg)]);
    const plates = [];
    if (eq.bb) plates.push([eq.bb, mk('circle', { r: 13, class: 'plate' }, svg)]);
    if (eq.ez) plates.push([eq.ez, mk('circle', { r: 9, class: 'plate' }, svg)]);
    const pads = (eq.pad || []).map(j => [j, mk('circle', { r: 7, class: 'pad' }, svg)]);
    const sled = eq.sled ? mk('line', { class: 'sled' }, svg) : null;
    const ball = eq.ball ? mk('circle', { r: 15, class: 'ball' }, svg) : null;
    const wheel = eq.wheel ? mk('circle', { r: 9, class: 'wheel' }, svg) : null;
    const barh = eq.barh ? mk('line', { class: 'barh' }, svg) : null;
    const bands = (eq.band || []).map(b => [b, mk('line', { class: 'band' }, svg)]);
    const bandk = eq.bandk ? mk('line', { class: 'band' }, svg) : null;

    function pt(q, j) { return Array.isArray(j) ? j : q[j]; }

    function update(s) {
      const q = {};
      for (const j of J) q[j] = lerp(A[j], B[j], s);
      seg(parts.lthigh, q.p, q.lk); seg(parts.lshin, q.lk, q.lf);
      seg(parts.lupper, q.n, q.le); seg(parts.lfore, q.le, q.lh);
      seg(parts.torso, q.n, q.p);
      seg(parts.rthigh, q.p, q.rk); seg(parts.rshin, q.rk, q.rf);
      seg(parts.rupper, q.n, q.re); seg(parts.rfore, q.re, q.rh);
      circ(parts.head, q.h);

      const t = unit(sub(q.n, q.p));                // hip → neck
      const fr = front ? [0, 0] : mul([-t[1], t[0]], face); // body front normal
      for (const { h, el, side } of hls) {
        const k = h.k;
        if (k === 'torso') {
          const a = lerp(q.n, q.p, h.a), b = lerp(q.n, q.p, h.b);
          const off = mul(fr, (h.s || 0) * 7);
          seg(el, add(a, off), add(b, off));
        } else if (k === 'glute') {
          circ(el, front ? add(q.p, [0, -2]) : add(q.p, add(mul(fr, -8), mul(t, 3))));
        } else if (k === 'gmed') {
          circ(el, front ? add(q.p, [-11, -6]) : add(q.p, add(mul(t, 9), mul(fr, -3))));
        } else if (k === 'gmed2') {
          circ(el, add(q.p, [11, -6]));
        } else if (k === 'delt') {
          circ(el, front ? add(q.n, [12, 2]) : add(q.n, add(mul(fr, (h.s || 0) * 5), mul(t, -3))));
        } else if (k === 'delt2') {
          circ(el, add(q.n, [-12, 2]));
        } else if (k === 'trap') {
          seg(el, add(q.n, mul(fr, -3)), lerp(q.n, q.h, 0.45));
        } else {
          const ends = {
            thigh: [q[side + 'k'] && q.p, q[side + 'k']],
            shin: [q[side + 'k'], q[side + 'f']],
            upper: [q.n, q[side + 'e']],
            fore: [q[side + 'e'], q[side + 'h']]
          }[k];
          let a = ends[0], b = ends[1];
          const d = unit(sub(b, a));
          let nrm = [-d[1], d[0]];
          // orient the offset toward the body's front (or limb front)
          if (!front && (nrm[0] * fr[0] + nrm[1] * fr[1]) < 0) nrm = mul(nrm, -1);
          if (front) nrm = [0, 0];
          const w = { thigh: 3.5, shin: 2.5, upper: 2.2, fore: 0 }[k];
          const off = mul(nrm, (h.s || 0) * w);
          const a2 = lerp(a, b, 0.12), b2 = lerp(a, b, 0.86);
          seg(el, add(a2, off), add(b2, off));
        }
      }

      for (const [[j, to], el] of cables) seg(el, pt(q, j), to);
      for (const [[j, to], el] of lines) seg(el, pt(q, j), to);
      for (const [j, gg] of dbs) {
        const c = q[j]; const [bar, c1, c2] = gg.children;
        seg(bar, [c[0] - 9, c[1]], [c[0] + 9, c[1]]);
        seg(c1, [c[0] - 9, c[1] - 5], [c[0] - 9, c[1] + 5]);
        seg(c2, [c[0] + 9, c[1] - 5], [c[0] + 9, c[1] + 5]);
      }
      for (const [j, el] of kbs) circ(el, add(q[j], [0, 7]));
      for (const [j, el] of plates) {
        let c = q[j];
        if (j === 'n') c = add(q.n, mul(fr, -6));
        if (j === 'p') c = add(q.p, mul(fr, 10));
        circ(el, c);
      }
      for (const [j, el] of pads) circ(el, q[j]);
      if (sled) { const f = q[eq.sled]; seg(sled, add(f, [-11, -11]), add(f, [11, 11])); }
      if (ball) circ(ball, [q[eq.ball][0] + 6, 174]);
      if (wheel) circ(wheel, [q[eq.wheel][0], 180]);
      if (barh) { const y = (q.lh[1] + q.rh[1]) / 2; seg(barh, [44, y], [156, y]); }
      for (const [[a, b], el] of bands) seg(el, pt(q, a), pt(q, b));
      if (bandk) seg(bandk, lerp(q.lk, q.lf, 0.45), lerp(q.rk, q.rf, 0.45));
    }

    update(0);
    return { svg, update, dur: M.dur || ex.dur || 2600, hold: M.hold };
  }

  // One animation loop for every figure on screen.
  const live = new Set();
  const visible = new WeakSet();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
    for (const e of es) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target);
  }) : null;
  const reduce = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  function mount(fig) {
    live.add(fig);
    if (io) io.observe(fig.svg); else visible.add(fig.svg);
    return fig;
  }
  function sweep() { for (const f of live) if (!f.svg.isConnected) { live.delete(f); if (io) io.unobserve(f.svg); } }

  function frame(now) {
    for (const f of live) {
      if (!visible.has(f.svg)) continue;
      let s;
      if (reduce.matches) s = 1;
      else {
        const x = (now % f.dur) / f.dur;
        s = 0.5 - 0.5 * Math.cos(2 * Math.PI * x);
      }
      f.update(s);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  window.SatzFigure = { createFigure, mount, sweep };
})();
