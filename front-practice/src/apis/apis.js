/**
 * API 연동 모듈
 * 외부 API와의 통신을 담당합니다.
 */
class API {
  constructor() {
    // JSONPlaceholder API (테스트용 무료 API)
    this.baseURL = 'https://jsonplaceholder.typicode.com';
    
    // 로딩 상태 관리
    this.isLoading = false;
  }
  
  // 로딩 표시/숨김
  showLoading() {
    this.isLoading = true;
    $('#loading').removeClass('hidden');
  }
  
  hideLoading() {
    this.isLoading = false;
    $('#loading').addClass('hidden');
  }
  
  // HTTP GET 요청
  async get(endpoint) {
    try {
      this.showLoading();
      
      const response = await fetch(`${this.baseURL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
      
    } catch (error) {
      console.error('API GET 요청 실패:', error);
      return { success: false, error: error.message };
    } finally {
      this.hideLoading();
    }
  }
  
  // HTTP POST 요청
  async post(endpoint, data) {
    try {
      this.showLoading();
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return { success: true, data: result };
      
    } catch (error) {
      console.error('API POST 요청 실패:', error);
      return { success: false, error: error.message };
    } finally {
      this.hideLoading();
    }
  }
  
  // 사용자 목록 가져오기
  async getUsers() {
    return await this.get('/users');
  }
  
  // 특정 사용자 정보 가져오기
  async getUser(id) {
    return await this.get(`/users/${id}`);
  }
  
  // 사용자 생성
  async createUser(userData) {
    return await this.post('/users', userData);
  }
  
  // 포스트 목록 가져오기
  async getPosts() {
    return await this.get('/posts');
  }
  
  // 특정 포스트 가져오기
  async getPost(id) {
    return await this.get(`/posts/${id}`);
  }
  
  // 포스트 생성
  async createPost(postData) {
    return await this.post('/posts', postData);
  }
  
  // 댓글 목록 가져오기
  async getComments(postId) {
    return await this.get(`/posts/${postId}/comments`);
  }
  
  // 댓글 생성
  async createComment(commentData) {
    return await this.post('/comments', commentData);
  }
}

// 전역 API 인스턴스
window.api = new API();
