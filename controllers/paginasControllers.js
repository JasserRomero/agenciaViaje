import { Viaje } from '../models/Viajes.js';
import { Testimoniales } from '../models/Testimoniales.js';

const paginaInicio = async (req, res)=> {

    //Consultar 3 viajes del modelos viaje
    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3 }) );
    promiseDB.push( Testimoniales.findAll({ limit: 3 }));
    
    try {

        const resultado = await Promise.all( promiseDB );

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error)
    }


}

const paginaNosotros = (req, res)=> {
    res.render('nosotros', {
        pagina: 'nosotros'
    });
}

const paginaViajes = async (req, res)=> {
    //Consultar BD
    const viajes = await Viaje.findAll(); 

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res)=> {

    try {
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales', {
            pagina: 'testimoniales',
            testimoniales
        });   
    } catch (error) {
        console.log(error)
    }
}

const paginaDetalleViaje = async (req, res) =>{
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug }});

        res.render('viaje', {
            pagina: 'Informacion viaje',
            viaje

        });

    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
} 