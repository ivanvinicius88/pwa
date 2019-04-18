<?php
	header("Content-type:application/json");
    include "config.php";
    
    if(isset($_POST["codigo"]) && isset($_POST["descricao"]) && isset($_POST["valor"]) && isset($_POST["categoria"])) {
        $codigo = $_POST["codigo"];
        $descricao = $_POST["descricao"];
        $valor = $_POST["valor"];
        $categoria = $_POST["categoria"];

        $sql = "insert into tbproduto (procodigo,prodescricao,provalor, catcodigo) VALUES(?, ?, ?, ?)";
        $res = $pdo->prepare($sql);
        $res->bindParam(1, $codigo);
        $res->bindParam(2, $descricao);
        $res->bindParam(3, $valor);
        $res->bindParam(4, $categoria);
    }
    $res->execute();
    header("location:../app/categorias.html?id=".$categoria);
?>
    