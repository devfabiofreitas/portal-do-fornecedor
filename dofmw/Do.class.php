<?php
//************************************
//*** CONFIGURACAO DE PRODUCAO *******
//************************************
session_start();

class DoFramwork{

	public $instance;
	public $instances;
	public $last_inserted_id;
	public $queryResult;

	
	function setInstanceDB( $key, $properties ){
		$this->instances[ $key ] = $properties;

	}

	function getInstanceDB(){
        $db = $this->instance;
		if($db){
			foreach ( $this->instances as $key => $value ) {
				// if ( $key == $db["name"] ){
				if ( $value['name'] == $db["name"] ){
					return $value["instance"];
				}
			}
		} else {
			return $this->instances[DEFAULT_DB]["instance"];
		}
	}

	function getDBParameters(){
		return $this->connectionParameter;
	}


	/**
	 * Seleciona uma instancia do banco dados
	 * que ja esteja inicializada
	 * 
	 * @param string $db_name nome do banco de dados
	 * como definido no properties.db.inc.php
	 * ex.: 'portaldofornecedor' ou 'administrativo'
	 * 
	 * @return bool true se foi possivel selecionar, false caso contrario
	 * @author joao.fernando
	 */
	function selectDBInstance(string $db_name): bool
	{
		if (array_key_exists($db_name, $this->instances)) {
			$this->instance = $this->instances[$db_name];
			return true;
		}
		return false;
	}

	function selectDB( $DB_APPLICATION, $db ){
		foreach ( $DB_APPLICATION as $name => $value ) {
			if ( $name == $db ){
				$this->connectionParameter = $value;
				$this->instance = $value;
			}
		}

		foreach ( $DB_APPLICATION as $name => $value ) {
			if ( $value["type"] == "prod" ){
				$this->connectionParameter = $value;
				$this->instance = $db;
			}
		}
	}

	function getRandonKey($len, $chars = 'abcdefghijklmnopqrstuvxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'){
		$string = '';
		for ($i = 0; $i < $len; $i++){
			$pos = rand(0, strlen($chars)-1);
			$string .= $chars[$pos];
		}
		return $string;
	}

	function validarSessao()
	{
		if (!isset($_SESSION['BlueshiftPortalSession'])){
			echo '{"success": false, "alias": "SESSAO_INVALIDA", "message": "Sessão atual é invalida"}';
			exit;
		} else {
			$agora = mktime(date('H:i:s'));
    		$segundos = (is_numeric($_SESSION["BlueshiftPortalSession"]['tempo_permitido']) and is_numeric($agora)) ? ($agora - $_SESSION["BlueshiftPortalSession"]['tempo_permitido']) : false;
		
			if ($segundos > 3600) {
				session_destroy();
				echo '{"success": false, "alias": "SESSAO_INVALIDA", "message": "Sessão atual é invalida"}';
				exit;
			}
		}	
	}	

	function getUserSession(){
		if(isset($_SESSION["BlueshiftPortalSession"]["user"])) {
			return $_SESSION["BlueshiftPortalSession"]["user"];
		} else {
			Header("Location:" . HTTP_SERVER );
			return false;
		}
	}

	function accessCommand( $commandCode, $commandName, $commandTitle ){
		for($i = 0; $i < count($_SESSION["BlueshiftPortalSession"]["commands"]); $i++){
			if( $_SESSION["BlueshiftPortalSession"]["commands"][$i]["Comando_codigo"] == $commandCode ){
				return true;
			}
		}
		return false;

	}

	// Funcao relacionada a Sessao
	function getProperty( $property ){
		return $_SESSION["BlueshiftPortalSession"]["property"][$property];
	}

	function session(){
		// if ( !$this->isUserSession() ){
		// 	session_start();
		// }
		$properties = $_SESSION["BlueshiftPortalSession"]["properties"];
		$map = array();
		for ($i = 0; $i < count($properties); $i++ ){
			$map[ $properties[$i]["PropriedadesDominio_nome"] . "." . $properties[$i]["Propriedades_nome"] ] = $properties[$i]["Propriedades_valor"];
		}
		$_SESSION["BlueshiftPortalSession"]["property"] = $map;

	}

	function stringToSqlDate($strData) {
		// Recebemos a data no formato: dd/mm/aaaa
		// Convertemos a data para o formato: aaaa-mm-dd
		if ( strpos($strData, "/") != false ) {
			$strDataFinal .= implode('-', array_reverse(explode('/',$strData)));
		}
		return $strDataFinal;
	}
	
