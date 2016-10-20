Ext.define('Estratificacion.view.user.Login', {
	extend: 'Ext.window.Window',
	alias: 'widget.login',
	xtype: 'login',
	requires: [
		'Ext.button.Button',
		'Ext.form.Panel',
		'Ext.form.field.Text',
	],
	autoShow: true,
	plugins: '',
	width: 400,
	height: 150,
	modal: true,
	closable: false,
	resizable: false,
	title: 'Iniciar Sesi&oacuten',
	glyph: 'xf007@FontAwesome',
	layout: 'fit',
	items: [{
		xtype: 'form',
		items: [{
			xtype: 'textfield',
			anchor: '100%',
			minLength: 8,
			fieldLabel: 'Usuario',
			name: 'usuario',
			allowBlank: false,
			margin: '10 10 10 10'
		}, {
			xtype: 'textfield',
			inputType: 'password',
			anchor: '100%',
			margin: '5 10 10 10',
			fieldLabel: 'Contrase&ntildea',
			name: 'password',
			minLength: 8,
			allowBlank: false
		}]
	}],
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		buttonAlign: 'center',
		items: [
			'->', {
				xtype: 'button',
				text: 'Ingresar',
				glyph: 'xf00c@FontAwesome',
				handler: function(btn, e, eOpts) {
					var w = btn.up('window');
					var form = w.down('form').getForm();
					var vals = form.getValues();

					if (form.isValid()) {
						Ext.Ajax.request({
							url: 'http://172.18.10.127:9000/laravel/public/api/authenticate?usuario='+vals.usuario+'&password='+vals.password,
							headers: { 'Content-Type': 'application/json' },
							method: 'POST',
							success: function(response) {
								var data = Ext.JSON.decode(response.responseText);
								var token = data.token;

								if (token) {
									Ext.state.Manager.set('isUserLoggedIn', true);
									Ext.state.Manager.set('token', token);
									/*Ext.state.Manager.set('isUserLoggedIn', true);
									Ext.state.Manager.set('LoggedUserName', data.message.nom_usuario);
									Ext.state.Manager.set('LoggedUserNameName', data.message.nombre);
									Ext.state.Manager.set('LoggedUserNameLastName', data.message.apellido);
									Ext.state.Manager.set('isLoggedUserAdmin', data.message.administra);
									Ext.state.Manager.set('canLoggedUserQuery', data.message.consulta);
									Ext.state.Manager.set('isLoggedUserAUser', data.message.usuario);

									w.getEl().fadeOut({
										duration: 250,
										remove: false,
										useDisplay: false,
										callback: function() {
											Global.setUser('usuario', data.message.nom_usuario);
											Global.set('nombre', data.message.nombre);
											Global.set('apellido', data.message.apellido);
											Global.set('administrar', data.message.administra);
											Global.set('consultar', data.message.consulta);
											Global.set('ver', data.message.usuario);
											w.close();
											Ext.create('Estratificacion.view.main.Viewport');
										}
									});*/

								} else {
									Ext.Msg.show({
										title: 'Error',
										msg: data.error,
										buttons: Ext.Msg.OK,
										icon: Ext.Msg.ERROR
									});

								}
							},
							failure: function(response) {
								var data = Ext.JSON.decode(response.responseText);
								Ext.Msg.show({
									title: 'Error',
									msg: data.error,
									buttons: Ext.Msg.OK,
									icon: Ext.Msg.ERROR
								});
							}
						});
					}
				}
			}
		]
	}]

});