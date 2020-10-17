var arrMedicos = [{numero: 123, nombre: "Juan", apellido:"Pérez", especialidad: "Medicina general",
                    usuario: "jperez", contraseña:"123"},
                  {numero: 456, nombre: "Carlos", apellido:"Quijano", especialidad: "Oncólogo",
                    usuario: "cquijano", contraseña:"456"},
                  {numero: 789, nombre: "Hernàn", apellido:"González", especialidad: "Cirujano",
                    usuario: "hgonzalez", contraseña:"789"},
                  {numero: 987, nombre: "Luis", apellido:"Rodríguez", especialidad: "Fisioterapeuta",
                    usuario: "lrodriguez", contraseña:"987"},
                  {numero: 654, nombre: "Roberto", apellido:"De Souza", especialidad: "Traumatólogo",
                    usuario: "rdesouza", contraseña:"654"}];
            
var arrPacientes = [{documento: 7896541, nombre:"Ana", apellidos:"Gonzalez", medicocabecera: 123}];
var proximoNumeroPaciente = 1;
var arrConsultas = [];
var usuarioAutenticado = null;
var date = new Date();
var today = date.getFullYear()+'-'+(date.getMonth())+'-'+date.getDate();

$(document).ready(inicializar);

//Ésta funcioón se ejecuta al cargar el documento HTML.
//Tiene establecidas las funciones que se dispararàn al hacer click sobre determinados botones.
//Dispara la función "configurarParaListaMedicos".
function inicializar(){
    $("#btnAgregarConsulta").click(configurarParaNuevaConsulta);  
    $("#btnRegistrarConsulta").click(agregarConsulta);
    $("#btnIngresar").click(ingresarLogin);
    $("#btnListaMedicos").click(configurarParaListaMedicos);
    $("#btnAutenticarse").click(configurarParaAutenticarse);  
    $("#btnBuscarConsulta").click(configurarParaBuscarConsulta);
    $("#btnBuscar").click(buscarPaciente);
    $("#btnBuscarEntreDosFechas").click(configurarParaBuscarFechas);
    $("#btnCerrarSesion").click(cerrarSesion);
    configurarParaListaMedicos();   
}

 //Muestra la sección de la lista de médicos (tabla).
 //Esconde las demás secciones de la página.
 //Ejecuta la función "limpiarInputsContenidos en la sección de Autenticarse.
function configurarParaListaMedicos(){
    $("#secListaMedicos").show(500);
    $("#secAutenticarse").hide();
    $("#secNuevoRegistro").hide();
    $("#secBotones").hide();
    $("#secConsultas").hide();
    $("#secBuscarFechas").hide();
    limpiarInputsContenidos("#secAutenticarse");
}

//Muestra la sección Autenticarse.
//Esconde la tabla de los médicos.
//Esconde la sección de consultas.
function configurarParaAutenticarse(){
    $("#secListaMedicos").hide();
    $("#secAutenticarse").show(500);
    $("#secConsultas").hide();
}

//Muestra las nuevas funcionalidades (botones) al ingresar con un usuario y una contraseña válida.
function configurarParaBotones(){
    $("#secAutenticarse").hide();
    $("#secListaMedicos").hide();
    $("#btnListaMedicos").hide();
    $("#btnAutenticarse").hide();
    $("#secBotones").show(500);
}


//Muestra la sección para agregar una nueva consulta (formulario).
//Esconde la sección consultas (tabla con todas las consultas registradas).
//Esconde la sección de buscar fechas.
function configurarParaNuevaConsulta(){
    $("#secNuevoRegistro").show(500);     
    $("#secConsultas").hide();
    $("#secBuscarFechas").hide();
}

//Lista en una tabla las consultas agregadas.
//Esconde la sección para agregar una nueva consulta.
//Esconde la sección de buscar fechas.
function configurarParaBuscarConsulta(){
    listarConsulta();
    $("#secNuevoRegistro").hide();
    $("#secConsultas").show(500);     
    $("#secBuscarFechas").hide();
}


//Muestra la sección de buscar fechas.
//Esconde la tabla de consultas registradas.
//Esconde la sección para agregar una nueva consulta (formulario).
function configurarParaBuscarFechas(){
    $("#secBuscarFechas").show(500);
    $("#secConsultas").hide();
    $("#secNuevoRegistro").hide();
}


//Ésta función valida el login de tal manera que lo ingresado en el campo de usuario y el campo
//contraseña sea igual a los datos que tenemos almacenados en el arreglo de médicos.
//En caso de conincidir, muestra un mensaje que ingresó al sistema y dispara la función de mostrar
//los botones (nuevas funcionalidades), en caso contrario, muestra un mensaje de usuario o contraseña fallido.
function ingresarLogin(){
    $("#secMensaje3").empty();  
    $("#secMensaje").empty();
    if (validarLogin()){
       var nomUsu = $("#iUsuario").val();
       var usuarioMedico = buscarUsuario(nomUsu);
       for (indice=0;indice<=arrMedicos.length;indice++){
           var medico = arrMedicos[indice];
            if(($.trim($("#iUsuario").val())=== medico.usuario) &&  ($.trim($("#iContraseña").val()) === medico.contraseña)){
                usuarioAutenticado = usuarioMedico;
                configurarParaBotones();
                $("#secMensaje3").text("Usuario Autenticado!" + " " + "Bienvenido Dr. " + usuarioAutenticado.nombre + " " + usuarioAutenticado.apellido);
                $("#secMensaje3").attr("style","color:blue");
                $("#secMensaje").remove();
            } else
              $("#secMensaje").text("Usuario o contraseña inválido.");
              $("#secMensaje").attr("style","color:red");            
           
       }
       
    }
    }

