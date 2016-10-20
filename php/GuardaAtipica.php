<?php

include_once("Conexion.php");

$cod_predio=pg_escape_string($_POST['cod_predio']);
$lado_manz=pg_escape_string(strtoupper($_POST['lado_manz']));
$direccion=pg_escape_string(strtoupper($_POST['direccion']));
$tipo=pg_escape_string(strtoupper($_POST['tipo']));
$estrato=pg_escape_string($_POST['estrato_atip']);
$justificacion=pg_escape_string(strtoupper($_POST['justificacion']));

$c= new Conexion;

$c->conectarBd();

$consulta= sprintf("delete from atipicas where cod_predio='%s';
			INSERT INTO atipicas (lado_manz, cod_predio, direccion, tipo_atip, justificacion, observacion)
			values ('%s','%s','%s','%s','%s', '');
			select * from atipicas where cod_predio='%s';",$cod_predio,$lado_manz,$cod_predio,$direccion,$tipo,$justificacion,$cod_predio);

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
