<?php
	header("Content-type:application/json");

	include "config.php";

	$sql = "select * from tbcategoria";
	$res = $pdo->prepare($sql);
	$res->execute();
	while ($d = $res->fetch(PDO::FETCH_OBJ)) {
		$d->slug = slugify($d->catdescricao);
		$dados[$d->catcodigo] = $d;
	}

	echo json_encode($dados);