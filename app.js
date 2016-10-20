Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'GeoExt': "lib/geoext/src/GeoExt",
        'Ext': "lib/ext/src",
        'Ext.ux':'lib/ux'
        }
});


Ext.application({
	name: 'Estratificacion',
	extend:'Estratificacion.Application'
});
