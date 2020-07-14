export default {
    isAuthenticated: () => {
      return localStorage.getItem('token') ? true : false;
    },
    login: (token, username, role) => {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
    },
    logout: () => {
      localStorage.clear()
    }
  }
  