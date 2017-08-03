var express = require('express');
var router = express.Router();
var category16s = require('../../models/category16')
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
    category16s.find( function(err, category16){ 

categoryModel.findOne({ title : "asdas21313"}, function(err, category){ res.render('categories/category16', {category : category, category16 : category16, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const category16 = new category16s({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    category16.save(function(err){
        res.redirect('/category16')
    })


});

router.get('/delete/:_id', function(req, res){
    category16s.remove({_id : req.params._id}, function(err){
        res.redirect('/category16')
    })
})


router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });module.exports = router;