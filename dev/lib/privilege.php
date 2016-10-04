<?php
/*Ниже представленна функция проверки привелегий на обращение к ячейке методами: GET, POST, PUT, DELETE*/
 function privilege ($id,$method,$table,$col)
{
	if ($id=="anon")
	{
			if(db_read_if("privilege","id_user_type","anon","method",$method,"table",$table,"col",$col)=="error")
	{return "0";}
	else
	{
		
		
	$user_type_if=db_read_if("privilege","id_user_type","anon","method",$method,"table",$table,"col",$col);
	if($user_type_if[0]['id_user_type']=="anon")
		{
			return "1";
		}
	else
		{

					
			return "0";
		}
	}
	}
	
	if (db_read("user",$id,"")=="error")
	{
		return "user_undefined";
	}
	else
	{
	$user_type=db_read("user",$id,"id_user_type");

		if ($method=="delete")
			{
				if(db_read_if("privilege","id_user_type",$user_type['id_user_type'],"method",$method,"table",$table)=="error")
				{return "0";}
				else
				{
		
		
					$user_type_if=db_read_if("privilege","id_user_type",$user_type['id_user_type'],"method",$method,"table",$table);
					if($user_type['id_user_type']==$user_type_if[0]['id_user_type'])
					{
					return "1";
					}
					else
					{
					return "0";
					}
				}
			}
	
	if(db_read_if("privilege","id_user_type",$user_type['id_user_type'],"method",$method,"table",$table,"col",$col)=="error")
	{return "0";}
	else
	{
		
		
	$user_type_if=db_read_if("privilege","id_user_type",$user_type['id_user_type'],"method",$method,"table",$table,"col",$col);
	if($user_type['id_user_type']==$user_type_if[0]['id_user_type'])
		{
			return "1";
		}
	else
		{

					
			return "0";
		}
	}	
	}
	
}
?>