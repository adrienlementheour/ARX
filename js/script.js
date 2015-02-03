//////////////////////////
// variables à modifier //
//////////////////////////
// Nombre de références
var nbRefs = 3;

///////////////
// variables //
///////////////
var pattern = /[0-9]+/g;
var currentRef = 1;
var nextRef;
var heightBlocDrapeaux;

// Fonction pour passer d'une vidéo à une autre
function nextVideo(sens){
	// si il y a au moins 2 vidéos
	if($("ul#slider-videos li").length>=2){
		// mettre la current video en pause
		var numVideo = parseInt($("ul#slider-videos li#current-video .iframe-video").attr("id").match(pattern));
		players[numVideo].stopVideo();

		if(sens=="right"){
			// tester si il y a une vidéo suivante
			if($("ul#slider-videos li .iframe-video#player-"+(numVideo+1)).length){
				// il y a une video suivante
				// lui donner l'ID "next-video"
				$("ul#slider-videos li .iframe-video#player-"+(numVideo+1)).closest("li").attr("id", "next-video");
			}else{
				// lui donner l'ID "next-video"
				$("ul#slider-videos li .iframe-video#player-1").closest("li").attr("id", "next-video");
			}
			// positionner la video suivante
			TweenMax.set($("ul#slider-videos li#next-video"), {display: "block", x: "100%"});
			TweenMax.set($("ul#slider-videos li#current-video a.video-cover"), {display: "block"});
			// positionner la photo du fond suivante
			var imgVideoSrc = $("ul#slider-videos li#next-video a.video-cover img.img-video-cover").attr("src");
			$("img#next-img-bg-video-cover").attr("src",imgVideoSrc);
			TweenMax.set($("img#next-img-bg-video-cover"), {display: "block", x: "100%"});

			TweenMax.to($("ul#slider-videos li#current-video"), 0.5, {x: "-100%", ease:Cubic.easeInOut});
			TweenMax.to($("ul#slider-videos li#next-video"), 0.5, {x: "0%", ease:Cubic.easeInOut});
			TweenMax.to($("#img-bg-video-cover"), 0.5, {x: "-100%", ease:Cubic.easeInOut});
			TweenMax.to($("#next-img-bg-video-cover"), 0.5, {x: "0%", ease:Cubic.easeInOut});
		}else if(sens=="left"){
			// tester si il y a une vidéo précédante
			if($("ul#slider-videos li .iframe-video#player-"+(numVideo-1)).length){
				// il y a une video suivante
				// lui donner l'ID "next-video"
				$("ul#slider-videos li .iframe-video#player-"+(numVideo-1)).closest("li").attr("id", "next-video");
			}else{
				// lui donner l'ID "next-video"
				$("ul#slider-videos li .iframe-video#player-"+$("ul#slider-videos li").length).closest("li").attr("id", "next-video");
			}
			// positionner la video suivante
			TweenMax.set($("ul#slider-videos li#next-video"), {display: "block", x: "-100%"});
			TweenMax.set($("ul#slider-videos li#current-video a.video-cover"), {display: "block"});
			// positionner la photo du fond suivante
			var imgVideoSrc = $("ul#slider-videos li#next-video a.video-cover img.img-video-cover").attr("src");
			$("img#next-img-bg-video-cover").attr("src",imgVideoSrc);
			TweenMax.set($("img#next-img-bg-video-cover"), {display: "block", x: "-100%"});

			TweenMax.to($("ul#slider-videos li#current-video"), 0.5, {x: "100%", ease:Cubic.easeInOut});
			TweenMax.to($("ul#slider-videos li#next-video"), 0.5, {x: "0%", ease:Cubic.easeInOut});
			TweenMax.to($("#img-bg-video-cover"), 0.5, {x: "100%", ease:Cubic.easeInOut});
			TweenMax.to($("#next-img-bg-video-cover"), 0.5, {x: "0%", ease:Cubic.easeInOut});
		}

		// mettre à jour les IDs et src
		$("ul#slider-videos li#current-video").attr("id", "");
		$("ul#slider-videos li#next-video").attr("id", "current-video");
		$("#img-bg-video-cover").attr("id", "aze");
		$("#next-img-bg-video-cover").attr("id", "img-bg-video-cover");
		$("#aze").attr("id", "next-img-bg-video-cover");
	}
}

