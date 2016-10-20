Ext.require([
	'Ext.container.Viewport',
	'Ext.layout.container.Border',
	'Ext.data.Store',
	'GeoExt.tree.Panel',
	'GeoExt.Action',
	'Ext.tree.plugin.TreeViewDragDrop',
	'GeoExt.panel.Map',
	'GeoExt.data.ScaleStore',
	'GeoExt.tree.LayerLoader',
	'GeoExt.tree.OverlayLayerContainer',
	'GeoExt.tree.BaseLayerContainer',
	'GeoExt.data.LayerTreeModel',
	'GeoExt.tree.View',
	'GeoExt.container.WmsLegend',
	'GeoExt.container.UrlLegend',
	'GeoExt.tree.Column',
	'Ext.util.Point',
	'Estratificacion.store.Fachada',
	'Estratificacion.view.main.Menu',
	'Estratificacion.view.main.Titulo'
]);


var apikey = 'AIzaSyDdYoQnPyaa6rF2AV_YfFJQvx0lwIvGBBQ';

var ptitulo = Ext.create('Estratificacion.view.main.Titulo');
var treeStore, x, y, el;
var resultLayer;

var piepanel = Ext.create('Ext.panel.Panel', {
	bodyStyle: 'background:#3A5795',
	height: 20,
	region: 'south',
	border: false

});

var msg=""

// Configuracion de las caracteristicas del mapa

Proj4js.defs["EPSG:3115"] = "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-77.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
Proj4js.defs["EPSG:97393"] = "+proj=tmerc +lat_0=3.441883333 +lon_0=-76.5205625 +k=1 +x_0=1061900.18 +y_0=872364.63 +a=6379137 +b=6357748.961329674 +units=m +no_defs";
var wgs84 = new OpenLayers.Projection("EPSG:4326");
//extent= new OpenLayers.Bounds(-76.59284375946304,3.3317961467786, -76.46124717591583, 3.505867826425403)
extent = new OpenLayers.Bounds(1053794.375, 860093.875, 1068565.125, 879537.75);

mapa = new OpenLayers.Map("Estratificacion", {
	allOverlays: false,
	projection: "EPSG:97393",
	maxExtent: extent,
	units: 'm',
	displayProjection: 'EPSG:97393',
	panMethod: 'null',
	scales: [200, 500, 800, 1000, 1500, 2000, 5000, 6000, 8000, 10000, 15000, 20000, 25000, 30000, 50000, 70000, 80000, 100000, 110000]
});

// Fin de las configuraciones del mapa

// Controles del mapa

var toolbar = [],
	control, controles = {};

toolbar.push(" ");
// Control Navegacion
control = Ext.create('GeoExt.Action', {
	text: '',
	glyph: Global.setIcon('pan'),
	//iconCls:'control-pan',
	control: new OpenLayers.Control.Navigation({
		zoomBoxKeyMask: 1
	}),
	map: mapa,
	tooltip: 'Navegacion',
	pressed: false
});

controles["navegacion"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));

// Control Maxima Extension
control = Ext.create('GeoExt.Action', {
	text: '',
	iconCls: 'max-extent',
	control: new OpenLayers.Control.ZoomToMaxExtent(),
	map: mapa,
	tooltip: 'Extension del Mapa',
	pressed: false
});

controles["max_extent"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));

// Control Zoom a Cuadricula
control = Ext.create('GeoExt.Action', {
	text: '',
	iconCls: 'zoomin',
	control: new OpenLayers.Control.ZoomIn({
		zoomBoxKeyMask: 0
	}),
	map: mapa,
	tooltip: 'Aumentar Zoom',
	pressed: false
});

controles["zoomin"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));

// Control Zoom a Cuadricula
control = Ext.create('GeoExt.Action', {
	text: '',
	iconCls: 'zoomout',
	control: new OpenLayers.Control.ZoomOut(),
	map: mapa,
	tooltip: 'Disminuir Zoom',
	pressed: false
});

controles["zoomout"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));

// Control Zoom Anterior
var nh = new OpenLayers.Control.NavigationHistory();
mapa.addControl(nh);

control = Ext.create('GeoExt.Action', {
	text: '',
	iconCls: 'zoomprev',
	control: nh.previous,
	map: mapa,
	tooltip: 'Zoom Anterior'
});

controles["zoomprev"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));

