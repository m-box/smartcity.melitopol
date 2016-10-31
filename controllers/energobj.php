<?php
if ($id_user=="anon")
	{include("404.html");}
else
	{$user_p=db_read("user",$id_user,"");
		if ($user_p['id_user_type']!=="1")
			{include("404.html");}
		else
			{
				if ($_GET['id']=='' || !isset($_GET['id']))
				{
					include("404.html");
				}
				else
				{ $object=db_read("object",$_GET['id']);
					if (count($object)<1)
					{
						include("404.html");
					}
					else
					{	
						$list = file_get_contents("../tpl/user_panel.tpl");
						$list = str_replace("{username}", $username, $user_panel);
						echo $user_panel;
					}
				}
			}
}
?>
