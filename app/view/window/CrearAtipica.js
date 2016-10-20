/**
 * @author Cristian Murillo
 */

var atipicidad = Ext.create('Estratificacion.store.Atipica');

Ext.define('Estratificacion.view.window.CrearAtipica', {
	extend: 'Ext.window.Window',
	title: 'Crear/ Editar Atipicidad',
	modal: true,
	border: false,
	layout: 'fit',
	closable: true,
	width: 400,
	height: 240,
	autoShow: false,
	resizable: false,
	items: [{
		xtype: 'form',
		layout: 'anchor',
		id: 'atipicForm',
		bodyStyle: 'background:rgb(248,248,248);',
		width: 400,
		border: false,
		items: [{
			xtype: 'container',
			layout: 'hbox',
			margin: '5 7 4 7',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'C&oacutedigo del Predio',
				labelAlign: 'top',
				name: 'cod_predio',
				id: 'cod_predio',
				margin: '2 10 2 10',
				allowBlank: 'false',
				maxLength: 14,
				minLength: 14,
				enforceMaxLength: true,
				vtype: 'predio',
				readOnly: true,
				disabledCls: 'x-item-enabled'
			}, {
				xtype: 'textfield',
				fieldLabel: 'Direcci&oacuten',
				labelAlign: 'top',
				name: 'direccion',
				id: 'direccion',
				margin: '2 10 2 10',
				allowBlank: 'false',
				width: 145,
				maxLenght: 50,
				minLenght: 10,
				disabled: false,
				disabledCls: 'x-item-enabled',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		}, {
			xtype: 'container',
			layout: 'hbox',
			margin: '4 10 4 10',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Lado de Manzana',
				name: 'lado_manz',
				id: 'lado_manz',
				margin: '2 10 2 10',
				allowBlank: 'false',
				labelAlign: 'top',
				width: 130,
				maxLength: 9,
				minLength: 9,
				readOnly: true,
				disabledCls: 'x-item-enabled'
			}, {
				xtype: 'combobox',
				width: 100,
				fieldLabel: 'Tipo : ',
				labelWidth: 110,
				labelAlign: 'top',
				store: atipicidad,
				queryMode: 'local',
				displayField: 'tipo',
				itemId: 'tipo',
				name: 'tipo',
				id: 'tipo',
				valueField: 'tipo_atip',
				forceSelection: true,
				allowBlank: false,
				triggerAction: 'all',
				labelSeparator: '',
				anyMatch: true,
				margin: '2 10 2 10'
			}, {
				xtype: 'textfield',
				fieldLabel: 'Estrato',
				name: 'estrato_atip',
				id: 'estratoAtip',
				labelAlign: 'top',
				margin: '2 10 2 10',
				allowBlank: 'false',
				width: 50,
				maxLength: 1,
				disabled: false,
				disabledCls: 'x-item-enabled',
				enforceMaxLength: true,
				vtype: 'estrato'
			}]

		}, {
			xtype: 'textfield',
			name: 'justificacion',
			fieldLabel: 'Justificaci&oacuten',
			labelAlign: 'top',
			margin: '4 20 4 20',
			width: 320,
			listeners: {
				change: function(field, newValue) {
					field.setValue(newValue.toUpperCase());
				}
			}
		}]
	}],
	buttons: [{
		xtype: 'button',
		text: 'Guardar',
		itemId: 'btn-guardaatipica'
	}, {
		xtype: 'button',
		text: 'Cancelar',
		itemId: 'cancela'
	}],
	buttonAlign: 'center'

});