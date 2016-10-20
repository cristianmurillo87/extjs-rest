/**
 * @autor Cristian Murillo
 */
Ext.define('Estratificacion.view.window.EditarTerreno', {
	extend: 'Ext.window.Window',
	title: 'Modificar Info de Terreno',
	modal: true,
	layout: 'fit',
	closable: true,
	width: 200,
	height: 270,
	autoShow: false,
	border: false,
	resizable: false,
	buttonAlign: 'center',
	items: [{
		xtype: 'form',
		layout: 'anchor',
		border: false,
		id: 'formModificaTerreno',
		margin: 7,
		items: [{
			xtype: 'textfield',
			fieldLabel: 'C&oacutedigo del Terreno',
			labelAlign: 'top',
			name: 'cod_predio',
			id: 'cod_predio',
			margin: 10,
			allowBlank: 'false',
			maxLength: 14,
			minLength: 14,
			enforceMaxLength: true,
			vtype: 'predio',
			readOnly: true,
			disabledCls: 'x-item-enabled'
		}, {
			xtype: 'fieldcontainer',
			layout: 'hbox',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Manzana',
				labelAlign: 'top',
				name: 'manzana',
				id: 'manzana',
				margin: 10,
				allowBlank: 'false',
				width: 95,
				maxLength: 8,
				minLength: 8,
				enforceMaxLength: true,
				readOnly: true,
				disabledCls: 'x-item-enabled',
				vtype: 'manzana'
			}, {
				xtype: 'textfield',
				fieldLabel: 'Lado',
				labelAlign: 'top',
				name: 'cod_lado',
				id: 'cod_lado',
				width: 35,
				margin: 10,
				allowBlank: false,
				maxLenght: 1,
				enforceMaxLength: true,
				fieldStyle: 'text-transform:uppercase',
				vtype: 'lado',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		}, {
			xtype: 'textfield',
			fieldLabel: 'Direcci&oacuten',
			labelAlign: 'top',
			name: 'direccion',
			id: 'direccion',
			margin: 10,
			disabledCls: 'x-item-enabled'
		}]
	}],
	buttons: [{
		xtype: 'button',
		text: 'Guardar',
		itemId: 'btn-modificaterreno'
	}, {
		xtype: 'button',
		text: 'Cancelar',
		itemId: 'cancela'
	}]


});