if (!isset($_POST['method']))
	{
		echo "метод не обнаружен";
	}	
	else
	{
		if ($_POST['method']=="get") {
			if (!isset($_POST['id']) || $_POST['id']=="")
			{
				if (!isset($_POST['data']) || $_POST['data']=="")
				{
					$col_name=db_name_col($route['arg_str']);
					$er_n=0;
					$mark=0;
						for ($i=0;$i<count($col_name);$i++)
						{
							if (privilege($id_user,$_POST['method'],$route['arg_str'],$col_name[$i])==0)
							{$mark=1; $err[$er_n]="no_privilege_to_".$_POST['method']."_in_".$col_name[$i];print_r("no_privilege_to_".$_POST['method']."_in_".$col_name[$i]); $er_n++;}
						}
					if ($mark>0)
					{print_r($err);}
					else
					{
						print_r(json_encode(db_read($route['arg_str'],"","")));
					}
				}
				else
				{ 
					$col_name=db_name_col($route['arg_str']);
					$er_n=0;
					$mark=0;
						for ($i=0;$i<count($col_name);$i++)
						{
							if (privilege($id_user,$_POST['method'],$route['arg_str'],$col_name[$i])==0)
							{$mark=1; $err[$er_n]="no_privilege_to_".$_POST['method']."_in_".$col_name[$i]; $er_n++;}
						}
					if ($mark>0)
					{print_r($err);}
					else
					{
						$if_to=json_decode($_POST['data'], true);
						print_r($if_to);
						$t=0;
						foreach($if_to as $key => $value) 
						{ 
							$out[$t]=$key;
							$t++;
							$out[$t]=$value;
							$t++;
						}
						print_r($out."<br>");
						print_r(json_encode(db_read_if_arr($route['arg_str'],$out)));
					}					
				}
			}
			else
			{

					$col_name=db_name_col($route['arg_str']);
					$er_n=0;
					$mark=0;
						for ($i=0;$i<count($col_name);$i++)
						{
							if (privilege($id_user,$_POST['method'],$route['arg_str'],$col_name[$i])==0)
							{$mark=1; $err[$er_n]="no_privilege_to_".$_POST['method']."_in_".$col_name[$i]; $er_n++;}
						}
					if ($mark>0)
					{print_r($err);}
					else
					{
						print_r(json_encode(db_read($route['arg_str'],$_POST['id'],"")));
					}
			}

			
		} //чтение таблицы
		elseif ($_POST['method']=="post") {
			if (!isset($_POST['data']) || $_POST['data']=="")
				{print_r("data:NULL");}
			else
			{	
				$data=json_decode($_POST['data'], true);

				$t=0;
				$mark=0;
				$er_n=0;
				 foreach($data as $key => $value) 
				{ 
					$out[$t]=$key;
					$t++;
					if (privilege($id_user,$_POST['method'],$route['arg_str'],$key)==0)
						{$mark=1; $err[$er_n]="no_privilege_to_".$_POST['method']."_in_".$key."<br>"; $er_n++;}
					$out[$t]=$value;
					$t++;

				}
				if ($mark>0)
				{print_r($err);}
				else
				{
				print_r($out);
				print_r(db_rec_arr($route['arg_str'], $out));					
				}				

			}
		} //запись в таблицу
		elseif ($_POST['method']=="put") {
			if (!isset($_POST['id']) || $_POST['id']=="")
				{
					print_r("cols_id_disable");
				}
				else
				{
					if (!isset($_POST['data']) || $_POST['data'])
						{
							print_r("data_disable");
						}
						else
						{ 
							$data=json_decode($_POST['data'], true);

							$t=0;
							$mark=0;
							$er_n=0;
							 foreach($data as $key => $value) 
								{ 
									$out[$t]=$key;
									$t++;
									if (privilege($id_user,$_POST['method'],$route['arg_str'],$key)==0)
										{$mark=1; $err[$er_n]="no_privilege_to_".$_POST['method']."_in_".$key."<br>"; $er_n++;}
									$out[$t]=$value;
									$t++;

								}
								if ($mark>0)
								{print_r($err);}
								else
								{
								print_r($out);
								print_r(db_change_arr($route['arg_str'],$_POST['id'],$out);					
								}								
							
						}
				}
		} //редактирование строки
		elseif ($_POST['method']=="delete") {
			if (!isset($_POST['id']) || $_POST['id']=="")
				{
					print_r("id_row_disable");
				}
			else
				{
					if (privilege($id_user,$_POST['method'],$route['arg_str'],"")==1)
					{
						if(db_delete($route['arg_str'],$_POST['id'])=="ok")
						{
							print_r("ok");
						}
						else
						{
							print_r("err_delete_row_to_id_".$_POST['id']);
						}
					}
					else
					{
						print_r("no_privilege_to_delete_this_table_row");
					}
				}
		} //удаление строки
		else {echo "неверный метод";}
	}