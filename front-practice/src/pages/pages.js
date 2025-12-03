/**
 * 페이지 정의 모듈
 * 각 라우트에 해당하는 페이지 내용과 기능을 정의합니다.
 */
class Pages {
  constructor() {
    this.init();
  }
  
  init() {
    // 라우트 등록
    router.addRoute('/', () => this.showHome());
    router.addRoute('/about', () => this.showAbout());
    router.addRoute('/users', () => this.showUsers());
    router.addRoute('/contact', () => this.showContact());
  }
  
  // 홈 페이지
  showHome() {
    const html = `
      <div class="page fade-in">
        <div class="hero-section">
          <h1>jQuery SPA에 오신 것을 환영합니다!</h1>
          <p>모던한 웹 개발을 위한 간단하고 강력한 Single Page Application입니다.</p>
        </div>
        
        <div class="feature-grid">
          <div class="feature-card">
            <h3>🚀 빠른 성능</h3>
            <p>jQuery의 가벼운 특성을 활용한 빠른 페이지 전환과 반응성</p>
          </div>
          <div class="feature-card">
            <h3>🔧 간단한 구조</h3>
            <p>명확한 폴더 구조와 모듈화된 코드로 유지보수 용이</p>
          </div>
          <div class="feature-card">
            <h3>📱 반응형 디자인</h3>
            <p>모든 디바이스에서 완벽하게 작동하는 반응형 UI</p>
          </div>
          <div class="feature-card">
            <h3>🌐 API 연동</h3>
            <p>실제 API와의 연동을 통한 데이터 처리 및 표시</p>
          </div>
        </div>
        
        <div class="text-center mt-30">
          <h2>시작하기</h2>
          <p>위의 네비게이션을 클릭하여 다양한 페이지를 탐험해보세요!</p>
        </div>
      </div>
    `;
    
    $('#page-container').html(html);
  }
  
  // 소개 페이지
  showAbout() {
    const html = `
      <div class="page fade-in">
        <h1>프로젝트 소개</h1>
        
        <h2>프로젝트 목표</h2>
        <p>이 프로젝트는 jQuery를 사용하여 현대적인 Single Page Application을 구축하는 방법을 보여줍니다.</p>
        
        <h2>사용된 기술</h2>
        <ul style="margin-left: 20px; line-height: 2;">
          <li><strong>jQuery 3.7.1</strong> - DOM 조작 및 이벤트 처리</li>
          <li><strong>HTML5</strong> - 시맨틱 마크업</li>
          <li><strong>CSS3</strong> - 모던한 스타일링 및 애니메이션</li>
          <li><strong>Fetch API</strong> - 비동기 HTTP 요청</li>
          <li><strong>ES6+</strong> - 최신 JavaScript 문법</li>
        </ul>
        
        <h2>주요 기능</h2>
        <ul style="margin-left: 20px; line-height: 2;">
          <li>클라이언트 사이드 라우팅</li>
          <li>동적 페이지 로딩</li>
          <li>API 연동 및 데이터 표시</li>
          <li>반응형 네비게이션</li>
          <li>로딩 상태 표시</li>
        </ul>
        
        <h2>폴더 구조</h2>
        <pre style="background: #f1f5f9; padding: 20px; border-radius: 10px; overflow-x: auto;">
front-practice/
├── public/
│   ├── js/
│   │   ├── router.js      # 라우팅 로직
│   │   ├── pages.js       # 페이지 정의
│   │   ├── apis.js        # API 연동
│   │   └── app.js         # 메인 애플리케이션
│   ├── style.css          # 스타일시트
│   └── index.html         # 메인 HTML
└── src/                   # React 소스 (사용하지 않음)
        </pre>
      </div>
    `;
    
    $('#page-container').html(html);
  }
  
