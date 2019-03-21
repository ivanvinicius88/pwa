<?php
	header("Content-type:application/json");
	include "config.php";

	$op = "";
	if ( isset ( $_GET["op"] ) ) $op = trim ( $_GET["op"] );

	if ( empty ( $op ) ) {
		$sql = "select * from tbproduto";
		$res = $pdo->prepare($sql);	
	} else if ( $op == "busca") {
		$palavra = trim ( $_GET["palavra"] );
		$palavra = "%$palavra%";

		$sql = "select * from tbproduto where prodescricao like ? ";
		$res = $pdo->prepare($sql);
		$res->bindParam(1, $palavra);
	} else if ( $op == "tbproduto") {
		$id = $_GET["id"];
		$sql = "select * from tbproduto where procodigo = ? ";
		$res = $pdo->prepare($sql);
		$res->bindParam(1, $id);

	} else if ( $op == "categoria") {
		$id = $_GET["id"];
		$sql = "select p.*, c.nome categoria from tbproduto p
		inner join tbcategoria c on (c.id = p.catcodigo)
		where p.catcodigo = ? ";
		$res = $pdo->prepare($sql);
		$res->bindParam(1, $id);
	}

	$res->execute();
	while ($d = $res->fetch(PDO::FETCH_OBJ)) {
		$d->imagem = "<img src='../imgs/".$d->imagem."' class='img'>";
		$d->slug = slugify($d->nome);
		$d->valor = number_format($d->valor,2,",",".");
		$dados[$d->id] = $d;
	}

	if ( !isset($dados) ) $dados= "";
	echo json_encode($dados);