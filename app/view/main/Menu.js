Ext.define('Estratificacion.view.main.Menu', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.menuppal',
	itemId: 'menuppal',
	//disabledCls:'x-item-enabled',
	items: [{
			text: '<i class="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;CONSULTAS',
			plain: true,
			itemId: 'menu-data-capture',
			cls: 'x-btn-default-small',
			menu: [{
					text: 'Consultar Predio',
					itemId: 'op-consultapredio'
					},{
					text: 'Consular Lado de Manzana',
					itemId: 'op-agregalado'
					},{
					text: 'Consultar Atipicidad',
					itemId: 'op-agregatipica'
				}]
			},,{
			text: '<i class="fa fa-list" aria-hidden="true"></i>&nbsp;&nbsp;LISTADOS',
			plain: true,
			itemId: 'menu-reports',
			menu: [{
				text: 'Listado de Lados de Manzana',
				itemId: 'op-listalados'
			}, {
				text: 'Listado de Predios',
				itemId: 'op-listaterrenos'
			}, {
				text: 'Listado de Atipicidades',
				itemId: 'op-listaatipicas'
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
			var loggedUser = Global.setValueFromCookie('loggedUserNameName') + " " + Global.setValueFromCookie('loggedUserNameLastName');
			username.text = loggedUser;

			Ext.ComponentQuery.query('#op-consultapredio')[0].disabled = !Global.isAdmin();
			Ext.ComponentQuery.query('#op-agregalado')[0].disabled = !Global.isAdmin();
			Ext.ComponentQuery.query('#op-agregatipica')[0].disabled = !Global.isAdmin();
		}
	}


});