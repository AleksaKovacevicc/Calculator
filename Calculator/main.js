$(document).ready(function(){
  basic_responsive();
    });
  $(window).on('resize', function (){
    basic_responsive();
  });





setInterval(test, 200);

function test() {
  console.log(brackets_right + " brackets_right");
  console.log(brackets_left + " brackets_left");
  console.log(brackets_right_positions + " brackets_right_positions");
  console.log(brackets_left_positions + " brackets_left_positions");
  console.log(valueOfLast + " valueOfLast");
  console.log(valueOfSecondToLast + " valueOfSecondToLast");
  console.log(queue + " queue");
  console.log(x + " x");

}


// When numbers or CE are pressed load function testLength
document.addEventListener("DOMContentLoaded", function(event) {
  var numbers = document.querySelectorAll(".digit, #back")
  numbers.forEach(el => el.addEventListener('click', testLength))
});

document.addEventListener("DOMContentLoaded", function(event) {
  var numbers = document.querySelectorAll(".digit, .oper")
  numbers.forEach(el => el.addEventListener('click', testNum))
});

var queue = []; // store key history

// display numbers and operators
function set(op) {

  document.getElementById("display").value += op;
  queue.push(op);
}

//onclick CE delete one character
function runBack() {

  if (document.case.display.value.length > 0) {
    if (brackets_right_positions.slice(-1) == document.case.display.value.length) {
      brackets_right = brackets_right - 1;
      brackets_right_positions.pop();
    }
    if (brackets_left_positions.slice(-1) == document.case.display.value.length) {
      brackets_left = brackets_left - 1;
      brackets_left_positions.pop();
    }
  }
  var val = document.case.display.value.slice(0, -1);
  document.case.display.value = val;

  if (queue.length > 0) {
    // pop last element from the array
    let last = queue.pop();

  }

};
//  Dependending of number of characters font can be changed.
function testLength() {

  if (document.case.display.value.length > 16 && document.case.display.value.length < 21) {
    document.getElementById("display").style.fontWeight = "550";
    document.getElementById("display").style.fontSize = "2em";
  } else if (document.case.display.value.length == 16 || document.case.display.value.length == 21) {
    Notiflix.Notify.Info('Font size is smaller because you have a lot of character');

  } else if (document.case.display.value.length > 21 && document.case.display.value.length < 25) {
    document.getElementById("display").style.fontWeight = "500";
    document.getElementById("display").style.fontSize = "1.75em";

  } else if (document.case.display.value.length > 25) {
    var str = document.case.display.value.length
    Notiflix.Notify.Failure('Number of your characters' + str);
    document.getElementById("display").style.fontWeight = "500";
    document.getElementById("display").style.fontSize = "1.5em";
  } else if (document.case.display.value.length >= 25) {

    runBack();
    Notiflix.Notify.Warning('Maximum number of characters you can see is 25 ');
  } else {
    document.getElementById("display").style.fontWeight = "500";
    document.getElementById("display").style.fontSize = "2.5em";
  }
}


// onclick "=" run test function
function runEquals() {
  if (document.case.display.value.length < 3) {
    Notiflix.Notify.Info('Enter more characters!');
    countBell("lenght smaller then tree");
//bracket help
  } else if (brackets_right != brackets_left) {
    if (brackets_right > brackets_left) {
      brackers_help0();

    } else {

      brackers_help1();

    }

//Check if document.case.display.value is number and test functinos
  } else if (isNaN(document.case.display.value) && brackets_right == brackets_left) {

    var equals = Math.round(eval(document.case.display.value) * 1000) / 1000;
    document.case.display.value = equals;
    document.getElementById("result").innerHTML += queue.join("") + "=" + equals + "\n";
    queue = [equals.toString() + ''];
    queue = queue + '';
    queue = queue.split('');
    document.getElementById('back').value = "CE";
    document.getElementById('back').onclick = runBack;
    Notiflix.Notify.Success('Success');

    //possition brackers
    brackets_left_positions = [];
    brackets_left = 0;
    brackets_right = 0;
    brackets_right_positions = [];
    testNum();

  } else if (document.case.display.value == "Infinity") {
    //if number is Infinity then CE will be AC and if you click on AC then you will delete all display content
    document.getElementById('back').value = "AC";
    document.getElementById('back').onclick = DeleteAll;
    Notiflix.Notify.Warning(' Number is Infinity ! ');
    countBell("Number is Infinity !");
  } else if (document.case.display.value.includes == "Infinity") {

}}

function brackers_help0() {
  var brackets_difference = brackets_right - brackets_left;
  Notiflix.Confirm.Show('Brackers help', 'We can try to fix automatically your brackers problem', 'Help', 'No', function() {
      //Yes button callback

        Notiflix.Report.Success('Brackers help','You need  ' + brackets_difference + ' more brackers ("(")!','Click');
        brackets_right = brackets_right - 1;
        brackets_right_positions.pop();


    },
    function() {
      // No button callback alert
      brackets_right = brackets_right - 1;
      brackets_right_positions.pop();
    });

}

