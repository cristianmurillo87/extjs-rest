Ext.define('Estratificacion.controller.user.Login', {
	extend: 'Ext.app.Controller',
	requires: [
		'Estratificacion.Global'
	],
	views: [
		'Estratificacion.view.user.Login'
	],
	init: function(application) {
		this.control({
			"button #btn-login": {
				click: this.onSubmit
			}
		});
	},
	onSubmit: function(btn, e, eOpts) {
		console.log("Iniciando Sesion");
	}
});