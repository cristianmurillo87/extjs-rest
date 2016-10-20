<?php

include_once("Conexion.php");

$cod_predio=pg_escape_string(strtoupper($_POST['cod_predio']));

$c= new Conexion;

$c->conectarBd();

$consulta= sprintf("select a.gid gid, a.lado_manz lado_manz, a.cod_predio cod_predio, a.direccion direccion, a.tipo_atip tipo_atip, a.justificacion justificacion from atipicas a
inner join predios b on a.cod_predio=b.cod_predio where b.cod_predio='%s' or b.num_predia='%s' or b.cod_pred_n='%s'",$cod_predio,$cod_predio,$cod_predio);

$resultado=pg_query($consulta);

if($resultado){

$j=pg_num_rows($resultado);

if($j>0){

$respuesta=array();

while($m=pg_fetch_assoc($resultado)){

	$respuesta[gid]=$m[gid];
	$respuesta[lado_manz]=$m[lado_manz];
	$respuesta[cod_predio]=$m[cod_predio];
	$respuesta[direccion]=$m[direccion];
	$respuesta[tipo_atip]=$m[tipo_atip];
	$respuesta[justificacion]=$m[justificacion];

}

	echo '{"success":'.'"true","data":'.json_encode($respuesta).'}';
}

else{

	echo '{"success":'.'"false", "errors":{"reason": "No existen atipicidades asociadas al predio '.$cod_predio.'"}}';
}

}
else {

	$error_msj=pg_result_error($resultado);

	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
}

$c->desconectarBd()

?>
