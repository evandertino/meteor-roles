Router.configure({
	layoutTemplate: 'navigation',
	notFoundTemplate: '',
	loadingTemplate: 'loading'
});

Router.map(function () {
  this.route('home', {
      path: '/',
      controller: HomeController
  });

  this.route('register', {
  	path: '/register',
  	controller: RegisterController
  });

  this.route('login', {
  	path: '/login',
  	controller: LoginController
  });
});

Router.onBeforeAction('loading');