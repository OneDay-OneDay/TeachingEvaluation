var HOST        = "http://210.38.137.126:8016";

var BASE_HEADER = {
  
  "Host"                    : "210.38.137.126:8016",
  "User-Agent"              : "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0",
  "Accept"                  : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language"         : "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3",
  "Accept-Encoding"         : "gzip, deflate",
  "Referer"                 : "http://210.38.137.126:8016/default2.aspx",
  "Connection"              : "keep-alive"
  
};

var LOGIN_CONFIG = {
  
  "__VIEWSTATE"             :   "dDwyODE2NTM0OTg7Oz47AX3Zzu1TpcW9kTBcf7gpTWfX4g==",
  "RadioButtonList1"        :   "学生",
  "Button1"                 :   "",
  "lbLanguage"              :   "",
  "hidPdrs"                 :   "",
  "hidsc"                   :   ""
  
};

var EVALUATION_COPY = {};

/*评分,随机,B,C两级评分*/
var EVALUATION  = {
  
  /* 评价教师 */                                                
  "DataGrid1:_ctl2:JS1"	    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl2:txtjs1"  : "",	
  "DataGrid1:_ctl3:JS1"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl3:txtjs1"  : "",	
  "DataGrid1:_ctl4:JS1"     :	String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl4:txtjs1"  : "",	
  "DataGrid1:_ctl5:JS1"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl5:txtjs1"  : "",	
  "DataGrid1:_ctl6:JS1"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl6:txtjs1"  : "",	
  "DataGrid1:_ctl7:JS1"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl7:txtjs1"  : "",	
  "DataGrid1:_ctl8:JS1"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl8:txtjs1"  : "", 	
  "DataGrid1:_ctl9:JS1"	    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl9:txtjs1"  : "",	
  "DataGrid1:_ctl10:JS1"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl10:txtjs1" : "",	
  "DataGrid1:_ctl11:JS1"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl11:txtjs1" : "",	
  "DataGrid1:_ctl12:JS1"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl12:txtjs1"	: "",
  "DataGrid1:_ctl13:JS1"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl13:txtjs1" : "",	
  "DataGrid1:_ctl14:JS1"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl14:txtjs1"	: "",
  "DataGrid1:_ctl15:JS1"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl15:txtjs1" : "",	
  "DataGrid1:_ctl16:JS1"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl16:txtjs1"	: "",
  "DataGrid1:_ctl17:JS1"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl17:txtjs1" :	"",
  "DataGrid1:_ctl18:JS1"    :	String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl18:txtjs1"	: "",
  "DataGrid1:_ctl19:JS1"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl19:txtjs1" : "",	
  "DataGrid1:_ctl20:JS1"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl20:txtjs1"	: "",
  "DataGrid1:_ctl21:JS1"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl21:txtjs1"	: "",
  
  /* 评语 */
  "pjxx"                    : "勉强还行啦，一般般", 
  "txt1"                    : "",
  "TextBox1"                :	0
  
};

/* 如果需要同时评价两个教师 */
var EVALUATION_ANOTHER_TEACHER = {
  
  "DataGrid1:_ctl2:JS2"	    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl2:txtjs2"  : "",	
  "DataGrid1:_ctl3:JS2"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl3:txtjs2"  : "",	
  "DataGrid1:_ctl4:JS2"     :	String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl4:txtjs2"  : "",	
  "DataGrid1:_ctl5:JS2"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl5:txtjs2"  : "",	
  "DataGrid1:_ctl6:JS2"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl6:txtjs2"  : "",	
  "DataGrid1:_ctl7:JS2"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl7:txtjs2"  : "",	
  "DataGrid1:_ctl8:JS2"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl8:txtjs2"  : "", 	
  "DataGrid1:_ctl9:JS2"	    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl9:txtjs2"  : "",	
  "DataGrid1:_ctl10:JS2"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl10:txtjs2" : "",	
  "DataGrid1:_ctl11:JS2"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl11:txtjs2" : "",	
  "DataGrid1:_ctl12:JS2"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl12:txtjs2"	: "",
  "DataGrid1:_ctl13:JS2"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl13:txtjs2" : "",	
  "DataGrid1:_ctl14:JS2"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl14:txtjs2"	: "",
  "DataGrid1:_ctl15:JS2"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl15:txtjs2" : "",	
  "DataGrid1:_ctl16:JS2"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl16:txtjs2"	: "",
  "DataGrid1:_ctl17:JS2"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl17:txtjs2" :	"",
  "DataGrid1:_ctl18:JS2"    :	String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl18:txtjs2"	: "",
  "DataGrid1:_ctl19:JS2"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl19:txtjs2" : "",	
  "DataGrid1:_ctl20:JS2"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl20:txtjs2"	: "",
  "DataGrid1:_ctl21:JS2"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl21:txtjs2"	: ""
  
}; 