//Ésta función busca el usuario dentro del arreglo de médicos,
//en caso de conocidir retorna el usuario.
function buscarUsuario(nombreUsu){
    for(var i = 0; i<arrMedicos.length;i++){
        var usu = arrMedicos[i];
        if(usu.usuario === nombreUsu){
            return usu;
        }
    }
    return null;
}


//Ésta función se encarga de verificar si en los campos de usuario o contraseña
//se ingresaron datos. Si asi fue, ingresará al login y se ejecutará la función "validarLogin".
function validarLogin(){
    var valido = true;
    $("#secMensaje").empty();
    if($.trim($("#iUsuario").val())=== "" ){
        $("#secMensaje").append("Debe ingresar un nombre de usuario. <br><br>");
        valido = false;
    }
    if($.trim($("#iContraseña").val()) ===""){
        $("#secMensaje").append("Debe ingresar una contraseña. <br><br>");
        valido = false;
    }
    if(!valido){
        $("#secMensaje").attr("style","color:red");
    }else{
         $("#secMensaje").attr("style","color:blue");
    }
    return valido;
}


//Ésta función se encarga de que a la hora de rellenar las consultas (formulario)
//no contenga los datos en blanco.
function validarConsulta(){
    var valido = true;
    $("#secMensajefecha").empty();
    $("#secMensajenumPaciente").empty();
    $("#secMensajemotivoConsulta").empty();
    $("#secMensajediagnostico").empty();
    
    if($.trim($("#fecha").val()) === ""){
        $("#secMensajefecha").append("Debe rellenar éste campo. <br>");
        $("#secMensajefecha").attr("style","color:red");
        valido = false;
    }

    if($.trim($("#numPaciente").val())=== "" ){
        $("#secMensajenumPaciente").append("Debe rellenar éste campo. <br>");
        $("#secMensajenumPaciente").attr("style","color:red");
        valido = false;
    }

    /*for(var i = 0; i <arrPacientes.length; i ++)
    {
        if($.trim($("#numPaciente").val()) != arrPacientes.documento)
        {
            $("#secMensajenumPaciente").append("Documento inválido. <br>");
            $("#secMensajenumPaciente").attr("style","color:red");
            valido = false;
        }
        else if(usuarioAutenticado.numero != arrPacientes.medicocabecera)
        {
            $("#secMensajenumPaciente").append("Éste paciente no corresponde a éste médico. <br>");
            $("#secMensajenumPaciente").attr("style","color:red");
            valido = false;
        }
        
    }*/


     if($.trim($("#motivoConsulta").val())=== "" ){
        $("#secMensajemotivoConsulta").append("Debe rellenar éste campo. <br>");
        $("#secMensajemotivoConsulta").attr("style","color:red");
        valido = false;
    }

    if($.trim($("#diagnostico").val()) ===""){
        $("#secMensajediagnostico").append("Debe rellenar éste campo. <br>");
        $("#secMensajediagnostico").attr("style","color:red");
        valido = false;
    }
  
    if(!valido){
        $("#secMensaje").attr("style","color:red");
    }else{
         $("#secMensaje").attr("style","color:blue");
    }
    return valido;
}

