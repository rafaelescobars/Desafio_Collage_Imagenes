//require
const express = require('express');
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');

//app-express
const app = express()

//sservidor - puerto
app.listen(3000, () => {
  console.log('El servidor esta inicializado en el puerto 3000');
})

//fileupload config
app.use(
  expressFileUpload({
    limits: {
      fileSize: 5000000
    },
    abortOnLimit: true,
    responseOnLimit: 'El peso de la imagen que intentas subir supera el límite permitido'
  })
)

//bodyParser config
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

//public
app.use('/public', express.static(__dirname + '/public'))

//imgs
app.use('/imgs', express.static(__dirname + '/imgs'))

//ruta raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/collage.html')
})

//ruta /imagen - get
app.get('/imagen', (req, res) => {
  res.sendFile(__dirname + '/public/html/formulario.html')
})

//ruta /imagen - post
app.post('/imagen', (req, res) => {
  const {
    target_file
  } = req.files
  const {
    posicion
  } = req.body
  const name = `imagen-${posicion}.jpg`
  target_file.mv(`${__dirname}/imgs/${name}`, (err) => {
    res.send('Imagen cargada con éxito')
  })
})

//ruta /delete 
app.get('/deleteImg/:imagen', (req, res) => {
  const {
    imagen
  } = req.params
  fs.unlink(`${__dirname}/imgs/${imagen}`, (err) => {
    res.send(`Imagen ${imagen} eliminada con éxito.`)
  })
})