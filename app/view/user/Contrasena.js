/**
 * @author Cristian Murillo
 */

Ext.define('Estratificacion.view.user.Contrasena', {
	extend: 'Ext.window.Window',
	title: 'Cambiar Contrase&ntildea',
	modal: true,
	border: false,
	layout: 'fit',
	closable: true,
	width: 300,
	height: 180,
	autoShow: false,
	resizable: false,
	items: [{
		xtype: 'form',
		layout: 'anchor',
		id: 'frm-cambiaclave',
		bodyStyle: 'background:rgb(248,248,248);',
		width: 300,
		border: false,
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Contrase&ntildea Actual',
			name: 'actualclave',
			id: 'actualclave',
			margin: '10 10 10 10',
			allowBlank: false,
			minLength: 8,
			maxLength: 40,
			inputType: 'password'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Contrase&ntildea Nueva',
			name: 'nuevaclave',
			id: 'nuevaclave',
			margin: '5 10 10 10',
			allowBlank: false,
			minLength: 8,
			maxLength: 40,
			inputType: 'password',
			vtype: 'igualclave'
		}, {
			xtype: 'textfield',
			fieldLabel: ' Repita Contrase&ntildea',
			name: 'nuevaclave2',
			id: 'nuevaclave2',
			margin: '5 10 2 10',
			allowBlank: false,
			minLength: 8,
			maxLength: 40,
			inputType: 'password',
			vtype: 'igualclave',
			initialPassField: 'nuevaclave'

		}]
	}],
	buttons: [{
		xtype: 'button',
		text: 'Cambiar',
		itemId: 'btn-cambiaclave'
	}, {
		xtype: 'button',
		text: 'Cancelar',
		itemId: 'cancela'
	}],
	buttonAlign: 'center'

});