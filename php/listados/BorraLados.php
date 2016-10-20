<?php

	include_once("../Conexion.php");
	
	$info = $_POST['data'];
	
	$datos=json_decode($info);
	
	$gid= $datos->gid;
	

	$c= new Conexion;
	$c->conectarBd();
	

	$consulta = "DELETE from lados where gid= $gid";


	$resultado=pg_query($consulta);
	
	if($resultado){




	echo json_encode(array(
		"success" => "true"
	));
	
	}
	
	else {
	
	$error_msj=pg_result_error($resultado);
	
	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
	}
	
?>