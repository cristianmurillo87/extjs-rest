Ext.define("Estratificacion.Global", {

	singleton: true,
	alternateClassName: ['Global'],
	constructor: function(config) {
		this.initConfig(config);
	},
	config: {
		baseUrl: window.location.origin + window.location.pathname,
		usuario: "Some",
		nombre: "User",
		apellido: "Logged",
		administrar: false,
		consultar: false,
		ver: false,
		webfont: 'FontAwesome',
		pan: 'xf047',
		zoomfull: 'xf0ac',
		zoomin: 'xf00e',
		zoomout: 'xf010',
		zoomprev: 'xf0e2',
		zoomnext: 'xf01e',
		select: 'xf247',
		distance: 'xf07e',
		area: 'xf1fe',
		streetview: 'xf21d',
		info: 'xf05a',
		unselect: 'xf248'
	},
	setIcon: function(glyph) {
		return Global.getGlyph(glyph);
	},
	setUser: function(value) {
		Global.config['usuario'] = value;
	},
	set: function(role, value) {
		Global.config[role] = value;
	},
	getIcon: function(glyph) {
		return Global.getGlyph(glyph);
	},
	getGlyph: function(glyph) {
		var font = Global.getWebfont();
		if (typeof Global.config[glyph] === 'undefined') {
			return false;
		}

		return Global.config[glyph] + '@' + font;
	},
	getUser: function() {
		return Global.config['usuario'];
	},
	getUserName: function() {
		return Global.config['nombre'] + ' ' + Global.config['apellido'];
	},
	isAdmin: function() {
		var admin = Global.config['administrar'];
		if (admin === true) {
			return true;
		}
		return false;
	}




});