function Register() {
    this.init();
}
Register.prototype = {
    init: function () {
        this.creatDiv();
        this.login();
        this.clickEvent();
    },
    creatDiv:function(){
        this.div = $("<div class='man-div'></div>");
        var str=`
                <div class="cont-box">
                      <div>
                           <a class="quc-a">短信登录</a><i></i><a>360账号登录</a>
                           <span></span>
                      </div>
                      <div class="registf">

                      </div>
                      <div class="bottabox">
                           <a class="gologin">快速注册</a><a>找回密码</a>
                      </div>

                </div>`

        this.div.html(str);

        this.div.appendTo($("body"));
    },
    login: function () {
        
       this.Formlbox=$(".registf")
        var str = `
                    <form>
                        <ul>
                            <li><input type="text" placeholder="手机号"></li>
                            <li><input type="text" placeholder="短信验证码"><button>获取验证码</button></li>
                            <li><input type="submit" value="登录"></li>
    
                        </ul>
                    </form>
                     `
        this.Formlbox.html(str);
        
        

    },
    clickEvent:function(){
        var Lspan=$(".cont-box div span");
        Lspan.on("click",this.LspanCallback.bind(this));
        this.aA=$(".cont-box div a");
        this.aA.eq(1).on("click",this.phoneCall.bind(this));
        this.aA.eq(0).on("click",this.sublogin.bind(this));
        $(".gologin").on("click",this.goLogin.bind(this));
        
    },
    goLogin:function(){
        this.div.remove();
        new Logoin();
    },
    sublogin:function(){
        this.aA.eq(0).addClass("quc-a").siblings().removeClass("quc-a");
        this.login();
    },
    LspanCallback:function(){
        this.div.remove();
    },
    phoneCall:function(){
        this.aA.eq(1).addClass("quc-a").siblings().removeClass("quc-a");
        
        this.chooselogin();
       
    },

    chooselogin: function () {
        
        var str = `
                    <form class="submit_zhanghao">
                        <ul>
                            <li><input type="text" placeholder="手机号" class="username"></li>
                            <li><input type="password" placeholder="密码" class="san-password"></li>
                            <li><input type="submit" value="登录"></li>
                        </ul>
                    </form>`
        this.Formlbox.html(str);
        
        $(".submit_zhanghao").on("submit",this.handleSubmitCb.bind(this))
       



    },
    handleSubmitCb:function(e){
        e.preventDefault();
        var username=$(".username").val();
        var password=$(".san-password").val();
        $.ajax({
             type:"post",
             url:"http://localhost/360shopping/php/login.php",
             data:{
                "username":username,
                "password":password,
             },
             dataType:"json",
             success:this.successdlEvent.bind(this,username)
                
        })
    },
    successdlEvent:function(that){

        this.div.remove();
        
        window.localStorage['name'] =that;

        $(".successdl ").css("display","inline-block");
        $(".suc-name").text(that);

        $(".tuichu-dl").on("click",()=>{
            
            $(".successdl ").css("display","none");
            window.localStorage.removeItem("name");

        })

        $(".gohiderbox").remove();
        $(".myshoppingcar").removeClass("aflay");
        $(".myshoppingcar").on("click",()=>{
            location.href="shoppingcar.html"
        })
        
     

    }
   



}
// new Register();


