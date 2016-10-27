Ext.define('Estratificacion.store.Comuna', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Comuna',
	fields: ['cod_comuna', 'nombre'],
	autoLoad: false,
	proxy: {

		type: 'ajax',
		url: 'php/buscar/BuscaComuna.php',
		reader: {
			type: 'json',
			root: 'comuna'
		}
	}
});