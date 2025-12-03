/**
 * 메인 애플리케이션 모듈
 * 애플리케이션 초기화 및 전역 이벤트 처리를 담당합니다.
 */
class App {
  constructor() {
    this.init();
  }
  
  init() {
    // DOM이 로드된 후 실행
    $(document).ready(() => {
      this.setupEventListeners();
      this.initializeApp();
      console.log('jQuery SPA 애플리케이션이 성공적으로 시작되었습니다! 🎉');
    });
  }
  
  // 이벤트 리스너 설정
  setupEventListeners() {
    // 네비게이션 링크 클릭 이벤트
    $(document).on('click', '.nav-link', (e) => {
      e.preventDefault();
      const href = $(e.currentTarget).attr('href');
      const path = href.replace('#', '');
      
      // 라우터를 통해 페이지 이동
      router.navigate(path);
    });
    
    // 모바일 메뉴 토글 (반응형)
    this.setupMobileMenu();
    
    // 스크롤 이벤트 (네비게이션 스타일 변경)
    this.setupScrollEffects();
    
    // 키보드 단축키
    this.setupKeyboardShortcuts();
  }
  
  // 모바일 메뉴 설정
  setupMobileMenu() {
    // 작은 화면에서 네비게이션 메뉴 토글
    if ($(window).width() <= 768) {
      $('.nav-menu').addClass('mobile-menu');
      
      // 햄버거 메뉴 버튼 추가 (필요시)
      // $('.nav-container').prepend('<button class="mobile-menu-toggle">☰</button>');
    }
  }
  
  // 스크롤 효과 설정
  setupScrollEffects() {
    $(window).on('scroll', () => {
      const scrollTop = $(window).scrollTop();
      
      if (scrollTop > 100) {
        $('#navbar').addClass('scrolled');
      } else {
        $('#navbar').removeClass('scrolled');
      }
    });
  }
  
  // 키보드 단축키 설정
  setupKeyboardShortcuts() {
    $(document).on('keydown', (e) => {
      // Ctrl/Cmd + 1: 홈
      if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        router.navigate('/');
      }
      // Ctrl/Cmd + 2: 소개
      if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        router.navigate('/about');
      }
      // Ctrl/Cmd + 3: 사용자
      if ((e.ctrlKey || e.metaKey) && e.key === '3') {
        e.preventDefault();
        router.navigate('/users');
      }
      // Ctrl/Cmd + 4: 연락처
      if ((e.ctrlKey || e.metaKey) && e.key === '4') {
        e.preventDefault();
        router.navigate('/contact');
      }
    });
  }
  
  // 애플리케이션 초기화
  initializeApp() {
    // 현재 활성 페이지 표시
    const currentPath = router.getCurrentPath();
    $(`.nav-link[href="${currentPath}"]`).addClass('active');
    
    // 페이지 로드 애니메이션
    this.addPageTransitions();
    
    // 성능 모니터링 (개발 모드에서만)
    if (window.location.hostname === 'localhost') {
      this.setupPerformanceMonitoring();
    }
  }
  
  // 페이지 전환 애니메이션
  addPageTransitions() {
    // 페이지 컨테이너에 페이드 인 효과 추가
    $('#page-container').on('DOMNodeInserted', function() {
      $(this).find('.page').addClass('fade-in');
    });
  }
  
  // 성능 모니터링 설정
  setupPerformanceMonitoring() {
    // 페이지 로드 시간 측정
    const loadTime = performance.now();
    
    $(window).on('load', () => {
      const totalLoadTime = performance.now() - loadTime;
      console.log(`페이지 로드 시간: ${totalLoadTime.toFixed(2)}ms`);
      
      // 성능 경고 (3초 이상 로드 시)
      if (totalLoadTime > 3000) {
        console.warn('페이지 로드 시간이 3초를 초과했습니다. 성능 최적화를 고려해보세요.');
      }
    });
  }
  
  // 유틸리티 메서드들
  static showNotification(message, type = 'info', duration = 3000) {
    const notification = $(`
      <div class="notification ${type}" style="
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #48bb78;' : ''}
        ${type === 'error' ? 'background: #f56565;' : ''}
        ${type === 'info' ? 'background: #4299e1;' : ''}
        ${type === 'warning' ? 'background: #ed8936;' : ''}
      ">
        ${message}
      </div>
    `);
    
    $('body').append(notification);
    
    // 애니메이션 표시
    setTimeout(() => {
      notification.css('transform', 'translateX(0)');
    }, 100);
    
    // 자동 제거
    setTimeout(() => {
      notification.css('transform', 'translateX(100%)');
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }
  
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// 전역 유틸리티 함수들
window.showNotification = App.showNotification;
window.debounce = App.debounce;
window.throttle = App.throttle;

// 애플리케이션 시작
window.app = new App();
