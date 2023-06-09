<?php
define('ROOT_BAR', "/");
$iterator = new DirectoryIterator(dirname(__FILE__));
$root = $iterator->getPath() . ROOT_BAR;

////************************************
////*** CONFIGURACAO DE PRODUCAO *******
////************************************

//define('HTTP_SERVER', '/');

// define('SISTEMA_NOME', 'clockify');
// define('SISTEMA_CODIGO', '1');
// define('CLIENTE_CODIGO', '1');

//************************************
//*** CONFIGURACAO LOCAL *************
//************************************

define('HTTP_SERVER', 'http://localhost/portaldofornecedor/');

define('ROOT', $root);
define('ROOT_API', $root . 'DoFramework' . ROOT_BAR);
define('DOFMW', $root . 'dofmw' . ROOT_BAR);
define('ROOT_UPLOAD', $root);
define('ROOT_INTERNETFILES', $root . 'internetfiles' . ROOT_BAR);
define('INTERNETFILES', 'internetfiles');

//   define('SISTEMA_NOME', 'administrativo');
//   define('SISTEMA_CODIGO', '1');
//   define('CLIENTE_CODIGO', '4');

// Define qual o banco de dados default da aplicação.
try {
  $dados = (array)json_decode(file_get_contents("php://input"));

  if ((isset($_POST["producao"]) && $_POST["producao"] == false) || (isset($dados["producao"]) && $dados["producao"] == false)) {
    define('DEFAULT_DB', 'administrativo_desenvolvimento'); // aqui dentro vai a conexão de homologação
    echo '1 properties.inc.php';
  } else {
    define('DEFAULT_DB', 'administrativo'); //produção
  }
} catch (Exception $e) {
  define('DEFAULT_DB', 'administrativo'); //produção
  echo '3 properties.inc.php';
}

$DB_APPLICATION = array();
