<?php
require_once(__DIR__ . '/../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');
require_once('listagens.inc.php');
$do->getUserSession();

function verificaHorarioDuplicado($dataInicial, $dataFinal, $tempoInicial, $tempoFinal, $do, $usuarioCodigo): bool
{
    $elements = listarMarcacoesDia($dataInicial, $do, $usuarioCodigo);
    if (!$elements) {
        return true;
    }

    $marcacaoInicial = $dataInicial . ' ' . $tempoInicial;
    $marcacaoFinal = $dataFinal . ' ' . $tempoFinal;

    $marcacaoInicial = DateTime::createFromFormat('Y-m-d H:i:s', $marcacaoInicial);
    $marcacaoFinal = DateTime::createFromFormat('Y-m-d H:i:s', $marcacaoFinal);

    foreach ($elements as $key => $value) {
        $salvoInicial = $elements[$key]['Start_Date'] . ' ' . $elements[$key]['Start_Time'];
        $salvoFinal = $elements[$key]['End_Date'] . ' ' . $elements[$key]['End_Time'];
        $salvoInicial = DateTime::createFromFormat('Y-m-d H:i:s', $salvoInicial);
        $salvoFinal = DateTime::createFromFormat('Y-m-d H:i:s', $salvoFinal);

        if ($marcacaoInicial == $salvoInicial) {
            return false;
        }

        if ($marcacaoInicial < $salvoInicial) {
            if ($marcacaoFinal > $salvoInicial) {
                return false;
            }
        }

        if ($marcacaoInicial > $salvoInicial) {
            if ($marcacaoInicial < $salvoFinal) {
                return false;
            }
        }
    }

    return true;
}

function verificarApontamento($do, $usuarioCodigo): ResultadoModulo
{
    $sqlCommand = ' SELECT ';
    $sqlCommand .= '   apontamento ';
    $sqlCommand .= ' FROM ';
    $sqlCommand .= '    responsaveis_tecnicos ';
    $sqlCommand .= ' WHERE ';
    $sqlCommand .= '    codigo = ' . $usuarioCodigo;

    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT", "");
    $do->commit();

    $elements = $do->toJSON($result);
    if (count($elements) > 0) {
        if ($elements[0]['apontamento'] == "S") {
            return new ResultadoModulo(true);
        }


    }
    return new ResultadoModulo(false, 'Não é possivel cadastrar ou realizar modificações em apontametos com mais de uma semana passada');

}

function verificarCadastroFuturo($data): ResultadoModulo
{

    $data = implode('-', array_reverse(explode('/', $data)));
    $hoje = new DateTime(date('Y-m-d'));
    $dataCadastro = new DateTime($data);
    $dateInterval = $hoje->diff($dataCadastro)->format('%R%d');
    if ($dateInterval > 0) {
        return new ResultadoModulo(false, 'Não é possivel realizar apontamento em datas futuras.');
    }

    return new ResultadoModulo(true);
}

function verificarApontamentoPossivel($do, $usuarioCodigo, $data): ResultadoModulo
{
    $data = implode('-', array_reverse(explode('/', $data)));
    $hoje = new DateTime(date('Y-m-d'));
    $dataCadastro = new DateTime($data);
    $dateInterval = $hoje->diff($dataCadastro)->format('%R%d');

    if ($dateInterval < -7) {
        return verificarApontamento($do, $usuarioCodigo);
    }

    return new ResultadoModulo(true);
}

