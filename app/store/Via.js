Ext.define('Estratificacion.store.Via', {
	extend: 'Ext.data.Store',
	fields: ['fl_via', 'nombre'],
	data: [{
		fl_via: 0,
		nombre: '0. No aplica'
	}, {
		fl_via: 1,
		nombre: '1. Sendero o camino'
	}, {
		fl_via: 2,
		nombre: '2. Peatonal'
	}, {
		fl_via: 3,
		nombre: '3. Vehicular en tierra'
	}, {
		fl_via: 4,
		nombre: '4. Vehicular en recevo'
	}, {
		fl_via: 5,
		nombre: '5. Vehicular en cemento'
	}],
	autoLoad: true
});