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
        var img = '';


        if(dados != ""){
            var iCodigoCategoria = dados[1]['catcodigo'];
        }

        if(iCodigoCategoria == 1){
           img = "<img src='https://i.zst.com.br/thumbs/45/12/19/239625442.jpg' alt='fogão'>" ;
        }

        if(iCodigoCategoria == 2){
            img = "<img src='https://images-submarino.b2w.io/produtos/01/00/item/7440/9/7440973SZ.jpg' alt='geladeira'>" ;
        }

        if(iCodigoCategoria == 3){
            img = "<img src='https://a-static.mlcdn.com.br/618x463/forno-eletrico-philco-46l-com-timer/magazineluiza/216448600/295228559ec6ff61dfb31ada1b2370d0.jpg' alt='forno'>" ;
        }

        if(iCodigoCategoria == 4){
            img = "<img src='https://images-na.ssl-images-amazon.com/images/I/81NNgzboHhL._SX425_.jpg' alt='microondas'>" ;
        }

        $.each( dados, function( id = key, val ) {
            dados[id]['catcodigo']



            
            $(".row").append("<div class='col-md-6 col-sm-6 text-center'><div class='thumbnail'>" + img + "<p>"+val.prodescricao+"</p><p class='valor'>"+val.provalor+"</p><a href='produto.html?id="+val.procodgio+"' class='btn btn-danger'>Detalhes</a></div></div>");
        })
        $("#msg").html("");
    }
})
