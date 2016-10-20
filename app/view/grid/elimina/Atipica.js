var storelado = Ext.create('Estratificacion.store.consulta.Atipica');

Ext.define('Estratificacion.view.grid.elimina.Atipica', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.grideliminaatipica',
	id: 'gridelatipica',
	bodyStyle: 'background:#f8f8f8;',
	padding: '1 8 2 8', //border:false,
	height: 100,
	width: 390,
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
		text: "Terreno",
		dataIndex: 'cod_predio',
		width: 120
	}, {
		text: "Direccion",
		dataIndex: 'direccion',
		width: 140
	}, {
		text: "Tipo",
		dataIndex: 'tipo_atip',
		width: 40
	}, {
		text: "Justificacion",
		dataIndex: 'justificacion',
		width: 250
	}],
	columnWidth: 10,
	listeners: {
		itemclick: {
			fn: function() {
				Ext.ComponentQuery.query('#btn-eliminaatipica')[0].enable();
			}
		}
	}


});