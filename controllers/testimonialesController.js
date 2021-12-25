import { Testimoniales } from '../models/Testimoniales.js';

const guardarTestimoniales = async (req, res) => {

    //Validar los campos
    const { nombre, correo, mensaje} = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push( {mensaje : 'el nombre esta vacio'})
    }

    if (correo.trim() === '') {
        errores.push( {mensaje : 'el correo esta vacio'})
    }

    if (mensaje.trim() === '') {
        errores.push({mensaje : 'el mensaje esta vacio'})
    }

    if(errores.length > 0 ){
        //Consultar testimoniales existentes
        const testimoniales = await Testimoniales.findAll();
        
        //mostrar la vista [testimoniales] con los mensajes de error
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });

        
    }else{
        try {
            console.log(mensaje)
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });
            
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimoniales
}