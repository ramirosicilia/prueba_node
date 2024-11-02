import express from "express" 
import path  from "path" 
import cors from "cors" 
import dotenv, { config } from "dotenv" 
import mysql from "mysql2/promise"; 
import { fileURLToPath } from "url" 
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken'; 
import cookieParser from "cookie-parser";



const app=express()  

const port=7000
config() 

const __filename=fileURLToPath(import.meta.url) 
const __dirname=path.dirname(__filename)

app.use(express.urlencoded({extended:false})) 

app.use(express.json()) 

app.use(cors({
    origin:[
        "http://localhost:7000", "http://127.0.0.1:5500"],
        credentials:true
}))  

app.use(cookieParser())

app.use(express.static(path.join(__dirname ,"./public"))) 


    const pool= await mysql.createPool({
        host:process.env.HOST,
        port:process.env.PORT,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE
    
    }) 




app.get('/inicio',async(req,res)=>{ 
 
    const [row] = await pool.query("SELECT * FROM empleados") 
    console.log(row) 

    res.json(row)

})   

 

app.post('/formulario',async(req,res)=>{  

      const{nombre,apellido,fecha,email,usuarios,contraseña}=req.body 
      console.log({
         nombre,
         apellido,
         fecha,
         usuarios,
         email,
         contraseña
      }) 
 

     try{ 
        let pass= await bcrypt.hash(contraseña,10)  

        console.log(pass)




     if(!fecha || !nombre || !apellido || !email || !usuarios || !pass){ 
        console.log({fecha,nombre,apellido,email,usuarios,pass})
        throw Error('campos vacios')
     } 

      const [existentes] = await pool.query("SELECT usuarios ,email FROM empleados WHERE usuarios=? OR email=?",[usuarios,email]) 

      if(existentes.length>0){ 
        res.json({err:"usuario ya existente"}) 
        return
        
      }



     const [row] = await pool.query("INSERT INTO empleados (nombre,apellido,fecha_nacimiento,email,usuarios,contrasenas) VALUES(?,?,?,?,?,?)",[nombre,apellido,fecha,email,usuarios,pass]) 
      console.log(row)
   

     const[ result]= await pool.query("SELECT nombre FROM empleados WHERE id=?",[row.insertId ])

     console.log(result) 
   
     res.json(result); // Envía solo el objeto del nuevo registro


     } 

     catch(err){ 
      console.error('error---->',err.message)
        res.status(404).send('ocurrio un error en el backend')

     }

})  


app.post("/login",async(req,res)=>{

    const {userInto,passwordInto}=req.body 

    try{ 

        const [obtenerPass]= await pool.query("SELECT id, contrasenas FROM empleados WHERE usuarios=?",[userInto]) 
            
           if(obtenerPass.length===0){ 
            return res.json({err:"usuario no encontrado"})

           } 

           const passOne=obtenerPass[0] 
           console.log(passOne)

       const verificarPass= await bcrypt.compare(passwordInto,passOne.contrasenas) 

       console.log(verificarPass) 

       const token=jwt.sign({id:passOne.id,usuarios:userInto},process.env.JWT_SECRET,{expiresIn:'1h'}) 

       res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true en producción (HTTPS)
        maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
    });

           await pool.query("UPDATE empleados SET token=? where id=?",[token,passOne.id])

       if(!verificarPass){ 
        res.status(404).json({err:'contraseña incorrecta'})
       
       } 

     

       else{ 
        res.status(200).json({respuesta:"https://www.youtube.com",token})

       }

    } 

    catch(err){
        res.status(505).send('error en la base de datos') 
        console.log('error login',err.message)
    }
})  


app.put("/validar-contrasena", async (req, res) => {
    const { contraseña1, contraseña2, ingresoUsuario } = req.body;

    if (contraseña1 !== contraseña2) {
        return res.json({ err: 'Las contraseñas no coinciden' });
    }

    try {
        const contraseñaHaseada = await bcrypt.hash(contraseña1, 10);

        // Actualizar contraseña
        await pool.query("UPDATE empleados SET contrasenas=? WHERE usuarios=?", [contraseñaHaseada, ingresoUsuario]);

        // Obtener el usuario después de actualizar la contraseña
        const [usuario] = await pool.query("SELECT id FROM empleados WHERE usuarios=?", [ingresoUsuario]);
        
        if (!usuario.length) {
            return res.status(404).json({ err: 'Usuario no encontrado' });
        }

        // Generar y actualizar nuevo token
        const token = jwt.sign({ id: usuario[0].id, usuarios: ingresoUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Guardar token en la base de datos
        await pool.query("UPDATE empleados SET token=? WHERE id=?", [token, usuario[0].id]);

        // Enviar el nuevo token como cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
        });

        res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error.message);
        res.status(500).json({ err: 'Error al actualizar la contraseña' });
    }
});



function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Tomar el token del header

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Ruta protegida de ejemplo
app.get('/ruta-protegida', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso a la ruta protegida concedido' });
});




app.listen(port,()=>{ 
    console.log(`se esta escuchando el puerto${port}`)

})