<?php
	header("Content-type:application/json");

	include "config.php";

	$sql = "select * from tbcategoria order by catcodigo ";
	$res = $pdo->prepare($sql);
	$res->execute();
	while ($d = $res->fetch(PDO::FETCH_OBJ)) {
		$d->slug = slugify($d->nome);
		$dados[$d->id] = $d;
	}

	echo json_encode($dados);