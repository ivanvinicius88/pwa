$(document).ready( function (){

    //verificar se o usuario esta logado
    var idCliente = sessionStorage.getItem("id");
    if ( idCliente ) {
        var nomeCliente = sessionStorage.getItem("nome");
        var texto = "Seja bem vindo "+nomeCliente+" (ID: "+idCliente+" )<br><br>";
        texto +="<button type='button' class='btn btn-danger btn-cancelar btn-lg'>Cancelar</button>";
        texto += "<button type='button' class='btn btn-danger btn-sair btn-lg'>Sair</button>";
        $("#login form").html(texto);
    }

    //pegar o conteúdo do cache
    var data = localStorage.getItem("menuCategorias");

    //verificar se existe algo
    if ( data ) {   

        //se existir carregar do cache
        console.log("Carregando menu do cache");
        var cache = JSON.parse(data);
        preencherCategoria(cache);

    } else {

        //carregar do JSON
        console.log("Carregando menu do JSON");

        //pegar as categorias do JSON e montar o menu
        $.getJSON("http://localhost/pwa/json/categorias.php", function(){

            //mensagem no #msg
            $("#msg").html("<div class='alert alert-danger'><img src='imgs/load.gif'> Carregando...</div>");

        }).done( function(dados) {

            //guardar os dados no localStorage
            var cache = JSON.stringify(dados);
            localStorage.setItem("menuCategorias",cache);
            //mandar preencher o menu
            preencherCategoria(dados);
            
        }).fail( function() {
            
            $("#msg").html("<div class='alert alert-danger'>Erro requisição inválida</div>");
            
        })
    } // fim do else
    
    //funcao para preencher o menu de categorias
    function preencherCategoria ( dados ) {
        $("#msg").html("");
        $(".split").prepend("<div class='navbar-dark text-center bg-dark p-4'><a href='index.html' class='btn btn-primary'>Início</a><a href='#'' class='btn btn-danger'>Sair</a></div>");
        $.each( dados, function ( key, val ) {
            $(".navbar-nav").prepend("<li><a class='text-light' style='font-size: 15px;' href='categorias.html?id="+val.catcodigo+"'>"+val.catdescricao+"</a></li>");
        })
    }

    //funcao para fechar a janela da mascara
    $(".btn-cancelar").click(function(){
        $(".mascara").hide("slow");
    })
    //funcao para mostrar a janela de login
    $(".logar").click(function(){
        $("#login").show("fast");
        $("#email").focus();
    })
    
    //funcao para sair
    $(".btn-sair").click(function(){
        if (confirm("Você deseja mesmo sair?")) {
            //limpa a sessao
            sessionStorage.clear();
            //redireciona p o index
            location.href="index.html";
        }
    })
    //mostrar a tela de busca
    $(".buscar").click(function(){
        $("#busca").show("fast");
    })
})

function retornaPagina() {
    //pegar a url visitada no momento
    var url = window.location.href;
    var id = url.split("=");
    console.log( id.length );
    if ( id.length > 1 ) {
        id = id[1];
    }
    return id;
}

//verificar se existe compatibilidade e registrar o Service Worker
if ( "serviceWorker" in navigator ) {
    //registrar o arquivo sw.js como service worker
    navigator.serviceWorker
        .register("sw.js")
        .then( function() {
            console.log("Service Worker registrado com sucesso!");
        })
} else {
    alert("Seu navegador não possui suporte a Service Worker, por favor, atualizdedd!");
}
