Ext.define('Estratificacion.controller.Main', {
	extend: 'Ext.app.Controller',

	models: [
		'Estratificacion.model.Lado',
		'Estratificacion.model.consulta.Lado',
		'Estratificacion.model.Atipica'
	],

	stores: [
		'Estratificacion.store.Anden',
		'Estratificacion.store.Antejardin',
		'Estratificacion.store.Fachada',
		'Estratificacion.store.Foco',
		'Estratificacion.store.Garaje',
		'Estratificacion.store.Puerta',
		'Estratificacion.store.Via',
		'Estratificacion.store.Lado',
		'Estratificacion.store.Atipica',
		'Estratificacion.store.consulta.Lado',
		'Estratificacion.store.consulta.Atipica'
	],

	views: [
		'Estratificacion.view.window.Lista',
		'Estratificacion.view.main.Menu',
		'Estratificacion.view.main.Titulo',
		'Estratificacion.view.main.Viewport',
		'Estratificacion.view.window.CrearAtipica',
		'Estratificacion.view.window.CrearLado',
		'Estratificacion.view.grid.elimina.Lado',
		'Estratificacion.view.window.EliminarLado',
		'Estratificacion.view.grid.elimina.Atipica',
		'Estratificacion.view.window.EliminarAtipica'
	],

	init: function(application) {
		this.control({
			"menuppal #op-agregalado": {
				click: this.abrirFormLado
			},
			"menuppal #op-agregatipica": {
				click: this.abrirBuscaTerreno
			},

			"#buscaTerreno": {
				click: this.buscarTerreno
			},

			"#cancela": {
				click: this.cerrarForm

			},

			"#op-modificaterreno": {
				click: this.crearFormBuscaModificaTerreno
			},

			"#buscaModificaTerreno": {
				click: this.buscaModificaTerreno
			},

			"#op-eliminalado": {
				click: this.abrirEliminaLado
			},

			"#op-eliminatipica": {
				click: this.abrirEliminaAtipica
			}



		});

	},

	crearFormLado: function() {

		var vLado = Ext.create('Estratificacion.view.window.CrearLado');
		return vLado;
	},

	crearFormBuscarTerreno: function() {

		var formBuscarTerreno = Ext.create('Estratificacion.view.window.Terreno', {
			buttons: [{
				xtype: 'button',
				text: 'Buscar',
				itemId: 'buscaTerreno'
			}, {
				xtype: 'button',
				text: 'Cancelar',
				itemId: 'cancela'
			}]
		});
		return formBuscarTerreno;
	},

	crearFormAtip: function() {
		var vAtip = Ext.create('Estratificacion.view.window.CrearAtipica');
		return vAtip;
	},

	crearEliminaLado: function() {

		var eliminaLado = Ext.create('Estratificacion.view.window.EliminarLado');

		return eliminaLado;
	},
	crearEliminaAtipica: function() {
		var eliminaAtipica = Ext.create('Estratificacion.view.window.EliminarAtipica');

		return eliminaAtipica;
	},

	abrirFormLado: function(btn, e, eOpts) {

		this.crearFormLado();
	},

	abrirFormAtip: function(btn, e, eOpts) {

		this.crearFormAtip();
	},

	abrirBuscaTerreno: function(btn, e, eOpts) {
		this.crearFormBuscarTerreno();
	},

	abrirEliminaLado: function(btn, e, eOpts) {
		this.crearEliminaLado();
	},
	abrirEliminaAtipica: function(btn, e, eOpts) {
		this.crearEliminaAtipica();
	},
	buscarTerreno: function(btn, e, eOpts) {


		var ventana = btn.up('window');
		var formulario = ventana.down('form');
		var validForm = formulario.getForm();
		if (validForm.isValid()) {
			validForm.submit({
				url: 'php/BuscarTerreno.php',
				waitMsg: 'Ejecutando Consulta...',
				waitTitle: 'Buscando',
				success: function(form, action) {

					var data = Ext.JSON.decode(action.response.responseText);

					ventana.close();

					var vA = Ext.create('Estratificacion.view.window.CrearAtipica');

					Ext.getCmp('cod_predio').setValue(data.data.resultado.cod_predio);
					Ext.getCmp('direccion').setValue(data.data.resultado.direccion);
					Ext.getCmp('lado_manz').setValue(data.data.resultado.lado_manz);


					vA.show();



				},
				failure: function(form, action) {
					var data = Ext.JSON.decode(action.response.responseText);
					Ext.Msg.show({
						title: 'Error',
						msg: data.errors.reason,
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.ERROR
					});
				}

			});
		}

	},

	crearFormBuscaModificaTerreno: function(btn, e, eOpts) {

		var formBuscaModificaTerreno = Ext.create('Estratificacion.view.window.Terreno', {
			buttons: [{
				xtype: 'button',
				text: 'Buscar',
				itemId: 'buscaModificaTerreno'
			}, {
				xtype: 'button',
				text: 'Cancelar',
				itemId: 'cancela'
			}]
		});

		return formBuscaModificaTerreno;
	},

	buscaModificaTerreno: function(btn, e, eOpts) {

		var ventana = btn.up('window');
		var formulario = ventana.down('form');
		var validForm = formulario.getForm();
		if (validForm.isValid()) {
			validForm.submit({
				url: 'php/BuscaModificaTerreno.php',
				waitMsg: 'Ejecutando Consulta...',
				waitTitle: 'Buscando',
				success: function(form, action) {

					var data = Ext.JSON.decode(action.response.responseText);

					ventana.close();

					var vA = Ext.create('Estratificacion.view.window.EditarTerreno');

					var manzana = data.data.resultado.lado_manz;
					var lado = data.data.resultado.lado_manz;

					Ext.getCmp('cod_predio').setValue(data.data.resultado.cod_predio);
					Ext.getCmp('direccion').setValue(data.data.resultado.direccion);
					Ext.getCmp('cod_lado').setValue(lado.slice(8, 9));
					Ext.getCmp('manzana').setValue(manzana.slice(0, 8));

					vA.show();


				},
				failure: function(form, action) {
					var data = Ext.JSON.decode(action.response.responseText);
					Ext.Msg.show({
						title: 'Error',
						msg: data.errors.reason,
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.ERROR
					});
				}

			});
		}

	},

	cerrarForm: function(btn, e, eOpts) {

		var ventana = btn.up('window');

		var formulario = ventana.down('form');

		formulario.getForm().reset();

		ventana.close();
	}




});