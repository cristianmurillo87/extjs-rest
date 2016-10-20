Ext.define('Estratificacion.view.window.Lista', {
	extend: 'Ext.window.Window',
	autoShow: true,
	modal: true,
	border: false,
	resizable: false,
	title: '',
	layout: 'fit',
	width: 745,
	height: 420,
	items: [{
		xtype: 'listadosgrid'
	}]
});