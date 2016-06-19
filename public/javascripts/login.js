$('#login-button').click(function (event) {
    event.preventDefault();
    var _this=this;
    _this.innerHTML="Loading...";
    _this.disabled=true;
    
    var error       =   document.getElementById("error");
    var StudentNum  =   document.getElementById("StudentNum").value;
    var Password    =   document.getElementById("Password").value;
    var CheckCode   =   document.getElementById("CodeInput").value;
    
    var welcome     =   document.getElementById("welcome");
    var content     =   document.getElementById("content");
    var user        =   document.getElementById("user");
    var courses     =   document.getElementById("courses");
        
    if(StudentNum==""||Password==""||CheckCode==""){
      error.style.display="block";
      error.innerHTML   =   "全部填完哦!";
      _this.innerHTML   =   "Login";
      _this.disabled    =   false;
    }else{
        var loginForm={
            StudentNum  :   StudentNum,
            Password    :   Password,
            CheckCode   :   CheckCode
        };
        $.ajax({
			url         : "/login",
			type        : "post",
			contentType : "application/json; charset=utf-8",
			dataType    : "json",
			data        : JSON.stringify(loginForm),
			cache       : false,
			success     : function(res){
                            if(res.user_name){
                                error.style.display="block";
                                error.innerHTML=res.resText;
                                $('form').fadeOut(500);
                                $('.wrapper').addClass('form-success');
                                setTimeout(function(){
                                    error.style.display="none";
                                    $('#welcome').animate({opacity:0},50,function(){
                                        this.style.display="none";
                                    });
                                    $('#content').fadeIn(200);
                                    user.innerHTML=res.user_name;
                                    if(res.courseList && res.courseList.length != 0){
                                        res.courseList.map(function(ele,index){
                                            var Li=document.createElement("li");
                                            Li.innerHTML=ele;
                                            courses.appendChild(Li);
                                        });
                                    }else{
                                        courses.innerHTML = " 你已经评价过了哦 ";
                                        courses.style.fontSize = 14 + "px";
                                    };
                                },2000);
                            }else{
                                 _this.innerHTML="Login";
                                 error.style.display="block";
                                 error.innerHTML=res.resText;
                            };
			              }
		});
    };
});

$('#evaluating').click(function (event) {
    event.preventDefault();
    
    if($('#courses').find('li').length == 0){
        error.style.display="block";
        error.innerHTML="你已经评价过了哦";
        setTimeout(function(){
            error.style.display="none";
        },2000);
        return;
    };
    
    var _this=this;
    _this.value="正在评价请稍等...";
    _this.disabled=true;
    $.ajax({
		url         : "/evaluating",
		type        : "get",
        dataType    : "json",
		cache       : false,
		success     : function(res){
            _this.value="嘻嘻~";
            error.style.display="block";
            error.innerHTML=res.resText;
        }
                        
	});
});