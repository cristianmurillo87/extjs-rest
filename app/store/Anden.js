Ext.define('Estratificacion.store.Anden', {
	extend: 'Ext.data.Store',
	fields: ['fl_anden', 'nombre'],
	data: [{
		fl_anden: 0,
		nombre: '0. No aplica'
	}, {
		fl_anden: 1,
		nombre: '1. Sin anden'
	}, {
		fl_anden: 2,
		nombre: '2. Con anden sin zona verde'
	}, {
		fl_anden: 3,
		nombre: '3. Con anden con zona verde'
	}],
	autoLoad: true
});