<?php
require_once('../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once('utils.inc.php');
$do->getUserSession();

/**
 * Agrupa todas as validacoes dos campos do formulario do consultor
 * 
 * @param array $form_data dados passados pelo formulario
 * 
 * @return ResultadoModulo
 * @author thais.gomes
 */
function validar_campos_dados_consultor(array $form_data): ResultadoModulo
{
    $campos_nao_nulos = [
        'dataNascimento',
        'telefonePais',
        'telefone',
        'emailPessoal',
        'telefonePaisEmergencia',
        'telefoneEmergencia',
        'nomeEmergencia',
        'qtdFilhos'
  
    ];

    foreach($campos_nao_nulos as $campo) {
        if (preg_match('/^\s*$/', $form_data[$campo])) {
            return new ResultadoModulo(false, 'Preencha o campo vazio');
        }
    }

  

    return new ResultadoModulo(true);
}


/**
 * Agrupa todas as validacoes dos campos do formulario da empresa
 * 
 * @param array $form_data dados passados pelo formulario
 * 
 * @return ResultadoModulo
 * @author joao.fernando
 */
function validar_campos_dados_empresa(array $form_data): ResultadoModulo
{
    $campos_nao_nulos = [
        'cnpj',
        'razaoSocial',
        'tipo',
        'porte',
        'naturezaJuridica',
        'cep',
        'logradouro',
        'numero',
        'bairro',
        'cidade',
        'estado'
    ];

    foreach($campos_nao_nulos as $campo) {
        if (empty($form_data[$campo]) || is_null($form_data[$campo])) {
            return new ResultadoModulo(false, 'Preencha o campo vazio');
        }
    }

    return new ResultadoModulo(true);
}

/**
 * Valida os campos do formulario de troca de senha
 * 
 * @param array $form_data dados passados pelo formulario
 * 
 * @return ResultadoModulo
 * @author thais.gomes
 */
function validar_campos_senha(array $form_data): ResultadoModulo
{
    if (preg_match('/^\s*$/', $form_data['senhaNova'])) {
        return new ResultadoModulo(false, 'Preencha o campo vazio');
    }
  
    if (preg_match('/^\s*$/', $form_data['senhaNovaValida'])) {
        return new ResultadoModulo(false, 'Preencha o campo vazio');
    }
    
    if ($form_data['senhaNovaValida'] != $form_data['senhaNova']) {
        return new ResultadoModulo(false, 'As senhas devem ser iguais');
    }
    return new ResultadoModulo(true);
}

