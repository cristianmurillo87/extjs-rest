Ext.define('Estratificacion.model.Lado', {
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
			name: 'fl_via',
			type: 'String'
		}, {
			name: 'fl_foco',
			type: 'String'
		}, {
			name: 'fl_anden',
			type: 'String'
		}, {
			name: 'fl_antejar',
			type: 'String'
		}, {
			name: 'fl_garaje',
			type: 'String'
		}, {
			name: 'fl_fachada',
			type: 'String'
		}, {
			name: 'fl_puerta',
			type: 'String'
		}, {
			name: 'fl_zona',
			type: 'String'
		}, {
			name: 'estrato',
			type: 'String'
		}

	]

});