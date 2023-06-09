<?php
require_once('../../../../properties.inc.php');
require_once(DOFMW . '/Do.class.php');
require_once(ROOT . 'portal/php/utils.inc.php');
$do->getUserSession();


/**
 * Lista informacoes de notas fiscais do colaborador
 * 
 * @param int $codigo_usuario codigo do usuario logaid
 * @param DoFramwork $do instancia do DoFramwork
 * 
 * @return array array com dados
 * @author thais.gomes
 */
function listar_notas_fiscais(int $codigo_usuario, DoFramwork $do): array
{
  $query = "
    SELECT 
    N.mesReferencia, 
    N.caminho, 
    E.cnpj, 
    N.dataCadastro, 
    N.periodoFim, 
    N.periodoInicio, 
    N.horasRealizadas,
    N.valor, 
    N.codigo, 
    N.status, 
    N.observacao
    FROM 
        responsaveis_tecnicos AS R 
        INNER JOIN usuarios U ON (U.codigo = R.Usuario_codigo ) 
        INNER JOIN empresas E ON (E.codigo = U.Empresa_codigo ) 
        INNER JOIN notas_fiscais N ON (N.Empresa_codigo = E.codigo)
    WHERE R.codigo = '$codigo_usuario'
    ORDER BY N.dataCadastro DESC";

  $do->begin();
  $result = $do->execute($query, 'SELECT', '');
  $do->commit();
  $result_as_array = $do->toJSON($result);

  return $result_as_array;
  var_dump($result_as_array);
}

/**
 * visualização de cada nota fiscal do colaborador
 * @param int $codigo_usuario codigo do usuario logaid
 *  @param int $codigo_nota_fiscal codigo da nota fiscal
 * @param DoFramwork $do instancia do DoFramwork
 * 
 * @return array array com dados
 * @author thais.gomes
 */
function listar_notas_fiscais_filtro(string $form_filtro, int $codigo_usuario, DoFramwork $do): array
{
  $query = "
    SELECT 
    N.mesReferencia, 
    N.caminho, 
    E.cnpj, 
    N.dataCadastro, 
    N.periodoFim, 
    N.periodoInicio, 
    N.horasRealizadas,
    N.valor, 
    N.codigo, 
    N.status, 
    N.observacao
    FROM 
        responsaveis_tecnicos AS R 
        INNER JOIN usuarios U ON (U.codigo = R.Usuario_codigo ) 
        INNER JOIN empresas E ON (E.codigo = U.Empresa_codigo ) 
        INNER JOIN notas_fiscais N ON (N.Empresa_codigo = E.codigo) 
    WHERE 
        R.codigo = '$codigo_usuario' AND n.mesReferencia IN ('$form_filtro') 
    ORDER BY N.dataCadastro DESC";

  $do->begin();
  $result = $do->execute($query, 'SELECT', '');
  $do->commit();
  $result_as_array = $do->toJSON($result);

  return $result_as_array;
}


/**
 * visualização da tabela com os dados de notas fiscais
 *  
 * @param info_nota array com os dados das notas
 * 
 * @return string com o template da tabela
 * @author thais.gomes
 */
function gerar_tabela(array $info_nota): string
{
  $url = '../../../../internetfiles/';

  $template_tabela =
    "<thead>
      <tr>
        <th>Mês referência</th>
        <th>CNPJ</th>
        <th>Data cadastro</th>
        <th>Período inicio</th>
        <th>Período fim</th>
        <th>Horas realizadas</th>
        <th>Valor</th>
        <th>Status</th>
        <th>Observação</th>
        <th></th>
      </tr>
    </thead>
    <tbody>";

  if (sizeof($info_nota)) {
    foreach ($info_nota as $row) {
      $periodo_inicio_formatada = converter_data_formato_customizado($row['periodoInicio']);
      $periodo_fim_formatada = converter_data_formato_customizado($row['periodoFim']);
      $data_cadastro_formatado = converter_data_formato_customizado($row['dataCadastro'], 'd/m/Y H:i:s');
      $valor_formatado = formatar_valor($row['valor']);
      $status_formatado = verificar_status($row['status']);

      $template_tabela .= "<tr>
            <td class='text-nowrap'> {$row['mesReferencia']} </td>
            <td class='text-nowrap'> {$row['cnpj']} </td>
            <td class='text-nowrap'> {$data_cadastro_formatado} </td>
            <td class='text-nowrap'> {$periodo_inicio_formatada} </td>
            <td class='text-nowrap'> {$periodo_fim_formatada} </td>
            <td class='text-nowrap'> {$row['horasRealizadas']}h </td>
            <td class='text-nowrap'> R$ {$valor_formatado} </td>
            <td class='text-nowrap'> {$status_formatado} </td>
            <td class='text-nowrap' data-toggle='tooltip' data-placement='bottom' title='{$row['observacao']}'>{$row['observacao']}</td>
            <td> <div><a class='visualizar' data-value='{$row['caminho']}' onclick='window.open(\"{$url}{$row['caminho']}\", \"_blank\", \"STATUS=NO,MENUBAR=NO,TOOLBAR=NO,LOCATION=NO,DIRECTORIES=NO,RESISABLE=NO,SCROLLBARS=YES,TOP=10,LEFT=10,WIDTH=940,HEIGHT=640\")' title='Visualizar'><i class='fas fa-eye text-secondary'></i></a></div></td>
        ";
    }
  } else {
    $template_tabela .= ' <tr>
                <td colspan="10">Sem registros</td>
            </tr>';
  }

  $template_tabela .= "</tbody>";

  return $template_tabela;
}


/**
 * verificação do status da nota fiscal
 *  
 * @param $status 
 * 
 * @return string retorna com uma palavra para cada status
 * @author thais.gomes
 */

function verificar_status($status)
{
  switch ($status) {
    case 'A':
      return 'Aprovada';
      break;
    case 'R':
      return 'Reprovada';
      break;
    case 'E':
      return 'Em análise';
      break;
    default:
      break;
  }
}
