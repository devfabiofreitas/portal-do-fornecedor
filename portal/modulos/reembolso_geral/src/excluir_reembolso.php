<?php
error_reporting(E_STRICT);
session_start();
require_once('../../../../properties.inc.php');
require_once('../../../../properties.db.inc.php');
require_once(DOFMW . '/Do.class.php');
$do->validarSessao();

$id = $_POST['id'];

apagar_reembolso($id);

$response = array(
  'success' => true,
  'data' => $_SESSION['Reembolso']
);

echo json_encode($response);


function apagar_reembolso($id)
{
  foreach ($_SESSION['Reembolso'] as $chave => $reembolso) {
    if ($reembolso['id'] == $id) {
      unset($_SESSION['Reembolso'][$chave]);
      break;
    }
  }
}
