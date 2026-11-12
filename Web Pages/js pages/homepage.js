(() => {
  const root = document.documentElement;
  const animate = root.classList.contains('js'); // set in <head> unless reduced motion is on
  const finePointer = matchMedia('(pointer: fine)').matches;

  /* 1. Navbar tightens once you scroll */
  const nav = document.querySelector('.navbar');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Language (EN/FR) and theme (light/dark) */
  const dict = {
    en: {
      "title": "Home | UOPlanner",
      "brand.aria": "UOPlanner home",
      "nav.label": "Main",
      "nav.home": "Home Page",
      "nav.product": "Our Product",
      "nav.pricing": "Pricing",
      "nav.team": "Our Team",
      "hero.kicker": "COURSE PLANNING, MADE CLEARER",
      "hero.title": "Plan your Ottawa semester with less stress",
      "hero.text": "Compare valid course combinations, avoid timetable conflicts, and find a week that works for your life at uOttawa.",
      "hero.link": "See how it works",
      "cta.button": "Preview a sample week",
      "intro.kicker": "A calmer way to plan",
      "intro.title": "From course list to a week that works.",
      "intro.text": "Registration can mean jumping between uoZone listings and trying to fit lectures, labs, and discussion groups together by hand. UOPlanner checks the combinations for schedule conflicts and lays out valid options so you can spend less time piecing together your week.",
      "how.label": "How UOPlanner helps",
      "step.one.title": "Choose your courses",
      "step.one.text": "Start with your program, year of study, and the courses you plan to take.",
      "step.two.title": "Review valid schedules",
      "step.two.text": "Compare combinations of lectures, labs, and discussion groups without timetable overlaps.",
      "step.three.title": "Take your plan to uoZone",
      "step.three.text": "Choose a schedule that suits you, then confirm availability and complete registration in uoZone.",
      "benefits.kicker": "Built around student life",
      "benefits.title": "More than a calendar",
      "benefits.text": "Balance classes with work, family, campus activities, and the time you need to study or recharge.",
      "benefits.one.title": "Skip impossible combinations",
      "benefits.one.text": "See schedule options without overlapping lectures, labs, or discussion groups.",
      "benefits.two.title": "Make room for your week",
      "benefits.two.text": "Use advanced preferences to keep a day free, reduce long gaps, or prioritize morning classes.",
      "benefits.three.title": "Stay in control",
      "benefits.three.text": "Compare your options here, then confirm course availability and register through uoZone.",
      "premium.title": "Want more ways to fine-tune your schedule?",
      "premium.text": "Explore Premium for advanced planning preferences at $10 per month.",
      "preview.kicker": "See the week at a glance",
      "preview.title": "A clearer view of your course week.",
      "preview.text": "When classes are laid out side by side, it is easier to spot open time and compare where each option takes you.",
      "preview.hint": "Hover over or focus a course to highlight its other meeting times.",
      "preview.link": "Explore the features",
      "preview.sample": "ILLUSTRATIVE EXAMPLE",
      "preview.cardTitle": "A sample weekly schedule",
      "preview.week": "WEEK VIEW",
      "preview.caption": "An illustrative weekly course schedule. Focus or hover over a course to highlight matching sessions.",
      "weekday.mon": "Mon",
      "weekday.tue": "Tue",
      "weekday.wed": "Wed",
      "weekday.thu": "Thu",
      "weekday.fri": "Fri",
      "footer.pricing": "Pricing",
      "lang.switch": "Switch to French",
      "theme.toDark": "Switch to dark mode",
      "theme.toLight": "Switch to light mode",
      "music.on": "Music on",
      "music.off": "Music off"
    },
    fr: {
      "title": "Accueil | UOPlanner",
      "brand.aria": "Accueil UOPlanner",
      "nav.label": "Principale",
      "nav.home": "Accueil",
      "nav.product": "Notre produit",
      "nav.pricing": "Tarifs",
      "nav.team": "Notre équipe",
      "hero.kicker": "PLANIFIER SES COURS, PLUS SIMPLEMENT",
      "hero.title": "Planifiez votre session à Ottawa sans stress",
      "hero.text": "Comparez des combinaisons de cours valides, évitez les conflits d’horaire et trouvez une semaine qui convient à votre vie à l’Université d’Ottawa.",
      "hero.link": "Découvrez comment ça fonctionne",
      "cta.button": "Voir un exemple d’horaire",
      "intro.kicker": "Planifier plus sereinement",
      "intro.title": "Des cours choisis à une semaine qui vous convient.",
      "intro.text": "L’inscription oblige souvent à passer d’une fiche uoZone à l’autre et à assembler manuellement les cours magistraux, les laboratoires et les groupes de discussion. UOPlanner vérifie les combinaisons pour repérer les conflits et présente les options valides afin de vous aider à organiser votre semaine.",
      "how.label": "Comment UOPlanner peut vous aider",
      "step.one.title": "Choisissez vos cours",
      "step.one.text": "Commencez par votre programme, votre année d’études et les cours que vous souhaitez suivre.",
      "step.two.title": "Comparez des horaires valides",
      "step.two.text": "Comparez les cours magistraux, les laboratoires et les groupes de discussion sans chevauchement.",
      "step.three.title": "Passez à uoZone",
      "step.three.text": "Choisissez un horaire qui vous convient, puis confirmez les places et terminez l’inscription dans uoZone.",
      "benefits.kicker": "Pensé pour la vie étudiante",
      "benefits.title": "Bien plus qu’un calendrier",
      "benefits.text": "Conciliez les cours avec le travail, la famille, les activités sur le campus et le temps nécessaire pour étudier ou souffler.",
      "benefits.one.title": "Évitez les combinaisons impossibles",
      "benefits.one.text": "Consultez des horaires sans chevauchement entre cours magistraux, laboratoires et groupes de discussion.",
      "benefits.two.title": "Faites de la place dans votre semaine",
      "benefits.two.text": "Utilisez les préférences avancées pour garder une journée libre, réduire les longues pauses ou privilégier les cours du matin.",
      "benefits.three.title": "Gardez le contrôle",
      "benefits.three.text": "Comparez vos options ici, puis confirmez les places et inscrivez-vous dans uoZone.",
      "premium.title": "Envie d’affiner davantage votre horaire?",
      "premium.text": "Découvrez Premium et ses préférences avancées à 10 $ par mois.",
      "preview.kicker": "Visualisez votre semaine",
      "preview.title": "Une vue plus claire de votre semaine de cours.",
      "preview.text": "En affichant les cours côte à côte, il est plus facile de repérer les périodes libres et de comparer les options.",
      "preview.hint": "Survolez un cours ou sélectionnez-le au clavier pour mettre en évidence ses autres séances.",
      "preview.link": "Découvrir les fonctionnalités",
      "preview.sample": "EXEMPLE ILLUSTRATIF",
      "preview.cardTitle": "Exemple d’horaire hebdomadaire",
      "preview.week": "VUE HEBDOMADAIRE",
      "preview.caption": "Exemple illustratif d’un horaire de cours hebdomadaire. Survolez un cours ou sélectionnez-le pour mettre en évidence les séances correspondantes.",
      "weekday.mon": "Lun",
      "weekday.tue": "Mar",
      "weekday.wed": "Mer",
      "weekday.thu": "Jeu",
      "weekday.fri": "Ven",
      "footer.pricing": "Tarifs",
      "lang.switch": "Passer en anglais",
      "theme.toDark": "Passer en mode sombre",
      "theme.toLight": "Passer en mode clair",
      "music.on": "Musique activée",
      "music.off": "Musique désactivée"
    }
  };
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
  };
  let lang = store.get('uop-lang') || (navigator.language || 'en').slice(0, 2);
  if (!dict[lang]) lang = 'en';
  const t = key => dict[lang][key] ?? dict.en[key] ?? key;
  const h1 = document.querySelector('.hero h1');
  const langBtn = document.querySelector('.lang');
  const themeBtn = document.querySelector('.theme');

  // The headline is split into words so it can animate in
  const renderSplit = (el, text) => {
    if (!animate) { el.textContent = text; return; }
    el.setAttribute('aria-label', text);
    el.innerHTML = text.split(/\s+/).map((word, i) =>
      `<span class="w" aria-hidden="true"><span class="wi" style="--i:${i}">${word}</span></span>`
    ).join(' ');
  };
  const paintToggles = () => {
    langBtn.textContent = lang === 'en' ? 'FR' : 'EN';
    langBtn.setAttribute('aria-label', t('lang.switch'));
    themeBtn.setAttribute('aria-label', t(root.dataset.theme === 'dark' ? 'theme.toLight' : 'theme.toDark'));
  };
  const applyLang = () => {
    root.lang = lang;
    document.title = t('title');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (el.hasAttribute('data-split')) renderSplit(el, t(el.dataset.i18n));
      else el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    paintToggles();
  };
  langBtn.addEventListener('click', () => {
    lang = lang === 'en' ? 'fr' : 'en';
    store.set('uop-lang', lang);
    h1?.classList.remove('in');
    applyLang();
    if (animate) requestAnimationFrame(() => requestAnimationFrame(() => h1?.classList.add('in')));
  });
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    store.set('uop-theme', root.dataset.theme);
    paintToggles();
  });
  applyLang();

  /* 0. Ambient music, synthesized in the browser (no audio file needed) */
  const musicBtn = document.querySelector('.music');
  const AC = window.AudioContext || window.webkitAudioContext;
  if (musicBtn && AC) {
    const label = musicBtn.querySelector('.music-label');
    const chords = [[53, 57, 60, 64], [57, 60, 64, 67], [50, 53, 57, 60], [48, 52, 55, 59]]; // Fmaj7, Am7, Dm7, Cmaj7
    const hz = m => 440 * Math.pow(2, (m - 69) / 12);
    const stepLen = 0.42; // about 72 BPM eighth notes
    let ctx, master, dry, wet, echo, timer, nextTime = 0, step = 0, playing = false;
    const pref = v => { try { return v ? sessionStorage.setItem('uop-music', v) : sessionStorage.getItem('uop-music'); } catch { return null; } };

    const build = () => {
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      dry = ctx.createGain(); dry.connect(master);
      const len = ctx.sampleRate * 3, ir = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = ir.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      }
      const rev = ctx.createConvolver(); rev.buffer = ir;
      wet = ctx.createGain(); wet.gain.value = 0.7; wet.connect(rev); rev.connect(master);
      echo = ctx.createDelay(2); echo.delayTime.value = stepLen * 1.5;
      const fb = ctx.createGain(); fb.gain.value = 0.35;
      const tone = ctx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 1800;
      echo.connect(tone); tone.connect(fb); fb.connect(echo); tone.connect(wet);
    };

    const voice = (type, midi, t, peak, a, h, r, sends, detune = 0) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = hz(midi); o.detune.value = detune;
      let node = o;
      if (type === 'sawtooth') {
        const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 800;
        o.connect(f); node = f;
      }
      node.connect(g);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + a);
      g.gain.setValueAtTime(peak, t + a + h);
      g.gain.exponentialRampToValueAtTime(0.0001, t + a + h + r);
      sends.forEach(s => g.connect(s));
      o.start(t); o.stop(t + a + h + r + 0.1);
    };

    const schedule = () => {
      while (nextTime < ctx.currentTime + 0.6) {
        const chord = chords[Math.floor(step / 16) % chords.length];
        if (step % 16 === 0) {
          chord.forEach(n => [-7, 7].forEach(d => voice('sawtooth', n, nextTime, 0.03, 2, 3.5, 3, [dry, wet], d)));
          voice('sine', chord[0] - 12, nextTime, 0.16, 1, 4.5, 2, [dry]);
        }
        if (Math.random() < (step % 2 ? 0.2 : 0.5)) {
          const note = chord[Math.floor(Math.random() * chord.length)] + (Math.random() < 0.5 ? 12 : 24);
          voice('triangle', note, nextTime, 0.07, 0.01, 0, 1.3, [dry, wet, echo]);
        }
        step++; nextTime += stepLen;
      }
    };

    const setUI = on => {
      musicBtn.setAttribute('aria-pressed', on);
      musicBtn.classList.toggle('on', on);
      const key = on ? 'music.on' : 'music.off';
      label.dataset.i18n = key;
      label.textContent = t(key);
    };
    const start = async () => {
      if (playing) return;
      if (!ctx) build();
      await ctx.resume();
      playing = true; setUI(true); pref('on');
      nextTime = ctx.currentTime + 0.1;
      timer = setInterval(schedule, 150);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.5, ctx.currentTime, 0.8);
    };
    const stop = () => {
      if (!playing) return;
      playing = false; setUI(false); pref('off');
      clearInterval(timer);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      setTimeout(() => { if (!playing) ctx.suspend(); }, 1500);
    };

    musicBtn.addEventListener('click', () => (playing ? stop() : start()));
    document.addEventListener('visibilitychange', () => {
      if (!ctx || !playing) return;
      if (document.hidden) {
        ctx.suspend();
      } else {
        ctx.resume();
      }
    });

    // Browsers block sound until you interact, so if music was on for the
    // previous page, it restarts on the first click or key press here.
    if (pref() === 'on') {
      const events = ['pointerdown', 'keydown', 'touchstart'];
      const resume = e => {
        if (playing || pref() !== 'on' || musicBtn.contains(e.target)) return;
        events.forEach(n => removeEventListener(n, resume));
        start();
      };
      events.forEach(n => addEventListener(n, resume));
    }
  }

  /* Background video: fades in once loaded, pauses off-screen or with reduced motion */
  const bgVideo = document.querySelector('.bg-video');
  if (bgVideo) {
    const band = bgVideo.closest('.hero-band');
    if (band) {
      bgVideo.addEventListener('loadeddata', () => band.classList.add('has-video'), { once: true });
      if (bgVideo.readyState >= 2) band.classList.add('has-video');
    }
    if (!animate) {
      bgVideo.removeAttribute('autoplay');
      bgVideo.pause(); // shows the first frame only
    } else {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) bgVideo.play().catch(() => {});
        else bgVideo.pause();
      }).observe(band || bgVideo);
    }
  }

  if (!animate) return;

  /* 2. Headline reveals word by word (the words are split in applyLang) */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    h1?.classList.add('in');
    document.querySelector('.hero > p:not(.hero-kicker), .hero-copy > p:not(.hero-kicker)')?.classList.add('in');
  }));

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    document.body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.16 });
    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add('in'));
  }

    /* 5. Glass button catches the light under the cursor */
    if (finePointer){
      document.querySelectorAll('.btn-glass').forEach(btn => {
        btn.addEventListener('pointermove', e => {
          const r = btn.getBoundingClientRect();
          btn.style.setProperty('--mx', (e.clientX - r.left) + 'px');
          btn.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
      });
    }

  /* 6. Garnet wipe between pages */
  const wipe = document.createElement('div');
  wipe.className = 'wipe';
  document.body.appendChild(wipe);
  const ms = 550;
  const slide = (from, to, then) => {
    wipe.style.transition = 'none';
    wipe.style.transform = `translateY(${from})`;
    wipe.getBoundingClientRect(); // force reflow
    wipe.style.transition = `transform ${ms}ms cubic-bezier(.7,0,.2,1)`;
    wipe.style.transform = `translateY(${to})`;
    if (then) setTimeout(then, ms);
  };
  slide('0%', '-100%'); // reveal the page on load
  addEventListener('pageshow', e => { if (e.persisted) slide('0%', '-100%'); });

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (a.target === '_blank' || a.origin !== location.origin) return;
    if (a.pathname === location.pathname) return; // same page or in-page anchor
    e.preventDefault();
    slide('100%', '0%', () => { location.href = a.href; });
  });
})();
