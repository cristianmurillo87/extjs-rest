<?php

	include_once("Conexion.php");

    $elemento=pg_escape_string($_POST['elemento']);
		if($_POST['valor']=='' || $_POST['valor']==null){
			$valor='00';
		}
		else{
			$valor=pg_escape_string(strtoupper($_POST['valor']));
		}

    $tamano=intval($_POST['size']);
    $consulta;





	$c= new Conexion;
	$c->conectarBd();

	if ($elemento == "Terreno"){
		if ($tamano==14 ){
			$consulta="select a.gid gid, a.cod_predio cod_predio, a.lado_manz lado_manz, a.direccion direccion, a.cod_act cod_act, b.estrato estrato, c.tipo_atip tipo_atip from terrenos a
			inner join lados b on a.lado_manz=b.lado_manz left outer join atipicas c on a.cod_predio=c.cod_predio where a.cod_predio='".$valor."'";

		}
		else if($tamano==13){
			$consulta="select a.gid, a.cod_predio cod_predio,a.num_predia num_predia,a.cod_pred_n cod_pred_n, b.lado_manz lado_manz,
			a.direccion direccion, a.cod_act cod_act, c.estrato estrato, d.tipo_atip tipo_atip from predios a left outer join terrenos b
			on a.cod_predio=b.cod_predio left outer join lados c on b.lado_manz=c.lado_manz left outer join atipicas d
			on a.cod_predio=d.cod_predio where a.num_predia='".$valor."'";

		}
		else if($tamano==30){
			$consulta="select a.gid, a.cod_predio cod_predio,a.num_predia num_predia,a.cod_pred_n cod_pred_n, b.lado_manz lado_manz,
			a.direccion direccion, a.cod_act cod_act, c.estrato estrato, d.tipo_atip tipo_atip from predios a left outer join terrenos b
			on a.cod_predio=b.cod_predio left outer join lados c on b.lado_manz=c.lado_manz left outer join atipicas d
			on a.cod_predio=d.cod_predio where a.cod_pred_n='".$valor."'";

		}
		getProperties($consulta);
	}

	else if ($elemento == "Manzana"){
		if($tamano==8){

			$consulta="select a.gid, a.cod_manzan cod_manzana, (a.cod_barrio||'- '|| b.nombre) barrio, c.nombre comuna from manzanas a inner join barrios b on
			a.cod_barrio=b.cod_barrio inner join comunas c on  b.cod_comuna=c.cod_comuna where cod_manzan='".$valor."'";
		}

		if($tamano==9){
			$consulta="select gid, lado_manz, cod_manzana, estrato from lados where lado_manz='".$valor."'";
		}
		getProperties($consulta);
	}


	else if ($elemento == "Clientes Emcali"){
			$consulta="select gid, nombre, direccion, cod_cliente, cod_predio from emcali_clientes where cod_cliente='".$valor."'";
			getProperties($consulta);
	}

	function getProperties($query){
		$resultado=pg_query($query);

		$cant= pg_num_rows($resultado);

		if($resultado && $cant> 0){
			$respuesta = array();
			while($barrio= pg_fetch_assoc($resultado)) {
					$respuesta[] = $barrio;
			}

			if($respuesta[0][tipo_atip]){

			if (is_null($respuesta[0][tipo_atip])){
					$respuesta[0][tipo_atip]="";
				}
			}
			echo json_encode(array(
				"success" => "true",
				"data" => $respuesta
			));
			}

			else {
				echo '{"success": "false", "data":[{"":""}]}';
			}
		}


?>
