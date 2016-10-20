Ext.define('Estratificacion.store.Grafico', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Grafico',
	fields: ['tipo', 'nombre'],
	data: [{
		tipo: 'pie',
		nombre: 'Tortas'
	}, {
		tipo: 'column',
		nombre: 'Columnas'
	}, {
		tipo: 'bar',
		nombre: 'Barras'
	}],
	autoLoad: false
});