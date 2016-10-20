Ext.define('Estratificacion.store.Antejardin', {
	extend: 'Ext.data.Store',
	fields: ['fl_antejar', 'nombre'],
	data: [{
		fl_antejar: 0,
		nombre: '0. No aplica'
	}, {
		fl_antejar: 1,
		nombre: '1. Sin antejardin'
	}, {
		fl_antejar: 2,
		nombre: '2. Con antejardin pequeño'
	}, {
		fl_antejar: 3,
		nombre: '3. Con antejardin mediano'
	}, {
		fl_antejar: 4,
		nombre: '4. Con antejardin grande'
	}],
	autoLoad: true
});