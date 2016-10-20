Ext.define('Estratificacion.model.TreeStore', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'text',
		type: 'String'
	}, {
		name: 'leaf',
		type: 'boolean'
	}, {
		name: 'expanded',
		defaultValue: false
	}, {
		name: 'el'
	}, {
		name: 'x'
	}, {
		name: 'y'
	}]
});