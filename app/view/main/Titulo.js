Ext.define('Estratificacion.view.main.Titulo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.paneltitulo',
	bodyStyle: 'background:#3A5795',
	height: 80,
	region: 'north',
	border: false,
	bbar: Ext.create('Estratificacion.view.main.Menu')
});