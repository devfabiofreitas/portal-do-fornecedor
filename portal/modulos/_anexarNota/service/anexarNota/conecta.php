<?php
    $servername = 'mysql-portalfornecedor.mysql.database.azure.com';
    $username   = 'fornecedor';
    $password   = '270EodbrrC';
    $dbname     = 'portaldofornecedor';

    $conectaPortal = mysqli_connect($servername, $username, $password, $dbname);

    if ($conectaPortal->connect_errno) {
        echo "Falha ao conectar: (" . $conectaPortal->connect_errno . ") " . $conectaPortal->connect_error;
    }

    $servername2 = 'clockify.mysql.database.azure.com';
    $username2   = 'portal_fornecedor@clockify';
    $password2   = 'j0*9U$Ev59Lq';
    $dbname2     = 'administrativo';


    $conectaADM = mysqli_connect($servername2, $username2, $password2, $dbname2);

    if ($conectaADM->connect_errno) {
        echo "Falha ao conectar: (" . $conectaADM->connect_errno . ") " . $conectaADM->connect_error;
    }

?>