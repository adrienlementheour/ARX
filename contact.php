<?php

$status = '';

$erreurNom = '';
$erreurPrenom = '';
$erreurMail = '';
$erreurTel = '';
$erreurMessage = '';
$erreurEnvoi = '';


$nom = isset($_POST['nom']) ? strip_tags($_POST['nom']) : '';
$prenom = isset($_POST['prenom']) ? strip_tags($_POST['prenom']) : '';
$mail = isset($_POST['mail']) ? strip_tags($_POST['mail']) : '';
$tel = isset($_POST['tel']) ? strip_tags($_POST['tel']) : '';
$type = isset($_POST['type']) ? strip_tags($_POST['type']) : '';
$poste = isset($_POST['poste']) ? strip_tags($_POST['poste']) : '';
$objet = isset($_POST['objet']) ? strip_tags($_POST['objet']) : '';
$message = isset($_POST['message']) ? strip_tags($_POST['message']) : '';


if(isset($_POST['submit'])) {
 	if(empty($nom)) {
 		$erreurNom = 'Le champ <strong>Nom</strong> est obligatoire';
 	}
 	if(empty($prenom)) {
 		$erreurPrenom = 'Le champ <strong>Prénom</strong> est obligatoire';
 	}
 	if(empty($mail)) {
 		$erreurMail = 'Le champ <strong>Email</strong> est obligatoire';
 	}
 	else{
 		if(!(filter_var($mail, FILTER_VALIDATE_EMAIL))) {
 			$erreurMail = 'Vérifiez votre adresse email';
 		}
 	}
 	if(empty($tel)) {
 		$erreurTel = 'Le champ <strong>Téléphone</strong> est obligatoire';
 	}else{
 		if (!(strlen($tel) == 10 && ctype_digit($tel))) {
 			$erreurTel = 'Vérifiez votre numéro de téléphone';
 		}
 	}
 	if(empty($message)) {
 		$erreurMessage = 'Le champ <strong>Message</strong> est obligatoire';
 	}

 	// MAIL DE DESTINATION //////////////////////////////////////
 	$mailto = ($type != 'Hopital') ? 'francois.legaud@arxinter.fr, info@arxinter.net' : 'info.hopital@arxinter.fr';

 	if($erreurNom == '' && $erreurPrenom == '' && $erreurMail == '' && $erreurTel == '' && $erreurMessage == ''){ 
 		$subject = $objet . " provenant de arxinter.fr";

 		$from = 'From: ' . $nom . ' ' . $prenom . '<' . $mail . '>';
 		$reply = 'Reply-To: ' . $mail;
 		$headers = $from . "\r\n" .
 				   $reply . "\r\n";

 		$content = 'De: ' . $nom .' ' . $prenom . "\r\n" .
 				   "Type d'établissement: " . $type . "\r\n" .
 				   'Fonction: ' . $poste . "\r\n\r\n" .
 				   'Coordonnées: ' . "\r\n" . $mail . "\r\n" . $tel . "\r\n\r\n\r\n" .
 				   'Message: ' . "\r\n\r\n" . $message;

 		$sent = mail($mailto, $subject, $content, $headers);

 		if($sent) {
 			$status = "succes";
 		}
 		else{ 
 			$status = "erreur"; 	
 			$erreurEnvoi = "Nous sommes désolé, une erreur est survenue. Votre message n'a pas pu être envoyé. Veuillez réessayer!";
 		}
 	}else{
 		$status = "erreur"; 
 	}
}

?>

