// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDm-cMZydmAPSqF0hLsHY1S_RltGXPw6A0",
    authDomain: "registros-ec725.firebaseapp.com",
    databaseURL: "https://registros-ec725.firebaseio.com",
    projectId: "registros-ec725",
    storageBucket: "registros-ec725.appspot.com",
    messagingSenderId: "188199023190",
    appId: "1:188199023190:web:b05a655146052ae559c1f7",
    measurementId: "G-5M405PPBBC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var novaData = new Date();
  var t = novaData.getTime();
  var counter = t;

 
 
  function registrar(titulo,solucao,problema){
        counter+=1;
        console.log(counter)
        var reg = {
            id: counter,
            titulo: titulo,
            solucao: solucao,
            problema: problema
        }

        let db = firebase.database().ref("Npeg/"+counter);
        db.set(reg);
        document.getElementById("boxListar").innerHTML ='';
  }

function listarCadastros(){
    
        var task = firebase.database().ref("Npeg/");
        task.on("child_added", function(data){
            var taskValue = data.val();

            document.getElementById("boxListar").innerHTML += `
              <div class="card mb-3" style="border:solid thin; ">
                <div class="card-body" style="box-shadow: 0 0px 30px 5px rgba(5, 164, 249, 0.15); ">
                  <div class="form-group">
                  <label for="exampleFormControlInput1"> <b>Título:</b></label><br>
                  <p class="paragrafoListar" id="spanTitulo" style="background-color:#e0e0e0; padding: 5px; border: solid thin; text-align: justify">${taskValue.titulo}</p>
                </div>

                <div class="form-group">
                  <label for="exampleFormControlTextarea1"><b>Problema:</b>  </label><br>
                  <p class="paragrafoListar"  style="background-color:#cf9b9b;; padding: 5px; border: solid thin; text-align: justify">${taskValue.problema}</p>
                </div>

                <div class="form-group">
                  <label for="exampleFormControlSelect1"><b>Possível Solução:</b>  </label><br>
                  <p class="paragrafoListar"  style="background-color:#b2e0b6; padding: 5px; border: solid thin; text-align: justify">${taskValue.solucao}</p>
                </div>

                <button type="submit" class="btn btn-danger pull-right" onclick="deletarRegistro(${taskValue.id})">
                <i class="fa fa-trash-o" aria-hidden="true"></i> Excluir </button>

                <button type="button" class="btn btn-warning pull-right" data-toggle="modal" data-target="#exampleModal"
                data-toggle="modal" data-target="#exampleModal" 
                onclick="editarRegistro(${taskValue.id},
                  '${taskValue.titulo}','${taskValue.problema}','${taskValue.solucao}' )" style="margin-right: 5px">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar </button>

                </div>
              </div>   `

        })
  };

  function reset(){
    document.getElementById('list-profile').innerHTML = `
    <form id="boxCadastro">
            
    <div class="form-group">
      <label for="exampleFormControlInput1"> <b>Título:</b>  </label>
      <input type="text" class="form-control" id="tituloDescr" >
    </div>

    <div class="form-group">
      <label for="exampleFormControlTextarea1"><b>Problema:</b>  </label>
      <textarea class="form-control" id="problemaDescr" rows="4"></textarea>
      <small  class="form-text text-muted">Favor não colocar aspas simples.</small>
    </div>

    <div class="form-group">
       <label for="exampleFormControlSelect1"><b>Possível Solução:</b>  </label>
       <textarea class="form-control" id="solucaoDescr" rows="4"></textarea>
       <small  class="form-text text-muted">Favor não colocar aspas simples.</small>
     </div>

    <button type="submit" class="btn btn-primary">Enviar</button>
    <button type="click" class="btn btn-outline-danger" id="btnCancelarCadastro" >Cancelar</button>
  </form>
    
    `
    
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
  }

  //ABRIR TELA DE EDIÇÃO E TRAZ A FUNÇÃO DE EDITAR
  function editarRegistro(id,titulo,problema,solucao){

    document.getElementById('formModalEdicao').addEventListener("submit",(e) => {
      e.preventDefault()
    });

    document.getElementById("botaoEditarModal").addEventListener("click",(e)=>{
      updateRegistroModal(id,document.getElementById("tituloDescrModal").value,
                      document.getElementById("problemaDescrModal").value,
                      document.getElementById("solucaoDescrModal").value);
                      //console.log(updateRegistroModal());
                      reset();
                      document.getElementById("boxListar").innerHTML = '';
                      listarCadastros();
    });

      console.log(id,titulo,problema,solucao)
      document.getElementById("tituloDescrModal").value=titulo;
      document.getElementById("problemaDescrModal").value=problema;
      document.getElementById("solucaoDescrModal").value=solucao;   
  }

    function updateRegistroModal(id,titulo,problema,solucao){

    var updated = {
      
      titulo:titulo,
      id:id,
      problema:problema,
      solucao:solucao
    }

    let db= firebase.database().ref("Npeg/"+id);
    db.set(updated);
    listarCadastros();
    reset();
    toastr.warning('Editado com sucesso!!')
  }
      
      //FUNÇÃO PARA DELETAR OS REGISTROS
    function deletarRegistro(id){
    var reg = firebase.database().ref("Npeg/"+id);
    var resposta=confirm("Tem certeza que deseja deletar este item?");
      if (resposta == true){
        reg.remove();
        toastr.error("Deletado com sucesso!!");
        reset();
        document.getElementById("boxListar").innerHTML = '';
        listarCadastros();
      } else {
        window.close;
      }
  }








