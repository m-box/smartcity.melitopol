<?php
function template_data ($tpl /* template_name */, $table /* table_name */, $data /* table_row_data */)
{
	$cols=db_name_col($table);
	$template=file_get_contents($tpl);
	$run=$template;
		for($i=0;$i<count($cols);$i++)
		{	
			$repl='{!'.$cols[$i].'!}';
			$col_name=$cols[$i];
			$run = str_replace($repl, $data[$col_name], $run);
		}
	return $run;
}

function template_mark ($table)
{
	$cols=db_name_col($table);


		for($i=0;$i<count($cols);$i++)
		{	
			$repl[$i]='{!'.$cols[$i].'!}';
			print_r(" - ".$repl[$i]."<br>");
		}
	return $repl;
}

?>