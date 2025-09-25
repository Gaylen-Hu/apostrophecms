// 资质认证卡片小部件前端逻辑
export default {
  init() {
    // 初始化小部件
    this.initCertificationCard();
  },

  initCertificationCard() {
    // 添加图片加载动画
    const images = document.querySelectorAll('.certification-card-widget__image-container img');
    
    images.forEach(img => {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      
      // 设置初始透明度
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in-out';
    });

    // 添加卡片悬停效果
    const cards = document.querySelectorAll('.certification-card-widget__container');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }
};
