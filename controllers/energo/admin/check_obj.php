<?php
include ("lib/templater.php");
if ($user_type=="1")
{
	$obj_id=$route['arg'][0];
	$obj=db_read_if("object","id",$obj_id);

	if ($film!=="error")
		{
		$run=template_data("tpl/energo/admin/energosad.html","object",$obj[0]);

		print_r($run);
		}
	else 
		{	
		$run=file_get_contents("tpl/404.html");
		print_r($run);
		}
}
else
{
		$run=file_get_contents("tpl/login.html");
		print_r($run);	
}
?>