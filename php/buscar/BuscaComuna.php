<?php

	include_once("../Conexion.php");
	

	$c= new Conexion;
	$c->conectarBd();
	

	$consulta = "select cod_comuna, nombre from comunas order by cod_comuna";


	$resultado=pg_query($consulta);
	
	if($resultado){


	$respuesta = array();
	while($comuna= pg_fetch_assoc($resultado)) {
	    $respuesta[] = $comuna;
	}
    
	echo json_encode(array(
		"success" => "true",
		"comuna" => $respuesta
	));
	
	}
	
	else {
	
	$error_msj=pg_result_error($resultado);
	
	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
	}
	
?>