module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
function index(req, res) {
  res.cookie('IndexCookie', 'This was set from Index');
  res.render('index', { title: 'index', cookie: JSON.stringify(req.cookies) });
};
function login(req, res) {
  res.send('Login', { title: 'Login'});
};
function loginProcess(req, res) {
  res.redirect('/');
};
function chat(req, res) {
  res.send('Chat', { title: 'Chat'});
}