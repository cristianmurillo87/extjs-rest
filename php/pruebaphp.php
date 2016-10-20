<?php
/*
*
*
*
*/
include_once("Conexion.php");


$x=$_REQUEST['x'];
$y=$_REQUEST['y'];

/*$x=1059352.1133289;
$y=871146.24891683;*/

$c= new Conexion;
$c->conectarBd();

//consultar el terreno
$query1= "select cod_predio from terreno where st_intersects(the_geom, st_geomfromtext('POINT(".$x." ".$y.")',97393))";

//consultar los predios
$query2= "select a.cod_pred_n cod_pred_n from predios a inner join terreno b on a.cod_predio=b.cod_predio where st_intersects(b.the_geom,
    st_geomfromtext('POINT(".$x." ".$y.")',97393)) order by a.cod_pred_n";

//consultar la manzana
$query3= "select cod_manzan from manzana where st_intersects(the_geom, st_geomfromtext('POINT(".$x." ".$y.")',97393))";

//consultar los lados de manzana
$query4= "select a.lado_manz lado_manz from lado_mzna a inner join terreno b on a.cod_manzana=b.cod_manzan where st_intersects(b.the_geom,
    st_geomfromtext('POINT(".$x." ".$y.")',97393)) order by a.lado_manz";

//consultar los clientes de Emcali
$query5= "select a.cod_cliente cod_cliente from emcali_cliente a inner join terreno b on a.cod_predio=b.cod_predio where st_intersects(b.the_geom,
    st_geomfromtext('POINT(".$x." ".$y.")',97393)) order by a.cod_cliente";

$resultado1=pg_query($query1);

	if($resultado1){
		$terreno=array();
		while($a= pg_fetch_assoc($resultado1)) {
			$terreno[] = $a;
    }
	}

$resultado2=pg_query($query2);

	if($resultado2){
		$predio=array();
		while($b= pg_fetch_assoc($resultado2)) {
			$predio[] = $b;
    }
	}

$resultado3=pg_query($query3);

	if($resultado3){
		$manzana=array();
		while($c= pg_fetch_assoc($resultado3)) {
			$manzana[] = $c;
    }
	}

$resultado4=pg_query($query4);

	if($resultado4){
		$lado=array();
		while($d= pg_fetch_assoc($resultado4)) {
			$lado[] = $d;
    }
	}
$resultado5=pg_query($query5);

	if($resultado5){
		$cliente=array();
		while($e= pg_fetch_assoc($resultado5)) {
			$cliente[] =$e;
    }
	}
$tree1='[';

$tree1.='{"text":"Terrenos", "leaf":false, "children":[{"text":"'.$terreno[0][cod_predio].'", "leaf":false, "children":[';


    $i=0;
    $j=count($predio)-1;

    while ($i <$j) {

        $tree1.='{"text":"'.$predio[$i][cod_pred_n].'", "leaf":true},';
        $i++;
    }

		$tree1.='{"text":"'.$predio[$i][cod_pred_n].'", "leaf":true}]}]},';


$tree1.='{"text":"Manzana", "leaf":false, "children":[{"text":"'.$manzana[0][cod_manzan].'", "leaf":false, "children":[';

    $i=0;
    $j=count($lado)-1;

    while ($i <$j) {

        $tree1.='{"text":"'.$lado[$i][lado_manz].'", "leaf":true},';
        $i++;
    }

		$tree1.='{"text":"'.$lado[$i][lado_manz].'", "leaf":true}]}]},';



$tree1.='{"text":"Clientes Emcali", "leaf":false, "children":[{"text":"'.$terreno[0][cod_predio].'", "leaf":false, "children":[';


    $i=0;
    $j=count($cliente)-1;

    while ($i <$j) {

        $tree1.='{"text":"'.$cliente[$i][cod_cliente].'", "leaf":true},';
        $i++;
    }

		$tree1.='{"text":"'.$cliente[$i][cod_cliente].'", "leaf":true}]}]}';

$tree1.=']';

echo $tree1;


?>
