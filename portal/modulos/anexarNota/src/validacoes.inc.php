<?php
require_once(__DIR__ . '/../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');

/**
 * Valida o CNPJ recebido, removendo caracteres nao numericos
 * @param string $cnpj o cnpj
 * 
 * @return bool
 * @author joao.fernando
 */
function validar_cnpj(string $cnpj): bool
{
    $cnpj_array = [];
    preg_match_all('/\d+/', $cnpj, $cnpj_array);
    $cnpj = implode($cnpj_array[0]);
    if (strlen($cnpj) != 14) {
        return false;
    }

    return true;
}

/**
 * Valida a empresa pelo codigo
 * Apenas checa se o codigo nao é null
 * @param string $codigo_empresa
 * 
 * @return bool
 * @author joao.fernando
 */
function validar_empresa(string $codigo_empresa): bool
{
    if ((is_null($codigo_empresa) || $codigo_empresa == '')) {
        return false;
    }
    return true;
}

/**
 * Verifica se a nota foi enviada em atraso
 * Utiliza informacoes do formulario
 * 
 * @param string $data_referencia data inicial ou final do periodo da nota
 * @param int $data_envio_maximo optional data maximo para envio da nota sem atraso
 * 
 * @return bool
 * @author joao.fernando
 */
function verificar_atraso(string $data_referencia, int $data_envio_maximo = 10): bool
{
    $data_referencia = new DateTime($data_referencia);
    $data_atual = new DateTime('now', new DateTimeZone('America/Sao_Paulo'));

    $dia_atual = $data_atual->format('d');
    $ano_mes_atual = $data_atual->format('ym');
    $ano_mes_referencia = $data_referencia->format('ym');

    if (($dia_atual > $data_envio_maximo) & ($ano_mes_referencia < $ano_mes_atual)) {
        return true;
    }
    return false;
}

/**
 * Executa funcoes para formatacao e limpeza dos dados do formulario
 * 
 * @param array $form_data dados do formulario
 * 
 * @return array dados do formulario limpos
 * @author joao.fernando
 */
function limpar_formulario_nota_fiscal(array $form_data): array
{
    $form_data['cnpj_original'] = $form_data['cnpj'];
    $form_data['cnpj'] = remover_caracteres($form_data['cnpj'], ['/', '-', '.']);

    $string_data_emissao = str_replace('/', '-', $form_data['dataEmissao']);
    $form_data['dataEmissao'] = date('Y-m-d', strtotime($string_data_emissao));

    $string_periodo_inicio = str_replace('/', '-', $form_data['periodoInicio']);
    $form_data['periodoInicio'] = date('Y-m-d', strtotime($string_periodo_inicio));

    $string_periodo_fim = str_replace('/', '-', $form_data['periodoFim']);
    $form_data['periodoFim'] = date('Y-m-d', strtotime($string_periodo_fim));

    $form_data['mesReferencia'] = date('m/Y', strtotime($string_periodo_fim));

    $form_data['emAtraso'] = (verificar_atraso($form_data['periodoInicio'])) ? 'S' : 'N';

    $form_data['valor'] = to_float($form_data['valor']);

    return $form_data;
}

/**
 * Verifica duplicidade da nota enviada
 * 
 * @param array $form_data dados do formulario
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return bool false se a nota ja exister, true caso contrario
 * @author joao.fernando
 */
function validar_duplicidade_nota_fiscal(array $form_data, int $codigo_usuario, DoFramwork $do): bool
{
    $query = "
    SELECT
        n.caminho,
        n.Empresa_codigo
    FROM
        notas_fiscais n
        INNER JOIN usuarios u
            ON u.Empresa_codigo = n.Empresa_codigo
        INNER JOIN responsaveis_tecnicos r
            ON r.Usuario_codigo = u.codigo
    WHERE 
        r.codigo = '$codigo_usuario'
        AND
            (periodoInicio BETWEEN '{$form_data['periodoInicio']}' AND '{$form_data['periodoFim']}'
            OR periodoFim BETWEEN '{$form_data['periodoInicio']}' AND '{$form_data['periodoFim']}')
        AND status != 'R'
    ";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    if (is_array($result_as_array) & (count($result_as_array) > 0)) {
        return false;
    }

    return true;
}

/**
 * Verifica se o usuario possui nota pendentes para o periodo
 * Consulta o banco do sistema administrativo
 * 
 * @param array $form_data dados do formulario
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return bool false se houver notas pendentes, true caso contrario
 * @author joao.fernando
 */
function validar_notas_em_avaliacao(array $form_data, DoFramwork $do): bool
{
    $do->selectDBInstance('administrativo');

    $query = "
    SELECT
        codigo
    FROM
        pf_notas_fiscais
    WHERE
        Empresa_codigo = '{$form_data['codigoEmpresa']}'
        AND (periodoInicio BETWEEN '{$form_data['periodoInicio']}' AND '{$form_data['periodoFim']}'
            OR periodoFim BETWEEN '{$form_data['periodoInicio']}' AND '{$form_data['periodoFim']}')
        AND aprovacao_nota = 'P'
    ";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    $do->selectDBInstance('portaldofornecedor');

    if (is_array($result_as_array) & (count($result_as_array) > 0)) {
        return false;
    }

    return true;
}

/**
 * Valida se todos os campos obrigatorios estao preenchidos
 * 
 * @param array $form_data dados passados pelo formulario
 * 
 * @return bool
 * @author joao.fernando
 */
