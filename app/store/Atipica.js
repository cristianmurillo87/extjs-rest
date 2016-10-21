Ext.define('Estratificacion.store.Atipica', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Atipica',
	fields: ['gid', 'lado_manz', 'cod_predio', 'direccion', 'tipo_atip', 'estrato', 'justificacion'],
	pageSize: 200,
	autoLoad: false,
	proxy: {

		type: 'ajax',
		url: Global.config['restUrl'] + 'atipicas',
		startParam:'offset',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});