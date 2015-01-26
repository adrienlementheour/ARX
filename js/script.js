///////////////
// variables //
///////////////

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

// Create YouTube player(s) after the API code downloads.
var player1;
var player2;

function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('player-1');
    player2 = new YT.Player('player-2');
}

$("ul#liste-references li img").load(function(){
	posiImgsReferences();
});

$(document).ready(function(){
	// Clic sur le bouton play d'une video
	$("ul#slider-videos li#current-video a.video-cover").click(function() {
		// masquer le titre et le cover
		TweenMax.set($(this), {display: "none"});
		// lancer la video
		player1.playVideo();
		return false;
	});
	
	youtubeInit();
});

$( window ).resize(function() {

});