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
	var terreno = field.value;
	var elemento = "Terreno";
	var tamano = terreno.length;

	Ext.Ajax.request({
		url: 'php/property.php',
		params: {
			elemento: elemento,
			valor: terreno,
			size: tamano
		},
		success: function(response) {

			var data = Ext.JSON.decode(response.responseText);
			var propiedades;

			if (data.success == "true") {

				switch (tamano) {

					case 13:
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

						break;

					case 14:
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

						break;

					case 30:
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

						break;

					default:
						propiedades = {
							"": ""
						};
				}

				properties.setSource(propiedades);




			}

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