function Logoin(){
   this.init();
}
Logoin.prototype={
    init:function(){
        this.createDiv();
        this.clickEvent();
    },
    createDiv:function(){
        this.div = $("<div class='man-div'></div>");
        var str=`
                <div class="box-zhuce">
                    <div>
                        <p>手机注册</p><span class="x_button"></span>
                    </div>
                    <form class="inform">
                        <ul>
                            <li>
                                <input type="text" placeholder="手机号" class="phonenumber"><b></b>

                            </li>
                            <li>
                                <input type="text" placeholder="验证码"><span></span>
                                <b></b>
                                <a>换一张</a>
                            </li>
                            <li>
                                <input type="text" placeholder="短信验证码"><button>获取验证码</button><b></b>
                            </li>
                            <li>
                                <input type="password" placeholder="密码(8-20个字符)" class="zhucepassword"><b></b>
                            </li>
                            <li>
                                <input type="checkbox">阅读并同意<a href="##">《360用户服务条款》</a>和<a href="##">《360用户隐私政策》</a>
                            </li>
                            <li>
                                <input type="submit" value="注册">
                                <a>已有账号,<span class="button_span">直接登录</span></a>
                            </li>


                        </ul>

                    </form>
                </div>
        
        `
        this.div.html(str);
        this.div.appendTo($("body"));
    },
    clickEvent:function(){
        $(".x_button").on("click",this.removeself.bind(this));
        $(".button_span").on("click",this.goregister.bind(this));
        $(".inform").on("submit",this.handleSubmitCb.bind(this));

    },
    goregister:function(){
        this.div.remove();
        new Register();
    },
    removeself:function(){
        this.div.remove();
    },
    handleSubmitCb:function(){
        var username=$(".phonenumber").val();
        var password=$(".zhucepassword").val();
        
        $.ajax({
            type:"post",
            url:"http://localhost/360shopping/php/register.php",
            data:{
               "username":username,
               "password":password,
            },
            dataType:"json",
            success:this.ajaxsuccess.bind(this),

       })

    },
    ajaxsuccess:function(data){
        var _this=this;
        if(data.status){
            alert(data.info);
            setTimeout(function(){
             _this.div.remove();
             new Register();
            },2000)
    	}else{
            alert(data.info);
        }

        if(localStorage["goods"]){
            var obj = JSON.parse(localStorage["goods"]);
            $(".mygoods").text("("+obj.length+")")
            $(".mygoods").css("color","red");
        }

    }
   




}