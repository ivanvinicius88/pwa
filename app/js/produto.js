$(document).ready(function() {
    var id = retornaPagina();
    console.log( id );

    var produto = localStorage.getItem("produto"+id);

    if ( produto ) {
        console.log("Produto do Cache");
        dados = JSON.parse(localStorage.getItem("produto"));
        localStorage.setItem("produto"+id, JSON.stringify(dados) );
        preencherProduto(dados);
    } else {
        $.getJSON("http://localhost/pwa/json/produtos.php?op=produto&id="+id, function(){
        }).done( function ( dados )  {
            console.log("Armazenando produto no cache");
            localStorage.setItem("produto", JSON.stringify(dados) );
            localStorage.setItem("produto"+id, JSON.stringify(dados) );
            preencherProduto(dados);

        })
    }
})
    
function preencherProduto(dados) {
    $.each( dados, function ( key, val )  {
        var img = '';
            
        if(dados != ""){
            var iCodigoCategoria = val.catcodigo;
        }

        if(iCodigoCategoria == 1){
           img = "<img src='https://i.zst.com.br/thumbs/45/12/19/239625442.jpg' alt='fogão'>" ;
        }

        if(iCodigoCategoria == 2){
            img = "<img src='https://images-submarino.b2w.io/produtos/01/00/item/7440/9/7440973SZ.jpg' alt='geladeira'>" ;
        }

        if(iCodigoCategoria == 3){
            img = "<img src='https://a-static.mlcdn.com.br/618x463/forno-eletrico-philco-46l-com-timer/magazineluiza/216448600/295228559ec6ff61dfb31ada1b2370d0.jpg' alt='forno'>" ;
        }//ddd

        if(iCodigoCategoria == 4){
            img = "<img src='https://images-na.ssl-images-amazon.com/images/I/81NNgzboHhL._SX425_.jpg' alt='microondas'>" ;
        }
        $(".foto").html(img);
        $(".descricao").html("<p>"+val.prodescricao+"</p><p class='text-center'><a href='categorias.html?id="+ val.catcodigo +"' class='btn btn-danger btn-lg'>Voltar</a></p>");
        $("h1").html(val.prodescricao);
    })
}
