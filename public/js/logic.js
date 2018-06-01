$(document).ready(function(){

    $(".buttonText").on("click", function(){
        // expand article div box, show articles, hide button text
        $("#newArticles").addClass("expandView")
        $(".allArticles").removeClass("hidden")
        $("#newArticles .buttonText").addClass("hidden")
    })

    $(".fa-compress").on("click", function(){
        // contract the article div box, hide articles, show button text
        $("#newArticles").removeClass("expandView")
        $(".allArticles").addClass("hidden")
        $("#newArticles .buttonText").removeClass("hidden")
    })

    $(".fa-bookmark").on("click", function(){
        $(this).css("color" , "#F00")
        // construct article object to be saved in db
        let saveArticle = {
            articleID : $(this).parent().attr("data"),
            url : $(this).prev().children().attr("href"),
            headline : $(this).prev().children().children().text().trim(),
            summary : $(this).next().children("p").text().trim(),
            image : $(this).next().children("img").attr("src")
        }
        $.post("/api/addArticle", saveArticle, function(data){
            console.log(data)
        })
    })

    $(".buttonText1").on("click", function(){
        $("#savedArticles").addClass("expandView")
    })
})