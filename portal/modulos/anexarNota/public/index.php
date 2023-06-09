<?php
error_reporting(E_STRICT);
session_start();
require_once('../../../../properties.inc.php');
require_once(ROOT . 'properties.db.inc.php');
require_once(DOFMW . 'Do.class.php');
require_once(ROOT . 'portal/modulos/controleAcesso/service/verificarSessao/index.php');

require_once(ROOT . 'portal/php/utils.inc.php');
require_once('../src/listagens.inc.php');

$sessao_usuario = $do->getUserSession();
$codigo_usuario = $sessao_usuario['codigo'];
$cnpj_usuario = $sessao_usuario['documento'];

// verifica se o usuario é CLT
// redireciona para home caso verdadeiro
if ($sessao_usuario['clt'] == 'S') {
    header('Location: ' . HTTP_SERVER . 'portal/modulos/home.php');
}

// definir variaveis que serao 'injetadas' no template
bloquear_echo_framework();
$info_consultor = listar_info_consultor($codigo_usuario, $do);
[$data_inicio_mes, $data_fim_mes] = listar_data_ultimo_mes();
$horas_uteis = listar_horas_uteis_mes($data_inicio_mes, $data_fim_mes, $do);
$horas_trabalhadas = listar_total_horas_trabalhadas_mes($codigo_usuario, $data_inicio_mes, $data_fim_mes, $do);
$projetos = listar_projetos_horas_mes($codigo_usuario, $data_inicio_mes, $data_fim_mes, $do);
$codigo_empresa = listar_codigo_empresa($info_consultor['cnpj'], $do);

$template_nota_fiscal = gerar_templates_nota_fiscal($info_consultor, $projetos, $data_inicio_mes, $data_fim_mes, $horas_trabalhadas);

// datas e formatacao
$data_periodo_inicio_formatada = converter_data_formato_customizado($data_inicio_mes);
$data_periodo_fim_formatada = converter_data_formato_customizado($data_fim_mes);

// alertas sweetalert
$alerta_swal = (isset($_REQUEST['status'])) ? exibir_alerta_javascript($_REQUEST['status'], $_REQUEST['message']) : '';
$mensagem_atraso_nota_fiscal = 'Prazo máximo para envio da nota fiscal é dia 10. Os consultores que fizerem a emissão e upload no portal após esse prazo estão sujeitos a atraso no pagamento equivalente a quantidade de dias de atraso na NF';
$alerta_atraso = (!$alerta_swal) ? exibir_alerta_javascript(false, $mensagem_atraso_nota_fiscal) : '';

// renderizar o template
ob_end_clean();
require_once('../templates/anexarNota.template.php');