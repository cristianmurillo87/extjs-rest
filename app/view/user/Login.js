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
						
						var getUser = function(token){
							$.ajax({
								url: Global.config['restUrl'] + 'authenticate/user',
								type:'GET',
								dataType:'json',
								data:{"token": token},
								success:function(data, status, jqXHR){
									document.cookie = "loggedUserName=" + data.user.usuario;
									document.cookie = "loggedUserNameName=" + data.user.nombre;
									document.cookie ="loggedUserNameLastName=" + data.user.apellido;
									document.cookie = "loggedUserId=" + data.user.id;
									document.cookie ="isLoggedUserAdmin=" + data.user.roles.administrar;
									document.cookie ="canLoggedUserQuery=" + data.user.roles.consultar;
									document.cookie ="isLoggedUserAUser=" + data.user.roles.ver;

									w.getEl().fadeOut({
										duration: 250,
										remove: false,
										useDisplay: false,
										callback: function() {
											Global.set('usuario', data.user.usuario);
											Global.set('nombre', data.user.nombre);
											Global.set('apellido', data.user.apellido);
											Global.set('id', data.user.id);							
											Global.set('administrar', data.user.roles.administrar);
											Global.set('consultar', data.user.roles.consultar);
											Global.set('ver', data.user.roles.ver);
											w.close();
											Ext.create('Estratificacion.view.main.Viewport');
										}
									});

								}
							});
						}

						$.ajax({
							url:Global.config['restUrl'] + 'authenticate',
							type:'POST',
							dataType:'json',
							data:{"usuario":vals.usuario, "password": vals.password},
							success:function(data, status, jqXHR){
								document.cookie = "token=" + data.token;
								getUser(data.token);
								Global.set('sessionToken', data.token);


							},
							error:function(jqXHR, status, error){
								Ext.Msg.show({
									title: 'Error',
									msg: "Usuario y/o contraseña invalidos",
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