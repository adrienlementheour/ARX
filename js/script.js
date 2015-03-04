//////////////////////////
// variables à modifier //
//////////////////////////
// Nombre de références
var nbRefs = 3;
// Numéro d'étape du slider scroll
var etape = 1;
var indexPucesVision = 1;
var wheel;
var oldDate = new Date();
var scrollPos;

///////////////
// variables //
///////////////
var pattern = /[0-9]+/g;
var currentRef = 1;
var nextRef;
var currentDetailHome = 1;
var nextDetailHome;
var heightBlocDrapeaux;
var widthVisuLeftPharmacies;
var mouseWheelPreventDefault = true;

// TIMELINES
var tpsEtapeFondDetailHome = 0.1;
var tpsEtapeDetailHome = 0.1;
var tpsAnimBtnHalfVisu = 1;
var easeAnimBtnHalfVisu = Expo.easeOut;

// Scroll page Pharmacie
var isAnimating = false;
var numCurrentSlideScroll = 1;
var nbSlidesScroll = $("ul#slider-scroll li").length;
$("#zone-slider-scroll").bind('mousewheel DOMMouseScroll', zoneSliderScrollMouseWheel);

function zoneSliderScrollMouseWheel(event){
	//Normalize event wheel delta
	var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;
	if(delta < -1){
		// Scroll down
		nextSlideScroll(event);
	}else if(delta > 1){
		// Scroll up
		prevSlideScroll(event);
	}
	if(mouseWheelPreventDefault){
		event.preventDefault();
		//event.stopPropagation();
	}
	mouseWheelPreventDefault = true;
};

function slideScroll(numNext){
	if(!isAnimating){
		isAnimating = true;
		var currentSlideScroll = $("ul#slider-scroll li.active");
		var nextSlide = $("ul#slider-scroll li#slide-"+(numNext));
		var slideScrollPosition = nextSlide.offset().top;
		var slideScrollHeight = nextSlide.height();
		var windowHeight = $(window).height();
		// Arreter l'ancienne anim et jouer la nouvelle
		if ( typeof tableAnimScrollLoop[numCurrentSlideScroll-1] !== 'undefined'){
			tableAnimScrollLoop[numCurrentSlideScroll-1].pause();
		}
		if ( typeof tableAnimScroll[numCurrentSlideScroll-1] !== 'undefined'){
			tableAnimScroll[numCurrentSlideScroll-1].pause();
		}
		tableAnimScroll[numNext-1].restart();
		if ( typeof tableAnimScrollLoop[numNext-1] !== 'undefined'){
			tableAnimScrollLoop[numNext-1].kill();
		}
		if ( typeof tableAnimScrollLoop[numCurrentSlideScroll-1] !== 'undefined'){
			tableAnimScrollLoop[numCurrentSlideScroll-1].kill();
		}
		if (numCurrentSlideScroll<numNext){
			TweenMax.set($(".zone-txt-slider", nextSlide), {y: "300px"});
		}else if(numCurrentSlideScroll<numNext){
			TweenMax.set($(".zone-txt-slider", nextSlide), {y: "-300px"});
		}
		TweenMax.to(currentSlideScroll, 0.2, {opacity: "0", ease:Cubic.easeInOut});
		TweenMax.to(nextSlide, 0.2, {opacity: "1", ease:Cubic.easeInOut});
		TweenMax.to($(".zone-txt-slider", nextSlide), 0.4, {y: "0px", delay: 0.1, ease:Cubic.easeInOut});
		TweenMax.to(window, 0.6, {scrollTo: {y: slideScrollPosition-(windowHeight/2)+(slideScrollHeight/2)}, onComplete: completeAnimSlideScroll, onCompleteParams: [currentSlideScroll, nextSlide, numNext], ease:Cubic.easeInOut});
	}
}

function nextSlideScroll(event){
	// Si il y a une slide après
	if(numCurrentSlideScroll < nbSlidesScroll){
		if(!isAnimating){
			isAnimating = true;
			var currentSlideScroll = $("ul#slider-scroll li.active");
			var nextSlide = $("ul#slider-scroll li#slide-"+(numCurrentSlideScroll+1));
			var slideScrollPosition = nextSlide.offset().top;
			var slideScrollHeight = nextSlide.height();
			var windowHeight = $(window).height();
			// Arreter l'ancienne anim et jouer la nouvelle
			if ( typeof tableAnimScrollLoop[numCurrentSlideScroll-1] !== 'undefined'){
				tableAnimScrollLoop[numCurrentSlideScroll-1].pause();
			}
			if ( typeof tableAnimScroll[numCurrentSlideScroll-1] !== 'undefined'){
				tableAnimScroll[numCurrentSlideScroll-1].pause();
			}
			tableAnimScroll[numCurrentSlideScroll].restart();
			if ( typeof tableAnimScrollLoop[numCurrentSlideScroll] !== 'undefined'){
				tableAnimScrollLoop[numCurrentSlideScroll].kill();
			}
			if ( typeof tableAnimScrollLoop[numCurrentSlideScroll-1] !== 'undefined'){
				tableAnimScrollLoop[numCurrentSlideScroll-1].kill();
			}
			TweenMax.set($(".zone-txt-slider", nextSlide), {y: "300px"});
			TweenMax.to(currentSlideScroll, 0.2, {opacity: "0", ease:Cubic.easeInOut});
			TweenMax.to(nextSlide, 0.2, {opacity: "1", ease:Cubic.easeInOut});
			TweenMax.to($(".zone-txt-slider", nextSlide), 0.4, {y: "0px", delay: 0.1, ease:Cubic.easeInOut});
			TweenMax.to(window, 0.6, {scrollTo: {y: slideScrollPosition-(windowHeight/2)+(slideScrollHeight/2)}, onComplete: completeAnimNextSlideScroll, onCompleteParams: [currentSlideScroll, nextSlide], ease:Cubic.easeInOut});
		}
	}else{
		if(!isAnimating){
			mouseWheelPreventDefault = false;
		}
	}
}

