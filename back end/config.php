<?php
//ob_start("ob_gzhandler");
error_reporting(0);
session_start();

/* DATABASE CONFIGURATION */
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'healt495_admin');
define('DB_PASSWORD', '092104003');
define('DB_DATABASE', 'healt495_service');
define("SITE_KEY", '5976e98690c7d5476cf746315f6bdb9fff2f186481dbac5db4c62c03b6f23baf');


function getDB() {
	$dbhost=DB_SERVER;
	$dbuser=DB_USERNAME;
	$dbpass=DB_PASSWORD;
	$dbname=DB_DATABASE;
	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
	$mysqli->set_charset("utf8");
	return $mysqli;
}
/* DATABASE CONFIGURATION END */

/* API key encryption */
function apiToken($session_uid) {
	$key=md5(SITE_KEY.$session_uid);
	return hash('sha256', $key);
}

?>