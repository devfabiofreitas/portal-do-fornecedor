<?php
require_once('../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');


/**
* Realiza o salvamento dos dados enviados pelo formulário
* utilizando outras funções desse arquivo

 * @param int $codigo_usuario codigo do usuario logado
 * @param DoFramwork $do instância do DoFramwork
 * @param array $form_data dados que vem do formulário 
 * 
 * @return 
 * 
 * @author thais.gomes
 */


function salva_informacoes(int $codigo_usuario, DoFramwork $do, array $form_data): ResultadoModulo
{
    $query = <<<SQL
    INSERT INTO pessoa_tags (Pessoa_codigo, Tags_codigo, Tags_tag, autoAvaliacao, ultimaAtualizacao) VALUES
    SQL;

    $tags_alteradas = 0;
    foreach($form_data['senioridade'] as $codigo_tag => $senioridade) {
        if ($senioridade == 0) {
            continue;
        }
        $nome_tag = $form_data['nomeTag'][$codigo_tag];
        $tag_array = [
            'estudo' => $form_data['estudo'][$codigo_tag],
            'projeto' => $form_data['projeto'][$codigo_tag],
            'senioridade' => $senioridade,
            'data_alteracao' => obterDataHoraAtual()
        ];

        $encoded_array = json_encode($tag_array);
        $query .= <<<SQL
            ('$codigo_usuario', '$codigo_tag', '$nome_tag', '[$encoded_array]', dataHoraAtual()),
        SQL;
        $tags_alteradas++;
    }

    if (str_ends_with($query, ',')) {
        $query = substr_replace($query, ' ', strlen($query) - 1, 1);
    }

    $query .= <<<SQL
    ON DUPLICATE KEY UPDATE
    autoAvaliacao = VALUES(autoAvaliacao),
    ultimaAtualizacao = VALUES(ultimaAtualizacao)
    SQL;

    if ($tags_alteradas > 0) {
        $do->selectDBInstance('administrativo');

        $do->begin();
        $result = $do->execute($query, 'INSERT', '');
        $do->commit();

        $do->selectDBInstance('portaldofornecedor');

        if ($result) {
            return new ResultadoModulo(true);
        }
    }
    return new ResultadoModulo(false);
}



/**
 * Executa o registro dos dados enviados 
 * 
 * @param array $form_data dados do formulario
 * @param array $file_data dados dos arquivos anexos
 * @param DoFramwork $do instancia do framework dofmw
 * 
 * @return ResultadoModulo resultado da validacao
 * @author joao.fernando
 */
function registrar_auto_avaliacao(int $codigo_usuario, DoFramwork $do, array $form_data): ResultadoModulo
{
    $info_registro = salva_informacoes($codigo_usuario,  $do, $form_data);
    if (!$info_registro->status) {
        return $info_registro;
    }
    return new ResultadoModulo(true, 'Informações salvas!');
}
