<?php
error_reporting(E_STRICT);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=UTF-8');
require_once('../../../../../properties.inc.php');
require_once('../../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');

if (!isset($_POST['usuario']) || $_POST['usuario'] == '' || !isset($_POST['senha']) || $_POST['senha'] == '') {
	echo '{"success": false, "mensagem": "Dados de login não enviados."}';
	exit;
}

$usuario = $_POST['usuario'];
$senha = hash('sha512', $_POST['senha']);

$params = $_POST['params'];

$sqlCommand = ' SELECT ';
$sqlCommand .= ' usuario, codigo, tentativas, situacao, TIMESTAMPDIFF(day, dataTentativa, dataHoraAtual()) AS quantidadeDias ';
$sqlCommand .= ' FROM ';
$sqlCommand .= ' usuarios  ';
$sqlCommand .= ' WHERE  ';
$sqlCommand .= ' usuario = ' . $do->prepareDataToSQLQuery("string", addslashes($usuario)) . ' ';
// echo $sqlCommand;
$do->selectDBInstance('portaldofornecedor');

$do->begin();
$result = $do->execute($sqlCommand, "SELECT", "");
$do->commit();
$elements = $do->toJSON($result);

if (count($elements) > 0) {

	$user = $elements[0];

	if ($user['situacao'] == 'D' && $user['tentativas'] >= 4) {
		echo '{"success":false, "status":"bloqueado", "message":"Usuário bloqueado por quantidade excessiva de tentativas! Contate o administrador", "alias":"BLOCKED"}';
		exit;
	} else if ($user['situacao'] == 'D') {
		echo '{"success":false, "status":"bloqueado", "message":"Usuário bloqueado! Contate o administrador", "alias":"BLOCKED"}';
		exit;
	} else {

		$sqlCommand = ' SELECT ';
		$sqlCommand .= ' codigo, situacao ';
		$sqlCommand .= ' FROM ';
		$sqlCommand .= ' usuarios  ';
		$sqlCommand .= ' WHERE  ';
		$sqlCommand .= ' usuario = ' . $do->prepareDataToSQLQuery("string", addslashes($usuario)) . ' ';
		$sqlCommand .= ' AND ';
		$sqlCommand .= ' senha = ' . $do->prepareDataToSQLQuery("string", addslashes($senha)) . ' ';
		$sqlCommand .= ' AND ';
		$sqlCommand .= ' situacao = "H"; ';

		$do->begin();
		$result = $do->execute($sqlCommand, "SELECT", "");
		$do->commit();
		$elements = $do->toJSON($result);

		if (count($elements) == 1) {
			$user = $elements[0];

			if ($user['situacao'] == 'D') {
				echo '{"success":false, "status":"bloqueado", "message":"Usuário bloqueado! Contate o administrador", "alias":"BLOCKED"}';
				exit;
			} else {

				$sqlCommand = ' SELECT ';
				$sqlCommand .= ' codigo, nome, email, lancamentoHoras, clt, documento, cpf,  ';
				$sqlCommand .= '	IF( ';
				$sqlCommand .= ' 		(SELECT rtg.codigo from responsaveis_tecnicos rtg WHERE rtg.Lider_codigo = responsaveis_tecnicos.codigo  LIMIT 1) ';
				$sqlCommand .= '  > 0, "S", "N") AS isLider ';

				$sqlCommand .= ' FROM ';
				$sqlCommand .= ' responsaveis_tecnicos';
				$sqlCommand .= ' WHERE ';
				$sqlCommand .= ' Usuario_codigo = ' . $user['codigo'];
				$sqlCommand .= ' AND ';
				$sqlCommand .= ' situacao <> "D" ';



				$do->begin();
				$result = $do->execute($sqlCommand, "SELECT", "");
				$do->commit();
				$elements = $do->toJSON($result);
				$acesso = false;

				if (count($elements) == 1) {

					$sqlCommand = ' UPDATE ';
					$sqlCommand .= ' usuarios ';
					$sqlCommand .= ' SET ';
					$sqlCommand .= ' ultimoAcesso = dataHoraAtual(), ';
					$sqlCommand .= ' tentativas = "0" ';
					$sqlCommand .= ' WHERE ';
					$sqlCommand .= ' codigo = ' . $user['codigo'];

					$do->begin();
					$result = $do->execute($sqlCommand, "UPDATE", "");
					$do->commit();

					$objectControlAccess = array("user" => $elements[0], "tempo_permitido" => mktime(date('H:i:s')));
					$_SESSION["BlueshiftPortalSession"] = $objectControlAccess;
					$acesso = true;
				} else if (count($elements) > 1) {

					for ($x = 0; $x < count($elements); $x++) {

						if (isset($params["responsavelTecnico"]) && $elements[$x]['codigo'] == $params["responsavelTecnico"]) {

							$objectControlAccess = array("user" => $elements[$x], "tempo_permitido" => mktime(date('H:i:s')));
							$_SESSION["BlueshiftPortalSession"] = $objectControlAccess;
							$acesso = true;
							break;
						}
					}
				} else {
					echo '{"success": false, "message":"Responsável técnico bloqueado ou inexistente! Contate o administrador"}';
					exit;
				}

				if ($acesso) {
					echo '{"success": true, "message":"Acesso liberado"}';
					exit;
				} else {
					echo '{"success": true, "message":"Responsáveis técnicos encontrados" , "elements": ' . json_encode($elements) . '}';
					exit;
				}
			}
		} else {

			if ($user['quantidadeDias'] >= 1) {
				$sqlCommand = ' UPDATE ';
				$sqlCommand .= ' usuarios  ';
				$sqlCommand .= ' SET ';
				$sqlCommand .= ' tentativas = "0" ';
				$sqlCommand .= ' WHERE ';
				$sqlCommand .= ' codigo = ' . $user['codigo'];

				$do->begin();
				$result = $do->execute($sqlCommand, "UPDATE", "");
				$do->commit();
			}

			$novatentativa = $user['tentativas'] + 1;

			if ($novatentativa >= 4) {

				$sqlCommand = ' UPDATE ';
				$sqlCommand .= ' usuarios  ';
				$sqlCommand .= ' SET ';
				$sqlCommand .= ' tentativas =  ' . $novatentativa . ' , ';
				$sqlCommand .= ' situacao = "D" ';
				$sqlCommand .= ' WHERE ';
				$sqlCommand .= ' codigo = ' . $user['codigo'];

				$do->begin();
				$result = $do->execute($sqlCommand, "UPDATE", "");
				$do->commit();

				echo '{"success": false, "status":"bloqueado", "message":"Usuário bloqueado por quantidade excessiva de tentativas! Contate o administrador"}';
				exit;
			} else {

				$sqlCommand = ' UPDATE ';
				$sqlCommand .= ' usuarios  ';
				$sqlCommand .= ' SET ';
				$sqlCommand .= ' tentativas =  ' . $novatentativa . ' , ';
				$sqlCommand .= ' dataTentativa = dataHoraAtual() ';
				$sqlCommand .= ' WHERE ';
				$sqlCommand .= ' codigo = ' . $user['codigo'];

				$do->begin();
				$result = $do->execute($sqlCommand, "UPDATE", "");
				$do->commit();

				echo '{"success": false, "message":"Usuário inexistente ou senha incorreta.", "tentativas":"' . $novatentativa . '"}';
				exit;
			}

			echo '{"success": false, "message":"Usuário inexistente ou senha incorreta"}';
			exit;
		}
	}
} else {
	echo '{"success":false, "status":"inexistente", "message":"Usuário inexistente! Contate o administrador"}';
	exit;
}