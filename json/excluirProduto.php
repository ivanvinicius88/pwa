<?php
	header("Content-type:application/json");
    include "config.php";
    
    $id = $_GET["id"];
    $sql = "delete from tbproduto where procodigo = ? ";
    $res = $pdo->prepare($sql);
    $res->bindParam(1, $id);

    $res->execute();

    if($res->rowCount()){
        echo json_encode(true);
    }