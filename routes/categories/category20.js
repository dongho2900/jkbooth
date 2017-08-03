var express = require('express');
var router = express.Router();
var category20s = require('../../models/category20')
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
    category20s.find( function(err, category20){ 

categoryModel.findOne({ title : "test2"}, function(err, category){ res.render('categories/category20', {category : category, category20 : category20, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const category20 = new category20s({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    category20.save(function(err){
        res.redirect('/category20')
    })


});

router.get('/delete/:_id', function(req, res){
    category20s.remove({_id : req.params._id}, function(err){
        res.redirect('/category20')
    })
})


router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });module.exports = router;