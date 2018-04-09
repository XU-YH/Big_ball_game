/* JS Document
 Version:	1.0
 Date:		2014/07/03
 Author:    Nixx
 Update:    2014/11/05
 con:       index
 Based on： jQuery
 */
var ad_18183_def = hanawa = {
    Id: 'index_id_' + Math.random().toString().replace('.', '_'),
    IE:10,
    trim: function(s){
        return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    ns:{},
    time: {top:0, rip: 10000, bg: 5000,topSlide:5500},
    timer: new Array(),
    //获得cookie
    getcookie: function(name){
        var CookieFound = false;
        var start = 0;
        var end = 0;
        var CookieString = document.cookie;
        var i = 0;
        while(i <= CookieString.length){
            start = i;
            end = start + name.length;
            if (CookieString.substring(start, end) == name){
                CookieFound = true;
                break;
            }
            i++;
        }
        if(CookieFound){
            start = end + 1;
            end = CookieString.indexOf(";",start);
            if (end < start)end = CookieString.length;
            var getvalue = CookieString.substring(start, end);
            return unescape(getvalue);
        }
        return "";
    },
    //设置cookie
    setcookie: function(name,value,stime,domain){
        try{
            domain = domain==null ? top.location.hostname : domain;
        }catch(e){
            domain = domain==null ? location.hostname : domain;
        }
        stime = stime==null ? (3 * 60 * 60 * 1000) : stime;
        var extime= new Date();
        extime.setTime(extime.getTime() + stime);
        value = escape(value);
        var nameString = name + "=" + value;
        var expiryString = ";expires="+ extime.toGMTString();
        var domainString = ";domain="+domain;
        var pathString = ";path=/";
        var setvalue = nameString + expiryString + domainString + pathString;
        document.cookie = setvalue;
    },
    //移除广告对象
    remove: function(name, func){
        if(this.timer[name])clearInterval(this.timer[name]);
        jQuery(name + '_' + this.Id).remove();
        if(typeof(func)=='function')func();
    },
    //添加关闭
    createAdClose: function(o, name, func, type){
        var self = this;
        var img_c = document.createElement('img');
        img_c.title = '关闭';
        img_c.src = 'http://www.18183.com/templets/index2014/images/bg_close.png';
        with(img_c.style){
            position = 'absolute';
            zIndex = 100000;
            width='30px';
            height='30px';
            top=0;
            float='right';
            cursor='pointer';
        }
        if(type=="left"){img_c.style.left=0;}else{img_c.style.right=0;}
        img_c.onclick = function(){self.remove(name, func);return false;};
        jQuery(o).append(img_c);
        return jQuery(o);
    },
    //改造ADdiv
    makeAdDiv: function(name, w, h){
        o=jQuery("#"+name);
        if(o.size()>0){
            o.attr("id",name + '_' + this.Id);
            o.css({width:w,height:h});
        }
        return o;
    },
    //添加广告
    //前弹位置
    top_ad_float: function(o){
        var t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var w = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        var h = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        jQuery(o).css({ left: ((w - 700) / 2) + 'px' });
        if(this.IE > 6)
            jQuery(o).css({ top: ((h - 300) / 2) + 'px' });
        else
            jQuery(o).css({ top: (t + (h - 300) / 2) + 'px' });
        var s1=(this.IE > 6) ? 'fixed' : 'absolute';
        jQuery(o).css({position : s1,display :"block"});
    },
    //前弹实现
    top_ad: function(){
        var self = this;
        //console.log(jQuery('#top_ad').find("iframe").size());
        if(jQuery('#top_ad').find("iframe").size()>0 ){
            var topAd = self.makeAdDiv('top_ad',700, 300);
            if(window.addEventListener){
                window.addEventListener('scroll', function(){self.top_ad_float(topAd);}, false);
                window.addEventListener('resize', function(){self.top_ad_float(topAd);}, false);
            }else{
                window.attachEvent('onscroll', function(){self.top_ad_float(topAd);});
                window.attachEvent('onresize', function(){self.top_ad_float(topAd);});
            }
            self.top_ad_float(topAd);
            self.createAdClose(topAd, '#top_ad', function(){});
            if(self.time.top==0){}
            else{self.timer['#top_ad'] = setTimeout(function(){self.remove('#top_ad', function(){});}, self.time.top);}
        }else{
            //self.rip_ad();
        }
    },
    rip_ad_float: function(o){
        var t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var w = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        var h = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        jQuery(o).css({ right: 0 });
        if(this.IE > 6)
            jQuery(o).css({ bottom : '60px'});
        else
            jQuery(o).css({ top: (t + (h - 200)) + 'px' });
        var s1=(this.IE > 6) ? 'fixed' : 'absolute';
        jQuery(o).css({position : s1,display :"block"});
    },
    rip_ad:function(){
        var self = this;
        //console.log(jQuery('#rip_ad').find("iframe").size());
        if(jQuery('#rip_ad').find("iframe").size()>0 ){
            jQuery('.la_recommend').hide();
            var ripAd = self.makeAdDiv('rip_ad',270, 200);
            if(window.addEventListener){
                window.addEventListener('scroll', function(){self.rip_ad_float(ripAd);}, false);
                window.addEventListener('resize', function(){self.rip_ad_float(ripAd);}, false);
            }else{
                window.attachEvent('onscroll', function(){self.rip_ad_float(ripAd);});
                window.attachEvent('onresize', function(){self.rip_ad_float(ripAd);});
            }
            self.rip_ad_float(ripAd);
            self.createAdClose(ripAd, '#rip_ad',function(){self.top_ad();});
            if(self.time.top==0){self.top_ad();}
            else{self.timer['#rip_ad'] = setTimeout(function(){self.remove('#rip_ad', function(){self.top_ad();})}, self.time.rip);}
        }else{
            self.top_ad();
        }
    },
    bigbanner_ad:function(){
        var self = this;
        if(jQuery('#bigbannerad').size()>0 ){
        	topSlide_ad('bigbannerad',5);
		self.timer['#rip_ad'] = setTimeout(function(){self.rip_ad();},self.time.topSlide);
        }else{
            self.rip_ad();
        }
    },
    //广告设置
    lft_ad_float: function(site){
        var w = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        var guod=jQuery(".warpper").eq(0).width();
        var m = (w-(w-guod)/2)+5;
        if(site=="18183index"){m = (w-(w-1000)/2)+4};
	jQuery("#right_ad").css({"left":m+"px","width":"auto","right":"0","margin-right":"0"});
        if(w>1000){
            jQuery("#left_ad").show();
            jQuery("#right_ad").show();
        }else{
            jQuery("#left_ad").hide();
            jQuery("#right_ad").hide();
        }
    },
    banner_ad: function(site){
        var self = this;
        //背投
        //头部
        if(jQuery("#header_ad").find("iframe").size()>0){
            var headerAd = self.makeAdDiv('header_ad',1000,75);
            //self.createAdClose(headerAd,'#header_ad',function(){jQuery("#left_ad").remove();jQuery("#right_ad").remove();});
        }
        //两边
        /*
         if(jQuery("#left_ad").find("iframe").size()>0){
         var leftAd = self.makeAdDiv('left_ad',460,1024);
         self.createAdClose(leftAd,'#left_ad',function(){});
         }
         */
        if(window.addEventListener){
            window.addEventListener('scroll', function(){self.lft_ad_float(site);}, false);
            window.addEventListener('resize', function(){self.lft_ad_float(site);}, false);
        }else{
            window.attachEvent('onscroll', function(){self.lft_ad_float(site);});
            window.attachEvent('onresize', function(){self.lft_ad_float(site);});
        }
        self.lft_ad_float(site);
    },
    //广告初始化
    init : function(site){
        var self = this;
        if(navigator.appName == "Microsoft Internet Explorer"){
            var userAgent = navigator.userAgent;
            var s = 'MSIE';
            self.IE = parseFloat(userAgent.substr(userAgent.indexOf(s) + s.length));
        }
        var self = this;
        self.banner_ad(site);
        var n = self.getcookie('star_'+site+'_ad').toString();
        n = n=='' ? '0' : n;
        n = parseInt(n);
        self.setcookie('star_'+site+'_ad', (n + 1).toString(), (6 * 60 * 60 * 1000), '18183.com');
        if(n<=0){
            self.bigbanner_ad();
        }else{

        }
    }
}
//hanawa.init("index");