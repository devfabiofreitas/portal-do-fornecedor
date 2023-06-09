<?php
require_once('../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');
$do->getUserSession();

/**
 * Lista informacoes basicas do colaborador
 * 
 * @param int $codigo_usuario codigo do usuario logaid
 * @param DoFramwork $do instancia do DoFramwork
 * 
 * @return array array com dados
 * @author thais.gomes
 */
function listar_dados_colaborador(int $codigo_usuario, DoFramwork $do): array
{
    $query = "
    SELECT 
        R.nome, 
        R.cpf, 
        R.dataNascimento, 
        R.telefone,
        R.telefonePais, 
        R.email, 
        R.emailPessoal, 
        R.dataInicio, 
        R.telefonePaisEmergencia,
        R.telefoneEmergencia, 
        R.nomeEmergencia, 
        E.cnpj, 
        E.razaoSocial, 
        E.nomeFantasia, 
        E.tipo, 
        E.porte, 
        E.naturezaJuridica, 
        E.dataAbertura, 
        E.cep, 
        E.logradouro, 
        E.numero,
        E.complemento, 
        E.bairro, 
        E.cidade, 
        E.estado, 
        R.tipoDocumento, 
        R.documento, 
        R.banco, 
        R.bancoNumero, 
        R.agencia, 
        R.digitoAgencia, 
        R.conta, 
        R.digitoConta, 
        R.beneficiario
    FROM 
        responsaveis_tecnicos AS R 
        INNER JOIN usuarios U ON (U.codigo = R.Usuario_codigo ) 
        LEFT JOIN empresas E ON (E.codigo = U.Empresa_codigo ) 
    WHERE 
        R.codigo = '$codigo_usuario'";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    return $result_as_array[0];
}

/**
 * Lista a quantidade de filhos do colaborador
 * 
 * @param int $codigo_usuario codigo do usuario logaid
 * @param DoFramwork $do instancia do DoFramwork
 * 
 * @return array array com dados
 * @author thais.gomes
 */

function listar_qtdFilhos(int $codigo_usuario, DoFramwork $do): array
{
    
    $do->selectDBInstance('administrativo');

    $query = "
    SELECT 
        qtdFilhos
    FROM 
        pessoa
    WHERE 
        codigo = '$codigo_usuario'";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    $do->selectDBInstance('portaldofornecedor');

    return $result_as_array[0];
}