// Control Zoom Siguiente
control = Ext.create('GeoExt.Action', {
	text: '',
	iconCls: 'zoomnext',
	control: nh.next,
	map: mapa,
	tooltip: 'Zoom Siguiente'
});


controles["zoomprev"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));

// Control Seleccionar
/*control = Ext.create('GeoExt.Action', {
	text: '',
	iconCls: 'select',
	map: mapa,
	tooltip: 'Seleccionar'
});


controles["select"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));*/

// Control Medir Longitud
var sketchStyle = {
	"Point": {
		pointRadius: 6,
		strokeColor: "#ff0000",
		fillColor: "white",
		strokewWidth: 0.5,
		cursor: 'crosshair'
	},
	"Line": {
		strokeColor: "#ff0000",
		strokeWidth: 3,
		strokeDashstyle: "dash",
		cursor: 'crosshair'
	},
	"Polygon": {
		strokeWidth: 1,
		strokeOpacity: 1,
		strokeColor: "#DF0101",
		fillColor: "#F5A9A9",
		fillOpacity: 0.3,
		cursor: 'crosshair'
	}
};

var style = new OpenLayers.Style();
style.addRules([new OpenLayers.Rule({
	symbolizer: sketchStyle
})]);

var styleMap = new OpenLayers.StyleMap({
	'default': style
});

var dist = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
	active: false,
	persist: true,
	immediate: true,
	handlerOptions: {
		layerOptions: {
			styleMap: styleMap
		}
	},
	eventListeners: {
		'measurepartial': function(event) {
			if (toolArea.active) {
				toolArea.deactivate();
			}
			var c = event.geometry.components.length;
			var mparcial;
			if (c < 2) {
				mparcial = event.measure;
			} else {
				var geom = new OpenLayers.Geometry.LineString([
					event.geometry.components[c - 2],
					event.geometry.components[c - 1]
				]);
				var lastLengthArr = this.getBestLength(geom);
				mparcial = lastLengthArr[0].toFixed(3);
				
			}
			
			msg = 'Segmento: ' + mparcial + ' ' + event.units + ' Total: ' + Number(event.measure).toFixed(3) + ' ' + event.units;
			toolbar.push(msg);
			
			/*var l = Ext.Msg.show({
				title: 'Medir Distancia',
				msg: 'Medicion de linea<br>Segmento: ' + mparcial + ' ' + event.units + '</br>Total: ' + Number(event.measure).toFixed(3) + ' ' + event.units,
				padding: '0 2 0 2',
				height: 40,
				closable: true,
				modal: false , buttons:Ext.Msg.OK
			});
			l.setXY([1100, 100]);*/
		}
	}
});



control = Ext.create('GeoExt.Action', {
	text: '',
	itemId: 'measure',
	iconCls: 'measure-lenght',
	control: dist,
	map: mapa,
	enableToggle: true,
	tooltip: "Medir Distancia",
	allowDepress: true,
	listeners: {
		activate: function() {
			mapa.getViewport().style.cursor = 'crosshair';
		},
		deactivate: function() {
			mapa.getViewport().style.cursor = 'auto';
		}
	}
});

mapa.addControl(dist);
controles["measure"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));

// Control Medir Area
var toolArea = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
	persist: true,
	immediate: true,
	handlerOptions: {
		layerOptions: {
			styleMap: styleMap
		}
	},
	eventListeners: {
		'measurepartial': function(event) {
			if (dist.active) {
				dist.deactivate();
			}
			var area = Ext.Msg.show({
				title: 'Area',
				modal: false,
				closable: true,
				x: 1000,
				y: 1000,
				bodyStyle: {
					padding: 10
				},
				msg: Number(event.measure).toFixed(3) + " " + event.units + "²",
				buttons: Ext.Msg.OK
			});
			area.setXY([1100, 100]);

		}
	}
});

control = Ext.create('GeoExt.Action', {
	text: '',
	itemId: 'measure-a',
	iconCls: 'measure-area',
	control: toolArea,
	map: mapa,
	enableToggle: true,
	tooltip: "Medir &Aacuterea",
	allowDepress: true
});
mapa.addControl(dist);
controles["area"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));

// Menu de Escalas
var scale = new OpenLayers.Control.ScaleLine();
mapa.addControl(scale);

