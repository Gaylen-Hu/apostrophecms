// 优势卡片小部件交互功能
export default () => {
  class AdvantageCardWidget {
    constructor() {
      this.init();
    }

    init() {
      this.setupIntersectionObserver();
      this.setupHoverEffects();
      this.setupAccessibility();
    }

    // 设置交叉观察器用于动画触发
    setupIntersectionObserver() {
      const widgets = document.querySelectorAll('[data-advantage-card-widget]');
      
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
      const card = widget.querySelector('.advantage-card-widget__card');
      const animation = card.dataset.animation;
      
      if (animation && animation !== 'none') {
        // 添加动画类
        widget.classList.add(`advantage-card-widget--${animation}`);
        
        // 延迟触发动画
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'none';
        }, 100);
      }
    }

    // 设置悬停效果
    setupHoverEffects() {
      const widgets = document.querySelectorAll('[data-advantage-card-widget][data-hover-effect]');
      
      widgets.forEach(widget => {
        const card = widget.querySelector('.advantage-card-widget__card');
        const icon = widget.querySelector('.advantage-card-widget__icon');
        
        if (!card || !icon) return;

        // 鼠标进入效果
        card.addEventListener('mouseenter', () => {
          this.addHoverEffect(card, icon);
        });
        
        // 鼠标离开效果
        card.addEventListener('mouseleave', () => {
          this.removeHoverEffect(card, icon);
        });
      });
    }

    // 添加悬停效果
    addHoverEffect(card, icon) {
      card.style.transform = 'translateY(-4px)';
      icon.style.transform = 'scale(1.1)';
      icon.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
    }

    // 移除悬停效果
    removeHoverEffect(card, icon) {
      card.style.transform = 'translateY(0)';
      icon.style.transform = 'scale(1)';
      icon.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
    }

    // 设置无障碍功能
    setupAccessibility() {
      const widgets = document.querySelectorAll('[data-advantage-card-widget]');
      
      widgets.forEach(widget => {
        const card = widget.querySelector('.advantage-card-widget__card');
        
        if (!card) return;

        // 为卡片添加适当的ARIA属性
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
        
        // 为标题添加ID以便描述
        const title = widget.querySelector('.advantage-card-widget__title');
        const description = widget.querySelector('.advantage-card-widget__description');
        
        if (title && description) {
          const titleId = `advantage-title-${Math.random().toString(36).substr(2, 9)}`;
          const descId = `advantage-desc-${Math.random().toString(36).substr(2, 9)}`;
          
          title.id = titleId;
          description.id = descId;
          
          card.setAttribute('aria-labelledby', titleId);
          card.setAttribute('aria-describedby', descId);
        }

        // 键盘导航支持
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleCardClick(card);
          }
        });
      });
    }

    // 处理卡片点击
    handleCardClick(card) {
      // 可以在这里添加点击逻辑，比如显示详细信息
      console.log('优势卡片被点击:', card);
      
      // 添加点击反馈效果
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    }

    // 公共方法：刷新动画
    refresh() {
      const widgets = document.querySelectorAll('[data-advantage-card-widget]');
      widgets.forEach(widget => {
        this.triggerAnimation(widget);
      });
    }

    // 销毁方法
    destroy() {
      // 清理事件监听器
      const widgets = document.querySelectorAll('[data-advantage-card-widget]');
      widgets.forEach(widget => {
        const card = widget.querySelector('.advantage-card-widget__card');
        if (card) {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
          card.removeEventListener('keydown', () => {});
        }
      });
    }
  }

  // 初始化小部件
  document.addEventListener('DOMContentLoaded', () => {
    new AdvantageCardWidget();
  });

  // 如果页面是动态加载的，重新初始化
  if (window.apos && window.apos.bus && window.apos.bus.$on) {
    window.apos.bus.$on('refreshed', () => {
      setTimeout(() => {
        new AdvantageCardWidget();
      }, 100);
    });
    
    window.apos.bus.$on('modal-resolved', () => {
      setTimeout(() => {
        new AdvantageCardWidget();
      }, 100);
    });
  }
};
