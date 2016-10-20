Ext.define('Estratificacion.controller.eliminar.Atipica', {
	extend: 'Ext.app.Controller',

	init: function(application) {
		this.control({
			"#btn-eliminaatipica": {
				click: this.eliminaAtipica
			}
		});
	},
	eliminaAtipica: function(btn, e, eOpts) {

		var ventana = btn.up('window');
		var formulario = ventana.down('form');
		var valid = formulario.getForm();

		var grid = Ext.getCmp('gridelatipica');
		var fila = grid.getSelectionModel().getSelection()[0];
		var predio = fila.data.cod_predio;

		var msj = '¿Desea eliminar la atipicidad para el predio ' + predio + '?';

		var atipicstore = grid.getStore();

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
							url: 'php/EliminaAtipica.php',
							params: {
								predio: predio
							},
							waitMsg: 'Eliminando...',
							waitTitle: 'Espere',
							success: function(form, action) {
								var data = Ext.JSON.decode(action.response.responseText);


								if (data.success == 'true') {

									Ext.Msg.show({
										title: 'Aviso',
										msg: 'La atipicidad del predio ' + predio + ' se elimin&oacute exitosamente.',
										buttons: Ext.Msg.OK,
										buttonText: {
											ok: 'Aceptar'
										},
										icon: Ext.MessageBox.INFO
									});

									valid.reset();
									atipicstore.removeAll();
									ventana.close();

								} else if (data.success == 'false') {

									Ext.Msg.show({
										title: 'Aviso',
										msg: 'No se pudo llevar a cabo la operaci&oacuten',
										buttons: Ext.Msg.OK,
										buttonText: {
											ok: 'Aceptar'
										},
										icon: Ext.MessageBox.ERROR
									});

									valid.reset();
									atipicstore.removeAll();

								}
							},
							failure: function(form, action) {

								var data = Ext.JSON.decode(action.response.responseText);

								Ext.Msg.show({
									title: 'Aviso',
									msg: data.errors.reason,
									buttons: Ext.Msg.OK,
									buttonText: {
										ok: 'Aceptar'
									},
									icon: Ext.MessageBox.ERROR
								});

								valid.reset();
								atipicstore.removeAll();

							}
						});

					}



				}

			});

		}

	}
});