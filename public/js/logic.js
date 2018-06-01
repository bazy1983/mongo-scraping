$(document).ready(function(){

    $(".buttonText").on("click", function(){
        $("#newArticles").addClass("expandView")
        $(".allArticles").removeClass("hidden")
        $("#newArticles .buttonText").addClass("hidden")
    })

    $(".fa-compress").on("click", function(){
        $("#newArticles").removeClass("expandView")
        $(".allArticles").addClass("hidden")
        $("#newArticles .buttonText").removeClass("hidden")
    })

    $(".fa-bookmark").on("click", function(){
        
    })

    $(".buttonText1").on("click", function(){
        $("#savedArticles").addClass("expandView")
    })
})