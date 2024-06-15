const usuarioModel = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");

exports.register = async(req, res) => {
    const {nombre, email, contrasena} = req.body;
    const is_admin = false;
    try{
        await usuarioModel.create( {nombre, email, contrasena, is_admin} );
        res.json({ success: true, message: 'Usuario registrado correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar registrar al usuario' });
    }
}

exports.login = async(req, res) => {
    const {email, contrasena} = req.body;
    try{
        const usuario = await usuarioModel.login( {email, contrasena} );
        if(usuario == null){
            res.json({ success: false, message: 'Credenciales incorrectas' });
        }else{

            const playload = { 
                ID: usuario.id, 
                nombre: usuario.nombre,
                is_admin: (usuario.is_admin == '1')
            };

            const accessToken = jwt.sign(
                playload, 
                process.env.JWT_ACCESS_TOKEN_SECRET, 
                { expiresIn: '15m' }
            );

            res.json({
                success: true,
                message: 'Inicio de sesión exitoso',
                accessToken
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar iniciar sesión' });
    }
}

//Ruta protegida
exports.welcome = (req, res) => {
    res.json({ success: true, message: 'Bienvenida/o ' + req.user.nombre });
}