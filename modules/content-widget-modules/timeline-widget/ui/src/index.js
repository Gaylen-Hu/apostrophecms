import './index.scss';

export default () => {
  apos.util.widgetPlayers.timeline = {
    selector: '[data-timeline-widget]',
    player: function (element) {
      // 检查是否启用动画
      const animationEnabled = element.dataset.animationEnabled === 'true';
      
      if (animationEnabled) {
        setupScrollObserver(element);
      }
    }
  };

  function setupScrollObserver(element) {
    // 创建 Intersection Observer 来检测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline-widget__item--visible');
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
};
