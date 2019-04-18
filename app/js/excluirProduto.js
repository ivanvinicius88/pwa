function excluirProduto(id, cat) {   
    
    $.getJSON("http://localhost/pwa/json/excluirProduto.php?id="+id,
    function() {
        $("#msg").html("<div class='alert alert-warning'><img src='imgs/load.gif'> Carregando...</div>");
    }).done( function () {
        alert("Produtos Excluido");
    });
    localStorage.removeItem('categoria'+cat);
    window.location.reload();
}