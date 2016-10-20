Ext.define('Estratificacion.view.main.Menu', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.menuppal',
	itemId: 'menuppal',
	//disabledCls:'x-item-enabled',
	items: [{
			text: 'CAPTURA DE INFORMACI&OacuteN',
			plain: true,
			itemId: 'menu-data-capture',
			cls: 'x-btn-default-small',
			menu: [{
				text: 'Crear/ Editar Lado de Manzana',
				itemId: 'op-agregalado'
			}, {
				text: 'Crear/ Editar Atipicidad',
				itemId: 'op-agregatipica'
			}]
		}, {
			text: 'MODIFICACIONES',
			itemId: 'menu-updates',
			plain: true,
			menu: [{
				text: 'Editar Informaci&oacuten de Terreno',
				itemId: 'op-modificaterreno'
			}, {
				text: 'Eliminar Lado de Manzana',
				itemId: 'op-eliminalado'
			}, {
				text: 'Eliminar Atipicidad',
				itemId: 'op-eliminatipica'
			}]
		}, {
			text: 'REPORTES',
			plain: true,
			itemId: 'menu-reports',
			menu: [{
				text: 'Listado de Lados de Manzana',
				itemId: 'op-listalados',
				disabled: false
			}, {
				text: 'Listado de Predios',
				itemId: 'op-listaterrenos',
				disabled: false
			}, {
				text: 'Listado de Atipicidades',
				itemId: 'op-listaatipicas',
				disabled: false
			}, {
				text: 'Consultar Predio',
				itemId: 'op-consultapredio',
				disabled: false
			}]
		}, {
			text: 'ESTADISTICAS',
			plain: true,
			itemId: 'menu-statistics',
			menu: [{
				text: 'Distribuci&oacuten de Estratos',
				itemId: 'op-distrestato'
			}, {
				text: 'Distribuci&oacuten de Estratos por Comuna',
				itemId: 'op-distrcomuna'
			}, {
				text: 'Distribuci&oacuten de Estratos por Barrio',
				disabled: true
			}]
		},
		'->', 'Logueado como:', {
			text: "",
			plain: true,
			itemId: 'menu-user-option',
			menu: [{
				text: 'Cambiar Contrase&ntildea',
				itemId: 'op-cambiaclave'
			}, {
				text: 'Salir',
				itemId: 'op-cerrasesion'
			}]
		}, '', ''

	],
	listeners: {
		beforerender: function(eOpts) {
			var username = Ext.ComponentQuery.query('#menu-user-option')[0];
			var agregalado = Ext.ComponentQuery.query('#op-agregalado')[0];
			var agregatipica = Ext.ComponentQuery.query('#op-agregatipica')[0];
			var modificaterreno = Ext.ComponentQuery.query('#op-modificaterreno')[0];
			var eliminalado = Ext.ComponentQuery.query('#op-eliminalado')[0];
			var eliminatipica = Ext.ComponentQuery.query('#op-eliminatipica')[0];

			var loggedUser = Ext.state.Manager.get('LoggedUserNameName') + " " + Ext.state.Manager.get('LoggedUserNameLastName');

			agregatipica.disabled = !Ext.state.Manager.get('isLoggedUserAdmin');
			agregalado.disabled = !Ext.state.Manager.get('isLoggedUserAdmin');
			modificaterreno.disabled = !Ext.state.Manager.get('isLoggedUserAdmin');
			eliminalado.disabled = !Ext.state.Manager.get('isLoggedUserAdmin');
			eliminatipica.disabled = !Ext.state.Manager.get('isLoggedUserAdmin');
			username.text = loggedUser;

		}
	}


});