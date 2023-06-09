<?php
require_once('../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once('utils.inc.php');
$do->getUserSession();


/**
 * Atualiza os dados cadastrais no banco de dados
 * 
 * @param array $form_data dados passados pelo formulario
 * @param int $usuario_codigo codigo do usuario logado
 * 
 * @return bool
 * @author thais.gomes
 */
function atualizar_dados_consultor(array $form_data, int $usuario_codigo, DoFramwork $do): bool
{
    bloquear_echo_framework();

    $data_nascimento = date('Y-m-d', strtotime(strtr($form_data['dataNascimento'], '/', '-')));
    $nomeEmergencia = utf8_decode($form_data['nomeEmergencia']);
    $emailPessoal = utf8_decode($form_data['emailPessoal']);
    $form_data = escapar_array_strings($form_data, $do);
    $query = "
    UPDATE
        responsaveis_tecnicos AS R

    SET
        R.telefonePais = '{$form_data['telefonePais']}',
        R.telefone =  '{$form_data['telefone']}',
        R.emailPessoal = '{$emailPessoal}',
        R.dataNascimento = '$data_nascimento',
        R.telefonePaisEmergencia = '{$form_data['telefonePaisEmergencia']}',
        R.telefoneEmergencia = '{$form_data['telefoneEmergencia']}',
        R.nomeEmergencia = '$nomeEmergencia',
        R.dataAlteracao = dataHoraAtual()
    WHERE
        R.codigo = '$usuario_codigo'";

    $do->begin();
    $result = $do->execute($query, 'UPDATE', '');
    $do->commit();

    if ($result) {
        return true;
    }
    return false;
}

/**
 * Atualiza os dados da empresa no banco de dados
 * 
 * @param array $form_data dados passados pelo formulario
 * @param int $usuario_codigo codigo do usuario logado
 * 
 * @return bool
 * @author joao.fernando
 */
function atualizar_dados_empresa(array $form_data, int $usuario_codigo, DoFramwork $do): bool
{
    bloquear_echo_framework();
    
    $razaoSocial = utf8_decode($form_data['razaoSocial']);
    $nomeFantasia = utf8_decode($form_data['nomeFantasia']);
    $logradouro = utf8_decode($form_data['logradouro']);
    $bairro = utf8_decode($form_data['bairro']);
    $complemento = utf8_decode($form_data['complemento']);
    $tipo = utf8_decode($form_data['tipo']);
    $naturezaJuridica = utf8_decode($form_data['naturezaJuridica']);
    $porte = utf8_decode($form_data['porte']);
    $cidade = utf8_decode($form_data['cidade']);

    $form_data = escapar_array_strings($form_data, $do);
    $query = "
    UPDATE 
        responsaveis_tecnicos AS R 
        INNER JOIN usuarios U ON (U.codigo = R.Usuario_codigo ) 
        LEFT JOIN empresas E ON (E.codigo = U.Empresa_codigo ) 
    SET
        E.razaoSocial = '$razaoSocial',
        E.nomeFantasia = '$nomeFantasia',
        E.dataAbertura = '{$form_data['dataAbertura']}',
        E.logradouro = '$logradouro',
        E.cep = '{$form_data['cep']}',
        E.bairro = '$bairro',
        E.numero = '{$form_data['numero']}',
        E.complemento = '{$complemento}',
        E.cidade = '$cidade',
        E.estado = '{$form_data['estado']}',
        E.tipo = '$tipo',
        E.naturezaJuridica = '$naturezaJuridica',
        E.porte = '$porte',
        E.dataAlteracao = dataHoraAtual() 
    WHERE
        R.codigo = '$usuario_codigo'";

    $do->begin();
    $result = $do->execute($query, 'UPDATE', '');
    $do->commit();

    if ($result) {
        return true;
    }
    return false;
}

/**
 * Atualiza os dados cadastrais no banco de dados
 * Executa a query SQL
 * 
 * @param array $form_data dados passados pelo formulario
 * @param int $usuario_codigo codigo do usuario logado
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return bool
 * @author thais.gomes
 */
function atualizar_senha(array $form_data, int $usuario_codigo, DoFramwork $do): bool
{
    bloquear_echo_framework();

    $form_data = escapar_array_strings($form_data, $do);
    $senhaNova = hash('sha512', $form_data['senhaNova']);

    $query = " 
    UPDATE 
        usuarios AS U 
    INNER JOIN responsaveis_tecnicos R ON (U.codigo = R.Usuario_codigo) 
        SET 
        U.senha = '$senhaNova',
        U.dataAlteracao = dataHoraAtual()
    WHERE
        R.codigo = '$usuario_codigo'";

    $do->begin();
    $result = $do->execute($query, 'UPDATE', '');
    $do->commit();

    if ($result) {
        return true;
    }
    return false;
}

/**
 * Atualiza os a informação de quantidade de filhos no banco de dados remoto
 * Executa a query SQL
 * 
 * @param array $form_data dados passados pelo formulario
 * @param int $usuario_codigo codigo do usuario logado
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return bool
 * @author thais.gomes
 */

function atualizar_informacao_qtdFilhos_banco_remoto(array $form_data, int $usuario_codigo, DoFramwork $do): bool
{
    bloquear_echo_framework();

    $do->selectDBInstance('administrativo');

    $form_data = escapar_array_strings($form_data, $do);
    
    $query = " 
    UPDATE 
        pessoa
    SET 
        qtdFilhos = '{$form_data['qtdFilhos']}'
    WHERE
        codigo = '$usuario_codigo'";

    $do->begin();
    $result = $do->execute($query, 'UPDATE', '');
    $do->commit();

    $do->selectDBInstance('portaldofornecedor');
    if ($result) {
        return true;
    }

    return false;
}


/**
 * Agrupa as funcoes para atualizar os dados cadastrais
 * 
 * @param array $form_data dados passados pelo formulario
 * @param int $usuario_codigo codigo do usuario logado
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return ResultadoModulo
 * @author thais.gomes
 */
function salvar_formulario_consultor(array $form_data, int $usuario_codigo, DoFramwork $do): ResultadoModulo
{
    if (!atualizar_dados_consultor($form_data, $usuario_codigo, $do)) {
        return new ResultadoModulo(false, 'Não foi possível salvar as informações no banco de dados.');
    }
    if (!atualizar_informacao_qtdFilhos_banco_remoto($form_data, $usuario_codigo, $do)) {
        return new ResultadoModulo(false, 'Não foi possível inserir as informações no banco de dados.');
    }

    return new ResultadoModulo(true, 'Informações salvas!');
}



/**
 * Agrupa as funcoes para atualizar os dados da empresa
 * 
 * @param array $form_data dados passados pelo formulario
 * @param int $usuario_codigo codigo do usuario logado
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return ResultadoModulo
 * @author joao.fernando
 */
function salvar_formulario_empresa(array $form_data, int $usuario_codigo, DoFramwork $do): ResultadoModulo
{
    if (!atualizar_dados_empresa($form_data, $usuario_codigo, $do)) {
        return new ResultadoModulo(false, 'Não foi possível salvar as informações no banco de dados.');
    }


    return new ResultadoModulo(true, 'Informações salvas!');
}

/**
 * Agrupa as funcoes para atualizar a senha de acesso do usuario
 * 
 * @param array $form_data dados passados pelo formulario
 * @param int $usuario_codigo codigo do usuario logado
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return ResultadoModulo
 * @author thais.gomes
 */
function salvar_senha(array $form_data, int $usuario_codigo, DoFramwork $do): ResultadoModulo
{
    if (!atualizar_senha($form_data, $usuario_codigo, $do)) {
        return new ResultadoModulo(false, 'Não foi possível atualizar a senha.');
    }
    return new ResultadoModulo(true, 'Senha Salva!');
}
