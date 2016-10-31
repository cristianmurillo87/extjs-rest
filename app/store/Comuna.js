Ext.define('Estratificacion.store.Comuna', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Comuna',
	fields: ['cod_comuna', 'nombre'],
	autoLoad: false,
	autoLoad: false,
	proxy: {

		type: 'rest',
		url:Global.getRestUrl() + 'comunas',
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