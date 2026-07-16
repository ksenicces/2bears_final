(function(){
  var revealEls = document.querySelectorAll(
    '.why-card, .feature-card, .service-item, .process-card, .bonus-card, .faq-item, .not-found, .dark-cta'
  );

  function showAll(){
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  if('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function(el){ observer.observe(el); });
  } else {
    showAll();
  }

  var header = document.querySelector('header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 12){
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // === ЛОГИКА МОДАЛЬНОГО ОКНА ===
  var modal = document.getElementById('modalForm');
  var closeBtn = modal.querySelector('.modal-close');
  
  var triggerButtons = document.querySelectorAll('a[href="#contact"]');

  triggerButtons.forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault(); // отменяем скролл к футеру
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; // блокируем скролл страницы под попапом
    });
  });

  function closeModal(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){
    if(e.target === modal){
      closeModal();
    }
  });
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.classList.contains('open')){
      closeModal();
    }
  });
})();