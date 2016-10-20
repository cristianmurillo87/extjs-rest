Ext.define('Estratificacion.controller.lista.Terreno', {
	extend: 'Ext.app.Controller',
	models: ['Estratificacion.model.Terreno'],
	stores: ['Estratificacion.store.Terreno'],
	views: [
		'Estratificacion.view.grid.lista.Terreno',
		'Estratificacion.view.window.Lista'
	],
	init: function(application) {
		this.control({
			"#op-listaterrenos": {
				click: this.abrirListadoTerrenos
			}
		});
	},
	abrirListadoTerrenos: function(btn, e, eOpts) {
		this.crearListadoTerrenos();

	},
	crearListadoTerrenos: function() {
		var listadoTerrenos = Ext.create('Estratificacion.view.window.Lista', {
			title: 'Listado de Predios',
			items: [{
				xtype: 'listadoterrenosgrid'
			}]

		});

		return listadoTerrenos;
	}

});