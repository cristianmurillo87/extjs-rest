/**
 * @author Cristian Murillo
 */

Ext.define('Estratificacion.store.Lado', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Lado',
	fields: ['gid', 'lado_manz', 'cod_manzana', 'fl_via', 'fl_foco', 'fl_anden', 'fl_antejar', 'fl_garaje', 'fl_fachada', 'fl_puerta', 'fl_zona', 'estrato'],
	pageSize: 200,
	autoLoad: false,
	proxy: {

		type: 'rest',
		url:Global.getRestUrl() + 'lados',
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