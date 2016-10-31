<?php
if ($id_user=="anon")
	{include("404.html");}
else
	{$user_p=db_read("user",$id_user,"");
		if ($user_p['id_user_type']!=="1")
			{include("404.html");}
		else
			{include("energosad.html");}
}
?>