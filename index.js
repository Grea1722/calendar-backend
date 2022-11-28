const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Crear el servidor de express
const app = express();
//^El nombre app es un estandar pero se puede nombrar como sea.
//Database
dbConnection();
app.use(cors())
//! Directorio Publico
app.use(express.static('public'));
//* Use es un middlewere que se ejecuta cuando se pase por un lugar
//lectura y parseo del body
app.use( express.json() );

//&Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//TODO: CRUD: Eventos

//* Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})

