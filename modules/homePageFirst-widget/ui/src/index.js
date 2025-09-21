// 首页首屏小部件交互功能
export default () => {
  class HomepageFirstWidget {
    constructor() {
      this.init();
    }

    init() {
      this.setupScrollIndicator();
      this.setupParallaxEffect();
      this.setupIntersectionObserver();
      this.setupKeyboardNavigation();
    }

    // 设置滚动指示器点击事件
    setupScrollIndicator() {
      const scrollIndicators = document.querySelectorAll('[data-homepage-first-widget] .animate-bounce');
      
      scrollIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
          this.scrollToNextSection();
        });
        
        // 添加键盘支持
        indicator.setAttribute('tabindex', '0');
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('aria-label', '滚动到下一部分');
        
        indicator.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.scrollToNextSection();
          }
        });
      });
    }

    // 滚动到下一部分
    scrollToNextSection() {
      const currentWidget = document.querySelector('[data-homepage-first-widget]');
      if (!currentWidget) return;

      const nextSection = currentWidget.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // 如果没有下一部分，滚动到页面底部
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }

    // 设置视差效果
    setupParallaxEffect() {
      const widgets = document.querySelectorAll('[data-homepage-first-widget]');
      
      if (widgets.length === 0) return;

      const handleScroll = () => {
        widgets.forEach(widget => {
          const rect = widget.getBoundingClientRect();
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          
          // 只在元素可见时应用视差效果
          if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            const background = widget.querySelector('.absolute.inset-0.z-0');
            if (background) {
              background.style.transform = `translateY(${rate}px)`;
            }
          }
        });
      };

      // 使用节流优化性能
      let ticking = false;
      const throttledHandleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    }

    // 设置交叉观察器用于动画触发
    setupIntersectionObserver() {
      const widgets = document.querySelectorAll('[data-homepage-first-widget]');
      
      if (widgets.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loading');
            
            // 触发AOS动画（如果存在）
            if (window.AOS) {
              window.AOS.refresh();
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      widgets.forEach(widget => {
        observer.observe(widget);
      });
    }

    // 设置键盘导航
    setupKeyboardNavigation() {
      const widgets = document.querySelectorAll('[data-homepage-first-widget]');
      
      widgets.forEach(widget => {
        // 为整个小部件添加键盘导航支持
        widget.setAttribute('tabindex', '0');
        widget.setAttribute('role', 'region');
        widget.setAttribute('aria-label', '首页首屏区域');
        
        widget.addEventListener('keydown', (e) => {
          // 允许用户使用Tab键导航到小部件内的元素
          if (e.key === 'Tab') {
            const focusableElements = widget.querySelectorAll(
              'a, button, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
              const firstElement = focusableElements[0];
              const lastElement = focusableElements[focusableElements.length - 1];
              
              if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        });
      });
    }

    // 销毁方法
    destroy() {
      // 清理事件监听器
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  // 初始化小部件
  document.addEventListener('DOMContentLoaded', () => {
    new HomepageFirstWidget();
  });

  // 如果页面是动态加载的，重新初始化
  if (window.apos) {
    window.apos.bus.$on('refreshed', () => {
      setTimeout(() => {
        new HomepageFirstWidget();
      }, 100);
    });
    
    window.apos.bus.$on('modal-resolved', () => {
      setTimeout(() => {
        new HomepageFirstWidget();
      }, 100);
    });
  }
};