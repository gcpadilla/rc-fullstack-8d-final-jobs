export default {
    isAuthenticated: () => {
      return localStorage.getItem('token') ? true : false;
    },
    login: token => {
      localStorage.setItem('token', token);

    },
    logout: () => {
      localStorage.removeItem('token');
      
    }
  }
  