// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://github.com/*/*
// @match      http://github.com/*/*
// @copyright  2012+, You
// ==/UserScript==


var i = 0;
var files = $(".content");
var stack = [];

changeOpacity();

function reset(){
    setTimeout(function(){
        files = $('.content')
        changeOpacity();
    }, 500);
}

function forward(){
    stack.push(i);
    i = 0;
    reset();
}

function backward(){
    if(stack.length > 0)
    	i = stack.pop();
    else 
        i = 0;
    reset();
}

function changeOpacity(){
    files.css('opacity', '1');
    $(files[i]).css('opacity', '0.5');
}

window.onpopstate = backward;

$(document).keypress(function(event){
    if(event.which == 106){   
        i += 1;
        if(i == files.length)
            i -= 1;
        changeOpacity();  
    }else if(event.which == 107){   
        i -= 1;
        if(i < 0)
            i = 0;
        changeOpacity();
    }else if(event.which == 13){
        $(files[i]).find('a').click();
        forward();     
    }      
});

