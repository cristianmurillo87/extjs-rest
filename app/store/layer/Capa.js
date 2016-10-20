var lyrsCatastro = Ext.create('GeoExt.tree.LayerLoader', {
	filter: function(record) {
		var layer = record.getLayer();
		return layer.name == "Terrenos" || layer.name == "Manzanas Catastrales";
	}
});

var lyrsCartoBase = Ext.create('GeoExt.tree.LayerLoader', {
	filter: function(record) {
		var layer = record.getLayer();
		return layer.name == "Ejes Viales" || layer.name == "Barrios";
	}
});

Ext.create('Estratificacion.store.layer.Capa', {
	extend: 'Ext.data.TreeStore',
	model: 'GeoExt.data.LayerTreeModel',
	root: {
		expanded: true,
		text: 'Control de Capas',
		children: [{
			text: 'Catastro',
			plugins: [{
				ptype: 'gx_layercontainer',
				loader: lyrsCartoBase
			}],
			expanded: true
		}, {
			text: 'Capas IDESC',
			plugins: [{
				ptype: 'gx_layercontainer',
				loader: lyrsCatastro
			}],
			expanded: true
		}, {
			text: 'Cartografia Base',
			plugins: [{
				ptype: 'gx_baselayercontainer'
			}],
			expanded: true

		}]
	}
});