<?php

include_once("Conexion.php"));

$lado_manz=pg_escape_string(strtoupper($_POST['lado_manz']));
$cod_manzana=pg_escape_string(substr($lado_manz, 0, -1));
$fl_via=pg_escape_string($_POST['fl_via']);
$fl_foco=pg_escape_string($_POST['fl_foco']);
$fl_anden=pg_escape_string($_POST['fl_anden']);
$fl_antejar=pg_escape_string($_POST['fl_antejar']);
$fl_garaje=pg_escape_string($_POST['fl_garaje']);
$fl_fachada=pg_escape_string($_POST['fl_fachada']);
$fl_puerta=pg_escape_string($_POST['fl_puerta']);
$fl_zona=pg_escape_string($_POST['fl_zona']);
$estrato=pg_escape_string($_POST['estrato']);

$c= new Conexion);

$c->conectarBd());

$consulta= "delete from lados where lado_manz='$lado_manz';
			INSERT INTO lados (lado_manz,cod_manzana,fl_zona,estrato, fl_via,fl_foco, fl_anden, fl_antejar, fl_garaje, fl_fachada, fl_puerta)
			values ('$lado_manz','$cod_manzana','$fl_zona','$estrato','$fl_via','$fl_foco','$fl_anden','$fl_antejar','$fl_garaje','$fl_fachada','$fl_puerta');
			select * from lados where lado_manz='$lado_manz');";

$resultado=pg_query($consulta));

if($resultado){

$j=pg_affected_rows($resultado));

if($j>0){
	echo '{"success":'.'"true","data":{"msj":"El lado de manzana fue agregado exitosamente"}}');
}

else{
	echo '{"success":'.'"false", "errors":{"reason": "No se pudo agregar el lado de manzana"}}');
}

}

else {

	$error_msj=pg_result_error($resultado));

	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}');
}

$c->desconectarBd()

?>