function validar_campos_obrigatorios(array $form_data): bool
{
    $campos_nao_nulos = [
        'clienteProjeto',
        'periodoInicio',
        'periodoFim',
        'valor',
        'horasUteis',
        'dataEmissao',
        'numeroNota',
        'codigoServico',
        'impostoRetido',
        'beneficiario',
        'cnpj',
        'banco',
        'agencia',
        'conta'
    ];

    foreach($campos_nao_nulos as $campo) {
        if (empty($form_data[$campo]) || is_null($form_data[$campo])) {
            return false;
        }
    }

    return true;
}

/**
 * Verifica se o periodo informado é valido
 * 
 * @param array $form_data dados passados pelo formulario
 * 
 * @return bool
 * @author joao.fernando
 */
function validar_periodo_nota_fiscal(array $form_data): bool
{
    if ($form_data['periodoInicio'] > $form_data['periodoFim']) {
        return false;
    }
    return true;
}

/**
 * Função TEMPORÁRIA que permite a usuários específicos ignorar
 * a verificação de notas duplicadas
 * DEVE ser substituida por um solução permanente depois
 * Ex. existem consultores na empresa que compartilham o mesmo CNPJ,
 * mas emitem notas fiscais separadas. Por padrão, o sistema permite
 * apenas UMA nota por CNPJ por mês, sendo necessário essa gambiarra.
 * 
 * @param int $codigo_usuario codigo do usuario logado
 
 * @return bool true se o usuario pode ignorar a verificação, false caso contrário
 * 
 * @author joao.fernando
 *
 */
function ignorar_verificacao_notas_duplicadas(int $codigo_usuario): bool
{
    $usuarios_permitidos = [518, 519];
    if (in_array($codigo_usuario, $usuarios_permitidos)) {
        return true;
    }
    return false;
}

/**
 * Agrupa todas as validacoes das informacoes da nota fiscal
 * @param array $form_data dados passdados pelo formulario
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return ResultadoModulo
 * @author joao.fernando
 */
function validar_informacoes_nota_fiscal(array $form_data, int $codigo_usuario, DoFramwork $do): ResultadoModulo
{
    if (!validar_campos_obrigatorios($form_data)) {
        return new ResultadoModulo(false, 'Preencha o campo vazio');
    }
    if (!validar_cnpj($form_data['cnpj'])) {
        return new ResultadoModulo(false, 'CNPJ inválido');
    }
    if (!validar_empresa($form_data['codigoEmpresa'])) {
        return new ResultadoModulo(false, 'Empresa não cadastrada');
    }
    if ($form_data['totalHorasRealizadas'] <= 0) {
        return new ResultadoModulo(false, 'Total de horas não pode ser igual a 0.');
    }
    if (!validar_periodo_nota_fiscal($form_data)) {
        return new ResultadoModulo(false, 'Período inicial não pode ser depois do período final.');
    }
    if (!ignorar_verificacao_notas_duplicadas($codigo_usuario)) {
        if (!validar_duplicidade_nota_fiscal($form_data, $codigo_usuario, $do)) {
            return new ResultadoModulo(false, 'Essa nota já esta cadastrada para o período selecionado!');
        }
        if (!validar_notas_em_avaliacao($form_data, $do)) {
            return new ResultadoModulo(false, 'Você possui notas pendentes para este periodo.');
        }
    }
    
    return new ResultadoModulo(true);
}

/**
 * Valida se o arquivo enviado é um PDF
 * Não garante que não seja um script malicioso disfarçado de PDF
 * 
 * @param string $file_name nome do arquivo
 * @param string $file_type content-type do arquivo
 * 
 * @return bool
 * @author joao.fernando
 * 
 */
function validar_tipo_arquivo(string $file_name, string $file_type): bool
{
    $file_ext = pathinfo($file_name)['extension'];
    if (($file_type == 'application/pdf') & (strtolower($file_ext) == 'pdf')) {
        return true;
    }

    return false;
}

/**
 * Agrupa todas as validacoes dos anexos enviados
 * @param array $file_data arquivos enviados
 * 
 * @return ResultadoModulo
 * @author joao.fernando
 */
function validar_arquivo_nota_fiscal(array $file_data): ResultadoModulo
{
    for($i = 0; $i < count($file_data['name']); $i++) {
        if (!validar_tipo_arquivo($file_data['name'][$i], $file_data['type'][$i])) {
            return new ResultadoModulo(false, "Arquivo inválido!");
        }
    }

    return new ResultadoModulo(true);
}

/**
 * Executa a validacao dos dados enviados utilizando
 * as outras funcoes definidas neste arquivo
 * 
 * @param array $form_data dados do formulario
 * @param array $file_data dados dos arquivos anexos
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return ResultadoModulo resultado da validacao
 * @author joao.fernando
 */
function validar_nota(array $form_data, array $file_data, int $codigo_usuario, DoFramwork $do): ResultadoModulo
{
    $file_data = $file_data['arquivosUploadNotaFiscal'];

    $info_valida = validar_informacoes_nota_fiscal($form_data, $codigo_usuario, $do);
    $arquivo_valido = validar_arquivo_nota_fiscal($file_data);

    if (!$info_valida->status) {
        return $info_valida;
    }
    if (!$arquivo_valido->status) {
        return $arquivo_valido;
    }
    return new ResultadoModulo(true, 'Nota validada com sucesso.');
}