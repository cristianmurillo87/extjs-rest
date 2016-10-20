Ext.define('Estratificacion.store.Estrato', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Estrato',
	fields: ['estrato', 'nombre'],
	data: [{
		estrato: '0',
		nombre: 'Estrato 0'
	}, {
		estrato: '1',
		nombre: 'Estrato 1'
	}, {
		estrato: '2',
		nombre: 'Estrato 2'
	}, {
		estrato: '3',
		nombre: 'Estrato 3'
	}, {
		estrato: '4',
		nombre: 'Estrato 4'
	}, {
		estrato: '5',
		nombre: 'Estrato 5'
	}, {
		estrato: '6',
		nombre: 'Estrato 6'
	}],
	autoLoad: false

});