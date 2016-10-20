/**
 * @author Cristian Murillo
 */
Ext.define('Estratificacion.store.Terreno', {
	extend: 'Ext.data.Store',
	model: 'Estratificacion.model.Terreno',
	fields: ['gid', 'cod_predio', 'cod_manzana', 'actividad', 'direccion', 'lado_manz'],
	pageSize: 200,
	autoLoad: false,
	proxy: {

		type: 'ajax',
		api: {
			read: 'php/listados/ListaTerrenos.php'
		},
		reader: {
			type: 'json',
			root: 'data'
		},
		writer: {
			type: 'json',
			root: 'data',
			encode: true
		}
	}
});