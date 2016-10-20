<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <title>SIG Estratificacion- Iniciar Sesion</title>
        <meta name="author" content="Cristian Murillo" />
        <!-- Date: 2014-09-29 -->
        <!--link rel="stylesheet" type="text/css" href="lib/ext/resources/cris-theme/KitchenSink-all.css"-->
        <!--link rel="stylesheet" type="text/css" href="lib/ext/resources/cris-theme/cris-theme.css"-->
        <link rel="stylesheet" type="text/css" href="lib/ext/resources/ext-theme-gray/ext-theme-gray-all.css">
        <link rel="stylesheet" type="text/css" href="resources/css/app.css">
        <link rel="stylesheet" type="text/css" href="resources/fonts/font-awesome/css/font-awesome.min.css"> 
        <script type="text/javascript" src="lib/ext/ext-all-dev.js"></script>
        <script type="text/javascript" src="app/Validadores.js"></script>
        <style type="text/css">
            body {
            background-color:#CCDAF9!important;
            }
            
            
        </style>
            <script type="text/javascript">
                    

                    Ext.Loader.setConfig({
                        enabled: true,
                        disableCaching: false,
                        paths: {
                            'Ext.ux':'lib/ux',
                            'Estratificacion': 'app'
                            }
                    });
                    
                    Ext.require([
                        'Estratificacion.controller.user.Login',
                        'Estratificacion.view.user.Login',
                        'Estratificacion.Global'
                    ]);

                    Ext.onReady(function(){
                        Ext.QuickTips.init();
                        
                        Ext.create('Estratificacion.view.user.Login');
                            
                    });
    
   
    </script>
    </head>
    <body>

    </body>

</html>