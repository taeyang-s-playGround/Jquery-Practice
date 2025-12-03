/* global $ */

// jQuery SPA 애플리케이션 시작
$(function () {
  // 기존 React 앱 제거
  const $root = $('#root');
  if ($root.length === 0) return;

  // jQuery SPA HTML 구조 삽입
  $root.html(`
    <!-- 네비게이션 -->
    <nav id="navbar">
      <div class="nav-container">
        <h1 class="logo">jQuery SPA</h1>
        <ul class="nav-menu">
          <li><a href="#/" class="nav-link" data-page="home">홈</a></li>
          <li><a href="#/about" class="nav-link" data-page="about">소개</a></li>
          <li><a href="#/users" class="nav-link" data-page="users">사용자</a></li>
          <li><a href="#/contact" class="nav-link" data-page="contact">연락처</a></li>
        </ul>
      </div>
    </nav>

    <!-- 메인 컨텐츠 영역 -->
    <main id="main-content">
      <div id="page-container">
        <!-- 페이지 내용이 여기에 동적으로 로드됩니다 -->
      </div>
    </main>

    <!-- 로딩 스피너 -->
    <div id="loading" class="loading hidden">
      <div class="spinner"></div>
    </div>
  `);

  // jQuery SPA 모듈들을 동적으로 로드
  this.loadScript('./js/router.js', () => {
    this.loadScript('./js/apis.js', () => {
      this.loadScript('./js/pages.js', () => {
        this.loadScript('./js/app.js', () => {
          console.log('jQuery SPA 모듈들이 성공적으로 로드되었습니다! 🎉');
        });
      });
    });
  });
});

// 스크립트 동적 로드 함수
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  script.onerror = (error) => {
    console.error(`스크립트 로드 실패: ${src}`, error);
  };
  document.head.appendChild(script);
}