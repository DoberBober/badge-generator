<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Генератор бэйджиков</title>
	<link rel="stylesheet" href="styles.css">
</head>
<body>
	<div class="app">
		<header class="header">
			<form class="templatePicker" id="templatePicker" action="" method="POST">
				<select class="select" name="templateList" id="templateList">
					<option value="">Выбрать шаблон</option>
					<?php
						foreach(glob('templates/*.svg') as $template) {
							echo '<option value="' . str_replace('templates/', '', $template) . '">' . str_replace(array('templates/', '.svg'), array('', ''), $template) . '</option>';
						};
					?>
				</select>
			</form>
		</header>
		<main class="main">
			<article class="template" id="template">
				Выбери шаблон в списке выше
			</article>
		</main>
		<footer class="footer footer--hidden">
			<form class="templateSave" id="templateSave" action="" method="POST">
				<div class="templateSave__inputs" id="templateSave__inputs"></div>
				<button class="templateSave__btn templateSave__btn--submit" type="submit">Создать</button>
			</form>
		</footer>
	</div>
	<script src="script.js"></script>
</body>
</html>
