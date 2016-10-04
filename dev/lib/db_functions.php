<?php
/*Оверрайд налаштувань Апача по кодуванню текста*/
header("Content-Type: text/html; charset=utf-8");


/*ниже представленна функция чтения из бд.
Документация по функции db_read().
возвращает массив с запрашиваемыми данными из запрашиваемой таблицы.
db_read(string arg1, int arg2, string arg3) где:
 - arg1 - название таблицы
 - arg2 - уникальный ID строки (в случае отсувствия данного аргумента возвращает всю таблицу)
 - arg3 - 	требуемые столбцы, из данной страницы (указываются через запятую,без пробелов.
			В случае отсувствия данного аргумента возвращает все ячейки.)
В случае возвращения двухмерного массива ['int номер строки']['название столбца']
P.S. вобщем оставь надежду всяк сюда входящий)
 */
function db_read($table, $id, $col) 
{
	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	mysql_query('SET NAMES utf8');
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	if ($table=="")
	{
		return "DB_table_name_disabled";
	}
	else
	{
		if ($id=="")
		{
			if ($col=="")
			{
				$query=mysql_query("SELECT * FROM  `$table`");
				if (!$query or !mysql_num_rows($query))  return "error";
				$num=0;
				while ($row = mysql_fetch_assoc($query)) {
		
					foreach($row as $key => $value) 
					{ 
					$out[$num][$key]=$value;
					 
					}
				$num++;
				  
				}	

				return $out;				
			}
			else
			{
				$col=explode(",", $col);
				
				for ($i=0;$i!==count($col);$i++)
				{   
					$col_string=$col_string."`".$col[$i]."`";
					$mark=$i+1;
					if ($i!==count($col) && $mark!==count($col)) {$col_string=$col_string.","." ";}
					
				}
				$query=mysql_query("SELECT $col_string FROM  `$table`");
				if (!$query or !mysql_num_rows($query))  return "error";
				$num=0;
				while ($row = mysql_fetch_assoc($query)) 
				{
		
					foreach($row as $key => $value) 
					{ 
					$out[$num][$key]=$value;
					 
					}
				$num++;
				  
				}	
				return $out;
			}
		
		}
		else
		{
			if ($col=="")
			{
				
				$query=mysql_query("SELECT * FROM  `$table` WHERE  `id` = $id");
				if (!$query or !mysql_num_rows($query))  return "error";
				$row=mysql_fetch_assoc($query);
				foreach($row as $key => $value) 
				{ 
				$out[$key]=$value;	 
				}
				return $out;
			}
			else
			{
				$col=explode(",", $col);
				
				for ($i=0;$i!==count($col);$i++)
				{   
					$col_string=$col_string."`".$col[$i]."`";
					$mark=$i+1;
					if ($i!==count($col) && $mark!==count($col)) {$col_string=$col_string.","." ";}
					
				}
				$query=mysql_query("SELECT $col_string FROM  `$table` WHERE  `id` = $id");	
				if (!$query or !mysql_num_rows($query))  return "error";
				$row = mysql_fetch_assoc($query); 
					foreach($row as $key => $value) 
					{ 
					$out[$key]=$value;
					 
					}
				return $out;
			}			
		}
	}
}

/*ниже представлена функция чтения из бд с условием. (Может использоваться для поиска)
Документация по функции db_read_if().
возвращает массив с данными из запрашиваемой таблицы в зависимости от условия
db_read_if(string arg1, string arg2, string arg3 .....) где:
 - arg1 - название таблицы
 - arg2 - проверяемый параметр
 - arg3 - условие проверки
 - args - второй и третий аргумент могут дублироваться необходимое колличество раз
(неограниченое колличество условий).
Формат возвращения данных двумерный массив, где ['int номер строки']['название столбца']

*/
function db_read_if()
{	
	$table = func_get_arg(0);
    $numargs = func_num_args();
    $arg_list = func_get_args();
    for ($i = 1; $i < $numargs; $i++) 
	{
	
	$param=$arg_list[$i];
	$i++;
    $where_out=$where_out."`".$param."`"." LIKE "."'".$arg_list[$i]."'"." ";
	$mark=$i+1;
	if ($i<$numargs && $mark<$numargs){$where_out=$where_out."AND ";}
    }

	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	$query=mysql_query("SELECT * FROM  `$table` WHERE $where_out ");

	if (!$query or !mysql_num_rows($query))  return "error";
		$num=0;
		while ($row = mysql_fetch_assoc($query)) 
		{		
			foreach($row as $key => $value) 
				{ 
				$out[$num][$key]=$value;					 
				}
				$num++;
				  
				}	
				
return $out;
}

