Ext.define('Estratificacion.store.Fachada', {
	extend: 'Ext.data.Store',
	fields: ['fl_fachada', 'nombre'],
	data: [{
		fl_fachada: 0,
		nombre: '0. No aplica'
	}, {
		fl_fachada: 1,
		nombre: '1. Guadua, caña, esterilla, tabla o desechos'
	}, {
		fl_fachada: 2,
		nombre: '2. Sin cubrir'
	}, {
		fl_fachada: 3,
		nombre: '3. En revoque sin pintar'
	}, {
		fl_fachada: 4,
		nombre: '4. En revoque con pintura'
	}, {
		fl_fachada: 5,
		nombre: '5. Con enchape'
	}],
	autoLoad: true
});