function brackers_help1() {
  var brackets_difference = brackets_left - brackets_right;
  Notiflix.Confirm.Show('Brackers help', 'We can try to fix automatically your brackers problem', 'Help', 'No', function() {
      //Yes button callback
      for (var i = 0; i < brackets_difference; i++) {
        document.case.display.value += ")";
        brackets_right = brackets_right + 1;
        brackets_right_positions.push(document.case.display.value.length);
        queue.push(")");
      }
      Notiflix.Report.Success('Brackers help','We add ' + brackets_difference + ' more brackers !','Click');

    },
    function() {
      // No button callback alert

    });

}
//adding variables to global scope
var valueOfLast = "";
var valueOfSecondToLast = "";
var brackets_left_positions = [];
var brackets_left = 0;
var brackets_right = 0;
var brackets_right_positions = [];


//on click "(" or ")" load function brackets_counter
document.addEventListener("DOMContentLoaded", function(event) {
  var numbers = document.querySelectorAll("#bracket_left,#bracket_right")
  numbers.forEach(el => el.addEventListener('click', brackets_counter))
});
//Counter for brackers
function brackets_counter() {
  if (valueOfLast == "(" && queue.slice(-1) == valueOfLast ) {
    brackets_left = brackets_left + 1;
    if(brackets_left == 0){
      brackets_left_positions = [];
    }else{
    brackets_left_positions.push(document.case.display.value.length);
  }}


  if (valueOfLast == ")" && queue.slice(-1) == valueOfLast) {
    brackets_right = brackets_right + 1;
    if(brackets_right == 0){
      brackets_right_positions = [];
    }else{

    brackets_right_positions.push(document.case.display.value.length);
  }
  }
}
//testing function for valid number
function testNum() {

  // Anti-double operationals.
  if (Number.isInteger(Number.parseInt(document.case.display.value.slice(-1)))) {
    valueOfLast = parseInt(document.case.display.value.slice(-1)); // Last element.
  } else {
    valueOfLast = document.case.display.value.slice(-1);
  }
  if (Number.isInteger(Number.parseInt(document.case.display.value.slice(-2, -1)))) {
    valueOfSecondToLast = parseInt(document.case.display.value.slice(-2, -1)); // Second to last element.
  } else {
    valueOfSecondToLast = document.case.display.value.slice(-2, -1);
  }


  //test brackets
  if (valueOfLast == ")" && valueOfSecondToLast == "(" ) {
    document.case.display.value = document.case.display.value.slice(0, -1); // Slice one off.
    queue.pop();
    countBell("Can't end bracket now");
    Notiflix.Notify.Failure(" Can't end bracket now ");

  }
  if (valueOfLast == ")" && brackets_right > brackets_left  && queue.slice(-1) == valueOfLast) {
    document.case.display.value = document.case.display.value.slice(0, -1); // Slice one off.
    queue.pop();
    valueOfLast = queue.slice(-1);
    valueOfSecondToLast = queue.slice(-2);
    countBell("Can't place ')' try start with open '(' ");
    Notiflix.Notify.Failure(" Can't place ')' try start with open '(' ");
}
  if (valueOfLast == ")" && valueOfSecondToLast == "" ) {

document.case.display.value = document.case.display.value.slice(0, -1); // Slice one off.
    queue.pop();
    valueOfLast = queue.slice(-1);
    valueOfSecondToLast = queue.slice(-2);
    countBell("Can't place ')' try start with open '(' ");
    Notiflix.Notify.Failure(" Can't place ')' try start with open '(' ");
  }
  //two operators can't be together
  if (valueOfLast == "" || valueOfLast == null || valueOfSecondToLast == "" || valueOfSecondToLast == null) {

  } else {

    if (Number.isInteger(valueOfLast) != true && Number.isInteger(valueOfSecondToLast) != true && valueOfLast != "(" && valueOfSecondToLast != ")" && valueOfLast != ")" && valueOfSecondToLast != "(") {
      document.case.display.value = document.case.display.value.slice(0, -1); // Slice one off.
      countBell("Can't place two operators together! ");
      queue.pop();
      Notiflix.Notify.Failure("Can't place two operators together! ");
    }

    if (document.case.display.value == "Infinity") {
      document.getElementById('back').value = "AC";
      document.getElementById('back').onclick = DeleteAll;
      Notiflix.Notify.Failure(' Infinity ! ');
      countBell("Infinity !");
    } else if (document.case.display.value == "NaN") {
      document.getElementById('back').value = "AC";
      document.getElementById('back').onclick = DeleteAll;
      Notiflix.Notify.Warning(' Not a Number ! ');
      countBell(' Not a Number ! ');
    } else if (document.case.display.value.includes("/0")) {
      Notiflix.Notify.Failure(" You can't divide by 0 ! ");
      countBell("You can't divide by 0 !");

    }
  }
}

