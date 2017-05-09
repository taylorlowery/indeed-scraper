$('document').ready(function(){
    var jobCard = $('#searchWrapper');
    TweenMax.staggerFrom(jobCard, 0.35, {css: {display: "none", opacity: "0"}}, 0.25);
    $('.jobCard').css('background-color',"red");
});