var express = require('express');
var router = express.Router();
var category11s = require('../../models/category11')
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
    category11s.find( function(err, category11){ 

categoryModel.findOne({ title : "Second Test Category"}, function(err, category){ res.render('categories/category11', {category : category, category11 : category11, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const category11 = new category11s({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    category11.save(function(err){
        res.redirect('/category11')
    })


});

router.get('/delete/:_id', function(req, res){
    category11s.remove({_id : req.params._id}, function(err){
        res.redirect('/category11')
    })
})


router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });module.exports = router;