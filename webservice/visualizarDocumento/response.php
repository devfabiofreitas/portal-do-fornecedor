<?php
if (isset($_GET['caminho'])) {
	$caminho = $_GET['caminho'];
} else {
	echo "Argumento inválido";
	echo "<br>";
}
$headers = apache_request_headers();
if ((isset($headers['Authorization'])) && ($headers['Authorization'] == 'Bearer qVlzjBWjoRakKIcDCUNAjzYGGF7KBRZ57odwOmtBU9S8xlm62c3413fa7e8a')) {
	$file = "../../internetfiles/" . $caminho;
	header("Content-type: application/pdf");
	header("Content-Length: " . filesize($file));

	echo file_get_contents($file);
} else {
	echo "Bearer Token inválido!";
}
