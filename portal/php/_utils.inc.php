<?php

/**
 * Remove caracteres passados no array de dentro de um string
 *
 * @param string $texto texto que tera os caracteres removidos
 * @param array $caracteres caracteres a remover do texto
 *
 * @author joao.fernando
 * @return string
 */
function remover_caracteres(string $texto, array $caracteres): string
{
    foreach ($caracteres as $c) {
        $texto = str_replace($c, '', $texto);
    }
    return $texto;
}

/**
 * Converte a string de data no formato especificado
 *
 * @param string $data texto com a data a ser convertida
 * @param string $formato formato para converter
 *
 * @return string
 * @author joao.fernando
 */
function converter_data_formato_customizado(string $data, string $formato = 'd/m/Y'): string
{
    return date($formato, strtotime($data));
}

/**
 * Cria caminho destino, concatenando o array de diretorios recebido
 * um os.path.join feito em casa
 * 
 * @param array $diretorios nomes dos diretorios
 * segue o formato {$diretorios[0]}/{$diretorios[1]}/{$diretorios[n]}/...
 * @param bool $usar_base controla se o caminho base do servidor
 * $_SERVER['DOCUMENT_ROOT'] será adicionado ao caminho final ou nao
 * 
 * @return string caminho criado
 * @author joao.fernando
 */
function criar_caminho_destino(array $diretorios, bool $usar_base = false): string
{
    $caminho_destino = '';
    foreach ($diretorios as $d) {
        $caminho_destino .= $d . '/';
    }

    if ($usar_base) {
        $caminho_destino = ROOT_INTERNETFILES . $caminho_destino;
    }
    return $caminho_destino;
}

/**
 * Salva o arquivo origem no caminho destino com o nome especificado
 *
 * @param string $caminho_origem caminho original do arquivo (provavelmente tmp/...)
 * @param string $diretorio_destino diretorio onde salvar o arquivo
 * @param string $nome_destino nome do arquivo no destino
 *
 * @return bool
 * @author joao.fernando
 */
function salvar_arquivo_em_disco(string $caminho_origem, string $diretorio_destino, string $nome_destino): bool
{
    if (!is_uploaded_file($caminho_origem)) {
        return false;
    }
    if (!move_uploaded_file($caminho_origem, $diretorio_destino . $nome_destino)) {
        return false;
    }
    return true;
}

/**
 * "Escapa" as string dentro do array, de acordo com o banco de dados fornecido
 * 
 * @param array $array array com as strings a serem escapadas
 * 
 * @return array array com as strings escapadas
 * @author joao.fernando
 */
function escapar_array_strings(array $array, DoFramwork $do): array
{
    $conn = $do->getInstanceDB();

    $escaped_array = [];
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $inner_array = escapar_array_strings($value, $conn);
            $escaped_array[$key] = $inner_array;
        } else {
            $escaped_array[$key] = mysqli_real_escape_string($conn, $value);
        }
    }
    return $escaped_array;
}

/**
 * Aqui temos uma gambiarra pra concertar outras gambiarras.
 * 
 * Quando uma consulta SQL falha utilizando o DoFramwork,
 * ele joga um echo na pagina com um mensagem de erro.
 * Isso funcionava quando a mensagem era interpretada
 * pelo JavaScript da pagina, mas com PHP puro a mensagem
 * é cuspida na tela.
 * 
 * A solucao é interceptar a mensagem antes que o echo aconteca,
 * utilizando o output buffer do PHP.
 * 
 * Esta funcao deve ser registrada como shutdown_function,
 * permitindo que ela seja executada mesmo com o exit() do framework
 * 
 * O resultado final é que cada funcao que precisa interagir com o banco
 * atraves do framework, deve chamar a funcao bloquear_echo_framework,
 * iniciando o buffer e impedindo echos na pagina.
 * 
 * Depois de feita a interacao, analisar_resposta_framework verifica
 * se a consulta foi bem sucedida ou nao, e redireciona o usuario
 * para a pagina correta.
 * 
 * @author joao.fernando
 */
function analisar_resposta_framework(): void
{
    $response = ob_get_clean();
    $json = json_decode($response);
    if ((isset($json)) & (!$json->success)) {
        if (isset($_SERVER['HTTP_REFERER'])) {
            $status_message = "status=0&message=Algo deu errado com o banco de dados. Verifique sua conexão e tente novamente.";
            header('Location: ' . $_SERVER['HTTP_REFERER'] . '&' . $status_message);
        }
    }
}

/**
 * Inicia o output buffer e registra a funcao analisar_resposta_framework
 * como shutdown_function
 *  
 * @see function analisar_resposta_framework()
 * @author joao.fernando
 */
function bloquear_echo_framework(): void
{
    ob_start();
    register_shutdown_function('analisar_resposta_framework');
}

/**
 * Converte uma string numero para float, considerando apenas os numeros
 * Ex.: R$100,20 = 100.20
 * 
 * @param string $num string com o numero
 * 
 * @return float string convertida
 * @author fabio.freitas
 */
function to_float(string $num): float
{
    $dotPos = strrpos($num, '.');
    $commaPos = strrpos($num, ',');
    $sep = (($dotPos > $commaPos) && $dotPos) ? $dotPos : ((($commaPos > $dotPos) && $commaPos) ? $commaPos : false);

    if (!$sep) {
        return floatval(preg_replace("/[^0-9]/", "", $num));
    }

    return floatval(
        preg_replace("/[^0-9]/", "", substr($num, 0, $sep)) . '.' .
            preg_replace("/[^0-9]/", "", substr($num, $sep + 1, strlen($num)))
    );
}

