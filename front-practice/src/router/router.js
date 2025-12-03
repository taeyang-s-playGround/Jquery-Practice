/**
 * jQuery SPA Router
 * 간단한 클라이언트 사이드 라우팅을 제공합니다.
 */
class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    
    // 브라우저 뒤로가기/앞으로가기 지원
    $(window).on('popstate', (e) => {
      this.handleRoute();
    });
    
    // 초기 라우트 처리
    this.handleRoute();
  }
  
  // 라우트 등록
  addRoute(path, callback) {
    this.routes[path] = callback;
  }
  
  // 현재 URL에서 경로 추출
  getCurrentPath() {
    const hash = window.location.hash;
    return hash === '' ? '/' : hash;
  }
  
  // 라우트 변경
  navigate(path) {
    window.location.hash = path;
    this.handleRoute();
  }
  
  // 라우트 처리
  handleRoute() {
    const path = this.getCurrentPath();
    const callback = this.routes[path];
    
    if (callback) {
      // 활성 네비게이션 링크 업데이트
      $('.nav-link').removeClass('active');
      $(`.nav-link[href="${path}"]`).addClass('active');
      
      // 페이지 로드
      callback();
      this.currentPage = path;
    } else {
      // 404 페이지
      this.show404();
    }
  }
  
  // 404 페이지 표시
  show404() {
    $('#page-container').html(`
      <div class="page fade-in">
        <h1>404 - 페이지를 찾을 수 없습니다</h1>
        <p>요청하신 페이지가 존재하지 않습니다.</p>
        <a href="#/" class="btn">홈으로 돌아가기</a>
      </div>
    `);
  }
}

// 전역 라우터 인스턴스
window.router = new Router();
