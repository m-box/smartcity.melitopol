<?php
		
function regular_m ($str1, $str2)
{
$patterns = array(
        ':num' => '/^\d+$/',
        ':str' => '/[a-zA-Z]+/',
        ':any' => '/[0-9a-zA-Zа-яёА-ЯЁ\-\_]+/', ///^[0-9a-zA-Zа-яёА-ЯЁ\-\_]+$/
		);
		
if (!isset($patterns[$str1]))
		{
			if ($str1==$str2)
			{return true;}
			else
			{return false;}
		}
else
		{
			if (preg_match($patterns[$str1], $str2))
			{return true;}
			else
			{return false;}	
		}
}		
		
		
function route ($route)
{
	
  $url = $route;
  $url = rtrim($url, '/'); //Убираем слэш из начала строки
  $url = ltrim($url, '/'); //Убираем слэш из конца строки
  $url = explode('/', $url); //Получаем розбитый на части URL
  $routes = file_get_contents("route.json"); //Подгружаем файл с маршрутами
  $arr=json_decode($routes, true); //Превращаем его в массив
  for ($i=0;$i<count($arr);$i++) //Начинаем перебор массива
	{$arg=0;//Счетчик аргументов функции
		$str=explode("/",$arr[$i]['route_url']);//разбиваем шаблон из массива на части
		if (count($url)==count($str))// если колличество эллементов равно, начинаем проверку
		{
			for ($z=0;$z<count($url);$z++)//поочерёдно проверяем каждый эллемент
				{
					if (regular_m($str[$z], $url[$z])) //проверяем на совпадение или на регулярное выражение
					{	$mark=count($url)-1; // задаём метку колличества выполнений цикла
						if ($str[$z]==":num" or $str[$z]==":str" or $str[$z]==":any") {$args[$arg]=$url[$z];$arg++;} //проверяем ожидается ли ввод на данном участке шаблона
						if ($z==$mark)// если проверка успешно окончена возвращаем параметры маршрута
							{ 
								$route_out['route_type']=$arr[$i]['route_type'];
								$route_out['arg_str']=$arr[$i]['arg_str'];
								$route_out['arg']=$args;
								return $route_out;
							}
					}
					else
						{break; $args='';}
					
				}
		}
	}
	
	return 0;
	
}

?>