function prevSlideScroll(event){
	// Si il y a une slide avant
	if(numCurrentSlideScroll > 1){
		if(!isAnimating){
			isAnimating = true;
			var currentSlideScroll = $("ul#slider-scroll li.active");
			var nextSlide = $("ul#slider-scroll li#slide-"+(numCurrentSlideScroll-1));
			var slideScrollPosition = nextSlide.offset().top;
			var slideScrollHeight = nextSlide.height();
			var windowHeight = $(window).height();
			// Arreter l'ancienne anim et jouer la nouvelle
			if ( typeof tableAnimScrollLoop[numCurrentSlideScroll-1] !== 'undefined'){
				tableAnimScrollLoop[numCurrentSlideScroll-1].pause();
			}
			if ( typeof tableAnimScroll[numCurrentSlideScroll-1] !== 'undefined'){
				tableAnimScroll[numCurrentSlideScroll-1].pause();
			}
			tableAnimScroll[numCurrentSlideScroll-2].restart();
			if ( typeof tableAnimScrollLoop[numCurrentSlideScroll-1] !== 'undefined'){
				tableAnimScrollLoop[numCurrentSlideScroll-1].kill();
			}
			if ( typeof tableAnimScrollLoop[numCurrentSlideScroll-2] !== 'undefined'){
				tableAnimScrollLoop[numCurrentSlideScroll-2].restart().pause();
			}
			TweenMax.set($(".zone-txt-slider", nextSlide), {y: "-300px"});
			TweenMax.to(currentSlideScroll, 0.2, {opacity: "0", ease:Cubic.easeInOut});
			TweenMax.to(nextSlide, 0.2, {opacity: "1", ease:Cubic.easeInOut});
			TweenMax.to($(".zone-txt-slider", nextSlide), 0.4, {y: "0px", delay: 0.15, ease:Cubic.easeInOut});
			TweenMax.to(window, 0.6, {scrollTo: {y: slideScrollPosition-(windowHeight/2)+(slideScrollHeight/2)}, onComplete: completeAnimPrevSlideScroll, onCompleteParams: [currentSlideScroll, nextSlide], ease:Cubic.easeInOut});
		}
	}else{
		if(!isAnimating){
			mouseWheelPreventDefault = false;
		}
	}
}

function completeAnimSlideScroll(oldActive, newActive, numNext){
	numCurrentSlideScroll=numNext;
	isAnimating = false;
	TweenMax.set(oldActive, {className:"-=active"});
	TweenMax.set(newActive, {className:"+=active"});
	TweenMax.set($("ul#slider-scroll-navigator li.active"), {className:"-=active"});
	TweenMax.set($("ul#slider-scroll-navigator li").eq(numNext-1), {className:"+=active"});
}

function completeAnimNextSlideScroll(oldActive, newActive){
	numCurrentSlideScroll++;
	isAnimating = false;
	TweenMax.set(oldActive, {className:"-=active"});
	TweenMax.set(newActive, {className:"+=active"});
	TweenMax.set($("ul#slider-scroll-navigator li").eq(numCurrentSlideScroll-2), {className:"-=active"});
	TweenMax.set($("ul#slider-scroll-navigator li").eq(numCurrentSlideScroll-1), {className:"+=active"});
}

function completeAnimPrevSlideScroll(oldActive, newActive){
	numCurrentSlideScroll--;
	isAnimating = false;
	TweenMax.set(oldActive, {className:"-=active"});
	TweenMax.set(newActive, {className:"+=active"});
	TweenMax.set($("ul#slider-scroll-navigator li").eq(numCurrentSlideScroll), {className:"-=active"});
	TweenMax.set($("ul#slider-scroll-navigator li").eq(numCurrentSlideScroll-1), {className:"+=active"});
}

var tableAnimScroll = [];
var tableAnimScrollLoop = [];
// Fonction pour préparer les anims en sprites du slider au scroll
function initSliderScroll(){
	for(var i=0;i<nbSlidesScroll;i++){
		// Première boucle
		var slideAnim = $("ul#slider-scroll li").eq(i);
		
		var frameWidth = 180, frameHeight = 250, numCols = 6, numRows = 6, numBoucle = 30, numTot = 37;
		var steppedEase = new SteppedEase(numCols-1);

		// Première boucle
		tableAnimScroll[i] = new TimelineMax({paused: true, onComplete: completeFirstLoop, onCompleteParams: [slideAnim, i]});
		for(var j=0;j<3;j++){
			tableAnimScroll[i].add(TweenMax.fromTo($(".zone-visu-txt-slider .visu-txt-slider", slideAnim), 0.3, { backgroundPosition:'0 -'+(frameHeight*j)+'px'}, { backgroundPosition: '-'+(frameWidth*(numCols-1))+'px -'+(frameHeight*j)+'px', ease:steppedEase}));
		}
	}

	// Lancer la première anim
	tableAnimScroll[0].play();
}

function completeFirstLoop(slideAnim, numAnim){
	var frameWidth = 180, frameHeight = 250, numCols = 6, numRows = 6, numBoucle = 30, numTot = 37;
	var steppedEase = new SteppedEase(numCols-1);
	tableAnimScrollLoop[numAnim] = new TimelineMax({repeat:-1});
	for(var i=3;i<numRows;i++){
		tableAnimScrollLoop[numAnim].add(TweenMax.fromTo($(".zone-visu-txt-slider .visu-txt-slider", slideAnim), 0.3, { backgroundPosition:'0 -'+(frameHeight*i)+'px'}, { backgroundPosition: '-'+(frameWidth*(numCols-1))+'px -'+(frameHeight*i)+'px', ease:steppedEase}));
	}
}

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

			TweenMax.to($("ul#slider-videos li#current-video"), 0.5, {x: "-100%", ease:Cubic.easeInOut});
			TweenMax.to($("ul#slider-videos li#next-video"), 0.5, {x: "0%", ease:Cubic.easeInOut});
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
			TweenMax.to($("ul#slider-videos li#current-video"), 0.5, {x: "100%", ease:Cubic.easeInOut});
			TweenMax.to($("ul#slider-videos li#next-video"), 0.5, {x: "0%", ease:Cubic.easeInOut});
		}

		// mettre à jour les IDs et src
		$("ul#slider-videos li#current-video").attr("id", "");
		$("ul#slider-videos li#next-video").attr("id", "current-video");

	}
}

