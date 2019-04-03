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
	} else if ( $op == "produto") {
		$id = $_GET["id"];
		$sql = "select * from tbproduto where procodigo = ? ";
		$res = $pdo->prepare($sql);
		$res->bindParam(1, $id);

	} else if ( $op == "categoria") {
		$id = $_GET["id"];
		$sql = "select p.*, c.catdescricao categoria from tbproduto p
		inner join tbcategoria c on (c.catcodigo = p.catcodigo)
		where p.catcodigo = ? ";
		$res = $pdo->prepare($sql);
		$res->bindParam(1, $id);
	}

	$res->execute();
	while ($d = $res->fetch(PDO::FETCH_OBJ)) {
		//$d->imagem = "<img src='../imgs/".$d->imagem."' class='img'>";
		$d->slug = slugify($d->prodescricao);
		$d->provalor = number_format($d->provalor,2,",",".");
		$dados[$d->procodigo] = $d;
	}

	if ( !isset($dados) ) $dados= "";
	echo json_encode($dados);