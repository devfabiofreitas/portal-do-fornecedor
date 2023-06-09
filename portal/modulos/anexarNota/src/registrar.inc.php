<?php
require_once(__DIR__ . '/../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');

/**
 * Verifica e cria (se necessario) o diretorio destino para armazenar os anexos
 * Utiliza informacoes do formulario enviado
 * 
 * @param array
 * 
 * @return ?array caminho absoluto (comecando em /var/...) 
 * e relativo (comecando em notas_fiscais/)
 * null se o caminho nao pode ser criado
 * @author joao.fernando
 */
function criar_diretorio_destino(array $form_data): ?array
{
    $diretorios_base = ['notas_fiscais'];
    $diretorios_data = array_slice(explode('-', $form_data['periodoInicio']), 0, 2);
    $diretorio_usuario = [$form_data['cnpj']];
    $diretorios = array_merge($diretorios_base, $diretorios_data, $diretorio_usuario);

    $caminho_local = criar_caminho_destino($diretorios, true);
    $caminho_relativo = criar_caminho_destino($diretorios, false);

    if (!file_exists($caminho_local)) {
      try {
        $result_mkdir = mkdir($caminho_local, 0777, true);
      } catch (Exception $e) {
        return null;
      }
    }

    return [
        $caminho_local, $caminho_relativo
    ];
}

/**
 * Cria nomes unicos para cada anexo enviado
 * 
 * @param array $file_data array contendo informacoes dos anexos
 * @param string $cnpj cnpj do usuario atual, enviado pelo formulario
 * @param string $caminho_relativo caminho relativo, comecando dentro de 'internetfiles/'
 * 
 * @return array contendo o nome unico e o nome temporario de cada anexo
 * @author joao.fernando
 */
function criar_nome_unico_anexos(array $file_data, string $cnpj, string $caminho_relativo): array
{
    $timestamp = new DateTime();
    $prefix = substr($timestamp->format('U'), 6, 4);
    $nomes_unicos = [];
    for($i = 0; $i < count($file_data['name']); $i++) {
        $file_info = pathinfo($file_data['name'][$i]);
        $nome_arquivo_unico = $cnpj . "_$i-$prefix." . $file_info['extension'];
        $nomes_unicos[] = [
            'nome_destino' => $nome_arquivo_unico,
            'nome_original' => $file_info['basename'],
            'caminho_relativo' => $caminho_relativo . $nome_arquivo_unico,
            'temp_name' => $file_data['tmp_name'][$i]
        ];
    }
    return $nomes_unicos;
}

/**
 * Persiste as informacoes das notas fiscais no banco de dados
 * 
 * @param array $form_data informacoes do formulario
 * @param array $nome_arquivos nome dos arquivos salvos em disco
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return bool
 * @author joao.fernando
 */
function inserir_informacoes_nota_fiscal_banco_local(array $form_data, array $nome_arquivos, int $codigo_usuario, DoFramwork $do): bool
{
    $form_data = escapar_array_strings($form_data, $do);
    $arquivo_nota_fiscal = $nome_arquivos[0];

    $cliente_projeto = $form_data['clienteProjeto'];
    $arquivo_nome_original = $arquivo_nota_fiscal['nome_original'];

    $query = "
    INSERT INTO notas_fiscais (
        Empresa_codigo, caminho, cliente_projeto,
        periodoInicio, periodoFim, valor,
        horasRealizadas, dataCadastro, mesReferencia,
        usuarioCadastro, atraso, nomeOriginal,
        dataEmissao, codigoServico, impostoRetido,
        numeroNota
    )
 
    VALUES (
        '{$form_data['codigoEmpresa']}',
        '{$arquivo_nota_fiscal['caminho_relativo']}',
        '$cliente_projeto',
        '{$form_data['periodoInicio']}',
        '{$form_data['periodoFim']}',
        '{$form_data['valor']}',
        '{$form_data['totalHorasRealizadas']}',
        dataHoraAtual(),
        '{$form_data['mesReferencia']}',
        '$codigo_usuario',
        '{$form_data['emAtraso']}',
        '$arquivo_nome_original',
        '{$form_data['dataEmissao']}',
        '{$form_data['codigoServico']}',
        '{$form_data['impostoRetido']}',
        '{$form_data['numeroNota']}'
    )";

    $do->begin();
    $result = $do->execute($query, 'INSERT', '');
    $do->commit();

    if ($result) {
        return true;
    }
    return false;
}

/**
 * Persiste as informacoes das notas fiscais no banco de dados remoto
 * 
 * @param array $form_data informacoes do formulario
 * @param array $nome_arquivos nome dos arquivos salvos em disco
 * @param DoFramwork $do instancia
 * 
 * @return bool
 * @author joao.fernando
 */
