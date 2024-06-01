const express = require('express');
const bodyParser = require('body-parser');
//Conexión a la base de datos.
const connection = require('./db');

const app = express();
const port = 8888;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Iniciamos el servidor.
app.listen(port, () => {
    console.log('Servidor iniciado en: http://localhost:' + port);
});

//Ejemplo de cómo recuperar una lista de registros.
app.get('/eventos', async (req, res) => {
    const query = `
        SELECT id, nombre, descripcion, cupo
        FROM eventos
    `;
    try{
        [results] = await connection.query(query);
        res.json({ success: true, results });
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar los eventos' });
    }
});


//Ejemplo de cómo recuperar un registro por su ID.
app.get('/eventos/:ID', async (req, res) => {
    const {ID} = req.params;
    const query = `
        SELECT id, nombre, descripcion, cupo
        FROM eventos
        WHERE id = ?
    `;
    try{        
        [results] = await connection.query(query, [ID]);
        if(results.length < 1){
            res.status(404).json({ success: false, message: 'El evento no existe' });
        }else{
            res.json({ success: true, result: results[0] });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar el evento' });
    }
});

// Middleware para manejar el error 404
app.use((req, res, next) => {
    res.status(404);
    res.send(`
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <a href="/">Volver a la página de inicio</a>
    `);
});