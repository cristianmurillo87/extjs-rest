Ext.define('Estratificacion.Global', {

	singleton: true,
	alternateClassName: ['Global'],
	constructor: function(config) {	
		var self = this;
		self.config.sessionToken = self.setValueFromCookie('token');
		self.config.id = self.setValueFromCookie('loggedUserId');
		self.config.usuario= self.setValueFromCookie('loggedUserName');
		self.config.nombre= self.setValueFromCookie('loggedUserNameName');
		self.config.apellido= self.setValueFromCookie('loggedUserNameLastName');
		self.config.administrar= self.setValueFromCookie('isLoggedUserAdmin');
		self.config.consultar= self.setValueFromCookie('canLoggedUserQuery');
		self.config.ver= self.setValueFromCookie('isLoggedUserAUser');
		self.initConfig(config);
		
	},
	config: {
		baseUrl: window.location.origin + window.location.pathname,
		restUrl: window.location.origin + '/laravel/public/api/',
		sessionToken:'',
		id:	'',
		usuario: '',
		nombre: '',
		apellido: '',
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
	setValueFromCookie:function(cookie){
	    var name = cookie + '=';
    	var ca = document.cookie.split(';');
    	for(var i = 0; i < ca.length; i++) {
        	var c = ca[i];
        	while (c.charAt(0) == ' ') {
            	c = c.substring(1);
        	}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}	
    	}
    	return '';
	},
	setCookie:function(cookie, value){
		document.cookie = cookie + '=' + value;
	},
	deleteCookies: function(){
		var cookies = document.cookie.split(';');
		for(var i = 0; i < cookies.length; i++){
			var cookie = cookies[i].split('=');
			Global.setCookie(cookie[0], "-1; expires=Thu, 21 Sep 1979 00:00:01 UTC;");
		}
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
	getToken:function(){
		return Global.config['sessionToken'];
	},
	getRestUrl:function(){
		return Global.config['restUrl'];
	},
	isAdmin: function() {
		return Global.config['administrar'];
	}




});