//delete all button when number is Infinity
function DeleteAll() {
  document.case.display.value = "";
}
//function for delete button dellete all
function Del() {
  Notiflix.Confirm.Show(' Confirm',
    'Are you sure you want to delete all text?', 'Yes', 'No',
    function() {
      Notiflix.Notify.Success('Text is Deleted');
      localStorage.clear();
      document.getElementById("result").innerHTML = "";
      document.case.display.value = "";
      document.getElementById("TE").value = "";

    },
    function() {
      Notiflix.Notify.Info('Text is not Deleted');
    });

  brackets_left_positions = [];
  brackets_left = 0;
  brackets_right = 0;
  brackets_right_positions = [];
  valueOfLast = "";
  valueOfSecondToLast = "";
  queue = [];
  x = 0;
  notification_count = 0;
}

//print button
function printTextArea() {
  childWindow = window.open('', 'childWindow', 'location=yes, menubar=yes, toolbar=yes');
  childWindow.document.open();
  childWindow.document.write('<html><head></head><body>');
  childWindow.document.write(document.getElementById('result').value.replace(/\n/gi, '<br>'));
  childWindow.document.write('</body></html>');
  childWindow.print();
  childWindow.document.close();
  childWindow.close();
}

//Bigger and smaller font size for history
function FontM() {
  txt = document.getElementById('result');
  style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
  currentSize = parseFloat(style);
  if (currentSize <= 10) {
    txt.style.fontSize = (currentSize + 5) + 'px';
    Notiflix.Notify.Warning('Font is smallest size 10!');

  } else {
    var font_size_now = currentSize - 5;
    txt.style.fontSize = (font_size_now) + 'px';
    Notiflix.Notify.Info('Font size is now is ' + font_size_now);

  }
}

//print button
function FontP() {
  txt = document.getElementById('result');
  style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
  currentSize = parseFloat(style);
  if (currentSize >= 50) {
    txt.style.fontSize = (currentSize - 5) + 'px';
    Notiflix.Notify.Warning('Font is smallest size 50!');

  } else {
    var font_size_now = currentSize + 5;
    txt.style.fontSize = (font_size_now) + 'px';
    Notiflix.Notify.Info('Font size is now is ' + font_size_now);

  }
}

//save textareas, display and notification  in localStorage
function updateOutput() {

  var save_button = document.getElementById('SaveBtn');

  var note_textarea = document.querySelector('#TE');
  var result_textarea = document.querySelector('#result');
  var display = document.querySelector('#display');

  Notiflix.Notify.Success('Text  has been saved ');
  localStorage.setItem('content_textarea', note_textarea.value);
  localStorage.setItem('content_result', result_textarea.value);
  localStorage.setItem('content_display', display.value);
  localStorage.setItem('brackets_right_positions', JSON.stringify(brackets_right_positions));
  localStorage.setItem('brackets_left_positions', JSON.stringify(brackets_left_positions));
  localStorage.setItem('brackets_right', brackets_right);
  localStorage.setItem('brackets_left', brackets_left);
  localStorage.setItem('valueOfLast', valueOfLast);
  localStorage.setItem('valueOfSecondToLast', valueOfSecondToLast);
  localStorage.setItem('queue', JSON.stringify(queue));
  localStorage.setItem('x', x);

}
//git button
function Git() {
  window.open("https://github.com/TheLexa", "_blank");

};
var x = 0;
var notification_count = 0;
//countBell animation
function countBell(notification) {
  notification_count++;
  x++;

  setTimeout(function() {
    document.getElementById('notification').innerText = '🔔';
    document.getElementById('notification').style.fontSize = '25px';
    setTimeout(function() {
      document.getElementById('notification').innerText = x;
      document.getElementById('notification').style.fontSize = '33px';
      setTimeout(function() {
        document.getElementById('notification').innerText = '🔔' + x;
        document.getElementById('notification').style.fontSize = '22px';
        document.getElementById('notification').style.border = "thick solid red ";
      }, 500);
    }, 700);
  }, 2000);

localStorage.setItem("notification_info_" + notification_count, notification + ' display: "' +document.case.display.value +'"');

}



