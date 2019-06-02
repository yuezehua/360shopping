function  Details(){

    this.stun=false;
    this.init();
}
Details.prototype={
    init:function(){
       
        this.findgoods();
    },
    
    findgoods:function(){
        //解析商品
        var loca = location.href;
        var arr = loca.split("?");
        var newArr = arr[1].split("=");
        this.Id = newArr[1];
        //请求所有商品信息
        $.ajax({
            type:"get",
            url:"./js/hotshopping.json",
            dataType:"json",
            success:this.hotgoodsdata.bind(this)
            
        })

    },
    //获取商品，渲染页面
    hotgoodsdata:function(data){
        for(var i=0;i<data.hotgoods.length;i++){
            if(data.hotgoods[i].id==this.Id){
            
                $(".bimg").attr("src",data.hotgoods[i].bigImg[0]);
                
                $(".goods-title").text(data.hotgoods[i].title);

                var price=Number(data.hotgoods[i].price.slice(1));

                $(".goods-price").text("￥"+price.toFixed(2));

            
                 var str="";
                for(var j=0;j<data.hotgoods[i].bigImg.length;j++){

                     str+=`
                       <li><img src="${data.hotgoods[i].minImg[j]}" data-src="${data.hotgoods[i].bigImg[j]}"></li>
                    `
                }
             
                $(".img-list").html(str);

                var tor=""
                for(var n=0;n<data.hotgoods[i].fenlei.length;n++){
                    tor+=`
                       <a>${data.hotgoods[i].fenlei[n]}</a>
                    `
                }

                $(".leixing").html(tor);
            }
        }
        
     
          this.clickEvent();
    },
    clickEvent:function(){
        if(!window.localStorage['name']){
            //弹出注册登录蒙板
            $(".denglu").on("click",()=>{ new Register() });
            $(".sdenglu").on("click",()=>{ new Register() });
            
            $(".zhuce").on("click",()=>{ new Logoin() });
        }else{
            //登录过后显示用户名
            $(".successdl ").css("display","inline-block");
            $(".suc-name").text(localStorage['name']);
            //退出登录删除本地存储
            $(".tuichu-dl").on("click",()=>{
            
                $(".successdl ").css("display","none");
                window.localStorage.removeItem("name");

            })

            //登录成功，删除进入购物车提示需登录提示
            $(".gohiderbox").remove();

            //登录成功后，点击“我的购物车”进行跳转购物车
            $(".myshoppingcar").removeClass("aflay");
            $(".myshoppingcar").on("click",()=>{
                    location.href="shoppingcar.html"
            })
            //登录成功显示购物车商品件数
            if(localStorage["goods"]){
                var obj = JSON.parse(localStorage["goods"]);
                $(".mygoods").text("("+obj.length+")")
                $(".mygoods").css("color","red");
            }


        }
        //点击加入购物车
        $(".go-shoppingcar").on("click",this.setLocalStorage.bind(this));
        //点击“喜欢”
        $(".love").on("click",this.loveEvent.bind(this));
    

        
        //数量的减
        $(".btn-red").on("click",this.reduceEvent);
        //数量的加
        $(".btn-add").on("click",this.addbuttenEvent);
       
        //鼠标滑过小照片，切换大照片，显示边框
        this.aimg=$(".img-list li img");
        this.len=this.aimg.length;
        for(var i=0;i<this.len;i++){
           this.aimg.eq(i).on("mouseover",this.imghover.bind(this,this.aimg.eq(i)))
        }

        //照片移动
        this.UL=$(".img-list");
        this.Li=$(".img-list li");
        this.widli=this.Li.eq(0).innerWidth();
        var wid=this.widli*this.Li.length;
        this.UL.css("width",wid);
        this.iNow=0;
        if(this.Li.length-5>0){
            //照片左移动
            $(".leftBtn").on("click",this.leftmove.bind(this));
            //照片右移动
            $(".rightBtn").on("click",this.rightmove.bind(this));
        }
        


    },
    //点击“喜欢”的回调函数
    loveEvent:function(){
       //判断是否登录
        if(!window.localStorage['name']){
            new Register();
        }else{
           
            if(!this.stun){
                $(".love").css("color","red");
                this.stun=true;
            }else{
                $(".love").css("color","white");
                this.stun=false;
            }

        }

    },
    //加入购物车的回调函数
    setLocalStorage:function(){
    //判断是否登录
    if(window.localStorage['name']){
        var sn=$(".goodsnumber").text();
        //判断是否有存有商品信息
        if(!localStorage["goods"]){
         
            localStorage["goods"]=JSON.stringify([{
                id:this.Id,
                num: sn
            }]);

        }else {

            var obj = JSON.parse(localStorage["goods"]);
           
            var bStop = true;
            //判断商品是否重复
            for(var i = 0; i < obj.length; i++) {
                if(obj[i].id ==this.Id) {
                    bStop = false;
                    alert("该商品已经加入购物车")
                    break;
                }
            }
            //添加商品
            if(bStop) {
    
                obj.push({
                    id: this.Id,
                    num: sn
                });
                localStorage.setItem("goods", JSON.stringify(obj));

            }

        }
        //显示购物车商品数量
        var nth=JSON.parse(localStorage["goods"]);

        $(".mygoods").text("("+nth.length+")")
        $(".mygoods").css("color","red");
    }else{
        new Register();//未登录，弹出登录页面
    }
    




    },
    //图片左移动回调函数
    leftmove:function(){
        if(this.iNow>=this.Li.length-5){
            this.iNow=this.Li.length-5

        }else{
            this.iNow++;
        }
        var  distance= -this.iNow*this.widli;
        this.UL.stop(true).animate({
            "left":distance
        },500)

       
    },
    //图片右移动回调函数
    rightmove:function(){
        if(this.iNow<=0){
            this.iNow=0;
        }else{
            this.iNow--;
        }
        
        var  distance= -this.iNow*this.widli;
        this.UL.stop(true).animate({
            "left":distance
        },500)


    },
    //数量减少回调函数
    reduceEvent:function(){
        
        var n=$(this).next().text();
        if(n<=1){
            n=1
        }else{
            n--;
        }
        $(this).next().text(n);
    },
    //数量增加回调函数
    addbuttenEvent:function(){
        var n=$(this).prev().text();
            n++;
        $(this).prev().text(n);
    },
    //鼠标滑过小图片回调函数
    imghover:function(that){
      for(var i=0;i<this.len;i++){
          this.aimg.eq(i).css("border-color","#fff")
      }
      that.css("border-color","#848484")
      var Nsrc= that.attr("data-src")
      $(".bimg").attr("src",Nsrc);
     
    }



}

new Details();