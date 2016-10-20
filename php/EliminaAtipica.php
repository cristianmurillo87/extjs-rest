<?php

include_once("Conexion.php");

$cod_predio=pg_escape_string(strtoupper($_POST['predio']));

$c= new Conexion;

$c->conectarBd();

$consulta= sprintf("delete from atipicas where cod_predio='%s'",$cod_predio);

$resultado=pg_query($consulta);

if($resultado){

$j=pg_affected_rows($resultado);

if($j>0){
	echo '{"success":'.'"true","data":{"msj":"OK"}}';
}

else{
	echo '{"success":'.'"false", "errors":{"reason": "NO"}}';
}

}
else {

	$error_msj=pg_result_error($resultado);

	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
}

$c->desconectarBd()

?>
