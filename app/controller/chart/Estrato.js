Ext.define('Estratificacion.controller.chart.Estrato', {
	extend: 'Ext.app.Controller',
	models: [
		'Estratificacion.model.Estrato',
		'Estratificacion.model.Grafico'
	],
	stores: [
		'Estratificacion.store.Estrato',
		'Estratificacion.store.Estrato'
	],
	views: ['Estratificacion.view.chart.Estrato'],

	init: function(application) {
		this.control({
			"#op-distrestato": {
				click: this.abrirDistrEstrato
			},
			"button#btn-distrEstrato": {
				click: this.genDistrGrafico
			}
		});
	},
	abrirDistrEstrato: function(btn, e, eOpts) {
		this.crearDistrEstrato();

	},
	crearDistrEstrato: function() {

		var ventana = Ext.getCmp('vent-grafico');
		if (!ventana) {
			var distrEstrato = Ext.create('Estratificacion.view.chart.Estrato');

			return distrEstrato;
		} else if (!ventana.isVisible()) {
			ventana.setVisible(true);
		}
	},
	genDistrGrafico: function(btn, e, eOpts) {

		var mascara = new Ext.LoadMask(Ext.getCmp('graficarea'), {
			msg: 'Generando gr&aacutefico...'
		});
		mascara.show();

		var buscachart = Ext.getCmp('graficarea');
		var grafico = Ext.getCmp('grafico');

		if (grafico) {
			buscachart.remove(grafico);
		}

		var tipo = Ext.getCmp('tipo_g').getValue();

		var estrato = Ext.getCmp('v-estrato').getValue();

		Ext.Ajax.request({
			url: 'php/charts/CargaDatos.php',
			params: {
				estrato: estrato
			},
			success: function(response) {

				var store = Ext.create('Ext.data.JsonStore', {
					fields: ['comuna', 'total']

				});

				var data = Ext.JSON.decode(response.responseText);


				var render = Ext.getCmp('graficarea');

				if (data.success == 'true') {


					store.loadRawData(data.data);

					if (tipo == 'pie') {

						var chart = Ext.create('Ext.chart.Chart', {
							width: 400,
							height: 300,
							store: store,
							id: 'grafico',
							legend: {
								position: 'right'
							},
							theme: 'Base:gradients',
							series: [{
								type: 'pie',
								angleField: 'total',
								showInLegend: true,
								tips: {
									trackMouse: true,
									width: 120,
									height: 28,
									renderer: function(storeItem, item) {

										var total = 0;
										store.each(function(rec) {
											total += rec.get('total');
										});
										this.setTitle('Comuna ' + storeItem.get('comuna') + ': ' + Math.round(storeItem.get('total') / total * 100) + '%');
									}
								},
								highlight: {
									segment: {
										margin: 15
									}
								},
								label: {
									field: 'comuna',
									display: 'rotate',
									contrast: true,
									font: '18px Arial'
								}


							}]
						});

						render.add(chart);
						mascara.hide();
					} else if (tipo == 'column') {
						var chart = Ext.create('Ext.chart.Chart', {
							width: 400,
							height: 300,
							id: 'grafico',
							animate: true,
							theme: 'Base:gradients',
							store: store,
							axes: [{
								type: 'Numeric',
								position: 'left',
								fields: ['total'],
								label: {
									renderer: Ext.util.Format.numberRenderer('0,0')
								},
								title: 'Cantidad de predios',
								grid: true,
								minimum: 0
							}, {
								type: 'Category',
								position: 'bottom',
								fields: ['comuna'],
								title: 'Comuna'
							}],
							series: [{
								type: 'column',
								axis: 'left',
								highlight: true,
								tips: {
									trackMouse: true,
									width: 160,
									height: 28,
									renderer: function(storeItem, item) {
										this.setTitle('Comuna ' + storeItem.get('comuna') + ': ' + storeItem.get('total') + ' predios');
									}
								},
								renderer: function(sprite, record, attr, index, store) {
									return Ext.apply(attr, {
										fill: "#04B486",
										stroke: "#000",
										"stroke-width": 1

									});
								},
								xField: 'comuna',
								yField: 'total'
							}]
						});

						render.add(chart);
						mascara.hide();
					} else if (tipo == 'bar') {
						var chart = Ext.create('Ext.chart.Chart', {
							width: 400,
							height: 300,
							id: 'grafico',
							animate: true,
							theme: 'Base:gradients',
							store: store,
							axes: [{
								type: 'Numeric',
								position: 'bottom',
								fields: ['total'],
								label: {
									renderer: Ext.util.Format.numberRenderer('0,0')
								},
								title: 'Cantidad de predios',
								grid: true,
								minimum: 0
							}, {
								type: 'Category',
								position: 'left',
								fields: ['comuna'],
								title: 'Comuna'
							}],
							series: [{
								type: 'bar',
								axis: 'bottom',
								highlight: true,
								tips: {
									trackMouse: true,
									width: 160,
									height: 28,
									renderer: function(storeItem, item) {
										this.setTitle('Comuna ' + storeItem.get('comuna') + ': ' + storeItem.get('total') + ' predios');
									}
								},
								renderer: function(sprite, record, attr, index, store) {
									return Ext.apply(attr, {
										fill: "#04B486",
										stroke: "#000",
										"stroke-width": 1

									});
								},
								xField: 'comuna',
								yField: 'total'
							}]
						});


					}

					render.add(chart);
					mascara.hide();




				}
			}
		});

	}

});