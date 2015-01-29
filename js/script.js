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

// Fonction pour initialiser l'iframe youtube avec l'api
function youtubeInit(){

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

$(document).ready(function(){
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

	youtubeInit();
});

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
});

$( window ).resize(function() {

});