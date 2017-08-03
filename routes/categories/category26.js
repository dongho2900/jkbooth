var express = require('express');
var router = express.Router();
var category26s = require('../../models/category26')
var commentModel = require('../../models/CommentModel')
var multer = require('multer');
var categoryModel = require('../../models/CategoryModel');var fs = require('fs')
var path = require('path')
var uploadDir = path.join(__dirname , '../../public/photo')
var stripTags = require('striptags')
var csrf = require('csurf')
var csrfProtection = csrf({cookie : true})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, 'photo-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

var upload = multer({ storage: storage , fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.JPG') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }})



router.get('/', csrfProtection,function(req, res){
    category26s.find( function(err, category26){ 

categoryModel.findOne({ title : "123132"}, function(err, category){ res.render('categories/category26', {category : category, category26 : category26, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.any(), function (req, res, next) {
    if(req.files){
        var filenames = "";
        for(var i in req.files){
            filenames += ("/" + req.files[i].filename)

        }
    }
    const category26 = new category26s({
        name : req.body.name,
        photoName : (req.files) ? filenames : "",
        content : stripTags(req.body.content)

    })
    category26.save(function(err){
        res.redirect('/category26')
    })


});

router.get('/delete/:id', function(req, res){


    category26s.remove({id : req.params.id}, function(err){
        res.redirect('/category26')
    })
})

router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });
module.exports = router;