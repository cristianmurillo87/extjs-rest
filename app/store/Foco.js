Ext.define('Estratificacion.store.Foco', {
	extend: 'Ext.data.Store',
	fields: ['fl_foco', 'nombre'],
	data: [{
		fl_foco: 0,
		nombre: '0. No aplica'
	}, {
		fl_foco: 1,
		nombre: '1. Si'
	}, {
		fl_foco: 2,
		nombre: '2. No'
	}],
	autoLoad: true
});