// Fonction pour positionner correctement les images des références
function posiImgsReferences(){
	$("ul#liste-references li img").each(function(){
		// test pour savoir si l'image est plus haute que large
		if($(this).height()>=$(this).width()){
			//l'image est plus haute que large
			TweenMax.set($(this), {width: "100%", height: "auto"});
			// test pour savoir si l'image est plus petite que le container
			if($(this).height()<$(this).parent().height()){
				TweenMax.set($(this), {width: "auto", height: "100%"});
			}
		}else{
			//l'image est plus large que haute
			TweenMax.set($(this), {width: "auto", height: "100%"});
			// test pour savoir si l'image est plus petite que le container
			if($(this).width()<$(this).parent().width()){
				TweenMax.set($(this), {width: "100%", height: "auto"});
			}
		}
	});
}

function animRefs(nextRef, sens){
	// charger les images dans divs correspondantes
	$("ul#liste-references li#references-bloc-vertical .container-next-img-references img").attr("src", "img/references/ref-"+nextRef+"/img-references-bloc-vertical.jpg");
	$("ul#liste-references li#references-bloc-big .container-next-img-references img").attr("src", "img/references/ref-"+nextRef+"/img-references-bloc-big.jpg");
	$("ul#liste-references li#references-bloc-horizontal-top .container-next-img-references img").attr("src", "img/references/ref-"+nextRef+"/img-references-bloc-horizontal-top.jpg");
	$("ul#liste-references li#references-bloc-horizontal-bottom .container-next-img-references img").attr("src", "img/references/ref-"+nextRef+"/img-references-bloc-horizontal-bottom.jpg");

	if (sens=="right"){
		// placer les images suivantes
		TweenMax.set($(".container-next-img-references"), {x: "-100%"});
		// animer les transitions
		TweenMax.staggerTo(".container-img-references", 0.5, {x: "100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(".container-next-img-references", 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiRefs, [nextRef]);
	}else if(sens=="left"){
		// placer les images suivantes
		TweenMax.set($(".container-next-img-references"), {x: "100%"});
		// animer les transitions
		TweenMax.staggerTo(".container-img-references", 0.5, {x: "-100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(".container-next-img-references", 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiRefs, [nextRef]);
	}
}

function completeTransiRefs(nextRef){
	// intervertir les class names
	$(".container-img-references").toggleClass('container-img-references container-next');
	$(".container-next-img-references").toggleClass('container-next-img-references container-img-references');
	$(".container-next").toggleClass('container-next container-next-img-references');
	currentRef=nextRef;
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var players = [];

function onYouTubeIframeAPIReady() {
	var nbVideos = $("ul#slider-videos li").length;
    //player1 = new YT.Player('player-1');
    //player2 = new YT.Player('player-2');
    
    for (var i = 1; i<=nbVideos; i++){
    	players[i] = new YT.Player("player-"+i);
    }
}

$("ul#liste-references li img").load(function(){
	posiImgsReferences();
});

// fonction pour masquer le bloc drapeaux
function blocDrapeauxInit(){
	heightBlocDrapeaux = $("#bloc-pays").height();
	TweenMax.set($("#bloc-pays"), {height: "0px"});
}

// fonction de transition d'apparition du bouton
function transiInButton(btnSelected){
	var tlTransiInBtn = new TimelineMax;
	tlTransiInBtn.to(btnSelected, 0.3, {opacity: "1", scaleY:1, ease:Circ.easeInOut});
	tlTransiInBtn.to(btnSelected, 1, {y: "0px", ease:Circ.easeInOut}, 0);
	tlTransiInBtn.to($(".txt-btn", btnSelected), 0.2, {opacity: "1", y: "0px", ease:Circ.easeInOut});
	tlTransiInBtn.to($(".triangle-btn", btnSelected), 0.2, {opacity: "1", x: "0px", y: "0px", ease:Circ.easeInOut, clearProps: "all"});
}

function initBtnAnim(){
	TweenMax.set($(".btn-anim"), {opacity: "0", scaleY:0, y: "180px"});
	TweenMax.set($(".btn-anim .txt-btn"), {opacity: "0", y: "-20px"});
	TweenMax.set($(".btn-anim .triangle-btn"), {opacity: "0", x: "-10px", y: "-10px"});
}

function initHeaderHome(){
	TweenMax.set($("h1"), {opacity: "0", y: "40px"});
	TweenMax.set($("#machine"), {opacity: "0", y: "40px"});
	TweenMax.set([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(2):before"), CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(3):before")], {cssRule: {opacity: "0", y: "180px"}});
	TweenMax.set([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(5):before"), CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(6):before")], {cssRule: {opacity: "0", y: "180px"}});
}

function animHeaderHome(){
	TweenMax.to($("h1"), 0.3, {opacity: "1", y: "0px", ease:Circ.easeInOut});
	TweenMax.to($("#machine"), 0.5, {opacity: "1", y: "0px", ease:Circ.easeInOut, delay: 0.3, onComplete: completeAnimMachine});
	TweenMax.to([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(2):before"), CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(3):before")], 1.2, {cssRule: {opacity: "1", y: "0px"}, ease:Circ.easeInOut, delay: 3.1});
	TweenMax.to([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(5):before"), CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(6):before")], 1.2, {cssRule: {opacity: "1", y: "0px"}, ease:Circ.easeInOut, delay: 5.1});
}

function completeAnimMachine(){
	setTimeout(function(){
		transiInButton($("a#btn-robots-rowa"));
		setTimeout(function(){
			transiInButton($("a#btn-contact"));
		}, 2000);
	}, 2000);
}

$(document).ready(function(){
	if($("body").hasClass("home")){
		initHeaderHome();
		setTimeout(function(){
			animHeaderHome();
		}, 1000);
	}

	initBtnAnim();
	TweenMax.set($("ul#slider-videos li#current-video"), {display: "block", x: "0"});
	TweenMax.set($("#img-bg-video-cover"), {x: "0%", y: "-50%"});
	TweenMax.set($("#next-img-bg-video-cover"), {x: "100%", y: "-50%"});
	// Clic sur le bouton play d'une video
	$("ul#slider-videos li a.video-cover").click(function() {
		if($(this).closest("li").attr("id")=="current-video"){
			// masquer le titre et le cover
			TweenMax.set($(this), {display: "none"});
			// lancer la video
			var numVideo = parseInt($("ul#slider-videos li#current-video .iframe-video").attr("id").match(pattern));
			players[numVideo].playVideo();
		}
		return false;
	});

	$("a#btn-right-video").click(function() {
		if(!TweenMax.isTweening($("ul#slider-videos li#current-video"))&&!TweenMax.isTweening($("ul#slider-videos li#next-video"))&&!TweenMax.isTweening($("#img-bg-video-cover"))&&!TweenMax.isTweening($("#next-img-bg-video-cover"))){
			nextVideo("right");
		}
		return false;
	});

	$("a#btn-left-video").click(function() {
		if(!TweenMax.isTweening($("ul#slider-videos li#current-video"))&&!TweenMax.isTweening($("ul#slider-videos li#next-video"))&&!TweenMax.isTweening($("#img-bg-video-cover"))&&!TweenMax.isTweening($("#next-img-bg-video-cover"))){
			nextVideo("left");
		}
		return false;
	});

	$("a#btn-right-references").click(function() {
		if(!TweenMax.isTweening($(".container-img-references"))&&!TweenMax.isTweening($(".container-next-img-references"))){
			// tester si il y a une référence suivante
			if((currentRef+1)<=nbRefs){
				// il y a une référence suivante
				nextRef = currentRef+1;
				animRefs(nextRef, "right");
			}else{
				// il n'y a pas de référence suivante
				nextRef = 1;
				animRefs(nextRef, "right");
			}
		}
		return false;
	});

	$("a#btn-left-references").click(function() {
		if(!TweenMax.isTweening($(".container-img-references"))&&!TweenMax.isTweening($(".container-next-img-references"))){
			// tester si il y a une référence précédante
			if((currentRef-1)>=1){
				// il y a une référence suivante
				nextRef = currentRef-1;
				animRefs(nextRef, "left");
			}else{
				// il n'y a pas de référence précédante
				nextRef = nbRefs;
				animRefs(nextRef, "left");
			}
		}
		return false;
	});

	blocDrapeauxInit();
	$("a#btn-arx-international").click(function() {
		if (!$("#bloc-pays").hasClass("open")){
			// Si le bloc drapeaux est fermé
			TweenMax.to($("#bloc-pays"), 0.5, {height: heightBlocDrapeaux+"px", className:"+=open", ease:Cubic.easeInOut});
		}else{
			// Si le bloc drapeaux est ouvert
			TweenMax.to($("#bloc-pays"), 0.5, {height: "0px", className:"-=open", ease:Cubic.easeInOut});
		}
		return false;
	});
	$("a#close-menu-pays").click(function() {
		TweenMax.to($("#bloc-pays"), 0.5, {height: "0px", className:"-=open", ease:Cubic.easeInOut});
		return false;
	});

	// bloc video hover
	$(".cadre-video-cover").each(function(){
		var parentCadre = $(this).parent();
		var widthParent = $(".video-txt", parentCadre).outerWidth();
		var heightParent = $(".video-txt", parentCadre).outerHeight();
		TweenMax.set($(this), {width: widthParent+"px", height: heightParent+"px"});
	});

	$("a.video-cover").hover(
	  function() {
	  	TweenMax.to($(".video-txt .video-title", this), 0.2, {opacity: "0", display: "none", ease:Cubic.easeInOut, onComplete: onCompleteVideoCover});
	  }, function() {
	  	TweenMax.to($(".video-txt .video-play", this), 0.2, {opacity: "0", display: "none", ease:Cubic.easeInOut, onComplete: onCompleteVideoCover2});
	  }
	);
});

function onCompleteVideoCover(){
	TweenMax.to($("li#current-video .video-txt .video-play"), 0.2, {display: "inline-block", opacity: "1", ease:Cubic.easeInOut});
	TweenMax.to($("li#current-video .cadre-video-cover"), 0.2, {width: "215px", height: "85px", ease:Cubic.easeInOut});
}

function onCompleteVideoCover2(){
	TweenMax.to($("li#current-video .video-txt .video-title"), 0.2, {display: "inline-block", opacity: "1", ease:Cubic.easeInOut});
	TweenMax.to($("li#current-video .cadre-video-cover"), 0.2, {width: $("li#current-video .video-txt").outerWidth()+"px", height: $("li#current-video .video-txt .video-title").outerHeight()+50+"px", ease:Cubic.easeInOut});
}

////////////
// scroll //
////////////


$(document).scroll(function() {
	myScroll = $(document).scrollTop();
	if (!$("html").hasClass("lt-ie9")) {
		if (myScroll>55) {
			if($("html").hasClass("no-touch")){
				$("header").addClass("on");
			}
		}else{
			if($("html").hasClass("no-touch")){
				$("header").removeClass("on");
			} 
		}
	}
	// parallaxe machine
	TweenMax.set($("#machine"), {y: (0-(myScroll*.25))+"px"});
});

$( window ).resize(function() {
	heightBlocDrapeaux = $("#bloc-pays").height();
});