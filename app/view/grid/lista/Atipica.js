Ext.define('Estratificacion.view.grid.lista.Atipica', {
	extend: 'Ext.ux.LiveSearchGridPanel', //'Ext.grid.Panel',
	alias: 'widget.listadoatipicasgrid',

	border: false,
	store: 'Estratificacion.store.Atipica',
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
			width: 270
		}

	],
	dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
					xtype: 'button',
					text: 'Eliminar Atipica',
					itemId: 'tb-btn-eliminaatipica',
					iconCls: 'borrar',
					disabled: true

				},
				'->', {
					xtype: 'pagingtoolbar',
					border: false,
					store: 'Estratificacion.store.Atipica',
					pagesize: 200,
					dock: 'top',
					displayInfo: true,
					emptyMsg: 'No hay atipicas disponibles',
					displayMsg: 'Mostrando {0} - {1} de {2}',
					beforePageText: 'Pagina',
					afterPageText: 'de {0}'
				}

			]
		}

	]

});