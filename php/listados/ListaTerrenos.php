<?php

	include_once("../Conexion.php");
	
	$cantidad = $_REQUEST['start'];
	$limite = $_REQUEST['limit'];

	$c= new Conexion;
	$c->conectarBd();
	

	$consulta = "select a.gid gid, a.cod_predio cod_predio, a.cod_manzan cod_manzan, b.nombre actividad, a.direccion direccion, a.lado_manz lado_manz 
	from  terrenos a left outer join tipo_actividad b on a.cod_act=b.cod_act order by a.cod_predio, a.gid limit ".$limite." offset ".$cantidad;


	$resultado=pg_query($consulta);
	
	if($resultado){


	$respuesta = array();
	while($predios= pg_fetch_assoc($resultado)) {
	    $respuesta[] = $predios;
	}


	echo json_encode(array(
		"success" => "true",
		"total" => 317203,
		"data" => $respuesta
	));
	
	}
	
	else {
	
	$error_msj=pg_result_error($resultado);
	
	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
	}
	
?>