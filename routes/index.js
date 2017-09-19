var express = require('express');
var article = require('../model/article.js');
var path = require('path');
var router = express.Router();


//首页
router.get('/', function(req, res, next) {
    res.render('index');
});
//文章列表
router.get('/articleList', function(req, res, next) {
	if(!req.query.page){
		res.redirect('./articleList?page=1')
        return false;
	};
	var pageSize = 15;
	var pageNo = req.query.page*1;
    var query=article.find({}).limit(pageSize).skip(pageNo ? (pageNo-1)*pageSize : 0);
    query.exec(function(err,data){
        if (err){
        	console.log(err);
        }
        else {
        	res.render('fontAL',{
        		list : data,
                current:1,
                tatal:20,
        		pageNo : pageNo,
        		nextbtn : data.length<pageSize ? true : false,
        		prevbtn : pageNo==1 ? true : false
        	});
        }
    })
});
//文章详情
router.get('/articleDetial', function(req, res, next) {
	article.find({_id:req.query.id},function(err,data){
		if(err){
			res.render('error',err);
		}else {
			res.render('fontAD',{data:data[0]});
		}
	});
    
});
//上传用户头像
router.post('/uploadHeadPortrait',function(req, res){
    var imgData = req.body.img;
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var baseImgSrc = '/images/user/IMG-'+ Date.now() +'.jpg';
    var imgsrc = 'public'+ baseImgSrc;
    fs.writeFile(imgsrc, dataBuffer, function(err) {
        if(err){
            res.send(err);
        }else{
            user.findByIdAndUpdate({_id:req.session.admin['_id']},{photo:baseImgSrc},{new:true},function(err,data){
                if(err){
                    console.log(err)
                }else {
                    req.session['admin'] = data
                    console.log('修改成功');
                    res.send({
                        'status':true,
                        'src':baseImgSrc,
                        'msg':'保存成功！'
                    })
                }
            })
        }
    });
});
module.exports = router;