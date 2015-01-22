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

$("ul#liste-references li img").load(function(){
	posiImgsReferences();
});

$(document).ready(function(){
	
});

$( window ).resize(function() {

});