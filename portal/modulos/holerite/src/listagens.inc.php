<?php
require_once('../../../../properties.inc.php');
require_once(DOFMW . '/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');
$do->getUserSession();


/**
 * Lista informacoes de holerite do colaborador
 * 
 * @param int $codigo_usuario codigo do usuario logaid
 * @param DoFramwork $do instancia do DoFramwork
 * 
 * @return array array com dados
 * @author thais.gomes
 */
function listar_holerite(int $codigo_usuario, DoFramwork $do): array
{
    $do->selectDBInstance('administrativo');

    $query = "
    SELECT 
    mesReferencia, 
    codigo, 
    caminho,
    DATE_FORMAT(dataCadastro,'%d/%m/%Y') AS dataUpload 
    FROM 
        holerite 
    WHERE 
        Pessoa_codigo = '$codigo_usuario' AND status = 'H' 
    ORDER BY dataCadastro DESC";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    $do->selectDBInstance('portaldofornecedor');

    if (is_array($result_as_array) & (count($result_as_array) > 0)) {
        return $result_as_array;
    }
    return [];
}


/**
 * visualização de cada holerite do colaborador
 * @param int $codigo_usuario codigo do usuario logaid
 * @param DoFramwork $do instancia do DoFramwork
 * 
 * @return array array com dados
 * @author thais.gomes
 */
function listar_holerite_filtro(string $form_filtro, int $codigo_usuario, DoFramwork $do): array
{
    $mes_ano_formatado = formatar_mes_ano($form_filtro);

    $do->selectDBInstance('administrativo');

    $query = "
    SELECT 
    mesReferencia, 
    codigo, 
    caminho,
    DATE_FORMAT(dataCadastro,'%d/%m/%Y') AS dataUpload 
    FROM 
        holerite 
    WHERE 
        Pessoa_codigo = '$codigo_usuario' AND status = 'H' AND mesReferencia IN ('$mes_ano_formatado')  
    ORDER BY dataCadastro DESC";

    $do->begin();
    $result = $do->execute($query, 'SELECT', '');
    $do->commit();
    $result_as_array = $do->toJSON($result);

    $do->selectDBInstance('portaldofornecedor');


    return $result_as_array;
}


/**
 * visualização da tabela com os dados de holerite
 *  
 * @param info_holerite array com os dados do holerite
 * 
 * @return string com o template da tabela
 * @author thais.gomes
 */
function gerar_tabela(array $info_holerite, string $usuario_nome): string
{

    $template_tabela =
        "<thead>
      <tr>
        <th>Mês referência</th>
        <th>Nome</th>
        <th>Data de upload</th>
        <th></th>
      </tr>
    </thead>
    <tbody>";

    if (sizeof($info_holerite)) {
        foreach ($info_holerite as $row) {
            $mes_referencia_formatado = formatar_mes_ano_brasileiro($row['mesReferencia'], 'm/Y');
            $template_tabela .= "<tr>
                        <td> {$mes_referencia_formatado} </td>
                        <td> {$usuario_nome} </td>
                        <td class='text-nowrap'> {$row['dataUpload']} </td>
                        <td> <div><a class='visualizar' data-value='{$row['caminho']}' title='Visualizar'><i class='fas fa-eye text-secondary'></i></a></div></td>
                        </tr>";
        }
    } else {
        $template_tabela .= ' <tr>
                <td colspan="4">Sem registros</td>
            </tr>';
    }


    $template_tabela .= "</tbody>";

    return $template_tabela;
}
