var templatePicker = document.querySelector('#templatePicker');
var footer = document.querySelector('.footer');
var template = document.querySelector('#template');
var template = document.querySelector('#template');
var templateSave = document.querySelector('#templateSave');
var templateSaveInputs = document.querySelector('#templateSave__inputs');

templatePicker.addEventListener('change', (evt) => {
	if(evt.target.value){
		fetch(`getTemplate.php/?file=${evt.target.value}`)
		.then((response) => response.json())
		.then((data) => {
			templateSaveInputs.innerHTML = "";

			if(data.indexOf("nameField") > -1){
				var nameInput = document.createElement('input')
				nameInput.className = "input"
				nameInput.setAttribute("type", "text")
				nameInput.setAttribute("id", "nameInput")
				nameInput.setAttribute("name", "name")
				nameInput.setAttribute("placeholder", "Введи имя")
				templateSaveInputs.append(nameInput)
			}

			if(data.indexOf("positionField") > -1){
				var postitionInput = document.createElement('input')
				postitionInput.className = "input"
				postitionInput.setAttribute("type", "text")
				postitionInput.setAttribute("id", "positionInput")
				postitionInput.setAttribute("name", "position")
				postitionInput.setAttribute("placeholder", "Введи должность")
				templateSaveInputs.append(postitionInput)
			}

			template.innerHTML = data;
			footer.classList.remove('footer--hidden')
		})
		.then(() => {
			var nameInput = document.querySelector('#nameInput')
			var positionInput = document.querySelector('#positionInput')

			if(nameInput){
				nameInput.addEventListener('keyup', (evt) => {
					var nameField = template.querySelector('.nameField');
					nameField.textContent = evt.target.value
				})
			}

			if(positionInput){
				positionInput.addEventListener('keyup', (evt) => {
					var positionField = template.querySelector('.positionField');
					positionField.textContent = evt.target.value
				})
			}

		})
	}
})

templateSave.addEventListener('submit', (evt) => {
	evt.preventDefault();
	exportSVG(document.querySelector('#template svg'));
})

var exportSVG = function(svg) {
	var clone = svg.cloneNode(true);
	parseStyles(clone);

	var svgDocType = document.implementation.createDocumentType('svg', "-//W3C//DTD SVG 1.1//EN", "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd");
	var svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
	svgDoc.replaceChild(clone, svgDoc.documentElement);
	var svgData = (new XMLSerializer()).serializeToString(svgDoc);

	if(document.querySelector('.templateSave__btn--download')){
		document.querySelector('.templateSave__btn--download').remove()
	}

	var a = document.createElement('a');
	a.classList = "templateSave__btn templateSave__btn--download"
	a.href = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData.replace(/></g, '>\n\r<'));
	a.download = document.querySelector('#templateList').value;
	a.innerHTML = 'Скачать бэйдж';

	templateSave.appendChild(a);
};

var parseStyles = function(svg) {
	var styleSheets = [];
	var i;
	var docStyles = svg.ownerDocument.styleSheets;

	for (i = 0; i < docStyles.length; i++) {
		styleSheets.push(docStyles[i]);
	}

	if (!styleSheets.length) {
		return;
	}

	var defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
	if (!defs.parentNode) {
		svg.insertBefore(defs, svg.firstElementChild);
	}

	svg.matches = svg.matches || svg.webkitMatchesSelector || svg.mozMatchesSelector || svg.msMatchesSelector || svg.oMatchesSelector;
};
