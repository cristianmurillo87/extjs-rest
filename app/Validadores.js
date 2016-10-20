		/*Creacion de los respectivos validadores*/
		Ext.apply(Ext.form.field.VTypes, {
			igualclave: function(val, field) {
				if (field.initialPassField) {
					var pwd = Ext.getCmp(field.initialPassField);
					return (val == pwd.getValue());
				}
				return true;
			},
			igualclaveText: 'Las contrase&ntildeas no coinciden'
		});

		Ext.apply(Ext.form.field.VTypes, {
			manzana: function(val) {
				return /([0-9]){8}/.
				test(val);
			},
			manzanaText: 'Unicamente se admiten caracteres n&uacute;mericos'
		});

		Ext.apply(Ext.form.field.VTypes, {
			ladomanzana: function(val) {
				return /([0-9]){8}(?=.*[a-zA-Z])/.
				test(val);
			},
			ladomanzanaText: 'El formato para el lado de manzana es: 11111111A,donde los 8 caracteres numericos corresponden a la manzana y la letra final corresponde al lado'
		});

		Ext.apply(Ext.form.field.VTypes, {
			estrato: function(val) {
				return /([0-6]){1}/.
				test(val);
			},
			estratoText: 'Estrato Socioeconomico: Unicamente se admiten valores de 0 a 6'
		});



		Ext.apply(Ext.form.field.VTypes, {
			zona: function(val) {
				return /([0-1]){1}([0-9]){1}/.
				test(val);
			},
			zonaText: 'Unicamente se admiten valores de 0 a 10'
		});


		Ext.apply(Ext.form.field.VTypes, {
			predio: function(val) {
				return /([0-9]){14}/.
				test(val);
			},
			predioText: 'Este campo admite hasta 14 caracteres, todos deben ser numericos'
		});

		Ext.apply(Ext.form.field.VTypes, {
			lado: function(val) {
				return /([a-zA-Z]){1}/.
				test(val);
			},
			ladoText: 'El valor debe ser una letra'
		});