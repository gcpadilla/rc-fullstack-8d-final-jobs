export default {
    isAuthenticated: () => {
      return localStorage.getItem('token', 'username') ? true : false;
    },
    login: (token, username) => {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }
  