Ext.define('Estratificacion.model.Terreno', {
	extend: 'Ext.data.Model',

	fields: [{
		name: 'gid',
		type: 'int'
	}, {
		name: 'cod_predio',
		type: 'String'
	}, {
		name: 'cod_manzan',
		type: 'String'
	}, {
		name: 'actividad',
		type: 'String'
	}, {
		name: 'direccion',
		type: 'String'
	}, {
		name: 'lado_manz',
		type: 'String'
	}]

});