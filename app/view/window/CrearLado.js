var via = Ext.create('Estratificacion.store.Via');

var foco = Ext.create('Estratificacion.store.Foco');

var anden = Ext.create('Estratificacion.store.Anden');

var antejardin = Ext.create('Estratificacion.store.Antejardin');

var garaje = Ext.create('Estratificacion.store.Garaje');

var fachada = Ext.create('Estratificacion.store.Fachada');

var puerta = Ext.create('Estratificacion.store.Puerta');

var zona = Ext.create('Estratificacion.store.Zona');


Ext.define('Estratificacion.view.window.CrearLado', {
	require: [
		'Estratificacion.store.Via',
		'Estratificacion.store.Foco',
		'Estratificacion.store.Anden',
		'Estratificacion.store.Antejardin',
		'Estratificacion.store.Garaje',
		'Estratificacion.store.Fachada',
		'Estratificacion.store.Puerta',
		'Estratificacion.store.Zona'
	],
	extend: 'Ext.window.Window',
	title: 'Crear/ Editar Lado de Manzana',
	alias: 'widget.formventana',
	modal: false,
	itemId:'win-consultalado',
	layout: 'fit',
	id: 'formventana',
	border: false,
	width: 400,
	height: 510,
	closable: true,
	items: [{
		xtype: 'form',
		layout: 'anchor',
		itemId: 'ladoForm',
		id: 'ladoForm',
		border: false,
		width: 400,
		bodyStyle: 'background:rgb(248,248,248);',
		items: [{
				xtype: 'fieldset',
				layout: 'hbox',
				margin: 7,
				title: 'Informaci&oacuten del lado',
				items: [{
					xtype: 'textfield',
					fieldLabel: 'Lado de Manzana',
					labelAlign: 'left',
					name: 'lado_manz',
					id: 'lado_manz',
					margin: 7,
					allowBlank: false,
					maxLength: 9,
					minLength: 9,
					enforceMaxLength: true,
					fieldStyle: 'text-transform:uppercase',
					vtype: 'ladomanzana',
					listeners: {
						specialkey: {
							fn: function(field, e) {
								if (e.getKey() == e.ENTER) {


									if (field.isValid()) {

										var mascara = new Ext.LoadMask(Ext.getCmp('ladoForm'), {
											msg: 'Buscando lado de manzana...'
										});
										mascara.show();
							//start request
										$.ajax({
											url:Global.config['restUrl'] + 'lados/'+ this.value.toUpperCase(),
											type:'GET',
											data:{"token": Global.getToken()},
											dataType:'json',
											success:function(data, status, jqXHR){
												var features = data.data.features;
												var properties = {};
												
												for(var i = 0; i < features.length; i++){
													properties = features[i].properties;													
												}
												
												Ext.ComponentQuery.query('#fl_via')[0].setValue(properties.fl_via);
												Ext.ComponentQuery.query('#fl_foco')[0].setValue(properties.fl_foco);
												Ext.ComponentQuery.query('#fl_anden')[0].setValue(properties.fl_anden);
												Ext.ComponentQuery.query('#fl_antejar')[0].setValue(properties.fl_antejar);
												Ext.ComponentQuery.query('#fl_garaje')[0].setValue(properties.fl_garaje);
												Ext.ComponentQuery.query('#fl_fachada')[0].setValue(properties.fl_fachada);
												Ext.ComponentQuery.query('#fl_puerta')[0].setValue(properties.fl_puerta);
												Ext.ComponentQuery.query('#fl_zona')[0].setValue(Number(properties.fl_zona));
												Ext.ComponentQuery.query('#estrato')[0].setValue(properties.estrato);

												mascara.hide();

											},
											error:function(jqXHR, status, error){
												Ext.Msg.show({
													title: 'Mensaje',
													msg: jqXHR.responseJSON.errors.reason,
													buttons: Ext.Msg.OK,
													icon: Ext.Msg.WARNING
												});

												var combos = Ext.ComponentQuery.query('#ladoForm combobox');

													for (var i = 0; i < combos.length; i++) {
														combos[i].clearValue();
													}

													Ext.ComponentQuery.query('#ladoForm textfield[name=estrato]')[0].reset();
													mascara.hide();
											}
										});
							//end request
									}
								}

							}
						}
					}
				}]

			}, {
				xtype: 'fieldset',
				layout: 'vbox',
				margin: 5,
				title: 'Variables',
				items: [{
						xtype: 'combobox',
						itemId: 'fl_via',
						name: 'fl_via',
						width: 270,
						fieldLabel: '1. Tipo de via',
						labelWidth: 100,
						store: via,
						queryMode: 'local',
						displayField: 'nombre',
						valueField: 'fl_via',
						forceSelection: true,
						allowBlank: false,
						triggerAction: 'all',
						labelSeparator: '',
						anyMatch: true,
						margin: 7,
						readOnly:true
					}, {
						xtype: 'combobox',
						width: 270,
						itemId: 'fl_foco',
						name: 'fl_foco',
						fieldLabel: '2. Focos',
						store: foco,
						queryMode: 'local',
						displayField: 'nombre',
						valueField: 'fl_foco',
						forceSelection: true,
						allowBlank: false,
						triggerAction: 'all',
						labelSeparator: '',
						anyMatch: true,
						margin: 7,
						readOnly:true
					}, {
						xtype: 'combobox',
						width: 280,
						itemId: 'fl_anden',
						name: 'fl_anden',
						fieldLabel: '3. Anden',
						store: anden,
						queryMode: 'local',
						displayField: 'nombre',
						valueField: 'fl_anden',
						forceSelection: true,
						allowBlank: false,
						labelSeparator: '',
						triggerAction: 'all',
						autoSelect: true,
						anyMatch: true,
						margin: 7,
						readOnly:true
					}, {
						xtype: 'combobox',
						width: 280,
						itemId: 'fl_antejar',
						name: 'fl_antejar',
						fieldLabel: '4. Antejardin',
						store: antejardin,
						queryMode: 'local',
						displayField: 'nombre',
						valueField: 'fl_antejar',
						forceSelection: true,
						allowBlank: false,
						triggerAction: 'all',
						labelSeparator: '',
						anyMatch: true,
						margin: 7,
						readOnly:true
					}, {
						xtype: 'combobox',
						width: 330,
						itemId: 'fl_garaje',
						name: 'fl_garaje',
						fieldLabel: '5. Garaje',
						store: garaje,
						queryMode: 'local',
						displayField: 'nombre',
						valueField: 'fl_garaje',
						forceSelection: true,
						allowBlank: false,
						triggerAction: 'all',
						labelSeparator: '',
						anyMatch: true,
						margin: 7,
						readOnly:true
					}, {
						xtype: 'combobox',
						width: 330,
						itemId: 'fl_fachada',
						name: 'fl_fachada',
						fieldLabel: '6. Fachada',
						store: fachada,
						queryMode: 'local',
						displayField: 'nombre',
						valueField: 'fl_fachada',
						forceSelection: true,
						allowBlank: false,
						triggerAction: 'all',
						labelSeparator: '',
						anyMatch: true,
						margin: 7,
						readOnly:true
					}, {
						xtype: 'combobox',
						width: 330,
						itemId: 'fl_puerta',
						name: 'fl_puerta',
						fieldLabel: '7. Puerta principal',
						store: puerta,
						queryMode: 'local',
						displayField: 'nombre',
						valueField: 'fl_puerta',
						forceSelection: true,
						allowBlank: false,
						labelSeparator: '',
						triggerAction: 'all',
						anyMatch: true,
						margin: 7,
						readOnly:true
					}, {
						xtype: 'combobox',
						width: 150,
						itemId: 'fl_zona',
						name: 'fl_zona',
						labelSeparator: '',
						fieldLabel: '8. Zona',
						store: zona,
						queryMode: 'local',
						displayField: 'id',
						valueField: 'fl_zona',
						forceSelection: true,
						allowBlank: false,
						triggerAction: 'all',
						anyMatch: true,
						margin: 7,
						readOnly:true
					}, {
						xtype: 'textfield',
						width: 150,
						itemId: 'estrato',
						labelSeparator: '',
						fieldLabel: 'Estrato',
						name: 'estrato',
						maxLength: 1,
						enforceMaxLength: true,
						allowBlank: false,
						vtype: 'estrato',
						margin: 7,
						readOnly:true
					}

				]



			}

		]

	}],
	listeners:{
		beforeremove:function(){
			this.up('window').getEl().fadeOut({duration:300, remove:true, useDisplay:false});
		}
	},

	buttons: [{
			xtype: 'button',
			text: 'Aceptar',
			handler:function(){
				this.up('window').getEl().fadeOut({duration:300, remove:true, useDisplay:false});
				this.up('window').close();
			}
			//itemId: 'btn-guardalado'
		}],
	buttonAlign: 'center',
	autoShow: true,
	resizable: false
});