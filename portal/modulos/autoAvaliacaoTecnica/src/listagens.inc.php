<?php
require_once('../../../../properties.inc.php');
require_once(ROOT . 'dofmw/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');

/**
 * Lista as tags e conhecimentos do usuario
 * Agrupa por classe
 * 
 * @param int $codigo_usuario codigo do usuario logado
 * @param DoFramwork $do instância do DoFramwork
 * 
 * @return array array agrupado por classe e tag
 * 
 * @author joao.fernando
 */
function listar_tags(int $codigo_usuario, DoFramwork $do): array
{
    $do->selectDBInstance('administrativo');

    $query = <<<SQL
    SELECT
        t.codigo,
        CASE
            WHEN !(t.class01 > '') THEN 'OUTROS'
            WHEN t.class01 IS NULL THEN 'OUTROS'
            ELSE t.class01
        END AS classe,
        t.tag,
        CAST(REPLACE(json_extract(pt.autoAvaliacao, '$[0].senioridade'), '"', '') AS UNSIGNED) AS senioridade,
        CASE
            WHEN json_extract(pt.autoAvaliacao, '$[0].estudo') = 'N' THEN FALSE
            WHEN json_extract(pt.autoAvaliacao, '$[0].estudo') = 'S' THEN TRUE
        END AS estudo,
        CASE
            WHEN json_extract(pt.autoAvaliacao, '$[0].projeto') = 'N' THEN FALSE
            WHEN json_extract(pt.autoAvaliacao, '$[0].projeto') = 'S' THEN TRUE
        END AS projeto
    FROM
        tags t
        LEFT OUTER JOIN pessoa_tags pt
            ON t.codigo = pt.Tags_codigo
                AND pt.Pessoa_codigo = $codigo_usuario
    ORDER BY
        classe ASC,
        t.tag ASC
        
    SQL;

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    $do->selectDBInstance('portaldofornecedor');

    if (is_array($result_as_array) & (count($result_as_array) > 0)) {
        $tags_agrupadas = agrupar_array_key($result_as_array, 'classe');
        return $tags_agrupadas;
    }
    return [];
}



