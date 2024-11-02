/*const container=document.getElementById('contenedor') 
console.log(container) 



async function obtenerData() { 
    try { 
        const response = await fetch('/imagenes-obtenidas'); 
        const data = await response.json(); 
        console.log(data)
        
        data.forEach(element => { 
            const imagenes = document.createElement('img'); 
            imagenes.src = element.src; // Aquí accedemos a la propiedad src de cada objeto
             imagenes.style.width="100px" 
             imagenes.style.height="100px"
              imagenes.style.padding="50px" 
              imagenes.style.margin='auto'
              container.style.background='#2335'
            container.append(imagenes)

          
        });
        
    } catch (err) {
        console.log(err);
    }
} 

obtenerData();

console.log()   */

console.log(99);

/*async function datosObtener(){

    try{ 
        const response= await fetch('/inicio') 

        if(!response.ok){
           
            return
        }
      const data= await response.json() 
    

      return data

    } 

    catch(err){
        console.log(err)
    }
} 

 datosObtener().then(data=>{
    console.log(data)   

 })*/

const formularioIngreso = document.getElementById("formulario");
const formularioLogin = document.getElementById("login");
const formularioContraseñas = document.querySelector("#contraseñas-form"); 

let usuarioEmpleado = document.querySelector(".usuario__empleados") 


 if(formularioIngreso){
  formularioIngreso.addEventListener("submit", async (e) => {
    e.preventDefault();

     console.log(formularioLogin) 

    let inputNombre = document.querySelector(".nombre").value;
    let inputApellido = document.querySelector(".apellido").value;
    let fechaNacimiento = document.querySelector(".fecha__nacimiento").value;
    let emailEmpleado = document.querySelector(".email__empleado").value;
    let usuarioEmpleado = document.querySelector(".usuario__empleados").value; 

    let usuarioContraseña = document.querySelector(".usuario__contraseña").value; 

    console.log(usuarioEmpleado) 
    
  
    let nombreValidado = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s\-]+$/;
    let apellidoValidado = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s\-]+$/;
    let fechaValidada =  /^(19[0-9]{2}|200[0-9])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    
    let emailValidar = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let usuariolValidar = /^[a-zA-Z0-9_-]{3,16}$/;
    let validarContraseña =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_ -])[A-Za-z\d@$!%*?&_ -]{8,15}$/;

  
    if (
      !nombreValidado.test(inputNombre) ||
      !apellidoValidado.test(inputApellido) ||
      !fechaValidada.test(fechaNacimiento) ||
      !emailValidar.test(emailEmpleado) ||
      !validarContraseña.test(usuarioContraseña) ||
      !usuariolValidar.test(usuarioEmpleado)
    ) {
      alert("por favor completa los campos correctamente");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:7000/formulario", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nombre: inputNombre,
          apellido: inputApellido,
          fecha: fechaNacimiento,
          email: emailEmpleado,
          usuarios:usuarioEmpleado,
          contraseña: usuarioContraseña,
        }),
      });
      let data = await response.json();
  
      if (data.err) {
        alert("usuario o email ya existen");
      } else {
        alert(`Bienvenido ${data[0].nombre}`);
      }
    } catch (err) {
      console.log("error al enviar los datos");
    }
  
    e.target.reset();
  
     window.location.href="./login.html"
  }); 


 }
    
      if(formularioLogin){ 
        formularioLogin.addEventListener("submit", async (e) => {
          e.preventDefault();
      
        
          const usuarioIngresado = document.getElementById("usuario-ingresado").value;
        
          const passWordIngresado = document.getElementById("usuario-password").value;
        
          const usuarioIngresadoValidado = /^[a-zA-Z0-9_-]{3,16}$/;
          const usuarioIngresadoPassword =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_ -])[A-Za-z\d@$!%*?&_ -]{8,15}$/;
        
          if (
            !usuarioIngresadoValidado.test(usuarioIngresado) ||
            !usuarioIngresadoPassword.test(passWordIngresado)
          ) {
            alert("ingrese su usuario o contraseña");
          }
        
          try {
            const peticion = await fetch("http://localhost:7000/login", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
        
              body: JSON.stringify({
                userInto: usuarioIngresado,
                passwordInto: passWordIngresado,
              }),
            });
            console.log(peticion);
        
            let datos = await peticion.json();
            console.log(datos);
        
            if (!peticion.ok) {
              alert("error al ingresar la contraseña");
            } else {
              window.open(datos.respuesta, "_blank");
            }
          } catch (err) {
            console.log("error al ingresar los datos");
          }
        
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }); 
        
      }
    



fetch("http://localhost:7000/ruta-protegida", {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.log("Error en la ruta protegida", err));


    if(formularioContraseñas){
      formularioContraseñas.addEventListener("submit", async (e) => {
        e.preventDefault();
    
      
        
      
        const contraseña1 = document.getElementById("contraseñas-user").value;
      
        const contraseña2 = document.getElementById("contraseñas-user-2").value;
      
        const ingresoUsuario = document.getElementById("ingreso-usuario").value; 
        console.log(contraseña1,contraseña2,ingresoUsuario)
      
        const contraseña1Validara =  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_ -])[A-Za-z\d@$!%*?&_ -]{8,15}$/;
        
        const contraseña2validara =   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_ -])[A-Za-z\d@$!%*?&_ -]{8,15}$/;
       
        const usuarioValidadoIngresado = /^[a-zA-Z0-9_-]{3,16}$/;
      
       if(!usuarioValidadoIngresado.test(ingresoUsuario) || !contraseña1Validara.test(contraseña1) || !contraseña2validara.test(contraseña2)){
               alert('ingrese datos validos') 
               return
       }

      
        try {
          const response = await fetch("http://localhost:7000/validar-contrasena", {
            method: "PUT",
            headers:{
              "content-type":"application/json",
            },
            body: JSON.stringify({ contraseña1, contraseña2, ingresoUsuario }),
          });
          console.log(response);
      
          const data = await response.json();
          console.log(data);
      
          if (!data.ok) {
            alert(data.err);
          } else {
            window.location.href = "http://localhost:7000"; 
            formularioIngreso.style.display='none'
            formularioLogin.style.display='flex'
          }
        } catch (err) {
          console.log("erro al obtener los datos");
        }
      });
      


    }