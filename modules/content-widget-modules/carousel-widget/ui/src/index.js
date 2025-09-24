// 轮播图小部件JavaScript逻辑
console.log('轮播图小部件JavaScript已加载2');

export default () => {
  console.log('轮播图小部件JavaScript已加载1 - export default函数执行');
  
  // 注册小部件播放器
  apos.util.widgetPlayers.carousel = {
    selector: '[data-carousel-widget]',
    player: function (element) {
      console.log('轮播图小部件player函数被调用', element);
      
      // 简单的测试功能
      const prevBtn = element.querySelector('[data-carousel-prev]');
      const nextBtn = element.querySelector('[data-carousel-next]');
      
      console.log('找到的按钮:', { prevBtn, nextBtn });
      
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          console.log('上一张按钮被点击');
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          console.log('下一张按钮被点击');
        });
      }
    }
  };
};