// 导航交互功能
// =====================

class NavigationManager {
  constructor() {
    this.mobileMenuToggle = null;
    this.mobileMenu = null;
    this.isMenuOpen = false;
    
    this.init();
  }
  
  init() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
    } else {
      this.setupEventListeners();
    }
  }
  
  setupEventListeners() {
    // 查找移动端菜单元素
    this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');
    
    if (this.mobileMenuToggle && this.mobileMenu) {
      // 移动端菜单切换
      this.mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
      
      // 点击外部关闭菜单
      document.addEventListener('click', (e) => {
        if (this.isMenuOpen && !this.mobileMenu.contains(e.target) && !this.mobileMenuToggle.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
      
      // ESC键关闭菜单
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isMenuOpen) {
          this.closeMobileMenu();
        }
      });
      
      // 窗口大小改变时处理菜单状态
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && this.isMenuOpen) {
          this.closeMobileMenu();
        }
      });
    }
    
    // 子菜单交互
    this.setupSubmenuInteractions();
    
    // 用户下拉菜单交互
    this.setupUserMenuInteractions();
    
    // 搜索功能
    this.setupSearchInteractions();
  }
  
  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  openMobileMenu() {
    this.isMenuOpen = true;
    this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    this.mobileMenu.classList.add('active');
    this.mobileMenu.setAttribute('aria-hidden', 'false');
    
    // 防止背景滚动
    document.body.style.overflow = 'hidden';
    
    // 焦点管理
    const firstLink = this.mobileMenu.querySelector('.mobile-nav-link');
    if (firstLink) {
      firstLink.focus();
    }
  }
  
  closeMobileMenu() {
    this.isMenuOpen = false;
    this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    this.mobileMenu.classList.remove('active');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    
    // 恢复背景滚动
    document.body.style.overflow = '';
    
    // 焦点回到切换按钮
    this.mobileMenuToggle.focus();
  }
  
  setupSubmenuInteractions() {
    // 桌面端子菜单悬停效果
    const navItems = document.querySelectorAll('.nav-item.has-submenu');
    
    navItems.forEach(item => {
      const submenu = item.querySelector('.submenu');
      if (submenu) {
        // 鼠标进入
        item.addEventListener('mouseenter', () => {
          submenu.style.opacity = '1';
          submenu.style.visibility = 'visible';
          submenu.style.transform = 'translateY(0)';
        });
        
        // 鼠标离开
        item.addEventListener('mouseleave', () => {
          submenu.style.opacity = '0';
          submenu.style.visibility = 'hidden';
          submenu.style.transform = 'translateY(-0.5rem)';
        });
      }
    });
  }
  
  setupUserMenuInteractions() {
    const userMenu = document.querySelector('.user-menu');
    const userBtn = userMenu?.querySelector('.user-btn');
    const userDropdown = userMenu?.querySelector('.user-dropdown');
    
    if (userBtn && userDropdown) {
      let isUserMenuOpen = false;
      
      userBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isUserMenuOpen) {
          this.closeUserMenu();
        } else {
          this.openUserMenu();
        }
        isUserMenuOpen = !isUserMenuOpen;
      });
      
      // 点击外部关闭用户菜单
      document.addEventListener('click', (e) => {
        if (isUserMenuOpen && !userMenu.contains(e.target)) {
          this.closeUserMenu();
          isUserMenuOpen = false;
        }
      });
      
      this.openUserMenu = () => {
        userDropdown.style.opacity = '1';
        userDropdown.style.visibility = 'visible';
        userDropdown.style.transform = 'translateY(0)';
      };
      
      this.closeUserMenu = () => {
        userDropdown.style.opacity = '0';
        userDropdown.style.visibility = 'hidden';
        userDropdown.style.transform = 'translateY(-0.5rem)';
      };
    }
  }
  
  setupSearchInteractions() {
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // 这里可以添加搜索功能
        console.log('Search clicked');
        // 可以打开搜索模态框或跳转到搜索页面
      });
    }
  }
  
  // 工具方法：平滑滚动到锚点
  smoothScrollToAnchor(anchorId) {
    const target = document.querySelector(anchorId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  // 工具方法：高亮当前页面导航项
  highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .page-tree-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath !== '/' && currentPath.startsWith(href))) {
        link.classList.add('active');
      }
    });
  }
  
  // 工具方法：添加滚动效果
  addScrollEffect() {
    const nav = document.querySelector('.main-navigation');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateNav = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      // 向下滚动时隐藏导航，向上滚动时显示
      if (scrollY > lastScrollY && scrollY > 200) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }
      
      lastScrollY = scrollY;
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick);
  }
}

// 初始化导航管理器
const navigationManager = new NavigationManager();

// 页面加载完成后执行额外功能
document.addEventListener('DOMContentLoaded', () => {
  // 高亮当前页面
  navigationManager.highlightCurrentPage();
  
  // 添加滚动效果
  navigationManager.addScrollEffect();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationManager;
}
