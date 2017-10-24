var secondsCircumference = (2 * Math.PI/60);
var secondsDegree = 0;
var minutesCircumference = (2 * Math.PI/60);
var minutesDegree = 0;
var hoursCircumference = (2 * Math.PI/12);
var hoursDegree = 0;
var interval ;
var seconds = 0;
var minutes = 0;
var hours = 0;
var secondsStart = 3 * Math.PI/2;
var minuteStart = 3 * Math.PI/2;
var hourStart = 3 * Math.PI/2;
var display = true;
var displayHours = true;

drawSeconds();
$("#start").click(function(){
  if($("#hour").val() != "") {
    hours = $("#hour").val();
  }
  if($("#minute").val() != "") {
    minutes =$("#minute").val();
  }
  if($("#seconds").val() != "") {
    seconds = $("#seconds").val();
  }
 if(hours == 0 && minutes == 0 && seconds == 0) {
   alert("Please Fill Your Time");
 } else {
  secondsStart = (3 * Math.PI/2) + (((2 * Math.PI) / 60) * seconds);
  minuteStart = (3 * Math.PI/2) + (((2 * Math.PI) / 60) * minutes);
  hourStart = (3 * Math.PI/2)  + (((2 * Math.PI) / 12) * hours);
  var displayMinutesDegree = minutesDegree;
  drawMinute();
  var displayHoursDegree = hoursDegree
  minutesDegree = displayMinutesDegree;
  drawHour();
  hoursDegree = displayHoursDegree;
  displayHours = false;
  display = false;
  makeSecondsToRun();
  }
});

function makeSecondsToRun() {
  interval = setInterval(function() {
    var secondsCanvas = $("#secondCanvas")[0];
    var secondsContext = secondsCanvas.getContext("2d");

    secondsContext.clearRect(0, 0, secondsCanvas.width, secondsCanvas.height);
    secondsContext.beginPath();

    if(seconds == 0) {
      secondsDegree = 0;
      secondsStart = 3 * Math.PI/2;
      minutesDegree += minutesCircumference;
      drawMinute();
    }
    if((3 * Math.PI/2) == (secondsStart - secondsDegree) ) {
      secondsContext.arc(100, 50, 30, 3 * Math.PI/2, (4*secondsStart));
    } else {
      secondsContext.arc(100, 50, 30, 3 * Math.PI/2, secondsStart - secondsDegree);
    }
    secondsDegree += secondsCircumference;
    secondsContext.lineWidth = 1;
    secondsContext.strokeStyle = "green";
    if(seconds == -1) {
      seconds = 59;
    }
    secondsContext.strokeText(seconds, 95, 50);
    seconds -= 1;

    secondsContext.stroke();
  }, 1000);
}
function drawSeconds() {
  var secondsCanvas = $("#secondCanvas")[0];
  var secondsContext = secondsCanvas.getContext("2d");
  secondsContext.clearRect(0, 0, secondsCanvas.width, secondsCanvas.height);
  secondsContext.beginPath();
  if(seconds == 0) {
    secondsDegree = 0;
    minutesDegree += minutesCircumference;
    drawMinute();
    drawHour();
  }
  if((secondsStart - secondsDegree) == (3 * Math.PI/2)) {
    secondsContext.arc(100,50, 30, 3 * Math.PI/2, (4*secondsStart));
  } else {
    secondsContext.arc(100,50, 30, 3 * Math.PI/2, secondsStart - secondsDegree);
  }
  secondsContext.lineWidth = 1;
  secondsContext.strokeStyle = "green";
  if(seconds == -1) {
    seconds = 59;
  }
  secondsContext.strokeText(seconds, 95, 50);
  seconds +=1;
  seconds -= 1;
  secondsContext.stroke();
}

function drawMinute() {
  var minutesCanvas = $("#minuteCanvas")[0];
  var minutesContext = minutesCanvas.getContext("2d");
  minutesContext.clearRect(0, 0, minutesCanvas.width, minutesCanvas.height);
  minutesContext.beginPath();
  if(minutes == 0) {
    minuteStart = 3 * Math.PI/2;
    minutesDegree = 0;
    if(!display) {
      hoursDegree += hoursCircumference;
    drawHour();
  }
  }
  if((minuteStart - minutesDegree) == (3 * Math.PI/2)) {
    minutesContext.arc(100,50, 30, 3 * Math.PI/2, (4*minuteStart));
  } else {
    minutesContext.arc(100,50, 30, 3 * Math.PI/2, minuteStart - minutesDegree);

  }
  minutesContext.lineWidth = 1;
  minutesContext.strokeStyle = "blue";
if(display) {
  minutesContext.strokeText(minutes, 95, 50);
} else {
    if(minutes != 0) {
      minutes -= 1;
    } else {
      if(hours > 0) {
      minutes = 60;
      minutes -= 1;
      }
    }
minutesContext.strokeText(minutes, 95, 50);
}

  minutesContext.stroke();

}

function drawHour() {
  var hoursCanvas = $("#hourCanvas")[0];
  var hoursContext = hoursCanvas.getContext("2d");
  hoursContext.clearRect(0, 0, hoursCanvas.width, hoursCanvas.height);
  hoursContext.beginPath();
  if(hours == 0) {
    hourStart = 3 * Math.PI/2;
    hoursDegree = 0;
    if(hours ==0 && minutes ==0 && seconds == 0) {
      clearInterval(interval);
    }
  } else {
    if(!displayHours) {
        hours -= 1;
    }
  }

  if((hourStart - hoursDegree) == (3 * Math.PI/2)) {
    hoursContext.arc(100,50, 30, 3 * Math.PI/2, (4*hourStart));
  } else {
    hoursContext.arc(100,50, 30, 3 * Math.PI/2, hourStart - hoursDegree);
  }
  hoursContext.lineWidth = 1;
  hoursContext.strokeStyle = "black";
  hoursContext.strokeText(hours, 95, 50);
  hoursContext.stroke();
}
