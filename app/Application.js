Ext.define('Estratificacion.Application', {
	extend: 'Ext.app.Application',
	requires: [
		'Estratificacion.Global',
		'Ext.ux.LiveSearchGridPanel',
		'Ext.state.*',
		'GeoExt.Action',
		'GeoExt.data.ScaleStore',
		'GeoExt.tree.LayerLoader',
		'GeoExt.tree.Panel',
		'GeoExt.tree.LayerContainer',
		'GeoExt.tree.OverlayLayerContainer',
		'GeoExt.tree.BaseLayerContainer',
		'GeoExt.data.LayerTreeModel'
	],
	views: [
		'Estratificacion.view.main.Viewport',
		'Estratificacion.view.main.Menu',
		'Estratificacion.view.main.Titulo',
		'Estratificacion.view.window.CrearAtipica',
		'Estratificacion.view.grid.elimina.Lado',
		'Estratificacion.view.grid.lista.Lado',
		'Estratificacion.view.grid.lista.Terreno',
		'Estratificacion.view.grid.lista.Atipica',
		'Estratificacion.view.grid.elimina.Lado',
		'Estratificacion.view.window.Terreno',
		'Estratificacion.view.window.EditarTerreno',
		'Estratificacion.view.grid.elimina.Atipica',
		'Estratificacion.view.window.EliminarAtipica',
		'Estratificacion.view.window.Lista',
		'Estratificacion.view.chart.Estrato',
		'Estratificacion.view.user.Contrasena',
		'Estratificacion.view.window.Predio',
		'Estratificacion.view.user.Login'
	],
	stores: [
		'Estratificacion.store.Anden',
		'Estratificacion.store.Antejardin',
		'Estratificacion.store.Fachada',
		'Estratificacion.store.Foco',
		'Estratificacion.store.Garaje',
		'Estratificacion.store.Puerta',
		'Estratificacion.store.Via',
		'Estratificacion.store.Lado',
		'Estratificacion.store.Atipica',
		'Estratificacion.store.Zona',
		'Estratificacion.store.Terreno',
		'Estratificacion.store.Estrato',
		'Estratificacion.store.Grafico',
		'Estratificacion.store.Comuna',
		'Estratificacion.store.Barrio',
		'Estratificacion.store.consulta.Lado',
		'Estratificacion.store.consulta.Atipica'
	],
	models: [
		'Estratificacion.model.Lado',
		'Estratificacion.model.consulta.Lado',
		'Estratificacion.model.Atipica',
		'Estratificacion.model.Terreno',
		'Estratificacion.model.Estrato',
		'Estratificacion.model.Grafico',
		'Estratificacion.model.Comuna',
		'Estratificacion.model.Barrio',
		'Estratificacion.model.Busca',
		'Estratificacion.model.TreeStore'
	],
	controllers: [
		'Estratificacion.controller.Main',
		'Estratificacion.controller.eliminar.Lado',
		'Estratificacion.controller.guardar.Lado',
		'Estratificacion.controller.guardar.Atipica',
		'Estratificacion.controller.guardar.Terreno',
		'Estratificacion.controller.eliminar.Atipica',
		'Estratificacion.controller.lista.Lado',
		'Estratificacion.controller.lista.Terreno',
		'Estratificacion.controller.lista.Atipica',
		'Estratificacion.controller.chart.Estrato',
		'Estratificacion.controller.chart.Comuna',
		'Estratificacion.controller.user.Sesion',
		'Estratificacion.controller.info.Predio',
		'Estratificacion.controller.user.Login'
	],
	launch: function() {
		Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
			expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 8),
			prefix: ''
		}));

		var loggedIn;

		loggedIn = Ext.state.Manager.get('isUserLoggedIn');

		//console.log(loggedIn);

		Ext.widget(loggedIn ? 'main' : 'login');

	}

});