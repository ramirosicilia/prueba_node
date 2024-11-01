/*import express from "express" 
import path from "path" 
import { fileURLToPath } from "url" 
import fs from "fs" 
import cors from "cors"


const app=express()  

app.use(cors())
const port=7000

const __filename=fileURLToPath(import.meta.url) 
const __dirname=path.dirname(__filename)  

app.use(express.static(path.join(__dirname,"./public"))) 

app.use(express.json()) 

app.use(express.urlencoded({extended:false})) 

async function crearImagenes(){

    const imagen1 = { src: "./img/chica-vestido-azul.jpeg"};
    const imagen2 = { src: "./img/chica-vestido-cuadros.jpeg"};  
    const imagen3 = { src: "./img/chica-vestido-rosa.jpeg"};

     return {
        imagenNegro:imagen1,
        imagenPaisaje:imagen2,
        imagenMina:imagen3
     }
} 

app.post("/imagenes",async(req,res)=>{ 

    const{imagenNegro,imagenPaisaje,imagenMina}=await crearImagenes()

    const arrayImg=[imagenNegro,imagenPaisaje,imagenMina]  
   
   fs.writeFileSync("./public/img/imagenes.json", JSON.stringify(arrayImg,null,2)) 

  

   const html=` 
     <div> 
         <h2>mis imagenes</h2>
        <img src="${arrayImg[0].src}" alt="">
        <img src="${arrayImg[1].src}" alt="">
        <img src="${arrayImg[2].src}" alt="" >
     </div>
   ` 

   res.send(html)

  
}) 

app.get('/imagenes-obtenidas',(req,res)=>{ 

    if(fs.existsSync(path.join(__dirname,"./public/img/imagenes.json"))){
        const imagenes= JSON.parse(fs.readFileSync(path.join(__dirname,"./public/img/imagenes.json"),"utf-8")) 
        res.json(imagenes)
    }

})







app.listen(port,()=>{
    console.log(`el servidor esta escuchando el puerto ${port}`)
})*/