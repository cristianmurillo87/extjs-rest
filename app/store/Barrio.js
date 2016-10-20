Ext.define('Estratificacion.store.Barrio', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Barrio',
	fields: ['cod_barrio', 'nombre'],
	autoLoad: false,
	proxy: {

		type: 'ajax',
		url: 'php/buscar/BuscaBarrio.php',
		reader: {
			type: 'json',
			root: 'barrio'
		}
	}
});