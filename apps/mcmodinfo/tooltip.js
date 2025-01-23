document.addEventListener('mousemove', function(e){
    $(".tooltip").css("top",e.clientY+16+"px");
    $(".tooltip").css("left",e.clientX+16+"px");
}, false);