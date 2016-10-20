Ext.define('Estratificacion.controller.user.Sesion', {
	extend: 'Ext.app.Controller',
	requires: ['Estratificacion.view.user.Contrasena'],

	init: function(application) {
		this.control({
			"#op-cerrasesion": {
				click: this.cerraSesion
			},
			"#op-cambiaclave": {
				click: this.abrirCambiaClave
			},
			"button#btn-cambiaclave": {
				click: this.cambiaClave
			}
		});
	},
	cerraSesion: function(btn, e, eOpts) {
		sessionStorage.removeItem("LoggedIn");
		var sessionProvider = Ext.state.Manager.getProvider()
		for (var sP in sessionProvider.state) {
			Ext.state.Manager.clear(sP);
		}
		self.location = 'index.html';

	},
	abrirCambiaClave: function(btn, e, eOpts) {
		this.crearCambiaClave();
	},
	crearCambiaClave: function() {
		var cambiaClave = Ext.create('Estratificacion.view.user.Contrasena');
	},
	cambiaClave: function(btn, e, eOpts) {
		var ventana = btn.up('window');
		var form = ventana.down('form').getForm();
		var valores = form.getValues();

		if (form.isValid()) {

			Ext.Ajax.request({
				url: 'php/CambiaClave.php',
				params: {
					id: _id,
					oldkey: valores.actualclave,
					newkey: valores.nuevaclave

				},
				success: function(response) {

					var data = Ext.JSON.decode(response.responseText);

					if (data.success == "true") {

						Ext.Msg.show({
							title: 'Aviso',
							msg: 'Contrase&ntildea actualizada exitosamente',
							buttons: Ext.Msg.OK,
							buttonText: {
								ok: 'Aceptar'
							},
							icon: Ext.MessageBox.INFO
						});

						form.reset();
						ventana.close();
					} else if (data.success == "false") {

						Ext.Msg.show({
							title: 'Aviso',
							msg: 'No fue posible actualizar la contrase&ntildea',
							buttons: Ext.Msg.OK,
							buttonText: {
								ok: 'Aceptar'
							},
							icon: Ext.MessageBox.WARNING
						});

						form.reset();
					}
				},
				failure: function(response) {

					Ext.Msg.show({
						title: 'Aviso',
						msg: 'No se pudo llevar a cabo la operaci&oacuten',
						buttons: Ext.Msg.OK,
						buttonText: {
							ok: 'Aceptar'
						},
						icon: Ext.MessageBox.ERROR
					});
					form.reset();
				}
			});
		}

	}
});