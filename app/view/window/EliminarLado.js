Ext.define('Estratificacion.view.window.EliminarLado', {
	extend: 'Ext.window.Window',
	title: 'Eliminar Lado de Manzana',
	id: 'ventanaEliminaLado',
	modal: true,
	layout: 'anchor',
	closable: true,
	border: false,
	autoShow: true,
	width: 320,
	height: 250,
	padding: '1 0 0 0',
	resizable: false,
	buttonAlign: 'center',
	items: [{
			xtype: 'form',
			id: 'eliminaLado',
			layout: 'anchor',
			border: false,
			height: 70,
			width: 280,
			margin: 7,
			padding: '1 15 1 15',
			items: [{
					xtype: 'textfield',
					labelSeparator: '',
					fieldLabel: 'Lado de manzana',
					labelAlign: 'left',
					name: 'lado_manz',
					id: 'lado_manz',
					margin: 10,
					padding: '1 1 1 1',
					allowBlank: 'false',
					maxLength: 9,
					minLength: 9,
					enforceMaxLength: true,
					vtype: 'ladomanzana',
					listeners: {
						change: {
							fn: function(field, newValue) {
								field.setValue(newValue.toUpperCase());

								var gridlado = Ext.getCmp('gridlado');
								var ladostore = gridlado.getStore();
								ladostore.removeAll();

								var key = Ext.ComponentQuery.query('#btn-eliminalado')[0];
								if (!key.isDisabled()) {
									key.disable();
								}

							}
						},
						specialkey: {
							fn: function(field, e) {
								if (e.getKey() == e.ENTER) {
									if (field.isValid()) {

										var gridlado = Ext.getCmp('gridlado');
										var ladostore = gridlado.getStore();
										ladostore.removeAll();

										var mascara = new Ext.LoadMask(Ext.getCmp('gridlado'), {
											msg: 'Buscando lado de manzana...'
										});
										mascara.show();

										Ext.Ajax.request({
											url: 'php/BuscaExisteLado.php',
											params: {
												lado_manz: this.value
											},
											success: function(response) {


												var data = Ext.JSON.decode(response.responseText);

												if (data.success == 'true') {

													a = [];
													a.push(data.data);
													ladostore.loadData(a);
													mascara.hide();

													// 			Ext.ComponentQuery.query('#btn-eliminatipica')[0].enable();

												} else if (data.success = 'false') {
													mascara.hide();
													Ext.Msg.show({
														title: 'Error',
														msg: data.errors.reason,
														buttons: Ext.Msg.OK,
														icon: Ext.MessageBox.ERROR
													});

													Ext.ComponentQuery.query('#btn-eliminalado')[0].disable();

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
			xtype: 'gridlado'
		}

	],
	buttons: [{
		xtype: 'button',
		text: 'Eliminar',
		itemId: 'btn-eliminalado',
		id: 'btn-eliminalado',
		disabled: true
	}, {
		xtype: 'button',
		text: 'Cancelar',
		itemId: 'cancela'
	}]

});