var view = document.createElement("input");
var count = 0;
var arrayOfUser = [];
view.type = 'button';
view.id = 'view';
view.value = 'VIEW';
view.setAttribute('style', 'backgroundColor:white');
view.setAttribute('onclick', 'viewFunction()');
var add = document.createElement("input");
add.type = 'button';
add.id = 'add';
add.value = 'ADD';
add.setAttribute('style', 'backgroundColor:white');
add.setAttribute('onclick', 'addFunction(\'addElement\','+ 0 +')');

document.body.appendChild(view);
document.body.appendChild(add);

function loadTable(arrayOfUser) {
  deleteView('table');
  deleteView('form');
  var createTable = document.createElement('table');
  createTable.setAttribute('border', 2);
  createTable.setAttribute('id', 'table');

  var createHeadingRow = document.createElement('tr');

  var createIdRow = document.createElement('td');
  var idRow = document.createTextNode("ID");
  createIdRow.appendChild(idRow);

  var createUserNameRow = document.createElement('td');
  var userName = document.createTextNode("USERNAME");
  createUserNameRow.appendChild(userName);

  var createPasswordRow = document.createElement('td');
  var password = document.createTextNode("PASSWORD");
  createPasswordRow.appendChild(password);

  createHeadingRow.appendChild(createIdRow);
  createHeadingRow.appendChild(createUserNameRow);
  createHeadingRow.appendChild(createPasswordRow);

  createTable.appendChild(createHeadingRow);
  viewFunction(createTable, arrayOfUser);
}
function deleteView(name) {
  var isTableElement = document.getElementById(name);
  var body = document.body;
  if (isTableElement != undefined && body != undefined) {
    body.removeChild(isTableElement);
  }
}
function viewFunction(createTable, arrayOfUser) {
  var add = document.getElementById('add');
  add.style.backgroundColor = "white";
  var view = document.getElementById('view');
  view.style.backgroundColor = "green";
  // document.write(arrayOfUser[0]['id']);
  for(var i = 0; i < arrayOfUser.length ; i++) {
    var createRow = document.createElement('tr');

    var createid = document.createElement('td');
    var id = document.createTextNode(arrayOfUser[i].id);
    createid.appendChild(id);

    var createUserName = document.createElement('td');
    var userName = document.createTextNode(arrayOfUser[i].username);
    createUserName.appendChild(userName);

    var createPassword = document.createElement('td');
    var password = document.createTextNode(arrayOfUser[i].password);
    createPassword.appendChild(password);

    var createModify = document.createElement('td');
    var modify = document.createElement("input");
    modify.type = 'button';
    modify.id = 'modify';
    modify.value = 'MODIFY';
    modify.setAttribute('style', 'backgroundColor:white');
    modify.setAttribute('onclick', 'addFunction(\'modify\','+ i +')');


    createModify.appendChild(modify);
    var createDelete = document.createElement('td');
    var deleteUser = document.createElement("input");
    deleteUser.type = 'button';
    deleteUser.id = 'delete';
    deleteUser.value = 'DELETE';
    deleteUser.setAttribute('style', 'backgroundColor:white');
    deleteUser.setAttribute('onclick', 'deleteFunction( '+ i +' )');


    createDelete.appendChild(deleteUser);

    createRow.appendChild(createid);
    createRow.appendChild(createUserName);
    createRow.appendChild(createPassword);
    createRow.appendChild(createModify);
    createRow.appendChild(createDelete);

    createTable.appendChild(createRow);

  }
  document.body.appendChild(createTable);
}

function removeAddFunction() {
  var form = document.getElementById('form');
  var appendWithBody = document.body;
  appendWithBody.removeChild(form);


  appendWithBody.appendChild(form);
}
function addFunction(modify, modifyindex) {
  var view = document.getElementById('view');
  view.style.backgroundColor = "white";
  var add = document.getElementById('add');
  add.style.backgroundColor = "blue";
  deleteView('table');
  deleteView('form');
  var form = document.createElement('form');
  form.setAttribute('id', 'form');

  var namelabel = document.createElement('label');
  namelabel.id = 'label';
  namelabel.appendChild(document.createTextNode('USERNAME : '));

  var name = document.createElement('input');
  name.setAttribute('id', 'name');
  name.setAttribute('name', 'username');
  name.setAttribute('required', '');
  name.setAttribute('type', 'text');

  if(modify =='modify') {
    name.setAttribute('value',arrayOfUser[modifyindex].username);
    name.setAttribute('disabled','disabled');
  }

  var nameNewLine = document.createElement("br");
  nameNewLine.id = 'nameNewLine';

  var passwordlabel = document.createElement('label');
  passwordlabel.id = 'label';
  passwordlabel.appendChild(document.createTextNode('PASSWORD : '));

  var password = document.createElement('input');
  password.setAttribute('id', 'password');
  password.setAttribute('type', 'text');
  password.setAttribute('name', 'password');
  password.setAttribute('required', '');
  if(modify =='modify') {
    password.setAttribute('value',arrayOfUser[modifyindex].password);
  }


  var passwordNewLine = document.createElement("br");
  passwordNewLine.id = 'passwordNewLine';

  var submit = document.createElement("input");
  submit.type = 'button';
  submit.id = 'submit';
  submit.value = 'SUBMIT';
  if(modify =='addElement') {
    submit.setAttribute('onclick', 'save()');
  } else if(modify =='modify') {
    submit.setAttribute('onclick', 'modify()');
  }

  form.appendChild(namelabel);
  form.appendChild(name);
  form.appendChild(nameNewLine);
  form.appendChild(passwordlabel);
  form.appendChild(password);
  form.appendChild(passwordNewLine);
  form.appendChild(submit);
  var appendWithBody = document.body;
  appendWithBody.appendChild(form);
}
function save() {
  count++;
  var check = 0;
  for(var i =0 ; i< arrayOfUser.length ; i++) {
      if(arrayOfUser[i].username==document.getElementById("name").value) {
        check =1;
      }
    }
  if(document.getElementById("name").value != '' && document.getElementById("password").value != '' && check == 0) {
    arrayOfUser.push({"id":count, "username":document.getElementById("name").value, "password":document.getElementById("password").value});
      loadTable(arrayOfUser);
  } else {
    if(check == 1) {
      alert("Username Already present");
    } else {
    alert("Please Fill Username And Password");
    }
  }

}
function modify() {
  for(var i =0 ; i< arrayOfUser.length ; i++) {
    if(document.getElementById("name").value != '' && document.getElementById("password").value != '') {
      if(arrayOfUser[i].username==document.getElementById("name").value) {
        arrayOfUser[i].password = document.getElementById("password").value;
        loadTable(arrayOfUser);
      }
    } else {
      alert("Please Fill Password");
    }
  }

}

function deleteFunction(deleteIndex) {
  arrayOfUser.splice(deleteIndex, 1);
  loadTable(arrayOfUser);
}