function db_readmax_if($table,$arr)
{	
    for ($i = 0; $i < count($arr); $i++) 
	{

	$param=$arr[$i];
	$i++;
	$operator=$arr[$i];
	$i++;
	$value=$arr[$i];
    $where_out=$where_out."`".$param."`"." ".$operator." "."'".$value."'"." ";

	$mark=$i+1;
	if ($i<count($arr) && $mark<count($arr)){$where_out=$where_out."AND ";}
    }

	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	$query=mysql_query("SELECT * FROM  `$table` WHERE $where_out ");

	if (!$query or !mysql_num_rows($query))  return "error";
		$num=0;
		while ($row = mysql_fetch_assoc($query)) 
		{		
			foreach($row as $key => $value) 
				{ 
				$out[$num][$key]=$value;					 
				}
				$num++;
				  
				}	

return $out;
}

function db_read_if_arr($table, $array)
{	

    for ($i = 0; $i < count($array); $i++) 
	{
	
	$param=$array[$i];
	$i++;
    $where_out=$where_out."`".$param."`"." LIKE "."'".$array[$i]."'"." ";
	$mark=$i+1;
	if ($i<count($array) && $mark<count($array)){$where_out=$where_out."AND ";}
    }

	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	$query=mysql_query("SELECT * FROM  `$table` WHERE $where_out ");

	if (!$query or !mysql_num_rows($query))  return "error";
		$num=0;
		while ($row = mysql_fetch_assoc($query)) 
		{		
			foreach($row as $key => $value) 
				{ 
				$out[$num][$key]=$value;					 
				}
				$num++;
				  
				}	
				
return $out;
}

