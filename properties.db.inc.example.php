<?php

/**
 * Renomeeie este arquivo para properties.db.inc.php no seu ambiente local
 * Aponte as credênciais para os bancos de desenvolvimento
 */

$DB_APPLICATION = array();

$DB_APPLICATION["portaldofornecedor"] = array(
    "type" => "desenvolvimento",
    "db" => "mysql",
    "server" => "mysql-portalfornecedor.mysql.database.azure.com",
    "port" => "3306",
    "name" => "portaldofornecedor",
    "user" => "fornecedor_dev",
    "password" => "37ppzNbQPB"
);

$DB_APPLICATION["administrativo"] = array(
    "type" => "desenvolvimento",
    "db" => "mysql",
    "server" => "clockifyadmdevblueshift.mysql.database.azure.com",
    "port" => "3306",
    "name" => "administrativo",
    "user" => "usr_clockify_dev@clockifyadmdevblueshift",
    "password" => "42Xxor6AFFnV"
);