function inserir_informacoes_nota_fiscal_banco_remoto(array $form_data, array $nome_arquivos, int $codigo_registro_nota_portal, int $codigo_usuario, DoFramwork $do): bool
{
    $do->selectDBInstance('administrativo');

    $form_data = escapar_array_strings($form_data, $do);
    $arquivo_nota_fiscal = $nome_arquivos[0];

    $codigo_registro_nota_portal = ($codigo_registro_nota_portal) ? $codigo_registro_nota_portal : '';

    $query = "
    INSERT INTO pf_notas_fiscais (
        CNPJ, Empresa_codigo, Portal_codigo,
        caminho, nomeOriginal, cliente_projeto,
        periodoInicio, periodoFim, valor,
        horasRealizadas, atraso, dataCadastro,
        mesReferencia, usuarioCadastro, dataEmissao,
        codigoServico, impostoRetido, numeroNota)
    VALUES (
        '{$form_data['cnpj_original']}',
        '{$form_data['codigoEmpresa']}',
        '$codigo_registro_nota_portal',
        '{$arquivo_nota_fiscal['caminho_relativo']}',
        '{$arquivo_nota_fiscal['nome_original']}',
        '{$form_data['clienteProjeto']}',
        '{$form_data['periodoInicio']}',
        '{$form_data['periodoFim']}',
        '{$form_data['valor']}',
        '{$form_data['totalHorasRealizadas']}',
        '{$form_data['emAtraso']}',
        dataHoraAtual(),
        '{$form_data['mesReferencia']}',
        '$codigo_usuario',
        '{$form_data['dataEmissao']}',
        '{$form_data['codigoServico']}',
        '{$form_data['impostoRetido']}',
        '{$form_data['numeroNota']}'
    )";

    $do->begin();
    $result = $do->execute($query, 'INSERT', '');
    $do->commit();

    $do->selectDBInstance('portaldofornecedor');
    if ($result) {
        return true;
    }

    return false;
}

/**
 * Armazena em disco a nota fiscal enviada
 * Insere no banco de dados local as informacoes (padrao PORTAL)
 * 
 * @param array $form_data informacoes do formulario
 * @param array $file_data informacoes dos arquivos enviados
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return ResultadoModulo
 * @author joao.fernando
 */
function salvar_nota_fiscal(array $form_data, array $file_data, int $codigo_usuario, DoFramwork $do): ResultadoModulo
{
    [$caminho_local, $caminho_relativo] = criar_diretorio_destino($form_data, true);
    if (!$caminho_local) {
        return new ResultadoModulo(false, 'Não foi possível salvar o(s) arquivo(s).');
    }

    $nomes_unicos_anexos = criar_nome_unico_anexos($file_data, $form_data['cnpj'], $caminho_relativo);
    foreach($nomes_unicos_anexos as $f) {
        if (!salvar_arquivo_em_disco($f['temp_name'], $caminho_local, $f['nome_destino'])) {
            return new ResultadoModulo(false, 'Não foi possível salvar o(s) arquivo(s).');
        }
    }

    if (!inserir_informacoes_nota_fiscal_banco_local($form_data, $nomes_unicos_anexos, $codigo_usuario, $do)) {
        return new ResultadoModulo(false, 'Não foi possível inserir as informações no banco de dados.');
    }

    $codigo_registro_nota_portal = $do->last_inserted_id;
    if (!inserir_informacoes_nota_fiscal_banco_remoto($form_data, $nomes_unicos_anexos, $codigo_registro_nota_portal, $codigo_usuario, $do)) {
        return new ResultadoModulo(false, 'Não foi possível inserir as informações no banco de dados.');
    }

    return new ResultadoModulo(true, 'Dados inseridos.');
}

/**
 * Agrupa as funcoes para persistencia da nota fiscal enviada
 * 
 * @param array $form_data informacoes do formulario
 * @param array $file_data informacoes dos arquivos enviados
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return ResultadoModulo
 * @author joao.fernando
 */
function registrar_nota_fiscal(array $form_data, array $file_data, int $codigo_usuario, DoFramwork $do): ResultadoModulo
{
    $file_data = $file_data['arquivosUploadNotaFiscal'];

    $resultado_salvar = salvar_nota_fiscal($form_data, $file_data, $codigo_usuario, $do);

    if (!$resultado_salvar->status) {
        return $resultado_salvar;
    }

    return new ResultadoModulo(true, 'Nota registrada com sucesso.');
}