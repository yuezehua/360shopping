function  Pood(){
    this.aAl=$(".lunbobox  a");
    this.ali=$(".lunbobox ul li")
    this.inow= 0;
    this.n= 0;
    this.timer=null;
    this.innt();
}

Pood.prototype={
    innt:function(){
        this.xianshigoods();
        this.daojishi();
        this.lunbotu();
        this.rightfixlogo();
        this.event();
       
      
    },
    //右侧固定二维码
    rightfixlogo:function(){
        this.indoowH =$(window).height();
       
         var div=$("<div><div class='fixedbx'><span class='xbutton'></span><img src='./img/3a250.png'></div></div>");
         div.addClass("niniub");
         div.css({
            "position":"absolute",
            "width":"163px",
            "height" :"300px",
            "right":0,
            "top":this.indoowH/2+"px",
            "margin-top":"-150px",
            "z-index":4,
        })
        div.appendTo($("body"));

    },

    //轮播图
    lunbotu:function(){
        clearInterval(this.timer);
        this.timer=setInterval(this.lunbotucallback.bind(this),3000)
      
    },
    //轮播切换
    lunbotucallback:function(){
        if(this.inow >=this.aAl.length-1){
            
            this.inow=0;
        }else{
           
            this.inow++;
        }
       
        this.ali.eq(this.inow).addClass("active").siblings().removeClass("active");
        this.aAl.eq(this.n).stop(true).animate({
               "opacity": 0,
           },1000);
        this.aAl.eq(this.inow).stop(true).animate({
            "opacity": 1,
        },1000)

        this.n=this.inow;

    },

    event:function(){
        var but=$(".lunbobox span");
        var box=$(".lunbobox");
        var xbutton=$(".xbutton")
        var _this=this;

        $(document).scroll(this.niniucallback.bind(this));
        //首页右部固定二维码点击删除
        xbutton.on("click",this.xbuttonEvent.bind(this));

       //鼠标移入轮播图停止
        box.on("mouseover",function(){
            clearInterval(_this.timer);
        })
        //
        box.on("mouseout",function(){
            _this.lunbotu();
        })
        //轮播图左右切换
        but.eq(0).on("click",this.buttenleft.bind(this));

        but.eq(1).on("click",this.lunbotucallback.bind(this));
        //轮播图底部圆点切换
        for(var i=0;i<this.ali.length;i++){
            
            this.ali.eq(i).on("click",this.clickLi.bind(this, this.ali.eq(i)))
        }
        
        if(!window.localStorage['name']){
            //点击登录
            $(".denglu").on("click",()=>{new  Register()})
            $(".sdenglu").on("click",()=>{new  Register()})
            //点击注册
            $(".zhuce").on("click",()=>{new  Logoin()})
        }else{
            $(".successdl ").css("display","inline-block");
            $(".suc-name").text(localStorage['name']);
            $(".tuichu-dl").on("click",()=>{
            
                $(".successdl ").css("display","none");
                window.localStorage.removeItem("name");

               
            })
            $(".gohiderbox").remove();
            $(".myshoppingcar").removeClass("aflay");

            if(localStorage["goods"]){
                var obj = JSON.parse(localStorage["goods"]);
                $(".mygoods").text("("+obj.length+")")
                $(".mygoods").css("color","red");
            }

            $(".myshoppingcar").on("click",()=>{
                location.href="shoppingcar.html"
            })

            

        }
    },
    
    xbuttonEvent:function(){
        $(".niniub").remove();
        var soon=$("<div><img src='./img/rightlogo.png'/></div>");
        soon.addClass("rightlogo");
        soon.css({
           "position":"absolute",
           "width":"124px",
           "height" :"124px",
           "right":0,
           "top":this.Hing+"px",
           "margin-top":"-62px",
           "z-index":4,
       })
       soon.appendTo($("body"));

       
    },
    //滚动条滚动，页面右侧图标跟着移动
    niniucallback:function(){
        this.hig=$(document).scrollTop();
         this.Hing= this.indoowH/2+this.hig;
        $(".niniub").css("top",this.Hing+"px");
        $(".rightlogo").css("top",this.Hing+"px");


    },
    //圆点切换轮播图回调
    clickLi:function(that){
        this.inow=that.index();
        
        this.ali.eq(this.inow).addClass("active").siblings().removeClass("active");
        this.aAl.eq(this.n).stop(true).animate({
            "opacity": 0,
        },1000)
        this.aAl.eq(this.inow).stop(true).animate({
            "opacity": 1,
        },1000)

        this.n=this.inow;
        

    },
    //轮播向右切换回调
    buttenleft:function(){
        if(this.inow <= 0){
            
            this.inow=this.aAl.length-1;
        }else{
          
            this.inow--;
        }
       
        this.ali.eq(this.inow).addClass("active").siblings().removeClass("active");
        this.aAl.eq(this.n).stop(true).animate({
            "opacity": 0,
        },1000)
        this.aAl.eq(this.inow).stop(true).animate({
            "opacity": 1,
        },1000)

        this.n=this.inow;
    
    },
    daojishi:function(){
        setInterval(this.gettime,1000)
    },
    //限时购倒计时
    gettime:function(){
       
        var d=new Date();
        
        var year=d.getFullYear();
        var month=d.getMonth()+1;
        var date=d.getDate();

        var h=d.getHours();
        
        
        if(h<10){
            var iNow=new Date(year+"-"+month+"-"+date+"   "+"10:00:00");
            $(".changep").html("限量100件<a class='right-a'>待开始</a>")
        }else if(h<22){
            var iNow=new Date(year+"-"+month+"-"+date+"   "+"22:00:00");
            $(".time-stare").text("距结束")
        }else{
            var sn=date+1;
            var iNow=new Date(year+"-"+month+"-"+sn+"   "+"10:00:00");
            $(".hidspan").css("display","inline-block");
            $(".changep").html("限量100件<a class='right-a'>待开始</a>")
            
        }

        var tim=iNow.getTime()-d.getTime();

        var newH= parseInt((tim % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        var newM= parseInt((tim % (1000 * 60 * 60)) / (1000 * 60));

        var newS=parseInt((tim % (1000 * 60)) / 1000);
       
        newH = newH < 10 ? ('0' + newH) : newH;
        newM = newM < 10 ? ('0' + newM) : newM;
        newS = newS < 10 && newS >= 0? ('0' + newS) : newS;
        $(".spanH").text(newH);
        $(".spanM").text(newM);
        $(".spanS").text(newS);
        
       
    },
    xianshigoods:function(){
        
        $.ajax({
            type:"get",
            url:"./js/shangping.json",
            dataType:"json",
            success:this.xsgoodsdata
            
        })
        $.ajax({
            type:"get",
            url:"./js/hotshopping.json",
            dataType:"json",
            success:this.hotgoodsdata.bind(this)
            
        })
        $.ajax({
            type:"get",
            url:"./js/moregoods.json",
            dataType:"json",
            success:this.moregoodsdata.bind(this)
            
        })

       

    },
    xsgoodsdata:function(data){
        console.log(data)
        
        for(var i=0;i<data.timegoods.length;i++){
            var Li=$('<li></li>')
            var str=`
            <a href="##"><img src="${data.timegoods[i].img}"></a>
            <div class="text-box">
                <p>${data.timegoods[i].title}</p>
                <p><span class="price">${data.timegoods[i].price}</span><span class="cur-price">${data.timegoods[i].delprice}</span></p>
                <p class="changep"><span><b class="wid-percent"></b></span><i>${data.timegoods[i].percent}</i><a>马上抢</a></p>
            </div>

            `
            Li.html(str);
           
            Li.appendTo($(".time-goods"))
            $(".wid-percent").eq(i).css("width",data.timegoods[i].percent)
        }



    },
    hotgoodsdata:function(data){
        for(var i=0;i<data.hotgoods.length;i++){
         
           var ali=$('<li class="li-hover"></li>');
           var str=`
           <a href="##">
                <div><img src="${data.hotgoods[i].img}"></div>
                <P>${data.hotgoods[i].title}</P>
                <P>${data.hotgoods[i].price}</P>
            </a>
           `
            ali.html(str);
            ali.on("click",this.goxiangqing.bind(this,data.hotgoods[i].id));
           ali.appendTo($(".hot-list"))
        }
        
        
    },
    moregoodsdata:function(data){
        for(var i=0;i<data.moregoods.length;i++){
         
            var alin=$('<li class="li-hover"></li>');
            var str=`
            <a href="##">
                <div><img src="${data.moregoods[i].img}"></div>
                <P>${data.moregoods[i].title}</P>
                <P>${data.moregoods[i].price}</P>
            </a>
            `
            alin.html(str);
            
            alin.appendTo($(".more-list"))
         }
       
        

    },
    goxiangqing:function(that){
        location.href="xiangqing.html?id="+that;
    }

   
       
   


}
 
new Pood();