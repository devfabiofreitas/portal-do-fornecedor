<?php
require_once(__DIR__ . '/../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');

/**
 * Busca o codigo da empresa, a partir do CNPJ
 * 
 * @param string $cnpj cnpj nao formatado (incluindo '/', '-' e '.')
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return ?int codigo da empresa ou null
 * @author joao.fernando 
 */

function listar_codigo_empresa(string $cnpj, DoFramwork $do): ?int
{
    $cnpj = mysqli_escape_string($do->getInstanceDB(), $cnpj);
    $query = "
    SELECT codigo
    FROM empresas
    WHERE cnpj = '$cnpj'
    ";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    if (is_array($result_as_array) & (count($result_as_array) > 0)) {
        return $result_as_array[0]['codigo'];
    }
    return null;
}

/**
 * Busca informacoes sobre o consultor
 * @param int $codigo_usuario codigo do usuario logado
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return array array assoc com as informacoes
 * @author joao.fernando
 */
function listar_info_consultor(int $codigo_usuario, DoFramwork $do): array
{
    $query = "
    SELECT
        R.nome,
        R.lancamentoHoras,
        R.beneficiario,
        E.cnpj,
        R.banco,
        R.agencia,
        R.digitoAgencia,
        R.conta,
        R.digitoConta
    FROM
        responsaveis_tecnicos AS R
        INNER JOIN usuarios U ON (U.codigo = R.Usuario_codigo )
        LEFT JOIN empresas E ON (E.codigo = U.Empresa_codigo )
    WHERE  R.codigo = '$codigo_usuario'
    ";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    if (is_array($result_as_array) & (count($result_as_array) > 0)) {
        return $result_as_array[0];
    }
    return [];
}

/**
 * Calcula o primeiro e o ultimo dia do mes anterior
 * 
 * @return array array com a primeira e ultima data
 * @author joao.fernando
 */
function listar_data_ultimo_mes(): array
{
    $data_inicio = Date('Y-m-d', strtotime('first day of previous month'));
    $data_fim = Date('Y-m-d', strtotime('last day of previous month'));
    return [$data_inicio, $data_fim];
}

/**
 * Lista o total de horas realizadas por projeto para o consultor informado
 * 
 * @param int $codigo_usuario codigo do usuario logado
 * @param string $data_inicio data inicial para os lancamentos
 * @param string $data_fim data final para os lancamentos
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return array array com os clientes, projetos e quantidade de horas realizadas no periodo
 * @author joao.fernando
 */
function listar_projetos_horas_mes(int $codigo_usuario, string $data_inicio, string $data_fim, DoFramwork $do): array
{
    $query = "
    SELECT
        t.Client AS cliente,
        t.Project AS projeto,
        SUM(t.Duration_d) AS horas_trabalhadas
    FROM
        timesheet t
    WHERE
        t.Responsavel_codigo = '$codigo_usuario'
        AND t.Start_Date BETWEEN '$data_inicio' AND '$data_fim'
    GROUP BY 
        t.Project,
        t.Client 
    ORDER BY
        horas_trabalhadas DESC
    ";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    if (is_array($result_as_array) & (count($result_as_array) > 0)) {
        return $result_as_array;
    }
    return [];
}

/**
 * Retorna a quantidade total de horas realizadas no periodo
 * @param int $codigo_usuario codigo do usuario logado
 * @param string $data_inicio data inicial para os lancamentos
 * @param string $data_fim data final para os lancamentos
 * @param DoFramwork $do instancia do framework dofmw
 *  
 * @return int total de horas
 * @author joao.fernando
 */
function listar_total_horas_trabalhadas_mes(int $codigo_usuario, string $data_inicio, string $data_fim, DoFramwork $do): int
{
    $query = <<<SQL
    SELECT
        SUM(time_to_sec(t.Duration_h) / 3600) AS horas_trabalhadas
    FROM
        timesheet t
    WHERE
        t.Responsavel_codigo = '$codigo_usuario'
        AND t.Start_Date BETWEEN '$data_inicio' AND '$data_fim';
    SQL;

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    if (is_array($result_as_array) & (count($result_as_array) > 0)) {
        return floor($result_as_array[0]['horas_trabalhadas']);
    }
    return 0;
}


/**
 * Lista os feriados dentro do periodo informado
 * Considera apenas feriados da própria empresa (Cliente_codigo = 6)
 * 
 * @param string $data_inicio inicio do periodo (Y-m-d)
 * @param string $data_fim fim do periodo (Y-m-d)
 * 
 * @return array array com as datas dos feriados no formato (Y-m-d)
 * @author joao.fernando
 */
function listar_feriados_periodo(string $data_inicio, string $data_fim, DoFramwork $do): array
{
    $do->selectDBInstance('administrativo');

    $query = "
    SELECT
        f.data
    FROM
        feriados f
    WHERE 1=1
        AND f.Cliente_codigo = 6
        AND f.data BETWEEN '$data_inicio' AND '$data_fim';
    ";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    $do->selectDBInstance('portaldofornecedor');

    $feriados_dias_uteis = [];
    foreach ($result_as_array as $feriado) {
        $feriado_datetime = new DateTime($feriado['data']);
        if ($feriado_datetime->format('N') <= 5) {
            $feriados_dias_uteis[] = $feriado['data'];
        }
    }

    return $feriados_dias_uteis;
}

