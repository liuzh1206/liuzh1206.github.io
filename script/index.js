var xmlhttp;
var data = "";
if (window.XMLHttpRequest) {
	xmlhttp = new XMLHttpRequest();
}
else {
	xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}
xmlhttp.onreadystatechange = function () {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		data = xmlhttp.responseText;
		data = JSON.parse(data);
		ul = createIndex('', data);
		insertIndex(ul);
	}
}
xmlhttp.open('GET', '/data.json');
xmlhttp.send();

function createIndex(path, data) {
	var ul = document.createElement('ul');
	if (data != undefined) {
		for (var i in data) {
			if (i != 'picture') {
				var dir_span = document.createElement('span');
				if (i == 'source'){}else{
				dir_span.innerHTML = i}
				dir_span.className = 'dir'
				ul.appendChild(dir_span)
				var uli = document.createElement('ol');
				ul.appendChild(uli)
			}
			for (var j in data[i]) {
				if (typeof data[i][j] == 'string') {
					fileName = data[i][j];
					if (fileName.substr(fileName.lastIndexOf('.')) == '.md') {
						var file_li = document.createElement('li');
						var file_link = document.createElement('a');
						file_li.appendChild(file_link)
						if (i == 'source') {
							file_link.href = path + '/' + fileName.substr(0, fileName.lastIndexOf('.')) + '.html'
						} else {
							file_link.href = path + '/' + i + '/' + fileName.substr(0, fileName.lastIndexOf('.')) + '.html'
						}
						if (fileName.substr(0, fileName.lastIndexOf('.')) == 'index') {

							file_link.innerHTML = '目录';
						} else {
							file_link.innerHTML = fileName.substr(0, fileName.lastIndexOf('.'));
							uli.appendChild(file_li)
						}
						file_li.className = 'file'
					}
				} else {
					if (i == 'source') {
						uls = createIndex(path, data[i][j])
						uli.appendChild(uls)
					} else {
						uls = createIndex(path + '/' + i, data[i][j])
						uli.appendChild(uls)
					}
				}
			}
		}
		return ul;
	}
}
function insertIndex(ul) {
	var commentBox = document.getElementById('vcomments');
	document.body.insertBefore(ul, commentBox);
}