function animRefs(nextRef, sens){
	// charger les images dans divs correspondantes
	$("ul#liste-references li#references-bloc-vertical .container-next-img-references img").attr("src", "img/references/ref-"+nextRef+"/img-references-bloc-vertical.jpg");
	$("ul#liste-references li#references-bloc-big .container-next-img-references img").attr("src", "img/references/ref-"+nextRef+"/img-references-bloc-big.jpg");
	$("ul#liste-references li#references-bloc-horizontal-top .container-next-img-references img").attr("src", "img/references/ref-"+nextRef+"/img-references-bloc-horizontal-top.jpg");
	$("ul#liste-references li#references-bloc-horizontal-bottom .container-next-img-references img").attr("src", "img/references/ref-"+nextRef+"/img-references-bloc-horizontal-bottom.jpg");
	$(".imgLiquidFill").imgLiquid();
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
	if ($("window").height()>=830){
		TweenMax.set($(".btn-anim"), {opacity: "0", scaleY:0, y: "180px"});
	}else{
		TweenMax.set($(".btn-anim"), {opacity: "0", scaleY:0, y: "130px"});
	}
	TweenMax.set($(".btn-anim .txt-btn"), {opacity: "0", y: "-20px"});
	TweenMax.set($(".btn-anim .triangle-btn"), {opacity: "0", x: "-10px", y: "-10px"});
}

