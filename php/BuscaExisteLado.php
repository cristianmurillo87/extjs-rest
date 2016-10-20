<?php

include_once("Conexion.php");

$ladoBuscar=pg_escape_string(strtoupper($_POST['lado_manz']));

$c= new Conexion;

$c->conectarBd();

$consulta= sprintf("select  gid, lado_manz, cod_manzana, estrato from lados where lado_manz='%s'",$ladoBuscar);

$resultado=pg_query($consulta);

if($resultado){

$j=pg_num_rows($resultado);

if($j>0){

$respuesta=array();

while($m=pg_fetch_assoc($resultado)){

	$respuesta[gid]=$m[gid];
	$respuesta[lado_manz]=$m[lado_manz];
	$respuesta[cod_manzana]=$m[cod_manzana];
	$respuesta[estrato]=$m[estrato];


}

 echo '{"success":'.'"true","data":'.json_encode($respuesta).'}';
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
