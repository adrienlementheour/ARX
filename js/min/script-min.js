function nextVideo(e){if($("ul#slider-videos li").length>=2){var i=parseInt($("ul#slider-videos li#current-video .iframe-video").attr("id").match(pattern));if(players[i].stopVideo(),"right"==e){$("ul#slider-videos li .iframe-video#player-"+(i+1)).length?$("ul#slider-videos li .iframe-video#player-"+(i+1)).closest("li").attr("id","next-video"):$("ul#slider-videos li .iframe-video#player-1").closest("li").attr("id","next-video"),TweenMax.set($("ul#slider-videos li#next-video"),{display:"block",x:"100%"}),TweenMax.set($("ul#slider-videos li#current-video a.video-cover"),{display:"block"});var t=$("ul#slider-videos li#next-video a.video-cover img.img-video-cover").attr("src");$("img#next-img-bg-video-cover").attr("src",t),TweenMax.set($("img#next-img-bg-video-cover"),{display:"block",x:"100%"}),TweenMax.to($("ul#slider-videos li#current-video"),.5,{x:"-100%",ease:Cubic.easeInOut}),TweenMax.to($("ul#slider-videos li#next-video"),.5,{x:"0%",ease:Cubic.easeInOut}),TweenMax.to($("#img-bg-video-cover"),.5,{x:"-100%",ease:Cubic.easeInOut}),TweenMax.to($("#next-img-bg-video-cover"),.5,{x:"0%",ease:Cubic.easeInOut})}else if("left"==e){$("ul#slider-videos li .iframe-video#player-"+(i-1)).length?$("ul#slider-videos li .iframe-video#player-"+(i-1)).closest("li").attr("id","next-video"):$("ul#slider-videos li .iframe-video#player-"+$("ul#slider-videos li").length).closest("li").attr("id","next-video"),TweenMax.set($("ul#slider-videos li#next-video"),{display:"block",x:"-100%"}),TweenMax.set($("ul#slider-videos li#current-video a.video-cover"),{display:"block"});var t=$("ul#slider-videos li#next-video a.video-cover img.img-video-cover").attr("src");$("img#next-img-bg-video-cover").attr("src",t),TweenMax.set($("img#next-img-bg-video-cover"),{display:"block",x:"-100%"}),TweenMax.to($("ul#slider-videos li#current-video"),.5,{x:"100%",ease:Cubic.easeInOut}),TweenMax.to($("ul#slider-videos li#next-video"),.5,{x:"0%",ease:Cubic.easeInOut}),TweenMax.to($("#img-bg-video-cover"),.5,{x:"100%",ease:Cubic.easeInOut}),TweenMax.to($("#next-img-bg-video-cover"),.5,{x:"0%",ease:Cubic.easeInOut})}$("ul#slider-videos li#current-video").attr("id",""),$("ul#slider-videos li#next-video").attr("id","current-video"),$("#img-bg-video-cover").attr("id","aze"),$("#next-img-bg-video-cover").attr("id","img-bg-video-cover"),$("#aze").attr("id","next-img-bg-video-cover")}}function posiImgsReferences(){$("ul#liste-references li img").each(function(){$(this).height()>=$(this).width()?(TweenMax.set($(this),{width:"100%",height:"auto"}),$(this).height()<$(this).parent().height()&&TweenMax.set($(this),{width:"auto",height:"100%"})):(TweenMax.set($(this),{width:"auto",height:"100%"}),$(this).width()<$(this).parent().width()&&TweenMax.set($(this),{width:"100%",height:"auto"}))})}function animRefs(e,i){$("ul#liste-references li#references-bloc-vertical .container-next-img-references img").attr("src","img/references/ref-"+e+"/img-references-bloc-vertical.jpg"),$("ul#liste-references li#references-bloc-big .container-next-img-references img").attr("src","img/references/ref-"+e+"/img-references-bloc-big.jpg"),$("ul#liste-references li#references-bloc-horizontal-top .container-next-img-references img").attr("src","img/references/ref-"+e+"/img-references-bloc-horizontal-top.jpg"),$("ul#liste-references li#references-bloc-horizontal-bottom .container-next-img-references img").attr("src","img/references/ref-"+e+"/img-references-bloc-horizontal-bottom.jpg"),"right"==i?(TweenMax.set($(".container-next-img-references"),{x:"-100%"}),TweenMax.staggerTo(".container-img-references",.5,{x:"100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(".container-next-img-references",.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiRefs,[e])):"left"==i&&(TweenMax.set($(".container-next-img-references"),{x:"100%"}),TweenMax.staggerTo(".container-img-references",.5,{x:"-100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(".container-next-img-references",.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiRefs,[e]))}function completeTransiRefs(e){$(".container-img-references").toggleClass("container-img-references container-next"),$(".container-next-img-references").toggleClass("container-next-img-references container-img-references"),$(".container-next").toggleClass("container-next container-next-img-references"),currentRef=e}function onYouTubeIframeAPIReady(){for(var e=$("ul#slider-videos li").length,i=1;e>=i;i++)players[i]=new YT.Player("player-"+i)}function blocDrapeauxInit(){heightBlocDrapeaux=$("#bloc-pays").height(),TweenMax.set($("#bloc-pays"),{height:"0px"})}function transiInButton(e){var i=new TimelineMax;i.to(e,.3,{opacity:"1",scaleY:1,ease:Circ.easeInOut}),i.to(e,1,{y:"0px",ease:Circ.easeInOut},0),i.to($(".txt-btn",e),.2,{opacity:"1",y:"0px",ease:Circ.easeInOut}),i.to($(".triangle-btn",e),.2,{opacity:"1",x:"0px",y:"0px",ease:Circ.easeInOut,clearProps:"all"})}function initBtnAnim(){TweenMax.set($(".btn-anim"),{opacity:"0",scaleY:0,y:"180px"}),TweenMax.set($(".btn-anim .txt-btn"),{opacity:"0",y:"-20px"}),TweenMax.set($(".btn-anim .triangle-btn"),{opacity:"0",x:"-10px",y:"-10px"})}function initHeaderHome(){TweenMax.set($("h1"),{opacity:"0",y:"40px"}),TweenMax.set($("#machine"),{opacity:"0",y:"40px"}),TweenMax.set([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(2):before"),CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(3):before")],{cssRule:{opacity:"0",y:"180px"}}),TweenMax.set([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(5):before"),CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(6):before")],{cssRule:{opacity:"0",y:"180px"}})}function animHeaderHome(){TweenMax.to($("h1"),.3,{opacity:"1",y:"0px",ease:Circ.easeInOut}),TweenMax.to($("#machine"),.5,{opacity:"1",y:"0px",ease:Circ.easeInOut,delay:.3,onComplete:completeAnimMachine}),TweenMax.to([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(2):before"),CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(3):before")],1.2,{cssRule:{opacity:"1",y:"0px"},ease:Circ.easeInOut,delay:3.1}),TweenMax.to([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(5):before"),CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(6):before")],1.2,{cssRule:{opacity:"1",y:"0px"},ease:Circ.easeInOut,delay:5.1})}function completeAnimMachine(){setTimeout(function(){transiInButton($("a#btn-robots-rowa")),setTimeout(function(){transiInButton($("a#btn-contact"))},2e3)},2e3)}function onCompleteVideoCover(){TweenMax.to($("li#current-video .video-txt .video-play"),.2,{display:"inline-block",opacity:"1",ease:Cubic.easeInOut}),TweenMax.to($("li#current-video .cadre-video-cover"),.2,{width:"215px",height:"85px",ease:Cubic.easeInOut})}function onCompleteVideoCover2(){TweenMax.to($("li#current-video .video-txt .video-title"),.2,{display:"inline-block",opacity:"1",ease:Cubic.easeInOut}),TweenMax.to($("li#current-video .cadre-video-cover"),.2,{width:$("li#current-video .video-txt").outerWidth()+"px",height:$("li#current-video .video-txt .video-title").outerHeight()+50+"px",ease:Cubic.easeInOut})}var nbRefs=3,pattern=/[0-9]+/g,currentRef=1,nextRef,heightBlocDrapeaux,tag=document.createElement("script");tag.src="//www.youtube.com/player_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var players=[];$("ul#liste-references li img").load(function(){posiImgsReferences()}),$(document).ready(function(){$("body").hasClass("home")&&(initHeaderHome(),setTimeout(function(){animHeaderHome()},1e3)),initBtnAnim(),TweenMax.set($("ul#slider-videos li#current-video"),{display:"block",x:"0"}),TweenMax.set($("#img-bg-video-cover"),{x:"0%",y:"-50%"}),TweenMax.set($("#next-img-bg-video-cover"),{x:"100%",y:"-50%"}),$("ul#slider-videos li a.video-cover").click(function(){if("current-video"==$(this).closest("li").attr("id")){TweenMax.set($(this),{display:"none"});var e=parseInt($("ul#slider-videos li#current-video .iframe-video").attr("id").match(pattern));players[e].playVideo()}return!1}),$("a#btn-right-video").click(function(){return TweenMax.isTweening($("ul#slider-videos li#current-video"))||TweenMax.isTweening($("ul#slider-videos li#next-video"))||TweenMax.isTweening($("#img-bg-video-cover"))||TweenMax.isTweening($("#next-img-bg-video-cover"))||nextVideo("right"),!1}),$("a#btn-left-video").click(function(){return TweenMax.isTweening($("ul#slider-videos li#current-video"))||TweenMax.isTweening($("ul#slider-videos li#next-video"))||TweenMax.isTweening($("#img-bg-video-cover"))||TweenMax.isTweening($("#next-img-bg-video-cover"))||nextVideo("left"),!1}),$("a#btn-right-references").click(function(){return TweenMax.isTweening($(".container-img-references"))||TweenMax.isTweening($(".container-next-img-references"))||(nbRefs>=currentRef+1?(nextRef=currentRef+1,animRefs(nextRef,"right")):(nextRef=1,animRefs(nextRef,"right"))),!1}),$("a#btn-left-references").click(function(){return TweenMax.isTweening($(".container-img-references"))||TweenMax.isTweening($(".container-next-img-references"))||(currentRef-1>=1?(nextRef=currentRef-1,animRefs(nextRef,"left")):(nextRef=nbRefs,animRefs(nextRef,"left"))),!1}),blocDrapeauxInit(),$("a#btn-arx-international").click(function(){return $("#bloc-pays").hasClass("open")?TweenMax.to($("#bloc-pays"),.5,{height:"0px",className:"-=open",ease:Cubic.easeInOut}):TweenMax.to($("#bloc-pays"),.5,{height:heightBlocDrapeaux+"px",className:"+=open",ease:Cubic.easeInOut}),!1}),$("a#close-menu-pays").click(function(){return TweenMax.to($("#bloc-pays"),.5,{height:"0px",className:"-=open",ease:Cubic.easeInOut}),!1}),$(".cadre-video-cover").each(function(){var e=$(this).parent(),i=$(".video-txt",e).outerWidth(),t=$(".video-txt",e).outerHeight();TweenMax.set($(this),{width:i+"px",height:t+"px"})}),$("a.video-cover").hover(function(){TweenMax.to($(".video-txt .video-title",this),.2,{opacity:"0",display:"none",ease:Cubic.easeInOut,onComplete:onCompleteVideoCover})},function(){TweenMax.to($(".video-txt .video-play",this),.2,{opacity:"0",display:"none",ease:Cubic.easeInOut,onComplete:onCompleteVideoCover2})})}),$(document).scroll(function(){myScroll=$(document).scrollTop(),$("html").hasClass("lt-ie9")||(myScroll>55?$("html").hasClass("no-touch")&&$("header").addClass("on"):$("html").hasClass("no-touch")&&$("header").removeClass("on")),TweenMax.set($("#machine"),{y:0-.25*myScroll+"px"})}),$(window).resize(function(){heightBlocDrapeaux=$("#bloc-pays").height()});