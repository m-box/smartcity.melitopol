<?php
$tpl=file_get_contents("tpl/energo/energoch.html");
if ($id_user=="anon")
{
	$tpl=str_replace("{!admin_button!}"," ",$tpl);
	$tpl=str_replace("{!type_button!}"," ",$tpl);
	$tpl=str_replace("{!obj_button!}"," ",$tpl);
}
else
{
	if ($user_type=="1")
	{
		$tpl=str_replace("{!admin_button!}",'<a class="btn btn-warning pull-right" href=energoad.html>Внести данні</a>',$tpl);
		$tpl=str_replace("{!type_button!}",'<tr><td><button class="btn btn-primary pull-right" data-toggle=modal data-target=#myModal2>Додати новий тип</button></td></tr>',$tpl);
		$tpl=str_replace("{!obj_button!}",'<tr><td><button class="btn btn-primary pull-right" data-toggle=modal data-target=#Modal_add_obj>Додати об’єкт</button></td></tr>',$tpl);		
	}
	elseif ($user_type=="2")
	{
		$tpl=str_replace("{!admin_button!}",'<a class="btn btn-warning pull-right" href=energoad.html>Внести данні</a>',$tpl);
		$tpl=str_replace("{!type_button!}"," ",$tpl);
		$tpl=str_replace("{!obj_button!}"," ",$tpl);		
	}
	else
		{
		$tpl=str_replace("{!admin_button!}"," ",$tpl);
		$tpl=str_replace("{!type_button!}"," ",$tpl);
		$tpl=str_replace("{!obj_button!}"," ",$tpl);		
		}
}
print_r($tpl);
?>