/* 如果需要同时评价三个教师 */
var EVALUATION_ANOTHER_ANOTHER_TEACHER = {
  
  "DataGrid1:_ctl2:JS3"	    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl2:txtjs3"  : "",	
  "DataGrid1:_ctl3:JS3"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl3:txtjs3"  : "",	
  "DataGrid1:_ctl4:JS3"     :	String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl4:txtjs3"  : "",	
  "DataGrid1:_ctl5:JS3"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl5:txtjs3"  : "",	
  "DataGrid1:_ctl6:JS3"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl6:txtjs3"  : "",	
  "DataGrid1:_ctl7:JS3"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl7:txtjs3"  : "",	
  "DataGrid1:_ctl8:JS3"     : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl8:txtjs3"  : "", 	
  "DataGrid1:_ctl9:JS3"	    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl9:txtjs3"  : "",	
  "DataGrid1:_ctl10:JS3"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl10:txtjs3" : "",	
  "DataGrid1:_ctl11:JS3"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl11:txtjs3" : "",	
  "DataGrid1:_ctl12:JS3"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl12:txtjs3"	: "",
  "DataGrid1:_ctl13:JS3"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl13:txtjs3" : "",	
  "DataGrid1:_ctl14:JS3"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl14:txtjs3"	: "",
  "DataGrid1:_ctl15:JS3"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl15:txtjs3" : "",	
  "DataGrid1:_ctl16:JS3"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl16:txtjs3"	: "",
  "DataGrid1:_ctl17:JS3"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl17:txtjs3" :	"",
  "DataGrid1:_ctl18:JS3"    :	String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl18:txtjs3"	: "",
  "DataGrid1:_ctl19:JS3"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl19:txtjs3" : "",	
  "DataGrid1:_ctl20:JS3"	  : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl20:txtjs3"	: "",
  "DataGrid1:_ctl21:JS3"    : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "DataGrid1:_ctl21:txtjs3"	: ""
  
}; 

/* 评价教材 */
var EVALUATION_TEXTBOOK = {
  
  "dgPjc:_ctl2:jc1"	        : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "dgPjc:_ctl3:jc1"         :	String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "dgPjc:_ctl4:jc1"	        : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "dgPjc:_ctl5:jc1"	        : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "dgPjc:_ctl6:jc1"	        : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "dgPjc:_ctl7:jc1"	        : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "dgPjc:_ctl8:jc1"	        : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "dgPjc:_ctl9:jc1"	        : String.fromCharCode(66 + Math.floor(Math.random() * 2)),
  "dgPjc:_ctl10:jc1"	      : String.fromCharCode(66 + Math.floor(Math.random() * 2))
  
}; 

var LAST_EVALUATION = [];

module.exports = {
    HOST            :           HOST,
    BASE_HEADER     :           BASE_HEADER,
    LOGIN_CONFIG    :           LOGIN_CONFIG,
    EVALUATION_COPY :           EVALUATION_COPY,
    EVALUATION      :           EVALUATION,
    EVALUATION_ANOTHER_TEACHER  :   EVALUATION_ANOTHER_TEACHER,
    EVALUATION_ANOTHER_ANOTHER_TEACHER  :   EVALUATION_ANOTHER_ANOTHER_TEACHER,
    EVALUATION_TEXTBOOK    :   EVALUATION_TEXTBOOK
};