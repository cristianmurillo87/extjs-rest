Ext.define('Estratificacion.model.consulta.Lado', {
	extend: 'Ext.data.Model',
	fields: [{
			name: 'gid',
			type: 'int'
		}, {
			name: 'lado_manz',
			type: 'String'
		}, {
			name: 'cod_manzana',
			type: 'String'
		}, {
			name: 'estrato',
			type: 'String'
		}

	]
});