var escalas = Ext.create('GeoExt.data.ScaleStore', {
	map: mapa
});
var zoomMenu = Ext.create('Ext.form.ComboBox', {
	store: escalas,
	emptyText: 'Escala',
	listConfig: {
		getInnerTpl: function() {
			return "1: {scale:round(0)}";
		}
	},
	editable: false,
	width: 100,
	triggerAction: 'all',
	queryMode: 'local'
});

zoomMenu.on('select',
	function(combo, record, index) {
		mapa.zoomTo(record[0].get("level"));
	},
	this
);

mapa.events.register('zoomend', this, function() {
	var escala = escalas.queryBy(function(record) {
		return mapa.getZoom() == record.data.level;
	});

	if (escala.length > 0) {
		escala = escala.items[0];
		zoomMenu.setValue("1 : " + parseInt(escala.data.scale));
	} else {
		if (!zoomMenu.rendered)
			return;
		zoomMenu.clearValue();
	}
});





var coord = new OpenLayers.Control.MousePosition({
	div: document.getElementById("fondo"),
	prefix: 'Coordenada: ',
	numDigits: 3,
	suffix: ' metros'
});
mapa.addControl(coord);

var sv_window = Ext.create('Ext.window.Window', {
	title: 'Street View',
	width: 600,
	height: 500,
	glyph: Global.setIcon('streetview'),
	resizable: false,
	modal: false,
	layout: 'fit',
	closeAction: 'hide',
	listeners: {
		close: function() {
			//streetViewCtrl.deactivate();
			mapa.getViewport().style.cursor = 'auto';
		}
	}
});

OpenLayers.Control.Click = OpenLayers.Class(
	OpenLayers.Control, {
		defaultHandlerOptions: {
			'single': false,
			'double': true,
			'pixelTolerance': 0,
			'stopSingle': false,
			'stopDouble': true
		},
		initialize: function(options) {
			this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
			OpenLayers.Control.prototype.initialize.apply(this, arguments);
			this.handler = new OpenLayers.Handler.Click(this, {
				'dblclick': this.trigger
			}, this.handlerOptions);
		},
		trigger: function(e) {
			var lonlat = mapa.getLonLatFromViewPortPx(e.xy);
			var lonlatwgs84 = lonlat.clone().transform(new OpenLayers.Projection('EPSG:3115'), new OpenLayers.Projection('EPSG:4326'));
			var html = '<iframe width="595" height="465" frameborder="0" style:"border:0" src="https://www.google.com/maps/embed/v1/streetview?key=' + apikey + '&location=' + lonlatwgs84.lat + ',' + lonlatwgs84.lon + '"></iframe>';
			if (!sv_window.isVisible()) {
				sv_window.update(html);
				sv_window.show();
			} else {
				sv_window.update(html);
			}
		},
		CLASS_NAME: "OpenLayers.Control.Click"
	});

var streetViewCtrl = new OpenLayers.Control.Click();
mapa.addControl(streetViewCtrl);
streetViewCtrl.activate();


// Control Informacion
OpenLayers.Control.Click = OpenLayers.Class(
	OpenLayers.Control, {
		defaultHandlerOptions: {
			'single': true,
			'double': false,
			'pixelTolerance': 0,
			'stopSingle': false,
			'stopDouble': false
		},
		initialize: function(options) {
			this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
			OpenLayers.Control.prototype.initialize.apply(this, arguments);
			this.handler = new OpenLayers.Handler.Click(this, {
				'click': this.trigger
			}, this.handlerOptions);
		},
		trigger: function(e) {
			this.x = x;
			this.y = y;
			this.el = el;
			var lonlat = mapa.getLonLatFromViewPortPx(e.xy);
			x = lonlat.lon;
			y = lonlat.lat;
			treeStore.proxy.extraParams = {
				x: x,
				y: y
			};
			treeStore.load();
		},
		CLASS_NAME: "OpenLayers.Control.Click"
	});

var identiCtrl = new OpenLayers.Control.Click();
mapa.addControl(identiCtrl);

control = Ext.create('GeoExt.Action', {
	text: '',
	itemId: 'btn-identifica',
	iconCls: 'infotool',
	tooltip: 'Identificar',
	control: identiCtrl,
	map: mapa,
	listeners: {
		click: function() {
			if (!infoVentana.isVisible()) {
				infoVentana.show();
				mapa.getViewport().style.cursor = 'help';
			}
		}
	}

});

