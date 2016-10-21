var cod_predio = {
	xtype: 'textfield',
	labelWidth: 250,
	width: 250,
	labelSeparator: '',
	fieldLabel: 'C&oacutedigo del Predio',
	labelAlign: 'top',
	itemId: 'field-cod_predio',
	id: 'field-cod_predio',
	margin: 10,
	allowBlank: 'false',
	maxLength: 30,
	minLength: 13,
	value: "",
	enforceMaxLength: true,
	listeners: {
		specialkey: {
			fn: function(field, e) {
				if (e.getKey() == e.ENTER) {
					if (field.isValid()) {
						infoPredio(field);
					}
				}
			}
		},
		beforerender: {
			fn: function(field, eOpts) {
				field.reset();
			}
		}
	}
};

var properties = Ext.create('Ext.grid.property.Grid', { //property grid en la que se mostraran los campos de los elementos seleccionados
	width: 280,
	height: 290,
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

var infoPredio = function(field) { // obtiene informacion de los elementos del tree y los despliega en el property grid
	
	properties.setSource({"":""});
	var terreno = field.value;

	var keys = ["gid", "cod_predio", "num_predia", "cod_pred_n", "direccion", "cod_act", "cod_manzan", "lado_manz", "estrato", "tipo_atip"];
	var values = ["ID", "Cod. Terreno", "Cod. Predial", "Cod. Nacional",  "Direccion", "Actividad", "Manzana","Lado", "Estrato", "Atipico"];
	var propiedades ={};

	$.ajax({
		url:Global.config['restUrl'] + 'terrenos/'+ terreno.toUpperCase(),
		type:'GET',
		data:{"token":Global.getToken()},
		dataType:'json',
		success:function(data, status, jqXHR){
			var features = data.data.features[0];
			propiedades = features.properties;
			propiedades = JSON.stringify(propiedades);

			for(var i =0; i < keys.length; i++){
				propiedades = propiedades.replace(keys[i], values[i]);
			}

			propiedades = JSON.parse(propiedades);
			properties.setSource(propiedades);

		},
		error:function(jqXHR, status, error){
			properties.setSource({"Resultado": jqXHR.responseJSON.errors.reason});

		}

	});
};




Ext.define('Estratificacion.view.window.Predio', { //ventana para mostrar el arbol con elementos encontrados y la informacion de los elementos identificados
	extend: 'Ext.window.Window',
	title: 'Consultar Predio',
	itemId: 'win-infopredio',
	width: 295,
	height: 400,
	resizable: false,
	modal: false,
	border: false,
	glyph: Global.setIcon('info'),
	cls: 'infoventana',
	closeAction: 'hide',
	autoShow: true,
	items: [
		cod_predio,
		properties

	],
	listeners: {
		show: function() {
			properties.setSource({
				"": ""
			});

		},
		close: function() {
			properties.setSource({
				"": ""
			});
			Ext.ComponentQuery.query('#field-cod_predio')[0].reset();
			//cod_predio.reset();

		}
	}
});