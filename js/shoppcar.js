function   Goodscar(){
    this.Allcheck=$(".btn-all");
    this.emptybox=$(".empty-car");
    
    this.init();
}
Goodscar.prototype={
   
    init:function(){

        this.getAll();
       

    },
    //获取所有商品信息
    getAll:function(){

        $.ajax({
            type:"get",
            url:"./js/hotshopping.json",
            dataType:"json",
            success:this. blockgoods.bind(this)
            
        })

    },
    //挑选出加入购物车的商品
    blockgoods:function(data){

        if(localStorage["goods"]){
       
            this.obj = JSON.parse(localStorage["goods"]);
           
            $(".mygoods").text("("+this.obj.length+")")
            $(".mygoods").css("color","red");
            
            if(this.obj <= 0){
                this.emptybox.css("display","block");

            }else{
                var str = "";

                for(var i=0;i<this.obj.length;i++){

                    for(var j=0;j<data.hotgoods.length;j++){
                        if(this.obj[i].id==data.hotgoods[j].id){

                        var nps="￥"+Number(data.hotgoods[j].price.slice(1)).toFixed(2);
                        var xmoney="￥"+(this.obj[i].num*Number(data.hotgoods[j].price.slice(1))).toFixed(2);
                            str+=`
                                <tr>
                                    <td><span class="choosegoods"  aria-checked="false">√</span></td>
                                    <td><img src="${data.hotgoods[j].img}"></td>
                                    <td>${data.hotgoods[j].title}</td>
                                    <td>${nps}</td>
                                    <td><button class="btn-red">-</button><span>${this.obj[i].num}</span><button class="btn-add">+</button></td>
                                    <td>${xmoney}</td>
                                    <td><span class="shanchu" data-id="${this.obj[i].id}">X</span></td>
                                </tr>
                            
                            `

                        }

                    }
                }
            }
            
            $(".trbox").html(str);
        }else{
            this.emptybox.css("display","block");
        }
         

        this.choose=$(".choosegoods");
        this.red= $(".btn-red");
        this.add=$(".btn-add");
        this.del=$(".shanchu");
        
         
         this.clickEvent();
         this. zongjia();
    },

    clickEvent:function(){

            $(".successdl ").css("display","inline-block");
            $(".suc-name").text(localStorage['name']);
            $(".tuichu-dl").on("click",()=>{
            
                $(".successdl ").css("display","none");
                window.localStorage.removeItem("name");

            })

            $(".gohiderbox").remove();
            $(".myshoppingcar").removeClass("aflay");

            $(".myshoppingcar").on("click",()=>{
                    location.href="shoppingcar.html"
            })


        //全选
        for(var i=0;i<this.Allcheck.length;i++){
            this.Allcheck.eq(i).on("click",this.allgoodsevent.bind(this,this.Allcheck.eq(i)))
        }
        //单选
        for(var i=0;i<this.choose.length;i++){
            this.choose.eq(i).on("click",this.choosegoodsevent.bind(this,this.choose.eq(i)))
        }
        //减
       for(var i=0;i<this.red.length;i++){
            this.red.eq(i).on("click",this.redButton.bind(this,this.red.eq(i)))
       }
       //加
       for(var i=0;i<this.add.length;i++){
           this.add.eq(i).on("click",this.addButton.bind(this,this.add.eq(i)))
        }
        //删
        for(var i=0;i<this.del.length;i++){
            this.del.eq(i).on("click",this.delButton.bind(this,this.del.eq(i)))
        }





    
    },
    allgoodsevent:function(that){

        

        if(that.attr('aria-checked')=="false"){

           
            for(var i=0;i<this.Allcheck.length;i++){
                this.Allcheck.eq(i).attr("aria-checked","true");
                this.Allcheck.eq(i).addClass("click-color");
                
            }
            for(var i=0;i<this.choose.length;i++){
                this.choose.eq(i).attr("aria-checked","true");
                this.choose.eq(i).addClass("click-color");
            }
            
        }else if(that.attr('aria-checked')=="true"){
            for(var i=0;i<this.Allcheck.length;i++){
                this.Allcheck.eq(i).attr("aria-checked","false");
                this.Allcheck.eq(i).removeClass("click-color");
            }
            for(var i=0;i<this.choose.length;i++){
                this.choose.eq(i).attr("aria-checked","false");
                this.choose.eq(i).removeClass("click-color");
               
            }
            
        }
        this. zongjia();

    },
    choosegoodsevent:function(that){
        if(that.attr('aria-checked')=="false"){
            that.attr("aria-checked","true");
            that.addClass("click-color");
        }else if(that.attr('aria-checked')=="true"){
            that.attr("aria-checked","false");
            that.removeClass("click-color");
        }

        this.setallchicked();
       
        this. zongjia();
    },
    setallchicked:function(){
        for(var i=0;i<this.choose.length;i++){
            var n=true;
            if(this.choose.eq(i).attr("aria-checked")=="false"){
                n=false;
                break;
            }
        }
        if(n){
            for(var i=0;i<this.Allcheck.length;i++){
                this.Allcheck.eq(i).attr("aria-checked","true");
                this.Allcheck.eq(i).addClass("click-color");
                
            }
        }else{
            for(var i=0;i<this.Allcheck.length;i++){
                this.Allcheck.eq(i).attr("aria-checked","false");
                this.Allcheck.eq(i).removeClass("click-color");
            }
        }

    },
    redButton:function(that){
        var Num=Number(that.next().text());
        if(Num<=1){
            Num=1;  
        }else{
            Num--;
        }
        that.next().text(Num);
        var xiaoji=Number(that.parent().prev().text().slice(1))*Num;
       that.parent().next().text("￥"+xiaoji.toFixed(2));
       this. zongjia();

    },
    addButton:function(that){
        var Num=Number(that.prev().text());
       
            Num++;
        
        that.prev().text(Num);
        var xiaoji=Number(that.parent().prev().text().slice(1))*Num;
       that.parent().next().text("￥"+xiaoji.toFixed(2));
       this. zongjia();

    },
    delButton:function(that){

        that.parent().parent().remove();

        this.choose=$(".choosegoods");
        
        
            var ID=that.attr("data-id")

            for(var i=0;i<this.obj.length;i++){
                if(this.obj[i].id==ID){

                    this.obj.splice(i,1);

                }

            }
            console.log(this.obj);

            localStorage.goods=JSON.stringify(this.obj);
            this.obj = JSON.parse(localStorage["goods"]);
            if(this.obj.length <= 0){
                this.emptybox.css("display","block")
            }
            $(".mygoods").text("("+this.obj.length+")")
            $(".mygoods").css("color","red");

            console.log(localStorage.goods)

        this.setallchicked();
        this. zongjia();

    },
    //计算总价
    zongjia:function(){
    
        var allgo =this.choose.length;
        // console.log(this.choose);
        // console.log(allgo);
        var Ti= 0;

        var money=0;

        for(var i=0;i<allgo;i++){
            if(this.choose.eq(i).attr("aria-checked")=="true"){
                Ti++;

            money+=Number(this.choose.eq(i).parent().parent().children().eq(5).text().slice(1));
            
            }
        }
        $(".allvalue").text("￥"+money.toFixed(2));
        $(".choosed").text(Ti);
        $(".All-goods").text(allgo);



        // console.log(Ti)
        // console.log(money)
    }
}

new Goodscar();