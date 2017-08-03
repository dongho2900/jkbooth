var express = require('express');
var router = express.Router();
var category3s = require('../../models/category3')
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
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })



router.get('/', csrfProtection,function(req, res){
    category3s.find( function(err, category3){ 

categoryModel.findOne({ title : "Choi"}, function(err, category){ res.render('categories/category3', {category : category, category3 : category3, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const category3 = new category3s({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    category3.save(function(err){
        res.redirect('/category3')
    })


});

router.get('/delete/:_id', function(req, res){
    category3s.remove({_id : req.params._id}, function(err){
        res.redirect('/category3')
    })
})


router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });module.exports = router;