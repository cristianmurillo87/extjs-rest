<?php

	include_once("../Conexion.php");

    $buscar=strtoupper($_REQUEST['codigo']);
    $campo=$_REQUEST['campo'];


	$c= new Conexion;
	$c->conectarBd();
	
    if ($campo=='cod_predio'){
	   $consulta = "select st_astext(a.the_geom) wkt from terrenos a inner join predios b on a.cod_predio=b.cod_predio where b.cod_predio='".$buscar."' or b.num_predia='".$buscar."' or b.cod_pred_n='".$buscar."'";
    }
    else if ($campo=='cod_manzana'){
        $consulta = "select st_astext(the_geom) wkt from manzanas where cod_manzan='".$buscar."'";  
    }
    else if ($campo=='lado_manz'){
         $consulta = "select st_astext(st_union(the_geom)) wkt from terrenos where lado_manz='".$buscar."'";
    }
    else if($campo=='cod_barrio'){
        $consulta = "select st_astext(the_geom) wkt from barrios where cod_barrio='".$buscar."'";
    }
    else if($campo=='cod_comuna'){
        $consulta = "select st_astext(the_geom) wkt from comunas where cod_comuna='".$buscar."'";
    }


	$resultado=pg_query($consulta);
	
	if($resultado){
		$num = pg_num_rows($resultado);
		if($num < 1 && $campo == 'cod_predio'){
			$resultado = pg_query("select st_astext(the_geom) wkt from terrenos where cod_predio='".$buscar."'");
		}

	$respuesta = array();
	while($geometria= pg_fetch_assoc($resultado)) {
	    $respuesta[] = $geometria;
	}

	echo json_encode(array(
		"success" => "true",
		"geometria" => $respuesta
	));
	
	}
	
	else {
	
	$error_msj=pg_result_error($resultado);
	
	echo '{"success": "false", "errors":{"reason": "'.$error_msj.'"}}';
	}
	
?>