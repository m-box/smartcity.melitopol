<?php
session_start();
include("config.php");
include("lib/db_functions.php");
include("lib/route.php");
include("lib/privilege.php");

$route=route($_GET['article']); /* создаём объект с информацией о маршруте */

if(!isset($_SESSION['id']) || $_SESSION['id']=="") /* Если IP пользователя не совпадает с IP авторизации, присваиваем человеку статус Анон */
{$id_user="anon";}
else
{
$id_user=$_SESSION['id'];
$us=db_read("user",$id_user,"");
$user_type=$us['id_user_type'];
$ip=$us['ip_user'];
if($ip != $_SERVER['REMOTE_ADDR']) {$id_user="anon";}
}
/*if (db_rec("log","ip", $_SERVER['REMOTE_ADDR'], "get", mysql_real_escape_string(json_encode($_GET)), "post", mysql_real_escape_string(json_encode($_POST)))=="ok") {$log="ok";}*/
if ($_GET['article']=="" || !isset($_GET['article']))
{
	$user_panel = file_get_contents("tpl/index.html");
	print_r ($user_panel);
}
else
{
	if ($route['route_type']=="template_page") //в случае если пользователь запрашивает конкретную страницу
	{include($route['arg_str']);}
	elseif ($route['route_type']=="rest_api") //в случае если пользователь обращается к API
	{
		include ('lib/to_api.php');
		echo json_encode(to_api($route['arg_str'],$_POST['data'],$id_user));
	}
	elseif ($route['route_type']=="file") //в случае если пользователь обращаеться к файлу
	{

	}
	elseif ($route['route_type']=="redirect")	//в случае если пользователь обращаеться к маршруту с редиректом
	{
		
	}
	else {include('tpl/404.html');} //в случае если маршрут не обнаружен
}
?>