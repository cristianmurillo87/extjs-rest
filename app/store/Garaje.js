Ext.define('Estratificacion.store.Garaje', {
	extend: 'Ext.data.Store',
	fields: ['fl_garaje', 'nombre'],
	data: [{
		fl_garaje: 0,
		nombre: '0. No aplica'
	}, {
		fl_garaje: 1,
		nombre: '1. Sin garaje ni parqueadero'
	}, {
		fl_garaje: 2,
		nombre: '2. Con garaje cubierto'
	}, {
		fl_garaje: 3,
		nombre: '3. Con parqueadero o zona de parqueo'
	}, {
		fl_garaje: 4,
		nombre: '4. Con garaje adicionado a la vivienda'
	}, {
		fl_garaje: 5,
		nombre: '5. Con garaje sencillo (Diseño original)'
	}, {
		fl_garaje: 6,
		nombre: '6. Con garaje doble o en sotano'
	}],
	autoLoad: true
});