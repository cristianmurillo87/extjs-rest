<?php

	include_once("Conexion.php");

    /*$buscar=$_REQUEST['query'];*/
	$c= new Conexion;
	$c->conectarBd();
	

	$consulta= "select cod_predio from terrenos where cod_predio= '01059500040768'";
    $consulta2="select cod_pred_n as text from predios where cod_predio= '01059500040768'";


	$resultado=pg_query($consulta);
	
	if($resultado){


	$parent = array();
	while($a= pg_fetch_assoc($resultado)) {
	    $parent[] = $a;
	}

    
    $resultado2=pg_query($consulta2);
    

    $children = array();
    while($b= pg_fetch_assoc($resultado2)) {
        $children[] = $b;
    }
	/*echo json_encode(array(
		"success" => "true",
		"barrio" => $respuesta
     * $respuesta[0]['cod_predio']
	));*/
	
	$buscar=array('}]"','\"');
    
    $reemplazar=array('}]','"');
    
    $t1='[{"text":"'.$parent[0][cod_predio].'", "leaf":false, "children":[';
    
    $i=0;
    while ($i <count($children)-1) { 
        
        $t1.='{"text":"'.$children[$i][text].'", "leaf":true},';
        $i++;
    }
    
    $t1.='{"text":"'.$children[$i][text].'", "leaf":true}]}]';
    
/*$json= '['.json_encode(array(
        "text" => $parent[0]['cod_predio'].', "leaf":false, "children":'.json_encode(array_values($children))
    )).']';
    
    
    
    
    echo str_replace($buscar,$reemplazar,$json);*/
    
    echo $t1;
    
	
	}
	
	else {
	
	$error_msj=pg_result_error($resultado);
	
	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
	}
	
?>