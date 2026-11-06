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
      "title": "Pricing | UOPlanner",
      "brand.aria": "UOPlanner home",
      "nav.label": "Main",
      "nav.home": "Home Page",
      "nav.product": "Our Product",
      "nav.team": "Our Team",
      "hero.title": "UOPlanner runs completely free.",
      "hero.text": "We only make money from occasional ads. Students are already struggling financially, so it’s the least we can do.",
      "b1.title": "Tell us your program",
      "b1.text": "Enter your program of study and your year of study.",
      "b2.title": "Get every schedule",
      "b2.text": "We build every possible combination of your courses, so you don’t have to dig through uoZone one by one.",
      "b3.title": "Pick the one you like",
      "b3.text": "Keep the schedule that works best for you.",
      "cta.title": "Plan your schedule.",
      "cta.button": "Start planning",
      "footer.pricing": "Pricing",
      "lang.switch": "Switch to French",
      "theme.toDark": "Switch to dark mode",
      "theme.toLight": "Switch to light mode",
      "music.on": "Music on",
      "music.off": "Music off"
    },
    fr: {
      "title": "Tarifs | UOPlanner",
      "brand.aria": "Accueil UOPlanner",
      "nav.label": "Principale",
      "nav.home": "Accueil",
      "nav.product": "Notre produit",
      "nav.team": "Notre équipe",
      "hero.title": "UOPlanner est entièrement gratuit.",
      "hero.text": "Nous ne gagnons de l’argent qu’avec quelques publicités occasionnelles. Les étudiants ont déjà des difficultés financières, c’est le moins que nous puissions faire.",
      "b1.title": "Indiquez votre programme",
      "b1.text": "Entrez votre programme d’études et votre année d’études.",
      "b2.title": "Obtenez tous les horaires",
      "b2.text": "Nous générons toutes les combinaisons possibles de vos cours, pour que vous n’ayez pas à fouiller dans uoZone une par une.",
      "b3.title": "Choisissez celui que vous aimez",
      "b3.text": "Gardez l’horaire qui vous convient le mieux.",
      "cta.title": "Planifiez votre horaire.",
      "cta.button": "Commencer à planifier",
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
  const t = key => dict[lang][key];
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
    h1.classList.remove('in');
    applyLang();
    if (animate) requestAnimationFrame(() => requestAnimationFrame(() => h1.classList.add('in')));
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
      document.hidden ? ctx.suspend() : ctx.resume();
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
    bgVideo.addEventListener('loadeddata', () => band.classList.add('has-video'), { once: true });
    if (bgVideo.readyState >= 2) band.classList.add('has-video');
    if (!animate) {
      bgVideo.removeAttribute('autoplay');
      bgVideo.pause(); // shows the first frame only
    } else {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) bgVideo.play().catch(() => {});
        else bgVideo.pause();
      }).observe(band);
    }
  }

  if (!animate) return;

  /* 2. Headline reveals word by word (the words are split in applyLang) */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    h1.classList.add('in');
    document.querySelector('.hero p').classList.add('in');
  }));

  /* 3. Blocks drop into the timetable and the price falls to $0 */
  const countDown = (el, from) => {
    const start = performance.now(), duration = 1300;
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = '$' + Math.round(from * (1 - (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const startPrices = [25, 18, 12];
  const blocks = [...document.querySelectorAll('.block')];
  blocks.forEach((b, i) => { b.querySelector('.price').textContent = '$' + startPrices[i]; });
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const b = entry.target, i = blocks.indexOf(b);
      b.style.setProperty('--d', i * 150 + 'ms');
      b.classList.add('in');
      setTimeout(() => countDown(b.querySelector('.price'), startPrices[i]), i * 150 + 300);
      io.unobserve(b);
    });
  }, { threshold: 0.2 });
  blocks.forEach(b => io.observe(b));

  /* 4. Blocks tilt toward the cursor with a light sheen */
  if (finePointer) {
    blocks.forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        b.style.setProperty('--ry', ((x - .5) * 10).toFixed(2) + 'deg');
        b.style.setProperty('--rx', ((.5 - y) * 10).toFixed(2) + 'deg');
        b.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        b.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
      b.addEventListener('pointerleave', () => {
        b.style.setProperty('--rx', '0deg');
        b.style.setProperty('--ry', '0deg');
      });
    });

    /* 5. Glass button catches the light under the cursor */
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
