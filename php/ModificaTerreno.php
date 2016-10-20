<?php

include_once("Conexion.php");

$cod_predio=pg_escape_string(strtoupper($_POST['cod_predio']));
$manzana=pg_escape_string($_POST['manzana']);
$lado=pg_escape_string(strtoupper($_POST['cod_lado']));
$direccion=pg_escape_string(strtoupper($_POST['direccion']));
$lado_manz=pg_escape_string($manzana.$lado);

$c= new Conexion();

$c->conectarBd();

$consulta= "UPDATE terrenos set direccion='".$direccion."', lado_manz='".$lado_manz."' where cod_predio='".$cod_predio."';
UPDATE atipicas set lado_manz='".$lado_manz."' where cod_predio='".$cod_predio."';";


$resultado=pg_query($consulta);

if($resultado){

$j=pg_affected_rows($resultado);

if($j!=0){
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