function verificaRecessoRemunerado($do, $usuarioCodigo, $data): ResultadoModulo
{

    $do->selectDBInstance('administrativo');

    $sqlCommand = ' SELECT ';
    $sqlCommand .= '     dataInicio, dataFim ';
    $sqlCommand .= ' FROM ';
    $sqlCommand .= '     controle_mensal ';
    $sqlCommand .= ' WHERE ';
    $sqlCommand .= '     status = "H"';
    $sqlCommand .= ' AND ';
    $sqlCommand .= '    Tipo_codigo = ' . '6' . ' ';
    $sqlCommand .= ' AND ';
    $sqlCommand .= '    descansoVendido <> "' . 'S' . '" ';
    $sqlCommand .= ' AND ';
    $sqlCommand .= '     Pessoa_codigo =  ' . $usuarioCodigo . '';
    $sqlCommand .= ' AND ';
    $sqlCommand .= '"' . $do->prepareDataToSQLQuery("r", $data) . '"';
    $sqlCommand .= ' BETWEEN ';
    $sqlCommand .= '   dataInicio ';
    $sqlCommand .= ' AND ';
    $sqlCommand .= '   dataFim ';

    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT", "");
    $do->commit();

    $elements = $do->toJSON($result);

    $do->selectDBInstance('portaldofornecedor');

    if (count($elements) > 0) {
        return new ResultadoModulo(false, 'Você não pode fazer apontamentos nesse período: </br> ' . date("m/d/Y", $elements[0]['dataInicio']) . ' a ' . date("m/d/Y", $elements[0]['dataFim']) . '</br>Motivo: Recesso Remunerado');
    }

    return new ResultadoModulo(true);
}

function verificarDatas($startDate, $startTime, $endDate, $endTime)
{
    if ($endTime) {
        $end = DateTime::createFromFormat('Y-m-d H:i', $endDate . ' ' . $endTime);
        $start = DateTime::createFromFormat('Y-m-d H:i', $startDate . ' ' . $startTime);

        if ($start <= $end) {
            $duracao = duracaoHoras($startTime, $endTime);
            list(, $minutos) = array_map(function ($x) {
                return str_pad($x, 2, '0', STR_PAD_LEFT);
            }, $duracao);
            $horas = $end->diff($start)->h;

            return [
                'Duration_h' => $horas . ':' . $minutos,
                'Duration_d' => $end->diff($start)->d,
                'valid' => true
            ];
        } else {
            return [
                'message' => 'Ops... !',
                'description' => 'A marcação inicial tem que ser maior ou igual à marcação final.',
                'valid' => false
            ];
        }
    }
}

function duracaoHoras($startTime, $endTime)
{
    $start = DateTime::createFromFormat('H:i', $startTime);
    $end = DateTime::createFromFormat('H:i', $endTime);

    $diff = $end->diff($start);
    $horas = $diff->h;
    $minutos = $diff->i;

    return [$horas, $minutos];
}

function verificarDataFinalMaiorInicial($endDate, $startDate): bool
{
    $end = DateTime::createFromFormat('d/m/Y', $endDate);
    $start = DateTime::createFromFormat('d/m/Y', $startDate);

    if ($end > $start) {
        return false;
    }

    return true;
}

function controleTimesheetDataCadastro($do, $usuarioCodigo, $dataInicio, $params): ResultadoModulo
{

    if (verificaProjetoIsSas($params['projetoCodigo'])) {
        return controleTimesheetDataSas($do, $usuarioCodigo, $dataInicio);
    }

    $dataHoje = new DateTime();
    $dataTr = DateTime::createFromFormat('d/m/Y', $dataInicio);

    if ($dataTr > $dataHoje || ($dataTr->format('Ym') === $dataHoje->format('Ym'))) {
        return new ResultadoModulo(true);
    } else {
        $startDayWeek = (new DateTime())->modify('first day of this month')->format('N');
        $workDay = ($startDayWeek == 1 || $startDayWeek == 6) ? 3 : 1;

        $dataHojeDia = $dataHoje->format('j') == $workDay;

        if ($dataHojeDia && (($dataHoje->format('n') - $dataTr->format('n') == 1 && $dataHoje->format('Y') == $dataTr->format('Y')) || ($dataHoje->format('n') == 1 && $dataTr->format('n') == 12 && $dataHoje->format('Y') - $dataTr->format('Y') == 1))) {
            return new ResultadoModulo(true);
        }
    }

    $apontamento = verificarApontamento($do, $usuarioCodigo);
    if ($apontamento->status) {
        return new ResultadoModulo(true);
    } else {
        return new ResultadoModulo(
            false,
            'Não é possível cadastrar ou realizar modificações em datas com o mês já fechado.',
        );
    }
}

