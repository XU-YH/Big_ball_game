(function(a,b,c,d){var e=a(b);a.fn.lazyload=function(c){function i(){var b=0;f.each(function(){var c=a(this);if(h.skip_invisible&&!c.is(":visible"))return;if(!a.abovethetop(this,h)&&!a.leftofbegin(this,h))if(!a.belowthefold(this,h)&&!a.rightoffold(this,h))c.trigger("appear"),b=0;else if(++b>h.failure_limit)return!1})}var f=this,g,h={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return c&&(d!==c.failurelimit&&(c.failure_limit=c.failurelimit,delete c.failurelimit),d!==c.effectspeed&&(c.effect_speed=c.effectspeed,delete c.effectspeed),a.extend(h,c)),g=h.container===d||h.container===b?e:a(h.container),0===h.event.indexOf("scroll")&&g.bind(h.event,function(a){return i()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(h.appear){var d=f.length;h.appear.call(b,d,h)}a("<img />").bind("load",function(){c.hide().attr("src",c.data(h.data_attribute))[h.effect](h.effect_speed),b.loaded=!0;var d=a.grep(f,function(a){return!a.loaded});f=a(d);if(h.load){var e=f.length;h.load.call(b,e,h)}}).attr("src",c.data(h.data_attribute))}}),0!==h.event.indexOf("scroll")&&c.bind(h.event,function(a){b.loaded||c.trigger("appear")})}),e.bind("resize",function(a){i()}),/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent.persisted&&f.each(function(){a(this).trigger("appear")})}),a(b).load(function(){i()}),this},a.belowthefold=function(c,f){var g;return f.container===d||f.container===b?g=e.height()+e.scrollTop():g=a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return f.container===d||f.container===b?g=e.width()+e.scrollLeft():g=a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return f.container===d||f.container===b?g=e.scrollTop():g=a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return f.container===d||f.container===b?g=e.scrollLeft():g=a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!a.rightoffold(b,c)&&!a.leftofbegin(b,c)&&!a.belowthefold(b,c)&&!a.abovethetop(b,c)},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})})(jQuery,window,document);
// JavaScript Document
(function($){
	//图片切换后载
	$.fn.lazyLoadImg = function(setting){
		var defaults = {
			lazySrc:'data-original',	//存放实际图片的地址，用法：<img src="空白小图片的地址" imgsrc="实际图片地址" />
			blank:'http://www.18183.com/images/blank.gif'	//透明小图片的默认地址
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(i){
			if(!$(this).attr(setting.lazySrc)){
				return;
			}
			if($(this).attr("src")=='' || $(this).attr("src")==setting.blank){
				$(this).attr("src",$(this).attr(setting.lazySrc));
			}
		});
	}
	//切换
	$.fn.tab = function(setting){
		var defaults = {
			menu : '.tab_menu',	//标签菜单
			menuList : 'li',	//菜单单元块
			current : 'select',//被选中的标签菜单块的样式名
			con : '.tab_main',	//被切换的容器名
			eq : 1,				//默认显示第几个标签页内容
			//timer : '3000',	//自动轮播间隔
			//isAuto : false	//是否自动轮播，默认关闭
			blank:'http://www.18183.com/images/blank.gif', //默认空白图片地址
			mouseType : 'click' //默认鼠标控制标签方式有'click'和'mouseover'
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(k){
			var $box = $(this);
			var $menu = $box.find(setting.menu+':first');
			var $con = $box.find(setting.con);
			var $li = $menu.find(setting.menuList);
			var index = setting.eq-1;
			$li.removeClass(setting.current).eq(index).addClass(setting.current);
			$con.hide().eq(index).show();
			$li.each(function(i,j){
				$(j).bind(setting.mouseType,function(){
					$li.removeClass(setting.current).eq(i).addClass(setting.current);
					$con.hide().eq(i).show();
					$con.eq(i).find("img").lazyLoadImg({blank:setting.blank});
				});
			});
			//自动轮播功能add code here
		});
	};
	/*单元格内容滚动*/
	$.fn.stepScroll = function(setting){
		//参数设置
		var defaults = {
			aniTime:500,				//动画时间，单位：毫秒
			autoPlay:true,				//是否自动轮播
			btn_left:'.rightscroll',	//左滚动按钮
			btn_right:'.leftscroll',	//右滚动按钮
			//easingType:'easeOutExpo',	//动画效果,推荐easeInOutExpo,easeOutBounce,easeInOutBack
			scrollTime:3000				//轮播时间，单位：毫秒
		}
		setting = $.extend({},defaults,setting);
		//功能描述：实现X轴轮播，宽度为单位个内容
		return this.each(function(k){
			//初始化
			var $scroll = $(this);
			var $ulfir=$scroll.find("ul:first")
			var flag = 'close';
			var $ul = $(this).find('ul').eq(0);
			var $liFirst = $(this).find('li').eq(0);
			var length = $ul.find('li').length;
			//动画宽度
			var $step = $liFirst.outerWidth(true);		//outerWidth(),加参数true的时候才会计算边距在内。默认参数为false,默认包括补白和边框
			if(length*$step < $scroll.width()) return;
			$margin = $ul.find('li:last').outerWidth(true);
			$ul.css('margin-left','-'+$margin+'px');	//左缩进最后一个li的宽度，让滚动连贯
			$ul.find('li:last').prependTo($ulfir);	//将最后一个li加到前面来，使得内容能正确从第一个开始
			//X轴左轮播
			var xScroll = function(){
				$ul.stop().animate(
					{left:"-"+$step+"px"},setting.aniTime,function(){
						$(this).css({left:"0px"}).find('li:first').appendTo(this);
					}
				);
			}
			//X轴右轮播
			var xRScroll = function(){
				$ul.stop().animate(
					//{left:$step+"px"},setting.aniTime,setting.easingType,function(){
					{left:$step+"px"},setting.aniTime,function(){
						$(this).css({left:'0px'}).find('li:last').prependTo(this);
					}
				);
			}
			var time;
			//自动轮播
			var autoScroll = function(){
				if(flag == 'open'){
					xScroll();
				}
				else{
					flag = 'open';
				}
				time = setTimeout(autoScroll,setting.scrollTime);
			}
			if(setting.autoPlay){
				//鼠标滑入停止轮播，滑出恢复轮播
				$scroll.hover(function(){
					clearTimeout(time);
				},function(){
					flag='close';
					autoScroll();
				});
				//执行一次轮播函数
				autoScroll();
			}
			//左进
			$scroll.find(setting.btn_left).click(function(){
				xScroll();
				return false;
			});
			//右进
			$scroll.find(setting.btn_right).click(function(){
				xRScroll();
				return false;
			});
		});
	};
	//拉窗展示
	$.fn.lcFreq=function(){
		return this.each(function(k){
			var $box=$(this);
			var $ul=$box.find("ul");
			var $li=$ul.find("li");
			var o,l;
			var kShow=function(o){
				$(o).find(".zs").show();
				$(o).find(".btn").show();
			};
			var kHide=function(l){
				$(l).find(".zs").hide();
				$(l).find(".btn").hide();
			};
			$li.each(function(i, e){
				$(e).hover(function(){
					switch(i){
						case 0:
							$(this).find(".cov").stop(true,true).animate({right:0},function(){kShow(e)});
						 	break;
						case 1:
							$(this).find(".cov").stop(true,true).animate({width:"286px"},function(){kShow(e)});
						  	break;
						case 2:
							$(this).find(".cov").stop(true,true).animate({width:"380px"},function(){kShow(e)});
						  	break;	
						case 3:
							$(this).find(".cov").stop(true,true).animate({right:0},function(){kShow(e)});
						 	break;
						default:
					}
				},function(){
					switch(i){
						case 0:
							$(this).find(".cov").stop(true,true).animate({right:"-188px"},kHide(e));
						 	break;
						case 1:
							$(this).find(".cov").stop(true,true).animate({width:"124px"},kHide(e));
						  	break;
						case 2:
							$(this).find(".cov").stop(true,true).animate({width:"192px"},kHide(e));
						  	break;
						case 3:
							$(this).find(".cov").stop(true,true).animate({right:"-162px"},kHide(e));
						 	break;
						default:
					}
				});
            	
            });
		});
	};
	//通用右列
	$.fn.reList = function(setting){
		var defaults = {
			box_it : '.m_dom',	//容器
			btn_k : '.dj_upd'	//按钮
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(k){
			var $box = $(this);
			var $item = $box.find(setting.box_it);
			var $btn = $box.find(setting.btn_k);
			//$item.eq(0).siblings(setting.box_it).height(0);
			$item.each(function(i, e) {
				$btn.eq(i).click(function(){
					var h=$(e).find(".con").outerHeight();
					var ih=$(e).outerHeight();
					if(ih!=0){
						$item.eq(i).stop(true,true).animate({height:0},150);
						$(this).addClass("backp");		
					}else{
						$item.eq(i).stop(true,true).animate({height:h},150);
						$(this).removeClass("backp");
					};
				});
            });
		});
	};
	//2.返回顶部
	$.fn.alBackToTop=function(){
		//显示的文字
		var $al18183_BackText = "返回顶部";	
		var $al18183_BackBox = $('<div class="al_backTop"><a></a></div>').appendTo($("body"));
			//title属性设置成该文字
		$(".al_backTop a").text($al18183_BackText).attr("title", $al18183_BackText).click(function(){
				$("html, body").animate({ scrollTop: 0 }, 120);
		});
		var $al18183_BackFunc = function() {
			//获取滚动条高度和浏览器宽度
			var st = $(document).scrollTop(), winh = $(window).height();
			(st > 0)? $al18183_BackBox.show(): $al18183_BackBox.hide();	
			//IE6下的定位
			if (!window.XMLHttpRequest) {
				$al18183_BackBox.css("top", st + winh - 166);	
			}
		};
		//为滚动事件绑定函数
		$(window).bind("scroll", $al18183_BackFunc);
		$al18183_BackFunc();
	};
	//添加到收藏
	$.fn.addFavorite=function(t,i){
		var $th=$(this);
		$th.click(function(){
			if(i==''&&t==''){
				var Title = document.title;
				var url =window.location.href;
			}else{
				var Title = t;
				var url =i;
			};
			try {    
 				window.external.addFavorite(url, Title);  
 			}catch(e){    
	 			try {     
	 				window.sidebar.addPanel(Title, url, "");   
	 			}catch (e){
		 			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请进入新网站后使用Ctrl+D进行添加");    
		 		}  
			};
		});
	};
})(jQuery);
