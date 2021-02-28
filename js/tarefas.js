
var taskInput = document.getElementById("new-task"); //adiciona nova tarefa
var addButton = document.getElementsByTagName("button")[0] // primeiro botao
var incompleteTaskHolder = document.getElementById("incomplete-tasks")// ul de #incomplete--tasks
var completedTasksHolder = document.getElementById("completed-tasks") // tarefas completas


//Objeto que armazena no localStorage as tarefas realizadas
salvos = {
    tarefaSalva: "",
    dataSalva: "",
}

//Lista de novas tarefas e adiciona no localStorage
var createNewTaskElement = function (taskString, data){

    var listItem = document.createElement("li");
    //checkbox
    var checkBox = document.createElement("input");
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input");
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    //mostrar data de inclusao e concusão
    var pData = document.createElement("p");

    var date = new Date;
    var dia = date.getDate();
    var mes = date.getMonth();
    var ano = date.getFullYear();
    var dataCompleta = dia + '/' + (mes+1) + '/' + ano;

    label.innerText = taskString;
    label.style.width = "600px"

    //tipo dos inputs
    checkBox.type="checkbox";
    editInput.type="text";
   
    data = dataCompleta
    editButton.innerText="Editar";
    editButton.className="edit btn-sm btn-warning";
    deleteButton.innerText="Deletar";
    deleteButton.className="delete btn-sm btn-danger";
    pData.innerText="Adicionado em: " + data;
    pData.className="pData"

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(pData);

    dados = {
        tarefa: taskString,
        data: data
        }
    
        if(localStorage.getItem('dados') === null){
            var arrayDados = [];
            arrayDados.push(dados);
            localStorage.setItem('dados',JSON.stringify(arrayDados));

        }else{
            var arrayDados = JSON.parse(localStorage.getItem('dados'));
            arrayDados.push(dados);
            localStorage.setItem('dados',JSON.stringify(arrayDados));
        }

    return listItem;

}

//Carrega os itens armazenados no localStorage ao abrir a pagina 
var createNewTaskElementList = function (taskString, data){
    var listItem = document.createElement("li");
    //checkbox
    var checkBox = document.createElement("input");
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input");
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    //mostrar data de inclusao e concusão
    var pData = document.createElement("p");

    var date = new Date;
    var dia = date.getDate();
    var mes = date.getMonth();
    var ano = date.getFullYear();
    var dataCompleta = dia + '/' + (mes+1) + '/' + ano;

   // pData.innerHTML = data
    label.innerText = taskString;
    label.style.width = "600px"

    //tipo dos inputs
    checkBox.type="checkbox";
    editInput.type="text";

    editButton.innerText="Editar";
    editButton.className="edit btn-sm btn-warning";
    deleteButton.innerText="Deletar";
    deleteButton.className="delete btn-sm btn-danger";
    pData.innerText="Adicionado em: " + data;
    pData.className="pData"

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(pData);

    return listItem;

}


var addTask = function(){
  
    //Cria uma nova lista com item do #new-task:
    var listItem = createNewTaskElement(taskInput.value);
    
    //associa listItem ao incompleteTaskkHolder
    incompleteTaskHolder.appendChild(listItem);

    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
    
}

//Editar uma tarefa ja existente
var editTask = function(){

    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label  = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    //Se a class for editmode
    if(containsClass){
        //muda para editmode
        //label torna-se o valor do input
             
        var indice = -1;
        var paraEditar = localStorage.getItem('dados');
        paraEditar = JSON.parse(paraEditar);
        for(var i = 0; i < paraEditar.length; i++){
        if(paraEditar[i].tarefa === label.innerText){
            paraEditar[i].tarefa = editInput.value;
            localStorage.setItem('dados', JSON.stringify(paraEditar));
        }
    }
        label.innerText = editInput.value;
       
    } else {

        editInput.value = label.innerText;     
    }

    //toggle editmode no parent
    listItem.classList.toggle("editMode");


    return true;
}

