/**
 * @author Cristian Murillo
 */
Ext.define('Estratificacion.model.Atipica', {
	extend: 'Ext.data.Model',

	fields: [{
		name: 'gid',
		type: 'int'
	}, {
		name: 'lado_manz',
		type: 'string'
	}, {
		name: 'cod_predio',
		type: 'string'
	}, {
		name: 'direccion',
		type: 'string'
	}, {
		name: 'tipo_atip',
		type: 'string'
	}, {
		name: 'estrato',
		type: 'string'
	}, {
		name: 'justificacion',
		type: 'string'
	}]


});