export default () => {
  apos.util.widgetPlayers['image-gallery'] = {
    selector: '[data-image-gallery]',
    player: function (el) {
      const layout = el.dataset.layout || 'grid';
      const enableLightbox = el.dataset.enableLightbox === 'true';
      
      // 初始化不同布局的交互
      if (layout === 'carousel') {
        initCarousel(el);
      }
      
      if (enableLightbox) {
        initLightbox(el);
      }
    }
  };

  // 轮播功能
  function initCarousel(el) {
    const track = el.querySelector('.image-gallery-widget__carousel-track');
    const slides = el.querySelectorAll('.image-gallery-widget__carousel-slide');
    const prevBtn = el.querySelector('[data-carousel-prev]');
    const nextBtn = el.querySelector('[data-carousel-next]');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    function updateCarousel() {
      const translateX = -currentIndex * 100;
      track.style.transform = `translateX(${translateX}%)`;
      
      // 更新按钮状态
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      }
      
      if (nextBtn) {
        nextBtn.disabled = currentIndex === totalSlides - 1;
        nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
      }
    }
    
    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
      updateCarousel();
    }
    
    function nextSlide() {
      if (currentIndex < totalSlides - 1) {
        goToSlide(currentIndex + 1);
      }
    }
    
    function prevSlide() {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    }
    
    // 绑定事件
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    // 键盘导航
    el.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
    
    // 触摸滑动支持
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });
    
    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });
    
    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      isDragging = false;
    });
    
    // 初始化
    updateCarousel();
  }

  // 灯箱功能
  function initLightbox(el) {
    const lightbox = el.querySelector('[data-lightbox-modal]');
    const triggers = el.querySelectorAll('[data-lightbox-trigger]');
    const closeBtns = el.querySelectorAll('[data-lightbox-close]');
    const lightboxImage = el.querySelector('[data-lightbox-image]');
    const lightboxCaption = el.querySelector('[data-lightbox-caption]');
    const lightboxCounter = el.querySelector('[data-lightbox-counter]');
    const prevBtn = el.querySelector('[data-lightbox-prev]');
    const nextBtn = el.querySelector('[data-lightbox-next]');
    
    if (!lightbox || !triggers.length) return;
    
    const images = Array.from(triggers).map(trigger => {
      const img = trigger.querySelector('img');
      const caption = trigger.closest('.image-gallery-widget__item')?.querySelector('.image-gallery-widget__caption-text')?.textContent || '';
      return {
        src: img.src.replace('two-thirds', 'max').replace('full', 'max'),
        alt: img.alt,
        caption: caption
      };
    });
    
    let currentIndex = 0;
    
    function openLightbox(index) {
      currentIndex = index;
      updateLightbox();
      lightbox.setAttribute('data-open', 'true');
      document.body.style.overflow = 'hidden';
      
      // 焦点管理
      lightbox.focus();
    }
    
    function closeLightbox() {
      lightbox.setAttribute('data-open', 'false');
      document.body.style.overflow = '';
      
      // 恢复焦点到触发元素
      if (triggers[currentIndex]) {
        triggers[currentIndex].focus();
      }
    }
    
    function updateLightbox() {
      const currentImage = images[currentIndex];
      
      if (lightboxImage) {
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
      }
      
      if (lightboxCaption) {
        lightboxCaption.textContent = currentImage.caption;
      }
      
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
      }
      
      // 更新导航按钮状态
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      }
      
      if (nextBtn) {
        nextBtn.disabled = currentIndex === images.length - 1;
        nextBtn.style.opacity = currentIndex === images.length - 1 ? '0.5' : '1';
      }
    }
    
    function nextImage() {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        updateLightbox();
      }
    }
    
    function prevImage() {
      if (currentIndex > 0) {
        currentIndex--;
        updateLightbox();
      }
    }
    
    // 绑定事件
    triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', () => openLightbox(index));
      
      // 键盘支持
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });
    
    closeBtns.forEach(btn => {
      btn.addEventListener('click', closeLightbox);
    });
    
    if (prevBtn) {
      prevBtn.addEventListener('click', prevImage);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', nextImage);
    }
    
    // 键盘导航
    lightbox.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    });
    
    // 点击背景关闭
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('image-gallery-widget__lightbox-backdrop')) {
        closeLightbox();
      }
    });
  }
};
