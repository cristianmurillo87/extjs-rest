Ext.define('Estratificacion.view.grid.lista.Lado', {
	extend: 'Ext.ux.LiveSearchGridPanel', //'Ext.grid.Panel',
	alias: 'widget.listadosgrid',

	border: false,
	cls: 'gridCss',
	store: 'Estratificacion.store.Lado',
	columns: [{
		text: 'Id',
		dataIndex: 'gid',
		width: 60
	}, {
		text: 'Lado',
		dataIndex: 'lado_manz',
		width: 90
	}, {
		text: 'Manzana',
		dataIndex: 'cod_manzana',
		width: 75
	}, {
		text: 'Estrato',
		dataIndex: 'estrato',
		width: 55
	}, {
		text: 'Via',
		dataIndex: 'fl_via',
		width: 45
	}, {
		text: 'Foco',
		dataIndex: 'fl_foco',
		width: 50
	}, {
		text: 'Anden',
		dataIndex: 'fl_anden',
		width: 55
	}, {
		text: 'Antejardin',
		dataIndex: 'fl_antejar',
		width: 75
	}, {
		text: 'Garaje',
		dataIndex: 'fl_garaje',
		width: 55
	}, {
		text: 'Fachada',
		dataIndex: 'fl_fachada',
		width: 65
	}, {
		text: 'Puerta',
		dataIndex: 'fl_puerta',
		width: 55
	}, {
		text: 'Zona',
		dataIndex: 'fl_zona',
		width: 50
	}],
	dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
					xtype: 'button',
					text: 'Eliminar Lado',
					itemId: 'tb-btn-eliminalado',
					iconCls: 'borrar',
					disabled: true

				}, '->', {
					xtype: 'pagingtoolbar',
					border: false,
					store: 'Estratificacion.store.Lado',
					dock: 'top',
					displayInfo: true,
					emptyMsg: 'No hay lados de manzana disponibles',
					displayMsg: 'Mostrando {0} - {1} de {2}',
					beforePageText: 'Pagina',
					afterPageText: 'de {0}'
				}

			]
		}

	]

});