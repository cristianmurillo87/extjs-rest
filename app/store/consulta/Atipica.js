Ext.define('Estratificacion.store.consulta.Atipica', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Atipica',
	fields: ['gid', 'lado_manz', 'cod_predio', 'direccion', 'tipo_atip', 'justificacion'],
	autoLoad: false,
	proxy: {
		type: 'ajax',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});