controles["info"] = control;
toolbar.push(Ext.create('Ext.button.Button', control));

control = Ext.create('GeoExt.Action', {
	text: '',
	itemId: 'btn-borraresultado',
	iconCls: 'clear-selected',
	tooltip: 'Borrar Resultado',
	listeners: {
		click: function() {
			resultLayer.removeAllFeatures();
		}
	}
});

controles["clear"] = control;

toolbar.push(Ext.create('Ext.button.Button', control));
toolbar.push("");
toolbar.push(zoomMenu);
toolbar.push("");

var resultStyle = new OpenLayers.Style({
	fillColor: "#ff0000",
	fillOpacity: 0.4,
	strokeColor: "#ff0000",
	strokeOpacity: 0.8,
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeDashstyle: "solid",
	cursor: "inherit"
});

var resultStyleMap = new OpenLayers.StyleMap({
	'default': resultStyle
});
resultLayer = new OpenLayers.Layer.Vector("Resultado", {
	styleMap: resultStyleMap
});

//toolbar.push("->");
toolbar.push(msg);




// Fin de los controles
//Creacion del map panel
var pmapa = Ext.create('GeoExt.panel.Map', {
	region: 'center',
	map: mapa,
	zoom: 6,
	layers: [
		new OpenLayers.Layer.WMS(
			"Ortofoto Cali (2010)",
			"http://172.18.10.127/cgi-bin/mapserv.exe?map=E:/ms4w/Apache/maps/papiros.map&", {
				layers: 'Ortofoto Cali (2010)',
				transparent: true,
				projection: wgs84
			}, {
				displayOutsideMaxExtent: true,
				displayInLayerSwitcher: true,
				visibility: false,
				isBaseLayer: false,
				transitionEffect: 'resize'
			}
		),

		new OpenLayers.Layer.WMS(
			"Terrenos", "http://172.18.10.127:8081/geoserver/app_estratificacion/wms", {
				layers: 'app_estratificacion:terreno',
				transparent: true,
				SRS: 'EPSG:97393',
				format: 'image/png'
			}, {
				displayOutsideMaxExtent: true,
				displayInLayerSwitcher: true,
				isBaseLayer: false,
				minScale: 5000,
				transitionEffect: null,
				yx: {
					'SR-ORG:97393': false
				}
			}
		),
		new OpenLayers.Layer.WMS(
			"Estrato por Terreno", "http://172.18.10.127:8081/geoserver/app_estratificacion/wms", {
				layers: 'app_estratificacion:terreno_estrato',
				transparent: true,
				format: 'image/png'
			}, {
				displayOutsideMaxExtent: true,
				displayInLayerSwitcher: true,
				isBaseLayer: false,
				minScale: 7000,
				transitionEffect: null,
				yx: {
					'SR-ORG:97393': false
				}
			}
		),
		new OpenLayers.Layer.WMS(
			"Clientes Emcali", "http://172.18.10.127:8081/geoserver/app_estratificacion/wms", {
				layers: 'app_estratificacion:emcali_cliente',
				transparent: true,
				format: 'image/png'
			}, {
				displayOutsideMaxExtent: true,
				displayInLayerSwitcher: true,
				isBaseLayer: false,
				minScale: 1200,
				transitionEffect: null,
				yx: {
					'SR-ORG:97393': false
				}
			}
		),
		new OpenLayers.Layer.WMS(
			"Ejes Viales",
			"http://172.18.10.127:8081/geoserver/app_estratificacion/wms", {
				layers: 'app_estratificacion:ejes_viales',
				transparent: true,
				format: 'image/png'
			}, {
				displayOutsideMaxExtent: true,
				displayInLayerSwitcher: true,
				isBaseLayer: false,
				singleTile: true,
				minScale: 12000,
				transitionEffect: null,
				yx: {
					'SR-ORG:97393': false
				}
			}
		),
		new OpenLayers.Layer.WMS(
			"Manzanas Catastrales", "http://172.18.10.127:8081/geoserver/app_estratificacion/wms", {
				layers: 'app_estratificacion:manzana',
				transparent: true,
				format: 'image/png'
			}, {
				displayOutsideMaxExtent: true,
				displayInLayerSwitcher: true,
				isBaseLayer: false,
				minScale: 25000,
				transitionEffect: null,
				yx: {
					'SR-ORG:97393': false
				}
			}
		),
		new OpenLayers.Layer.WMS(
			"Barrios", "http://172.18.10.127:8081/geoserver/app_estratificacion/wms", {
				layers: 'app_estratificacion:barrio',
				transparent: true,
				format: 'image/png'
			}, {
				displayOutsideMaxExtent: true,
				isBaseLayer: false,
				displayInLayerSwitcher: true,
				minScale: 30000,
				transitionEffect: null,
				yx: {
					'SR-ORG:97393': false
				}
			}
		),
		new OpenLayers.Layer.WMS(
			"Comunas", "http://172.18.10.127:8081/geoserver/app_estratificacion/wms", {
				layers: 'app_estratificacion:comuna',
				transparent: true,
				format: 'image/png'
			}, {
				displayOutsideMaxExtent: true,
				displayInLayerSwitcher: true,
				isBaseLayer: false,
				yx: {
					'SR-ORG:97393': true
				}
			}
		),
		new OpenLayers.Layer.WMS(
			"Base",
			"http://172.18.10.127:8081/geoserver/app_estratificacion/wms", {
				layers: 'app_estratificacion:base',
				transparent: true,
				format: 'image/png'
			}, {
				displayOutsideMaxExtent: true,
				displayInLayerSwitcher: false,
				isBaseLayer: true,
				transitionEffect: null,
				yx: {
					'SR-ORG:97393': false
				}
			}
		),

		resultLayer
	],
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: toolbar
	}]
});
//Fin del map panel
//Configuracion del panel de control de mapas
//Capas Estratificacion
var lyrsEstratificacion = Ext.create('GeoExt.tree.LayerLoader', {
	filter: function(record) {
		var layer = record.getLayer();
		return layer.name == "Estrato por Terreno";
	}
});
//capas catastrales
var lyrsCatastro = Ext.create('GeoExt.tree.LayerLoader', {
	filter: function(record) {
		var layer = record.getLayer();
		return layer.name == "Terrenos" || layer.name == "Manzanas Catastrales";
	}
});

