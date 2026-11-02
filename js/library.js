/* Satz – exercise library.
   Exercise selection and muscle tags cross-checked against hasaneyldrm/exercises-dataset (MIT data);
   names, cues and animations written for this app. */
(function () {
  const S = window.SatzScenes;

  // Sub-muscles: the unit the "one per session" rule works on.
  const SM = {
    GMX: { g: 'glutes', en: 'Glute max', de: 'Großer Gesäßmuskel' },
    GMD: { g: 'glutes', en: 'Glute med (side)', de: 'Mittlerer Gesäßmuskel (seitlich)' },
    QV: { g: 'quads', en: 'Quads – squat & press', de: 'Quadrizeps – Beugen & Drücken' },
    QR: { g: 'quads', en: 'Quads – rectus femoris', de: 'Quadrizeps – Rectus femoris' },
    HH: { g: 'hams', en: 'Hamstrings – hip hinge', de: 'Beinbeuger – Hüftbeuge' },
    HC: { g: 'hams', en: 'Hamstrings – knee curl', de: 'Beinbeuger – Kniebeugung' },
    AD: { g: 'adductors', en: 'Adductors (inner thigh)', de: 'Adduktoren (Innenschenkel)' },
    CG: { g: 'calves', en: 'Calves – gastrocnemius', de: 'Waden – Zwillingswadenmuskel' },
    CS: { g: 'calves', en: 'Calves – soleus', de: 'Waden – Schollenmuskel' },
    CU: { g: 'chest', en: 'Upper chest', de: 'Obere Brust' },
    CM: { g: 'chest', en: 'Mid chest', de: 'Mittlere Brust' },
    LT: { g: 'back', en: 'Lats', de: 'Latissimus' },
    MB: { g: 'back', en: 'Mid back', de: 'Mittlerer Rücken' },
    LB: { g: 'back', en: 'Lower back', de: 'Unterer Rücken' },
    TR: { g: 'back', en: 'Upper traps', de: 'Oberer Trapez (Nacken)' },
    DF: { g: 'shoulders', en: 'Front delts', de: 'Vordere Schulter' },
    DS: { g: 'shoulders', en: 'Side delts', de: 'Seitliche Schulter' },
    DR: { g: 'shoulders', en: 'Rear delts', de: 'Hintere Schulter' },
    BL: { g: 'biceps', en: 'Biceps – long head', de: 'Bizeps – langer Kopf' },
    BS: { g: 'biceps', en: 'Biceps – short head', de: 'Bizeps – kurzer Kopf' },
    BB: { g: 'biceps', en: 'Brachialis & forearm', de: 'Oberarmmuskel & Unterarm' },
    TL: { g: 'triceps', en: 'Triceps – long head', de: 'Trizeps – langer Kopf' },
    TT: { g: 'triceps', en: 'Triceps – lateral & medial', de: 'Trizeps – seitlicher & innerer Kopf' },
    AB: { g: 'core', en: 'Abs (flexion)', de: 'Gerader Bauch' },
    OB: { g: 'core', en: 'Obliques', de: 'Seitlicher Bauch' },
    ST: { g: 'core', en: 'Core stability', de: 'Rumpfstabilität' },
    CA: { g: 'cardio', en: 'Cardio', de: 'Ausdauer' }
  };

  const GROUPS = {
    glutes: { en: 'Glutes', de: 'Gesäß' }, quads: { en: 'Quads', de: 'Oberschenkel vorne' },
    hams: { en: 'Hamstrings', de: 'Oberschenkel hinten' }, adductors: { en: 'Adductors', de: 'Adduktoren' },
    calves: { en: 'Calves', de: 'Waden' }, chest: { en: 'Chest', de: 'Brust' }, back: { en: 'Back', de: 'Rücken' },
    shoulders: { en: 'Shoulders', de: 'Schultern' }, biceps: { en: 'Biceps', de: 'Bizeps' },
    triceps: { en: 'Triceps', de: 'Trizeps' }, core: { en: 'Core', de: 'Rumpf' }, cardio: { en: 'Cardio', de: 'Cardio' }
  };

  const EQUIP = {
    bb: { en: 'Barbell', de: 'Langhantel' }, db: { en: 'Dumbbell', de: 'Kurzhantel' },
    cable: { en: 'Cable', de: 'Kabelzug' }, machine: { en: 'Machine', de: 'Maschine' },
    smith: { en: 'Smith', de: 'Multipresse' }, bw: { en: 'Bodyweight', de: 'Körpergewicht' },
    band: { en: 'Band', de: 'Band' }, kb: { en: 'Kettlebell', de: 'Kettlebell' }, cardio: { en: 'Cardio machine', de: 'Cardiogerät' }
  };

  const L = [];
  // id, sub-muscle, motion, equipment, level (1 easy / 2 more skill), compound, EN, DE, cues [[en,de]...], options
  function X(id, sm, m, cat, lvl, comp, en, de, cues, opt) {
    L.push(Object.assign({ id, sm, m, cat, lvl, comp, en, de, cues: cues || [] }, opt || {}));
  }

  // ---------- GLUTE MAX ----------
  X('hip_thrust', 'GMX', 'thrust', 'bb', 2, 1, 'Barbell hip thrust', 'Hip Thrust (Langhantel)', [
    ['Upper back on the bench edge, pad on the bar', 'Oberer Rücken an der Bankkante, Polster auf der Stange'],
    ['Chin tucked, ribs down', 'Kinn zur Brust, Rippen unten'],
    ['Drive through heels, hold 1 s at the top', 'Über die Fersen drücken, oben 1 s halten']]);
  X('hip_thrust_smith', 'GMX', 'thrust', 'smith', 1, 1, 'Smith machine hip thrust', 'Hip Thrust an der Multipresse', [
    ['Bar fixed in the rails, easier to set up', 'Stange läuft in der Führung – leichter einzurichten'],
    ['Shins vertical at the top', 'Oben sind die Schienbeine senkrecht'],
    ['Squeeze glutes, don’t arch the lower back', 'Gesäß anspannen, kein Hohlkreuz']], { scene: S.RAILS });
  X('hip_thrust_m', 'GMX', 'thrust', 'machine', 1, 1, 'Hip thrust machine', 'Hip-Thrust-Maschine', [
    ['Belt or pad across the hips', 'Gurt oder Polster quer über die Hüfte'],
    ['Push up until hips are fully straight', 'Hochdrücken, bis die Hüfte ganz gestreckt ist'],
    ['Lower slowly, keep tension', 'Langsam ablassen, Spannung halten']]);
  X('glute_bridge_bb', 'GMX', 'bridge', 'bb', 1, 1, 'Barbell glute bridge', 'Glute Bridge mit Langhantel', [
    ['Back on the floor, bar over the hips', 'Rücken am Boden, Stange auf der Hüfte'],
    ['Feet hip-width, heels close', 'Füße hüftbreit, Fersen nah am Gesäß'],
    ['Lift hips, squeeze hard at the top', 'Hüfte heben, oben fest anspannen']], { eq: { bb: 'p' } });
  X('sl_bridge', 'GMX', 'sl_bridge', 'bw', 1, 0, 'Single-leg glute bridge', 'Einbeinige Glute Bridge', [
    ['One foot down, other knee up', 'Ein Fuß am Boden, anderes Knie oben'],
    ['Push through the heel, hips level', 'Über die Ferse drücken, Hüfte gerade halten']], { side: 1 });
  X('frog_pump', 'GMX', 'bridge', 'bw', 1, 0, 'Frog pump', 'Frog Pump', [
    ['Soles together, knees out', 'Fußsohlen zusammen, Knie nach außen'],
    ['Short fast reps, squeeze each one', 'Kurze, zügige Wiederholungen mit Anspannung']]);
  X('kickback_cable', 'GMX', 'kickback', 'cable', 1, 0, 'Cable glute kickback', 'Glute Kickback am Kabel', [
    ['Ankle strap on, hold the frame', 'Fußschlaufe an, am Gestell festhalten'],
    ['Kick back and slightly up, no back arch', 'Nach hinten-oben kicken, kein Hohlkreuz'],
    ['Squeeze at the top, return slowly', 'Oben anspannen, langsam zurück']], { side: 1 });
  X('kickback_m', 'GMX', 'kickback_m', 'machine', 1, 0, 'Glute kickback machine', 'Glute-Kickback-Maschine', [
    ['Forearms on the pads, back flat', 'Unterarme auf den Polstern, Rücken gerade'],
    ['Press the plate back with the heel', 'Mit der Ferse die Platte nach hinten drücken']], { side: 1 });
  X('pull_through', 'GMX', 'pull_through', 'cable', 1, 1, 'Cable pull-through', 'Cable Pull-Through', [
    ['Face away from a low cable, rope between legs', 'Rücken zum tiefen Kabel, Seil zwischen den Beinen'],
    ['Hinge back, then snap the hips forward', 'Hüfte nach hinten schieben, dann nach vorne strecken']]);
  X('glute_backext', 'GMX', 'back_ext', 'bw', 1, 0, 'Glute-focused back extension', 'Rückenstrecker mit Gesäßfokus', [
    ['Pad below the hip bones, round the upper back', 'Polster unter dem Hüftknochen, oberen Rücken leicht rund'],
    ['Lift by squeezing the glutes, not the lower back', 'Durch Gesäßanspannung hochkommen, nicht aus dem unteren Rücken']]);
  X('reverse_lunge', 'GMX', 'lunge', 'db', 1, 1, 'Reverse lunge', 'Ausfallschritt rückwärts', [
    ['Step back, lower the back knee', 'Nach hinten treten, hinteres Knie absenken'],
    ['Slight forward lean for more glute', 'Leicht nach vorne lehnen für mehr Gesäß'],
    ['Push through the front heel to return', 'Über die vordere Ferse zurückdrücken']], { side: 1 });
  X('bss', 'GMX', 'bss', 'db', 2, 1, 'Bulgarian split squat', 'Bulgarian Split Squat', [
    ['Rear foot on the bench', 'Hinterer Fuß auf der Bank'],
    ['Lean forward slightly, front knee tracks the toes', 'Leicht nach vorne lehnen, Knie über den Zehen'],
    ['Go deep, drive up through the heel', 'Tief runter, über die Ferse hoch']], { side: 1 });
  X('step_up', 'GMX', 'step_up', 'db', 1, 1, 'Dumbbell step-up', 'Step-up mit Kurzhanteln', [
    ['Whole foot on a knee-high box', 'Ganzer Fuß auf einer kniehohen Box'],
    ['Push up with the top leg only', 'Nur mit dem oberen Bein hochdrücken'],
    ['Lower slowly', 'Langsam absenken']], { side: 1 });

  // ---------- GLUTE MED ----------
  X('abduction_m', 'GMD', 'abduction', 'machine', 1, 0, 'Hip abduction machine', 'Abduktoren-Maschine (außen)', [
    ['Sit tall, lean slightly forward', 'Aufrecht sitzen, leicht nach vorne lehnen'],
    ['Push knees out against the pads', 'Knie gegen die Polster nach außen drücken'],
    ['Control the way back', 'Kontrolliert zurück']]);
  X('abduction_lean', 'GMD', 'abduction', 'machine', 1, 0, 'Abduction machine, leaning forward', 'Abduktoren-Maschine vorgebeugt', [
    ['Hinge forward over the thighs', 'Oberkörper nach vorne über die Oberschenkel'],
    ['Targets the upper glute more', 'Trifft stärker den oberen Gesäßbereich']]);
  X('cable_abd', 'GMD', 'cable_abd', 'cable', 1, 0, 'Standing cable abduction', 'Abduktion am Kabel stehend', [
    ['Ankle strap on the outside leg', 'Fußschlaufe am äußeren Bein'],
    ['Lift the leg out to the side, toes forward', 'Bein seitlich anheben, Zehen nach vorne'],
    ['Don’t lean away', 'Oberkörper nicht wegkippen']], { side: 1 });
  X('band_walk', 'GMD', 'band_walk', 'band', 1, 0, 'Banded lateral walk', 'Seitliche Schritte mit Band', [
    ['Band above the knees, half squat', 'Band über den Knien, halbe Kniebeuge'],
    ['Step sideways, keep tension', 'Seitwärts gehen, Band bleibt gespannt']]);
  X('side_lying_abd', 'GMD', 'side_lying_abd', 'bw', 1, 0, 'Side-lying leg raise', 'Seitliches Beinheben im Liegen', [
    ['Lie on your side, top leg straight', 'Auf der Seite liegen, oberes Bein gestreckt'],
    ['Lift slightly back, toes forward', 'Leicht nach hinten anheben, Zehen nach vorne']], { side: 1 });

  // ---------- QUADS ----------
  X('back_squat', 'QV', 'squat_back', 'bb', 2, 1, 'Barbell back squat', 'Kniebeuge (Langhantel)', [
    ['Bar on the upper back, brace your core', 'Stange auf dem oberen Rücken, Rumpf fest'],
    ['Sit down between your heels', 'Zwischen die Fersen absetzen'],
    ['Knees out, chest up, push the floor away', 'Knie nach außen, Brust raus, Boden wegdrücken']]);
  X('front_squat', 'QV', 'squat_front', 'bb', 2, 1, 'Front squat', 'Frontkniebeuge', [
    ['Bar on the front shoulders, elbows high', 'Stange vorne auf den Schultern, Ellbogen hoch'],
    ['Stay upright, go deep', 'Aufrecht bleiben, tief gehen']]);
  X('goblet_squat', 'QV', 'goblet', 'db', 1, 1, 'Goblet squat', 'Goblet Squat', [
    ['Hold one dumbbell against your chest', 'Eine Kurzhantel vor der Brust halten'],
    ['Sit down between your heels, chest tall', 'Zwischen die Fersen absetzen, Brust aufrecht'],
    ['Push the floor away to stand', 'Boden wegdrücken zum Aufstehen']]);
  X('smith_squat', 'QV', 'squat_back', 'smith', 1, 1, 'Smith machine squat', 'Kniebeuge an der Multipresse', [
    ['Feet slightly in front of the bar', 'Füße etwas vor der Stange'],
    ['Lower under control, knees out', 'Kontrolliert runter, Knie nach außen']], { scene: S.RAILS });
  X('hack_squat', 'QV', 'squat_back', 'machine', 1, 1, 'Hack squat machine', 'Hackenschmidt-Maschine', [
    ['Back flat on the pad, feet mid-platform', 'Rücken am Polster, Füße mittig'],
    ['Go deep, don’t lock the knees at the top', 'Tief gehen, oben Knie nicht durchstrecken']], { scene: S.HACK, eq: { bb: null, pad: ['n'] } });
  X('leg_press', 'QV', 'leg_press', 'machine', 1, 1, 'Leg press', 'Beinpresse', [
    ['Feet shoulder-width, mid-plate', 'Füße schulterbreit, mittig auf der Platte'],
    ['Lower until knees are near the chest, back stays down', 'Ablassen bis Knie nah an der Brust, Rücken bleibt am Polster'],
    ['Don’t lock the knees', 'Knie nicht durchstrecken']]);
  X('walking_lunge', 'QV', 'lunge', 'db', 1, 1, 'Walking lunge', 'Ausfallschritte gehend', [
    ['Long step forward, back knee toward the floor', 'Großer Schritt nach vorne, hinteres Knie Richtung Boden'],
    ['Stay upright for more quads', 'Aufrecht bleiben für mehr Quadrizeps']], { side: 1 });
  X('split_squat', 'QV', 'split_squat', 'db', 1, 1, 'Split squat', 'Split Squat', [
    ['Staggered stance, feet stay put', 'Schrittstellung, Füße bleiben stehen'],
    ['Drop straight down, front knee forward', 'Gerade nach unten, vorderes Knie nach vorne']], { side: 1 });
  X('heel_squat', 'QV', 'heel_squat', 'db', 1, 1, 'Heel-elevated goblet squat', 'Goblet Squat mit erhöhten Fersen', [
    ['Heels on a plate or wedge', 'Fersen auf einer Scheibe oder einem Keil'],
    ['Knees travel far forward, torso upright', 'Knie weit nach vorne, Oberkörper aufrecht']]);
  X('leg_ext', 'QR', 'leg_ext', 'machine', 1, 0, 'Leg extension', 'Beinstrecker', [
    ['Knee in line with the machine pivot', 'Knie auf Höhe der Drehachse'],
    ['Straighten fully, hold 1 s', 'Ganz strecken, 1 s halten'],
    ['Lower slowly', 'Langsam ablassen']]);
  X('leg_ext_1', 'QR', 'leg_ext', 'machine', 1, 0, 'Single-leg extension', 'Einbeiniger Beinstrecker', [
    ['One leg at a time evens out sides', 'Ein Bein nach dem anderen gleicht Seiten aus'],
    ['Lean back slightly for more rectus femoris', 'Leicht zurücklehnen für mehr Rectus femoris']], { side: 1 });
  X('sissy_squat', 'QR', 'sissy', 'bw', 2, 0, 'Sissy squat', 'Sissy Squat', [
    ['Hold on to something, rise on your toes', 'Irgendwo festhalten, auf die Zehen'],
    ['Knees go forward, hips stay straight', 'Knie nach vorne, Hüfte bleibt gestreckt']]);
  X('rev_nordic', 'QR', 'rev_nordic', 'bw', 2, 0, 'Reverse nordic', 'Reverse Nordic', [
    ['Kneel, body straight from knee to head', 'Knien, Körper gerade von Knie bis Kopf'],
    ['Lean back slowly, come back up', 'Langsam zurücklehnen, wieder hochkommen']]);

  // ---------- HAMSTRINGS ----------
  X('rdl_bb', 'HH', 'rdl', 'bb', 2, 1, 'Romanian deadlift', 'Rumänisches Kreuzheben', [
    ['Soft knees, push your hips back', 'Knie leicht gebeugt, Hüfte nach hinten'],
    ['Bar slides close down the thighs', 'Stange gleitet nah an den Beinen runter'],
    ['Stop at a hamstring stretch, squeeze up', 'Bei Dehnung im Beinbeuger stoppen, hochkommen']], { eq: { bb: 'rh' } });
  X('rdl_db', 'HH', 'rdl', 'db', 1, 1, 'Dumbbell Romanian deadlift', 'Rumänisches Kreuzheben (Kurzhantel)', [
    ['Dumbbells in front of the thighs', 'Kurzhanteln vor den Oberschenkeln'],
    ['Hips back, flat back', 'Hüfte nach hinten, Rücken gerade']], { eq: { db: ['rh', 'lh'] } });
  X('sl_rdl', 'HH', 'sl_rdl', 'db', 2, 1, 'Single-leg Romanian deadlift', 'Einbeiniges rumänisches Kreuzheben', [
    ['Stand on one leg, other leg goes back', 'Auf einem Bein, anderes Bein nach hinten'],
    ['Hips stay level', 'Hüfte bleibt gerade']], { side: 1 });
  X('good_morning', 'HH', 'good_morning', 'bb', 2, 1, 'Good morning', 'Good Morning', [
    ['Light bar on the upper back', 'Leichte Stange auf dem oberen Rücken'],
    ['Hinge forward with a flat back', 'Mit geradem Rücken nach vorne beugen']]);
  X('deadlift', 'HH', 'deadlift', 'bb', 2, 1, 'Deadlift', 'Kreuzheben', [
    ['Bar over mid-foot, flat back', 'Stange über Fußmitte, Rücken gerade'],
    ['Push the floor away, bar close to the body', 'Boden wegdrücken, Stange nah am Körper'],
    ['Stand tall, don’t lean back', 'Aufrecht stehen, nicht nach hinten lehnen']]);
  X('kb_swing', 'HH', 'kb_swing', 'kb', 2, 1, 'Kettlebell swing', 'Kettlebell Swing', [
    ['Hinge, not squat', 'Hüftbeuge, keine Kniebeuge'],
    ['Snap hips forward, arms just guide', 'Hüfte nach vorne schnellen, Arme führen nur']]);
  X('leg_curl_lying', 'HC', 'leg_curl_lying', 'machine', 1, 0, 'Lying leg curl', 'Beinbeuger liegend', [
    ['Hips pressed into the pad', 'Hüfte ins Polster drücken'],
    ['Curl heels to the glutes, lower slowly', 'Fersen zum Gesäß, langsam ablassen']]);
  X('leg_curl_seated', 'HC', 'leg_curl_seated', 'machine', 1, 0, 'Seated leg curl', 'Beinbeuger sitzend', [
    ['Thigh pad tight above the knees', 'Oberschenkelpolster fest über den Knien'],
    ['Lean forward slightly for a bigger stretch', 'Leicht nach vorne lehnen für mehr Dehnung']]);
  X('leg_curl_stand', 'HC', 'leg_curl_stand', 'machine', 1, 0, 'Standing leg curl', 'Beinbeuger stehend', [
    ['One leg at a time', 'Ein Bein nach dem anderen'],
    ['Don’t swing the hips', 'Hüfte nicht mitschwingen']], { side: 1 });
  X('nordic', 'HC', 'nordic', 'bw', 2, 0, 'Nordic curl', 'Nordic Curl', [
    ['Heels anchored, kneel tall', 'Fersen fixiert, aufrecht knien'],
    ['Lower as slowly as you can, catch with the hands', 'So langsam wie möglich ablassen, mit Händen abfangen']]);
  X('ball_curl', 'HC', 'ball_curl', 'bw', 1, 0, 'Stability ball leg curl', 'Beinbeuger mit Gymnastikball', [
    ['Heels on the ball, hips up', 'Fersen auf dem Ball, Hüfte oben'],
    ['Roll the ball in, keep hips high', 'Ball heranrollen, Hüfte hoch halten']]);

  // ---------- ADDUCTORS ----------
  X('adduction_m', 'AD', 'adduction', 'machine', 1, 0, 'Hip adduction machine', 'Adduktoren-Maschine (innen)', [
    ['Start wide, squeeze knees together', 'Weit starten, Knie zusammendrücken'],
    ['Open slowly', 'Langsam öffnen']]);
  X('cable_add', 'AD', 'cable_add', 'cable', 1, 0, 'Standing cable adduction', 'Adduktion am Kabel stehend', [
    ['Ankle strap on the inside leg', 'Fußschlaufe am inneren Bein'],
    ['Sweep the leg across the body', 'Bein vor dem Körper vorbeiziehen']], { side: 1 });
  X('sumo_squat', 'AD', 'sumo_squat', 'kb', 1, 1, 'Sumo squat', 'Sumo Squat', [
    ['Wide stance, toes out', 'Breiter Stand, Zehen nach außen'],
    ['Knees follow the toes, sit straight down', 'Knie folgen den Zehen, gerade nach unten']]);
  X('sumo_dl', 'AD', 'sumo_dl', 'bb', 2, 1, 'Sumo deadlift', 'Sumo-Kreuzheben', [
    ['Very wide stance, hands inside the knees', 'Sehr breiter Stand, Hände innerhalb der Knie'],
    ['Push knees out, stand up tall', 'Knie nach außen drücken, aufrichten']]);
  X('copenhagen', 'AD', 'copenhagen', 'bw', 2, 0, 'Copenhagen plank', 'Copenhagen Plank', [
    ['Top leg on the bench, side plank', 'Oberes Bein auf der Bank, Seitstütz'],
    ['Lift the bottom leg up to the bench', 'Unteres Bein zur Bank heben']], { side: 1, time: 1 });

  // ---------- CALVES ----------
  X('calf_stand', 'CG', 'calf_stand', 'machine', 1, 0, 'Standing calf raise', 'Wadenheben stehend', [
    ['Balls of the feet on the edge', 'Fußballen auf der Kante'],
    ['Full stretch at the bottom, pause at the top', 'Unten ganz dehnen, oben kurz halten']]);
  X('calf_smith', 'CG', 'calf_smith', 'smith', 1, 0, 'Smith machine calf raise', 'Wadenheben an der Multipresse', [
    ['Stand on a plate for range', 'Auf einer Scheibe stehen für mehr Bewegung'],
    ['Knees straight, slow reps', 'Knie gestreckt, langsame Wiederholungen']]);
  X('calf_lp', 'CG', 'calf_lp', 'machine', 1, 0, 'Leg press calf raise', 'Wadenheben an der Beinpresse', [
    ['Only the balls of the feet on the plate', 'Nur die Fußballen auf der Platte'],
    ['Keep the knees straight', 'Knie gestreckt halten']]);
  X('calf_sl', 'CG', 'calf_sl', 'db', 1, 0, 'Single-leg calf raise', 'Einbeiniges Wadenheben', [
    ['Hold on with one hand, dumbbell in the other', 'Mit einer Hand festhalten, Hantel in der anderen'],
    ['All the way up, all the way down', 'Ganz hoch, ganz runter']], { side: 1 });
  X('calf_seated', 'CS', 'calf_seated', 'machine', 1, 0, 'Seated calf raise', 'Wadenheben sitzend', [
    ['Knees bent targets the soleus', 'Gebeugte Knie treffen den Schollenmuskel'],
    ['Pause at the bottom stretch', 'Unten in der Dehnung kurz halten']]);
  X('calf_seated_db', 'CS', 'calf_seated', 'db', 1, 0, 'Seated dumbbell calf raise', 'Wadenheben sitzend mit Kurzhantel', [
    ['Dumbbell on the knee, toes on a plate', 'Hantel auf dem Knie, Zehen auf einer Scheibe'],
    ['Slow and full range', 'Langsam und volle Bewegung']], { eq: { pad: [], db: ['rk'] } });

  // ---------- CHEST ----------
  X('bench_bb', 'CM', 'bench', 'bb', 2, 1, 'Bench press', 'Bankdrücken', [
    ['Shoulder blades back and down', 'Schulterblätter zurück und unten'],
    ['Lower to mid-chest, elbows ~45°', 'Zur Brustmitte ablassen, Ellbogen ca. 45°'],
    ['Feet planted, press up', 'Füße fest am Boden, hochdrücken']]);
  X('bench_db', 'CM', 'bench', 'db', 1, 1, 'Dumbbell bench press', 'Kurzhantel-Bankdrücken', [
    ['Dumbbells at chest level, palms forward', 'Hanteln auf Brusthöhe, Handflächen nach vorne'],
    ['Press up and slightly together', 'Nach oben und leicht zusammen drücken']], { eq: { bb: null, db: ['rh'] } });
  X('bench_smith', 'CM', 'bench', 'smith', 1, 1, 'Smith machine bench press', 'Bankdrücken an der Multipresse', [
    ['Bar touches mid-chest', 'Stange berührt die Brustmitte'],
    ['Safe to train alone', 'Sicher auch allein']], { scene: S.RAILS_B });
  X('chest_press_m', 'CM', 'chest_press_m', 'machine', 1, 1, 'Chest press machine', 'Brustpresse', [
    ['Handles at mid-chest height', 'Griffe auf Brustmitte'],
    ['Press forward, don’t lock the elbows', 'Nach vorne drücken, Ellbogen nicht durchstrecken']]);
  X('pec_deck', 'CM', 'pec_deck', 'machine', 1, 0, 'Pec deck fly', 'Butterfly-Maschine', [
    ['Elbows slightly bent, chest up', 'Ellbogen leicht gebeugt, Brust raus'],
    ['Bring arms together, squeeze', 'Arme zusammenführen, Brust anspannen']]);
  X('cable_fly', 'CM', 'cable_fly', 'cable', 1, 0, 'Cable fly', 'Kabelzug-Fliegende', [
    ['Cables at shoulder height, step forward', 'Kabel auf Schulterhöhe, ein Schritt nach vorne'],
    ['Hug a big tree, hands meet in front', 'Wie einen Baum umarmen, Hände vorne zusammen']]);
  X('flat_fly', 'CM', 'flat_fly', 'db', 1, 0, 'Dumbbell fly', 'Kurzhantel-Fliegende', [
    ['Soft elbows, open wide', 'Ellbogen leicht gebeugt, weit öffnen'],
    ['Stop at a chest stretch', 'Bei Brustdehnung stoppen']]);
  X('pushup', 'CM', 'pushup', 'bw', 1, 1, 'Push-up', 'Liegestütz', [
    ['Hands under shoulders, body in one line', 'Hände unter den Schultern, Körper gerade'],
    ['Elbows angle back, not out wide', 'Ellbogen nach hinten, nicht seitlich']]);
  X('knee_pushup', 'CM', 'knee_pushup', 'bw', 1, 1, 'Knee push-up', 'Liegestütz auf Knien', [
    ['Knees down, hips in line', 'Knie am Boden, Hüfte in Linie'],
    ['Chest to the floor', 'Brust bis zum Boden']]);
  X('dips_chest', 'CM', 'dips', 'bw', 2, 1, 'Chest dip', 'Dips (Brustfokus)', [
    ['Lean forward, elbows out a little', 'Nach vorne lehnen, Ellbogen leicht nach außen'],
    ['Lower until a chest stretch', 'Bis zur Brustdehnung absenken']]);
  X('incline_bb', 'CU', 'incline_press', 'bb', 2, 1, 'Incline bench press', 'Schrägbankdrücken', [
    ['Bench at 30°', 'Bank auf 30°'],
    ['Lower to the upper chest', 'Zur oberen Brust ablassen']]);
  X('incline_db', 'CU', 'incline_press', 'db', 1, 1, 'Incline dumbbell press', 'Schrägbankdrücken (Kurzhantel)', [
    ['Bench at 30°, dumbbells by the upper chest', 'Bank auf 30°, Hanteln an der oberen Brust'],
    ['Press up, slight arc inward', 'Hochdrücken, leicht nach innen']], { eq: { bb: null, db: ['rh'] } });
  X('incline_smith', 'CU', 'incline_press', 'smith', 1, 1, 'Incline Smith press', 'Schrägbankdrücken an der Multipresse', [
    ['Set the bench so the bar hits the upper chest', 'Bank so stellen, dass die Stange die obere Brust trifft'],
    ['Controlled tempo', 'Kontrolliertes Tempo']], { scene: S.RAILS_B });
  X('incline_m', 'CU', 'incline_press_m', 'machine', 1, 1, 'Incline chest press machine', 'Schrägbank-Brustpresse', [
    ['Seat so handles are at upper-chest height', 'Sitz so einstellen, dass Griffe auf oberer Brust sind'],
    ['Press up and forward', 'Nach oben-vorne drücken']]);
  X('low_high_fly', 'CU', 'low_high_fly', 'cable', 1, 0, 'Low-to-high cable fly', 'Kabelzug von unten nach oben', [
    ['Cables low, hands sweep up to chin height', 'Kabel unten, Hände bis Kinnhöhe hochführen'],
    ['Squeeze the upper chest', 'Obere Brust anspannen']]);
  X('incline_fly', 'CU', 'incline_fly', 'db', 1, 0, 'Incline dumbbell fly', 'Schrägbank-Fliegende', [
    ['Bench at 30°, soft elbows', 'Bank auf 30°, Ellbogen leicht gebeugt'],
    ['Open wide, bring together over the upper chest', 'Weit öffnen, über der oberen Brust zusammen']]);

  // ---------- BACK ----------
  X('pulldown', 'LT', 'pulldown', 'cable', 1, 1, 'Lat pulldown', 'Latzug', [
    ['Thighs locked under the pad', 'Oberschenkel unter dem Polster fixiert'],
    ['Pull the bar to the upper chest', 'Stange zur oberen Brust ziehen'],
    ['Elbows drive down to your sides', 'Ellbogen nach unten an die Seiten']]);
  X('pulldown_close', 'LT', 'pulldown', 'cable', 1, 1, 'Close-grip pulldown', 'Latzug eng (V-Griff)', [
    ['V-handle, palms facing each other', 'V-Griff, Handflächen zueinander'],
    ['Pull to the chest, lean back slightly', 'Zur Brust ziehen, leicht zurücklehnen']]);
  X('pulldown_1', 'LT', 'pulldown_1', 'cable', 1, 0, 'Single-arm cable pulldown', 'Einarmiger Latzug', [
    ['One handle, full stretch at the top', 'Ein Griff, oben ganz dehnen'],
    ['Elbow to the hip', 'Ellbogen zur Hüfte']], { side: 1 });
  X('pullup', 'LT', 'pullup', 'bw', 2, 1, 'Pull-up', 'Klimmzug', [
    ['Hang with straight arms', 'Mit gestreckten Armen hängen'],
    ['Chest to the bar, no swinging', 'Brust zur Stange, nicht schwingen']]);
  X('pullup_assist', 'LT', 'pullup_assist', 'machine', 1, 1, 'Assisted pull-up', 'Klimmzug mit Unterstützung', [
    ['More counterweight = easier', 'Mehr Gegengewicht = leichter'],
    ['Full hang to chin over the bar', 'Ganz hängen bis Kinn über der Stange']]);
  X('straight_arm', 'LT', 'straight_arm', 'cable', 1, 0, 'Straight-arm pulldown', 'Überzüge am Kabel', [
    ['Arms straight, slight hinge', 'Arme gestreckt, leicht vorgebeugt'],
    ['Sweep the bar down to the thighs', 'Stange bis zu den Oberschenkeln führen']]);
  X('pullover', 'LT', 'pullover', 'db', 1, 0, 'Dumbbell pullover', 'Kurzhantel-Überzug', [
    ['Lie on the bench, one dumbbell in both hands', 'Auf der Bank, eine Hantel mit beiden Händen'],
    ['Lower behind the head, pull back over the chest', 'Hinter den Kopf ablassen, zurück über die Brust']]);
  X('cable_row', 'MB', 'cable_row', 'cable', 1, 1, 'Seated cable row', 'Rudern am Kabel sitzend', [
    ['Sit tall, slight knee bend', 'Aufrecht sitzen, Knie leicht gebeugt'],
    ['Pull to the belly button', 'Zum Bauchnabel ziehen'],
    ['Squeeze shoulder blades together', 'Schulterblätter zusammenziehen']]);
  X('chest_row', 'MB', 'chest_row', 'machine', 1, 1, 'Chest-supported row machine', 'Rudermaschine mit Brustpolster', [
    ['Chest on the pad, back stays still', 'Brust am Polster, Rücken bleibt ruhig'],
    ['Drive elbows back', 'Ellbogen nach hinten ziehen']]);
  X('db_row', 'MB', 'db_row', 'db', 1, 1, 'One-arm dumbbell row', 'Einarmiges Kurzhantelrudern', [
    ['Knee and hand on the bench, back flat', 'Knie und Hand auf der Bank, Rücken gerade'],
    ['Row the dumbbell to the hip', 'Hantel zur Hüfte ziehen']], { side: 1 });
  X('bb_row', 'MB', 'bb_row', 'bb', 2, 1, 'Barbell bent-over row', 'Langhantelrudern vorgebeugt', [
    ['Hinge forward, flat back', 'Nach vorne beugen, Rücken gerade'],
    ['Pull the bar to the lower ribs', 'Stange zu den unteren Rippen ziehen']]);
  X('db_bent_row', 'MB', 'db_bent_row', 'db', 1, 1, 'Dumbbell bent-over row', 'Kurzhantelrudern vorgebeugt', [
    ['Both dumbbells, flat back', 'Beide Hanteln, Rücken gerade'],
    ['Elbows back past the torso', 'Ellbogen am Körper vorbei nach hinten']], { eq: { db: ['rh', 'lh'] } });
  X('tbar', 'MB', 'tbar', 'bb', 2, 1, 'T-bar row', 'T-Bar-Rudern', [
    ['Straddle the bar, close grip', 'Über der Stange, enger Griff'],
    ['Pull to the chest, chest up', 'Zur Brust ziehen, Brust raus']]);
  X('inv_row', 'MB', 'inv_row', 'bw', 1, 1, 'Inverted row', 'Rudern unter der Stange', [
    ['Body straight under a low bar', 'Körper gerade unter einer tiefen Stange'],
    ['Pull chest to the bar', 'Brust zur Stange ziehen']]);
  X('back_ext', 'LB', 'back_ext', 'bw', 1, 0, '45° back extension', 'Rückenstrecker 45°', [
    ['Pad at the hips, spine neutral', 'Polster an der Hüfte, Rücken neutral'],
    ['Lift to a straight line, no over-arch', 'Bis zur geraden Linie, nicht überstrecken']]);
  X('superman', 'LB', 'superman', 'bw', 1, 0, 'Superman', 'Superman', [
    ['Lie face down, arms forward', 'Bauchlage, Arme nach vorne'],
    ['Lift arms, chest and legs, hold 2 s', 'Arme, Brust und Beine heben, 2 s halten']]);
  X('shrug_db', 'TR', 'shrug', 'db', 1, 0, 'Dumbbell shrug', 'Schulterheben mit Kurzhanteln', [
    ['Shoulders straight up to the ears', 'Schultern gerade zu den Ohren'],
    ['Pause, lower slowly, no rolling', 'Halten, langsam ab, nicht kreisen']], { eq: { db: ['rh', 'lh'] } });
  X('shrug_bb', 'TR', 'shrug', 'bb', 1, 0, 'Barbell shrug', 'Schulterheben mit Langhantel', [
    ['Bar in front of the thighs', 'Stange vor den Oberschenkeln'],
    ['Straight up and down', 'Gerade hoch und runter']], { eq: { bb: 'rh' } });

  // ---------- SHOULDERS ----------
  X('db_press', 'DF', 'seated_press', 'db', 1, 1, 'Seated dumbbell shoulder press', 'Schulterdrücken sitzend (Kurzhantel)', [
    ['Back against the pad, core tight', 'Rücken am Polster, Rumpf fest'],
    ['Press up, lower to ear height', 'Hochdrücken, bis Ohrhöhe ablassen']]);
  X('ohp', 'DF', 'ohp', 'bb', 2, 1, 'Standing overhead press', 'Schulterdrücken stehend (Langhantel)', [
    ['Glutes tight, ribs down', 'Gesäß fest, Rippen unten'],
    ['Press up, head through at the top', 'Hochdrücken, Kopf oben durchschieben']]);
  X('press_m', 'DF', 'seated_press', 'machine', 1, 1, 'Shoulder press machine', 'Schulterpresse', [
    ['Handles at shoulder height', 'Griffe auf Schulterhöhe'],
    ['Press up, don’t lock out hard', 'Hochdrücken, nicht hart durchstrecken']], { eq: { db: [] } });
  X('arnold', 'DF', 'seated_press', 'db', 2, 1, 'Arnold press', 'Arnold Press', [
    ['Start palms facing you', 'Start mit Handflächen zu dir'],
    ['Rotate out as you press up', 'Beim Hochdrücken nach außen drehen']]);
  X('front_raise', 'DF', 'front_raise', 'db', 1, 0, 'Front raise', 'Frontheben', [
    ['Lift to shoulder height, arms almost straight', 'Bis Schulterhöhe, Arme fast gestreckt'],
    ['Lower slowly, no swinging', 'Langsam ab, nicht schwingen']]);
  X('landmine', 'DF', 'landmine', 'bb', 1, 1, 'Landmine press', 'Landmine Press', [
    ['Bar end in one hand at the shoulder', 'Stangenende in einer Hand an der Schulter'],
    ['Press up and forward', 'Nach oben-vorne drücken']], { side: 1 });
  X('lateral', 'DS', 'lateral', 'db', 1, 0, 'Dumbbell lateral raise', 'Seitheben (Kurzhantel)', [
    ['Light weights, slight elbow bend', 'Leichte Hanteln, Ellbogen leicht gebeugt'],
    ['Raise out to shoulder height', 'Seitlich bis Schulterhöhe'],
    ['Lead with the elbows, lower in 2 s', 'Ellbogen führen, in 2 s ablassen']]);
  X('cable_lateral', 'DS', 'cable_lateral', 'cable', 1, 0, 'Cable lateral raise', 'Seitheben am Kabel', [
    ['Cable low on the opposite side', 'Kabel unten auf der Gegenseite'],
    ['Constant tension through the whole move', 'Spannung über die ganze Bewegung']], { side: 1 });
  X('lateral_m', 'DS', 'lateral_m', 'machine', 1, 0, 'Lateral raise machine', 'Seitheben-Maschine', [
    ['Pads on the outer upper arms', 'Polster außen an den Oberarmen'],
    ['Lift to shoulder height', 'Bis Schulterhöhe heben']]);
  X('upright_row', 'DS', 'upright_row', 'cable', 1, 1, 'Wide-grip upright row', 'Aufrechtes Rudern breit', [
    ['Wide grip, pull elbows up and out', 'Breiter Griff, Ellbogen nach oben-außen'],
    ['Stop at chest height', 'Auf Brusthöhe stoppen']]);
  X('face_pull', 'DR', 'face_pull', 'cable', 1, 0, 'Face pull', 'Face Pull', [
    ['Rope at head height', 'Seil auf Kopfhöhe'],
    ['Pull to the face, elbows high, hands apart', 'Zum Gesicht ziehen, Ellbogen hoch, Hände auseinander']]);
  X('rev_deck', 'DR', 'rev_deck', 'machine', 1, 0, 'Reverse pec deck', 'Butterfly reverse', [
    ['Chest on the pad', 'Brust am Polster'],
    ['Open arms wide, squeeze the rear shoulders', 'Arme weit öffnen, hintere Schulter anspannen']]);
  X('bent_rev_fly', 'DR', 'bent_rev_fly', 'db', 1, 0, 'Bent-over reverse fly', 'Vorgebeugtes Seitheben', [
    ['Hinge forward, light dumbbells', 'Nach vorne beugen, leichte Hanteln'],
    ['Raise out to the sides, pinkies up', 'Seitlich heben, kleiner Finger oben']]);
  X('cable_rear', 'DR', 'cable_rear', 'cable', 1, 0, 'Cable rear delt fly', 'Reverse Fly am Kabel', [
    ['Cross the cables, arms straight', 'Kabel überkreuzt, Arme gestreckt'],
    ['Pull apart wide at shoulder height', 'Auf Schulterhöhe weit auseinanderziehen']]);
  X('pull_apart', 'DR', 'pull_apart', 'band', 1, 0, 'Band pull-apart', 'Band Pull-Apart', [
    ['Band at shoulder height, arms straight', 'Band auf Schulterhöhe, Arme gestreckt'],
    ['Pull apart to the chest', 'Bis zur Brust auseinanderziehen']]);

  // ---------- BICEPS ----------
  X('incline_curl', 'BL', 'incline_curl', 'db', 1, 0, 'Incline dumbbell curl', 'Schrägbank-Curl', [
    ['Bench at 45°, arms hang behind you', 'Bank auf 45°, Arme hängen nach hinten'],
    ['Curl without moving the elbows', 'Curlen, ohne die Ellbogen zu bewegen']]);
  X('bayesian', 'BL', 'bayesian', 'cable', 1, 0, 'Bayesian cable curl', 'Bayesian Curl am Kabel', [
    ['Face away from a low cable', 'Rücken zum tiefen Kabel'],
    ['Arm starts behind the body', 'Arm startet hinter dem Körper']], { side: 1 });
  X('drag_curl', 'BL', 'drag_curl', 'bb', 1, 0, 'Drag curl', 'Drag Curl', [
    ['Elbows move back', 'Ellbogen gehen nach hinten'],
    ['Drag the bar up along the body', 'Stange am Körper entlang hochziehen']]);
  X('curl_db', 'BL', 'curl', 'db', 1, 0, 'Standing dumbbell curl', 'Bizepscurl stehend (Kurzhantel)', [
    ['Elbows pinned to your sides', 'Ellbogen am Körper'],
    ['Turn palms up as you curl', 'Beim Curlen Handflächen nach oben drehen']], { eq: { db: ['rh', 'lh'] } });
  X('close_curl', 'BL', 'curl_bb', 'bb', 1, 0, 'Close-grip barbell curl', 'Langhantelcurl eng', [
    ['Hands narrower than shoulders', 'Hände enger als schulterbreit'],
    ['No swinging', 'Nicht schwingen']]);
  X('preacher', 'BS', 'preacher', 'bb', 1, 0, 'Preacher curl (EZ bar)', 'Scott-Curl (SZ-Stange)', [
    ['Armpits on top of the pad', 'Achseln oben am Polster'],
    ['Lower almost straight, curl up', 'Fast ganz strecken, hochcurlen']]);
  X('spider', 'BS', 'spider', 'db', 1, 0, 'Spider curl', 'Spider Curl', [
    ['Chest on an incline bench, arms hang down', 'Brust auf der Schrägbank, Arme hängen'],
    ['Curl and squeeze at the top', 'Curlen und oben anspannen']]);
  X('concentration', 'BS', 'concentration', 'db', 1, 0, 'Concentration curl', 'Konzentrationscurl', [
    ['Elbow on the inner thigh', 'Ellbogen an der Innenseite des Oberschenkels'],
    ['Slow curl, pinky up at the top', 'Langsam curlen, oben kleiner Finger nach oben']], { side: 1 });
  X('wide_curl', 'BS', 'curl_bb', 'bb', 1, 0, 'Wide-grip barbell curl', 'Langhantelcurl breit', [
    ['Hands wider than shoulders', 'Hände breiter als schulterbreit'],
    ['Elbows stay still', 'Ellbogen bleiben ruhig']]);
  X('curl_m', 'BS', 'preacher', 'machine', 1, 0, 'Biceps curl machine', 'Bizepsmaschine', [
    ['Elbows on the pad, aligned with the pivot', 'Ellbogen auf dem Polster, auf Höhe der Drehachse'],
    ['Full stretch, full squeeze', 'Ganz dehnen, ganz anspannen']], { eq: { ez: null } });
  X('hammer', 'BB', 'curl', 'db', 1, 0, 'Hammer curl', 'Hammercurl', [
    ['Palms face each other the whole time', 'Handflächen zeigen die ganze Zeit zueinander'],
    ['Elbows still', 'Ellbogen ruhig']], { eq: { db: ['rh', 'lh'] } });
  X('rope_hammer', 'BB', 'curl_cable', 'cable', 1, 0, 'Cable rope hammer curl', 'Hammercurl am Kabel (Seil)', [
    ['Rope on a low cable', 'Seil am tiefen Kabel'],
    ['Curl with thumbs up', 'Mit Daumen nach oben curlen']]);
  X('reverse_curl', 'BB', 'curl_ez', 'bb', 1, 0, 'Reverse curl', 'Reverse Curl', [
    ['Overhand grip, palms down', 'Obergriff, Handflächen nach unten'],
    ['Lighter weight, slow', 'Leichteres Gewicht, langsam']]);
  X('cross_hammer', 'BB', 'cross_hammer', 'db', 1, 0, 'Cross-body hammer curl', 'Hammercurl über den Körper', [
    ['Curl toward the opposite shoulder', 'Zur gegenüberliegenden Schulter curlen'],
    ['Alternate arms', 'Arme abwechseln']], { side: 1 });

  // ---------- TRICEPS ----------
  X('oh_ext_db', 'TL', 'oh_ext', 'db', 1, 0, 'Overhead dumbbell extension', 'Trizepsdrücken über Kopf (Kurzhantel)', [
    ['One dumbbell in both hands overhead', 'Eine Hantel mit beiden Händen über dem Kopf'],
    ['Lower behind the head, elbows point up', 'Hinter den Kopf ablassen, Ellbogen zeigen nach oben']]);
  X('oh_cable', 'TL', 'oh_cable', 'cable', 1, 0, 'Overhead cable extension', 'Trizepsdrücken über Kopf am Kabel', [
    ['Face away, rope behind the head', 'Rücken zum Kabel, Seil hinter dem Kopf'],
    ['Extend forward and up', 'Nach vorne-oben strecken']]);
  X('skull', 'TL', 'skull', 'bb', 1, 0, 'Skull crusher (EZ bar)', 'French Press (SZ-Stange)', [
    ['Upper arms tilted slightly back', 'Oberarme leicht nach hinten geneigt'],
    ['Lower to the forehead, extend', 'Zur Stirn ablassen, strecken']]);
  X('pushdown_rope', 'TT', 'pushdown', 'cable', 1, 0, 'Rope pushdown', 'Trizepsdrücken am Seil', [
    ['Elbows stay at your sides', 'Ellbogen bleiben am Körper'],
    ['Spread the rope at the bottom', 'Seil unten auseinanderziehen']]);
  X('pushdown_bar', 'TT', 'pushdown', 'cable', 1, 0, 'Bar pushdown', 'Trizepsdrücken an der Stange', [
    ['Only the forearms move', 'Nur die Unterarme bewegen sich'],
    ['Full lockout at the bottom', 'Unten ganz strecken']]);
  X('pushdown_rev', 'TT', 'pushdown', 'cable', 1, 0, 'Reverse-grip single-arm pushdown', 'Einarmiges Trizepsdrücken im Untergriff', [
    ['Palm facing up', 'Handfläche nach oben'],
    ['Elbow pinned', 'Ellbogen fixiert']], { side: 1 });
  X('bench_dip', 'TT', 'bench_dip', 'bw', 1, 0, 'Bench dip', 'Dips an der Bank', [
    ['Hands on the bench behind you', 'Hände hinter dir auf der Bank'],
    ['Lower until upper arms are level', 'Ablassen, bis Oberarme waagerecht sind']]);
  X('close_bench', 'TT', 'bench', 'bb', 2, 1, 'Close-grip bench press', 'Enges Bankdrücken', [
    ['Hands shoulder-width', 'Hände schulterbreit'],
    ['Elbows close to the body', 'Ellbogen nah am Körper']]);
  X('kickback_tri', 'TT', 'kickback_tri', 'db', 1, 0, 'Triceps kickback', 'Trizeps-Kickback', [
    ['Upper arm parallel to the floor', 'Oberarm parallel zum Boden'],
    ['Extend back fully', 'Ganz nach hinten strecken']], { side: 1 });
  X('dips_tri', 'TT', 'dips', 'bw', 2, 1, 'Triceps dip', 'Dips (Trizepsfokus)', [
    ['Stay upright, elbows back', 'Aufrecht bleiben, Ellbogen nach hinten'],
    ['Lower to 90° at the elbow', 'Bis 90° im Ellbogen absenken']]);

  // ---------- CORE ----------
  X('cable_crunch', 'AB', 'cable_crunch', 'cable', 1, 0, 'Cable crunch', 'Crunch am Kabel', [
    ['Kneel, rope by your head', 'Knien, Seil am Kopf'],
    ['Curl ribs toward the hips', 'Rippen Richtung Hüfte einrollen']]);
  X('crunch', 'AB', 'crunch', 'bw', 1, 0, 'Crunch', 'Crunch', [
    ['Lower back on the floor', 'Unterer Rücken am Boden'],
    ['Lift shoulders, exhale', 'Schultern heben, ausatmen']]);
  X('ab_machine', 'AB', 'ab_machine', 'machine', 1, 0, 'Ab crunch machine', 'Bauchmaschine', [
    ['Curl forward with the abs, not the arms', 'Mit dem Bauch einrollen, nicht mit den Armen']]);
  X('hang_knee', 'AB', 'hang_knee', 'bw', 2, 0, 'Hanging knee raise', 'Knieheben hängend', [
    ['Hang still, no swinging', 'Ruhig hängen, nicht schwingen'],
    ['Knees up, tilt the pelvis', 'Knie hoch, Becken einrollen']]);
  X('rev_crunch', 'AB', 'rev_crunch', 'bw', 1, 0, 'Reverse crunch', 'Reverse Crunch', [
    ['Knees up, roll the hips off the floor', 'Knie hoch, Hüfte vom Boden einrollen'],
    ['Slow down', 'Langsam ab']]);
  X('leg_raise', 'AB', 'leg_raise', 'bw', 1, 0, 'Lying leg raise', 'Beinheben liegend', [
    ['Lower back pressed down', 'Unteren Rücken in den Boden drücken'],
    ['Lower legs only as far as you stay flat', 'Beine nur so weit senken, wie der Rücken unten bleibt']]);
  X('woodchop', 'OB', 'woodchop', 'cable', 1, 0, 'Cable woodchop', 'Holzhacker am Kabel', [
    ['High to low, arms long', 'Von oben nach unten, Arme lang'],
    ['Rotate through the torso, pivot the back foot', 'Aus dem Rumpf drehen, hinteren Fuß mitdrehen']], { side: 1 });
  X('russian', 'OB', 'russian', 'kb', 1, 0, 'Russian twist', 'Russian Twist', [
    ['Lean back, chest up', 'Zurücklehnen, Brust raus'],
    ['Rotate side to side', 'Von Seite zu Seite drehen']]);
  X('side_plank', 'OB', 'side_plank', 'bw', 1, 0, 'Side plank', 'Seitstütz', [
    ['Elbow under shoulder', 'Ellbogen unter der Schulter'],
    ['Hips high, body straight', 'Hüfte hoch, Körper gerade']], { side: 1, time: 1 });
  X('side_bend', 'OB', 'side_bend', 'db', 1, 0, 'Dumbbell side bend', 'Seitbeuge mit Kurzhantel', [
    ['Dumbbell in one hand', 'Hantel in einer Hand'],
    ['Bend sideways, come back up with the opposite side', 'Seitlich beugen, mit der Gegenseite hochkommen']], { side: 1 });
  X('plank', 'ST', 'plank', 'bw', 1, 0, 'Forearm plank', 'Unterarmstütz', [
    ['Elbows under shoulders', 'Ellbogen unter den Schultern'],
    ['Squeeze glutes, straight line', 'Gesäß fest, gerade Linie']], { time: 1 });
  X('deadbug', 'ST', 'deadbug', 'bw', 1, 0, 'Dead bug', 'Dead Bug', [
    ['Lower back pressed into the floor', 'Unterer Rücken am Boden'],
    ['Reach opposite arm and leg away slowly', 'Gegenüberliegenden Arm und Bein langsam strecken']], { side: 1 });
  X('ab_wheel', 'ST', 'ab_wheel', 'bw', 2, 0, 'Ab wheel rollout', 'Ab Wheel Rollout', [
    ['Start on the knees', 'Auf den Knien starten'],
    ['Roll out only as far as the back stays flat', 'Nur so weit rollen, wie der Rücken gerade bleibt']]);
  X('pallof', 'ST', 'pallof', 'cable', 1, 0, 'Pallof press', 'Pallof Press', [
    ['Stand side-on to the cable', 'Seitlich zum Kabel stehen'],
    ['Press out, resist the twist', 'Nach vorne drücken, der Drehung widerstehen']], { side: 1 });
  X('bird_dog', 'ST', 'bird_dog', 'bw', 1, 0, 'Bird dog', 'Bird Dog', [
    ['On all fours, back flat', 'Vierfüßlerstand, Rücken gerade'],
    ['Extend opposite arm and leg, hold 2 s', 'Gegenüberliegenden Arm und Bein strecken, 2 s halten']], { side: 1 });
  X('hollow', 'ST', 'hollow', 'bw', 1, 0, 'Hollow hold', 'Hollow Hold', [
    ['Lower back down, arms and legs long', 'Unterer Rücken unten, Arme und Beine lang'],
    ['Hold and breathe', 'Halten und atmen']], { time: 1 });

  // ---------- CARDIO ----------
  X('walk', 'CA', 'walk', 'cardio', 1, 0, 'Incline treadmill walk', 'Gehen auf dem Laufband (Steigung)', [
    ['Incline 8–12 %, brisk pace', 'Steigung 8–12 %, zügiges Tempo'],
    ['Let go of the handles', 'Griffe loslassen']], { cardio: 1 });
  X('bike', 'CA', 'bike', 'cardio', 1, 0, 'Stationary bike', 'Fahrradergometer', [
    ['Seat at hip height', 'Sattel auf Hüfthöhe'],
    ['Steady pace, short sentences still possible', 'Gleichmäßiges Tempo, kurze Sätze noch möglich']], { cardio: 1 });
  X('stairs', 'CA', 'stairs', 'cardio', 1, 0, 'Stair climber', 'Stepper', [
    ['Whole foot on each step', 'Ganzer Fuß auf jeder Stufe'],
    ['Stand tall, light hands', 'Aufrecht, Hände nur leicht auflegen']], { cardio: 1 });
  X('rower', 'CA', 'rower', 'cardio', 1, 0, 'Rowing machine', 'Rudergerät', [
    ['Legs, then back, then arms', 'Erst Beine, dann Rücken, dann Arme'],
    ['Return in reverse order', 'In umgekehrter Reihenfolge zurück']], { cardio: 1 });
  X('elliptical', 'CA', 'elliptical', 'cardio', 1, 0, 'Cross trainer', 'Crosstrainer', [
    ['Push and pull the handles', 'Griffe drücken und ziehen'],
    ['Steady rhythm', 'Gleichmäßiger Rhythmus']], { cardio: 1 });

  const BY_ID = {};
  for (const e of L) BY_ID[e.id] = e;
  window.SatzLib = { SM, GROUPS, EQUIP, LIST: L, BY_ID };
})();
