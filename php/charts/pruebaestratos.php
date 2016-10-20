<?php

	include_once("../Conexion.php");
	
	//$comuna =intval($_POST['comuna']);
//	$tipo = $_POST['tipo'];
   //$estrato = 2;
   
	$comuna =intval('21');
	$c= new Conexion;
	$c->conectarBd();
	$respuesta;
	$estratos = array('0','1','2','3','4','5','6');
	
	foreach ($estratos as $i){
	$consulta = "select count(a.num_predia) total from predios a inner join  terreno b on a.cod_predio=b.cod_predio left outer join lado_mzna c on b.lado_manz=c.lado_manz where c.sect= $comuna and c.estrato = '$i'";
	$resultado=pg_query($consulta);
	$datos= pg_fetch_array($resultado);
	 $respuesta[] ='{"estrato":"'.$i.'","total":'.(int)$datos[total].'}' ;
  
	}
	
		
	$json=json_encode(array(
		"success" => "true",
		"data" => $respuesta
	));
	
	$buscar=array('"{\"','\":\"','\",\"','["','"]','",{','\":');
    
    $reemplazar=array('{"','":"','","','[',']',',{','":');
    
    echo str_replace($buscar, $reemplazar, $json);
	
?>