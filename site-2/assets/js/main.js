(function(){

  try {
    // Hero slider (swipe + arrows + dots)
    var track = document.getElementById('heroTrack');
    var slider = document.getElementById('heroSlider');
    if(track && slider){
      var slides = track.querySelectorAll('.hero-slide');
      var dots = document.querySelectorAll('#heroDots button');
      var idx = 0;
      function go(i){
        idx = (i + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + (idx * 100) + '%)';
        dots.forEach(function(d, di){ d.classList.toggle('active', di === idx); });
      }
      var prevBtn = document.getElementById('heroPrev');
      var nextBtn = document.getElementById('heroNext');
      if(prevBtn) prevBtn.addEventListener('click', function(){ go(idx - 1); });
      if(nextBtn) nextBtn.addEventListener('click', function(){ go(idx + 1); });
      dots.forEach(function(d){ d.addEventListener('click', function(){ go(parseInt(d.dataset.i, 10)); }); });

      var startX = null, startY = null, dragging = false;
      slider.addEventListener('touchstart', function(e){
        startX = e.touches[0].clientX; startY = e.touches[0].clientY; dragging = true;
      }, { passive:true });
      slider.addEventListener('touchend', function(e){
        if(!dragging) return;
        dragging = false;
        var dx = e.changedTouches[0].clientX - startX;
        var dy = e.changedTouches[0].clientY - startY;
        if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)){
          if(dx < 0) go(idx + 1); else go(idx - 1);
        }
      }, { passive:true });

      // simple autoplay, pauses on interaction
      var auto = setInterval(function(){ go(idx + 1); }, 6000);
      ['touchstart','click'].forEach(function(ev){
        slider.addEventListener(ev, function(){ clearInterval(auto); });
      });
    }
  } catch(e){}

  try {
    // Burger menu
    var burgerBtn = document.getElementById('burgerBtn');
    var menuOverlay = document.getElementById('menuOverlay');
    if(burgerBtn && menuOverlay){
      burgerBtn.addEventListener('click', function(){
        var isOpen = menuOverlay.classList.toggle('open');
        burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      menuOverlay.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click', function(){
          menuOverlay.classList.remove('open');
          burgerBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  } catch(e){}

  try {
    // Reveal on scroll (light touch)
    var revealEls = document.querySelectorAll('[data-reveal]');
    if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
      revealEls.forEach(function(el){ observer.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('in-view'); });
    }
    window.addEventListener('load', function(){
      document.querySelectorAll('[data-reveal]').forEach(function(el){ el.classList.add('in-view'); });
    });
    setTimeout(function(){
      document.querySelectorAll('[data-reveal]').forEach(function(el){ el.classList.add('in-view'); });
    }, 2000);
  } catch(e){
    document.querySelectorAll('[data-reveal]').forEach(function(el){ el.classList.add('in-view'); });
  }

  try {
    // FAQ accordion — one open at a time
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item){
      item.addEventListener('toggle', function(){
        if(item.open){
          faqItems.forEach(function(other){ if(other !== item) other.open = false; });
        }
      });
    });
  } catch(e){}

  try {
    // Shop open/closed status (visitor's local clock — approximate)
    var statusEl = document.getElementById('shopStatus');
    var statusText = document.getElementById('shopStatusText');
    if(statusEl && statusText){
      var now = new Date();
      var day = now.getDay();
      var hour = now.getHours() + now.getMinutes() / 60;
      var isOpenDay = day >= 1 && day <= 6;
      var isOpenHour = hour >= 10 && hour < 19;
      if(isOpenDay && isOpenHour){
        statusEl.classList.add('open');
        statusText.textContent = 'Зараз відчинено';
      } else {
        statusEl.classList.add('closed');
        statusText.textContent = 'Зараз зачинено';
      }
    }
  } catch(e){}

  try {
    // Newsletter form — front-end only (no backend connected yet)
    var form = document.getElementById('newsletterForm');
    var success = document.getElementById('newsletterSuccess');
    var consent = document.getElementById('newsletterConsent');
    if(form && success && consent){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        if(!consent.checked){ consent.focus(); return; }
        form.style.display = 'none';
        consent.parentElement.style.display = 'none';
        success.hidden = false;
      });
    }
  } catch(e){}

})();
