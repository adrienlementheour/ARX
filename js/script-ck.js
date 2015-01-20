// version du navigateur
function createDragCaseStudies(){if($(".slides-case-studies").length>0){$("html").hasClass("lt-ie9")?Draggable.create(".slides-case-studies",{type:"x",edgeResistance:.6,bounds:parent}):Draggable.create(".slides-case-studies",{type:"x",edgeResistance:.6,bounds:parent,throwProps:!0});$(window).resize(function(){largeurFenetre<767&&createDragCaseStudies()});$(window).scroll(function(){var e=$(document).scrollTop();e>=600&&TweenLite.to($(".details-img li img").eq(0),.8,{top:0,left:0,opacity:1,ease:Quart.easeOut,delay:0});e>=700&&TweenLite.to($(".details-img li img").eq(1),.6,{top:0,left:0,opacity:1,ease:Quart.easeOut,delay:.2});e>=800&&TweenLite.to($(".details-img li img").eq(2),.4,{top:0,left:0,opacity:1,ease:Quart.easeOut,delay:.4})})}}function createDragHome(){if($("#slides-references").length>0){$("html").hasClass("lt-ie9")?Draggable.create("#slides-references",{bounds:parent,edgeResistance:.6,type:"x",onDrag:function(){TweenLite.killTweensOf($("#slides-references"))}}):Draggable.create("#slides-references",{bounds:parent,edgeResistance:.6,type:"x",throwProps:!0,onDrag:function(){TweenLite.killTweensOf($("#slides-references"))}});$(window).resize(function(){largeurFenetre<767&&createDragHome()})}}function isReady(e){e.addClass("ready")}function scrollAPropos(){$("#valeurs").length>0&&$(window).scroll(function(){var e=$(document).scrollTop();if(e>=200){isReady($("#valeur-1 span.icon"));setTimeout(function(){isReady($("#valeur-2 span.icon"))},100)}if(e>=400){setTimeout(function(){isReady($("#valeur-3 span.icon"))},400);setTimeout(function(){isReady($("#valeur-4 span.icon"))},600)}})}function zoomMarker(){currentZoom<20?currentZoom++:currentZoom--;map.setZoom(currentZoom)}function initialize(){var e=new Array({elementType:"geometry",stylers:[{gamma:.68},{saturation:-51},{lightness:-12},{visibility:"on"},{hue:"#00ffee"}]}),t={center:new google.maps.LatLng(48.7995,2.1264),zoom:currentZoom,styles:e,mapTypeControl:!1};map=new google.maps.Map(document.getElementById("gMap"),t);google.maps.event.addListener(map,"zoom_changed",function(){currentZoom=map.zoom});var n="layoutImg/gMapPin.png",r=new google.maps.Marker({position:map.getCenter(),map:map,animation:google.maps.Animation.DROP,icon:n});google.maps.event.addListener(r,"click",zoomMarker)}function setHome(){TweenLite.from($(".bloc-txt .titre"),.4,{marginTop:20,opacity:0,delay:3,ease:Quart.easeInOut});TweenLite.from($(".bloc-txt .text-intro"),.6,{marginTop:40,opacity:0,delay:4.2,ease:Quart.easeInOut});TweenLite.from($(".bloc-txt .button"),.4,{marginTop:60,opacity:0,delay:4.6,ease:Quart.easeInOut});$(".bloc-txt").css("opacity",1)}function transiHome(){contactOn&&transiContact();TweenLite.to($(".bloc-txt"),.4,{marginTop:0,opacity:0,ease:Quart.easeInOut});TweenLite.to($(".anim-intro"),.2,{opacity:0,ease:Quart.easeInOut});$(".diapo").css("display","block");TweenLite.to($(".diapo"),.5,{marginTop:0,opacity:1,delay:.1,ease:Quart.easeInOut});$("#refLink").addClass("active");clearTimeout(refActiveTime);refActiveTime=setTimeout(renderRefActive,200);if(isFirst){isFirst=!1;TweenLite.to($("#slides-references"),2,{x:0,ease:Quart.easeInOut,delay:.5});TweenLite.to($(".container-sliders"),1,{top:"13%",opacity:1,ease:Quart.easeInOut,delay:.1,onComplete:createDragHome})}}function closeContact(){TweenLite.to($("#main"),.2,{top:0,ease:Quart.easeInOut,delay:.2});TweenLite.to($(".diapo"),.2,{top:90,ease:Quart.easeInOut,delay:.2});TweenLite.to($("#header"),.3,{top:0,ease:Quart.easeInOut,delay:.1});TweenLite.to($("#footer"),.4,{top:-350,ease:Quart.easeInOut,onComplete:function(){$("#footer").css({top:""})}});contactOn=!1;TweenLite.to($("#mask"),.4,{opacity:0,ease:Quart.easeInOut,onComplete:function(){$("#mask").css({display:"none",opacity:0})}})}function transiContact(){if($(window).width()>=767)if(!contactOn){TweenLite.to($("#main"),.4,{top:350,ease:Quart.easeInOut});TweenLite.to($(".diapo"),.4,{top:440,ease:Quart.easeInOut});TweenLite.to($("#header"),.3,{top:350,ease:Quart.easeInOut,delay:.1});TweenLite.to($("#footer"),.2,{top:0,ease:Quart.easeInOut,delay:.2});contactOn=!0;$("#mask").css({display:"block",opacity:0});TweenLite.to($("#mask"),.4,{opacity:.8,ease:Quart.easeInOut})}else closeContact();else closeContact()}function goBackHome(){contactOn&&transiContact();clearTimeout(refActiveTime);refActiveTime=setTimeout(renderRefInactive,400);$("#refLink span").css({opacity:0,"margin-top":"25px"});TweenLite.to($(".bloc-txt"),.4,{marginTop:200,opacity:1,ease:Quart.easeInOut,delay:.1});TweenLite.to($(".anim-intro"),.2,{opacity:1,ease:Quart.easeInOut,delay:.2});TweenLite.to($(".diapo"),.5,{marginTop:500,opacity:0,ease:Quart.easeInOut,onComplete:function(){$(".diapo").css("display","none")}})}function renderRefActive(){clearTimeout(refActiveTime);$("#refLink span").css({opacity:1,"margin-top":"-10px"})}function renderRefInactive(){clearTimeout(refActiveTime);$(".menu li").removeClass("active")}function positionBlocIntro(){topBlocIntro=parseInt($(".intro").css("top"),10);topBlocIntro+=parseInt($(".intro").css("margin-top"),10);blocIntroHeight=$(".intro").outerHeight();offsetBlocIntro=$("#header").outerHeight();mainHeight=$("#main").height();if(topBlocIntro<0)$(".intro").css("top","49px");else{palier=Math.round(topBlocIntro/49);palier==0?$(".intro").css("top","49px"):$(".intro").css("top",palier*49+"px")}$(".intro").css("margin-top",0)}function margeDesc(){if(!$("html").hasClass("lt-ie9")){largeurFenetre=$(window).width();margeSlidesDesc=largeurFenetre/15.5;$("ul.slides-desc-references").css("margin-left",-margeSlidesDesc+"px")}}function tailleMasqueDesc(){largeurFenetre=$(window).width();$(".masque-desc").css("width",largeurFenetre+"px");$(".masque-desc").css("left",-(largeurFenetre/10)+"px")}function animer(){requestAnimFrame(function(){if($("html").hasClass("csstransforms")&&$("#slides-references").length>0){if(typeof $("#slides-references").css("-webkit-transform")!="undefined"){matrix=matrixToArray($("#slides-references").css("-webkit-transform"));var e=parseFloat(matrix[4])}else if(typeof $("#slides-references").css("-ms-transform")!="undefined"){matrix=matrixToArray($("#slides-references").css("-ms-transform"));var e=parseFloat(matrix[4])}else if(typeof $("#slides-references").css("-o-transform")!="undefined"){matrix=matrixToArray($("#slides-references").css("-o-transform"));var e=parseFloat(matrix[4])}else if(typeof $("#slides-references").css("-moz-transform")!="undefined"){matrix=matrixToArray($("#slides-references").css("-moz-transform"));var e=parseFloat(matrix[4])}else{matrix=matrixToArray($("#slides-references").css("-transform"));var e=parseFloat(matrix[4])}$("ul.slides-desc-references").css({left:e+e/4+"px"})}else if($("html").hasClass("lt-ie9")){var t=$("#slides-references").css("margin-left");t=parseInt(t,10);$("ul.slides-desc-references").css("margin-left",t+"px")}largeurFenetre=$(window).width();if(largeurFenetre<767){$("li.slide-reference").css("margin-right","");$("li.slide-reference").css("margin-left","");$("#main").css("top","");$(".diapo").css({top:90});$("#header").css("top","");$("#footer").css("top","");$(".slides-desc-references li").eq(0).css("margin-left","40px");contactOn=!1;$("#mask").css({display:"none",opacity:0});$("#contactLink").css("display","none")}else if($("html").hasClass("lt-ie8"))$("#contactLink").css("display","inline");else{$("#contactLink").css("display","inline-block");$("#slides-references li").eq(0).css("margin-left","400px");$(".slides-desc-references li").eq(0).css("margin-left","550px")}positionBlocIntro();margeDesc();tailleMasqueDesc();animer()})}function matrixToArray(e){return e.substr(7,e.length-8).split(", ")}var userAgent="",version=-1,myTween,myTween2,arrayAnimPicto=new Array,ItemEncours=null,isScrolling=!1,isFirst=!0,refActiveTime,contactOn=!1,currentZoom=17,map,blocIntroHeight,topBlocIntro,offsetBlocIntro,mainHeight,palier,largeurFenetre,margeSlidesDesc;$(document).ready(function(){Date.now||(Date.now=function(){return(new Date).valueOf()});$("<img/>").attr("src",'layoutImg/cube-1.gif?_=" + Date.now()+"').load(function(){$(this).remove();$(".anim-intro").css("background-image","url('layoutImg/cube-1.gif?_="+Date.now()+"')");setHome()});if(!$("html").hasClass("lt-ie9"))var e=responsiveNav(".nav-collapse",{animate:!0,transition:400,label:"",insert:"before"});positionBlocIntro();animer();margeDesc();tailleMasqueDesc();var t=-Math.ceil($("#slides-references li").length*600);TweenLite.to($("#slides-references"),0,{x:t});$("#close-contact").click(function(){transiContact();return!1});$("#contactLink").click(function(){$(window).width()>=767&&transiContact();return!1});$(".logo-sh").click(function(){goBackHome();return!1});$("#refLink").click(function(){transiHome();e.toggle();return!1});$(".bloc-txt .button").click(function(){transiHome();return!1});$("#mask").click(function(){transiContact();return!1});$(".to-steps").click(function(){TweenLite.to(window,1,{scrollTo:{y:$(".case-studies-steps").offset().top}});return!1});google.maps.event.addDomListener(window,"load",initialize);if(!$("html").hasClass("lt-ie8")){createDragCaseStudies();$("ul.slides-case-studies").length>0&&TweenLite.to($("ul.slides-case-studies"),0,{x:-750})}scrollAPropos()});window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,100)}}();