// 首页关于我们小部件交互功能
export default () => {
  class HomepageAboutWidget {
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
      const widgets = document.querySelectorAll('[data-homepage-about-widget]');
      
      if (widgets.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loading');
            
            // 触发AOS动画（如果存在）
            if (window.AOS) {
              window.AOS.refresh();
            }
            
            // 触发统计数字动画
            this.animateStatistics(entry.target);
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

    // 统计数字动画效果
    animateStatistics(widget) {
      const statValues = widget.querySelectorAll('.stat-value');
      
      statValues.forEach(statValue => {
        const targetValue = parseInt(statValue.textContent);
        if (isNaN(targetValue)) return;
        
        let currentValue = 0;
        const increment = targetValue / 50; // 50帧动画
        const duration = 2000; // 2秒
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            statValue.textContent = targetValue;
            clearInterval(timer);
          } else {
            statValue.textContent = Math.floor(currentValue);
          }
        }, stepTime);
      });
    }

    // 设置悬停效果
    setupHoverEffects() {
      const widgets = document.querySelectorAll('[data-homepage-about-widget]');
      
      widgets.forEach(widget => {
        // 统计卡片悬停效果
        const statCards = widget.querySelectorAll('.bg-gray-50');
        statCards.forEach(card => {
          card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
          });
          
          card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
          });
        });

        // 公司图片悬停效果
        const companyImage = widget.querySelector('.rounded-xl img');
        if (companyImage) {
          const imageContainer = companyImage.parentElement;
          imageContainer.addEventListener('mouseenter', () => {
            imageContainer.style.transform = 'scale(1.02)';
            imageContainer.style.transition = 'transform 0.3s ease';
          });
          
          imageContainer.addEventListener('mouseleave', () => {
            imageContainer.style.transform = 'scale(1)';
          });
        }
      });
    }

    // 设置无障碍功能
    setupAccessibility() {
      const widgets = document.querySelectorAll('[data-homepage-about-widget]');
      
      widgets.forEach(widget => {
        // 为整个小部件添加键盘导航支持
        widget.setAttribute('tabindex', '0');
        widget.setAttribute('role', 'region');
        widget.setAttribute('aria-label', '关于我们区域');
        
        // 为统计卡片添加适当的ARIA标签
        const statCards = widget.querySelectorAll('.bg-gray-50');
        statCards.forEach((card, index) => {
          const title = card.querySelector('h4');
          const value = card.querySelector('p');
          
          if (title && value) {
            card.setAttribute('role', 'article');
            card.setAttribute('aria-labelledby', `stat-title-${index}`);
            card.setAttribute('aria-describedby', `stat-value-${index}`);
            
            title.id = `stat-title-${index}`;
            value.id = `stat-value-${index}`;
          }
        });

        // 为链接添加键盘支持
        const links = widget.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              link.click();
            }
          });
        });
      });
    }

    // 销毁方法
    destroy() {
      // 清理事件监听器
      const widgets = document.querySelectorAll('[data-homepage-about-widget]');
      widgets.forEach(widget => {
        const statCards = widget.querySelectorAll('.bg-gray-50');
        statCards.forEach(card => {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
        });

        const companyImage = widget.querySelector('.rounded-xl img');
        if (companyImage) {
          const imageContainer = companyImage.parentElement;
          imageContainer.removeEventListener('mouseenter', () => {});
          imageContainer.removeEventListener('mouseleave', () => {});
        }
      });
    }
  }

  // 初始化小部件
  document.addEventListener('DOMContentLoaded', () => {
    new HomepageAboutWidget();
  });

  // 如果页面是动态加载的，重新初始化
  if (window.apos) {
    window.apos.bus.$on('refreshed', () => {
      setTimeout(() => {
        new HomepageAboutWidget();
      }, 100);
    });
    
    window.apos.bus.$on('modal-resolved', () => {
      setTimeout(() => {
        new HomepageAboutWidget();
      }, 100);
    });
  }
};
