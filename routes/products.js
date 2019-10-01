const express = require('express')
const Router = express.Router()
const multer = require('multer')
const uuidv4 = require('uuid/v4')

const app = require('../app')

const cache = require('../middlewares/cache')

const Control = require('../controllers/products')

const generateOTP = () => { 
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    let OTP = ''; 
      
    var len = string.length; 
    for (let i = 0; i < 11; i++ ) { 
        OTP += string[Math.floor(Math.random() * len)]; 
    } 
    return OTP; 
} 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/products');
     },
    filename: function (req, file, cb) {
        cb(null , generateOTP()+ '-' + file.originalname);
    }
});

const upload = multer({storage})

Router.get('/', cache, Control.getProducts)

Router.get('/refresh', Control.refreshRedis)

Router.get('/images/:name', (req, res) => {
	res.sendFile(app.rootPath + '/uploads/products/' + req.params.name)
})

Router.get('/categories/:id', Control.getProductsByCategory)

Router.get('/user/:id', Control.getProductsByUser)

Router.get('/:id', Control.getProductsById)

Router.post('/', upload.single('image'), Control.createProducts)

Router.put('/:id', upload.single('image'), Control.updateProducts)

Router.post('/checkout', Control.checkout)

Router.delete('/:id', Control.deleteProducts)



module.exports = Router