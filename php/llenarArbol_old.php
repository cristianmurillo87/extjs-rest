<?php

include_once("Conexion.php");




$elemento=$_REQUEST['elemento'];
$x=$_REQUEST['x'];
$y=$_REQUEST['y'];
$consulta;
$consulta2;

$c= new Conexion;
$c->conectarBd();


if($elemento=="terreno"){
    $consulta="select cod_predio as field from terrenos where st_intersects(the_geom, st_geomfromtext('POINT(".$x." ".$y.")',97393))";
    $consulta2="select a.cod_pred_n as text from predios a inner join terrenos b on a.cod_predio=b.cod_predio where st_intersects(b.the_geom, 
    st_geomfromtext('POINT(".$x." ".$y.")',97393)) order by a.cod_pred_n";
}

    else if($elemento=="manzana"){
    $consulta="select cod_manzan as field from manzanas where st_intersects(the_geom, st_geomfromtext('POINT(".$x." ".$y.")',97393))";
   /* $consulta2="select a.lado_manz as text from lado_mzna a left outer join manzana b on a.cod_manzana=b.cod_manzan where st_intersects(b.the_geom, 
    st_geomfromtext('POINT(".$x." ".$y.")',97393)) order by a.lado_manz";*/
    $consulta2="select a.cod_pred_n as text from predios a left outer join terrenos c on a.cod_predio=c.cod_predio left outer join manzanas b on c.cod_manzan=b.cod_manzan where st_intersects(b.the_geom, 
    st_geomfromtext('POINT(".$x." ".$y.")',97393)) order by a.direccion";
}


    $resultado=pg_query($consulta);
    
    if($resultado){
        
    $parent = array();
    while($a= pg_fetch_assoc($resultado)) {
        $parent[] = $a;
    }

    
    $resultado2=pg_query($consulta2);
    
    $children = array();
    while($b= pg_fetch_assoc($resultado2)) {
        $children[] = $b;
    }
   

    
    $t1='[{"text":"'.$parent[0][field].'", "leaf":false, "children":[';
    
    $i=0;
    $j=count($children)-1;
    
    while ($i <$j) { 
        
        $t1.='{"text":"'.$children[$i][text].'", "leaf":true},';
        $i++;
    }
    
    $t1.='{"text":"'.$children[$i][text].'", "leaf":true}]}]';
    
    
    echo $t1;
    
    
    }
    
    else {
    
    $error_msj=pg_result_error($resultado);
    
    echo '{"success": false, "errors":{"reason": "'.$error_msj.'"}}';
    }

?>