//capas raster
var lyrsRaster = Ext.create('GeoExt.tree.LayerLoader', {
	filter: function(record) {
		var layer = record.getLayer();
		return layer.name == "Ortofoto Cali (2010)";
	}
});


// capas IDESC

var lyrsCartoBase = Ext.create('GeoExt.tree.LayerLoader', {
	filter: function(record) {
		var layer = record.getLayer();
		return layer.name == "Ejes Viales" || layer.name == "Barrios" || layer.name == "Comunas";
	}
});


var lyrsEmcali = Ext.create('GeoExt.tree.LayerLoader', {
	filter: function(record) {
		var layer = record.getLayer();
		return layer.name == "Clientes Emcali";
	}
});

//Creacion del store para almacenar y organizar las capas

var lyrstore = Ext.create('Ext.data.TreeStore', {
	require: ['GeoExt.tree.LayerContainer'],
	model: 'GeoExt.data.LayerTreeModel',
	root: {
		expanded: true,
		children: [{
			text: 'Emcali',

			plugins: [{
				ptype: 'gx_layercontainer',
				loader: lyrsEmcali
			}],
			expanded: true
		}, {
			text: 'Estratificacion',

			plugins: [{
				ptype: 'gx_layercontainer',
				loader: lyrsEstratificacion
			}],
			expanded: true
		}, {
			text: 'Catastro',

			plugins: [{
				ptype: 'gx_layercontainer',
				loader: lyrsCatastro
			}],
			expanded: true
		}, {
			text: 'Capas IDESC',
			plugins: [{
				ptype: 'gx_layercontainer',
				loader: lyrsCartoBase
			}],
			expanded: true
		}, {
			text: 'Imagenes Aereas',

			plugins: [{
				ptype: 'gx_layercontainer',
				loader: lyrsRaster
			}],
			expanded: true
		}, {
			text: 'Cartografia Base',
			plugins: ['gx_baselayercontainer'],
			expanded: true
		}]
	}
});

//Fin del panel de control de capas

//Creacion del panel en panel de control de mapas

var treepanel = Ext.create('GeoExt.tree.Panel', {
	//  region:'west',
	title: 'Control de capas',
	width: 290,
	padding: '0 0 5 1',
	//height:410,
	border: false,
	store: lyrstore,
	rootVisible: false,
	lines: false
});

