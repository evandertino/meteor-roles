RolesApp = {
	settings: {
		logo: 'http://lorempixel.com/output/animals-q-c-640-480-1.jpg',
		wrapLinks: true,
		homeRoute: '/home',
		dashboardRoute: '/',
		emailToLower: true,
		usernameToLower: false
	},
	isStringEmail: function(email) {
		var emailPattern;
		emailPattern = /^([\w.-]+)@([\w.-]+)\.([a-zA-Z.]{2,6})$/i;
		if (email.match(emailPattern))
			return true;
		else
			return false;
	},
	config: function(appConfig) {
		this.settings = _.extend(this.settings, appConfig);
		T9n.defaultLanguage = "en";
		if (appConfig.language)
			T9n.language = appConfig.language;
	},
	requireLogin: function(pause) {
		if (! Meteor.user()) {
			if (Meteor.loggingIn())
				Router.render(Router.options.loadingTemplate);
			else
				Router.render('accessDenied');
			pause();
		}
	},
	signInRequired: function(router, pause, extraCondition) {
		if (extraCondition == null)
			extraCondition = true;

		if (!Meteor.loggingIn()) {
			if (!(Meteor.user() && extraCondition)) {
				Session.set('fromWhere', router.path);
				Router.go('/register');
				Session.set('rolesError', t9n('error.signInRequired'));
				return pause.call();
			}
		}
		else
			Router.render(Router.options.loadingTemplate);
	},
	trimTranslation: function(val) {
		return val.replace(/<|>/gi, "");
	}
};

this.RolesApp = RolesApp;

this.T9NHelper = (function() {
	function T9NHelper() {}

	T9NHelper.translate = function(code) {
		return T9n.get(code, "error.accounts");
	}

	T9NHelper.accountsError = function(err) {
		return Session.set('rolesError', RolesApp.trimTranslation(this.translate(err.reason)));
	}

	return T9NHelper;

})();