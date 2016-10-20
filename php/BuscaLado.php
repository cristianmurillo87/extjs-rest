<?php

include_once("Conexion.php");

$ladoBuscar=pg_escape_string(strtoupper($_POST['lado_manz']));

$c= new Conexion;

$c->conectarBd();

$consulta= sprintf("select fl_zona, estrato, fl_via,fl_foco, fl_anden, fl_antejar, fl_garaje, fl_fachada, fl_puerta from lados where lado_manz='%s'",$ladoBuscar);

$resultado=pg_query($consulta);

if($resultado){

$j=pg_num_rows($resultado);

if($j>0){

$respuesta=array();

while($m=pg_fetch_assoc($resultado)){

	$respuesta[fl_via]=$m[fl_via];
	$respuesta[fl_foco]=$m[fl_foco];
	$respuesta[fl_anden]=$m[fl_anden];
	$respuesta[fl_antejar]=$m[fl_antejar];
	$respuesta[fl_garaje]=$m[fl_garaje];
	$respuesta[fl_fachada]=$m[fl_fachada];
	$respuesta[fl_puerta]=$m[fl_puerta];
	$respuesta[fl_zona]= $m[fl_zona];
	$respuesta[estrato]=$m[estrato];


}

 echo '{"success":'.'"true","data":{"resultado":'.json_encode($respuesta).'}}';
}

else{

	echo '{"success":'.'"false", "errors":{"reason": "El lado de manzana solicitado no fue encontrado"}}';
}

}
else {

	$error_msj=pg_result_error($resultado);

	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
}

$c->desconectarBd()

?>
