<?php

	include_once("../Conexion.php");
	
	$cantidad = $_REQUEST['start'];
	$limite = $_REQUEST['limit'];

	$c= new Conexion;
	$c->conectarBd();
	

	$consulta = "select a.gid gid, a.lado_manz lado_manz, a.cod_predio cod_predio, a.direccion, a.tipo_atip tipo_atip, 
	a.justificacion justificacion, b.estrato estrato  from atipicas a left outer join lados b on a.lado_manz=b.lado_manz 
	order by a.cod_predio, a.lado_manz limit ".$limite." offset ".$cantidad;


	$resultado=pg_query($consulta);
	
	if($resultado){


	$respuesta = array();
	while($atipicas= pg_fetch_assoc($resultado)) {
	    $respuesta[] = $atipicas;
	}
    
    $cant_reg = pg_query("SELECT count(*) as num FROM atipicas");
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
	
?>