var legendPanel = Ext.create('GeoExt.panel.Legend', {
	//region:'west',
	width: 250,
	title: 'Leyenda',
	border: false,
	baseParams: {
		width: 20,
		height: 20,
		legend_options: 'fontName:Arial;fontSize:10;fontAntialiasing:true;dpi:180'
	},
	defaults: {
		labelCls: 'mylabel',
		style: 'padding:5px;'

	},
	height: 600
		//autoScroll: true
});


var pcapas = Ext.create('Ext.panel.Panel', {
	require: ['GeoExt.tree.Panel',
		'GeoExt.tree.LayerLoader',
		'GeoExt.panel.Legend'
	],
	region: 'west',
	width: 300,
	//defaults:{style:'background-color:white;'},
	//	padding:'0',//'1 2 0 3',
	split: true,
	layout: 'vbox',
	border: false,
	items: [
		treepanel, legendPanel
	]

});




//funciones para el panel de busquedas


//panel de busquedas

var buscapredio = {
	xtype: 'textfield',
	id: 'tab-buscar-buscapredio',
	itemId: 'tab-buscar-buscapredio',
	name: 'cod_predio',
	width: 200,
	emptyText: 'Escriba el codigo del predio',
	padding: '6',
	minLength: 13,
	maxLength: 30,
	enforceMaxLength: true,
	listeners: {
		specialkey: {
			fn: function(field, e) {
				if (e.getKey() == e.ENTER && field.isValid()) {
					selectFeature(field, e);
				}
			}
		}
	}

};



var buscalado = {
	xtype: 'textfield',
	id: 'tab-buscar-buscalado',
	itemId: 'tab-buscar-buscalado',
	padding: '6',
	name: 'lado_manz',
	minLength: 9,
	maxLength: 9,
	enforceMaxLength: true,
	width: 200,
	emptyText: 'Escriba el lado de manzana',
	vtype: 'ladomanzana',
	listeners: {
		specialkey: {
			fn: function(field, e) {
				if (e.getKey() == e.ENTER && field.isValid()) {
					selectFeature(field, e);
				}
			}
		}
	}
};



var buscamanzana = {
	xtype: 'textfield',
	id: 'tab-buscar-buscamanzana',
	itemId: 'tab-buscar-buscamanzana',
	name: 'cod_manzana',
	width: 200,
	emptyText: 'Escriba el codigo de la manzana',
	padding: '6',
	minLength: 8,
	maxLength: 8,
	enforceMaxLength: true,
	vtype: 'manzana',
	listeners: {
		specialkey: {
			fn: function(field, e) {
				if (e.getKey() == e.ENTER && field.isValid()) {
					selectFeature(field, e);
				}
			}
		}
	}
};

//stores para comuna y barrio
var comunastore = Ext.create('Estratificacion.store.Comuna');
var barriostore = Ext.create('Estratificacion.store.Barrio');


var buscabarrio = {
	xtype: 'combobox',
	id: 'tab-buscar-buscabarrio',
	name: 'cod_barrio',
	store: barriostore,
	queryMode: 'remote',
	displayField: 'nombre',
	valueField: 'cod_barrio',
	forceSelection: true,
	triggerAction: 'all',
	minChars: 3,
	allowBlank: false,
	typeAhead: true,
	hideTrigger: true,
	width: 200,
	padding: '6',
	emptyText: 'Nombre o codigo del barrio',
	listeners: {
		select: {
			fn: function(combo, record) {
				selectFeature(combo, record);
			}
		}
	}


};

var buscacomuna = {
	xtype: 'combobox',
	id: 'tab-buscar-buscacomuna',
	name: 'cod_comuna',
	store: comunastore,
	queryMode: 'remote',
	displayField: 'nombre',
	valueField: 'cod_comuna',
	editable: false,
	forceSelection: true,
	triggerAction: 'all',
	allowBlank: false,
	width: 200,
	padding: '6',
	emptyText: 'Nombre o codigo de la comuna',
	listeners: {
		select: {
			fn: function(combo, record) {
				selectFeature(combo, record);
			}
		}
	}
};


