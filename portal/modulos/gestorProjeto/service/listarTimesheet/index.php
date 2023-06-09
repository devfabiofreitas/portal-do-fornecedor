<?php
    error_reporting(E_STRICT);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header('Content-Type: text/html; charset=UTF-8');
    require_once('../../../../../properties.inc.php');
    require_once('../../../../../properties.db.inc.php');
    require_once(DOFMW . '/Do.class.php');
    $do->validarSessao();
    $usuarioSessao = $do->getUserSession();
    if ($usuarioSessao['gestaoProjeto']) {
        $params = json_decode($_POST['params'], true);
        $sqlCommand .= ' SELECT ';
        $sqlCommand .= '     tim.codigo,';
        $sqlCommand .= '     tim.Responsavel_codigo,';
        $sqlCommand .= '     tim.Cliente_codigo,';
        $sqlCommand .= '     tim.Projeto_codigo,';
        $sqlCommand .= '     tim.Start_Date,';
        $sqlCommand .= '     tim.User,';
        $sqlCommand .= '     tim.Client,';
        $sqlCommand .= '     tim.Project,';
        $sqlCommand .= '     tim.Start_Time AS hora_inicio,';
        $sqlCommand .= '     tim.End_Time AS hora_fim,';
        $sqlCommand .= '     tim.Description,';
        $sqlCommand .= '     tim.Tags,';
        $sqlCommand .= '     tim.Duration_d,';
        $sqlCommand .= '     (SELECT ';
        $sqlCommand .= '             SEC_TO_TIME(SUM(TIME_TO_SEC(timSub.Duration_h)))';
        $sqlCommand .= '         FROM';
        $sqlCommand .= '             timesheet timSub';
        $sqlCommand .= '     ) AS totalHrs,';
        $sqlCommand .= '     (SELECT ';
        $sqlCommand .= '             SEC_TO_TIME(SUM(TIME_TO_SEC(timSub.Duration_h)))';
        $sqlCommand .= '         FROM';
        $sqlCommand .= '             timesheet timSub';
        $sqlCommand .= '         WHERE';
        $sqlCommand .= '             timSub.Responsavel_codigo = tim.Responsavel_codigo';
        $sqlCommand .= '             AND timSub.Project <> "Almoço" ';
        $sqlCommand .= '             AND timSub.Start_Date = tim.Start_Date';
        $sqlCommand .= '     ) AS totalHrDia ';
        $sqlCommand .= ' FROM';
        $sqlCommand .= '     timesheet tim ';
        $sqlCommand .= ' WHERE tim.codigo != ""  ';
        if($params['Cliente_codigo']){
            $sqlCommand .= ' AND tim.Cliente_codigo =  '.$params['Cliente_codigo'].' ';
        }
        if($params['Projeto_codigo']){
            $sqlCommand .=  ' AND tim.Projeto_codigo =  '.$params['Projeto_codigo'].' ';
        }else{
            $sqlCommand .=  ' AND tim.Projeto_codigo IN ('.$params['Projeto_codigo_gestor'].')';
        }
        if($params['Pessoa_codigo']){
            $sqlCommand .=  ' AND tim.Responsavel_codigo =  '.$params['Pessoa_codigo'].' ';
        }
        if($params['periodoInicio'] && $params['periodoFim']){
            $sqlCommand .=  ' AND tim.Start_Date BETWEEN "'.$params["periodoInicio"].'" AND "'.$params["periodoFim"].'" ';
        }
        $sqlCommand .= ' ORDER BY  ';
        $sqlCommand .= '     Start_Date DESC, tim.Email ASC';
        $do->begin();
        $result = $do->execute($sqlCommand, "SELECT", "");
        $do->commit();
        $elements = $do->toJSON($result);
        if (count($elements) > 0) {
            echo '{"success":true,  "message": "listado com sucesso" , "elements": ' . json_encode($elements) . '}';
            exit;
        } else {
            echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
            exit;
        }
    }else{
        echo '{"success":false, "message": "Ocorreu um erro ao efetuar a operação. Tente novamente ou entre em contato com o suporte."}';
        exit;
    }

