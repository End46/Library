const respuesta=document.querySelector("#respuesta");
const showdialogo=document.querySelector("#AddLibro");
const dialogo=document.querySelector("dialog");
const confirm=document.querySelector("#confirmDialog");
const form=document.querySelector("form");
const cancel=document.querySelector('#cancelDialog');


function libro(titulo,autor,paginas,EstadoDeLectura){
    this.titulo=titulo;
    this.autor=autor;
    this.paginas=paginas;
    this.EstadoDeLectura=EstadoDeLectura;
    this.info = function (){
                    return `${titulo} by ${autor}, ${paginas} pages, ${EstadoDeLectura}`;
                };
    this.cambiarEstado = function (){
        if(EstadoDeLectura == 'read'){
            EstadoDeLectura = 'not read yet';
        }else{
            EstadoDeLectura = 'read';
        }

    }
}  

function AddNewBook(titulo,autor,paginas,EstadoDeLectura){
    let NuevoLibro = new libro(titulo,autor,paginas,EstadoDeLectura);
    return NuevoLibro;
}

function MostrarLibros(libreria,respuesta){
    for (let i = 0; i < libreria.length; i++) {
        let li = document.createElement("li");
        let p = document.createElement("p");

        let botonElmininar = document.createElement("button");
        botonElmininar.addEventListener("click",()=>{
            libreria.splice(i,i+1);
            respuesta.removeChild(li);
            alert(`${libreria[i].info()}`);
        })

        let botonCambiarEstado = document.createElement("button");
        botonCambiarEstado.addEventListener("click",()=>{
            libreria[i].cambiarEstado();
            p.textContent = `${libreria[i].info()}`;
        })

        botonElmininar.textContent='Elminar';
        botonCambiarEstado.textContent='Read/Not Read'
        p.textContent = `${libreria[i].info()}`;
        li.appendChild(p);
        li.appendChild(botonCambiarEstado);
        li.appendChild(botonElmininar);
        respuesta.appendChild(li);
    }
}

function ActualizarLista(libreria,respuesta){
    let i = libreria.length-1;
    let li = document.createElement("li");
    let p = document.createElement("p");

    let botonElmininar = document.createElement("button");
    botonElmininar.addEventListener("click",()=>{
        libreria.splice(i,i+1);
        respuesta.removeChild(li)
    })

    let botonCambiarEstado = document.createElement("button");
    botonCambiarEstado.addEventListener("click",()=>{
        libreria[i].cambiarEstado();
        p.textContent = `${libreria[i].info()}`;
    })

    botonElmininar.value=i;
    botonCambiarEstado.value=i;
    botonElmininar.textContent='Elminar';
    botonCambiarEstado.textContent='Read/Not Read'
    p.textContent = `${libreria[i].info()}`;
    li.appendChild(p);
    li.appendChild(botonCambiarEstado);
    li.appendChild(botonElmininar);
    respuesta.appendChild(li);
}

let libro1 = new libro("Harry Potter","J.K. Rowling",300,"not read yet");
let libro2 = new libro("The Legacy","Cristopher Paulini",900,"read");

let libreria = [libro1,libro2];

MostrarLibros(libreria,respuesta);

showdialogo.addEventListener("click",()=>{
    dialogo.showModal();
})

confirm.addEventListener("click",(event)=>{
    event.preventDefault();
    if(form.titulo.value!='' && form.autor.value!='' && form.paginas.value!='' && form.EstadoDeLectura.value!=''){
        if(form.EstadoDeLectura.value){
            let NuevoLibro = AddNewBook(form.titulo.value,form.autor.value,form.paginas.value,"read");
            libreria.push(NuevoLibro);
        }else{
            let NuevoLibro = AddNewBook(form.titulo.value,form.autor.value,form.paginas.value,"not read yet");
            libreria.push(NuevoLibro);
        }
        ActualizarLista(libreria,respuesta);
        dialogo.close();
    }else{
        alert('Rellene el formulario completo o cancele');
    }
})

cancel.addEventListener("click",(event)=>{
    event.preventDefault();
    dialogo.close();
})




