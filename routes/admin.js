var express = require('express');
var session = require('express-session');
var user = require('../model/user.js');
var article = require('../model/article.js');
var router = express.Router();
var cxs = 10;
function check(req,res,next){
    if(req.session.admin){
        next();
    }else {
        res.redirect('./login');
    }
}
/* GET users listing. */
router.get('/',function(req, res,next) {
    if(req.session.admin){
        res.redirect('./desktop');
    }else {
        res.redirect('./login');
    }
});
//后台登录页面
router.get('/login',function(req, res,next) {
    res.render('login');
});
//后台登录校验
router.post('/dologin',function(req,res){
    var username = req.body["username"];
    var password = req.body["password"];
    if(password.length<1 && !username.length<1){
        res.json({status:false,msg:'密码不能为空'});
    }else {
        user.find({name:username},function(err,data){
            if(err){
                res.json({status:false,msg:'账号或者密码错误'});
                return
            };
            if(data.length<1){
                res.json({status:false,msg:'账号或者密码错误'});
                return
            }
            if(data[0].password==password){
                req.session['admin'] = data[0];
                res.json({status:true});
            }else {
                res.json({status:false,msg:'密码错误'});
            };
        })
    }
});
//后台登出页面
router.get('/logout',function(req,res){
    req.session.admin = null;
    res.redirect('./');
});
//后台注册页面
router.get('/register',function(req,res){
	res.render('register');
});
//后台注册执行
router.post('/register',function(req,res){
	res.res.send('账号或密码错误！！！')
});
//后台首页
router.get('/desktop',check,function(req,res){
	res.render('desktop',{user:req.session.admin});
});
//后台用户列表
router.get('/userlist',check,function(req,res){
    user.find(function(err,data){
        if (err) console.log(err);
        else res.render('userlist',{title:'管理员数据',list:data});
    })
});
//后台添加页面
router.post('/adduser',check,function(req,res){
    var newuser = new user(req.body)
    newuser.save(req.body,function(err){
        if(err){
            res.send({
                status: false,
                msg: "添加失败"
            });
        }else {
            res.send({
                status: true,
                msg: "添加成功"
            });
        }
    });
});
//后台删除页面
router.post('/deluser',check,function(req,res){
    user.remove(req.body, function(error){
        if(error) {
            console.log(error);
            res.send({
                status: true,
                msg: "删除失败"
            });
        } else {
            console.log('删除成功!---用户名：'+req.body.id);
            res.send({
                status: true,
                msg: "删除成功"
            });
        }
    });
});
//后台文章列表
router.get('/articleList',check,function(req,res){
    if(!req.query.page){
        res.redirect('./articleList?page=1')
        return false;
    };
    var pageSize = 11;
    var pageNo = req.query.page*1;
    var query=article.find({}).limit(pageSize).skip(pageNo ? (pageNo-1)*pageSize : 0);
    query.exec(function(err,data){
        if (err){
            console.log(err);
        }
        else {
            res.render('articleList',{
                title:'文章数据',
                list : data,
                current:1,
                tatal:20,
                pageNo : pageNo,
                nextbtn : data.length<pageSize ? true : false,
                prevbtn : pageNo==1 ? true : false
            });
        }
    });
});
//后台文章添加
router.get('/articleAdd',check,function(req,res){
    res.render('articleAdd');
});
//后台注册页面
router.post('/articleAdd',function(req,res){
    var temp = req.body;
    temp.user = req.session.admin ? req.session.admin.name : '';
    var newarticle = new article(temp);
    newarticle.save(req.body,function(err){
        console.log(err)
        if(err){
            res.send({
                status: false,
                msg: "添加失败"
            });
        }else {
            res.send({
                status: true,
                msg: "添加成功"
            });
        }
    });
});
router.post('/articleRemove',check,function(req,res){
    
});
router.post('/updateRemove',check,function(req,res){
    
});
router.get('/viewRemove',check,function(req,res){
    
});
router.get('/settphoto',check,function(req,res){
    res.render('font',{user:req.session.admin});
});
module.exports = router;