//Ésta función agrega los datos que vamos ingresando en el formulario de las consultas,
//los va almacenando en un nuevo arreglo (arrConsultas).
//Cada vez que una consulta es agregada, se muestra un mensaje confirmando dicha acción.
function agregarConsulta(e){
        $("#secMensaje2").empty();
        e.preventDefault();   
        if (validarConsulta()){
        var nuevaConsulta = {};
        nuevaConsulta.numero = proximoNumeroPaciente;
        proximoNumeroPaciente++;
        nuevaConsulta.fecha = new Date($("#fecha").val());
        nuevaConsulta.numPaciente = $("#numPaciente").val();
        nuevaConsulta.motivoConsulta = $("#motivoConsulta").val();
        nuevaConsulta.diagnostico = $("#diagnostico").val();
        nuevaConsulta.numeroMedico = usuarioAutenticado.numero;       
        arrConsultas.push(nuevaConsulta);
        alert("Consulta Agregada!");
       }                     
      }
    

    
    
    //Ésta función genera una tabla utilizando los datos ingresados en el formulario.
    //Al generar la tabla, ordena las consultas según la fecha de manera descendente.
    function listarConsulta(){
        arrConsultas.sort (function(x,y){
            if (x.fecha < y.fecha){
                return 1;
            } else if ((x.fecha) > y.fecha){
                return -1;
            }
                return 0;
            });
            
        var tabla = "<table width=50% style=border-collapse: collapse border=1><tr bgcolor=#2ECCFA><th>Número</th><th>Fecha</th><th>Número del Paciente</th><th>Número del Médico</th><th></th></tr>";
        for(var indice=0;indice<arrConsultas.length;indice++){
            var paciente = arrConsultas[indice];
            var fila = "<tr align=center id='fila"+paciente.numero+"'><td>"+paciente.numero +"</td>"+
            "<td align=center>"+paciente.fecha.toUTCString() +"</td>"+
            "<td align=center>"+paciente.numPaciente+"</td>"+
            "<td align=center>"+paciente.numeroMedico+"</td>"+
             "<td><button onclick='ampliarDatosConsulta("+ paciente.numero + ")'>Ver Más</button></td></tr>";
            tabla +=fila;
          }
        $("#listado").html(tabla);
}

    
    //Una función creada para que, cuando se haga click en el botón "Ver Más",
    //nos muestre un div con datos que no se podían mostrar en la tabla; se los muestra de forma "ampliada".
    function ampliarDatosConsulta(m){
         var art = buscarConsultaPorNumero(m);
         $(".datos").remove();
         if(art!==null){
                  var sec = "<div class='datos'>";
                  sec+= "Motivo Consulta: " + art.motivoConsulta + "    " + "Diagnóstico: " + art.diagnostico;
                  sec+="</div>";
                  $("#fila"+art.numero).after(sec);
         }
}

    
    //Ésta función apoya a la anterior, en la búsqueda del número de la consulta.
    function buscarConsultaPorNumero(numero){
        for(var indice=0;indice<arrConsultas.length;indice++){
          var consulta = arrConsultas[indice];
          if(consulta.numero === numero){
            return consulta;
        }
    }
    return null;
}
    
    //Ésta función busca a un paciente según el número que posea y genera la tabla
    //con los datos del paciente buscado.
    function buscarPaciente(){
         var numPacientex = $("#iBusqueda").val(); 
         var tabla = "<table width=50% style=border-collapse: collapse border=1><tr bgcolor=#2ECCFA><th>Número</th><th>Fecha</th><th>Número del Paciente</th><th>Número del Médico</th><th></th></tr>";
         for(var indice=0;indice<arrConsultas.length;indice++){
             var pac=arrConsultas[indice];    
             if(pac.numPaciente.startsWith(numPacientex)){ 
                    var fila = "<tr align=center id='fila"+pac.numero+"'><td>"+pac.numero +"</td>"+
                              "<td align=center>"+pac.fecha.toUTCString() +"</td>"+
                              "<td align=center>"+pac.numPaciente+"</td>"+
                              "<td align=center>"+pac.numeroMedico+"</td>"+
                              "<td><button onclick='ampliarDatosConsulta("+ pac.numero + ")'>Ver Más</button></td></tr>";
                    tabla +=fila;
                }
        }
        tabla+="</tabla>"; 
        $("#listado").html(tabla);
 }

 
 //Ésta función busca consultas entre dos fechas ingresadas y genera una tabla
 //con los datos de los pacientes registrados entre esas fechas.
 function buscarFechas(){
       var tabla = "<table width=50% style=border-collapse: collapse border=1><tr bgcolor=#2ECCFA><th>Número</th><th>Fecha</th><th>Número del Paciente</th><th>Número del Médico</th><th></th></tr>";
       var fechaInicial = new Date($("#iDesde").val());
       var fechaFinal = new Date($("#iHasta").val());
       for (var i =0;i < arrConsultas.length;i++){
       var unaConsulta = arrConsultas[i];
       if(unaConsulta.fecha >= fechaInicial && unaConsulta.fecha <= fechaFinal){
        var fila = "<tr align=center id='fila"+unaConsulta.numero+"'><td>"+unaConsulta.numero +"</td>"+
            "<td align=center>"+unaConsulta.fecha.toUTCString() +"</td>"+
            "<td align=center>"+unaConsulta.numPaciente+"</td>"+
            "<td align=center>"+unaConsulta.numeroMedico+"</td>"+
             "<td><button onclick='ampliarDatosConsulta("+ unaConsulta.numero + ")'>Ver Más</button></td></tr>";
            tabla +=fila;
       }
   }
       tabla +="</table>";
       $("#listadoFechas").html(tabla);
}
 
 
 //Está función "cierra sesión" ejecutando la función "configurarParaListaMedicos",
 //la cual no solo nos redirige al inicio.
 function cerrarSesion(){
    usuarioAutenticado = null; 
    configurarParaListaMedicos();      
    $("#btnListaMedicos").show(500);
    $("#btnAutenticarse").show(500);
}


//Ésta función limpia los campos donde se ingresa el usuario y la contraseña.
//Se ejecuta en la función "configurarParaListaMedicos".
function limpiarInputsContenidos(elemento){
    $(elemento + " input[type='text']").val("");
    $(elemento+ " input[type='password']").val("");
    $("#secMensaje3").empty();
}