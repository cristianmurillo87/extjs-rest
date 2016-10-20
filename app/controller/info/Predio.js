Ext.define('Estratificacion.controller.info.Predio', {
	extend: 'Ext.app.Controller',
	requires: ['Estratificacion.view.window.Predio'],

	init: function(application) {
		this.control({
			"#op-consultapredio": {
				click: this.abreInfoPredio
			}
		});
	},
	abreInfoPredio: function(btn, e, eOpts) {

		var a = Ext.ComponentQuery.query('#win-infopredio')[0];

		if (!a) {
			a = Ext.create('Estratificacion.view.window.Predio');
			a.show();
		} else if (!a.isVisible()) {
			a.show();
		}

		return a;
	}

});