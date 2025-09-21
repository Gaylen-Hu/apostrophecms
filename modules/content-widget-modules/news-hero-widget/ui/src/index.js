// 新闻首屏小部件交互功能
export default () => {
  class NewsHeroWidget {
    constructor() {
      this.init();
    }

    init() {
      this.setupIntersectionObserver();
      this.setupParallaxEffect();
      this.setupAccessibility();
    }

    // 设置交叉观察器用于动画触发
    setupIntersectionObserver() {
      const widgets = document.querySelectorAll('[data-news-hero-widget]');
      
      if (widgets.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerAnimation(entry.target);
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

    // 触发动画效果
    triggerAnimation(widget) {
      const animation = widget.classList.contains('news-hero-widget--fade') ? 'fade' :
                       widget.classList.contains('news-hero-widget--slide') ? 'slide' :
                       widget.classList.contains('news-hero-widget--scale') ? 'scale' : null;
      
      if (animation && animation !== 'none') {
        // 添加动画类
        widget.classList.add(`news-hero-widget--${animation}`);
        
        // 延迟触发动画
        setTimeout(() => {
          const title = widget.querySelector('.news-hero-widget__title');
          const subtitle = widget.querySelector('.news-hero-widget__subtitle');
          
          if (title) {
            title.style.opacity = '1';
            title.style.transform = 'none';
          }
          
          if (subtitle) {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'none';
          }
        }, 100);
      }
    }

    // 设置视差效果
    setupParallaxEffect() {
      const widgets = document.querySelectorAll('[data-news-hero-widget][data-parallax]');
      
      if (widgets.length === 0) return;

      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.updateParallax();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // 更新视差效果
    updateParallax() {
      const widgets = document.querySelectorAll('[data-news-hero-widget][data-parallax]');
      
      widgets.forEach(widget => {
        const rect = widget.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 只在元素可见时应用视差效果
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          const bgImage = widget.querySelector('.news-hero-widget__bg-image');
          if (bgImage) {
            const speed = 0.5;
            const yPos = -(rect.top * speed);
            bgImage.style.transform = `translateY(${yPos}px)`;
          }
        }
      });
    }

    // 设置无障碍功能
    setupAccessibility() {
      const widgets = document.querySelectorAll('[data-news-hero-widget]');
      
      widgets.forEach(widget => {
        const title = widget.querySelector('.news-hero-widget__title');
        const subtitle = widget.querySelector('.news-hero-widget__subtitle');
        
        if (title) {
          // 为标题添加适当的语义
          title.setAttribute('role', 'heading');
          title.setAttribute('aria-level', '1');
        }
        
        if (subtitle) {
          // 为副标题添加描述性角色
          subtitle.setAttribute('role', 'text');
          subtitle.setAttribute('aria-label', '页面描述');
        }

        // 为整个小部件添加区域角色
        widget.setAttribute('role', 'banner');
        widget.setAttribute('aria-label', '页面首屏区域');
      });
    }

    // 公共方法：刷新动画
    refresh() {
      const widgets = document.querySelectorAll('[data-news-hero-widget]');
      widgets.forEach(widget => {
        this.triggerAnimation(widget);
      });
    }

    // 公共方法：更新视差效果
    updateParallaxPositions() {
      this.updateParallax();
    }

    // 销毁方法
    destroy() {
      // 清理事件监听器
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  // 初始化小部件
  document.addEventListener('DOMContentLoaded', () => {
    new NewsHeroWidget();
  });

  // 如果页面是动态加载的，重新初始化
  if (window.apos) {
    window.apos.bus.$on('refreshed', () => {
      setTimeout(() => {
        new NewsHeroWidget();
      }, 100);
    });
    
    window.apos.bus.$on('modal-resolved', () => {
      setTimeout(() => {
        new NewsHeroWidget();
      }, 100);
    });
  }
};