function controleTimesheetDataSas($do, $usuarioCodigo, $dataTr): ResultadoModulo
{
    $diaAberturaSas = 21; // mês anterior
    $diaFechamentoSas = 20; // mês vigente

    $dataHoje = date('Y-m-d');
    $dataHojeMes = date('n');
    $dataHojeAno = date('Y');
    $dataHojeDia = date('j');

    $dataTrObj = DateTime::createFromFormat('d/m/Y', $dataTr);
    $dataTrFormatted = $dataTrObj->format('Y-m-d');
    $dataTrMes = $dataTrObj->format('n');
    $dataTrDia = $dataTrObj->format('j');

    if ($dataHojeDia > 20) {
        $aberturaSas = $dataHojeAno . "-" . $dataHojeMes . "-" . $diaAberturaSas; // Exemplo: 2022-08-21
        $fechamentoSas = $dataHojeAno . "-" . ($dataHojeMes + 1) . "-" . $diaFechamentoSas; // Exemplo: 2022-09-20
    } else {
        $aberturaSas = $dataHojeAno . "-" . ($dataHojeMes - 1) . "-" . $diaAberturaSas; // Exemplo: 2022-07-21
        $fechamentoSas = $dataHojeAno . "-" . $dataHojeMes . "-" . $diaFechamentoSas; // Exemplo: 2022-08-20
    }

    if ($dataTrFormatted >= $aberturaSas && $dataTrFormatted <= $fechamentoSas) {
        return new ResultadoModulo(true);
    } else if ($dataHojeDia > 20) {
        $isDiaLimiteUtil = ($dataHojeDia - $diaFechamentoSas) <= 3;
        $isMesmoMes = $dataHojeMes == $dataTrMes;
        $isMesAnterior = ($dataHojeMes - $dataTrMes) == 1;

        if ($isDiaLimiteUtil && ($isMesmoMes || ($isMesAnterior && $dataTrDia >= $diaAberturaSas))) {
            return new ResultadoModulo(true);
        }
    }

    $apontamento = verificarApontamento($do, $usuarioCodigo);
    if ($apontamento->status) {
        return new ResultadoModulo(true);
    } else {
        return new ResultadoModulo(
            false,
            'Não é possível cadastrar ou realizar modificações em datas com o mês já fechado.',
        );
    }
}
function verificaProjetoIsSas($codigo)
{
    $codigoProjetoSas = 44;
    if (intval($codigo) == $codigoProjetoSas) {
        return true;
    }
    return false;
}


function verificar_data_hora($start_date, $end_date, $start_time, $end_time)
{
    $start_datetime = DateTime::createFromFormat('m/d/Y H:i', $start_date . ' ' . $start_time);
    $end_datetime = DateTime::createFromFormat('m/d/Y H:i', $end_date . ' ' . $end_time);
    if ($start_datetime === false || $end_datetime === false) {
        return new ResultadoModulo(false, 'Data ou hora inválida.');
    }

    return new ResultadoModulo(true);
}
function verificar_campos_obrigatorios(array $form_data): ResultadoModulo
{
    $campos_nao_nulos = [
        'Project',
        'Client',
        'Start_Date',
        'End_Date',
        'Start_Time',
        'End_Time',
        'Faturavel',
        'Description',
    ];

    foreach ($campos_nao_nulos as $campo) {
        if (empty($form_data[$campo]) || is_null($form_data[$campo])) {
            $nome_campo = '';
            switch ($campo) {
                case 'Project':
                    $nome_campo = 'Projeto';
                    break;

                case 'Client':
                    $nome_campo = 'Cliente';
                    break;

                case 'Start_Date':
                    $nome_campo = 'Data Inicial';
                    break;

                case 'End_Date':
                    $nome_campo = 'Data Final';
                    break;
                case 'Start_Time':
                    $nome_campo = 'Hora Inicial';
                    break;
                case 'End_Time':
                    $nome_campo = 'Hora Final';
                    break;
                case 'Faturavel':
                    $nome_campo = 'Faturável';
                    break;
                case 'Description':
                    $nome_campo = 'Descrição';
                    break;
            }
            return new ResultadoModulo(false, 'O campo ' . $nome_campo . ' é obrigatório.');
        }
    }

    return new ResultadoModulo(true);
}