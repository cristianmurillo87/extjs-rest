/**
 * @author Cristian Murillo
 */
Ext.define('Estratificacion.store.Terreno', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Terreno',
	fields: ['gid', 'cod_predio', 'cod_manzana', 'actividad', 'direccion', 'lado_manz'],
	pageSize: 200,
	autoLoad: false,
	proxy: {

		type: 'rest',
		url:Global.getRestUrl() + 'terrenos',
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