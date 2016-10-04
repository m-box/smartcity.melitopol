<?php
function route ($route)
{
	$arroute=explode("/",$route);
	$query_route=db_read("route","","");

	for ($i=0;$i<count($query_route);$i++)
	{
		$route_url=explode("/",$query_route[$i]['route_url']);
		
		if (count($route_url)==count($arroute))
		{
			for ($z=0;$z<count($arroute);$z++)
			{
				if ($arroute[$z]==$route_url[$z])
				{$this_route=1;}
				else
				{$this_route=0;}
		
			}
			
		}
		else{$this_route=0;}

		if ($this_route==1)
			{
				$route_out['route_type']=$query_route[$i]['route_type'];
				$route_out['arg_str']=$query_route[$i]['arg_str'];

					break;
			}
	}
	
		
	if ($this_route==0)
	{
		for ($i=0;$i<count($query_route);$i++)
		{
		$route_url=explode("/",$query_route[$i]['route_url']);
		if (count($route_url)==count($arroute))
		{
			for ($z=0;$z<count($arroute);$z++)
			{
				if ($arroute[$z]==$route_url[$z])
				{$this_route=1;}
				else
				{
					$count1=count($route_url)-1;
					if ($route_url[$count1]=="*")
					{$this_route=1;}
					else
					{$this_route=0;}
				}
		
			}
			
		}
		else{$this_route=0;}
				if ($this_route==1)
			{

				$route_out['route_type']=$query_route[$i]['route_type'];
				$route_out['arg_str']=$query_route[$i]['arg_str'];

					
					if ($route_url[$count1]=="*") {$route_out['arg']=$arroute[$count1];}
					break;
			}
		}	
	}
	
	if ($this_route==1)
	{
		return $route_out;
	}
	else
	{
		return "0";
	}	
}
?>