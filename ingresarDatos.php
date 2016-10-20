<?php

$consultaBd= "host= 172.18.10.127 port= 5432 dbname= bd_form_rural user= postgres password= adminestra10A";

$conexion= pg_connect($consultaBd) or die ('Conexion Fallida');

$pid=intval($_POST['id']);
$p5=$_POST['p5'];
$p6=$_POST['p6'];
$p7=$_POST['p7'];
$fotos= $_POST['fotos'];
$obs= strtoupper($_POST['form-text-obs']);

if($conexion){
 $q="insert into public.tbl_ermita(id,p5,p6,p7,foto,observacion) values ($pid,'$p5','$p6','$p7','$fotos','$obs');";
 
 $res=pg_query($q);
 $i=pg_affected_rows($res);
 if($i>0){
	echo '{"success":'.'"true","data":{"msj":"OK"}}'; 
 }
 else{
	echo '{"success": false, "errors":{"reason": "Error en la conexion a la base de datos"}}';
 }
}
else {
	echo '{"success": false, "errors":{"reason": "Error en la conexion a la base de datos"}}';
	}
?>