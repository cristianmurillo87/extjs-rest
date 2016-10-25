Ext.define('Estratificacion.store.Atipica', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Atipica',
	fields: ['gid', 'lado_manz', 'cod_predio', 'direccion', 'tipo_atip', 'estrato', 'justificacion'],
	pageSize: 200,
	autoLoad: true,
	proxy: {

		type: 'rest',
		url:Global.getRestUrl() + 'atipicas',
		pageParam:	undefined,
		startParam:'offset',
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