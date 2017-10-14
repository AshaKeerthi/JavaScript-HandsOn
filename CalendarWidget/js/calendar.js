var dateNow = new Date();
var month = dateNow.getMonth();
var clickedMonth = dateNow.getMonth() + 1;
var clickedYear = dateNow.getFullYear();
var currentYear = dateNow.getFullYear();
var daysShortName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var idValue = 1;
document.body.style.margin = '5% 5% 0 5%';
var createChangeMonth = document.createElement("div");
function changeFunction() {
  createChangeMonth.setAttribute('id', 'changeMonth');
  createChangeMonth.setAttribute('class', 'divstyle');

  var createPrevMonth = document.createElement("input");
  createPrevMonth.setAttribute('id', 'prevMonthDiv');
  createPrevMonth.setAttribute('value', '<');
  createPrevMonth.setAttribute('type', 'button');
  createPrevMonth.setAttribute('class', 'divstyle');
  createPrevMonth.setAttribute('onclick', 'changeMonth(\'prev\')');

  var createNextMonth = document.createElement("input");
  createNextMonth.setAttribute('id', 'nextMonthDiv');
  createNextMonth.setAttribute('value', '>');
  createNextMonth.setAttribute('type', 'button');
  createNextMonth.setAttribute('class', 'divstyle');
  createNextMonth.setAttribute('onclick', 'changeMonth(\'next\')');

  var createThisMonth = document.createElement("input");
  createThisMonth.setAttribute('id', 'thisMonthDiv');
  createThisMonth.setAttribute('value', 'Today');
  createThisMonth.setAttribute('type', 'button');
  createThisMonth.setAttribute('class', 'divstyle');
  createThisMonth.setAttribute('onclick', 'changeMonth(\'this\')');

  createChangeMonth.appendChild(createPrevMonth);
  createChangeMonth.appendChild(createNextMonth);
  createChangeMonth.appendChild(createThisMonth);
}
function changeMonth(choosedMonth) {
  if(choosedMonth == 'prev') {
    clickedMonth = clickedMonth - 1;
    if(clickedMonth == 0) {
      clickedYear = clickedYear - 1;
      clickedMonth = 12;
    }
  } else if(choosedMonth == 'next') {
    clickedMonth = clickedMonth + 1;


    if(clickedMonth == 13) {
      clickedYear = clickedYear + 1;
      clickedMonth = 1;
    }
  } else {
    clickedMonth = month + 1;
    clickedYear = currentYear;
  }
  displayCurrentMonth(monthNames[clickedMonth-1], clickedYear);
  if(document.getElementById('divcalendar') != null) {
    document.body.removeChild(document.getElementById('divcalendar'));
  }
  apiCall();
}
function apiCall() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      displayMonth(this.responseText);
    }
  };
  xmlhttp.open("GET", "http://192.168.2.14:6852/api/v1/ip-pools/o156essilor/vmware-cloud/ipdetails", true);
  xmlhttp.send();
}
changeFunction();
displayCurrentMonth(monthNames[month], currentYear);
function displayCurrentMonth(monthName, year) {
  if(document.getElementById('createCurrentMonth') != null) {
    createChangeMonth.removeChild(document.getElementById('createCurrentMonth'));
  }
  var createCurrentDate = document.createElement("span");
  createCurrentDate.setAttribute('id', 'createCurrentMonth');
  createCurrentDate.setAttribute('class', 'divcurrentdate');
  createCurrentDate.appendChild(document.createTextNode(monthName + ' ' + year));
  createChangeMonth.appendChild(createCurrentDate);
}
var poolId = 1;
function vmCreated(ipPoolValue, displayDate, mon, year) {
  var ipPool = JSON.parse(ipPoolValue);
  var organisation = ipPool.organisation;
  var cloud = ipPool.cloud;
  var allocatedData = ipPool.nic;
  var displayAllocateVM = document.createElement("span");
  displayAllocateVM.setAttribute('id', 'displayAllocateVM'+poolId);
  displayAllocateVM.setAttribute('class', 'displayAllocateVM');
  var data = "";
  for(var allocate = 0; allocate < allocatedData.length ; allocate ++ ) {
    var fullDate = new Date(allocatedData[allocate].allocated);
    checkDate = fullDate.getDate();
    checkMonth = fullDate.getMonth() +1;
    checkYear = fullDate.getFullYear();
    if(checkDate == displayDate && checkMonth  ==(mon) && checkYear == year) {
      data = data + ('org :' + organisation
      + ' cloud :' +cloud + ' vmId :' + allocatedData[allocate].vmId);
      console.log("current " + data);
    }
  }
  poolId++;
  displayAllocateVM.appendChild(document.createTextNode(data));
  return displayAllocateVM;
}

document.body.appendChild(createChangeMonth);
apiCall();
function displayMonth(ipPoolData) {

  var createCalendar = document.createElement("div");
  createCalendar.setAttribute('class','divcalendar');
  createCalendar.setAttribute('id', 'divcalendar');
  var displayDate = new Date(monthNames[clickedMonth-1] + ' 1,' + clickedYear);
  var displayPreviousDay = daysInMonth(clickedMonth - 1, clickedYear) - displayDate.getDay() +1;
  var displayNextDate = 1;
  var day = 1;
  dayInMonth = daysInMonth(clickedMonth, clickedYear);
  for(var i = 0; i < 5; i++) {
    for(var j = 0; j < 7; j++) {
      if(i == 0 && j == 0) {
        idColumnValue = 1;
        for(var columnName = 0; columnName < 7; columnName++) {
          var createColumnName = document.createElement("div");
          createColumnName.setAttribute('class','divcolumn');
          createColumnName.setAttribute('id', 'divcolumn'+idColumnValue);
          var displayColumnName = document.createElement("span");
          displayColumnName.setAttribute('id', 'spancolumn'+idColumnValue);
          displayColumnName.appendChild(document.createTextNode(daysShortName[columnName]));
          createColumnName.appendChild(displayColumnName);
          createCalendar.appendChild(createColumnName);
          idColumnValue++;
        }

      }
      var createCalendarTable = document.createElement("div");
      createCalendarTable.setAttribute('class','divdate');
      createCalendarTable.setAttribute('id', 'card'+idValue);
      if(i== 0 && j < displayDate.getDay()) {
        createCalendarTable.appendChild(document.createTextNode(displayPreviousDay));
        createCalendarTable.style.color = 'gray';
        var poolData = vmCreated(ipPoolData, displayPreviousDay, clickedMonth -1, clickedYear);
        if (poolData != undefined){
          createCalendarTable.appendChild(poolData);
        }  displayPreviousDay++;
      } else if(dayInMonth >=  day ) {
        createCalendarTable.appendChild(document.createTextNode(day));
        if((month + 1) == clickedMonth && dateNow.getDate() == day && currentYear == clickedYear) {
          createCalendarTable.style.background = 'orange';
        }
        var poolData = vmCreated(ipPoolData, day, clickedMonth, clickedYear);
        if (poolData != undefined){
          createCalendarTable.appendChild(poolData);
        }
        day++;
      } else {
        createCalendarTable.appendChild(document.createTextNode(displayNextDate));
        createCalendarTable.style.color = 'gray';
        displayNextDate++;
      }
      createCalendar.appendChild(createCalendarTable);
      idValue++;
    }
  }
  document.body.appendChild(createCalendar);
}
function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}
