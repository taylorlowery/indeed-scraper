$(document).ready(function(){
    var jobCard = $('.jobCard');
    TweenMax.staggerTo(jobCard, 0.5, {ease: Power4.easeInOut, css: {display: "block", opacity: "1"}}, 0.25);
});