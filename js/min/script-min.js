function zoneSliderScrollMouseWheel(e){var t=e.originalEvent.wheelDelta/30||-e.originalEvent.detail;-1>t?nextSlideScroll(e):t>1&&prevSlideScroll(e),mouseWheelPreventDefault&&e.preventDefault(),mouseWheelPreventDefault=!0}function slideScroll(e){if(!isAnimating){isAnimating=!0;var t=$("ul#slider-scroll li.active"),i=$("ul#slider-scroll li#slide-"+e),n=i.offset().top,a=i.height(),o=$(window).height();"undefined"!=typeof tableAnimScrollLoop[numCurrentSlideScroll-1]&&tableAnimScrollLoop[numCurrentSlideScroll-1].pause(),"undefined"!=typeof tableAnimScroll[numCurrentSlideScroll-1]&&tableAnimScroll[numCurrentSlideScroll-1].pause(),tableAnimScroll[e-1].restart(),"undefined"!=typeof tableAnimScrollLoop[e-1]&&tableAnimScrollLoop[e-1].kill(),"undefined"!=typeof tableAnimScrollLoop[numCurrentSlideScroll-1]&&tableAnimScrollLoop[numCurrentSlideScroll-1].kill(),e>numCurrentSlideScroll?TweenMax.set($(".zone-txt-slider",i),{y:"300px"}):e>numCurrentSlideScroll&&TweenMax.set($(".zone-txt-slider",i),{y:"-300px"}),TweenMax.to(t,.2,{opacity:"0",ease:Cubic.easeInOut}),TweenMax.to(i,.2,{opacity:"1",ease:Cubic.easeInOut}),TweenMax.to($(".zone-txt-slider",i),.4,{y:"0px",delay:.1,ease:Cubic.easeInOut}),TweenMax.to(window,.6,{scrollTo:{y:n-o/2+a/2},onComplete:completeAnimSlideScroll,onCompleteParams:[t,i,e],ease:Cubic.easeInOut})}}function nextSlideScroll(e){if(nbSlidesScroll>numCurrentSlideScroll){if(!isAnimating){isAnimating=!0;var t=$("ul#slider-scroll li.active"),i=$("ul#slider-scroll li#slide-"+(numCurrentSlideScroll+1)),n=i.offset().top,a=i.height(),o=$(window).height();"undefined"!=typeof tableAnimScrollLoop[numCurrentSlideScroll-1]&&tableAnimScrollLoop[numCurrentSlideScroll-1].pause(),"undefined"!=typeof tableAnimScroll[numCurrentSlideScroll-1]&&tableAnimScroll[numCurrentSlideScroll-1].pause(),tableAnimScroll[numCurrentSlideScroll].restart(),"undefined"!=typeof tableAnimScrollLoop[numCurrentSlideScroll]&&tableAnimScrollLoop[numCurrentSlideScroll].kill(),"undefined"!=typeof tableAnimScrollLoop[numCurrentSlideScroll-1]&&tableAnimScrollLoop[numCurrentSlideScroll-1].kill(),TweenMax.set($(".zone-txt-slider",i),{y:"300px"}),TweenMax.to(t,.2,{opacity:"0",ease:Cubic.easeInOut}),TweenMax.to(i,.2,{opacity:"1",ease:Cubic.easeInOut}),TweenMax.to($(".zone-txt-slider",i),.4,{y:"0px",delay:.1,ease:Cubic.easeInOut}),TweenMax.to(window,.6,{scrollTo:{y:n-o/2+a/2},onComplete:completeAnimNextSlideScroll,onCompleteParams:[t,i],ease:Cubic.easeInOut})}}else isAnimating||(mouseWheelPreventDefault=!1)}function prevSlideScroll(e){if(numCurrentSlideScroll>1){if(!isAnimating){isAnimating=!0;var t=$("ul#slider-scroll li.active"),i=$("ul#slider-scroll li#slide-"+(numCurrentSlideScroll-1)),n=i.offset().top,a=i.height(),o=$(window).height();"undefined"!=typeof tableAnimScrollLoop[numCurrentSlideScroll-1]&&tableAnimScrollLoop[numCurrentSlideScroll-1].pause(),"undefined"!=typeof tableAnimScroll[numCurrentSlideScroll-1]&&tableAnimScroll[numCurrentSlideScroll-1].pause(),tableAnimScroll[numCurrentSlideScroll-2].restart(),"undefined"!=typeof tableAnimScrollLoop[numCurrentSlideScroll-1]&&tableAnimScrollLoop[numCurrentSlideScroll-1].kill(),"undefined"!=typeof tableAnimScrollLoop[numCurrentSlideScroll-2]&&tableAnimScrollLoop[numCurrentSlideScroll-2].restart().pause(),TweenMax.set($(".zone-txt-slider",i),{y:"-300px"}),TweenMax.to(t,.2,{opacity:"0",ease:Cubic.easeInOut}),TweenMax.to(i,.2,{opacity:"1",ease:Cubic.easeInOut}),TweenMax.to($(".zone-txt-slider",i),.4,{y:"0px",delay:.15,ease:Cubic.easeInOut}),TweenMax.to(window,.6,{scrollTo:{y:n-o/2+a/2},onComplete:completeAnimPrevSlideScroll,onCompleteParams:[t,i],ease:Cubic.easeInOut})}}else isAnimating||(mouseWheelPreventDefault=!1)}function completeAnimSlideScroll(e,t,i){numCurrentSlideScroll=i,isAnimating=!1,TweenMax.set(e,{className:"-=active"}),TweenMax.set(t,{className:"+=active"}),TweenMax.set($("ul#slider-scroll-navigator li.active"),{className:"-=active"}),TweenMax.set($("ul#slider-scroll-navigator li").eq(i-1),{className:"+=active"})}function completeAnimNextSlideScroll(e,t){numCurrentSlideScroll++,isAnimating=!1,TweenMax.set(e,{className:"-=active"}),TweenMax.set(t,{className:"+=active"}),TweenMax.set($("ul#slider-scroll-navigator li").eq(numCurrentSlideScroll-2),{className:"-=active"}),TweenMax.set($("ul#slider-scroll-navigator li").eq(numCurrentSlideScroll-1),{className:"+=active"})}function completeAnimPrevSlideScroll(e,t){numCurrentSlideScroll--,isAnimating=!1,TweenMax.set(e,{className:"-=active"}),TweenMax.set(t,{className:"+=active"}),TweenMax.set($("ul#slider-scroll-navigator li").eq(numCurrentSlideScroll),{className:"-=active"}),TweenMax.set($("ul#slider-scroll-navigator li").eq(numCurrentSlideScroll-1),{className:"+=active"})}function initSliderScroll(){for(var e=0;nbSlidesScroll>e;e++){var t=$("ul#slider-scroll li").eq(e),i=180,n=250,a=6,o=6,l=30,s=37,r=new SteppedEase(a-1);tableAnimScroll[e]=new TimelineMax({paused:!0,onComplete:completeFirstLoop,onCompleteParams:[t,e]});for(var c=0;3>c;c++)tableAnimScroll[e].add(TweenMax.fromTo($(".zone-visu-txt-slider .visu-txt-slider",t),.3,{backgroundPosition:"0 -"+n*c+"px"},{backgroundPosition:"-"+i*(a-1)+"px -"+n*c+"px",ease:r}))}tableAnimScroll[0].play()}function completeFirstLoop(e,t){var i=180,n=250,a=6,o=6,l=30,s=37,r=new SteppedEase(a-1);tableAnimScrollLoop[t]=new TimelineMax({repeat:-1});for(var c=3;o>c;c++)tableAnimScrollLoop[t].add(TweenMax.fromTo($(".zone-visu-txt-slider .visu-txt-slider",e),.3,{backgroundPosition:"0 -"+n*c+"px"},{backgroundPosition:"-"+i*(a-1)+"px -"+n*c+"px",ease:r}))}function nextVideo(e){if($("ul#slider-videos li").length>=2){var t=parseInt($("ul#slider-videos li#current-video .iframe-video").attr("id").match(pattern));if(players[t].stopVideo(),"right"==e){$("ul#slider-videos li .iframe-video#player-"+(t+1)).length?$("ul#slider-videos li .iframe-video#player-"+(t+1)).closest("li").attr("id","next-video"):$("ul#slider-videos li .iframe-video#player-1").closest("li").attr("id","next-video"),TweenMax.set($("ul#slider-videos li#next-video"),{display:"block",x:"100%"}),TweenMax.set($("ul#slider-videos li#current-video a.video-cover"),{display:"block"});var i=$("ul#slider-videos li#next-video a.video-cover img.img-video-cover").attr("src");TweenMax.to($("ul#slider-videos li#current-video"),.5,{x:"-100%",ease:Cubic.easeInOut}),TweenMax.to($("ul#slider-videos li#next-video"),.5,{x:"0%",ease:Cubic.easeInOut})}else"left"==e&&($("ul#slider-videos li .iframe-video#player-"+(t-1)).length?$("ul#slider-videos li .iframe-video#player-"+(t-1)).closest("li").attr("id","next-video"):$("ul#slider-videos li .iframe-video#player-"+$("ul#slider-videos li").length).closest("li").attr("id","next-video"),TweenMax.set($("ul#slider-videos li#next-video"),{display:"block",x:"-100%"}),TweenMax.set($("ul#slider-videos li#current-video a.video-cover"),{display:"block"}),TweenMax.to($("ul#slider-videos li#current-video"),.5,{x:"100%",ease:Cubic.easeInOut}),TweenMax.to($("ul#slider-videos li#next-video"),.5,{x:"0%",ease:Cubic.easeInOut}));$("ul#slider-videos li#current-video").attr("id",""),$("ul#slider-videos li#next-video").attr("id","current-video")}}function animRefs(e,t){$("ul#liste-references li#references-bloc-vertical .container-next-img-references img").attr("src","img/references/ref-"+e+"/img-references-bloc-vertical.jpg"),$("ul#liste-references li#references-bloc-big .container-next-img-references img").attr("src","img/references/ref-"+e+"/img-references-bloc-big.jpg"),$("ul#liste-references li#references-bloc-horizontal-top .container-next-img-references img").attr("src","img/references/ref-"+e+"/img-references-bloc-horizontal-top.jpg"),$("ul#liste-references li#references-bloc-horizontal-bottom .container-next-img-references img").attr("src","img/references/ref-"+e+"/img-references-bloc-horizontal-bottom.jpg"),$(".imgLiquidFill").imgLiquid(),"right"==t?(TweenMax.set($(".container-next-img-references"),{x:"-100%"}),TweenMax.staggerTo(".container-img-references",.5,{x:"100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(".container-next-img-references",.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiRefs,[e])):"left"==t&&(TweenMax.set($(".container-next-img-references"),{x:"100%"}),TweenMax.staggerTo(".container-img-references",.5,{x:"-100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(".container-next-img-references",.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiRefs,[e]))}function completeTransiRefs(e){$(".container-img-references").toggleClass("container-img-references container-next"),$(".container-next-img-references").toggleClass("container-next-img-references container-img-references"),$(".container-next").toggleClass("container-next container-next-img-references"),currentRef=e}function onYouTubeIframeAPIReady(){for(var e=$("ul#slider-videos li").length,t=1;e>=t;t++)players[t]=new YT.Player("player-"+t)}function blocDrapeauxInit(){heightBlocDrapeaux=$("#bloc-pays").height(),TweenMax.set($("#bloc-pays"),{height:"0px"})}function transiInButton(e){var t=new TimelineMax;t.to(e,.3,{opacity:"1",scaleY:1,ease:Circ.easeInOut}),t.to(e,1,{y:"0px",ease:Circ.easeInOut},0),t.to($(".txt-btn",e),.2,{opacity:"1",y:"0px",ease:Circ.easeInOut}),t.to($(".triangle-btn",e),.2,{opacity:"1",x:"0px",y:"0px",ease:Circ.easeInOut,clearProps:"all"})}function initBtnAnim(){$("window").height()>=830?TweenMax.set($(".btn-anim"),{opacity:"0",scaleY:0,y:"180px"}):TweenMax.set($(".btn-anim"),{opacity:"0",scaleY:0,y:"130px"}),TweenMax.set($(".btn-anim .txt-btn"),{opacity:"0",y:"-20px"}),TweenMax.set($(".btn-anim .triangle-btn"),{opacity:"0",x:"-10px",y:"-10px"})}function animHeaderHome(){TweenMax.to($("h1"),.3,{opacity:"1",y:"0px",ease:Circ.easeInOut}),TweenMax.to($("#machine"),.5,{opacity:"1",y:"0px",ease:Circ.easeInOut,delay:.3,onComplete:completeAnimMachine}),TweenMax.to([CSSRulePlugin.getRule(".home #bloc-home ul.bg-grid li.col-bg-grid:nth-child(2):before"),CSSRulePlugin.getRule(".home #bloc-home ul.bg-grid li.col-bg-grid:nth-child(3):before")],1.2,{cssRule:{opacity:"1",y:"0px"},ease:Circ.easeInOut,delay:1.5}),TweenMax.to([CSSRulePlugin.getRule(".home #bloc-home ul.bg-grid li.col-bg-grid:nth-child(5):before"),CSSRulePlugin.getRule(".home #bloc-home ul.bg-grid li.col-bg-grid:nth-child(6):before")],1.2,{cssRule:{opacity:"1",y:"0px"},ease:Circ.easeInOut,delay:2})}function completeAnimMachine(){setTimeout(function(){transiInButton($("#btn-robots-rowa")),setTimeout(function(){transiInButton($("#btn-contact"))},500)},500)}function slideEquipe(){var e=$(this).attr("href");return $(this).addClass("actif").parents("li").siblings().find("a").removeClass("actif"),$(e).animate({opacity:1}).addClass("on").siblings().animate({opacity:0}).removeClass("on"),!1}function animCarouselHome(e){var t=$("ul#carousel-img-home li.active").index("ul#carousel-img-home li")+1,i=$("ul#carousel-img-home li").length;if("right"==e){if(i>=t+1)var n=$("ul#carousel-img-home li").eq(t),a=$("ul#carousel-txt-home li").eq(t),o=$("ul#container-titles-carousel-home li").eq(t);else var n=$("ul#carousel-img-home li").eq(0),a=$("ul#carousel-txt-home li").eq(0),o=$("ul#container-titles-carousel-home li").eq(0);TweenMax.set(n,{x:"-100%"}),TweenMax.set(a,{x:"-100%"}),TweenMax.set(o,{x:"0"}),TweenMax.set($(".container-title-carousel-home",o),{x:"-100%"}),TweenMax.set($(".container-fond-title-carousel-home",o),{x:"-100%"});var l=new TimelineMax;l.to($("ul#container-titles-carousel-home li.active .container-title-carousel-home"),.2,{x:"100%",ease:Cubic.easeInOut}),l.to($("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home"),.2,{x:"100%",ease:Cubic.easeInOut,onComplete:completeTransiTitleCarouselHome,onCompleteParams:[o]}),l.to($(".container-fond-title-carousel-home",o),.2,{x:"0%",ease:Cubic.easeInOut}),l.to($(".container-title-carousel-home",o),.2,{x:"0%",ease:Cubic.easeInOut}),TweenMax.staggerTo($("ul#carousel-img-home li.active"),.5,{x:"100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(n,.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiCarouselHome,[n,a]),TweenMax.staggerTo($("ul#carousel-txt-home li.active"),.5,{x:"100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(a,.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiCarouselHome,[n,a])}else if("left"==e){if(t-1>=1)var n=$("ul#carousel-img-home li").eq(t-2),a=$("ul#carousel-txt-home li").eq(t-2),o=$("ul#container-titles-carousel-home li").eq(t-2);else var n=$("ul#carousel-img-home li").eq(i-1),a=$("ul#carousel-txt-home li").eq(i-1),o=$("ul#container-titles-carousel-home li").eq(i-1);TweenMax.set(n,{x:"100%"}),TweenMax.set(a,{x:"100%"}),TweenMax.set(o,{x:"0"}),TweenMax.set($(".container-title-carousel-home",o),{x:"100%"}),TweenMax.set($(".container-fond-title-carousel-home",o),{x:"100%"});var l=new TimelineMax;l.to($("ul#container-titles-carousel-home li.active .container-title-carousel-home"),.2,{x:"-100%",ease:Cubic.easeInOut}),l.to($("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home"),.2,{x:"-100%",ease:Cubic.easeInOut,onComplete:completeTransiTitleCarouselHome,onCompleteParams:[o]}),l.to($(".container-fond-title-carousel-home",o),.2,{x:"0%",ease:Cubic.easeInOut}),l.to($(".container-title-carousel-home",o),.2,{x:"0%",ease:Cubic.easeInOut}),TweenMax.staggerTo($("ul#carousel-img-home li.active"),.5,{x:"-100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(n,.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiCarouselHome,[n,a]),TweenMax.staggerTo($("ul#carousel-txt-home li.active"),.5,{x:"-100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(a,.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiCarouselHome,[n,a])}}function completeTransiTitleCarouselHome(e){TweenMax.set($("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home"),{clearProps:"all"}),TweenMax.set($("ul#container-titles-carousel-home li.active .container-title-carousel-home"),{clearProps:"all"}),TweenMax.set($("ul#container-titles-carousel-home li.active"),{className:"-=active",clearProps:"all"}),TweenMax.set(e,{className:"+=active",clearProps:"all"})}function completeTransiCarouselHome(e,t){TweenMax.set($("ul#carousel-img-home li.active"),{className:"-=active",clearProps:"all"}),TweenMax.set($("ul#carousel-txt-home li.active"),{className:"-=active",clearProps:"all"}),TweenMax.set(e,{className:"+=active",clearProps:"all"}),TweenMax.set(t,{className:"+=active",clearProps:"all"})}function animCarouselOptions(e){var t=$("ul#carousel-img-options li.active").index("ul#carousel-img-options li")+1,i=$("ul#carousel-img-options li").length;if("right"==e){if(i>=t+1)var n=$("ul#carousel-img-options li").eq(t),a=$("ul#carousel-txt-options li").eq(t);else var n=$("ul#carousel-img-options li").eq(0),a=$("ul#carousel-txt-options li").eq(0);TweenMax.set(n,{x:"-100%"}),TweenMax.set(a,{x:"-100%"}),TweenMax.staggerTo($("ul#carousel-img-options li.active"),.5,{x:"100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(n,.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiCarouselOptions,[n,a]),TweenMax.staggerTo($("ul#carousel-txt-options li.active"),.5,{x:"100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(a,.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiCarouselOptions,[n,a])}else if("left"==e){if(t-1>=1)var n=$("ul#carousel-img-options li").eq(t-2),a=$("ul#carousel-txt-options li").eq(t-2);else var n=$("ul#carousel-img-options li").eq(i-1),a=$("ul#carousel-txt-options li").eq(i-1);TweenMax.set(n,{x:"100%"}),TweenMax.set(a,{x:"100%"}),TweenMax.staggerTo($("ul#carousel-img-options li.active"),.5,{x:"-100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(n,.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiCarouselOptions,[n,a]),TweenMax.staggerTo($("ul#carousel-txt-options li.active"),.5,{x:"-100%",ease:Cubic.easeInOut},.1),TweenMax.staggerTo(a,.5,{x:"0%",ease:Cubic.easeInOut},.1,completeTransiCarouselOptions,[n,a])}}function completeTransiCarouselOptions(e,t){TweenMax.set($("ul#carousel-img-options li.active"),{className:"-=active",clearProps:"all"}),TweenMax.set($("ul#carousel-txt-options li.active"),{className:"-=active",clearProps:"all"}),TweenMax.set(e,{className:"+=active",clearProps:"all"}),TweenMax.set(t,{className:"+=active",clearProps:"all"})}function openDetailHome(e){TweenMax.set($("body"),{className:"+=detail-home"});var t=e.index(".btn-detail-home");TweenMax.set($("ul#carousel-img-home li.active"),{className:"-=active"}),TweenMax.set($("ul#carousel-txt-home li.active"),{className:"-=active"}),TweenMax.set($("ul#carousel-img-home li").eq(t),{className:"+=active"}),TweenMax.set($("ul#carousel-txt-home li").eq(t),{className:"+=active"}),TweenMax.set($("ul#container-titles-carousel-home li.active"),{className:"-=active"}),TweenMax.set($("ul#container-titles-carousel-home li").eq(t),{className:"+=active"});var i=new TimelineMax;i.staggerTo(".btn-detail-home .container-btn-anim",tpsEtapeDetailHome,{x:"100%",ease:Cubic.easeIn},.08),i.staggerTo(".btn-detail-home .container-fond-btn-anim",tpsEtapeDetailHome,{x:"100%",ease:Cubic.easeIn},.08),i.set($(".btn-detail-home"),{display:"none"}),i.set($("#bloc-detail-home"),{className:"+=detail-home-open"}),i.to($(".masque-bloc-detail-home"),tpsEtapeFondDetailHome,{width:"100%",ease:Cubic.easeIn}),i.staggerTo(".container-anim-inte-bloc-detail-home",tpsEtapeDetailHome,{width:"100%",ease:Cubic.easeIn},.1),i.staggerTo(".container-inte-bloc-detail-home .masque-carousel",tpsEtapeDetailHome,{width:"0%",ease:Cubic.easeIn},.1),i.staggerTo("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home",tpsEtapeDetailHome,{x:"0%",ease:Cubic.easeIn},.1),i.staggerTo("ul#container-titles-carousel-home li.active .container-title-carousel-home",tpsEtapeDetailHome,{x:"0%",ease:Cubic.easeIn},.1)}function closeDetailHome(){TweenMax.set($("body"),{className:"-=detail-home"});var e=new TimelineMax;e.staggerTo("ul#container-titles-carousel-home li.active .container-title-carousel-home",tpsEtapeDetailHome,{x:"-100%",ease:Cubic.easeIn},.1),e.staggerTo("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home",tpsEtapeDetailHome,{x:"-100%",ease:Cubic.easeIn},.1),e.staggerTo(".container-inte-bloc-detail-home .masque-carousel",tpsEtapeDetailHome,{width:"100%",ease:Cubic.easeOut},.1),e.to(".container-anim-inte-bloc-detail-home",tpsEtapeDetailHome,{width:"0",ease:Cubic.easeOut}),e.to($(".masque-bloc-detail-home"),tpsEtapeFondDetailHome,{width:"0%",ease:Cubic.easeOut}),e.set($("#bloc-detail-home"),{className:"-=detail-home-open"}),TweenMax.set($("ul#carousel-img-home li"),{clearProps:"all"}),TweenMax.set($("ul#carousel-txt-home li"),{clearProps:"all"}),e.set($(".btn-detail-home"),{display:"block"}),e.staggerTo(".btn-detail-home .container-fond-btn-anim",tpsEtapeDetailHome,{x:"0%",ease:Cubic.easeIn},.08),e.staggerTo(".btn-detail-home .container-btn-anim",tpsEtapeDetailHome,{x:"0%",ease:Cubic.easeIn},.08)}function closeBlocOptions(){var e=new TimelineMax;TweenMax.to($("#txt-bloc-options-title"),.2,{opacity:0,y:"20px"}),TweenMax.to($("#btn-close-bloc-options"),.2,{opacity:0}),TweenMax.to($("#bloc-options-title"),.4,{className:"-=open",delay:.4}),e.set($("#btn-close-bloc-options"),{display:"none"}),e.to($("#bloc-content-options"),.3,{opacity:"0"}),e.to($("#bloc-options"),.3,{height:"0px"}),e.to($("a#btn-options .container-fond-btn-anim"),.2,{x:"0%"}),e.to($("a#btn-options .container-btn-anim"),.2,{x:"0%"})}function openOptions(e){TweenMax.set($("body"),{className:"+=options"}),$("body").hasClass("detail-home")&&closeDetailHome(),"openTitleOptions"==e&&TweenMax.delayedCall(.1,function(){TweenMax.to(window,1,{scrollTo:{y:$("#bloc-content-options").offset().top-260}})}),TweenMax.set($("#btn-close-bloc-options"),{display:"block"});var t=new TimelineMax;t.to($("#bloc-options"),.3,{height:$("#bloc-content-options").height()+"px"}),t.set($("#bloc-content-options"),{opacity:"1"}),"openTitleOptions"==e&&(t.to($("a#btn-options .container-btn-anim"),.2,{x:"-100%"}),t.to($("a#btn-options .container-fond-btn-anim"),.2,{x:"-100%"}),t.to($("#bloc-options-title"),.3,{className:"+=open"}),t.to($("#txt-bloc-options-title"),.2,{opacity:1,y:0}),t.to($("#btn-close-bloc-options"),.2,{opacity:1})),t.staggerTo(".masque-content-options",.2,{width:"0",ease:Cubic.easeOut},.1)}function closeOptions(e){TweenMax.set($("body"),{className:"-=options"});var t=new TimelineMax;"all"==e?(t.staggerTo(".masque-content-options",.2,{width:"100%",ease:Cubic.easeOut,onComplete:closeBlocOptions},.1),t.to($("a#btn-options .container-fond-btn-anim"),.2,{x:"0%"}),t.to($("a#btn-options .container-btn-anim"),.2,{x:"0%"})):t.staggerTo(".masque-content-options",.2,{width:"100%",ease:Cubic.easeOut},.1)}function openDetailOption(e){TweenMax.set($("body"),{className:"+=detail-option"});var t=e.index("ul#liste-options-pharmacies li a");TweenMax.set($("ul#carousel-img-options li.active"),{className:"-=active"}),TweenMax.set($("ul#carousel-txt-options li.active"),{className:"-=active"}),TweenMax.set($("ul#carousel-img-options li").eq(t),{className:"+=active"}),TweenMax.set($("ul#carousel-txt-options li").eq(t),{className:"+=active"}),closeOptions();var i=new TimelineMax;i.to($("#bloc-options"),.3,{height:$("#bloc-content-detail-options").height()+"px"}),i.set($("#bloc-content-detail-options"),{display:"block",opacity:"1"}),i.to($("a#btn-close-bloc-options"),.2,{opacity:"0",display:"none",ease:Cubic.easeOut}),i.staggerTo(".masque-content-detail-options",.2,{width:"0",ease:Cubic.easeOut},.1)}function closeDetailOption(e){TweenMax.set($("body"),{className:"-=detail-option"});var t=new TimelineMax;"all"==e?(t.staggerTo(".masque-content-detail-options",.2,{width:"100%",ease:Cubic.easeOut},.1),t.set($("ul#container-carousel-img-options li"),{clearProps:"all"}),t.set($("ul#carousel-txt-options li"),{clearProps:"all"}),t.to($("a#btn-close-bloc-options"),.2,{opacity:"1",display:"block",ease:Cubic.easeOut}),t.set($("#bloc-content-detail-options"),{display:"none",opacity:"0",onComplete:closeBlocOptions})):(t.staggerTo(".masque-content-detail-options",.2,{width:"100%",ease:Cubic.easeOut},.1),t.set($("ul#container-carousel-img-options li"),{clearProps:"all"}),t.set($("ul#carousel-txt-options li"),{clearProps:"all"}),t.to($("a#btn-close-bloc-options"),.2,{opacity:"1",display:"block",ease:Cubic.easeOut}),t.set($("#bloc-content-detail-options"),{display:"none",opacity:"0",onComplete:openOptions}))}function animBtnFile(e){var t=37,i=40,n=3,a=3,o=new SteppedEase(n-1),l=e.index("#liste-btn-home li .btn-file");if(tlBtnFile1=new TimelineMax,tlBtnFile2=new TimelineMax,0==l)for(var s=0;a>s;s++)tlBtnFile1.add(TweenMax.fromTo($(".sprite-btn-file",e),.05,{backgroundPosition:"0 -"+i*s+"px"},{backgroundPosition:"-"+t*(n-1)+"px -"+i*s+"px",ease:o}));else if(1==l)for(var s=0;a>s;s++)tlBtnFile2.add(TweenMax.fromTo($(".sprite-btn-file",e),.05,{backgroundPosition:"0 -"+i*s+"px"},{backgroundPosition:"-"+t*(n-1)+"px -"+i*s+"px",ease:o}))}function animBtnFileRetour(e){var t=e.index("#liste-btn-home li .btn-file");0==t?tlBtnFile1.reverse():1==t&&tlBtnFile2.reverse()}function setSliderScrollNavigator(e){e>=$("#slider-scroll").offset().top-280&&e<=$("#slider-scroll").offset().top+($("#slider-scroll").height()-600)?TweenMax.set($("#slider-scroll-navigator"),{opacity:"1"}):TweenMax.set($("#slider-scroll-navigator"),{opacity:"0"})}var nbRefs=3,etape=1,indexPucesVision=1,wheel,oldDate=new Date,scrollPos,pattern=/[0-9]+/g,currentRef=1,nextRef,currentDetailHome=1,nextDetailHome,heightBlocDrapeaux,widthVisuLeftPharmacies,mouseWheelPreventDefault=!0,tpsEtapeFondDetailHome=.1,tpsEtapeDetailHome=.1,tpsAnimBtnHalfVisu=1,easeAnimBtnHalfVisu=Expo.easeOut,isAnimating=!1,numCurrentSlideScroll=1,nbSlidesScroll=$("ul#slider-scroll li").length;$("#zone-slider-scroll").bind("mousewheel DOMMouseScroll",zoneSliderScrollMouseWheel);var offsetSubMenu,tableAnimScroll=[],tableAnimScrollLoop=[],tag=document.createElement("script");tag.src="https://www.youtube.com/player_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var players=[];$(window).load(function(){$("body").hasClass("home")&&setTimeout(function(){animHeaderHome()},200)}),$(window).on("beforeunload",function(){$("body").hasClass("categ")&&$(window).scrollTop(0)}),$(function(){function e(){$("#popUpContact").fadeOut(),$("#fdPop").fadeOut()}$("#equipeFilter").find("a").on("click",slideEquipe),$("#popUpContact").length&&($("html, body").delay(300).animate({scrollTop:$("#form").offset().top-150},500),setTimeout(e,4e3),$("#fdPop").on("click",e)),$("body").hasClass("categ")&&initSliderScroll(),$(".imgLiquidFill").imgLiquid(),initBtnAnim(),TweenMax.set($("ul#slider-videos li#current-video"),{display:"block",x:"0"}),TweenMax.set($("#img-bg-video-cover"),{x:"0%",y:"-50%"}),TweenMax.set($("#next-img-bg-video-cover"),{x:"100%",y:"-50%"}),$("a#menu-responsive").click(function(){return TweenMax.set($("#menu-full"),{className:"+=open"}),!1}),$("a#close-menu-responsive").click(function(){return TweenMax.set($("#menu-full"),{className:"-=open"}),!1}),$("ul#slider-videos li a.video-cover").click(function(){if("current-video"==$(this).closest("li").attr("id")){TweenMax.set($(this),{display:"none"});var e=parseInt($("ul#slider-videos li#current-video .iframe-video").attr("id").match(pattern));isMobile.phone||players[e].playVideo()}return!1}),$("a#btn-right-video").click(function(){return TweenMax.isTweening($("ul#slider-videos li#current-video"))||TweenMax.isTweening($("ul#slider-videos li#next-video"))||TweenMax.isTweening($("#img-bg-video-cover"))||TweenMax.isTweening($("#next-img-bg-video-cover"))||nextVideo("right"),!1}),$("a#btn-left-video").click(function(){return TweenMax.isTweening($("ul#slider-videos li#current-video"))||TweenMax.isTweening($("ul#slider-videos li#next-video"))||TweenMax.isTweening($("#img-bg-video-cover"))||TweenMax.isTweening($("#next-img-bg-video-cover"))||nextVideo("left"),!1}),$("a#btn-right-references").click(function(){return TweenMax.isTweening($(".container-img-references"))||TweenMax.isTweening($(".container-next-img-references"))||(nbRefs>=currentRef+1?(nextRef=currentRef+1,animRefs(nextRef,"right")):(nextRef=1,animRefs(nextRef,"right"))),!1}),$("a#btn-left-references").click(function(){return TweenMax.isTweening($(".container-img-references"))||TweenMax.isTweening($(".container-next-img-references"))||(currentRef-1>=1?(nextRef=currentRef-1,animRefs(nextRef,"left")):(nextRef=nbRefs,animRefs(nextRef,"left"))),!1}),blocDrapeauxInit(),$("a#btn-arx-international").click(function(){return $("#bloc-pays").hasClass("open")?TweenMax.to($("#bloc-pays"),.5,{height:"0px",className:"-=open",ease:Cubic.easeInOut}):TweenMax.to($("#bloc-pays"),.5,{height:heightBlocDrapeaux+"px",className:"+=open",ease:Cubic.easeInOut}),!1}),$("a#close-menu-pays").click(function(){return TweenMax.to($("#bloc-pays"),.5,{height:"0px",className:"-=open",ease:Cubic.easeInOut}),!1}),$(".cadre-video-cover").each(function(){var e=$(this).parent(),t=$(".video-txt",e).outerWidth(),i=$(".video-txt",e).outerHeight();TweenMax.set($(this),{width:t+"px",height:i+"px"})});var t=new TimelineMax;$("a.video-cover").hover(function(){t.kill(),t=new TimelineMax,t.to($(".video-txt .video-title",this),.2,{opacity:"0",display:"none",ease:Cubic.easeInOut}),t.to($("li#current-video .video-txt .video-play"),.2,{display:"inline-block",opacity:"1",ease:Cubic.easeInOut}),t.to($("li#current-video .cadre-video-cover"),.2,{width:"215px",height:"85px",ease:Cubic.easeInOut},.2)},function(){t.reverse()}),TweenMax.set($("#masque-btn-half-visu"),{width:"50%)"}),TweenMax.set($("#btn-visu-right"),{width:"50%"}),$(".btn-half-visu").hover(function(){$(this).is("#btn-visu-left")?(TweenMax.to($("#masque-btn-half-visu"),tpsAnimBtnHalfVisu,{width:"55%",ease:easeAnimBtnHalfVisu}),TweenMax.to($("#btn-visu-right"),tpsAnimBtnHalfVisu,{width:"47%",ease:easeAnimBtnHalfVisu}),TweenMax.set($(".btn-half-visu-small-left"),{className:"+=survol"}),TweenMax.to($("#btn-rowa-smart-pharmacies"),tpsAnimBtnHalfVisu,{x:"80px",ease:easeAnimBtnHalfVisu}),TweenMax.to($("#btn-rowa-vmax-pharmacies"),tpsAnimBtnHalfVisu,{x:"80px",ease:easeAnimBtnHalfVisu}),TweenMax.to($("#btn-visu-left .over-container-half-visu"),tpsAnimBtnHalfVisu,{opacity:"0",ease:easeAnimBtnHalfVisu})):$(this).is("#btn-visu-right")&&(TweenMax.to($("#masque-btn-half-visu"),tpsAnimBtnHalfVisu,{width:"45%",ease:easeAnimBtnHalfVisu}),TweenMax.to($("#btn-visu-right"),tpsAnimBtnHalfVisu,{width:"57%",ease:easeAnimBtnHalfVisu}),TweenMax.set($(".btn-half-visu-small-right"),{className:"+=survol"}),TweenMax.to($("#btn-rowa-smart-pharmacies"),tpsAnimBtnHalfVisu,{x:"-80px",ease:easeAnimBtnHalfVisu}),TweenMax.to($("#btn-rowa-vmax-pharmacies"),tpsAnimBtnHalfVisu,{x:"-80px",ease:easeAnimBtnHalfVisu}),TweenMax.to($("#btn-visu-right .over-container-half-visu"),tpsAnimBtnHalfVisu,{opacity:"0.2",ease:easeAnimBtnHalfVisu}))},function(){TweenMax.to($("#masque-btn-half-visu"),tpsAnimBtnHalfVisu,{width:"50%",ease:easeAnimBtnHalfVisu}),TweenMax.to($("#btn-visu-right"),tpsAnimBtnHalfVisu,{width:"50%",ease:easeAnimBtnHalfVisu}),TweenMax.set($(".btn-half-visu-small-left"),{className:"-=survol"}),TweenMax.set($(".btn-half-visu-small-right"),{className:"-=survol"}),TweenMax.to($("#btn-rowa-smart-pharmacies"),tpsAnimBtnHalfVisu,{opacity:"1",x:"0",ease:easeAnimBtnHalfVisu}),TweenMax.to($("#btn-rowa-vmax-pharmacies"),tpsAnimBtnHalfVisu,{opacity:"1",x:"0",ease:easeAnimBtnHalfVisu}),TweenMax.to([$("#btn-visu-left .over-container-half-visu"),$("#btn-visu-right .over-container-half-visu")],tpsAnimBtnHalfVisu,{opacity:"0.5",ease:easeAnimBtnHalfVisu})}),$("a#btn-rowa-vmax-pharmacies").hover(function(){TweenMax.to($("#masque-btn-half-visu"),.2,{width:"calc(55% + 30px)",ease:Cubic.easeInOut}),TweenMax.to($("#btn-visu-right"),.2,{width:"50%",ease:Cubic.easeInOut})},function(){TweenMax.to($("#masque-btn-half-visu"),.2,{width:"calc(50% + 30px)",ease:Cubic.easeInOut}),TweenMax.to($("#btn-visu-right"),.2,{width:"55%",ease:Cubic.easeInOut})}),$("a#btn-rowa-smart-pharmacies").hover(function(){TweenMax.to($("#masque-btn-half-visu"),.2,{width:"calc(45% + 30px)",ease:Cubic.easeInOut}),TweenMax.to($("#btn-visu-right"),.2,{width:"65%",ease:Cubic.easeInOut})},function(){TweenMax.to($("#masque-btn-half-visu"),.2,{width:"calc(50% + 30px)",ease:Cubic.easeInOut}),TweenMax.to($("#btn-visu-right"),.2,{width:"55%",ease:Cubic.easeInOut})}),$(".btn-file").hover(function(){animBtnFile($(this))},function(){animBtnFileRetour($(this))}),$("a#btn-options").click(function(){return openOptions("openTitleOptions"),!1}),$(".btn-detail-home").click(function(){return openDetailHome($(this)),!1}),$("#btn-close-carousel-home").click(function(){return closeDetailHome(),!1}),$("#btn-right-carousel-home").click(function(){return TweenMax.isTweening($("ul#carousel-img-home li"))||TweenMax.isTweening($("ul#carousel-txt-home li"))||animCarouselHome("right"),!1}),$("#btn-close-bloc-options").click(function(){return $("body").hasClass("detail-option")?closeDetailOption("all"):$("body").hasClass("options")&&closeOptions("all"),!1}),$("#btn-close-detail-option").click(function(){return closeDetailOption(),!1}),$("#btn-left-carousel-home").click(function(){return TweenMax.isTweening($("ul#carousel-img-home li"))||TweenMax.isTweening($("ul#carousel-txt-home li"))||animCarouselHome("left"),!1}),$("#btn-right-options").click(function(){return TweenMax.isTweening($("ul#carousel-img-options li"))||TweenMax.isTweening($("ul#carousel-txt-options li"))||animCarouselOptions("right"),!1}),$("#btn-left-options").click(function(){return TweenMax.isTweening($("ul#carousel-img-options li"))||TweenMax.isTweening($("ul#carousel-txt-options li"))||animCarouselOptions("left"),!1}),$("#liste-options-pharmacies li a").click(function(){return openDetailOption($(this)),!1}),$("ul#slider-scroll-navigator li a").click(function(){return slideScroll($(this).parent().index()+1),!1}),$(".subMenu").length&&(offsetSubMenu=$(".subMenu").offset().top-100),$(".subMenuContact").length&&(offsetSubMenu=$(".subMenuContact").offset().top-100)});var tlBtnFile1=new TimelineMax,tlBtnFile2=new TimelineMax;
$(document).scroll(function(){function e(e){e.outerHeight()+100<$(window).height()&&(myScroll>=offsetSubMenu?e.addClass("fixed"):e.removeClass("fixed"),e.outerHeight()+100>=$("#menu-full").offset().top-myScroll?e.addClass("fixedBottom"):e.removeClass("fixedBottom"))}myScroll=$(document).scrollTop(),!$("html").hasClass("lt-ie9")&&$("html").hasClass("no-touch")&&($(window).width()>=979&&myScroll>55?$("header").addClass("on"):$("header").removeClass("on")),$("body").hasClass("categ")&&setSliderScrollNavigator(myScroll),$(window).width()>979&&($(".subMenu").length&&e($(".subMenu")),$(".subMenuContact").length&&e($(".subMenuContact"))),TweenMax.set($("#machine"),{y:0-.25*myScroll+"px"})}),$(window).resize(function(){heightBlocDrapeaux=$("#bloc-pays").height(),$(window).width()<979&&($(".subMenu").length&&(console.log("bvjerbgie"),$(".subMenu").removeClass("fixed").removeClass("fixedBottom")),$(".subMenuContact").length&&$(".subMenuContact").removeClass("fixed").removeClass("fixedBottom"))});