var pbuscar = Ext.create('Ext.panel.Panel', {
	height: 170,
	border: false,
	layout: {
		type: 'accordion',
		hideCollapseTool: true
	},
	items: [{
		title: 'Busqueda por Codigo Predial',
		items: [buscapredio]
	}, {
		title: 'Busqueda por Lado de Manzana',
		items: [buscalado]
	}, {
		title: 'Busqueda por Manzana',
		items: [buscamanzana]
	}, {
		title: 'Busqueda por Barrio',
		items: [buscabarrio]
	}, {
		title: 'Busqueda por Comuna',
		items: [buscacomuna]
	}]
});



var selectFeature = function(field, e) {
	//if (e.getKey()==e.ENTER && field.isValid()){
	OpenLayers.Request.POST({

		url: 'php/geometrias/geometria.php',
		params: {
			codigo: field.value,
			campo: field.name
		},
		success: function(response) {

			field.setValue("");

			var json = new OpenLayers.Format.JSON();
			var wkt = new OpenLayers.Format.WKT();

			var data = Ext.JSON.decode(response.responseText);

			if (data.success == 'true') {

				if (data.geometria.length > 0) {
					resultLayer.removeAllFeatures();
					var geometria = wkt.read(data.geometria[0].wkt);
					resultLayer.addFeatures(geometria);
					var extent = resultLayer.getDataExtent();
					mapa.zoomToExtent(extent);

				} else {
					Ext.Msg.show({
						title: 'Aviso',
						msg: 'Ubicaci&oacuten no disponible',
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.WARNING
					});
					field.setValue("");

				}
			} else if (data.geometria.lenght == 'false') {

				Ext.Msg.show({
					title: 'Aviso',
					msg: 'Ubicaci&oacuten no disponible',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.WARNING
				});
				field.setValue("");
			}
		},
		failure: function(response) {

			Ext.Msg.show({
				title: 'Error',
				msg: 'No fue posible llevar a cabo la operaci&oacuten',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.ERROR
			});
			field.setValue("");


		}
	});
	//	}
};
//fin del panel de busquedas

//ventanas para la herramienta identificar

var property = Ext.create('Ext.grid.property.Grid', { //property grid en la que se mostraran los campos de los elementos seleccionados
	width: 295,
	height: 340,
	padding: 10,
	scroll: true,
	listeners: {
		'beforeselect': {
			fn: function() {
				return false;
			}
		}
	}
});

var buscaStore = Ext.create('Ext.data.Store', { // definir las opcciones para el combobox
	model: 'Estratificacion.model.Busca',
	fields: ['elemento', 'nombre'],
	data: [{
		elemento: 'terreno',
		nombre: 'Terreno'
	}, {
		elemento: 'manzana',
		nombre: 'Manzana'
	}],
	autoLoad: false
});


treeStore = Ext.create('Ext.data.TreeStore', { //para almacenar los registros anotados por la consulta
	model: 'Estratificacion.model.TreeStore',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		url: 'php/llenarArbol.php'

	},
	root: {
		text: 'Resultado',
		iconCls: '',
		expanded: true,
		loaded: true
	}
});


var treePanel = Ext.create('Ext.tree.Panel', { //para mostrar los resultados de la consulta
	width: 295,
	height: 200,
	padding: 10,
	cls: 'tree-node',
	//scroll:true,
	border: true,
	store: treeStore,
	rootVisible: true,
	listeners: {
		/*	itemclick:{
				fn:function(tree, record, item, index, e, options){
					getInfo(tree, record, item, index, e, options);
				}
			},*/
		select: {
			fn: function(tree, record, item, index, e, options) {
				getInfo(tree, record, item, index, e, options);
			}
		}
	}
});

