var express     = require('express');
var router      = express.Router();
var cheerio     = require("cheerio");
var request     = require("superagent");
var charset     = require("superagent-charset");
var fs          = require("fs");
var path        = require("path");
var url         = require("url");
var qs          = require("querystring");
var data_config = require("../data_config");
charset(request);

var HOST            =            data_config.HOST;       
var BASE_HEADER     =            data_config.BASE_HEADER;
var LOGIN_CONFIG    =            data_config.LOGIN_CONFIG;
var EVALUATION_COPY =            data_config.EVALUATION_COPY;
var EVALUATION      =            data_config.EVALUATION;
var EVALUATION_ANOTHER_TEACHER          =   data_config.EVALUATION_ANOTHER_TEACHER;
var EVALUATION_ANOTHER_ANOTHER_TEACHER  =   data_config.EVALUATION_ANOTHER_ANOTHER_TEACHER;
var EVALUATION_TEXTBOOK                 =   data_config.EVALUATION_TEXTBOOK; 

router.get('/', function(req, res, next) {
  var COOKIE = "";
  request
    .get("http://210.38.137.126:8016/default2.aspx")
    .set(BASE_HEADER)
    .end(function(error,result){
      
      if(error){
        console.log(error);
        throw new Error(error);
      };
      
      /*COOKIE和验证码绑定，提交验证码时必须携带此cookie*/
      if(result.header["set-cookie"]){
        COOKIE = String(result.header["set-cookie"]).replace(/; path=\// , "");
      }else{
        res.end("网络不太好哦...刷新下试试？");
      };
      
      request
        .get("http://210.38.137.126:8016/CheckCode.aspx")
        .set(BASE_HEADER)
        .set("Cookie" , COOKIE)
        .end(function(error,result){
          if(error){
            console.log(error);
            throw new Error('Something bad happened');
          };
          fs.writeFile("public/images/" + "CheckCode.gif", result.body, function(err){
            if(err){
              console.log(err);
              throw new Error('Something bad happened');
            };
            res.cookie("COOKIE", COOKIE, { maxAge: 1000*60 });
            res.render("index", { 
              title     : "一键评价",
              CheckCode : "/images/" + "CheckCode.gif"
            });
          });
        });
    });
    
});

router.post('/login', function(req, res, next) {
  var COURSES_LIST    = [];
  var COURSES_IDS     = [];
  
  var COOKIE = req.cookies.COOKIE;
  // console.log("COOKIE是  " + COOKIE);
  
  request
        .post("http://210.38.137.126:8016/default2.aspx")
        .charset("gb2312")
        .set(BASE_HEADER)
        .set("Referer" , "http://210.38.137.126:8016/default2.aspx")
        .set("Cookie" , COOKIE)
        .type("form")
        .send(LOGIN_CONFIG)
        .send({
          "txtUserName"             :   req.body.StudentNum,
          "TextBox2"                :   req.body.Password,
          "txtSecretCode"           :   req.body.CheckCode
        })
        .end(function(error, result){
            if(error){
              console.log(error);
              throw new Error(error);
            };
            /*获取用户登录权限cookie => 原来只有一个cookie...*/
            // var cookie =  result.header["set-cookie"];
            // console.log(cookie);
            var $ = cheerio.load(result.text);
            /*根据获取的用户名是否存在，判断是否登录成功*/
            if($('#xhxm').text()){
              var user_name = $('#xhxm').text();
              var courses   = $('.sub').eq(2).find('a');
              if(courses){
                courses.each(function(index, element) {
                  COURSES_LIST[index]   = $(this).text();
                  COURSES_IDS[index]    = $(this).attr("href");
                });
              }else{
                COURSES_IDS  = [];
                COURSES_LIST = [];           
              };
              
              createNewUser(user_name,req.body.StudentNum,req.body.Password,COURSES_LIST);
              req.session.COURSES_IDS = COURSES_IDS;
              
              res.json({ 
                resText     : "登录成功",
                user_name   : user_name,
                courseList  : COURSES_LIST
              });
            }else{
              res.json({ resText : "学号密码记错啦！或者是网络不太稳定？" });
            };
        });
});

router.get('/evaluating', function(req, res, next) {
  var COOKIE   = req.cookies.COOKIE;
  
  var SAVE_PATH            = "";                        /*提交保存评价信息的路径*/
  var LESSON_ID            = "";
  
  var INDEX                =  0;
  
  var HAVE_TEXTBOOK        = true;                      /* 需要评教材 */
  var HAVE_ANOTHER_TEACHER = false;                     /* 同一门课程需要评价两位教师 */
  var HAVE_ANOTHER_ANOTHER_TEACHER = false;             /* 同一门课程需要评价三位教师 */
  
  var __EVENTTARGET     = "";
  var __EVENTARGUMENT   = "";
  var __VIEWSTAT        = "";
  
  var COURSES_IDS = req.session.COURSES_IDS;
  
  if(COURSES_IDS.length == 0){
    res.json({ resText : "你已经评价过啦!" });
  };
  SAVE_PATH = HOST + "/" + COURSES_IDS[INDEX];       
  request
     .get(SAVE_PATH)
     .charset("gb2312")
     .set(BASE_HEADER)
     .set("Cookie" , COOKIE)
     .end(function(error, result){ 
              if(error){
                console.log(error);
                throw new Error(error);
              };
              
              var $                         = cheerio.load(result.text);
              var lesson                    = $('#pjkc').find("option:selected").text();
              var TEXTBOOK                  = $('#lblPjc').text();
              var ANOTHER_TEACHER           = $('#DataGrid1__ctl2_JS2');
              var ANOTHER_ANOTHER_TEACHER   = $('#DataGrid1__ctl2_JS3');
              
              /*获取隐藏表单域字符，每一次提交评价必须带上*/
              __EVENTTARGET        = $('input[type="hidden"]').eq(0).val();
              __EVENTARGUMENT      = $('input[type="hidden"]').eq(1).val();
              __VIEWSTAT           = $('input[type="hidden"]').eq(2).val();
              
              /* 判断是否需要评价教材 */
              if(!TEXTBOOK){
                HAVE_TEXTBOOK = false;
              }else{
                HAVE_TEXTBOOK = true;
              };
              
              /* 判断是否需要同时评价两位教师 */
              if(ANOTHER_TEACHER){
                HAVE_ANOTHER_TEACHER = true;
              }else{
                HAVE_ANOTHER_TEACHER = false;
              };
              
              /* 判断是否需要同时评价三位教师 */
              if(ANOTHER_ANOTHER_TEACHER){
                HAVE_ANOTHER_ANOTHER_TEACHER = true;
              }else{
                HAVE_ANOTHER_ANOTHER_TEACHER = false;
              };
                        
              SAVE_PATH            = HOST + "/" + COURSES_IDS[INDEX];              
              LESSON_ID            = qs.parse(url.parse(String(COURSES_IDS[INDEX])).query).xkkh;
              
              console.log(SAVE_PATH);
              
              var eval_config={
                INDEX                         :         INDEX,
                COOKIE                        :         COOKIE,
                SAVE_PATH                     :         SAVE_PATH,
                COURSES_IDS                   :         COURSES_IDS,
                LESSON_ID                     :         LESSON_ID,
                __EVENTTARGET                 :         __EVENTTARGET,
                __EVENTARGUMENT               :         __EVENTARGUMENT,
                __VIEWSTAT                    :         __VIEWSTAT,
                HAVE_TEXTBOOK                 :         HAVE_TEXTBOOK,
                HAVE_ANOTHER_TEACHER          :         HAVE_ANOTHER_TEACHER,
                HAVE_ANOTHER_ANOTHER_TEACHER  :         HAVE_ANOTHER_ANOTHER_TEACHER                
              };
                                  
              function evaluating(){
                return new Promise((resolve,reject) => {
                  save_request(resolve,reject,eval_config);
                });
              };
              evaluating().then(() => {
                res.json({ resText : "评价成功!" });
              });
              
      });       
}); 

function save_request(resolve,reject,eval_config){
  var INDEX           = eval_config.INDEX;
  var SAVE_PATH       = eval_config.SAVE_PATH;
  var COURSES_IDS     = eval_config.COURSES_IDS;
  var COOKIE          = eval_config.COOKIE; 
  var LESSON_ID       = eval_config.LESSON_ID;
  var __EVENTTARGET   = eval_config.__EVENTTARGET;
  var __EVENTARGUMENT = eval_config.__EVENTARGUMENT;
  var __VIEWSTAT      = eval_config.__VIEWSTAT;
  var HAVE_TEXTBOOK   = eval_config.HAVE_TEXTBOOK;
  var HAVE_ANOTHER_TEACHER = eval_config.HAVE_ANOTHER_TEACHER;
  var HAVE_ANOTHER_ANOTHER_TEACHER = eval_config.HAVE_ANOTHER_ANOTHER_TEACHER;
  /* 拷贝 */
  EVALUATION_COPY = EVALUATION;
  
  /* 如果需要评价教材 */
  if(HAVE_TEXTBOOK){
    for(var node in EVALUATION_TEXTBOOK){
      EVALUATION[node] = EVALUATION_TEXTBOOK[node];
    };
  };
  
  /* 如果需要同时评价两位老师 */
  if(HAVE_ANOTHER_TEACHER){
    for(var node in EVALUATION_ANOTHER_TEACHER){
      EVALUATION[node] = EVALUATION_ANOTHER_TEACHER[node];
    };
  };
  
  /* 如果需要同时评价三位老师 */
  if(HAVE_ANOTHER_ANOTHER_TEACHER){
    for(var node in EVALUATION_ANOTHER_ANOTHER_TEACHER){
      EVALUATION[node] = EVALUATION_ANOTHER_ANOTHER_TEACHER[node];
    };
  };
  
  if(INDEX == COURSES_IDS.length-1){
    LAST_EVALUATION = EVALUATION;
  };   
  request
        .post(SAVE_PATH)
        .charset("gb2312")
        .set(BASE_HEADER)
        .set("Cookie" , COOKIE)
        .type("form")
        .send(EVALUATION)
        .send({ 
          "Button1"          :  "保存",
          "pjkc"             :  LESSON_ID,
          "__EVENTTARGET"    : __EVENTTARGET,
          "__EVENTARGUMENT"  : __EVENTARGUMENT,
          "__VIEWSTATE"      : __VIEWSTAT
         })
        .end(function(error, result){
              if(error){
                console.log(error);
                reject(error);
              };
              
              /* 还原 */
              EVALUATION = EVALUATION_COPY;
              
              // if(INDEX == 0){
              //   console.log(result.text);
              // };
              
              var $                         = cheerio.load(result.text);
              var lesson                    = $('#pjkc').find("option:selected").text();
              var TEXTBOOK                  = $('#lblPjc').text();
              var ANOTHER_TEACHER           = $('#DataGrid1__ctl2_JS2');
              var ANOTHER_ANOTHER_TEACHER   = $('#DataGrid1__ctl2_JS3');
                            
              __EVENTTARGET     = $('input[type="hidden"]').eq(0).val();
              __EVENTARGUMENT   = $('input[type="hidden"]').eq(1).val();
              __VIEWSTAT        = $('input[type="hidden"]').eq(2).val(); 
                            
              if(!TEXTBOOK){
                HAVE_TEXTBOOK = false;
              }else{
                HAVE_TEXTBOOK = true;
              };
              
              if(ANOTHER_TEACHER){
                HAVE_ANOTHER_TEACHER = true;
              }else{
                HAVE_ANOTHER_TEACHER = false;
              };
              
              if(ANOTHER_ANOTHER_TEACHER){
                HAVE_ANOTHER_ANOTHER_TEACHER = true;
              }else{
                HAVE_ANOTHER_ANOTHER_TEACHER = false;
              };
              
              if(INDEX < COURSES_IDS.length){
                INDEX++;
              };
              
              SAVE_PATH         = HOST + "/" + COURSES_IDS[INDEX];
                  
              LESSON_ID         = qs.parse(url.parse(String(COURSES_IDS[INDEX])).query).xkkh;
              
              var eval_config={
                INDEX                         :         INDEX,
                COOKIE                        :         COOKIE,
                SAVE_PATH                     :         SAVE_PATH,
                COURSES_IDS                   :         COURSES_IDS,
                LESSON_ID                     :         LESSON_ID,
                __EVENTTARGET                 :         __EVENTTARGET,
                __EVENTARGUMENT               :         __EVENTARGUMENT,
                __VIEWSTAT                    :         __VIEWSTAT,
                HAVE_TEXTBOOK                 :         HAVE_TEXTBOOK,
                HAVE_ANOTHER_TEACHER          :         HAVE_ANOTHER_TEACHER,
                HAVE_ANOTHER_ANOTHER_TEACHER  :         HAVE_ANOTHER_ANOTHER_TEACHER                
              };
              
              if(INDEX == COURSES_IDS.length){
                submit_request(eval_config);
                resolve();              
              }else{
                console.log("已经评价完第 " + (INDEX+1) + " 门课程  " + lesson);
                console.log(SAVE_PATH);
                save_request(resolve,reject,eval_config);
              };
                                        
         });
};

function submit_request(eval_config){
  var INDEX           = eval_config.INDEX;
  var SAVE_PATH       = eval_config.SAVE_PATH;
  var COURSES_IDS     = eval_config.COURSES_IDS;
  var COOKIE          = eval_config.COOKIE; 
  var LESSON_ID       = eval_config.LESSON_ID;
  var __EVENTTARGET   = eval_config.__EVENTTARGET;
  var __EVENTARGUMENT = eval_config.__EVENTARGUMENT;
  var __VIEWSTAT      = eval_config.__VIEWSTAT;
  var HAVE_TEXTBOOK   = eval_config.HAVE_TEXTBOOK;
  var HAVE_ANOTHER_TEACHER = eval_config.HAVE_ANOTHER_TEACHER;
  var HAVE_ANOTHER_ANOTHER_TEACHER = eval_config.HAVE_ANOTHER_ANOTHER_TEACHER;
                
  console.log("所有课程评价完毕 即将提交评价请求");  
  SAVE_PATH = HOST + "/" + COURSES_IDS[COURSES_IDS.length-1];  
  /* 提交请求 */
  request
       .post(SAVE_PATH)
       .charset("gb2312")
       .set(BASE_HEADER)
       .set("Cookie" , COOKIE)
       .type("form")
       .send(LAST_EVALUATION)
       .send({ 
          "Button2"          :  "提交",
          "pjkc"             :  LESSON_ID,
          "__EVENTTARGET"    : __EVENTTARGET,
          "__EVENTARGUMENT"  : __EVENTARGUMENT,
          "__VIEWSTATE"      : __VIEWSTAT
       })
       .end(function(error, result){ 
          if(error){
            console.log(error);
            throw new Error(error);
          };          
          console.log(result.text);
          console.log("评价结束");
        });
};

function createNewUser(username,stuNum,passw,COURSES_LIST){
  
  var userModel = global.dbHandle.getModel("user");
  var username  = String(username).replace(/同学/ , ""); 
  
  userModel.findOne({studentNum : stuNum},function(err,doc){
			if(err){
				console.log(err);
        throw new Error(err);
			}else if(doc){
				console.log(username + "  已经记录过啦");
			}else{
        if(COURSES_LIST.length == 0){
          console.log(username + "  已经评价过啦，所以待评价课程为空");
        };
				userModel.create({
					name        : username,
          studentNum  : stuNum,
					password    : passw,
          COURSES_LIST: COURSES_LIST
				},function(err,doc){
					if(err){
						console.log(err);
					}else{
						console.log(username + "  的信息已被记录");
					};
				});
			};
  });
  
};

module.exports = router;
 
