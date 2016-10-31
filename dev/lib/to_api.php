<?php
function to_api($table, $data, $id_user)
{ 	global $id_user;
	$err_n=0;
	
	
	$data=json_decode($data,true);	
	
	if (!isset($data['method']) || $data['method']=="")
	{
		$err_arr[$err_n]="method_undifined_125"; $err_n++; 
	}
	else
	{
	/* Проверка запрашиваемых ячеек */	if (!isset($data['data']) || $data['data']=="" || count($data['data'])<1)	
			{
						$data['NULL']==0;
			}
			else
			{
						$t=0;
						foreach($data['data'] as $key => $value) 
						{ 
							$out[$t]=$key;
							$t++;
						}				
			}
	/* Проверка привилегий на метод get */	if ($data['method']=="get"){

				if (count($out)<1)
				{
					$col_name=db_name_col($table);
						for ($i=0;$i<count($col_name);$i++)
						{
							if (privilege($id_user,$data['method'],$table,$col_name[$i])==0)
							{$err_arr[$err_n]="no_privilege_to_".$data['method']."_in_".$col_name[$i]; $err_n++;}
						}
				}
				else
				{
						for ($i=0;$i<count($out);$i++)
						{
							if (privilege($id_user,$data['method'],$table,$out[$i])==0)
							{$err_arr[$err_n]="no_privilege_to_".$data['method']."_in_".$col_name[$i]; $err_n++;}
						}					
				}

	}
		/* Проверка привилегий на метод get_if */	elseif ($data['method']=="get_if"){

				if (count($out)<1)
				{
					$col_name=db_name_col($table);
						for ($i=0;$i<count($col_name);$i++)
						{
							if (privilege($id_user,$data['method'],$table,$col_name[$i])==0)
							{$err_arr[$err_n]="no_privilege_to_".$data['method']."_in_".$col_name[$i]; $err_n++;}
						}
				}

		}		
	/* Проверка привилегий на метод post */	elseif ($data['method']=="post"){
				if (count($out)<1)
				{

				$err_arr[$err_n]=="cols_NULL"; $err_n++;
				}
				else
				{ 
						for ($i=0;$i<count($out);$i++)
						{
							if (privilege($id_user,$data['method'],$table,$out[$i])==0)
							{$err_arr[$err_n]="no_privilege_to_".$data['method']."_in_".$out[$i]; $err_n++;}
						}					
				}
		
	}
	/* Проверка привилегий на метод put */	elseif ($data['method']=="put"){
				if (count($out)<1)
				{
				$err_arr[$err_n]=="cols:NULL"; $err_n++;
				}
				else
				{
						for ($i=0;$i<count($out);$i++)
						{
							if (privilege($id_user,$data['method'],$table,$out[$i])==0)
							{$err_arr[$err_n]="no_privilege_to_".$data['method']."_in_".$out[$i]; $err_n++;}
						}					
				}
				
	}
	/* Проверка привилегий на метод delete */	elseif ($data['method']=="delete"){

							if (privilege($id_user,$data['method'],$table,""))
							{$err_arr[$err_n]="no_privilege_to_".$data['method']."_in_".$table; $err_n++;}
						

	}
	/* */	else {$err_arr[$err_n]=="method_undefined"; $err_n++;}
	}
	if (count($err_arr)==0) /* Если ошибок не обнаружено, то произведём запрашиваемые действия! */
	{

	/* Если запрашивали метод get */	if ($data['method']=="get"){

			if (count($data['data'])<1)
			{	
				if (!isset($data['id']) || $data['id']=="")
				{
					$ret_out['data']=db_read($table,"","");
				}
				else
				{
					$ret_out['data']=db_read($table,$data['id'],"");
				}
			}
			else
			{ 
					$t=0;
					foreach($data['data'] as $key => $value) 
					{ 
						$outs[$t]=$key;
						$t++;
						$outs[$t]=$value;
						$t++;
					}
					$ret_out['data']=db_read_if_arr($table, $outs);
			}
	}
		/* Если запрашивали метод get_if */	elseif ($data['method']=="get_if"){
		if (count($out)<1)
		{
			$err_arr[$err_n]="cols_if_disabled"; $err_n++;
		}
		else
		{ $t=0;
				for($i=0;$i<count($data['data']);$i++) 
				{ 
					$outs[$t]=$data['data'][$i][0];
					$t++;
					$outs[$t]=$data['data'][$i][1];
					$t++;
					$outs[$t]=$data['data'][$i][2];
					$t++;
				}
				$ret_out['data']=db_readmax_if($table,$outs);
		}
	}
	/* Если запрашивали метод post */	elseif ($data['method']=="post"){
		if (count($out)<1)
		{
			$err_arr[$err_n]="cols_disabled";
		}
		else
		{		$t=0;
				foreach($data['data'] as $key => $value) 
				{ 
					$outs[$t]=$key;
					$t++;
					$outs[$t]=$value;
					$t++;
				}
				$ret_out['data']=db_rec_arr($table,$outs);
		}
	}
	/* Если запрашивали метод put */	elseif ($data['method']=="put"){
		if (count($out)<1)
		{
			$err_arr[$err_n]="cols_disabled"; $err_n++;
		}
		else
		{
				foreach($data['data'] as $key => $value) 
				{ 
					$outs[$t]=$key;
					$t++;
					$outs[$t]=$value;
					$t++;
				}
				$ret_out['data']=db_change_arr($table,$outs);
		}		
	}
	/* Если запрашивали метод delete */	elseif ($data['method']=="delete"){
		if (!isset($data['id']) || $data['id'])
		{
			$err_arr[$err_n]="id_disabled"; $err_n++;			
		}
		else
		{
			$ret_out['data']=db_delete($route['arg_str'],$_POST['id']);
		}
	}
	/* Если пользователь запросил авторизацию */ elseif($data['method']=="login")
	{
		if (count($out)<1)
		{
			$err_arr[$err_n]="cols_disabled"; $err_n++;
		}
		else
		{
			if (!isset($data['data']['login']) || $data['data']['login']=="")
			{
				$err_arr[$err_n]="login_disabled"; $err_n++;				
			}
			else
			{
				if (!isset($data['data']['password']) || $data['data']['password']=="")
				{
					$err_arr[$err_n]="pass_disabled"; $err_n++;	
					$ret_out['login']="0";					
				}
				else
				{
					$t=0;
					foreach($data['data'] as $key => $value) 
					{ 
						$outs[$t]=$key;
						$t++;
						$outs[$t]=$value;
						$t++;
					}

					$user=db_read_if_arr("user",$outs);

					if ($user=="error")
					{
						$err_arr[$err_n]="user_disabled"; $err_n++;
						$ret_out['login']="0";
					}
					else
					{   db_change("user",$user['0']['id'],"ip_user",$_SERVER['REMOTE_ADDR']);
						$_SESSION['id']=$user['0']['id'];
						$ret_out['login']="1";
					}
				}
			}
		}
	}
	elseif($data['method']=="exit"){
		session_destroy();
		$ret_out['exit']="1";
	}
	elseif($data['method']=="tables")
	{
	$ret_out['data']=db_table_name();	
	}
	elseif($data['method']=="cols")
	{
	$ret_out['data']=db_name_col($data['table']);	
	}
	elseif($data['method']=="user_info")
	{
		global $id_user;
	$ret_out['data']=db_read("user",$id_user,"");	
	}
	
	/* В случае неверного метода */	else {	$err_arr[$err_n]="method_disabled"; $err_n++;}
	$ret_out['err']=$err_arr;
	return $ret_out;	
	}
	else
	{
	$ret_out['err']=$err_arr;
	return $ret_out;	
	}	
	
}

?>