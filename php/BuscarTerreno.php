<?php

include_once("Conexion.php");

$terrenoBuscar=pg_escape_string(strtoupper($_POST['cod_predio']));

$c= new Conexion;

$c->conectarBd();

$consulta= sprintf("select a.cod_predio cod_predio, c.direccion direccion,a.lado_manz lado_manz from terrenos a
inner join predios c on a.cod_predio=c.cod_predio
where c.cod_predio='%s' or c.num_predia='%s' or c.cod_pred_n='%s' order by c.gid limit 1",$terrenoBuscar);

$resultado=pg_query($consulta);

if($resultado){

$j=pg_num_rows($resultado);

if($j>0){

$respuesta=array();

while($m=pg_fetch_assoc($resultado)){

	$respuesta['cod_predio']= $m['cod_predio'];
	$respuesta['direccion']=$m['direccion'];
	$respuesta['lado_manz']=$m['lado_manz'];


}

 	echo '{"success":true,"data":{"resultado":'.json_encode($respuesta).'}}';
}

else{

	echo '{"success": false, "errors":{"reason": "El terreno solicitado no fue encontrado"}}';
}

}

else {

	$error_msj=pg_result_error($resultado);

	echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
}



$c->desconectarBd()

?>
