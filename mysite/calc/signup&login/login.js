var Igert = {};
Igert.login = function() {
	// private members
	
	return {
		init: function(cfg) {
			var cfg = cfg || {};
			this.configureButtons();
		},
		
		initLogin: function() {
			var username = $("#username"),
				password = $("#password");
				
			alert("The username is: " + username.val())
			alert("Password is: " + password.val())
		},

		configureButtons: function() {
			var _this = this;
			$("#login").on("click", function() {
				_this.initLogin();
				
			});
		},
		
	}
		
}();

$( document ).ready(function() {
    Igert.login.init();
});