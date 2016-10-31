<?php
/*Ниже приведена функция проверки логина и пароля
В положительном случае возвращает - 1
В отрицательном возвращает причину ошибки
 */
function user ($login, $pass)
{
	if (db_read_if("user","login",$login)=="error")
	{
		return "login_undefined";
	}
	else
	{
		$user=db_read_if("user","login",$login);
		if ($user[0]['password']==$pass)
		{
			return $user[0]['id'];
		}
		else
		{
			return "password_error";
		}
	}
}


?>