Ext.define('Estratificacion.view.grid.lista.Terreno', {
	extend: 'Ext.ux.LiveSearchGridPanel', //'Ext.grid.Panel',
	alias: 'widget.listadoterrenosgrid',

	border: false,
	store: 'Estratificacion.store.Terreno',
	columns: [{
			text: 'Id',
			dataIndex: 'gid',
			width: 60
		}, {
			text: 'Terreno',
			dataIndex: 'cod_predio',
			width: 120
		}, {
			text: 'Lado',
			dataIndex: 'lado_manz',
			width: 90
		}, {
			text: 'Manzana',
			dataIndex: 'cod_manzan',
			width: 85
		}, {
			text: 'Direccion',
			dataIndex: 'direccion',
			width: 125
		}, {
			text: 'Actividad',
			dataIndex: 'actividad',
			width: 240
		}

	],
	dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [
				'->', {
					xtype: 'pagingtoolbar',
					border: false,
					store: 'Estratificacion.store.Terreno',
					pagesize: 200,
					dock: 'top',
					displayInfo: true,
					emptyMsg: 'No hay predios disponibles',
					displayMsg: 'Mostrando {0} - {1} de {2}',
					beforePageText: 'Pagina',
					afterPageText: 'de {0}'
				}

			]
		}

	]

});