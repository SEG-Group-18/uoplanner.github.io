(() => {
  const root = document.documentElement;
  const animate = !matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Language and theme preferences */

  const store = {
    get: k => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set: (k, v) => {
      try {
        localStorage.setItem(k, v);
      } catch {}
    }
  };

  const dict = {
    en: {
      "title": "Our Team | UOPlanner",
      "nav.home": "Home Page",
      "nav.product": "Our Product",
      "nav.pricing": "Pricing",
      "nav.team": "Our Team",
      "hero.title": "About Our Team",
      "hero.text": "Meet the people building a simpler way to plan your semester.",
      "mission.kicker": "Our mission",
      "mission.title": "Built by students, for students.",
      "mission.text": "UOPlanner is created by software engineering and computer science students at the University of Ottawa who want to make a common academic planning challenge easier. Our team brings together technical development, product thinking, and user experience to turn a stressful task into a clearer, more manageable process. We believe a better-planned week can help students make room for their studies and their lives.",
      "lang.switch": "Switch to French",
      "theme.toDark": "Switch to dark mode",
      "theme.toLight": "Switch to light mode"
    },
    fr: {
      "title": "Notre équipe | UOPlanner",
      "nav.home": "Accueil",
      "nav.product": "Notre produit",
      "nav.pricing": "Tarifs",
      "nav.team": "Notre équipe",
      "hero.title": "À propos de notre équipe",
      "hero.text": "Découvrez les personnes qui simplifient la planification de votre semestre.",
      "mission.kicker": "Notre mission",
      "mission.title": "Créé par des étudiants, pour les étudiants.",
      "mission.text": "UOPlanner est conçu par des étudiants en génie logiciel et en informatique de l’Université d’Ottawa qui souhaitent simplifier un défi courant de la planification universitaire. Notre équipe réunit développement technique, réflexion produit et expérience utilisateur pour transformer une tâche stressante en un processus plus clair et plus facile à gérer. Nous croyons qu’une semaine mieux planifiée aide les étudiants à faire de la place pour leurs études et leur vie.",
      "lang.switch": "Passer en anglais",
      "theme.toDark": "Passer en mode sombre",
      "theme.toLight": "Passer en mode clair"
    }
  };

  let lang = store.get('uop-lang') || 'en';

  if (!dict[lang]) lang = 'en';

  const t = key => dict[lang][key] ?? dict.en[key] ?? key;

  const applyLang = () => {
    root.lang = lang;
    document.title = t('title');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    const langBtn = document.querySelector('.lang');
    const themeBtn = document.querySelector('.theme');
    if (langBtn) {
      langBtn.textContent = lang === 'en' ? 'FR' : 'EN';
      langBtn.setAttribute('aria-label', t('lang.switch'));
    }
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', t(root.dataset.theme === 'dark' ? 'theme.toLight' : 'theme.toDark'));
    }
  };

  applyLang();

  /* 2. Theme */

  const savedTheme = store.get('uop-theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  document.querySelector('.lang')?.addEventListener('click', () => {
    lang = lang === 'en' ? 'fr' : 'en';
    store.set('uop-lang', lang);
    applyLang();
  });
  document.querySelector('.theme')?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    store.set('uop-theme', root.dataset.theme);
    applyLang();
  });

  /* 3. Navbar scroll effect */

  const nav = document.querySelector('.navbar');

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', scrollY > 10);
    };

    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 4. Background video */

  const bgVideo = document.querySelector('.team-page .bg-video');

  if (bgVideo) {
    const band = bgVideo.closest('.hero-band');

    if (band) {
      const loaded = () => band.classList.add('has-video');

      bgVideo.addEventListener('loadeddata', loaded, {
        once: true
      });

      if (bgVideo.readyState >= 2) loaded();
    }

    if (!animate) {
      bgVideo.removeAttribute('autoplay');
      bgVideo.pause();
    } else if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          bgVideo.play().catch(() => {});
        } else {
          bgVideo.pause();
        }
      }).observe(band || bgVideo);
    }
  }

  /* 5. Team card animations */

  const cards = document.querySelectorAll(
    '.team-page .team-grid article'
  );

  if (animate && 'IntersectionObserver' in window) {
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition =
        'opacity .7s ease, transform .7s ease';
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));
  }

  /* 6. Hero animation */

  const h1 = document.querySelector('.team-page .hero h1');
  const heroText = document.querySelector('.team-page .hero p');

  if (animate) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        h1?.classList.add('in');
        heroText?.classList.add('in');
      });
    });
  }

  /* 7. Page transition */

  if (!animate) return;

  const wipe = document.createElement('div');
  wipe.className = 'wipe';
  document.body.appendChild(wipe);

  const ms = 550;

  const slide = (from, to, then) => {
    wipe.style.transition = 'none';
    wipe.style.transform = `translateY(${from})`;

    wipe.getBoundingClientRect();

    wipe.style.transition =
      `transform ${ms}ms cubic-bezier(.7,0,.2,1)`;

    wipe.style.transform = `translateY(${to})`;

    if (then) setTimeout(then, ms);
  };

  slide('0%', '-100%');

  addEventListener('pageshow', e => {
    if (e.persisted) slide('0%', '-100%');
  });

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');

    if (!a ||
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0) return;

    if (a.target === '_blank' ||
        a.origin !== location.origin ||
        a.hasAttribute('download')) return;

    if (a.pathname === location.pathname &&
        a.search === location.search) return;

    e.preventDefault();

    slide('100%', '0%', () => {
      location.href = a.href;
    });
  });

})();
