<?php
  //Se recuperan los datos del formulario
  $CP   = $_GET['CP'];
  $num = substr($CP,0,2);
  $provincias= array( 
'01' => 'Alava',
'02' => 'Albacete',
'03' => 'Alicante',
'04' => 'Almeria',
'05' => 'Avila',
'06' => 'Badajoz',
'07' => 'Baleares',
'08' => 'Barcelona',
'09' => 'Burgos',
'10' => 'Caceres',
'11' => 'Cadiz',
'12' => 'Castellon',
'13' => 'Ciudad Real', 	
'14' => 'Cordoba',
'15' => 'La Coruna',
'16' => 'Cuenca',
'17' => 'Gerona',
'18' => 'Granada',
'19' => 'Guadalajara',
'20' => 'Guipuzcoa',
'21' => 'Huelva',
'22' => 'Huesca',
'23' => 'Jaen',
'24' => 'Leon',
'25' => 'Lerida',
'26' => 'La Rioja', 	
'27' => 'Lugo',
'28' => 'Madrid',
'29' => 'Malaga',
'30' => 'Murcia',
'31' => 'Navarra',
'32' => 'Orense',
'33' => 'Asturias',
'34' => 'Palencia',
'35' => 'Las Palmas',
'36' => 'Pontevedra',
'37' => 'Salamanca',
'38' => 'S.C. Tenerife',
'39' => 'Cantabria',
'40' => 'Segovia',
'41' => 'Sevilla',
'42' => 'Soria',
'43' => 'Tarragona',
'44' => 'Teruel',
'45' => 'Toledo',
'46' => 'Valencia',
'47' => 'Valladolid',
'48' => 'Vizcaya',
'49' => 'Zamora',
'50' => 'Zaragoza',
'51' => 'Ceuta',
'52' => 'Melilla'
);
/*
  echo "el numero es: $num <br/>";  
  echo "La provincia es: ".$provincias[$num]."<br />";
  echo "Hay ".count($provincias)." provincias <br />";
  print_r($provincias);
*/
  if (array_key_exists($num, $provincias))
    $dato = utf8_encode($provincias[$num]);
  else
    $dato = utf8_encode("No existe");
      
  $datosjson = json_encode($dato);
  if($_GET['callback']) { 
      echo $_GET['callback']."(".$datosjson.")"; 
      } 
  else 
      echo $datosjson; 		
?>
