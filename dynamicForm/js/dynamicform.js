var count = 1;
function dynamicformadd() {
  console.log('add');
  document.getElementById('d').innerHTML = "Add";
var input = document.createElement('input');
input.type ='text';
input.name ='dynamicinput'+count;
input.id = 'input'+count;
input.value = '';
var label = document.createElement('label');
label.id = 'label'+count;
var newLine = document.createElement("br");
newLine.id = 'br'+count;
label.appendChild(document.createTextNode('Generate'+count));
var remove = document.createElement('input');
remove.id = 'remove'+count;
remove.type = 'button';
remove.value = 'Remove';
remove.setAttribute('onclick', 'dynamicformremove(\'div1\','+ count+ ')');
var save = document.createElement('input');
save.id = 'save'+count;
save.type = 'button';
save.value = 'Save';
save.setAttribute('onclick', 'dynamicformsave(\'div1\','+ count+ ')');
count++;
var div = document.getElementById('div1');
div.appendChild(label);
div.appendChild(input);
div.appendChild(remove);
div.appendChild(save);
div.appendChild(newLine);
}


function dynamicformremove(parent, child) {
  console.log(count);
document.getElementById('d').innerHTML = 'Remove';
var label = document.getElementById('label'+child);
var input = document.getElementById('input'+child);
var newLine = document.getElementById('br'+child);
var div = document.getElementById('div1');
var remove = document.getElementById('remove'+child);
var save = document.getElementById('save'+child);
div.removeChild(newLine);
div.removeChild(input);
div.removeChild(label);
div.removeChild(remove);
div.removeChild(save);
}
var inputArray = [];
function dynamicformsave(parent, child) {
  value =  document.getElementById('input'+child).value;
  key = 'input'+child
  inputArray.push({key:value});
}