var getInfo = function(tree, record, item, index, e, options) { // obtiene informacion de los elementos del tree y los despliega en el property grid
	var nodo = record.data.text;
	var tamano = nodo.length;
	var q = record.parentNode;
	var propiedades;


	if (nodo != "Terreno" && nodo != "Manzana" && nodo != "Clientes Emcali" && nodo != "Resultado" && nodo != null && nodo != undefined && nodo != '') {

		var p = q.parentNode.data.text;

		if (p == "Resultado") {
			p = q.data.text;
		}

		Ext.Ajax.request({
			url: 'php/property.php',
			params: {
				elemento: p,
				valor: nodo,
				size: tamano
			},
			success: function(response) {

				var data = Ext.JSON.decode(response.responseText);


				if (data.success == "true") {




					if (p == "Manzana") {

						if (tamano == 8) {
							propiedades = {
								"Id": data.data[0].gid,
								"Manzana": data.data[0].cod_manzana,
								"Barrio": data.data[0].barrio,
								"Comuna": data.data[0].comuna
							};

						} else if (tamano == 9) {
							propiedades = {
								"Id": data.data[0].gid,
								"Lado": data.data[0].lado_manz,
								"Manzana": data.data[0].cod_manzana,
								"Estrato": data.data[0].estrato
							};
						}
					} //fin del if para Manzana
					else if (p == "Terreno") {

						if (tamano == 14) {
							propiedades = {
								"Id": data.data[0].gid,
								"Cod. Terreno": data.data[0].cod_predio,
								"Lado": data.data[0].lado_manz,
								"Direccion": data.data[0].direccion,
								"Actividad": data.data[0].cod_act,
								"Estrato": data.data[0].estrato,
								"Atipico": data.data[0].tipo_atip
							};
						} else if (tamano == 30) {
							propiedades = {
								"Id": data.data[0].gid,
								"Cod. Terreno": data.data[0].cod_predio,
								"Cod. Nacional": data.data[0].cod_pred_n,
								"Cod. Predial": data.data[0].num_predia,
								"Lado": data.data[0].lado_manz,
								"Direccion": data.data[0].direccion,
								"Actividad": data.data[0].cod_act,
								"Estrato": data.data[0].estrato,
								"Atipico": data.data[0].tipo_atip
							};
						}
					} else if (p == "Clientes Emcali") {
						propiedades = {
							"Id": data.data[0].gid,
							"Nombre": data.data[0].nombre,
							"N° Cliente": data.data[0].cod_cliente,
							"Direccion": data.data[0].direccion,
							"Cod. Terreno": data.data[0].cod_predio
						};


					} else {
						propiedades = {
							"": ""
						};
					}

					property.setSource(propiedades);




				}

			}
		});
	} else {
		propiedades = {
			"": ""
		};

		property.setSource(propiedades);
	}

};

var infoVentana = Ext.create('Ext.window.Window', { //ventana para mostrar el arbol con elementos encontrados y la informacion de los elementos identificados
	title: 'Identificar',
	width: 300,
	height: 580,
	resizable: false,
	modal: false,
	border: false,
	cls: 'infoventana',
	closeAction: 'hide',
	items: [
		treePanel,
		property

	],
	listeners: {
		afterrender: function() {
			identiCtrl.activate();
		},
		show: function() {

			identiCtrl.activate();
			property.setSource({
				"": ""
			});

		},
		close: function() {

			identiCtrl.deactivate();
			property.setSource({
				"": ""
			});
			mapa.getViewport().style.cursor = 'auto';

		}
	}
});

//fin de la ventana para la herramienta identificar
var tabpanel = Ext.create('Ext.tab.Panel', {
	region: 'west',
	padding: '0 3 0 0',
	width: 250,
	plain: false,
	items: [{
		title: 'Capas',
		padding: '0 0 0 0',
		items: [pcapas]
	}, {
		title: 'Buscar',
		items: [pbuscar]
	}]
});
//creacion del de la clase Viewport

Ext.define('Estratificacion.view.main.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Ext.container.Viewport',
		'Ext.layout.container.Border',
		'Ext.toolbar.Toolbar',
		'GeoExt.Action',
		'GeoExt.panel.Map',
		'GeoExt.Action',
		'GeoExt.tree.Panel',
		'GeoExt.data.ScaleStore',
		'GeoExt.tree.OverlayLayerContainer',
		'GeoExt.tree.BaseLayerContainer',
		'GeoExt.data.LayerTreeModel',
		'GeoExt.tree.View',
		'GeoExt.tree.Column',
		'GeoExt.tree.LayerLoader',
		'Ext.tip.*',
		'Ext.Button',
		'Ext.ux.LiveSearchGridPanel',
		'Estratificacion.view.main.Menu',
		'Estratificacion.view.main.Titulo',
		'Estratificacion.view.window.CrearAtipica',
		'Estratificacion.view.grid.elimina.Lado',
		'Estratificacion.view.window.EliminarLado'
	],
	layout: 'border',
	//plugins: 'viewport',
	alias: 'widget.main',
	xtype: 'main',
	items: [
		ptitulo, pmapa, tabpanel, piepanel
	]

});