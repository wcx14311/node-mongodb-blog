var request = require('request');
var cheerio = require("cheerio");
var axios = require('axios');
var article = require('./model/article.js');

function getHtmlByUrl(index) {
    console.log('第'+ index +'页')
    var listUrl = "https://cnodejs.org/?tab=share&page="+index
    request(listUrl, function(err, response, body) {
        if (!err && response.statusCode == 200) {
        	var $ = cheerio.load(body);
        	var ids=[]
            if($(".cell .topic_title").length == 0){
                clearInterval(grouble);
            }
        	$(".cell .topic_title").each(function(i, e) {
        		ids[i] = $(e).attr('href');
        	});
        	var xia = 0;
        	var timer = setInterval(function(){
        		if( xia > ids.length - 1 ){
        			clearInterval(timer);
        		}else {
                    getdetial(ids[xia],xia);
                    xia++;
                }
        	},300)
        } else {
            console.log('获取页面失败 => ' + listUrl);
        }
    });
};
function getdetial(id,index){
    var detialUrl = "https://cnodejs.org" + id;
	axios.get(detialUrl).then(function (response) {
		saveData(response.data , index)
	}).catch(function (error) {
		console.log('获取页面失败' + detialUrl);
	});
}

function saveData(data,index){
    var $ = cheerio.load(data);
    var temp = {};
    temp.user = 'simew';
    temp.name = $('.topic_full_title').text();
    temp.content = $('.markdown-text').html();
    var newArticle = new article(temp);
    newArticle.save(function(err){
        if(err){ 
            console.log("添加失败") 
        }else {
            console.log("添加成功------"+index) 
        }   
    })
} 

var pageno = 1;
getHtmlByUrl( pageno++ );

var grouble = setInterval(function(){
    getHtmlByUrl( pageno++ );
},4000)