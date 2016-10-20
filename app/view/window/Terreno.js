/**
 * @author Cristian Murillo
 */
Ext.define('Estratificacion.view.window.Terreno', {
	extend: 'Ext.window.Window',
	alias: 'widget.formBuscaTerreno',
	title: 'Buscar Terreno',
	cls: 'infoventana',
	modal: true,
	layout: 'fit',
	closable: true,
	width: 250,
	autoShow: true,
	border: false,
	resizable: false,
	buttonAlign: 'center',
	items: [{
		xtype: 'form',
		layout: 'fit',
		itemId: 'ladoForm',
		bodyStyle: 'background:rgb(248,248,248);',
		border: false,
		height: 60,
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Escriba el c&oacutedigo del Terreno',
			labelAlign: 'top',
			name: 'cod_predio',
			itemId: 'cod_predio',
			id: 'cod_predio',
			margin: 10,
			allowBlank: 'false',
			maxLength: 30,
			minLength: 13,
			enforceMaxLength: true
		}]
	}],
	buttons: []
});