  // 사용자 페이지
  async showUsers() {
    const html = `
      <div class="page fade-in">
        <h1>사용자 목록</h1>
        <p>JSONPlaceholder API에서 가져온 사용자 정보를 표시합니다.</p>
        
        <div class="text-center mb-20">
          <button id="refresh-users" class="btn">새로고침</button>
        </div>
        
        <div id="users-container">
          <div class="text-center">
            <p>사용자 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    `;
    
    $('#page-container').html(html);
    
    // 사용자 데이터 로드
    await this.loadUsers();
    
    // 새로고침 버튼 이벤트
    $('#refresh-users').on('click', () => this.loadUsers());
  }
  
  // 사용자 데이터 로드
  async loadUsers() {
    try {
      const result = await api.getUsers();
      
      if (result.success) {
        const users = result.data;
        this.displayUsers(users);
      } else {
        this.showError('사용자 정보를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      this.showError('사용자 정보를 불러오는데 실패했습니다.');
    }
  }
  
  // 사용자 목록 표시
  displayUsers(users) {
    const usersHtml = users.map(user => `
      <div class="user-card">
        <h3>${user.name}</h3>
        <p><strong>사용자명:</strong> ${user.username}</p>
        <p><strong>이메일:</strong> ${user.email}</p>
        <p><strong>전화번호:</strong> ${user.phone}</p>
        <p><strong>웹사이트:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        <p><strong>회사:</strong> ${user.company.name}</p>
      </div>
    `).join('');
    
    $('#users-container').html(`
      <div class="user-list">
        ${usersHtml}
      </div>
    `);
  }
  
  // 연락처 페이지
  showContact() {
    const html = `
      <div class="page fade-in">
        <h1>연락처</h1>
        <p>문의사항이나 피드백이 있으시면 아래 폼을 통해 연락해주세요.</p>
        
        <form id="contact-form" style="max-width: 600px; margin: 0 auto;">
          <div class="form-group">
            <label for="name">이름 *</label>
            <input type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="email">이메일 *</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="subject">제목 *</label>
            <input type="text" id="subject" name="subject" required>
          </div>
          
          <div class="form-group">
            <label for="message">메시지 *</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          
          <div class="text-center">
            <button type="submit" class="btn">메시지 보내기</button>
          </div>
        </form>
        
        <div id="form-result" class="mt-30"></div>
      </div>
    `;
    
    $('#page-container').html(html);
    
    // 폼 제출 이벤트
    $('#contact-form').on('submit', (e) => this.handleContactSubmit(e));
  }
  
  // 연락처 폼 제출 처리
  async handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      subject: $('#subject').val(),
      message: $('#message').val()
    };
    
    // 폼 데이터 검증
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      this.showFormResult('모든 필드를 입력해주세요.', 'error');
      return;
    }
    
    try {
      // 실제로는 서버로 데이터를 전송하지만, 여기서는 시뮬레이션
      const result = await api.createPost({
        title: formData.subject,
        body: `이름: ${formData.name}\n이메일: ${formData.email}\n\n메시지:\n${formData.message}`,
        userId: 1
      });
      
      if (result.success) {
        this.showFormResult('메시지가 성공적으로 전송되었습니다!', 'success');
        $('#contact-form')[0].reset();
      } else {
        this.showFormResult('메시지 전송에 실패했습니다. 다시 시도해주세요.', 'error');
      }
    } catch (error) {
      this.showFormResult('메시지 전송에 실패했습니다. 다시 시도해주세요.', 'error');
    }
  }
  
  // 폼 결과 표시
  showFormResult(message, type) {
    const alertClass = type === 'success' ? 'success' : 'error';
    const alertStyle = type === 'success' 
      ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
      : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;';
    
    $('#form-result').html(`
      <div style="padding: 15px; border-radius: 10px; ${alertStyle}">
        ${message}
      </div>
    `);
    
    // 3초 후 자동으로 숨김
    setTimeout(() => {
      $('#form-result').fadeOut();
    }, 3000);
  }
  
  // 에러 메시지 표시
  showError(message) {
    $('#users-container').html(`
      <div class="text-center">
        <p style="color: #e53e3e; font-weight: 600;">${message}</p>
        <button onclick="location.reload()" class="btn">다시 시도</button>
      </div>
    `);
  }
}

// 페이지 인스턴스 생성
window.pages = new Pages();
