Ext.define('Estratificacion.controller.chart.Comuna', {
	extend: 'Ext.app.Controller',
	models: [
		'Estratificacion.model.Comuna',
		'Estratificacion.model.Grafico'
	],
	stores: [
		'Estratificacion.store.Comuna',
		'Estratificacion.store.Grafico'
	],
	views: [
		'Estratificacion.view.chart.Estrato'
	],
	init: function(application) {
		this.control({
			"#op-distrcomuna": {
				click: this.abrirDistrEstrato
			},
			"button#btn-distrComuna": {
				click: this.genDistrGrafico
			}
		});
	},
	abrirDistrEstrato: function(btn, e, eOpts) {
		this.crearDistrEstrato();
	},
	crearDistrEstrato: function() {

		var gstore = Ext.create('Estratificacion.store.Grafico');
		var cstore = Ext.create('Estratificacion.store.Comuna');

		var ventana = Ext.getCmp('vent-grafico');

		if (!ventana) {
			var distrEstrato = Ext.create('Estratificacion.view.chart.Estrato', {
				tbar: [
					'', 'Gr&aacutefico ', {
						xtype: 'combobox',
						text: '&lt;',
						tooltip: 'Seleccionar Gr&aacutefico',
						width: 90,
						store: gstore,
						queryMode: 'local',
						displayField: 'nombre',
						valueField: 'tipo',
						value: 'column',
						name: 'tipo',
						id: 'tipo_g',
						itemId: 'tipo_g',
						forceSelection: true,
						allowBlank: false,
						triggerAction: 'all',
						anyMatch: true
					},
					'', '-', '', 'Estrato ', {
						xtype: 'combobox',
						text: '&lt;',
						tooltip: 'Seleccionar Comuna',
						width: 90,
						store: cstore,
						queryMode: 'local',
						displayField: 'nombre',
						valueField: 'cod_comuna',
						value: '1',
						name: 'comuna',
						id: 'v-comuna',
						itemId: 'v-comuna',
						forceSelection: true,
						allowBlank: false,
						triggerAction: 'all',
						anyMatch: true
					},
					'', {
						xtype: 'button',
						text: 'Generar',
						iconCls: 'grafico',
						itemId: 'btn-distrComuna'
					},
					'', '-'
				]
			});

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
		var comuna = Ext.getCmp('v-comuna').getValue();

		Ext.Ajax.request({
			url: 'php/charts/Comuna.php',
			params: {
				comuna: comuna
			},
			success: function(response) {

					var store = Ext.create('Ext.data.JsonStore', {
						fields: ['estrato', 'total']
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
											this.setTitle('Estrato ' + storeItem.get('estrato') + ': ' + Math.round(storeItem.get('total') / total * 100) + '%');
										}
									},
									highlight: {
										segment: {
											margin: 15
										}
									},
									label: {
										field: 'estrato',
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
									fields: ['estrato'],
									title: 'Estrato'
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
											this.setTitle('Estrato ' + storeItem.get('estrato') + ': ' + storeItem.get('total') + ' predios');
										}
									},
									renderer: function(sprite, record, attr, index, store) {
										return Ext.apply(attr, {
											fill: "#04B486",
											stroke: "#000",
											"stroke-width": 1
										});
									},
									xField: 'estrato',
									yField: 'total'
								}]
							}); //end chart

							render.add(chart);
							mascara.hide();
						} // end else column
						else if (tipo == 'bar') {
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
									fields: ['estrato'],
									title: 'Estrato'
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
											this.setTitle('Estrato ' + storeItem.get('estrato') + ': ' + storeItem.get('total') + ' predios');
										}
									},
									renderer: function(sprite, record, attr, index, store) {
										return Ext.apply(attr, {
											fill: "#04B486",
											stroke: "#000",
											"stroke-width": 1
										});
									},
									xField: 'estrato',
									yField: 'total'
								}]
							});
						} //end else bar
						render.add(chart);
						mascara.hide();
					}
				} //end success
		}); //end request

	}
});