/*ниже представленна функция записи в бд.
Документация функции db_rec().
Возвращает TRUE либо FALSE. В случае ошибки, возвращает причину неполадки.
db_rec(string arg1, string arg2, string arg3 .....) где:
 - arg1 - название таблицы
 - arg2 - название столбца, в который пишем
 - arg3 - то, что пишем в данный столбец
 - args - второй и третий аргумент могут дублироваться необходимое колличество раз
в таблицах c авто-инкрементом не указывать ID
P.S. Даже понятия не имел что в столь позднее время открывается дар к безошибочному коддингу {TIME_2:38_03.08.2016}
*/
function db_rec()
{	
	$table = func_get_arg(0);
    $numargs = func_num_args();
    $arg_list = func_get_args();
    for ($i = 1; $i < $numargs; $i++) 
	{
	$param=$arg_list[$i];
	$i++;
    $columns=$columns."`".$param."` ";
	$data=$data."'".$arg_list[$i]."' ";
	$mark=$i+1;
	if ($i<$numargs && $mark<$numargs){$columns=$columns.", "; $data=$data.", ";}
	
    }

	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	if (mysql_query("INSERT INTO `$table` ( $columns )
	VALUES ( $data );")) return "ok";
	print_r("INSERT INTO `$table` ( $columns )
	VALUES ( $data );");
}

function db_rec_arr($table, $array)
{	

   

    for ($i = 0; $i < count($array); $i++) 
	{
	$param=$array[$i];
	$i++;
    $columns=$columns."`".$param."` ";
	$data=$data."'".$array[$i]."' ";
	$mark=$i+1;
	if ($i<count($array) && $mark<count($array)){$columns=$columns.", "; $data=$data.", ";}
	
    }

	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	if (mysql_query("INSERT INTO `data` ( $columns )
	VALUES ( $data );")) return "ok";
	
}

/*ниже представлена функция редактирования конкретной строки из таблицы
Документация по функции db_change().
Возвращает ок в случае выполнения, либо возвращает ошибку.
db_change(string arg1, string arg2, string arg3, string arg4 .....) где:
 - arg1 - название таблицы
 - arg2 - уникальный ID строки (которую редактируем)
 - arg3 - название ячейки, которую редактируем
 - arg4 - то, что пишем в данную ячейку
 - args - третий и четвёртый аргумент могут дублироваться необходимое колличество раз
 */
 function db_change ()
 {
$table = func_get_arg(0);
$id = func_get_arg(1);
    $numargs = func_num_args();
    $arg_list = func_get_args();
    for ($i = 2; $i < $numargs; $i++) 
	{
	$param=$arg_list[$i];
	$i++;
    $columns=$columns."`".$param."` "." = "."'".$arg_list[$i]."' ";
	$mark=$i+1;
	if ($i<$numargs && $mark<$numargs){$columns=$columns.", "; }
	
    }

	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	if (mysql_query("UPDATE  `$table` SET  $columns WHERE  `$table`.`id` =$id;")) return "ok";
		 	 
 }

  function db_change_arr ($table, $id, $arr)
 {

    for ($i = 2; $i < count($arr); $i++) 
	{
	$param=$arr[$i];
	$i++;
    $columns=$columns."`".$param."` "." = "."'".$arr[$i]."' ";
	$mark=$i+1;
	if ($i<count($arr) && $mark<count($arr)){$columns=$columns.", "; }
	
    }

	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	if (mysql_query("UPDATE  `$table` SET  $columns WHERE  `$table`.`id` =$id;")) return "ok";
		 	 
 }
/*ниже представлена функция удаления по ID с постусловием
Документация по функции db_delete().
Возвращает ок в случае выполнения, либо вощвращает код ошибки.
db_delete(string arg1, int arg2, string arg3 .....) где:
 - arg1 - название таблицы
 - arg2 - уникальный ID строки (которую редактируем)
 - arg3 - название ячейки, которую удаляем
 - args - третий аргумент может дублироваться необходимое колличество раз
 в случае отсуствия названий ячеек удаляет всю строку
 */
 function db_delete()
{
	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	 
$table = func_get_arg(0);
$id = func_get_arg(1);

if (count(func_get_args())<=2)
{
	if (mysql_query("DELETE FROM `$table` WHERE  `$table`.`id` =$id;")) return "ok";	
}
else
    $numargs = func_num_args();
    $arg_list = func_get_args();
    for ($i = 2; $i < $numargs; $i++) 
	{
	$param=$arg_list[$i];
    $columns=$columns."`".$param."` "." = "."'"."' ";
	$mark=$i+1;
	if ($i<$numargs && $mark<$numargs){$columns=$columns.", "; }
    }
	if (mysql_query("UPDATE  `$table` SET  $columns WHERE  `$table`.`id` =$id;")) return "ok";
 
}
 

/*Ниже представлена функция аозвращающая названия всех ячеек данной таблицы
db_name_col(arg1)
 - arg1 - название таблицы */
function db_name_col ($table)
{
	if ($table=="")
	{
		return "table_name:NULL";
	}
	else{
	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	$query=mysql_query("SHOW COLUMNS FROM $table");
	$num = 0;
	while ($row = mysql_fetch_assoc($query)) 
		{		
				$out[$num]=$row['Field'];
				$num++;
				  
				}
	return $out;
	}
} 

/*Ниже представлена функция возвращающая названия всех таблиц
db_table_name()
  */
function db_table_name ()
{

	global $_CONFIG;
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}
	$query=mysql_query("SHOW TABLES");

	$num = 0;
	$row_name='Tables_in_'.$_CONFIG['db_name'];
	
	while ($row = mysql_fetch_assoc($query)) 
		{		
				$out[$num]=$row[$row_name];
				$num++;
				  
				}
	return $out;

} 



?>