<!DOCTYPE html>
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<html lang="fr">
	<head>
	  	<meta charset="utf-8">
	  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	  	<title>Nous contacter | ARX France</title>

	  	<meta name="description" content="Contactez-nous, nous nous ferons une joie de répondre à vos attentes.">
	  	<meta name="viewport" content="width=device-width,initial-scale=1">

	  	<link rel="stylesheet" href="css/libs/normalize.css">
	  	<link rel="stylesheet" href="css/style.css">

	  	<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
	  	<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
	  	<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
	  	<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
	  	<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
	  	<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
	  	<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
	  	<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
	  	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
	  	<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
	  	<link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
	  	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
	  	<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
	  	<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
	  	<link rel="manifest" href="/manifest.json">
	  	<meta name="msapplication-TileColor" content="#ffffff">
	  	<meta name="msapplication-TileImage" content="/mstile-144x144.png">
	  	<meta name="theme-color" content="#ffffff">

		<script src="js/libs/modernizr.js" type="text/javascript"></script>
	</head>

	<body class="contact arxFrance">
		<header>
			<div class="container">
				<a href="./" id="logo-arx"></a>
				<a id="menu-responsive" href="#"><span></span><span></span><span></span></a>
				<ul id="menu-header">
					<li>
						<a href="pharmacies.html" class="lien-pharmacies"><span class="bg-lien-header"></span><span class="bg-lien-header-on"></span><span class="txt-lien-header">Pharmacies</span></a>
					</li><li>
						<a href="hopitaux.html" class="lien-hopitaux"><span class="bg-lien-header"></span><span class="bg-lien-header-on"></span><span class="txt-lien-header">Hopitaux</span></a>
					</li><li class="active">
						<a href="a-propos.html" class="lien-arx"><span class="bg-lien-header"></span><span class="bg-lien-header-on"></span><span class="txt-lien-header">ARX France</span></a>
					</li><li id="contact-menu-header">
						<a href="contact.php" class="lien-contact"><span class="bg-lien-header"></span><span class="bg-lien-header-on"></span><span class="txt-lien-header">Nous contacter</span></a>
					</li>
				</ul>
			</div>
		</header>
		<div id="bloc-home">
			<div id="bg-bloc-home"></div>
			<ul class="bg-grid">
				<li class="col-bg-grid active bleu"></li><li class="col-bg-grid"></li><li class="col-bg-grid active blanc"></li><li class="col-bg-grid active bleu"></li><li class="col-bg-grid active blanc"></li><li class="col-bg-grid last-active last-bleu"></li>
			</ul>
			<div class="container">
				<div id="zone-titre-home">
					<h1 class="txt-blanc">Contactez-nous <br /><span class="txt-bleu">Nous nous ferons une joie de répondre à vos attentes</span></h1>
				</div>
			</div>
		</div>
		
		<div class="content" id="scrollContent">
			<ul class="bg-grid" data-sr="no reset">
				<li class="col-bg-grid active bleu"></li><li class="col-bg-grid active gris"></li><li class="col-bg-grid active gris"></li><li class="col-bg-grid active gris"></li><li class="col-bg-grid"></li><li class="col-bg-grid active gris"></li>
			</ul>
			<div class="container">
				<ul class="subMenuContact">
					<li>
						Contacts
						<ul class="infos">
							<li class="adress">
								La Petite Périche<br/>
								Route des Navrans<br/>
								72200 Bazouges sur le Loir
							</li>
							<li><span class="icon-tel"></span>(+33) 02 43 48 00 50</li>
							<li><span class="icon-fax"></span>(+33) 02 43 45 98 58</li>
							<li><span class="icon-mail"></span><a href="mailto:info@arxinter.net" title="Envoyer un e-mail">info@arxinter.net</a></li>
						</ul>
					</li><li>
						réseaux sociaux
						<ul class="rs">
							<li>
								<a href="#" title="ARX sur Twitter" class="icon-twitter"><span class="triangle-btn-social"></span></a>
							</li><li class="right">
								<a href="#" title="ARX sur Pinterest" class="icon-pinterest"><span class="triangle-btn-social"></span></a>
							</li><li class="center">
								<a href="#" title="ARX sur Facebook" class="icon-fb"><span class="triangle-btn-social"></span></a>
							</li><li>
								<a href="#" title="ARX sur YouTube" class="icon-youtube"><span class="triangle-btn-social"></span></a>
							</li><li class="right">
								<a href="#" title="ARX sur Google+" class="icon-google"><span class="triangle-btn-social"></span></a>
							</li>
						</ul>
					</li>
				</ul>
				<div class="paddingLeftBis paddingRight1">
					<p data-sr="enter top move 100px over 0.5s" class="fdBlanc col col3Bis light padBot padTop2 paddingLeft1">
						Afin de mieux vous répondre, nous vous invitons a remplir ce formulaire. Nous pourrons ainsi vous contacter, pas mail, ou par téléphone, et répondre précisémment à votre demande :
					</p>

					<form action="" method="POST" class="marginTop" id="form">
							<fieldset class="padTop <?php if($erreurNom != '') echo 'error'; ?>">
								<label for="nom">Nom <span>*</span></label>
								<input type="text" name="nom" id="nom" value="<?php echo $nom; ?>"/>
							</fieldset><fieldset class="padTop  <?php if($erreurPrenom != '') echo 'error'; ?>">
								<label for="prenom">Prénom <span>*</span></label>
								<input type="text" name="prenom" id="prenom" value="<?php echo $prenom; ?>"/>
							</fieldset><fieldset  class="<?php if($erreurMail != '') echo 'error'; ?>">
								<label for="mail">Email <span>*</span></label>
								<input type="email" name="mail" id="mail" value="<?php echo $mail; ?>"/>
							</fieldset><fieldset class="<?php if($erreurTel != '') echo 'error'; ?>">
								<label for="tel">Téléphone <span>*</span></label>
								<input type="text" name="tel" id="tel" value="<?php echo $tel; ?>"/>
							</fieldset><fieldset>
								<label for="type">Type d'établissement <span>*</span></label>
								<select name="type" id="type">
									<option value="Pharmacie">Pharmacie</option>
									<option value="Hopital">Hôpital</option>
									<option value="Répartiteur">Répartiteur</option>
									<option value="Autre">Autre</option>
								</select>
							</fieldset><fieldset>
								<label for="poste">Fonction</label>
								<input type="text" name="poste" id="poste" value="<?php echo $poste; ?>"/>
							</fieldset>
							<fieldset>
								<label for="objet">Objet de votre message <span>*</span></label>
								<select name="objet" id="objet">
									<option value="Demande de devis">Demande de devis</option>
									<option value="Demande d'informations">Demande d'informations</option>
								</select>
							</fieldset>
							<fieldset class="block  <?php if($erreurMessage != '') echo 'error'; ?>">
								<label for="message">Votre message <span>*</span></label>
								<textarea name="message" id="message"><?php if(!empty($message)) echo $message; ?></textarea>
							</fieldset>

							<button class="btn btn-bleu" name="submit">
								<h2>
									<span class="txt-btn"><strong>Envoyer</strong> votre message</span>
									<span class="triangle-btn" style=""></span>
								</h2>
							</button>
					</form>
					<p class="label"><span>*</span> Champs obligatoires</p>
				</div>
			</div>
		</div>

	    	<footer>
	    		<ul class="bg-grid">
	    			<li class="col-bg-grid"></li><li class="col-bg-grid active gris"></li><li class="col-bg-grid"></li><li class="col-bg-grid active gris"></li><li class="col-bg-grid"></li><li class="col-bg-grid active gris"></li>
	    		</ul>
	  		<div class="container">
	  			<ul id="menu-center-footer" data-sr>
	  				<li>&copy; 2015  ARX FRANCE</li>
	  				<li><a href="mentions-legales.html">Mentions légales</a></li>
	  				<li><a id="btn-arx-international" href="#">ARX à l'international</a></li>
	  			</ul>
	  		</div>
	  		<div id="bloc-pays">
	  			<div class="container small">
	  				<a id="close-menu-pays" class="icon-cross" href="#"></a>
	  				<ul id="menu-pays">
	  					<li>
	  						<a href="http://www.arxinter.net" target="_blank"><span class="drapeau uk"></span>UK</a>
	  					</li><li>
	  						<a href="http://www.arxinter.com" target="_blank"><span class="drapeau espagne"></span>España</a>
	  					</li><li>
	  						<a href="http://www.arxinter.be" target="_blank"><span class="drapeau belgique"></span>België <br />Belgique</a>
	  					</li><li>
	  						<a href="http://www.arxinter.ch" target="_blank"><span class="drapeau suisse"></span>Schweiz <br />Suisse</a>
	  					</li><li>
	  						<a href="http://www.rowa.de" target="_blank"><span class="drapeau allemagne"></span>Deutschland</a>
	  					</li>
	  				</ul>
	  			</div>
	  		</div>
	    </footer>
		<div id="menu-full">
			<div class="container">
				<a href="#" id="close-menu-responsive" class="icon-cross"></a>
				<ul id="menu-bottom-footer">
					<li class="col-menu-bottom-footer">
						<a href="pharmacies.html"><h3>Pharmacies</h3></a>
						<ul class="menu-categ-1">
							<li>
								<a href="rowa-smart-pharmacies.html">Rowa Smart</a>
							</li>
							<li>
								<a href="rowa-vmax-pharmacies.html">Rowa VMax</a><br />
								<span class="opts">Options</span>
								<ul class="menu-categ-2">
									<li>
										<a href="rowa-vmax-pharmacies.html?option=prologs">ProLogs</a>
									</li>
									<li>
										<a href="rowa-vmax-pharmacies.html?option=vmotion">Vmotion</a>
									</li>
									<li>
										<a href="rowa-vmax-pharmacies.html?option=refrigerateur">Frigo</a>
									</li>
									<li>
										<a href="rowa-vmax-pharmacies.html?option=tapis">2ème tapis d'entrée</a>
									</li>
									<li>
										<a href="rowa-vmax-pharmacies.html?option=homeopathie">Homéo</a>
									</li>
									<li>
										<a href="rowa-vmax-pharmacies.html?option=borne">Borne Visavia</a>
									</li>
								</ul>
							</li>
						</ul>
					</li><li class="col-menu-bottom-footer">
						<a href="hopitaux.html"><h3>Hopitaux</h3></a>
						<ul class="menu-categ-1">
							<li>
								<a href="rowa-vmax-hopitaux.html">Rowa VMax</a><br />
								<span class="opts">Options</span>
								<ul  class="menu-categ-2">
									<li>
										<a href="rowa-vmax-hopitaux.html?option=prologs">ProLogs</a>
									</li>
									<li>
										<a href="rowa-vmax-hopitaux.html?option=borne">Borne Visavia</a>
									</li>
									<li>
										<a href="rowa-vmax-hopitaux.html?option=frigo">Frigo</a>
									</li>
									<li>
										<a href="rowa-vmax-hopitaux.html?option=convoyage">Convoyage</a>
									</li>
									<li>
										<a href="rowa-vmax-hopitaux.html?option=multiples">Rowa Multiples</a>
									</li>
								</ul>
							</li>
							<li>
								<a href="armoire-pyxis.html">Armoire Pyxis</a>
							</li>
							<li>
								<a href="blispack-grisfols.html">BlisPack</a>
							</li>
						</ul>
					</li><li class="col-menu-bottom-footer">
						<a href="a-propos.html"><h3>ARX France</h3></a>
						<ul class="menu-categ-1">
							<li>
								<span class="no-link">À propos</span>
								<ul  class="menu-categ-2">
									<li>
										<a href="a-propos.html">ARX France</a>
									</li>
									<li>
										<a href="partenaires.html">Partenaires</a>
									</li>
								</ul>
							</li>
							<li>
								<span class="no-link">Services</span>
								<ul  class="menu-categ-2">
									<li>
										<a href="consultant.html">Consultants</a>
									</li>
									<li>
										<a href="installation.html">Installation</a>
									</li>
									<li>
										<a href="sav.html">S.A.V.</a>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>

		<?php 
			if($status != ''){
				echo '<div id="fdPop"><div id="popUpContact"><i class="icon-cross"></i>';
				if($status == 'succes'){
					echo '<span><strong>Merci !</strong></span><br/><span>Votre message a bien été envoyé. Il sera traité dans les plus bref délais.</span>';
				}else if($status == 'erreur'){
					if($erreurNom != '') echo '<span>'. $erreurNom . '</span><br/>';
					if($erreurPrenom != '') echo '<span>'. $erreurPrenom . '</span><br/>';
					if($erreurMail != '') echo '<span>'. $erreurMail . '</span><br/>';
					if($erreurTel != '') echo '<span>'. $erreurTel . '</span><br/>';
					if($erreurMessage != '') echo '<span>'. $erreurMessage . '</span><br/>';
					if($erreurEnvoi != '') echo '<span>'. $erreurEnvoi . '</span>';
				} 
				echo '</div></div>';
			}
		?>

		<!-- jQuery -->
		<script src="js/libs/jquery-1.11.1.min.js" type="text/javascript"></script>
		<!-- Tweens -->
		<script src="js/libs/greensock/TweenMax.min.js" type="text/javascript"></script>
		<script src="js/libs/greensock/TimelineMax.min.js" type="text/javascript"></script>
		<script src="js/libs/greensock/plugins/BezierPlugin.min.js" type="text/javascript"></script>
		<script src="js/libs/greensock/plugins/CSSRulePlugin.min.js" type="text/javascript"></script>
		<script src="js/libs/greensock/plugins/ScrollToPlugin.min.js" type="text/javascript"></script>
		<!-- scrollReveal -->
		<script src="js/libs/scrollReveal.min.js" type="text/javascript"></script>
		<script> 
			var config = {
				easing: 'hustle',
				move: '10px',
				over: '0.3s',
			    scale: { direction: 'up', power: '0%' },
			    reset: true,
			    vFactor: '0.50',
			    wait: '0.5s',
			    delay: 'onload'
			}
			window.sr = new scrollReveal( config );
		</script>
		<!-- imgLiquid -->
		<script src="js/libs/imgLiquid-min.js" type="text/javascript"></script>
		<!-- isMobile -->
		<script src="js/libs/isMobile.min.js" type="text/javascript"></script>
		
		<script src="js/script.js" type="text/javascript"></script>
		
		<script>
		 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		 })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		 ga('create', 'UA-15325634-1', 'auto');
		 ga('send', 'pageview');
		</script>
	</body>
</html>
