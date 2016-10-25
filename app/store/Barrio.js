Ext.define('Estratificacion.store.Barrio', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Barrio',
	fields: ['cod_barrio', 'nombre'],
	autoLoad: false,
	proxy: {

		type: 'rest',
		url:Global.getRestUrl() + 'barrios',
		pageParam:	undefined,
		startParam:	undefined,
		limitParam: undefined,
		extraParams:{
			token: Global.getToken()
		},
		noCache: false,
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});