	function prepareDataToSQLQuery( $type, $data, $db_name = 'mysql' ){
		$data = preg_replace(preg_quote("/(from|select|insert|delete|where|drop table|show tables|#|\*|--|\\\\)/"),"",  $data );
		$type = strtolower( $type );
		
		if ( $type == "varchar" || $type ==  "string" || $type ==  "text" || $type ==  "VARCHAR" ){
			return "'" . str_replace("'", "''", $data) . "'";
		} else if ( $type == "time" ){
			return "'" . $data . "'";
		} else if ( $type == "enum" ){
			return " '" . $data . "' ";
		} else if ( $type == "password" ){
			return " PASSWORD('" . $data . "') ";
		} else if ( $type == "decimal" ){
			if ( $db_name == "mysql" ){
				return "replace(replace('" . $data . "','.',''),',','.') ";
			} else {
				return " " . $data . " ";
				//return " CAST( replace(replace('" . $data . "','.',''),',','.') AS numeric) ";
			}
			//return " replace(replace('" . $data . "','.',''),',','.') ";
		} else if ( $type == "date" || $type == "DATE"){
			
			if ($data != "NULL"){
				$day = substr($data, 0, 2);
				$month = substr($data, 3, 2);
				$year = substr($data, 6, 4);
				return "'" . $year . "-" . $month . "-" . $day . "'";
			}else{
				return "'NULL'";
			}
			
		} else if ( $type == "number" ){
			if ( $data == "" ){
				return "NULL";
			} else {
				return "". $data . "";
			}
		} else {
			return "". $data . "";
		}
	}
	/*
	 * Inicia a transação 
	 */
	function setConnection(){
	}

	/*
	 * Set query para ser executada pela classe.
	 */
	function setQuery( $sqlCommand ){

	}

	/*
	 * Alimenta a classe com o json que será aplicado a query.
	 */
	function setQueryParams( $json ){
	}

	function toJSON( $objRresult ){
		$rows = [];
		while ($row = $objRresult->fetch_array( MYSQLI_ASSOC )){
			foreach ( $row as $name => $value ) {
				if (!preg_match('!!u', $value)) {
					$value = utf8_encode( $value );
				}
				$row[$name] = $value;
			}

		    $rows[] = $row;
		}
		return $rows;
	}

	/*
	 * Inicia a transação 
	 */
	function select( $sqlCommand ){
		$result = $this->executeQuery($this->getInstanceDB(), $sqlCommand, $db_name = 'mysql', $erro = 1);
		return $result;
	}

	function selectProcedure( $sqlCommand ){
		$result = $this->executeProcedure($this->getInstanceDB(), $sqlCommand, $db_name = 'mysql', $erro = 1);
		return $result;
	}

	/*
	 * Inicia a transação 
	 */
	function update( $sqlCommand ){
		$result = $this->executeQuery($this->getInstanceDB(), $sqlCommand, $db_name = 'mysql', $erro = 1);
		return true;
	}

	function insert( $sqlCommand ){
		$result = $this->executeQuery($this->getInstanceDB(), $sqlCommand, $db_name = 'mysql', $erro = 1);
		$this->last_inserted_id = mysqli_insert_id($this->getInstanceDB());

		return true;
	}

	function delete( $sqlCommand ){
		$result = $this->executeQuery($this->getInstanceDB(), $sqlCommand, $db_name = 'mysql', $erro = 1);
		return true;
	}

	/*
	 * Inicia a transação 
	 */
	function setParams( $name, $type ){
	}

	function setData(){
	}

	/*
	 * Inicia a transação 
	 */
	function begin( $transaction = MYSQLI_TRANS_START_READ_WRITE ){
		mysqli_begin_transaction($this->getInstanceDB(), $transaction);
	}

	/*
	 * Inicia a transação 
	 */
	function execute($sqlCommand, $type, $procedure){
		$result;
		if($procedure){				
			$result = $this->selectProcedure($sqlCommand);
		}else{
			switch ($type){
				case "SELECT":
					$result = $this->select($sqlCommand);
					break;
				case "INSERT":
					$result = $this->insert($sqlCommand);
					break;
				case "UPDATE":
					$result = $this->update($sqlCommand);
					break;
				case "DELETE":
					$result = $this->delete($sqlCommand);
					break;
				default:
					return;	
			}
		}

		return $result;
 	}

	/*
	 * Inicia a transação
	 */
	function commit(){
		mysqli_commit($this->getInstanceDB());
	}

	/*
	 * Finaliza a transação
	 */
	function rollback(){
		mysqli_rollback($this->getInstanceDB());
	}

	/*
	 * Finaliza a transação
	 */
	function end(){
		mysqli_close($this->getInstanceDB());
	}

	function scapeString ( $myString ){
		return mysqli_real_escape_string( $this->getInstanceDB(), $myString);
	}

	function executeProcedure($instanceDB, $commandSql, $db_name = 'mysql', $erro = 1) {
		$resultQuery;
	
		if ( $db_name == "mysql" ){
			if (!($resultQuery = $instanceDB->multi_query( $commandSql ))) {
				echo '{"success":false,"message":"Ocorreu um erro na execução do Comando SQL no banco de dados. Por favor contate o administrador.", "response": "' . mysqli_error($instanceDB) . '"}';
				exit;
			}
			
			do {
				if ($res = $instanceDB->store_result()) {
					$json = $this->toJSON($res);
					$res->free();
				} else {
					if ($instanceDB->errno) {
						echo "Store failed: (" . $instanceDB->errno . ") " . $instanceDB->error;
					}
				}
			} while ($instanceDB->more_results() && $instanceDB->next_result());
		}

		return $json;
	}
	
