$(document).ready(function() {
    var id = retornaPagina();
    console.log( id );

    var categoria = localStorage.getItem("categoria"+id);
    if ( categoria ) {

        console.log("Produtos do Cache");
        var dados = JSON.parse(categoria);
        localStorage.setItem("categoria"+id, JSON.stringify( dados ) );
        preencher( dados );

    } else {
        //buscar os produtos em destaque
        $.getJSON("http://localhost/pwa/json/produtos.php?op=categoria&id="+id,
            function() {

            $("#msg").html("<div class='alert alert-warning'><img src='imgs/load.gif'> Carregando...</div>");
        }).done( function (dados) {

            console.log("Produtos armazenados no Cache");
            localStorage.setItem("categoria"+id, JSON.stringify(dados));
            preencher( dados );

        })

    }

    //funcao para preencher os produtos
    function preencher( dados ) {

        $.each( dados, function( key, val ) {
            if(val.catcodigo == 1) {
                var img = "<img src='https://casaevideodigital.vteximg.com.br/arquivos/ids/158923-1000-1000/1462490c.jpg?v=636692645095430000'></img>";
            } else if(val.catcodigo == 2) {
                var img = "<img src='https://casaevideodigital.vteximg.com.br/arquivos/ids/158923-1000-1000/1462490c.jpg?v=636692645095430000'></img>";
            }
            else if(val.catcodigo == 3) {
                var img = "<img src='https://casaevideodigital.vteximg.com.br/arquivos/ids/158923-1000-1000/1462490c.jpg?v=636692645095430000'></img>";
            }
            else if(val.catcodigo == 4) {
                var img = "<img src='https://casaevideodigital.vteximg.com.br/arquivos/ids/158923-1000-1000/1462490c.jpg?v=636692645095430000'></img>";
            }
            //adicionar os itens no .row
            $(".row").append("<div class='col-md-6 col-sm-6 text-center'><div class='thumbnail'>"+ img + "<p>"+val.prodescricao+"</p><p class='valor'>"+val.provalor+"</p><a href='produto.html?id="+val.procodigo+"' class='btn btn-danger'>Detalhes</a></div></div>");
        })
        $("#msg").html("");
    }
})
