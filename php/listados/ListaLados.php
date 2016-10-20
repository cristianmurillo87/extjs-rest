<?php

	include_once("../Conexion.php");

	$cantidad = $_REQUEST['start'];
    $limite = $_REQUEST['limit'];

	$c= new Conexion;
	$c->conectarBd();


	$consulta = "SELECT * FROM lados order by lado_manz limit ".$limite." offset ".$cantidad;


	$resultado=pg_query($consulta);

	if($resultado){


	$respuesta = array();
	while($lados= pg_fetch_assoc($resultado)) {
	    $respuesta[] = $lados;
	}


	$cant_reg = pg_query("SELECT count(*) as num FROM lados");
	$row = pg_fetch_assoc($cant_reg);
	$total = $row['num'];


	echo json_encode(array(
		"success" => "true",
		"total" => $total,
		"data" => $respuesta
	));

	}

	else {

	$error_msj=pg_result_error($resultado);

	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
	}

		$c->desconectarBd();
?>
