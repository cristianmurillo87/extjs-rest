Ext.define('Estratificacion.controller.eliminar.Lado', {
	extend: 'Ext.app.Controller',

	init: function(application) {
		this.control({
			"#btn-eliminalado": {
				click: this.eliminaLado
			}
		});
	},
	eliminaLado: function(btn, e, eOpts) {
		var ventana = btn.up('window');
		var formulario = ventana.down('form');
		var valid = formulario.getForm();

		var lado = Ext.getCmp('lado_manz').getValue();
		var msj = '¿Desea eliminar el lado de manzana ' + lado + '?';

		var gridlado = Ext.getCmp('gridlado');
		var ladostore = gridlado.getStore();

		if (valid.isValid()) {
			Ext.Msg.show({
				title: 'Confirmaci&oacuten',
				msg: msj,
				buttonText: {
					yes: 'Si',
					no: 'No'
				},
				buttons: Ext.Msg.YESNO,
				icon: Ext.MessageBox.QUESTION,
				fn: function(btn) {
					if (btn == 'yes') {
						valid.submit({
							url: 'php/EliminaLado.php',
							waitMsg: 'Eliminando...',
							waitTitle: 'Espere',
							success: function(form, action) {
								var data = Ext.JSON.decode(action.response.responseText);


								if (data.success == 'true') {

									valid.reset();
									ladostore.removeAll();



									Ext.Msg.show({
										title: 'Aviso',
										msg: 'El lado de manzana ' + lado + 'se elimin&oacute exitosamente.',
										buttons: Ext.Msg.OK,
										buttonText: {
											ok: 'Aceptar'
										},
										icon: Ext.MessageBox.INFO
									});

								} else if (data.success == 'false') {

									valid.reset();
									ladostore.removeAll();

									Ext.Msg.show({
										title: 'Aviso',
										msg: 'No se pudo llevar a cabo la operaci&oacuten',
										buttons: Ext.Msg.OK,
										buttonText: {
											ok: 'Aceptar'
										},
										icon: Ext.MessageBox.ERROR
									});
								}
							},
							failure: function(form, action) {

								var data = Ext.JSON.decode(action.response.responseText);

								valid.reset();
								ladostore.removeAll();

								Ext.Msg.show({
									title: 'Aviso',
									msg: data.errors.reason,
									buttons: Ext.Msg.OK,
									buttonText: {
										ok: 'Aceptar'
									},
									icon: Ext.MessageBox.ERROR
								});
							}
						});

					}



				}

			});

		}

	}
});