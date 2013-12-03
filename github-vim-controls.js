// ==UserScript==
// @name       Github Vim Controls
// @version    0.1
// @description  Vim controls while viewing Github repos
// @match      https://github.com/*/*
// @match      http://github.com/*/*
// @copyright  2013+, Matt Kula
// ==/UserScript==

var i = 0;
var files = $('.content');
var stack = [];

changeOpacity();

function reset(){
  if(files[0] == $('.content')[0]){
    setTimeout(reset, 300);
    return;
  }
  files = $('.content')
  changeOpacity();
}

function forward() {
  stack.push(i);
  i = 0;
  reset();
}

function backward() {
  if(stack.length > 0)
    i = stack.pop();
  else 
    i = 0;
  reset();
}

function changeOpacity() {
  files.css('opacity', '1');
  $(files[i]).css('opacity', '0.5');
}

window.onpopstate = backward;

$(document).keypress(function(event) {
  console.log(event.which);
  if(event.which == 106) {              // press j
    i += 1;
    if(i == files.length)
      i -= 1;
    changeOpacity();
  } else if(event.which === 107) {      // press k
      i -= 1;
      if(i < 0)
        i = 0;
      changeOpacity();
  } else if (event.which === 13 || event.which == 108) {      // press enter or l
    $(files[i]).find('a').click();
    forward();
  } else if (event.which == 104) {      // press h
      console.log('asdf');
    window.history.back();
  }
});