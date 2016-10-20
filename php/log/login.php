<?php
include_once("../Conexion.php");

$usuario=$_POST['usuario'];
$contrasena=$_POST['password'];

$c= new Conexion;

$c->conectarBd();

$consulta= "select a.oid id, a.usuario nom_usuario, a.nombre nombre, a.apellido apellido, 
b.consulta consulta, b.administra administra, b.usuario usuario from usuarios a 
inner join perfil_usuario b on a.id=b.id_usuario where a.usuario='".$usuario."' and a.contrasena=md5('".$contrasena."')";

$resultado=pg_query($consulta);

if($resultado){
  $user = pg_fetch_assoc($resultado);
  
  $user['administra'] = $user['administra']== "t" ? true : false;
  $user['consulta'] = $user['consulta']== "t" ? true : false;
  $user['usuario'] = $user['usuario']== "t" ? true : false;

  if(pg_num_rows($resultado)<1){
    echo json_encode(array("success"=>false, "message"=>"Usuario o contraseña invalidos"));  
  }
  else{
    echo json_encode(array("success" =>true, "message"=>$user));
  }

}
else {
  echo json_encode(array("success"=>false, "messaje"=>"Error al ejecutar consulta"));
}

$c->desconectarBd();

?>