Ext.define('Estratificacion.view.window.EliminarAtipica', {
	extend: 'Ext.window.Window',
	title: 'Eliminar Atipicidad',
	id: 'ventanaEliminaAtipica',
	modal: true,
	layout: 'anchor',
	closable: true,
	border: false,
	autoShow: true,
	width: 400,
	height: 250,
	padding: '1 0 0 0',
	resizable: false,
	buttonAlign: 'center',
	items: [{
			xtype: 'form',
			id: 'eliminaAtipica',
			layout: 'anchor',
			bodyStyle: 'background:rgb(248,248,248);',
			border: false,
			height: 70,
			width: 380,
			margin: 7,
			padding: '1 10 1 10',
			items: [{
					xtype: 'textfield',
					labelSeparator: '',
					fieldLabel: 'Codigo del Predio',
					labelAlign: 'left',
					name: 'cod_predio',
					id: 'cod_predio',
					width: 320,
					margin: 10,
					padding: '1 1 1 1',
					allowBlank: 'false',
					maxLength: 30,
					minLength: 13,
					enforceMaxLength: true,
					listeners: {
						change: {
							fn: function(field, newValue) {
								field.setValue(newValue.toUpperCase());

								var gridatipica = Ext.getCmp('gridelatipica');
								var atipicstore = gridatipica.getStore();
								atipicstore.removeAll();

								var key = Ext.ComponentQuery.query('#btn-eliminaatipica')[0];
								if (!key.isDisabled()) {
									key.disable();
								}

							}
						},
						specialkey: {
							fn: function(field, e) {
								if (e.getKey() == e.ENTER) {
									if (field.isValid()) {

										var gridatipica = Ext.getCmp('gridelatipica');
										var atipicstore = gridatipica.getStore();
										atipicstore.removeAll();

										var mascara = new Ext.LoadMask(Ext.getCmp('gridelatipica'), {
											msg: 'Buscando atipicidad...'
										});
										mascara.show();

										Ext.Ajax.request({
											url: 'php/BuscaAtipica.php',
											params: {
												cod_predio: this.value
											},
											success: function(response) {


												var data = Ext.JSON.decode(response.responseText);

												if (data.success == 'true') {

													a = [];
													a.push(data.data);
													atipicstore.loadData(a);
													mascara.hide();



												} else if (data.success = 'false') {
													mascara.hide();
													Ext.Msg.show({
														title: 'Error',
														msg: data.errors.reason,
														buttons: Ext.Msg.OK,
														icon: Ext.MessageBox.ERROR
													});

													Ext.ComponentQuery.query('#btn-eliminaatipica')[0].disable();

												}
											},

											failure: function(form, action) {
												mascara.hide();
												var data = Ext.JSON.decode(response.responseText);
												Ext.Msg.show({
													title: 'Error',
													msg: data.errors.reason,
													buttons: Ext.Msg.OK,
													icon: Ext.MessageBox.ERROR
												});
											}

										});
									}
								}

							}
						}
					}
				}

			]
		}, {
			xtype: 'grideliminaatipica'
		}

	],
	buttons: [{
		xtype: 'button',
		text: 'Eliminar',
		itemId: 'btn-eliminaatipica',
		id: 'btn-eliminaatipica',
		disabled: true
	}, {
		xtype: 'button',
		text: 'Cancelar',
		itemId: 'cancela'
	}]

});