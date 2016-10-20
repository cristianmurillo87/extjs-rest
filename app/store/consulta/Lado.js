Ext.define('Estratificacion.store.consulta.Lado', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.consulta.Lado',
	fields: ['gid', 'lado_manz', 'cod_manzana', 'estrato'],
	autoLoad: false,
	proxy: {
		type: 'ajax',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});