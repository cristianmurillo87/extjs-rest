Ext.define('Estratificacion.store.Puerta', {
	extend: 'Ext.data.Store',
	fields: ['fl_puerta', 'nombre'],
	data: [{
		fl_puerta: 0,
		nombre: '0. No aplica'
	}, {
		fl_puerta: 1,
		nombre: '1. Tabla, guadua, esterilla, tela'
	}, {
		fl_puerta: 2,
		nombre: '2. Madera pulida, lamina metalica, aluminio, hierro'
	}, {
		fl_puerta: 3,
		nombre: '3. Madera tallada o complemento en vidrio'
	}],
	autoLoad: true
});