class ResultadoModulo
/**
 * Classe básica para padronizar o resultado dos modulos
 * 
 * @property bool $status true se a acao foi executa com sucesso, false caso contrário
 * @property string $mensagem mensagem de erro caso $status seja false
 * 
 * @author joao.fernando
 */
{
    public bool $status = false;
    public string $mensagem;

    public function __construct(bool $status, string $mensagem = '')
    {
        $this->status = $status;
        $this->mensagem = $mensagem;
    }

    /**
     * Codifica a mensagem para insercao em URLs
     * Deve ser adicionada ao final da URL
     * 
     * @return string mensagem codificada
     * @author joao.fernando
     */
    public function codificar_mensagem(): string
    {
        $mensagem_codificada = urlencode($this->mensagem);
        $status_codificado = ($this->status) ? '1' : '0';

        return utf8_encode("status=$status_codificado&message=$mensagem_codificada");
    }
}

/**
 * Cria e retorna o HTML de um alerta em javascript (utilizando sweetalerts)
 * Deve ser utilizado para interpretar a resposta de uma funcionalidade PHP
 * 
 * @param bool $sucesso resultado da requisicao, define qual alerta sera exibido
 * @param string $mensagem qual mensagem sera exibida no alerta
 * 
 * @return string codigo HTML que exibe o alerta
 */
function exibir_alerta_javascript(?bool $sucesso, ?string $mensagem): string
{
    $mensagem = str_replace(PHP_EOL, '', $mensagem);
    if (isset($sucesso)) {
        if ($sucesso) {
            return "Swal.fire('Sucesso', '$mensagem', 'success')";
        } else {
            return "Swal.fire('Ops... !', '$mensagem', 'warning')";
        }
    }
}

/**
 * Realiza validação de campos vazios
 * 
 * @param array $form_data dados passados pelo formulario
 * @param array $campos_nao_nulos campos para serem verificados
 * 
 * @return bool
 * @author thais.gomes
 */
function validar_campos_vazios(array $campos_nao_nulos , array $form_data): bool
{
    foreach($campos_nao_nulos as $campo) {
        if (preg_match('/^\s*$/', $form_data[$campo])) {
            return false;
        }
    }
    return true;
}

/**
 * Converte uma data no formato dd/mm/yyyy para o formato yyyy-mm-dd
 * 
 * @param string $data data no formato dd/mm/yyyy
 * @return string data no formato yyyy-mm-dd
 * 
 * @author joao.fernando
 */
function converter_data_formato_brasileiro(string $data): string
{
    $data_array_split = preg_split('[/]', $data);
    $data_string = join('-', array_reverse($data_array_split));
    return $data_string;
}

/**
 * Converte valores no formato '3000.00 para 3.000,00'
 * 
 * @param string $valor com ponto
 * @return string $valor com virgula
 * 
 * @author thais.gomes
 */

 function formatar_valor($valor) {
    $valor_numerico = floatval($valor);
    return number_format($valor_numerico, 2, ',', '.');
  }

  /**
 * Converte data no formato mm/yyyy para yyyy-mm
 * 
 * @param string $data no formato mm/yyyy
 * @return string $data no formato  yyyy-mm
 * 
 * @author thais.gomes
 */

 function formatar_mes_ano($data) {
    $data = DateTime::createFromFormat('m/Y', $data);
    if (!$data) {
        return false;
    }
    return $data->format('Y-m');
}

 /**
 * Converte data no formato  yyyy-mm para mm/yyyy
 * 
 * @param string $data no formato  yyyy-mm
 * @return string $data no formato  mm/yyyy
 * 
 * @author thais.gomes
 */

function formatar_mes_ano_brasileiro($data) {
    $data = DateTime::createFromFormat('Y-m', $data);
    if (!$data) {
        return false;
    }
    return $data->format('m/Y');
}

/**
 * Agrupa o array fornecido pelos valores da chave passada
 * 
 * @param array $array array a ser agrupado
 * @param string $key chave do array que será agrupada
 * 
 * @return array
 * @author joao.fernando
 */
function agrupar_array_key(array $array, string $key): array
{
    $return = [];
    foreach($array as $val) {
        $return[$val[$key]][] = $val;
    }

    return $return;
}

/**
 * Pega a hora e data atual 
 * 
 * @return string
 * @author thais.gomes
 */
function obterDataHoraAtual() {
    $fusoHorario = new DateTimeZone('America/Sao_Paulo');
    $dataHoraAtual = new DateTime('now', $fusoHorario);
    return $dataHoraAtual->format('d/m/Y H:i:s');
}

/**
 * Adaptação da função str_starts_with do PHP 8 para o PHP7.4
 * Verifica se a string $haystack começa com o $needle
 * 
 * @param string $haystack string a ser verificada
 * @param string $needle string a ser procurado
 * 
 * @return bool
 */
function str_starts_with(string $haystack, string $needle): bool {
    $length = strlen($needle);
    return substr($haystack, 0, $length) === $needle;
}

/**
 * Adaptação da função str_ends_with do PHP 8 para o PHP7.4
 * Verifica se a string $haystack termina com o $needle
 * 
 * @param string $haystack string a ser verificada
 * @param string $needle string a ser procurado
 * 
 * @return bool
 */
function str_ends_with(string $haystack, string $needle): bool {
    $length = strlen($needle);
    if(!$length) {
        return true;
    }
    return substr($haystack, -$length) === $needle;
}
