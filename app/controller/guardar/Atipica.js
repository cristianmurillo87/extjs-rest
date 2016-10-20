Ext.define('Estratificacion.controller.guardar.Atipica', {
	extend: 'Ext.app.Controller',

	init: function(application) {
		this.control({
			"#btn-guardaatipica": {
				click: this.guardaAtipica
			}
		});
	},
	guardaAtipica: function(btn, e, eOpts) {
		var ventana = btn.up('window');
		var formulario = ventana.down('form');
		var valid = formulario.getForm();


		if (valid.isValid()) {

			valid.submit({
				url: 'php/GuardaAtipica.php',
				waitMsg: 'Guardando...',
				waitTitle: 'Espere',
				success: function(form, action) {
					var data = Ext.JSON.decode(action.response.responseText);


					if (data.success == 'true') {


						Ext.Msg.show({
							title: 'Aviso',
							msg: 'Se agreg&oacute la atipicidad exitosamente.',
							buttons: Ext.Msg.OK,
							buttonText: {
								ok: 'Aceptar'
							},
							icon: Ext.MessageBox.INFO
						});

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

						ventana.close();

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

					ventana.close();

				}
			});


		}

	}
});