/**
 * Retorna a quantidade total de horas uteis dentro do periodo informado
 * @param string $data_inicio data inicial para os lancamentos
 * @param string $data_fim data final para os lancamentos
 * @param int $horas_por_dia quantidade de horas uteis dentro de cada dia (padrao = 8)
 * 
 * @return int total de horas
 * @author joao.fernando
 */
function listar_horas_uteis_mes(string $data_inicio, string $data_fim, DoFramwork $do, int $horas_por_dia = 8): int
{
    $feriados = listar_feriados_periodo($data_inicio, $data_fim, $do);
    $contagem_feriados = count($feriados);

    $data_inicio = new DateTime($data_inicio . "00:00:00");
    $data_fim = new DateTime($data_fim . "23:59:59");

    $intervalo = new DateInterval('P1D');
    $periodo = new DatePeriod($data_inicio, $intervalo, $data_fim);

    $dias_uteis = 0;
    foreach ($periodo as $p) {
        if ($p->format('N') <= 5) { // dia da semana menor que 5 = dia util
            $dias_uteis += 1;
        }
    }

    return ($dias_uteis - $contagem_feriados) * $horas_por_dia;
}

/**
 * Busca informacoes para geracao de template de nota fiscal para o consultor especificado
 * Caso nao existam lancamentos no timesheet do consultor, um array vazio e retornado
 * @param int $codigo_usuario codigo do usuario logado
 * @param string $data_inicio data inicial para os lancamentos
 * @param string $data_fim data final para os lancamentos
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return array array assoc com as informacoes
 * @author joao.fernando
 */
function listar_template_nota_fiscal(int $codigo_usuario, string $data_inicio, string $data_fim, DoFramwork $do): array
{
    $query = "
    SELECT
        t.Client,
        t.Project,
        t.User,
        sec_to_time(SUM(time_to_sec( Duration_h ))) as totalHoras,
        rt.beneficiario,
        rt.banco,
        rt.agencia,
        rt.digitoConta,
        rt.conta
    FROM
        timesheet t
        INNER JOIN responsaveis_tecnicos rt
        ON rt.codigo = t.Responsavel_codigo
    WHERE
        t.Responsavel_codigo = '$codigo_usuario'
        AND t.Start_Date >= '$data_inicio'
        AND t.End_Date <= '$data_fim'
    GROUP BY 
        t.Cliente_codigo,
        t.Project;
    ";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    if (is_array($result_as_array) & (count($result_as_array) > 0)) {
        return $result_as_array[0];
    }
    return [];
}

/**
 * Gera os templates de nota fiscal prontos para inserir no html
 * @param int $codigo_usuario codigo do usuario logado
 * @param string $data_inicio data inicial para os lancamentos
 * @param string $data_fim data final para os lancamentos
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return array array assoc com o html de cada template
 * @author joao.fernando
 */
function gerar_templates_nota_fiscal(
    array $info_consultor,
    array $projetos,
    string $data_inicio,
    string $data_fim,
    int $horas_trabalhadas
): array {
    $principal_projeto = ($projetos[0]) ? $projetos[0] : [];

    $data_inicio_formatada = converter_data_formato_customizado($data_inicio);
    $data_fim_formatada = converter_data_formato_customizado($data_fim);

    $template_horista = "
    - Cliente/Projeto: {$principal_projeto['cliente']}/{$principal_projeto['projeto']}
    - Nome Consultor:  {$info_consultor['nome']}
    - Período: $data_inicio_formatada a $data_fim_formatada - (início mês, fechamento 30/31)
    - Valor/Hora: R$00,00
    - Valor total: R$00,00  
    - Total de horas realizadas: $horas_trabalhadas
    - Dados bancários:  
    Titular: {$info_consultor['beneficiario']}
    Banco: {$info_consultor['banco']}
    Ag: {$info_consultor['agencia']}
    C/C: {$info_consultor['conta']}-{$info_consultor['digitoConta']}
    CNPJ: {$info_consultor['cnpj']}
    ";

    $template_mensalista = "
    - Cliente/Projeto: {$principal_projeto['cliente']}/{$principal_projeto['projeto']}
    - Nome Consultor:  {$info_consultor['nome']}
    - Período: $data_inicio_formatada a $data_fim_formatada - (início mês, fechamento 30/31)
    - Valor total: R$00,00
    - Total de horas realizadas: $horas_trabalhadas
    - Dados bancários:  
    Titular: {$info_consultor['beneficiario']}
    Banco: {$info_consultor['banco']}
    Ag: {$info_consultor['agencia']}
    C/C: {$info_consultor['conta']}-{$info_consultor['digitoConta']}
    CNPJ: {$info_consultor['cnpj']}
    ";

    return [
        'horista' => $template_horista,
        'mensalista' => $template_mensalista
    ];
}