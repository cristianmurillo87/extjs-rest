<?php

	include_once("../Conexion.php");

    $buscar=$_REQUEST['query'];
	$c= new Conexion;
	$c->conectarBd();
	

	$consulta = "select cod_barrio, nombre from barrios where nombre ilike '%$buscar%' or cod_barrio ilike '%$buscar%' order by cod_barrio";


	$resultado=pg_query($consulta);
	
	if($resultado){


	$respuesta = array();
	while($barrio= pg_fetch_assoc($resultado)) {
	    $respuesta[] = $barrio;
	}

	echo json_encode(array(
		"success" => "true",
		"barrio" => $respuesta
	));
	
	}
	
	else {
	
	$error_msj=pg_result_error($resultado);
	
	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
	}
	
?>