function animHeaderHome(){
	TweenMax.to($("h1"), 0.3, {opacity: "1", y: "0px", ease:Circ.easeInOut});
	TweenMax.to($("#machine"), 0.5, {opacity: "1", y: "0px", ease:Circ.easeInOut, delay: 0.3, onComplete: completeAnimMachine});
	TweenMax.to([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(2):before"), CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(3):before")], 1.2, {cssRule: {opacity: "1", y: "0px"}, ease:Circ.easeInOut, delay: 1.5});
	TweenMax.to([CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(5):before"), CSSRulePlugin.getRule("#bloc-home ul.bg-grid li.col-bg-grid:nth-child(6):before")], 1.2, {cssRule: {opacity: "1", y: "0px"}, ease:Circ.easeInOut, delay: 2});
}

function completeAnimMachine(){
	setTimeout(function(){
		transiInButton($("a#btn-robots-rowa"));
		setTimeout(function(){
			transiInButton($("a#btn-contact"));
		}, 500);
	}, 500);
}

$(window).load(function() {
	if($("body").hasClass("home")){
		setTimeout(function(){
			animHeaderHome();
		}, 200);
	}
});

$(window).on('beforeunload', function(){
	if($("body").hasClass("categ")){
		$(window).scrollTop(0);
	}
});

$(document).ready(function(){
	if($("body").hasClass("categ")){
		initSliderScroll();
	}
	$(".imgLiquidFill").imgLiquid();

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
	var tlCoverLienVideo = new TimelineMax();
	$("a.video-cover").hover(
	  function() {
	  	tlCoverLienVideo.kill();
	  	tlCoverLienVideo = new TimelineMax();
	  	tlCoverLienVideo.to($(".video-txt .video-title", this), 0.2, {opacity: "0", display: "none", ease:Cubic.easeInOut});
	  	tlCoverLienVideo.to($("li#current-video .video-txt .video-play"), 0.2, {display: "inline-block", opacity: "1", ease:Cubic.easeInOut});
	  	tlCoverLienVideo.to($("li#current-video .cadre-video-cover"), 0.2, {width: "215px", height: "85px", ease:Cubic.easeInOut}, 0.2);
	  }, function() {
	  	tlCoverLienVideo.reverse();
	  }
	);
	TweenMax.set($("#masque-btn-half-visu"), {width: "50%)"});
	TweenMax.set($("#btn-visu-right"), {width: "50%"});
	$("a.btn-half-visu").hover(
	  function() {
	  	if($(this).is("#btn-visu-left")){
	        TweenMax.to($("#masque-btn-half-visu"), tpsAnimBtnHalfVisu, {width: "55%", ease:easeAnimBtnHalfVisu});
	        TweenMax.to($("#btn-visu-right"), tpsAnimBtnHalfVisu, {width: "47%", ease:easeAnimBtnHalfVisu});
	        TweenMax.set($(".btn-half-visu-small-left"), {className:"+=survol"});
	        TweenMax.to($("#btn-rowa-smart-pharmacies"), tpsAnimBtnHalfVisu, {x:"80px", ease:easeAnimBtnHalfVisu});
	        TweenMax.to($("#btn-rowa-vmax-pharmacies"), tpsAnimBtnHalfVisu, {x:"80px", ease:easeAnimBtnHalfVisu});
	        TweenMax.to($("#btn-visu-left .over-container-half-visu"), tpsAnimBtnHalfVisu, {opacity:"0", ease:easeAnimBtnHalfVisu});
	  	}else if($(this).is("#btn-visu-right")){
	  		TweenMax.to($("#masque-btn-half-visu"), tpsAnimBtnHalfVisu, {width: "45%", ease:easeAnimBtnHalfVisu});
	  		TweenMax.to($("#btn-visu-right"), tpsAnimBtnHalfVisu, {width: "57%", ease:easeAnimBtnHalfVisu});
	  		TweenMax.set($(".btn-half-visu-small-right"), {className:"+=survol"});
	  		TweenMax.to($("#btn-rowa-smart-pharmacies"), tpsAnimBtnHalfVisu, {x:"-80px", ease:easeAnimBtnHalfVisu});
	  		TweenMax.to($("#btn-rowa-vmax-pharmacies"), tpsAnimBtnHalfVisu, {x:"-80px", ease:easeAnimBtnHalfVisu});
	  		TweenMax.to($("#btn-visu-right .over-container-half-visu"), tpsAnimBtnHalfVisu, {opacity:"0.2", ease:easeAnimBtnHalfVisu});
	  	}
	  }, function() {
	  	TweenMax.to($("#masque-btn-half-visu"), tpsAnimBtnHalfVisu, {width: "50%", ease:easeAnimBtnHalfVisu});
	  	TweenMax.to($("#btn-visu-right"), tpsAnimBtnHalfVisu, {width: "50%", ease:easeAnimBtnHalfVisu});
	  	TweenMax.set($(".btn-half-visu-small-left"), {className:"-=survol"});
	  	TweenMax.set($(".btn-half-visu-small-right"), {className:"-=survol"});
	  	TweenMax.to($("#btn-rowa-smart-pharmacies"), tpsAnimBtnHalfVisu, {opacity: "1", x:"0", ease:easeAnimBtnHalfVisu});
	  	TweenMax.to($("#btn-rowa-vmax-pharmacies"), tpsAnimBtnHalfVisu, {opacity: "1", x:"0", ease:easeAnimBtnHalfVisu});
	  	TweenMax.to([$("#btn-visu-left .over-container-half-visu"), $("#btn-visu-right .over-container-half-visu")], tpsAnimBtnHalfVisu, {opacity:"0.5", ease:easeAnimBtnHalfVisu});
	  }
	);
	$("a#btn-rowa-vmax-pharmacies").hover(
	  function() {
        TweenMax.to($("#masque-btn-half-visu"), 0.2, {width: "calc(55% + 30px)", ease:Cubic.easeInOut});
        TweenMax.to($("#btn-visu-right"), 0.2, {width: "50%", ease:Cubic.easeInOut});
	  }, function() {
	  	TweenMax.to($("#masque-btn-half-visu"), 0.2, {width: "calc(50% + 30px)", ease:Cubic.easeInOut});
	  	TweenMax.to($("#btn-visu-right"), 0.2, {width: "55%", ease:Cubic.easeInOut});
	  }
	);
	$("a#btn-rowa-smart-pharmacies").hover(
	  function() {
        TweenMax.to($("#masque-btn-half-visu"), 0.2, {width: "calc(45% + 30px)", ease:Cubic.easeInOut});
        TweenMax.to($("#btn-visu-right"), 0.2, {width: "65%", ease:Cubic.easeInOut});
	  }, function() {
	  	TweenMax.to($("#masque-btn-half-visu"), 0.2, {width: "calc(50% + 30px)", ease:Cubic.easeInOut});
	  	TweenMax.to($("#btn-visu-right"), 0.2, {width: "55%", ease:Cubic.easeInOut});
	  }
	);
	$("a.btn-file").hover(
	  function() {
        animBtnFile($(this));
	  }, function() {
	  	animBtnFileRetour($(this));
	  }
	);
	$("a#btn-options").click(function() {
		openOptions("openTitleOptions");
		return false;
	});
	$("a.btn-detail-home").click(function() {
		openDetailHome($(this));
		return false;
	});
	$("a#btn-close-carousel-home").click(function() {
		closeDetailHome();
		return false;
	});
	$("a#btn-right-carousel-home").click(function() {
		if(!TweenMax.isTweening($("ul#carousel-img-home li"))&&!TweenMax.isTweening($("ul#carousel-txt-home li"))){
			animCarouselHome("right");
		}
		return false;
	});
	$("a#btn-close-bloc-options").click(function() {
		if($("body").hasClass("detail-option")){
			closeDetailOption("all");
		}else if($("body").hasClass("options")){
			closeOptions("all");
		}
		return false;
	});
	$("a#btn-close-detail-option").click(function() {
		closeDetailOption();
		return false;
	});
	$("a#btn-left-carousel-home").click(function() {
		if(!TweenMax.isTweening($("ul#carousel-img-home li"))&&!TweenMax.isTweening($("ul#carousel-txt-home li"))){
			animCarouselHome("left");
		}
		return false;
	});
	$("a#btn-right-options").click(function() {
		if(!TweenMax.isTweening($("ul#carousel-img-options li"))&&!TweenMax.isTweening($("ul#carousel-txt-options li"))){
			animCarouselOptions("right");
		}
		return false;
	});
	$("a#btn-left-options").click(function() {
		if(!TweenMax.isTweening($("ul#carousel-img-options li"))&&!TweenMax.isTweening($("ul#carousel-txt-options li"))){
			animCarouselOptions("left");
		}
		return false;
	});
	$("ul#liste-options-pharmacies li a").click(function() {
		openDetailOption($(this));
		return false;
	});
	// Click sur les puces du slider scroll
	$("ul#slider-scroll-navigator li a").click(function() {
		slideScroll($(this).parent().index()+1);
		return false;
	});
});

function animCarouselHome(sens){
	var indexDetailHomeActive = $("ul#carousel-img-home li.active").index("ul#carousel-img-home li")+1;
	var nbDetailsHome = $("ul#carousel-img-home li").length;
	if(sens=="right"){
		// tester si il y a un detail suivant
		if((indexDetailHomeActive+1)<=nbDetailsHome){
			// il y a un detail suivant
			var nextDetailHomeImg = $("ul#carousel-img-home li").eq(indexDetailHomeActive);
			var nextDetailHomeTxt = $("ul#carousel-txt-home li").eq(indexDetailHomeActive);
			var nextDetailTitle = $("ul#container-titles-carousel-home li").eq(indexDetailHomeActive);
		}else{
			// il n'y a pas de detail suivant
			// il y a un detail suivant
			var nextDetailHomeImg = $("ul#carousel-img-home li").eq(0);
			var nextDetailHomeTxt = $("ul#carousel-txt-home li").eq(0);
			var nextDetailTitle = $("ul#container-titles-carousel-home li").eq(0);
		}
		// placer l'image et le texte suivant
		TweenMax.set(nextDetailHomeImg, {x: "-100%"});
		TweenMax.set(nextDetailHomeTxt, {x: "-100%"});
		TweenMax.set(nextDetailTitle, {x: "0"});
		TweenMax.set($(".container-title-carousel-home", nextDetailTitle), {x: "-100%"});
		TweenMax.set($(".container-fond-title-carousel-home", nextDetailTitle), {x: "-100%"});
		// animer les transitions
		var tlAnimNextDetailHome = new TimelineMax();
		tlAnimNextDetailHome.to($("ul#container-titles-carousel-home li.active .container-title-carousel-home"), 0.2, {x: "100%", ease:Cubic.easeInOut});
		tlAnimNextDetailHome.to($("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home"), 0.2, {x: "100%", ease:Cubic.easeInOut, onComplete: completeTransiTitleCarouselHome, onCompleteParams:[nextDetailTitle]});
		tlAnimNextDetailHome.to($(".container-fond-title-carousel-home", nextDetailTitle), 0.2, {x: "0%", ease:Cubic.easeInOut});
		tlAnimNextDetailHome.to($(".container-title-carousel-home", nextDetailTitle), 0.2, {x: "0%", ease:Cubic.easeInOut});

		TweenMax.staggerTo($("ul#carousel-img-home li.active"), 0.5, {x: "100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(nextDetailHomeImg, 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiCarouselHome, [nextDetailHomeImg, nextDetailHomeTxt]);
		TweenMax.staggerTo($("ul#carousel-txt-home li.active"), 0.5, {x: "100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(nextDetailHomeTxt, 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiCarouselHome, [nextDetailHomeImg, nextDetailHomeTxt]);
	}else if(sens=="left"){
		// tester si il y a un detail précédent
		if((indexDetailHomeActive-1)>=1){
			// il y a un detail précédent
			var nextDetailHomeImg = $("ul#carousel-img-home li").eq(indexDetailHomeActive-2);
			var nextDetailHomeTxt = $("ul#carousel-txt-home li").eq(indexDetailHomeActive-2);
			var nextDetailTitle = $("ul#container-titles-carousel-home li").eq(indexDetailHomeActive-2);
		}else{
			// il n'y a pas de detail précédent
			var nextDetailHomeImg = $("ul#carousel-img-home li").eq(nbDetailsHome-1);
			var nextDetailHomeTxt = $("ul#carousel-txt-home li").eq(nbDetailsHome-1);
			var nextDetailTitle = $("ul#container-titles-carousel-home li").eq(nbDetailsHome-1);
		}
		// placer l'image et le texte précédent
		TweenMax.set(nextDetailHomeImg, {x: "100%"});
		TweenMax.set(nextDetailHomeTxt, {x: "100%"});
		TweenMax.set(nextDetailTitle, {x: "0"});
		TweenMax.set($(".container-title-carousel-home", nextDetailTitle), {x: "100%"});
		TweenMax.set($(".container-fond-title-carousel-home", nextDetailTitle), {x: "100%"});
		// animer les transitions
		var tlAnimNextDetailHome = new TimelineMax();
		tlAnimNextDetailHome.to($("ul#container-titles-carousel-home li.active .container-title-carousel-home"), 0.2, {x: "-100%", ease:Cubic.easeInOut});
		tlAnimNextDetailHome.to($("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home"), 0.2, {x: "-100%", ease:Cubic.easeInOut, onComplete: completeTransiTitleCarouselHome, onCompleteParams:[nextDetailTitle]});
		tlAnimNextDetailHome.to($(".container-fond-title-carousel-home", nextDetailTitle), 0.2, {x: "0%", ease:Cubic.easeInOut});
		tlAnimNextDetailHome.to($(".container-title-carousel-home", nextDetailTitle), 0.2, {x: "0%", ease:Cubic.easeInOut});

		TweenMax.staggerTo($("ul#carousel-img-home li.active"), 0.5, {x: "-100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(nextDetailHomeImg, 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiCarouselHome, [nextDetailHomeImg, nextDetailHomeTxt]);
		TweenMax.staggerTo($("ul#carousel-txt-home li.active"), 0.5, {x: "-100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(nextDetailHomeTxt, 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiCarouselHome, [nextDetailHomeImg, nextDetailHomeTxt]);
	}
}

function completeTransiTitleCarouselHome(nextDetailTitle){
	// intervertir les class names
	TweenMax.set($("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home"), {clearProps:"all"});
	TweenMax.set($("ul#container-titles-carousel-home li.active .container-title-carousel-home"), {clearProps:"all"});
	TweenMax.set($("ul#container-titles-carousel-home li.active"), {className:"-=active", clearProps:"all"});
	TweenMax.set(nextDetailTitle, {className:"+=active", clearProps:"all"});
}

function completeTransiCarouselHome(nextDetailHomeImg, nextDetailHomeTxt){
	// intervertir les class names
	TweenMax.set($("ul#carousel-img-home li.active"), {className:"-=active", clearProps:"all"});
	TweenMax.set($("ul#carousel-txt-home li.active"), {className:"-=active", clearProps:"all"});
	TweenMax.set(nextDetailHomeImg, {className:"+=active", clearProps:"all"});
	TweenMax.set(nextDetailHomeTxt, {className:"+=active", clearProps:"all"});
}

function animCarouselOptions(sens){
	var indexDetailOptionsActive = $("ul#carousel-img-options li.active").index("ul#carousel-img-options li")+1;
	var nbOptions = $("ul#carousel-img-options li").length;
	if(sens=="right"){
		// tester si il y a un detail suivant
		if((indexDetailOptionsActive+1)<=nbOptions){
			// il y a un detail suivant
			var nextOptionImg = $("ul#carousel-img-options li").eq(indexDetailOptionsActive);
			var nextOptionTxt = $("ul#carousel-txt-options li").eq(indexDetailOptionsActive);
		}else{
			// il n'y a pas de detail suivant
			// il y a un detail suivant
			var nextOptionImg = $("ul#carousel-img-options li").eq(0);
			var nextOptionTxt = $("ul#carousel-txt-options li").eq(0);
		}
		// placer l'image et le texte suivant
		TweenMax.set(nextOptionImg, {x: "-100%"});
		TweenMax.set(nextOptionTxt, {x: "-100%"});
		// animer les transitions
		TweenMax.staggerTo($("ul#carousel-img-options li.active"), 0.5, {x: "100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(nextOptionImg, 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiCarouselOptions, [nextOptionImg, nextOptionTxt]);
		TweenMax.staggerTo($("ul#carousel-txt-options li.active"), 0.5, {x: "100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(nextOptionTxt, 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiCarouselOptions, [nextOptionImg, nextOptionTxt]);
	}else if(sens=="left"){
		// tester si il y a un detail précédent
		if((indexDetailOptionsActive-1)>=1){
			// il y a un detail précédent
			var nextOptionImg = $("ul#carousel-img-options li").eq(indexDetailOptionsActive-2);
			var nextOptionTxt = $("ul#carousel-txt-options li").eq(indexDetailOptionsActive-2);
		}else{
			// il n'y a pas de detail précédent
			var nextOptionImg = $("ul#carousel-img-options li").eq(nbOptions-1);
			var nextOptionTxt = $("ul#carousel-txt-options li").eq(nbOptions-1);
		}
		// placer l'image et le texte précédent
		TweenMax.set(nextOptionImg, {x: "100%"});
		TweenMax.set(nextOptionTxt, {x: "100%"});
		// animer les transitions
		TweenMax.staggerTo($("ul#carousel-img-options li.active"), 0.5, {x: "-100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(nextOptionImg, 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiCarouselOptions, [nextOptionImg, nextOptionTxt]);
		TweenMax.staggerTo($("ul#carousel-txt-options li.active"), 0.5, {x: "-100%", ease:Cubic.easeInOut}, 0.1);
		TweenMax.staggerTo(nextOptionTxt, 0.5, {x: "0%", ease:Cubic.easeInOut}, 0.1, completeTransiCarouselOptions, [nextOptionImg, nextOptionTxt]);
	}
}

function completeTransiCarouselOptions(nextOptionImg, nextOptionTxt){
	// intervertir les class names
	TweenMax.set($("ul#carousel-img-options li.active"), {className:"-=active", clearProps:"all"});
	TweenMax.set($("ul#carousel-txt-options li.active"), {className:"-=active", clearProps:"all"});
	TweenMax.set(nextOptionImg, {className:"+=active", clearProps:"all"});
	TweenMax.set(nextOptionTxt, {className:"+=active", clearProps:"all"});
}

function openDetailHome(btnDetailClic){
	// Ajouter classe body
	TweenMax.set($("body"), {className:"+=detail-home"});
	// Récupérer l'index de l'élément cliqué
	var btnDetailHomeIndex = btnDetailClic.index(".btn-detail-home");
	// Enlever l'image et le texte actuels du carousel
	TweenMax.set($("ul#carousel-img-home li.active"), {className:"-=active"});
	TweenMax.set($("ul#carousel-txt-home li.active"), {className:"-=active"});
	// Afficher la bonne image et le bon texte dans le carousel
	TweenMax.set($("ul#carousel-img-home li").eq(btnDetailHomeIndex), {className:"+=active"});
	TweenMax.set($("ul#carousel-txt-home li").eq(btnDetailHomeIndex), {className:"+=active"});
	// Afficher le bon titre dans le carousel
	TweenMax.set($("ul#container-titles-carousel-home li.active"), {className:"-=active"});
	TweenMax.set($("ul#container-titles-carousel-home li").eq(btnDetailHomeIndex), {className:"+=active"});

	var tlBlocDetailHome = new TimelineMax();
	//Fermer les btn detail home
	tlBlocDetailHome.staggerTo("a.btn-detail-home .container-btn-anim", tpsEtapeDetailHome, {x: "100%", ease:Cubic.easeIn}, 0.08);
	tlBlocDetailHome.staggerTo("a.btn-detail-home .container-fond-btn-anim", tpsEtapeDetailHome, {x: "100%", ease:Cubic.easeIn}, 0.08);
	tlBlocDetailHome.set($("a.btn-detail-home"), {display: "none"});
	//Afficher les carousels
	tlBlocDetailHome.set($("#bloc-detail-home"), {className:"+=detail-home-open"});
	tlBlocDetailHome.to($(".masque-bloc-detail-home"), tpsEtapeFondDetailHome, {width: "100%", ease:Cubic.easeIn});
	tlBlocDetailHome.staggerTo(".container-anim-inte-bloc-detail-home", tpsEtapeDetailHome, {width: "100%", ease:Cubic.easeIn}, 0.1);
	tlBlocDetailHome.staggerTo(".container-inte-bloc-detail-home .masque-carousel", tpsEtapeDetailHome, {width: "0%", ease:Cubic.easeIn}, 0.1);
	tlBlocDetailHome.staggerTo("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home", tpsEtapeDetailHome, {x: "0%", ease:Cubic.easeIn}, 0.1);
	tlBlocDetailHome.staggerTo("ul#container-titles-carousel-home li.active .container-title-carousel-home", tpsEtapeDetailHome, {x: "0%", ease:Cubic.easeIn}, 0.1);
}

function closeDetailHome(){
	// Supprimer classe body
	TweenMax.set($("body"), {className:"-=detail-home"});
	//Fermer les carousels
	var tlCloseBlocDetailHome = new TimelineMax();
	tlCloseBlocDetailHome.staggerTo("ul#container-titles-carousel-home li.active .container-title-carousel-home", tpsEtapeDetailHome, {x: "-100%", ease:Cubic.easeIn}, 0.1);
	tlCloseBlocDetailHome.staggerTo("ul#container-titles-carousel-home li.active .container-fond-title-carousel-home", tpsEtapeDetailHome, {x: "-100%", ease:Cubic.easeIn}, 0.1);
	tlCloseBlocDetailHome.staggerTo(".container-inte-bloc-detail-home .masque-carousel", tpsEtapeDetailHome, {width: "100%", ease:Cubic.easeOut}, 0.1);
	tlCloseBlocDetailHome.to(".container-anim-inte-bloc-detail-home", tpsEtapeDetailHome, {width: "0", ease:Cubic.easeOut});
	tlCloseBlocDetailHome.to($(".masque-bloc-detail-home"), tpsEtapeFondDetailHome, {width: "0%", ease:Cubic.easeOut});
	tlCloseBlocDetailHome.set($("#bloc-detail-home"), {className:"-=detail-home-open"});
	TweenMax.set($("ul#carousel-img-home li"), {clearProps:"all"});
	TweenMax.set($("ul#carousel-txt-home li"), {clearProps:"all"});
	//ouvrir les btn detail home
	tlCloseBlocDetailHome.set($("a.btn-detail-home"), {display: "block"});
	tlCloseBlocDetailHome.staggerTo("a.btn-detail-home .container-fond-btn-anim", tpsEtapeDetailHome, {x: "0%", ease:Cubic.easeIn}, 0.08);
	tlCloseBlocDetailHome.staggerTo("a.btn-detail-home .container-btn-anim", tpsEtapeDetailHome, {x: "0%", ease:Cubic.easeIn}, 0.08);
}

function closeBlocOptions(){
	var tlCloseBlocOptions = new TimelineMax();
	// Ou ferme le bloc titre des options "Adaptez les performances à vos besoins"
	TweenMax.to($("#txt-bloc-options-title"), 0.2, {opacity: 0, y: "20px"});
	TweenMax.to($("#btn-close-bloc-options"), 0.2, {opacity: 0});
	TweenMax.to($("#bloc-options-title"), 0.4, {className:"-=open", delay: 0.4});
	tlCloseBlocOptions.set($("#btn-close-bloc-options"), {display: "none"});

	// On ferme le bloc des options
	tlCloseBlocOptions.to($("#bloc-content-options"), 0.3, {opacity: "0"});
	tlCloseBlocOptions.to($("#bloc-options"), 0.3, {height: "0px"});
	// On ouvre le bouton 'Les options'
	tlCloseBlocOptions.to($("a#btn-options .container-fond-btn-anim"), 0.2, {x:"0%"});
	tlCloseBlocOptions.to($("a#btn-options .container-btn-anim"), 0.2, {x: "0%"});
}

function openOptions(titleOption){
	// Ajouter classe body
	TweenMax.set($("body"), {className:"+=options"});
	// Si il y a un détail home, le fermer
	if($("body").hasClass("detail-home")){
		closeDetailHome();
	}
	if(titleOption=="openTitleOptions"){
		// Scroll jusqu'aux options
		TweenMax.delayedCall(0.1, function(){
			TweenMax.to(window, 1, {scrollTo:{y:($("#bloc-content-options").offset().top-260)}});
		});
	}
	TweenMax.set($("#btn-close-bloc-options"), {display: "block"});
	var tlBlocOptionsTitle = new TimelineMax();
	// On ouvre le bloc des options
	tlBlocOptionsTitle.to($("#bloc-options"), 0.3, {height: $("#bloc-content-options").height()+"px"});
	tlBlocOptionsTitle.set($("#bloc-content-options"), {opacity: "1"});
	if(titleOption=="openTitleOptions"){
		// On ferme le bouton "Les options"
		tlBlocOptionsTitle.to($("a#btn-options .container-btn-anim"), 0.2, {x: "-100%"});
		tlBlocOptionsTitle.to($("a#btn-options .container-fond-btn-anim"), 0.2, {x: "-100%"});
		// Ou ouvre le bloc titre des options "Adaptez les performances à vos besoins"
		tlBlocOptionsTitle.to($("#bloc-options-title"), 0.3, {className:"+=open"});
		tlBlocOptionsTitle.to($("#txt-bloc-options-title"), 0.2, {opacity: 1, y: 0});
		tlBlocOptionsTitle.to($("#btn-close-bloc-options"), 0.2, {opacity: 1});
	}
	// On ouvre les différentes options
	tlBlocOptionsTitle.staggerTo(".masque-content-options", 0.2, {width: "0", ease:Cubic.easeOut}, 0.1);
}

function closeOptions(closeAll){
	// Enlève la classe body
	TweenMax.set($("body"), {className:"-=options"});
	// On ferme les différentes options
	var tlCloseOptions = new TimelineMax();
	if(closeAll=="all"){
		tlCloseOptions.staggerTo(".masque-content-options", 0.2, {width: "100%", ease:Cubic.easeOut, onComplete: closeBlocOptions}, 0.1);
		// On ouvre le bouton "Les options"
		tlCloseOptions.to($("a#btn-options .container-fond-btn-anim"), 0.2, {x:"0%"});
		tlCloseOptions.to($("a#btn-options .container-btn-anim"), 0.2, {x: "0%"});
	}else{
		tlCloseOptions.staggerTo(".masque-content-options", 0.2, {width: "100%", ease:Cubic.easeOut}, 0.1);
	}
}

function openDetailOption(btnOptionClic){
	// Ajouter classe body
	TweenMax.set($("body"), {className:"+=detail-option"});
	// Récupérer l'index de l'élément cliqué
	var btnDetailOptionIndex = btnOptionClic.index("ul#liste-options-pharmacies li a");
	// Enlever l'image et le texte actuels du carousel
	TweenMax.set($("ul#carousel-img-options li.active"), {className:"-=active"});
	TweenMax.set($("ul#carousel-txt-options li.active"), {className:"-=active"});
	// Afficher la bonne image et le bon texte dans le carousel
	TweenMax.set($("ul#carousel-img-options li").eq(btnDetailOptionIndex), {className:"+=active"});
	TweenMax.set($("ul#carousel-txt-options li").eq(btnDetailOptionIndex), {className:"+=active"});
	// Masquer les options
	closeOptions();
	// Ouvrir un détail option
	var tlDetailOption = new TimelineMax();
	tlDetailOption.to($("#bloc-options"), 0.3, {height: $("#bloc-content-detail-options").height()+"px"});
	tlDetailOption.set($("#bloc-content-detail-options"), {display: "block", opacity: "1"});
	tlDetailOption.to($("a#btn-close-bloc-options"), 0.2,{opacity: "0", display: "none", ease:Cubic.easeOut});
	tlDetailOption.staggerTo(".masque-content-detail-options", 0.2, {width: "0", ease:Cubic.easeOut}, 0.1);
}

function closeDetailOption(closeAll){
	// Enlever la classe body
	TweenMax.set($("body"), {className:"-=detail-option"});
	// On ferme le detail option
	var tlCloseDetailOption = new TimelineMax();
	if(closeAll=="all"){
		tlCloseDetailOption.staggerTo(".masque-content-detail-options", 0.2, {width: "100%", ease:Cubic.easeOut}, 0.1);
		tlCloseDetailOption.set($("ul#container-carousel-img-options li"), {clearProps:"all"});
		tlCloseDetailOption.set($("ul#carousel-txt-options li"), {clearProps:"all"});
		tlCloseDetailOption.to($("a#btn-close-bloc-options"), 0.2,{opacity: "1", display: "block", ease:Cubic.easeOut});
		tlCloseDetailOption.set($("#bloc-content-detail-options"), {display: "none", opacity: "0", onComplete: closeBlocOptions});
	}else{
		tlCloseDetailOption.staggerTo(".masque-content-detail-options", 0.2, {width: "100%", ease:Cubic.easeOut}, 0.1);
		tlCloseDetailOption.set($("ul#container-carousel-img-options li"), {clearProps:"all"});
		tlCloseDetailOption.set($("ul#carousel-txt-options li"), {clearProps:"all"});
		tlCloseDetailOption.to($("a#btn-close-bloc-options"), 0.2,{opacity: "1", display: "block", ease:Cubic.easeOut});
		tlCloseDetailOption.set($("#bloc-content-detail-options"), {display: "none", opacity: "0", onComplete: openOptions});
	}
}

var tlBtnFile1 = new TimelineMax();
var tlBtnFile2 = new TimelineMax();
function animBtnFile(btnFile){
	var frameWidthBtnFile = 37, frameHeightBtnFile = 40, numColsBtnFile = 3, numRowsBtnFile = 3;
	var steppedEaseBtnFile = new SteppedEase(numColsBtnFile-1);
	var indexBtnSurvol = btnFile.index("ul#liste-btn-home li a.btn-file");
	tlBtnFile1 = new TimelineMax();
	tlBtnFile2 = new TimelineMax();
	if(indexBtnSurvol==0){
		for(var i=0;i<numRowsBtnFile;i++){
		    tlBtnFile1.add(TweenMax.fromTo($(".sprite-btn-file", btnFile), 0.05, { backgroundPosition:'0 -'+(frameHeightBtnFile*i)+'px'}, { backgroundPosition: '-'+(frameWidthBtnFile*(numColsBtnFile-1))+'px -'+(frameHeightBtnFile*i)+'px', ease:steppedEaseBtnFile} ));
		}
	}else if(indexBtnSurvol==1){
		for(var i=0;i<numRowsBtnFile;i++){
		    tlBtnFile2.add(TweenMax.fromTo($(".sprite-btn-file", btnFile), 0.05, { backgroundPosition:'0 -'+(frameHeightBtnFile*i)+'px'}, { backgroundPosition: '-'+(frameWidthBtnFile*(numColsBtnFile-1))+'px -'+(frameHeightBtnFile*i)+'px', ease:steppedEaseBtnFile} ));
		}
	}
}

function animBtnFileRetour(btnFile){
	var indexBtnSurvol = btnFile.index("ul#liste-btn-home li a.btn-file");
	if(indexBtnSurvol==0){
		tlBtnFile1.reverse();
	}else if(indexBtnSurvol==1){
		tlBtnFile2.reverse();
	}
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
	if($("body").hasClass("categ")){
		setSliderScrollNavigator(myScroll);
	}
	// parallaxe machine
	TweenMax.set($("#machine"), {y: (0-(myScroll*.25))+"px"});
});

function setSliderScrollNavigator(myScroll){
	if((myScroll >= ($("ul#slider-scroll").offset().top)-280) && (myScroll <= ($("ul#slider-scroll").offset().top)+($("ul#slider-scroll").height()-600))){
		TweenMax.set($("ul#slider-scroll-navigator"), {opacity: "1"});
	}else{
		TweenMax.set($("ul#slider-scroll-navigator"), {opacity: "0"});
	}
}

$( window ).resize(function() {
	heightBlocDrapeaux = $("#bloc-pays").height();
});