//Deletar uma tarefa
var deleteTask = function(){

    var arrayDados = JSON.parse(localStorage.getItem('dados'));
    var arraySalvos = JSON.parse(localStorage.getItem('salvos'));
    var listItem = this.parentNode;
    var txt = listItem.querySelector("label").innerText;
    var ul = listItem.parentNode;
    var chk = listItem.querySelector("input[type=checkbox]");
    
    //Se o checkbox não estiver checkado vai percorrer o storage de Afazeres
    if(!chk.checked == true){
    if(window.confirm("Tem certeza que deseja excluir?")){
        for(var i = 0; i < arrayDados.length; i++){
            if(arrayDados[i].tarefa === txt){
                arrayDados.splice(i,1);
                localStorage.setItem('dados',JSON.stringify(arrayDados));
                break;
            }
        } 
          //Remove o parent list item do ul
        ul.removeChild(listItem);  
    }
        //Se o checkbox  estiver checkado vai percorrer o storage de Tarefas Feitas
    } else {
        if(window.confirm("Tem certeza que deseja excluir?")){
            for(var j = 0; j < arraySalvos.length; j ++){
                if(arraySalvos[j].tarefaSalva === txt){
                    arraySalvos.splice(j,1);
                    localStorage.setItem('salvos', JSON.stringify(arraySalvos));
                    break;
                }
            }
            //Remove o parent list item do ul
         ul.removeChild(listItem); 
        }
    }    
     
}


//Marcas a tarefa como feita e armazena no localStorage
var taskCompleted = function(){
    var arrayDados = JSON.parse(localStorage.getItem('dados'));

    var date = new Date;
    var dia = date.getDate();
    var mes = date.getMonth();
    var ano = date.getFullYear();
    var dataCompleta = dia + '/' + (mes+1) + '/' + ano;

    //Pega a li referente ao checkbox
    var listItem = this.parentNode;
    var txt = listItem.querySelector('label').innerText;
    
    for(var i = 0; i < arrayDados.length; i++){
        if(arrayDados[i].tarefa === txt){
            salvos.tarefaSalva = arrayDados[i].tarefa;
            salvos.dataSalva = dataCompleta;

            if(localStorage.getItem('salvos') === null){
                var arraySalvos = [];
                arraySalvos.push(salvos);
                localStorage.setItem('salvos', JSON.stringify(arraySalvos));
            } else {
                var arraySalvos = JSON.parse(localStorage.getItem('salvos'));
                arraySalvos.push(salvos);
                localStorage.setItem('salvos', JSON.stringify(arraySalvos))
            }   
                //Deleta o item do storage 'dados' após ser salvo
                arrayDados.splice(i,1);
                localStorage.setItem('dados',JSON.stringify(arrayDados));

            break;
        }
    }

    completedTasksHolder.appendChild(listItem);
    listItem.querySelector(".pData").style.color = 'green'
    listItem.querySelector(".pData").innerText ='Finalizado em: ' + dataCompleta;

    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function(){
    console.log("AJAX Request");

}

addButton.onclick=addTask;
//addButton.addEventListener("click", addTask); -- ESTAVA INCLUINDO UMA TAREFA EM BRANCO
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler){

    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector(".edit")
    var deleteButton = taskListItem.querySelector("button.delete");

   editButton.onclick = editTask;
    
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for(var i = 0; i < incompleteTaskHolder.children.length; i++){

    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for(var i = 0; i < completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

window.onload = function listarTasks(){
    var arrayDados = JSON.parse(localStorage.getItem('dados'));
    var arraySalvos = JSON.parse(localStorage.getItem('salvos'));

    if(arrayDados != null){
        for(var i = 0; i < arrayDados.length; i++){

            var str = arrayDados[i].tarefa
            var dt = arrayDados[i].data

            var listDados = createNewTaskElementList(str,dt);
    
            incompleteTaskHolder.appendChild(listDados);
    
            bindTaskEvents(listDados,taskCompleted);
        }
    }

    if(arraySalvos != null){
        for (var i = 0; i < arraySalvos.length; i++){
            var str = arraySalvos[i].tarefaSalva
            var listSalvos = createNewTaskElementList(str);
            listSalvos.querySelector("input[type=checkbox]").checked = true;
            listSalvos.querySelector(".pData").innerText = 'Finalizado em: ' + arraySalvos[i].dataSalva;
            listSalvos.querySelector(".pData").style.color = 'green';

            completedTasksHolder.appendChild(listSalvos);

            bindTaskEvents(listSalvos, taskCompleted);

        }
    }
   
} 




// Issues with usabiliy don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Shange edit to save when you are in edit mode.