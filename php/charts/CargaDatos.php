<?php

	include_once("../Conexion.php");
	
	$estrato = $_POST['estrato'];
//	$tipo = $_POST['tipo'];
   //$estrato = 2;
	$c= new Conexion;
	$c->conectarBd();
	

	$consulta = "select count(d.cod_predio) total, d.comuna comuna  from (select a.cod_predio cod_predio, substring(a.cod_predio from 3 for 2) comuna, 
	b.estrato estrato from terrenos a inner join predios c on a.cod_predio=c.cod_predio left outer join lados b on a.lado_manz=b.lado_manz where 
	b.estrato='".$estrato."' order by comuna) d group by d.comuna order by d.comuna";


	$resultado=pg_query($consulta);
	
	if($resultado){


	$respuesta = array();
	while($datos= pg_fetch_array($resultado)) {
	    $respuesta[] ='{"comuna":"'.$datos[comuna].'","total":'.(int)$datos[total].'}' ;
        //$respuesta[total] = ;     
     }
    
	$json=json_encode(array(
		"success" => "true",
		"data" => $respuesta
	));
	
    $buscar=array('"{\"','\":\"','\",\"','["','"]','",{','\":');
    
    $reemplazar=array('{"','":"','","','[',']',',{','":');
    
    echo str_replace($buscar, $reemplazar, $json);
    
	}
	   
	else {
	
	$error_msj=pg_result_error($resultado);
	
	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
	}
	
?>