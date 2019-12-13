<?php

$templateName = $_GET['file'];

if($templateName){
	if (file_exists('templates/' . $templateName)) {
		$content = file_get_contents('templates/' . $templateName);
		echo json_encode($content, JSON_UNESCAPED_UNICODE);
		return false;
	}
};

?>
