const eventoModel = require("../models/eventoModel");

exports.index = async(req, res) => {
    try{
        const results = await eventoModel.all();
        res.json({ success: true, results });
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar los eventos' });
    }
}

exports.store = async(req, res) => {
    const {nombre, descripcion, cupo} = req.body;
    try{
        await eventoModel.create( {nombre, descripcion, cupo} );
        res.json({ success: true, message: 'El evento se ha creado correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar agregar el evento' });
    }
}

exports.show = async(req, res) => {

    //const ID = req.params.ID;

    const {ID} = req.params;
    try{
        const result = await eventoModel.find(ID);
        if(result == null){
            //El evento con ese ID no existe.
            res.status(404).json({ success: false, message: 'El evento no existe o ha dejado de existir' });
        }else{            
            res.json({ success: true, result });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar el evento' });
    }
}

exports.update = async(req, res) => {
    const { ID } = req.params;
    const { nombre, descripcion, cupo } = req.body;
    try{
        eventoModel.update( {nombre, descripcion, cupo, ID} );
        res.json({ success: true, message: 'El evento se ha modificado correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar los eventos' });
    }
}