var config = {
  port: 3100,
  secret: 'secret',
  redisUrl: 'redis://localhost',
  routes: {
    login: '/login',
    logout: '/logout'
  }
};

module.exports = config;