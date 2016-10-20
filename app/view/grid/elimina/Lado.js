var storelado = Ext.create('Estratificacion.store.consulta.Lado');

Ext.define('Estratificacion.view.grid.elimina.Lado', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridlado',
	id: 'gridlado',
	bodyStyle: 'background:#f8f8f8;',
	padding: '1 8 2 8', //border:false,
	height: 100,
	width: 315,
	store: storelado,
	sortableColumns: false,
	enableColumnHide: false,
	columns: [{
		text: "Id",
		dataIndex: 'gid',
		width: 60
	}, {
		text: "Lado",
		dataIndex: 'lado_manz',
		width: 90
	}, {
		text: "Manzana",
		dataIndex: 'cod_manzana',
		width: 90
	}, {
		text: "Estrato",
		dataIndex: 'estrato',
		width: 60
	}, ],
	columnWidth: 10,
	listeners: {
		itemclick: {
			fn: function() {
				Ext.ComponentQuery.query('#btn-eliminalado')[0].enable();
			}
		}
	}


});