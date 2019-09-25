const express = require('express')
const Router = express.Router()
const multer = require('multer')
const uuidv4 = require('uuid/v4')

const app = require('../app')

const cache = require('../middlewares/cache')

const Control = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/products');
     },
    filename: function (req, file, cb) {
        cb(null , uuidv4() + file.originalname);
    }
});

const upload = multer({storage})

Router.get('/', cache, Control.getProducts)

Router.get('/refresh', Control.refreshRedis)

Router.get('/images/:name', (req, res) => {
	res.sendFile(app.rootPath + '/uploads/products/' + req.params.name)
})

Router.get('/:id', Control.getProductsById)

Router.post('/', upload.single('image'), Control.createProducts)

Router.put('/:id', upload.single('image'), Control.updateProducts)

Router.patch('/:id', Control.addOrReduce)

Router.delete('/:id', Control.deleteProducts)



module.exports = Router