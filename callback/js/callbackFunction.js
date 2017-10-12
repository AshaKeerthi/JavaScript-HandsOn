
//predefined callback
a("Hello", b);

//custom callback
a("Hello world", function(s) {
    console.log('2 function' + s + ", how are you?");
});


function a(s, callback) {
  console.log('a function' + s);
    callback(s);
}

function b(s) {
    console.log('a function' + s  + "!!!");
}
