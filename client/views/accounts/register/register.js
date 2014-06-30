Template.accountRegister.helpers = {
	logo: function() {
		return MealsToGo.settings.logo;
	},
	emailAddress: function() {
		return Session.get('email');
	}
};

Template.accountRegister.events({
	'submit #register': function (ev, el) {
		var username, email, password, passwordErrors;

		trimInput = function(val) {
			return val.replace(/^\s*|\s*$/g, "");
		};

		ev.preventDefault();

		username = el.find('input[name=username]') ? trimInput(el.find('input[name=username]').value.toLowerCase()) : void 0;
		email = el.find('input[name=email]') ? trimInput(el.find('input[name=email]').value.toLowerCase()) : void 0;
		password = el.find('input[name=password]') ? el.find('input[name=password]').value.toLowerCase() : void 0;

		passwordErrors = (function(password) {
			var errMsg, msg;
			errMsg = [];
			msg = false;
			if (password.length < 7) {
				errMsg.push(t9n("error.minChar"));
			}
			if (password.search(/[a-z]/i) < 0) {
				errMsg.push(t9n("error.pwOneLetter"));
			}
			if (password.search(/[0-9]/) < 0) {
				errMsg.push(t9n("error.pwOneDigit"));
			}
			if (errMsg.length > 0) {
				msg = "";
				errMsg.forEach(function(e) {
					return msg = msg.concat("" + e + "\r\n");
				});
				Session.set('rolesError', msg);
				return true;
			}
			return false;
		})(password);
		if (passwordErrors)
			return;

		if (username.length === 0) {
			Session.set('rolesError', t9n("error.usernameRequired"));
			return;
		}
		if (username && MealsToGo.isStringEmail(username)) {
			Session.set('rolesError', t9n("error.usernameIsEmail"));
			return;
		}

		if (email.length === 0) {
			Session.set('rolesError', t9n("error.emailRequired"));
			return;
		}

		var newUserData = {
			username: username,
			email: email,
			password: password,
			roles: ['customer']
		};

		Meteor.call('rolesCreateUser', newUserData, function (error, result) {

			var userCredential;

			if (error) {
				T9NHelper.accountsError(error);
				return;
			}

			if(username)
				userCredential = username;

			if(email)
				userCredential = email;

			console.log(result);

			return Meteor.loginWithPassword(userCredential, password, function(error) {
				if (error) {
					console.log(err);
					return T9NHelper.accountsError(error);
				} else if (Session.get('fromWhere')) {
					Router.go(Session.get('fromWhere'));
					return Session.set('fromWhere', void 0);
				} else {
					return Router.go(MealsToGo.settings.dashboardRoute);
				}
			});
		});
	}
});