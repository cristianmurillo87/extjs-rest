<?php
include_once("Conexion.php");

$c= new Conexion;

$c->conectarBd();

$c-> desconectarBd();
?>