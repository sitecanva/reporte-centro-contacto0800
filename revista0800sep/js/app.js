// Flipbook Application Logic with StPageFlip, Sound, Stage Wheel Zoom, Sizing & Help Guide

document.addEventListener('DOMContentLoaded', () => {
  const TOTAL_PAGES = 17;
  const bookElement = document.getElementById('flipbook');
  const mainStage = document.querySelector('.main-stage');
  const viewportEl = document.querySelector('.flipbook-viewport');
  const pageCounterEl = document.getElementById('page-counter');
  const scrubberEl = document.getElementById('page-scrubber');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const prevNavBtn = document.getElementById('nav-prev');
  const nextNavBtn = document.getElementById('nav-next');
  const tocModal = document.getElementById('toc-modal');
  const tocOpenBtn = document.getElementById('btn-toc');
  const tocCloseBtn = document.getElementById('btn-close-toc');
  const thumbsDrawer = document.getElementById('thumbs-drawer');
  const thumbsOpenBtn = document.getElementById('btn-thumbs');
  const thumbsCloseBtn = document.getElementById('btn-close-thumbs');
  const zoomModal = document.getElementById('zoom-modal');
  const zoomOpenBtn = document.getElementById('btn-zoom');
  const zoomCloseBtn = document.getElementById('btn-close-zoom');
  const zoomImg = document.getElementById('zoom-image');
  const soundToggleBtn = document.getElementById('btn-sound');
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  const themeToggleBtn = document.getElementById('btn-theme');
  const autoplayBtn = document.getElementById('btn-autoplay');
  const autoplayBar = document.getElementById('autoplay-bar');
  const modeIndicator = document.getElementById('mode-indicator');
  const viewModeBtn = document.getElementById('btn-view-mode');
  const helpBtn = document.getElementById('btn-help');
  const helpToast = document.getElementById('help-toast');
  const closeToastBtn = document.getElementById('btn-close-toast');
  const toastFullscreenBtn = document.getElementById('btn-toast-fullscreen');
  const stageZoomHud = document.getElementById('stage-zoom-hud');
  const hudZoomVal = document.getElementById('hud-zoom-val');
  const hudZoomIn = document.getElementById('hud-zoom-in');
  const hudZoomOut = document.getElementById('hud-zoom-out');
  const hudZoomReset = document.getElementById('hud-zoom-reset');

  // Table of Contents Data (Informe Oficial Septiembre 2026 - 17 Páginas)
  const tocData = [
    { page: 1, chapter: "Portada", title: "Centro de Contacto &bull; Reporte Operativo" },
    { page: 2, chapter: "Capítulo 1", title: "Informe Operativo & Resumen General" },
    { page: 3, chapter: "Capítulo 2 & 3", title: "Volumen por Segmento y Top 5 de Productos" },
    { page: 4, chapter: "Capítulo 4 & 5", title: "Tipo de Solicitud y Averías Frecuentes" },
    { page: 5, chapter: "Capítulo 6", title: "Análisis Detallado de OTRO REQUERIMIENTO" },
    { page: 6, chapter: "Capítulo 7", title: "Comportamiento del Servicio por Día y Semana" },
    { page: 7, chapter: "Capítulo 8", title: "Ranking de Efectividad de Ejecutivos (1-19)" },
    { page: 8, chapter: "Capítulo 8.1", title: "Ranking de Ejecutivos por Volumen Atendido" },
    { page: 9, chapter: "Capítulo 9 & 10.1", title: "Estado Final y Desplazamiento a Facturación" },
    { page: 10, chapter: "Capítulo 10.2 & 10.3", title: "Averías de Fibra Óptica y Llamadas Caídas" },
    { page: 11, chapter: "Capítulo 10.4", title: "Capacidad Ociosa del Talento Humano" },
    { page: 12, chapter: "Capítulo 10.4 (Cont.)", title: "Hallazgos, Implicación y Recomendaciones de Carga" },
    { page: 13, chapter: "Capítulo 10.5", title: "Matriz Volumen Vs Efectividad FCR (19 Ejecutivos)" },
    { page: 14, chapter: "Capítulo 10.5 (Cont.)", title: "Análisis Cualitativo FCR y Brecha Operativa" },
    { page: 15, chapter: "Capítulo 11", title: "Conclusiones Operativas y Dotación por Día" },
    { page: 16, chapter: "Capítulo 12", title: "Resumen Ejecutivo: Datos Clave del Período" },
    { page: 17, chapter: "Contraportada", title: "iPulso | CANTV &bull; El pulso de la operación" }
  ];

  // 1. Initialize St.PageFlip
  const pageFlip = new St.PageFlip(bookElement, {
    width: 595,
    height: 842,
    size: 'stretch',
    minWidth: 80,
    maxWidth: 1000,
    minHeight: 80,
    maxHeight: 1400,
    maxShadowOpacity: 0.8,
    showCover: true,
    mobileScrollSupport: false,
    flippingTime: 480,
    showPageCorners: true,
    useMouseEvents: true,
    swipeDistance: 10
  });

  // Load pages from existing HTML page elements
  const pageElements = document.querySelectorAll('.page');
  pageFlip.loadFromHTML(pageElements);

  // Sound instance
  const sound = window.pageFlipSound;

  // View Mode State
  let isSingleMode = false;

  // Helper functions for mobile detection and orientation
  function isPhonePortrait() {
    return window.innerWidth < 768 && window.innerHeight >= window.innerWidth;
  }

  function isPhoneLandscape() {
    return window.innerHeight < 600 && window.innerWidth > window.innerHeight;
  }

  // Autoplay State
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 6000;

  // Modal Zoom State (Lightbox)
  let modalZoomLevel = 1;
  let isDraggingModalZoom = false;
  let modalZoomStartX = 0, modalZoomStartY = 0;
  let modalZoomTranslateX = 0, modalZoomTranslateY = 0;

  // In-Stage Wheel Zoom State
  let stageZoom = 1.0;
  let stagePanX = 0, stagePanY = 0;
  let isStagePanning = false;
  let panStartX = 0, panStartY = 0;

  /**
   * 2. Dynamic Viewport Fit Calculation
   * On Phone Portrait: strictly 1 single page centered
   * On Phone Landscape: 2 pages spread side-by-side
   * On Desktop / Tablet: responsive spread with manual toggle
   */
  function adjustFlipbookSize() {
    if (!mainStage || !bookElement) return;

    let isCurrentSingle;
    if (isPhonePortrait()) {
      isCurrentSingle = true; // Telefono vertical: 1 sola hoja siempre
    } else if (isPhoneLandscape()) {
      isCurrentSingle = false; // Telefono horizontal girado: vista a 2 hojas
    } else {
      isCurrentSingle = isSingleMode || (window.innerWidth < 850);
    }

    // Dynamic stage margins
    let marginHorizontal = 64;
    let marginVertical = 20;

    if (isPhonePortrait()) {
      marginHorizontal = 8; // Maximize page width on vertical phone
      marginVertical = 10;
    } else if (isPhoneLandscape()) {
      marginHorizontal = 28;
      marginVertical = 6;
    }

    const availW = Math.max(mainStage.clientWidth - marginHorizontal, 180);
    const availH = Math.max(mainStage.clientHeight - marginVertical, 180);

    const pageRatio = 595 / 842;         // ~0.7066 (1 sola hoja)
    const spreadRatio = (595 * 2) / 842; // ~1.4133 (2 hojas abiertas)

    const targetRatio = isCurrentSingle ? pageRatio : spreadRatio;

    let targetW, targetH;
    if (availW / availH > targetRatio) {
      // Height is the limiting factor
      targetH = availH;
      targetW = targetH * targetRatio;
    } else {
      // Width is the limiting factor
      targetW = availW;
      targetH = targetW / targetRatio;
    }

    targetW = Math.floor(targetW);
    targetH = Math.floor(targetH);

    bookElement.style.width = `${targetW}px`;
    bookElement.style.height = `${targetH}px`;

    // Force StPageFlip to strictly respect single page in portrait and 2-page spread in landscape
    const settings = pageFlip.getSettings();
    if (settings) {
      if (isCurrentSingle) {
        settings.minWidth = targetW + 20; // Forces portrait mode (1 single page)
      } else {
        settings.minWidth = Math.floor(targetW / 2) - 20; // Forces landscape mode (2 pages spread)
      }
    }

    viewportEl.classList.toggle('single-mode', isCurrentSingle);

    try {
      pageFlip.update();
    } catch (e) {}

    updateOrientationUI(pageFlip.getOrientation());
  }

  // Orientation listeners for mobile devices
  window.addEventListener('resize', adjustFlipbookSize);
  window.addEventListener('orientationchange', () => {
    setTimeout(adjustFlipbookSize, 120);
    setTimeout(adjustFlipbookSize, 350);
  });
  if (window.screen && window.screen.orientation) {
    window.screen.orientation.addEventListener('change', () => {
      setTimeout(adjustFlipbookSize, 120);
      setTimeout(adjustFlipbookSize, 350);
    });
  }

  setTimeout(adjustFlipbookSize, 50);
  setTimeout(adjustFlipbookSize, 300);

  /**
   * 3. In-Stage Mouse Wheel Zoom & Pan
   */
  function applyStageZoom() {
    if (stageZoom <= 1.0) {
      stageZoom = 1.0;
      stagePanX = 0;
      stagePanY = 0;
      viewportEl.classList.remove('is-zoomed');
      stageZoomHud.classList.remove('visible');
      bookElement.style.transform = '';
    } else {
      viewportEl.classList.add('is-zoomed');
      stageZoomHud.classList.add('visible');
      hudZoomVal.textContent = `${Math.round(stageZoom * 100)}%`;
      bookElement.style.transform = `scale(${stageZoom}) translate(${stagePanX}px, ${stagePanY}px)`;
    }
  }

  mainStage.addEventListener('wheel', (e) => {
    // Only zoom when mouse is inside stage and modals are closed
    if (tocModal.classList.contains('active') || zoomModal.classList.contains('active')) return;

    e.preventDefault();
    if (e.deltaY < 0) {
      // Scroll Up -> Zoom In
      stageZoom = Math.min(stageZoom + 0.15, 2.8);
    } else {
      // Scroll Down -> Zoom Out
      stageZoom = Math.max(stageZoom - 0.15, 1.0);
    }

    // Dismiss help toast once user begins using zoom
    helpToast.classList.add('hidden');

    applyStageZoom();
  }, { passive: false });

  // Panning when zoomed in
  mainStage.addEventListener('mousedown', (e) => {
    if (stageZoom > 1.0) {
      // Avoid conflict if clicking HUD buttons
      if (e.target.closest('#stage-zoom-hud')) return;

      isStagePanning = true;
      viewportEl.classList.add('dragging');
      panStartX = e.clientX - stagePanX * stageZoom;
      panStartY = e.clientY - stagePanY * stageZoom;
      e.stopPropagation();
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isStagePanning || stageZoom <= 1.0) return;
    stagePanX = (e.clientX - panStartX) / stageZoom;
    stagePanY = (e.clientY - panStartY) / stageZoom;

    // Bounds limit
    const maxPan = 450 * (stageZoom - 1);
    stagePanX = Math.max(Math.min(stagePanX, maxPan), -maxPan);
    stagePanY = Math.max(Math.min(stagePanY, maxPan), -maxPan);

    applyStageZoom();
  });

  window.addEventListener('mouseup', () => {
    if (isStagePanning) {
      isStagePanning = false;
      viewportEl.classList.remove('dragging');
    }
  });

  // Double click resets zoom
  bookElement.addEventListener('dblclick', () => {
    stageZoom = 1.0;
    applyStageZoom();
  });

  // HUD buttons
  hudZoomIn.addEventListener('click', () => {
    stageZoom = Math.min(stageZoom + 0.25, 2.8);
    applyStageZoom();
  });

  hudZoomOut.addEventListener('click', () => {
    stageZoom = Math.max(stageZoom - 0.25, 1.0);
    applyStageZoom();
  });

  hudZoomReset.addEventListener('click', () => {
    stageZoom = 1.0;
    applyStageZoom();
  });

  /**
   * 4. Help Toast & Fullscreen Assistance
   */
  helpBtn.addEventListener('click', () => {
    helpToast.classList.toggle('hidden');
  });

  closeToastBtn.addEventListener('click', () => {
    helpToast.classList.add('hidden');
  });

  if (toastFullscreenBtn) {
    toastFullscreenBtn.addEventListener('click', () => {
      fullscreenBtn.click();
      helpToast.classList.add('hidden');
    });
  }

  // Auto-hide help toast after 14 seconds
  setTimeout(() => {
    if (!helpToast.classList.contains('hidden')) {
      helpToast.classList.add('hidden');
    }
  }, 14000);

  /**
   * 5. Flipbook Events Binding
   */
  pageFlip.on('flip', (e) => {
    const pageIndex = e.data;
    sound.play();
    updateUI(pageIndex);
    showMobileArrowsTemporary(3500);
    if (autoplayInterval) resetAutoplayProgress();

    // Auto-dismiss help toast once user flips away from the cover
    if (pageIndex > 0 && !helpToast.classList.contains('hidden')) {
      helpToast.classList.add('hidden');
    }
  });

  pageFlip.on('changeOrientation', (e) => {
    updateOrientationUI(e.data);
    adjustFlipbookSize();
    showMobileArrowsTemporary(3500);
  });

  pageFlip.on('init', (e) => {
    updateUI(0);
    updateOrientationUI(pageFlip.getOrientation());
    adjustFlipbookSize();
    showMobileArrowsTemporary(4000);
  });

  function updateOrientationUI(orientation) {
    const isCurrentSingle = isPhonePortrait() || isSingleMode || (!isPhoneLandscape() && orientation === 'portrait');
    if (isCurrentSingle) {
      modeIndicator.textContent = isPhonePortrait() ? "📱 1 Hoja (Gira para 2)" : "Modo: Revista Vertical";
      viewModeBtn.setAttribute('title', "Cambiar a Doble Página");
      const label = viewModeBtn.querySelector('.view-mode-label');
      if (label) label.textContent = '1 Pág';
    } else {
      modeIndicator.textContent = isPhoneLandscape() ? "📖 2 Hojas (Horizontal)" : "Modo: Doble Página";
      viewModeBtn.setAttribute('title', "Cambiar a Revista Vertical");
      const label = viewModeBtn.querySelector('.view-mode-label');
      if (label) label.textContent = '2 Págs';
    }
  }

  let scrubberTimer = null;
  let isScrubbing = false;

  function updateScrubberCounter(pageVal) {
    const p = Math.max(1, Math.min(TOTAL_PAGES, parseInt(pageVal, 10)));
    pageCounterEl.innerHTML = `Página <span class="page-badge">${p}</span> de ${TOTAL_PAGES}`;
  }

  function updateUI(pageIndex) {
    if (isScrubbing) return;
    const currentPage = pageIndex + 1;
    const orientation = pageFlip.getOrientation();
    const isCurrentSingle = isPhonePortrait() || isSingleMode || (!isPhoneLandscape() && orientation === 'portrait');

    // Calculate displayed page label
    if (!isCurrentSingle && currentPage > 1 && currentPage < TOTAL_PAGES) {
      const leftPage = pageIndex % 2 === 0 ? pageIndex : pageIndex - 1;
      const rightPage = leftPage + 1;
      pageCounterEl.innerHTML = `Páginas <span class="page-badge">${leftPage + 1} - ${Math.min(rightPage + 1, TOTAL_PAGES)}</span> de ${TOTAL_PAGES}`;
    } else {
      pageCounterEl.innerHTML = `Página <span class="page-badge">${currentPage}</span> de ${TOTAL_PAGES}`;
    }

    // Scrubber update
    scrubberEl.value = currentPage;

    // Prev/Next buttons disabled states
    const isFirst = pageIndex === 0;
    const isLast = pageIndex >= TOTAL_PAGES - 1;

    prevBtn.disabled = isFirst;
    prevNavBtn.disabled = isFirst;
    nextBtn.disabled = isLast;
    nextNavBtn.disabled = isLast;

    // Highlight thumbnail
    document.querySelectorAll('.thumb-card').forEach((card, idx) => {
      card.classList.toggle('active', idx === pageIndex);
    });

    const activeThumb = document.querySelector(`.thumb-card[data-page="${currentPage}"]`);
    if (activeThumb && thumbsDrawer.classList.contains('open')) {
      activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // View Mode (Single Vertical Page vs Double Page Spread)
  if (viewModeBtn) {
    viewModeBtn.addEventListener('click', () => {
      isSingleMode = !isSingleMode;
      viewportEl.classList.toggle('single-mode', isSingleMode);
      viewModeBtn.classList.toggle('active', isSingleMode);
      adjustFlipbookSize();
      updateOrientationUI(pageFlip.getOrientation());
      updateUI(pageFlip.getCurrentPageIndex());
    });
  }

  // Floating Side Arrows: Auto-show for seconds on mobile, then smoothly fade out to not obstruct reading
  let mobileArrowsTimer = null;
  const mobileArrows = [prevNavBtn, nextNavBtn];

  function showMobileArrowsTemporary(duration = 3500) {
    if (window.innerWidth > 768) {
      mobileArrows.forEach(btn => {
        btn.classList.remove('mobile-hidden');
        btn.classList.remove('mobile-visible');
      });
      return;
    }

    mobileArrows.forEach(btn => {
      btn.classList.remove('mobile-hidden');
      btn.classList.add('mobile-visible');
    });

    clearTimeout(mobileArrowsTimer);
    mobileArrowsTimer = setTimeout(() => {
      if (window.innerWidth <= 768) {
        mobileArrows.forEach(btn => {
          btn.classList.remove('mobile-visible');
          btn.classList.add('mobile-hidden');
        });
      }
    }, duration);
  }

  // Any screen tap / touch in mobile reveals floating arrows temporarily
  document.addEventListener('touchstart', (e) => {
    showMobileArrowsTemporary(3500);
  }, { passive: true });

  document.addEventListener('pointerdown', (e) => {
    if (window.innerWidth <= 768) {
      showMobileArrowsTemporary(3500);
    }
  }, { passive: true });

  // Navigation handlers
  prevBtn.addEventListener('click', () => {
    stageZoom = 1.0;
    applyStageZoom();
    pageFlip.flipPrev();
    showMobileArrowsTemporary(3500);
  });
  prevNavBtn.addEventListener('click', () => {
    stageZoom = 1.0;
    applyStageZoom();
    pageFlip.flipPrev();
    showMobileArrowsTemporary(3500);
  });
  nextBtn.addEventListener('click', () => {
    stageZoom = 1.0;
    applyStageZoom();
    pageFlip.flipNext();
    showMobileArrowsTemporary(3500);
  });
  nextNavBtn.addEventListener('click', () => {
    stageZoom = 1.0;
    applyStageZoom();
    pageFlip.flipNext();
    showMobileArrowsTemporary(3500);
  });

  // Scrubber slider (real-time preview & debounced flip for ultra smoothness and sensitivity)
  scrubberEl.addEventListener('input', (e) => {
    isScrubbing = true;
    stageZoom = 1.0;
    applyStageZoom();
    const val = parseInt(e.target.value, 10);
    updateScrubberCounter(val);

    clearTimeout(scrubberTimer);
    scrubberTimer = setTimeout(() => {
      const targetIndex = val - 1;
      if (pageFlip.getCurrentPageIndex() !== targetIndex) {
        pageFlip.flip(targetIndex);
      }
    }, 75);
  });

  scrubberEl.addEventListener('change', (e) => {
    clearTimeout(scrubberTimer);
    isScrubbing = false;
    const targetIndex = parseInt(e.target.value, 10) - 1;
    if (pageFlip.getCurrentPageIndex() !== targetIndex) {
      pageFlip.flip(targetIndex);
    }
  });

  scrubberEl.addEventListener('touchend', () => {
    setTimeout(() => { isScrubbing = false; }, 150);
  });
  scrubberEl.addEventListener('pointerup', () => {
    setTimeout(() => { isScrubbing = false; }, 150);
  });

  // Touch Swipe Gesture Enhancement for mobile devices
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  mainStage.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1 && stageZoom <= 1.0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }
  }, { passive: true });

  mainStage.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1 && stageZoom <= 1.0) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      const elapsed = Date.now() - touchStartTime;

      // Detect horizontal flick / swipe (> 25px horizontal and under 450ms)
      if (Math.abs(deltaX) > 25 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && elapsed < 450) {
        if (deltaX < 0) {
          pageFlip.flipNext();
        } else {
          pageFlip.flipPrev();
        }
      }
    }
  }, { passive: true });

  // Table of Contents Modal Generation & Handlers
  const tocGrid = document.getElementById('toc-grid');
  tocData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'toc-item';
    card.innerHTML = `
      <img src="pages/page_${item.page}.png" class="toc-thumb" alt="Pág ${item.page}">
      <div class="toc-info">
        <div class="toc-chapter">${item.chapter}</div>
        <div class="toc-name">${item.title}</div>
      </div>
      <div class="toc-page">Pág. ${item.page}</div>
    `;
    card.addEventListener('click', () => {
      stageZoom = 1.0;
      applyStageZoom();
      pageFlip.flip(item.page - 1);
      closeAllModals();
    });
    tocGrid.appendChild(card);
  });

  tocOpenBtn.addEventListener('click', () => {
    closeAllModals();
    tocModal.classList.add('active');
  });

  tocCloseBtn.addEventListener('click', () => tocModal.classList.remove('active'));

  // Thumbnail Drawer Generation & Handlers
  const drawerContent = document.getElementById('thumbs-track');
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const thumb = document.createElement('div');
    thumb.className = `thumb-card ${i === 1 ? 'active' : ''}`;
    thumb.dataset.page = i;
    thumb.innerHTML = `
      <img src="pages/page_${i}.png" alt="Página ${i}">
      <span>Pág ${i}</span>
    `;
    thumb.addEventListener('click', () => {
      stageZoom = 1.0;
      applyStageZoom();
      pageFlip.flip(i - 1);
    });
    drawerContent.appendChild(thumb);
  }

  thumbsOpenBtn.addEventListener('click', () => {
    thumbsDrawer.classList.toggle('open');
    thumbsOpenBtn.classList.toggle('active', thumbsDrawer.classList.contains('open'));
    if (thumbsDrawer.classList.contains('open')) {
      const currentPage = pageFlip.getCurrentPageIndex() + 1;
      const activeThumb = document.querySelector(`.thumb-card[data-page="${currentPage}"]`);
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  });

  thumbsCloseBtn.addEventListener('click', () => {
    thumbsDrawer.classList.remove('open');
    thumbsOpenBtn.classList.remove('active');
  });

  // Sound Toggle
  soundToggleBtn.addEventListener('click', () => {
    const isEnabled = sound.toggle();
    soundToggleBtn.classList.toggle('active', isEnabled);
    soundToggleBtn.querySelector('.sound-label').textContent = isEnabled ? 'Sonido: ON' : 'Sonido: OFF';
    if (isEnabled) sound.play();
  });

  // Fullscreen Toggle
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.warn(err.message));
      fullscreenBtn.classList.remove('btn-pulse-glow');
    } else {
      document.exitFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    fullscreenBtn.classList.toggle('active', !!document.fullscreenElement);
    if (document.fullscreenElement) {
      fullscreenBtn.classList.remove('btn-pulse-glow');
    }
    setTimeout(adjustFlipbookSize, 100);
  });

  // Theme Toggle (Dark Cyber / Light Corporate)
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggleBtn.classList.toggle('active', isLight);
  });

  // Autoplay (Presentation Mode)
  autoplayBtn.addEventListener('click', () => {
    if (autoplayInterval) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  function startAutoplay() {
    autoplayBtn.classList.add('active');
    autoplayBtn.querySelector('.autoplay-label').textContent = 'Pausar';
    resetAutoplayProgress();
    autoplayInterval = setInterval(() => {
      const current = pageFlip.getCurrentPageIndex();
      if (current >= TOTAL_PAGES - 1) {
        pageFlip.flip(0);
      } else {
        pageFlip.flipNext();
      }
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    autoplayBtn.classList.remove('active');
    autoplayBtn.querySelector('.autoplay-label').textContent = 'Presentar';
    autoplayBar.style.width = '0%';
    autoplayBar.style.transition = 'none';
  }

  function resetAutoplayProgress() {
    if (!autoplayInterval) return;
    autoplayBar.style.transition = 'none';
    autoplayBar.style.width = '0%';
    setTimeout(() => {
      autoplayBar.style.transition = `width ${AUTOPLAY_DELAY}ms linear`;
      autoplayBar.style.width = '100%';
    }, 50);
  }

  // Lightbox Modal Zoom Handlers
  zoomOpenBtn.addEventListener('click', () => {
    closeAllModals();
    const currentPage = pageFlip.getCurrentPageIndex() + 1;
    zoomImg.src = `pages/page_${currentPage}.png`;
    modalZoomLevel = 1;
    modalZoomTranslateX = 0;
    modalZoomTranslateY = 0;
    applyModalZoomTransform();
    zoomModal.classList.add('active');
  });

  zoomCloseBtn.addEventListener('click', () => {
    zoomModal.classList.remove('active');
  });

  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    modalZoomLevel = Math.min(modalZoomLevel + 0.35, 3.5);
    applyModalZoomTransform();
  });

  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    modalZoomLevel = Math.max(modalZoomLevel - 0.35, 0.7);
    applyModalZoomTransform();
  });

  document.getElementById('btn-zoom-reset').addEventListener('click', () => {
    modalZoomLevel = 1;
    modalZoomTranslateX = 0;
    modalZoomTranslateY = 0;
    applyModalZoomTransform();
  });

  function applyModalZoomTransform() {
    zoomImg.style.transform = `scale(${modalZoomLevel}) translate(${modalZoomTranslateX}px, ${modalZoomTranslateY}px)`;
  }

  const zoomStage = document.getElementById('zoom-stage');
  zoomStage.addEventListener('mousedown', (e) => {
    if (e.target === zoomImg || e.target === zoomStage) {
      isDraggingModalZoom = true;
      zoomStage.classList.add('dragging');
      modalZoomStartX = e.clientX - modalZoomTranslateX;
      modalZoomStartY = e.clientY - modalZoomTranslateY;
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingModalZoom) return;
    modalZoomTranslateX = e.clientX - modalZoomStartX;
    modalZoomTranslateY = e.clientY - modalZoomStartY;
    applyModalZoomTransform();
  });

  window.addEventListener('mouseup', () => {
    isDraggingModalZoom = false;
    zoomStage.classList.remove('dragging');
  });

  zoomStage.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      modalZoomLevel = Math.min(modalZoomLevel + 0.2, 3.5);
    } else {
      modalZoomLevel = Math.max(modalZoomLevel - 0.2, 0.7);
    }
    applyModalZoomTransform();
  }, { passive: false });

  // Close modals helper
  function closeAllModals() {
    tocModal.classList.remove('active');
    zoomModal.classList.remove('active');
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      thumbsDrawer.classList.remove('open');
      thumbsOpenBtn.classList.remove('active');
      helpToast.classList.add('hidden');
      if (stageZoom > 1.0) {
        stageZoom = 1.0;
        applyStageZoom();
      }
      if (autoplayInterval) stopAutoplay();
      return;
    }

    if (e.target.tagName === 'INPUT') return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        pageFlip.flipNext();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        pageFlip.flipPrev();
        break;
      case 'Home':
        e.preventDefault();
        pageFlip.flip(0);
        break;
      case 'End':
        e.preventDefault();
        pageFlip.flip(TOTAL_PAGES - 1);
        break;
      case 'f':
      case 'F':
        fullscreenBtn.click();
        break;
      case 'm':
      case 'M':
        soundToggleBtn.click();
        break;
      case 't':
      case 'T':
        tocOpenBtn.click();
        break;
      case 'z':
      case 'Z':
        zoomOpenBtn.click();
        break;
      case '?':
        helpBtn.click();
        break;
    }
  });

  [tocModal, zoomModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
});