//onload event for taking informations from local storage
window.onload = function() {

  //local storage savebtn
  document.getElementById('TE').value = localStorage.getItem('content_textarea');
  document.getElementById('result').innerHTML = localStorage.getItem('content_result');
  document.getElementById('display').value = localStorage.getItem('content_display');
  if (localStorage.getItem(["brackets_right_positions"]) == null ) {
    brackets_right_positions = [];
  } else {
    brackets_right_positions = JSON.parse(localStorage.getItem(["brackets_right_positions"]));
  }
  if (localStorage.getItem(["brackets_left_positions"]) == null ) {
    brackets_left_positions = [];
  } else {
    brackets_left_positions = JSON.parse(localStorage.getItem(["brackets_left_positions"]));
  }
  brackets_right = localStorage.getItem("brackets_right");
  brackets_left = localStorage.getItem("brackets_left");
  valueOfLast = localStorage.getItem("valueOfLast");
  valueOfSecondToLast = localStorage.getItem("valueOfSecondToLast");
  if (localStorage.getItem(["queue"]) == null && screen.width > 871) {
    queue = [];
  } else {
    queue = JSON.parse(localStorage.getItem(["queue"]));
  }
///
  if (localStorage.getItem('x') != null && screen.width < 871) {

    document.getElementById('notification').innerHTML = localStorage.getItem('x') + "🔔";
    x = localStorage.getItem('x');
  } else {
x = 0;

  }
  var save_button = document.getElementById('SaveBtn');
  var equal_button = document.getElementById('equal');
  save_button.addEventListener('DOMContentLoaded', updateOutput);
  equal_button.addEventListener('click', runEquals);


  queue = [document.case.display.value.toString() + ''];
  queue = queue + '';
  queue = queue.split('');

  type_writer_history();
  type_writer_note();

}


//when press bell
function notif() {
  Notiflix.Confirm.Show('Answer', 'Do you want to delete' + ' ' + '(' + x + ')' + ' ' + 'notification', 'Show Notification',
    'Yes Delete Notification',
    function() {
      Notiflix.Report.Success(
        ' Success', 'We put notification in Note', 'Click');
        for (var z = 0; z < notification_count; z++) {
            document.getElementById('TE').value += localStorage.getItem('notification_info_'+z) ;
            document.getElementById('TE').value += "\n";
        }


    },
    function() {
        x = 0;
        localStorage.removeItem('x');

    });
};
//Hide / show Note textarea
function myFunction() {
  var cal = document.getElementById("Cal");
  if (cal.style.display === "none") {
    cal.style.display = "block";
  } else {
    cal.style.display = "none";
  }
}
// Every 100 secound auto save Function
setInterval(auto_save, 120000);

function auto_save() {
  updateOutput();


}

var i_note = 0;
var txt_note = "＊𝐃𝐄𝐋𝐄𝐓𝐄 - Delete all input and notification.\n＊𝐒𝐀𝐕𝐄 - Save every input when you come back again.\n＊𝐍𝐎𝐓𝐄 - Hide this textarea.";
//typing effect in note textarea in note

function type_writer_note() {
    if (i_note < txt_note.length && screen.width > 621) {
    document.getElementById("TE").placeholder += txt_note.charAt(i_note);
    i_note++;
    setTimeout(type_writer_note, 50);
  }
}
var i_history = 0;
var txt_history = "History";
//typing effect in history textarea in note
function type_writer_history() {
  if (i_history < txt_history.length) {
    document.getElementById("result").placeholder += txt_history.charAt(i_history);
    i_history++;
    setTimeout(type_writer_history, 30);
  }
}

function basic_responsive(){
    if ($(window).width() > 715) {
    $("#Git").css("margin-left", "0")
    $("#notification").css("margin-left", "95%");
} else {
  $("#Git").css("margin-left", "10000px")
  $("#notification").css("margin-left", "10000px");

}
  if ($(window).width() > 420 && $(window).width() < 871) {
    $("#result").css("max-height", "600px")
    $("#result").css("max-width", "200px");
    $("#SaveBtn").css("margin-left", "105px");
    $("#SaveBtn").css("width", "100px");
    $("#Del").css("width", "100px");
    document.getElementById("Del").innerHTML = "Del";
    $("#FM").css("margin-left", "10000px");
    $("#FP").css("margin-left", "10000px");
    $("#Print").css("margin-left", "10000px");
}else{
  $("#result").css("max-height", "600px")
  $("#result").css("max-width", "400px");
  $("#SaveBtn").css("margin-left", "330px");
  $("#SaveBtn").css("width", "75px");
  $("#Del").css("width", "80px");
  document.getElementById("Del").innerHTML = "Delete";
    $("#FM").css("margin-left", "250px");
    $("#FP").css("margin-left", "170px");
  $("#Print").css("margin-left", "85px");
}

if(window.innerHeight < 750 && window.innerHeight > 634){
        $("#TE").css("height", "200px");

}else{
    $("#TE").css("height", "300px");
}
if(window.innerHeight < 634) {
        $("#TE").css("height", "100px");
  }
  if(window.innerHeight < 600) {
    document.body.style.zoom = "80%";


  }else{
document.body.style.zoom = "100%"




  }

}