	function executeQuery($instanceDB, $commandSql, $db_name = 'mysql', $erro = 1) {
		$resultQuery;
	
		if ( $db_name == "mysql" ){
			if (!($resultQuery = mysqli_query( $instanceDB, $commandSql ))) {
				echo '{"success":false,"message":"Ocorreu um erro na execução do Comando SQL no banco de dados. Por favor contate o administrador.", "response": "' . mysqli_error($instanceDB) . '"}';
				exit;
			}
		}

		return $resultQuery;
	}

	function executeDAOSource($daoSource, $serviceName, $dataObjectTemp){
		$message = array(
			"success" => "",
			"error" => "",
			"notFound" => "",
		);
	
		if (file_exists( $daoSource )) {
			$xml = simplexml_load_file($daoSource, 'SimpleXMLElement', LIBXML_NOCDATA);
			
			foreach ($xml->DAOExecutions->DAOExecution as $DAOExecution){
				$serviceNameTemp = (String)$DAOExecution->attributes()->id;
	
				if ( $serviceName == $serviceNameTemp ) {
					$command = array(
						"type" => "",
						"sql" => ""
					);
	
					if ($DAOExecution->query != ""){
						$command["type"] = "SELECT";
						$command["sql"] = $DAOExecution->query;
					} else if ($DAOExecution->insert != ""){
						$command["type"] = "INSERT";
						$command["sql"] = $DAOExecution->insert;
					} else if ($DAOExecution->get != ""){
						$command["type"] = "SELECT";
						$command["sql"] = $DAOExecution->get;
					} else if ($DAOExecution->update != ""){
						$command["type"] = "UPDATE";
						$command["sql"] = $DAOExecution->update;
					} else if ($DAOExecution->delete != ""){
						$command["type"] = "DELETE";
						$command["sql"] = $DAOExecution->delete;
					}
	
					foreach ($DAOExecution->message as $messageTemp){
						switch((String)$messageTemp->attributes()->type){
							case "success":
								$message["success"] = (String)$messageTemp->attributes()->message;
							break;
							case "error":
								$message["error"] = (String)$messageTemp->attributes()->message;
							break;
							case "notFound":
								$message["notFound"] = (String)$messageTemp->attributes()->message;
							break;
						}
					}
					
					foreach ($DAOExecution->parameter as $parameterTemp){
						if ((String)$parameterTemp->attributes()->type == "in"){
							$key = (String)$parameterTemp->attributes()->name;
							$type = (String)$parameterTemp->attributes()->typeName;
							if(ISSET($dataObjectTemp[ $key ])){
								$data = utf8_decode($dataObjectTemp[ $key ]);
								$command["sql"] = str_replace(":" . $key, $this->prepareDataToSQLQuery($type, $data), $command["sql"]);
							}
							
						}
					}
					
					$result = $this->execute($command["sql"], $command["type"]);
	
					if ($result){
						$dados = array();
						switch($command["type"]){
							case "SELECT":
								$dados = $this->toJSON($result);
							break;
							case "INSERT":
								$dados = array("codigo" => $this->last_inserted_id);
							break;
						}
						return array(
							"success" => true,
							"message" => $message["success"],
							"elements" => $dados
						);
					} else {
						return array(
							"success" => false,
							"message" => $message["error"]
						);
						
					}			
				}
			}
		} else {
			return array(
				"success" => false,
				"message" => "Arquivo DAO não encontrado."
			);
		}
	}
}

$do = new DoFramwork();

foreach ( $DB_APPLICATION as $key => $value ) {
	$dbparameter = $value;
	$server = "";
	// if ( $dbparameter["port"] != "" ){
	// 	$server = $dbparameter["server"] . ":" . $dbparameter["port"];
	// } else {
		$server = $dbparameter["server"];
	// }
	// $conn = mysqli_init();	
	// mysqli_options($conn, MYSQLI_OPT_SSL_VERIFY_SERVER_CERT, true);
	// mysqli_ssl_set($conn, NULL, NULL, "../BaltimoreCyberTrustRoot.crt.pem", NULL, NULL) ; 
	// $instanceMySql = mysqli_real_connect($conn, $server, $dbparameter["user"], $dbparameter["password"], $dbparameter["name"], 3306, '/var/run/mysqld/mysqld.sock', MYSQLI_CLIENT_SSL);
	
	// $instanceMySql = mysqli_real_connect($conn, $server, $dbparameter["user"], $dbparameter["password"], $dbparameter["name"], 3306, MYSQLI_CLIENT_SSL);
	$instanceMySql = mysqli_connect($server, $dbparameter["user"], $dbparameter["password"], $dbparameter["name"]);

	
	if (!$instanceMySql) {
	    echo '{"success":false, "message": "Não foi possível estabelecer uma conexão com o gerenciador MySQL.", "Debugging errno":"' . mysqli_connect_errno($conn) .'", "Debugging error": ' . json_encode( utf8_encode( mysqli_connect_error() ), JSON_UNESCAPED_SLASHES )  . '}';
	    exit;
	}

	// $instanceMySql = $conn;

	$value["instance"] = $instanceMySql;
	// $value["dadosConexao"] = $value;

	$do->setInstanceDB( $key, $value );
}
