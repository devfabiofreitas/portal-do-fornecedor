<?php

    error_reporting(E_STRICT);
    setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
    date_default_timezone_set('America/Sao_Paulo');
    
    ($ansi_encoded_html);
    iconv('windows-1252', 'UTF-8', $ansi_encoded_html);
    mb_convert_encoding($ansi_encoded_html, 'UTF-8', 'windows-1252');
	header('Content-Type: text/html; charset=UTF-8');

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
    define('DEFAULT_DB', 'portaldofornecedor');  

	require_once('../../../../../properties.inc.php');
	require_once('../../../../../properties.db.inc.php');
    require_once( DOFMW . '/Do.class.php');
    $do->validarSessao();


    $params = $_POST['params'];
    $params = json_decode($_POST['params'], true);
    $data = $params['mesAno'];

    $mes_extenso = array(
        'Janeiro' => 'January',
        'Fevereiro' => 'February',
        'Março' => 'March',
        'Abril' => 'April',
        'Maio' => 'May',
        'Junho' => 'June',
        'Julho' => 'July',
        'Agosto' => 'August',
        'Setembro' => 'September',
        'Outubro' => 'October',
        'Novembro' => 'November',
        'Dezembro' => 'December'
    );

    $diaSemana_extenso = array(
        'Segunda-Feira',
        'Terça-Feira',
        'Quarta-Feira',
        'Quinta-Feira',
        'Sexta-Feira',
        'Sábado',
        'Domingo'
    );
    $start_date = date_create( $params['dataInicio']);
    $end_date   = date_create(date('Y-m-d', strtotime("+1 days",strtotime($params['dataFim'])))); 
    $interval = DateInterval::createFromDateString('1 day');
    $daterange = new DatePeriod($start_date, $interval ,$end_date);
    $meses = array(1 => "Janeiro", 2 => "Fevereiro", 3 => "Março", 4 => "Abril", 5 => "Maio", 6 => "Junho", 7 => "Julho", 8 => "Agosto", 9 => "Setembro", 10 => "Outubro", 11 => "Novembro", 12 => "Dezembro");
    $and = "";
    $sqlCommand .= ' SELECT ';
    $sqlCommand .= '     b.User as User, ';
    $sqlCommand .= '     b.Email, ';
    $sqlCommand .= '     b.Start_Date, ';
    $sqlCommand .= '     b.Project, ';
    $sqlCommand .= '     b.Client, '; 
    $sqlCommand .= '     b.Description, ';
    $sqlCommand .= '     b.Start_Time, ';
    $sqlCommand .= '     b.End_Time, ';
    $sqlCommand .= '     b.Duration_h, ';
    $sqlCommand .= '     b.Duration_d, ';
    $sqlCommand .= '     (SELECT  ';
    $sqlCommand .= '         SEC_TO_TIME(SUM(TIME_TO_SEC(c.Duration_h))) ';
    $sqlCommand .= '     FROM ';
    $sqlCommand .= '         timesheet c '; 
    $sqlCommand .= '     WHERE ';
    $sqlCommand .= '         c.Email = b.Email ';
    $sqlCommand .= '         AND c.Project <> "Almoço" ';
    $sqlCommand .= '         AND c.Start_Date = b.Start_Date  ';
    if($params['cliente']){
        $sqlCommand .=  ' AND c.Cliente_codigo =  '.$params['cliente'].' ';
    }
    if($params['agruparProjeto'] == "S" && $params['projeto']){
        $sqlCommand .= ' AND c.Projeto_codigo =  '.$params['projeto'].' ';
    }
    $sqlCommand .= '     ) AS totalHrDia, ';
    $sqlCommand .= '         (SELECT  ';
    $sqlCommand .= '             SEC_TO_TIME(SUM(TIME_TO_SEC(c.Duration_h))) ';
    $sqlCommand .= '         FROM ';
    $sqlCommand .= '             timesheet c ';
    $sqlCommand .= '         WHERE ';
    $sqlCommand .= '             c.Email = b.Email AND ';
    $sqlCommand .= '             c.Project <> "Almoço" AND ';
    $sqlCommand .= '             DATE_FORMAT(c.Start_Date, "%m/%Y") = DATE_FORMAT(b.Start_Date, "%m/%Y")  '; 
    if($params['cliente']){
        $sqlCommand .=  ' AND c.Cliente_codigo =  '.$params['cliente'].' ';
    }
    if($params['agruparProjeto'] == "S" && $params['projeto']){
        $sqlCommand .= ' AND c.Projeto_codigo =  '.$params['projeto'].' ';
    }
    $sqlCommand .= '     ) AS totalHrMes ';
    $sqlCommand .= ' FROM ';
    $sqlCommand .= '     responsaveis_tecnicos a  ';
    $sqlCommand .= '         RIGHT JOIN ';
    $sqlCommand .= '     timesheet b ON a.codigo = b.Responsavel_codigo ';
    $sqlCommand .= ' WHERE'; 

    if($params['mesAno']){
        $sqlCommand .= $and . '  DATE_FORMAT(b.Start_date, "%m/%Y")  = "'.$params["mesAno"].'" ';
        $and = "AND";
    }
    if($params['dataInicio']){
        $sqlCommand .= $and . ' b.Start_Date BETWEEN  "'.$params['dataInicio'].'" AND "'.$params['dataFim'].'" ';
        $and = "AND";
    }
    if($params['cliente']){
        $sqlCommand .= $and . ' b.Cliente_codigo =  '.$params['cliente'].' ';
        $and = "AND";
    }
    if($params['agruparProjeto'] == "S" && $params['projeto']){
        $sqlCommand .= $and . ' b.Projeto_codigo =  '.$params['projeto'].' ';
        $and = "AND";
    }
    if($params['consultor']){
        $sqlCommand .= $and . ' b.Responsavel_codigo =  '.$params['consultor'].' ';
        $and = "AND";
    }
   
    $sqlCommand .= ' AND b.Project <> "Feriado" AND ';
    $sqlCommand .= '     b.Project <> "Férias" AND ';
    $sqlCommand .= '     b.Project <> "Ausência" AND ';
    $sqlCommand .= '     b.Project <> "Pausa das atividades" AND ';
    $sqlCommand .= '     b.Project <> "Ausência - Programada" AND ';
    $sqlCommand .= '     b.Project <> "Ausência - Não Programada" AND     ';   
    $sqlCommand .= '     b.Description <> "Feriado" AND		 ';
    $sqlCommand .= '     b.Description <> "Férias" AND	 ';	
    $sqlCommand .= '     b.Description <> "Ausência" AND		 ';
    $sqlCommand .= '     b.Description <> "Pausa das atividades"  AND	  ';	
    $sqlCommand .= '     b.Description <> "Ausência - Programada" AND	  ';	
    $sqlCommand .= '     b.Description <> "Ausência - Não Programada"  ';
    $sqlCommand .= ' ORDER BY b.User, b.Start_Date, b.Start_time ASC ';
    $do->begin();
    $result = $do->execute($sqlCommand, "SELECT","");
    $do->commit();
    $elements = $do->toJSON( $result );

    if(count($result) < 1){
        $do->end();
        echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
        exit;
    }else{

        $datas = [];
        $dias = [];
        $grupoDados = [];
        $mesAno = '';
        $todasDatas = [];

        for($i = 0; $i < count($elements); $i++){
            if(!in_array($elements[$i]['Start_Date'], $datas)){
                array_push($datas, $elements[$i]['Start_Date']);
                $tempDate = explode('-', $elements[$i]['Start_Date']);
                if($params['dataInicio']){
                    array_push($dias, $tempDate[2]."-".$tempDate[1]);
                }else{
                    array_push($dias, $tempDate[2]);
                }
            }
        }

        for($i = 0; $i < count($datas); $i++){
            $obj = [];
            $duration = 0;
            $soma = 0;
            for($j = 0; $j < count($elements); $j++){
                if($datas[$i] == $elements[$j]['Start_Date']){

                    $tempoEmSegundos = tempo_em_segundos($elements[$j]['Duration_h']);
                    $soma = $soma + $tempoEmSegundos;
                    array_push($obj, $elements[$j]);
                }  
            }

            $objHoras = [];
            $tempo = segundos_em_tempo($soma);
            array_push($objHoras, $tempo);
            array_push($obj, $objHoras);
            array_push($grupoDados, $obj);            

            $tempoTotalEmSegundos = tempo_em_segundos($tempo);
            $somaTotal = $somaTotal + $tempoTotalEmSegundos;
        }
        $total_d = 0;
        for ($t = 0; $t <  count($elements); $t++){
            $total_d += $elements[$t]['Duration_d'];
        }
        // var_dump($obj);
        $html = '
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Relatório</title>
                    <style>
                            @page { 
                                size: landscape;
                            }

                            @media print {
                                .table-header {
                                    background-color: #eeeeee;
                                    font-weight: bold;
                                    -webkit-print-color-adjust: exact;
                                }

                                table {
                                    font-size: 12px !important;
                                }
                            }

                            body {
                                font-family: "Helvetica";
                                font-size: 12px;
                                height: 100%;
                                color: #3f3f3f;
                            }

                            .break-page{
                                page-break-after: always;
                            }

                            .header {
                                padding: 20px;
                                text-align: center;
                            }

                            .header h2 {
                                font-size: 22px;
                            }

                            .container {
                                padding-left: 25px;
                                padding-right: 25px;
                            }

                            .table-border {
                                border-collapse: collapse !important;
                                overflow: visible!important;
                            }
                            .table-border tr td, .table-border tr th{
                                border: 1px solid #d4d4d4;
                            }

                            .header-table tr td, .header-table tr th {
                                padding: 6px 5px !important;
                            }

                            tr td, tr th{
                                padding: 3px 5px;
                            }

                            .table-header {
                                background-color: #eeeeee;
                                font-weight: bold;
                            }

                            .table{
                                width: 100%;
                                border: 1px solid #d4d4d4;
                                border-radius: 6px;
                                padding: 0px;
                                margin: 0px;
                                overflow: hidden;
                            }

                            .w-50 {
                                width: 50%;
                            }

                            .text-center {
                                text-align: center !important;
                            }

                            .div-logo img {
                                width: 100%;
                                max-width: 260px;
                                text-align: center;
                            }

                            #logoCliente {
                                width: 100%;
                                height: auto;
                            }

                            .btn-imprimir {
                                padding: 0.7em;
                                font-weight: Bold;
                                font-family: Arial;
                                background-color: #2CABE0 !important;
                                color: #fff !important;
                                border-radius: 50rem!important;
                                border: 0px;
                                cursor: pointer;
                            }

                            @media print{
                                .btn-imprimir {
                                    display: none
                                }
                            }

                            #logoCliente {
                                width: 100%;
                                height: auto;
                            }
                    </style>
                </head>
                <body>            
                    <div class="break-page container">
                        <div class="fixed-top">
                            <div style="text-align: right;">
                                <button type="button" class="btn-imprimir" onclick="imprimir()">
                                    IMPRIMIR
                                </button>
                            </div>
                        </div>
                        <div class="header">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                              
                                <div>
                                    <h2 style="color: #2cabe0;">Relatório de Prestação de Serviço</h2>
                                </div>
                            </div>
                        </div>

                        <div>
                            <table class="table header-table" cellspacing="0">
                                    <tr class="text-center">
        ';
                                        if($params['cliente'] != ''){
        $html .='
                                        <th class="table-header">CLIENTE</th>
        ';
                                        }
                                        if($params['agruparProjeto'] != "N" && $params['projeto'] != ''){
        $html .='
                                        <th class="table-header">PROJETO</th>
        ';
                                        }
        $html .='
                                        <th class="table-header">CONSULTOR</th>
        ';
                           
        $html .='
                                    </tr>
                                    <tr class="text-center">        
        ';
                                        if($params['cliente'] != ''){
        $html .='                            
                                        <td>' . ($elements[0]['Client']) . '</td>
        ';
                                        }
                                        if($params['agruparProjeto'] != "N" && $params['projeto'] != ''){
        $html .='
                                        <td>' . ($elements[0]['Project']) . '</td>
        ';
                                        }
        $html .='
                                        <td>' . $elements[0]['User'] . '</td>
                                    </tr>
                            </table>
                        </div>

                        <div style="margin-top: 30px; margin-bottom: 20px;">
                            <table class="table" cellspacing="0">
        ';

     
        if(!$params['dataInicio']){
                                $html .='
                                            <tr class="text-center">
                                                <th class="table-header">Período</th>
                                                <th class="table-header">Total de Horas </th>
                                            </tr>
                                            <tr class="text-center">
                                                <td>' . $newDate[0]. "/" .$newDate[1]. '</td>
                                                <td>' . ($elements[0]['totalHrMes']) . '</td>
                                            </tr>
                                ';
        }else{

            $horas = converterParaHora($total_d);
            $html .='
                                    <tr class="text-center">
                                        <th class="table-header">Período</th>
                                        <th class="table-header">Total de Horas </th>
                                    </tr>
                                    <tr class="text-center">
                                        <td>' .  date('d/m/Y',strtotime($params['dataInicio'])) ." até ". date('d/m/Y',strtotime($params['dataFim'])). '</td>
                                        <td>' .  $horas . '</td>
                                    </tr>
            ';
                            // }
        }
                            $html .='
                            </table>
                        </div>
                        

                        
                        <div style="margin-bottom: 20px;">
                            <table class="table table-border" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th style="width: 5%;" class="table-header">Dia</th>';
                                        if($params['dataInicio'] != ''){
                                        $html .='
                                            <th style="width: 15%;" class="table-header">Mês</th>';
                                        }
        $html .='
                                        <th style="width: 15%;" class="table-header">Dia da Semana</th>';

                                        if($params['cliente'] == ''){
        $html .='
                                        <th style="width: 15%;" class="table-header">Cliente</th>';
                                        }
                                        if($params['agruparProjeto'] == "N" ){
        $html .='
                                        <th style="width: 25%;" class="table-header">Projeto</th>
';
                                        }
        $html .='
                                        <th style="width: 40%;" class="table-header">Descrição da Atividade</th>
                                        <th style="width: 10%;" class="table-header">Entrada</th>
                                        <th style="width: 10%;" class="table-header">Saída</th>
                                        <th style="width: 10%;" class="table-header">Total Horas</th>
                                    </tr>
                                </thead>
                                <tbody style="text-align: center;">
        ';

        if($params['dataInicio']){
            foreach($daterange as $date1){
                for($i = 0; $i < count($grupoDados); $i++){
                    $totalDados = count($grupoDados[$i]) -1;
                    for($j = 0; $j < $totalDados; $j++){
                        if(strlen((string)$date1->format('d-m')) === 1){
                            $dia = str_pad($date1->format('d-m'), 2, '0', STR_PAD_LEFT);
                        }else{
                            $dia = $date1->format('d-m');
                        }
                        if(ucfirst( ( strftime("%d-%m", strtotime($grupoDados[$i][$j]['Start_Date']) ) ) ) == $dia){
                            if($j == 0){
                                $rowspan = $totalDados;

                                $monthNum  = ucfirst( strftime("%m", strtotime($grupoDados[$i][$j]['Start_Date']) ) );
                                $dateObj   = DateTime::createFromFormat('!m', $monthNum);
                                $monthName = $dateObj->format('F'); 

                                
                                $html .= '                            
                                    <tr>
                                        <td rowspan="' . $rowspan . '">' . ucfirst( strftime("%d", strtotime($grupoDados[$i][$j]['Start_Date']) ) ) . '</td>
                                        <td rowspan="' . $rowspan . '">' . nomePortugues($monthName). '</td>
                                        <td style="text-align: justify;" rowspan="' . $rowspan . '">' . ucfirst( $diaSemana_extenso[ ( strftime( "%u", strtotime( $grupoDados[$i][$j]['Start_Date'] ) ) ) -1 ] ) . '</td>
                                ';
                                if($params['cliente'] == ''){
                                    $html .='
                                            <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Client'] . '</td>
                                    ';
                                }
                                if($params['agruparProjeto'] == "N" ){
                                    $html .='
                                            <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Project'] . '</td>
                                    ';
                                }
                                $html .='
                                        <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Description'] . '</td>
                                        <td>' . ($grupoDados[$i][$j]['Start_Time']) . '</td>
                                        <td>' . ($grupoDados[$i][$j]['End_Time']) . '</td>
                                        <td rowspan="' . $rowspan . '">' . ($grupoDados[$i][$j]['totalHrDia']) . '</td>
                                    </tr>
                                    ';
                                    
                            }else{
                                $html .= '                            
                                    <tr>
                                ';
                                                                if($params['cliente'] == ''){
                                $html .='
                                        <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Client'] . '</td>
                                ';
                                                                }
                                                                if($params['agruparProjeto'] == "N" ){
                                $html .='
                                        <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Project'] . '</td>
                                ';
                                                                }
                                $html .='
                                        <td style="text-align: justify;">' . $grupoDados[$i][$j]['Description'] . '</td>
                                        <td>' . ($grupoDados[$i][$j]['Start_Time']) . '</td>
                                        <td>' . ($grupoDados[$i][$j]['End_Time']) . '</td>
                                    </tr>
                                ';
                            }

                            array_push($todasDatas, $date1->format('d-m'));
                        }else{

                            if($j == 0){
                                if(!in_array($date1->format('d-m'), $todasDatas) && !in_array($date1->format('d-m'), $dias)){ 

                                    $tempDate = date($date1->format('d-m-Y'));
                                    $diaSemana = ucfirst( ( $diaSemana_extenso[ strftime("%u", strtotime($tempDate) ) - 1] ) );
                                    $monthNum  = explode("-",$dia)[1];
                                    $dateObj   = DateTime::createFromFormat('!m', $monthNum);
                                    $monthName = $dateObj->format('F'); 

                                    ucfirst( ( $diaSemana_extenso[ strftime("%u", strtotime(explode("-",$dia)[1]) ) - 1] ) );
                                    $html .= ' 
                                        <tr>
                                            <td>' . explode("-",$dia)[0] . '</td>
                                            <td>' . nomePortugues($monthName) . '</td>
                                            <td style="text-align: left;">' . ($diaSemana) . '</td>
                                    ';
                                            if($params['cliente'] == ''){
                                    $html .='
                                            <td> - </td>
                                    ';
                                            }
                                            if($params['agruparProjeto'] == "N" ){
                                    $html .='
                                            <td> - </td>
                                    ';
                                            }
                                    $html .='
                                            <td> - </td>
                                            <td> - </td>
                                            <td> - </td>
                                            <td> - </td>
                                        </tr>
                                    ';
                                    array_push($todasDatas, $date1->format('d-m'));
                                }
                            }
                        }  
                    }
                }

            }

        }else{

            for($k = 01; $k <= $nDaysMonth; $k++){
                for($i = 0; $i < count($grupoDados); $i++){
                    $totalDados = count($grupoDados[$i]) -1;
                    for($j = 0; $j < $totalDados; $j++){
                        if(strlen((string)$k) === 1){
                            $dia = str_pad($k, 2, '0', STR_PAD_LEFT);
                        }else{
                            $dia = $k;
                        }
                        
                        if(ucfirst( ( strftime("%d", strtotime($grupoDados[$i][$j]['Start_Date']) ) ) ) == $dia){
                            if($j == 0){
                                $rowspan = $totalDados;
                                $html .= '                            
                                    <tr>
                                        <td rowspan="' . $rowspan . '">' . ucfirst( strftime("%d", strtotime($grupoDados[$i][$j]['Start_Date']) ) ) . '</td>
                                        <td style="text-align: justify;" rowspan="' . $rowspan . '">' . ucfirst( $diaSemana_extenso[ ( strftime( "%u", strtotime( $grupoDados[$i][$j]['Start_Date'] ) ) ) -1 ] ) . '</td>
                                ';
                                if($params['cliente'] == ''){
                                    $html .='
                                            <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Client'] . '</td>
                                    ';
                                }
                                if($params['agruparProjeto'] == "N" ){
                                    $html .='
                                            <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Project'] . '</td>
                                    ';
                                }
                                $html .='
                                        <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Description'] . '</td>
                                        <td>' . ($grupoDados[$i][$j]['Start_Time']) . '</td>
                                        <td>' . ($grupoDados[$i][$j]['End_Time']) . '</td>
                                        <td rowspan="' . $rowspan . '">' . ($grupoDados[$i][$j]['totalHrDia']) . '</td>
                                    </tr>
                                    ';
                                    
                            }else{
                                $html .= '                            
                                    <tr>
                                ';
                                                                if($params['cliente'] == ''){
                                $html .='
                                        <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Client'] . '</td>
                                ';
                                                                }
                                                                if($params['agruparProjeto'] == "N" ){
                                $html .='
                                        <td style="text-align: justify;" >' . $grupoDados[$i][$j]['Project'] . '</td>
                                ';
                                                                }
                                $html .='
                                        <td style="text-align: justify;">' . $grupoDados[$i][$j]['Description'] . '</td>
                                        <td>' . ($grupoDados[$i][$j]['Start_Time']) . '</td>
                                        <td>' . ($grupoDados[$i][$j]['End_Time']) . '</td>
                                    </tr>
                                ';
                            }

                            array_push($todasDatas, $k);
                        }else{

                            if($j == 0){

                                if(!in_array($k, $todasDatas) && !in_array($k, $dias)){ 

                                    $tempDate = date($newDate[1] . '-' . $monthNum . '-' . $k);
                                    $diaSemana = ucfirst( ( $diaSemana_extenso[ strftime("%u", strtotime($tempDate) ) - 1] ) );
                                    

                                    $html .= ' 
                                        <tr>
                                            <td>' . $dia . '</td>
                                            <td style="text-align: left;">' . ($diaSemana) . '</td>
                                    ';
                                            if($params['cliente'] == ''){
                                    $html .='
                                            <td> - </td>
                                    ';
                                            }
                                            if($params['projeto'] == ''){
                                    $html .='
                                            <td> - </td>
                                    ';
                                            }
                                    $html .='
                                            <td> - </td>
                                            <td> - </td>
                                            <td> - </td>
                                            <td> - </td>
                                        </tr>
                                    ';
                                    array_push($todasDatas, $k);
                                }
                            }
                        }  
                    }
                }
            }
        }
        $html .= '
                                </tbody>

                            </table>
                        </div>
                    </div>
                </body>

                <script type="text/javascript">
                    var logos = document.getElementsByClassName("logo");
                    var position = logos.length - 1;
                    lastLogo = logos[position];
                                    
                    function imprimir() {
                        window.print();
                    };
                </script>
            </html>
            
        ';
        $html = mb_convert_encoding($html, 'UTF-8', 'UTF-8');
        echo $html;
        // header("Content-Description: PHP Generated Data");
        // header("Content-Type: application/x-msexcel");
        // header("Content-Disposition: attachment; filename=\"teste.xls\"");
        // header("Expires: 0");
        // header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        // header("Pragma: no-cache");

        // echo $html;
    }

    function tempo_em_segundos($tempo){
        $calc = 0;
        list($horas, $minutos, $segundos) = explode(':', $tempo);
        $calc = $horas * 3600 + $minutos * 60 + $segundos;
        return $calc;
    }

    function segundos_em_tempo($segundos){
        $horas = floor($segundos/3600);
        $minutos = floor($segundos % 3600/60);
        $segundos = floor($segundos % 60);

        return sprintf("%d:%02d:%02d", $horas, $minutos, $segundos);
    }
    function converterParaHora($dec)
    {
        $seg = ($dec * 3600);
        $hor = floor($dec);
        $seg -= $hor * 3600;
        $min = floor($seg / 60);
        $seg -= $min * 60;

        if(strlen((string)$min) === 1){
            $min = str_pad($min, 2, '0', STR_PAD_LEFT);
        }

        if(strlen((string)$seg) === 1){
            $seg = str_pad($seg, 2, '0', STR_PAD_LEFT);
        }
        return $hor.":".$min;
    }
    function tirarAcentos($string){
        return preg_replace(array("/(á|à|ã|â|ä)/", "/(Á|À|Ã|Â|Ä)/", "/(é|è|ê|ë)/", "/(É|È|Ê|Ë)/", "/(&)/", "/(í|ì|î|ï)/", "/(Í|Ì|Î|Ï)/", "/(ó|ò|õ|ô|ö)/", "/(Ó|Ò|Õ|Ô|Ö)/", "/(ú|ù|û|ü)/", "/(Ú|Ù|Û|Ü)/", "/(ñ)/", "/(Ñ)/", "/(ç)/", "/(Ç)/"), explode(" ", "a A e E e i I o O u U n N c C"), $string);
    }

    function nomePortugues($value){
        $meses = array(
            'January' => 'Janeiro',
            'February' => 'Fevereiro',
            'March' => 'Março',
            'April' => 'Abril',
            'May' =>'Maio',
            'June' => 'Junho',
            'July' =>'Julho',
            'August' => 'Agosto',
            'September' =>'Setembro',
            'October' =>'Outubro',
            'November' =>'Novembro',
            'December' => 'Dezembro'
        );

        return  $meses[$value];
    }
    
?>