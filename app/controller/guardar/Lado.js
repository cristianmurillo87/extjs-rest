Ext.define('Estratificacion.controller.guardar.Lado', {
	extend: 'Ext.app.Controller',

	init: function(application) {
		this.control({
			"#btn-guardalado": {
				click: this.guardaLado
			}
		});
	},
	guardaLado: function(btn, e, eOpts) {
		var ventana = btn.up('window');
		var formulario = ventana.down('form');
		var valid = formulario.getForm();


		if (valid.isValid()) {

			valid.submit({
				url: 'php/GuardaLado.php',
				waitMsg: 'Guardando...',
				waitTitle: 'Espere',
				success: function(form, action) {
					var data = Ext.JSON.decode(action.response.responseText);


					if (data.success == 'true') {

						valid.reset();

						Ext.Msg.show({
							title: 'Aviso',
							msg: 'El lado de manzana fue agregado exitosamente.',
							buttons: Ext.Msg.OK,
							buttonText: {
								ok: 'Aceptar'
							},
							icon: Ext.MessageBox.INFO
						});

					} else if (data.success == 'false') {

						valid.reset();

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