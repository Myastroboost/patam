<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: *');
	header('Access-Control-Allow-Headers: *');

	$myFile = "magaa_optin.txt";
	$fh = fopen($myFile, 'a+') or die("can't open file");
	fwrite($fh, "\n");
	fwrite($fh, "Post Data:=>");
	$postValue = "";
	foreach ($_REQUEST as $key => $value) {
	    fwrite($fh, $key . ":" . $value . " || ");
	    $postValue .= $value . ",";
	}
	fclose($fh);

	class MP {
		static $auth_token 	= "uNDXNAIfb9iniDFMfFjwLe8o3qybg_XOkHu4Leigv6QwVC04ETjyMw";
		static $url_api 	= "http://api.maropost.com/accounts/1620/";
		function request($action, $endpoint, $dataArray) {
			$url = self::$url_api . $endpoint . ".json";
		  	$ch = curl_init();
		  	$dataArray['auth_token'] = self::$auth_token;
		  	$json = json_encode($dataArray);
		    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		    curl_setopt($ch, CURLOPT_MAXREDIRS, 10 );
		    curl_setopt($ch, CURLOPT_URL, $url);
		    switch($action){
		            case "POST":
		            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		            curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
		            break;
		        case "GET":
		            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
		            curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
		            break;
		        case "PUT":
		            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
		            curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
		            break;
		        case "DELETE":
		            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
		            curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
		            break;
		        default:
		            break;
		    }
		    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json','Accept: application/json'));
		    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
			$output = curl_exec($ch);
			//print_r($output);
		    curl_close($ch);
		}
	}

	$firstName 	= 	$_REQUEST['first_name'];
	$lastName 	= 	$_REQUEST['last_name'];
	$email 		= 	$_REQUEST['email'];
	// $listid 	= 	'61';
	$pageurl  	= 	'https://magaa.io/';
	$tag1 		= 	'magaa.io-newsletter-optin';
	$updatedTimeUtc = gmdate("Y-m-d\\TH:i:s\\Z");
	$mp 		= new MP;
	$contactData = [
		"contact" 	=> 	[
			"first_name"	=>	$firstName,
			"last_name"		=>	$lastName,
			"email" 		=>	$email,
			"custom_field"	=>	[
				"opt_source_drm"	=>	$pageurl,
				"updated" 			=> 	$updatedTimeUtc
			],
			"add_tags"		=>	[$tag1],
			"subscribe" 	=> 	"true"]];

	$newcontact = $mp->request('POST','lists/61/contacts',  $contactData);

	header("location:https://magaa.io/?optin=success");
?>