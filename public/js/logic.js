$(document).ready(function(){

    $("#newArticles").on("click", function(){
        $(this).toggleClass("expandView")
        $(".allArticles").toggleClass("hidden")
        $("#newArticles .buttonText").toggleClass("hidden")
    })

    $("#savedArticles").on("click", function(){
        $(this).toggleClass("expandView")
    })
})