var Igert = {};
Igert.signup = function() {
	// private members
	
	return {
		init: function(cfg) {
			var cfg = cfg || {};
			this.configureButtons();
		},
		
		finishRegister: function() {
			var first = $("#first"),
				password = $("#password"),
				email = $("#email");
		
			alert("REGISTER complete!")
			alert("The First name is: " + first.val())
			alert("Password is: " + password.val())
			alert("Email is: " + email.val())
		},
		
		configureButtons: function() {
			var _this = this;
			$("#register").on("click", function() {
				_this.finishRegister();
			});
		},
		
	}
		
}();

$( document ).ready(function() {
    Igert.signup.init();
});
