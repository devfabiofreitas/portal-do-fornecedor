<?php
	error_reporting(E_STRICT);
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: text/html; charset=UTF-8');

	require_once('../../../../../properties.inc.php');
	require_once('../../../../../properties.db.inc.php');
	require_once( DOFMW . '/Do.class.php');

    $usuarioSessao = $do->getUserSession();
    $usuarioNome = $usuarioSessao['nome'];

    session_destroy();
    echo "<script>top.window.location = '" . HTTP_SERVER . "portal/'</script>";
    exit;

    // Header('Location: '. HTTP_SERVER . 'adm/');

    function pegarIP() {
		$ip = "";
		
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}

		return $ip;
    }
?>