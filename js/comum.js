
    
  document.getElementById("boxCadastro").addEventListener("submit",(e)=>{
    var titulo =  document.getElementById("tituloDescr").value;
    var solucao = document.getElementById("solucaoDescr").value;
    var problema = document.getElementById("problemaDescr").value;

        if(titulo == null || titulo == ''){
         e.preventDefault();
         $('.invalid-titulo').show("slow");
       }

        else if(problema == null || problema == ''){
         e.preventDefault();
         $('.invalid-problema').show("slow");
        }
        else if(solucao == null || solucao == ''){
         e.preventDefault();
         $('.invalid-solucao').show("slow");
        }

       else {

         //MOSTRA LOADER
         var loader = $('.loader_bg');
         loader.fadeToggle();
         //ESCONDE LOADER
         setTimeout(() => {
           loader.fadeToggle();
         }, 1500);

         e.preventDefault();
         setTimeout(() => {
             registrar(titulo,solucao,problema);
             boxCadastro.reset();
             toastr.success('Cadastrado com sucesso!!');
             listarCadastros();
             $("#tituloDescr").focus();
         }, 1600);

        
       }
 });
    
    //FUNÇÃO PARA CARREGAR UM SPINNER/LOADER APÓS SUBMIT
    function showLoader(){
        setTimeout(function(){
          $('.main-layout').html() = `
    
          <div class="loader_bg">
          <div class="loader"><img src="images/loading.gif" alt="#" /></div>
          </div>in-layout
          
          `
        }, 2000)
      }  
    
    //Esconde os avisos de campo em branco quando o usuario clica no campo
    function esconderAviso(){
        $('.invalid-titulo').click().hide();
        $('.invalid-problema').click().hide();
        $('.invalid-solucao').click().hide();
      }
  
  //Apaga o conteudo do formulado de cadastro
  function apagarForm() {
    var box = document.getElementById("boxCadastro");
    $("#tituloDescr").focus();
    box.reset();
    setTimeout(() => {
      $('.invalid-titulo').hide();
    }, 100);   

  };

  $(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('a[href="#top"]').fadeIn();
        } else {
            $('a[href="#top"]').fadeOut();
        }
    });

    $('a[href="#top"]').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
});


//Input parapesquisas os registros
function pesquisar(){
    var input, filtro,table,i,txtValue;
    //Input que faz o search na tela
    input = document.getElementById("myInput");
    filtro = input.value.toUpperCase();
    //Cada card que contem as informações 
    table = document.getElementsByClassName("card");
  
    //Loop em todos os registros e esconde os que não condizem com o que tem na proucura
    
    for(i = 0; i < table.length; i++){
      //Pega o conteúdo de cada card
        txtValue = table[i].outerText;
        //Se o elemento não for encontrado no array, display "none"
        if(txtValue.toUpperCase().indexOf(filtro) > -1){
          table[i].style.display = ""
        } else {
          table[i].style.display = "none";
        }
      
    }
    
      }
    
