<?php

include_once("Conexion.php");

$id_user=pg_escape_string($_REQUEST['id']);
$antigua=pg_escape_string($_REQUEST['oldkey']);
$nueva=pg_escape_string($_REQUEST['newkey']);

$c= new Conexion;

$c->conectarBd();

$consulta=sprintf("update usuarios set contrasena=md5('%s') where oid=%d and contrasena=md5('%s')",$nueva,$id_user,$antigua);

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

	echo '{"success": false, "errors":{"reason": "ERROR"}}';
}

$c->desconectarBd()

?>
