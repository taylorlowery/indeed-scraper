window.onload = thing;

function thing(){
    $('.jobCard').each(function(i){
        var card = $(this);
        setTimeout(function(){
            this.animate({"background-color": red}, 1000)
        }, 250 * i);
    });
    
};
