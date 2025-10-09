import './index.scss';

/**
 * Timeline Widget Player
 * 处理时间线小部件的滚动动画和交互效果
 */
export default () => {
  apos.util.widgetPlayers.timeline = {
    selector: '[data-timeline-widget]',
    player: function (element) {
      try {
        // 检查是否启用动画
        const animationEnabled = element.dataset.animationEnabled === 'true';
        
        if (animationEnabled && 'IntersectionObserver' in window) {
          setupScrollObserver(element);
        } else if (animationEnabled) {
          // 降级处理：如果浏览器不支持IntersectionObserver，直接显示所有项目
          fallbackAnimation(element);
        }

        // 添加节点hover效果增强
        setupNodeInteractions(element);
      } catch (error) {
        console.error('Timeline widget player error:', error);
        // 确保即使出错，内容也能正常显示
        fallbackAnimation(element);
      }
    }
  };

  /**
   * 设置滚动观察器，实现滚动动画效果
   */
  function setupScrollObserver(element) {
    // 创建 Intersection Observer 来检测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 添加延迟以创建级联效果
          setTimeout(() => {
            entry.target.classList.add('timeline-widget__item--visible');
          }, index * 100);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    // 观察所有时间线项目
    const items = element.querySelectorAll('.timeline-widget__item--animate');
    items.forEach(item => {
      observer.observe(item);
    });
  }

  /**
   * 降级动画：直接显示所有项目（用于不支持IntersectionObserver的浏览器）
   */
  function fallbackAnimation(element) {
    const items = element.querySelectorAll('.timeline-widget__item--animate');
    items.forEach(item => {
      item.classList.add('timeline-widget__item--visible');
    });
  }

  /**
   * 设置节点交互效果
   */
  function setupNodeInteractions(element) {
    const nodes = element.querySelectorAll('.timeline-widget__node-circle');
    
    nodes.forEach(node => {
      // 添加点击事件，可以展开/收起描述（未来功能）
      node.addEventListener('click', function() {
        const item = this.closest('.timeline-widget__item');
        const description = item.querySelector('.timeline-widget__description');
        
        if (description) {
          // 可以添加展开/收起动画
          item.classList.toggle('timeline-widget__item--expanded');
        }
      });

      // 添加键盘可访问性
      node.setAttribute('tabindex', '0');
      node.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }
};
