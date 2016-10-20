var gstore = Ext.create('Estratificacion.store.Grafico');
var estore = Ext.create('Estratificacion.store.Estrato');

Ext.define('Estratificacion.view.chart.Estrato', {
	extend: 'Ext.window.Window',
	title: 'Distribucion de Estrato',
	itemId: 'vent-grafico',
	id: 'vent-grafico',
	autoShow: true,
	modal: true,
	layout: 'fit',
	width: 600,
	height: 500,
	y: 81,
	tbar: [
		'', 'Gr&aacutefico ', {
			xtype: 'combobox',
			text: '&lt;',
			tooltip: 'Seleccionar Gr&aacutefico',
			width: 90,
			store: gstore,
			queryMode: 'local',
			displayField: 'nombre',
			valueField: 'tipo',
			value: 'column',
			name: 'tipo',
			id: 'tipo_g',
			itemId: 'tipo_g',
			forceSelection: true,
			allowBlank: false,
			triggerAction: 'all',
			anyMatch: true
		},
		'', '-', '', 'Estrato ',

		{
			xtype: 'combobox',
			text: '&lt;',
			tooltip: 'Seleccionar Estrato',
			width: 90,
			store: estore,
			queryMode: 'local',
			displayField: 'nombre',
			valueField: 'estrato',
			value: '1',
			name: 'estrato',
			id: 'v-estrato',
			itemId: 'v-estrato',
			forceSelection: true,
			allowBlank: false,
			triggerAction: 'all',
			anyMatch: true
		},

		'', {
			xtype: 'button',
			text: 'Generar',
			iconCls: 'grafico',
			itemId: 'btn-distrEstrato'
		},
		'', '-'
	],
	items: [{
		xtype: 'panel',
		layout: 'fit',
		itemId: 'graficarea',
		id: 'graficarea',
		border: false,
		height: 500
	}]
});