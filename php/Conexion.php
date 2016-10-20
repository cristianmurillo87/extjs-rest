<?php


class Conexion {

	private $conexion;

	public function __construct() {}

	public function conectarBd (){

		$consultaBd= "host= 172.18.10.127 port= 5432 dbname= bd_estratificacion user= postgres password= adminestra10A";
		$conexion= pg_connect($consultaBd) or die ('Conexion Fallida');


		if ($conexion) {

			$conexion=$this->conexion;
		//	echo "Conectado a la base de datos exitosamente!!";

		}

		else {
			echo '{"success": false, "errors":{"reason": "Error en la conexion a la base de datos"}}';
		}
	}


	public function desconectarBd(){
		pg_close();
	//	echo "Desconectado Exitosamente, vuelva pronto!!";

	}
}




?>
