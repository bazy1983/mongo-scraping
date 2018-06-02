$(document).ready(function () {

    $(".buttonText").on("click", function () {
        // expand article div box, show articles, hide button text
        $("#newArticles").addClass("expandView");
        $(".allArticles").removeClass("hidden");
        $(this).addClass("hidden");
    })

    $(".fa-compress").on("click", function () {
        // contract the article div box, hide articles, show button text
        $(this).addClass("hidden")
        $("#newArticles").removeClass("expandView");
        $("#savedArticles").removeClass("expandView");
        $(".allArticles").addClass("hidden");
        $(".allSavedArticles").addClass("hidden");
        $("#newArticles .buttonText").removeClass("hidden");
        $("#savedArticles .buttonText1").removeClass("hidden");
    })

    $(".fa-bookmark").on("click", function () {
        let bookmark = $(this) //used to change bookmark color when clicked
        // construct article object to be saved in db
        let saveArticle = {
            articleID: $(this).parent().attr("data"),
            url: $(this).prev().children().attr("href"),
            headline: $(this).prev().children().children().text().trim(),
            summary: $(this).next().children("p").text().trim(),
            image: $(this).next().children("img").attr("src")
        }
        $.post("/api/addArticle", saveArticle, function (data) {
            bookmark.css("color", "#f00")

        })
            .fail(function (err) {
                bookmark.css("color", "#0f0")

            })

    })

    $(".buttonText1").on("click", function () {
        $(".fa-compress").removeClass("hidden");
        $("#savedArticles").addClass("expandView");
        $(".allSavedArticles").removeClass("hidden");
        $(this).addClass("hidden");
        $.get("/api/getArticles", function (data) {
            $(".allSavedArticles").empty();
            $.each(data, function (i, obj) {
                let oneArticle = $(`<div data = '${obj.articleID}' class = 'storyBox'>`);
                let articleBox = $(`<div class = 'storyText'>`);
                let articleLink = $(`<a href = '${obj.url}' target = '_blank'>`);
                let articleHead = $(`<h2>`).text(obj.headline);
                let articleDelete = $(`<i class="fas fa-times" data='${obj.articleID}'></i>`);
                articleLink.append(articleHead);
                articleBox.append(articleLink, articleDelete);//
                let articleText = $(`<div class = 'image'>`);
                let articleSummary = $(`<p class = 'summary'>`).text(obj.summary);
                let articleImg = $(`<img src = '${obj.image}' alt = '${obj.articleID}'>`);
                articleText.append(articleSummary, articleImg);//
                let commentbox = $(`<div class = 'commentBox'>`);
                let comment = $(`
                <div class = 'comment'>
                <textarea></textarea>
                <p class = 'hidden'>${obj.comment}</p>
                </div>
                <div class = 'controls'>
                <i class="fas fa-save" data='${obj.articleID}'></i>
                <br>
                <i class="fas fa-eraser hidden" data='${obj.articleID}'></i>`);
                commentbox.append(comment)
                oneArticle.append(articleBox, articleText, commentbox);
                $(".allSavedArticles").append(oneArticle)
                if (obj.hasComment) {
                    $(".comment textarea").addClass("hidden");
                    $(".comment p").removeClass("hidden");
                    $(".fa-eraser").removeClass("hidden")
                }
            })
        })

        $("#savedArticles").on("click", "i", function () {
            let clicked = $(this)
            let iconClass = $(this).attr("class");
            let id = $(this).attr("data")
            switch (iconClass) {
                case "fas fa-times":
                    $.ajax({
                        url: "/api/deleteArticle",
                        data: {articleID : id},
                        method: "DELETE"
                    })
                    .done(function(){
                        clicked.parent().parent().remove();
                    })
                    break;
                case "fas fa-save":
                let newComment = $("textarea").val().trim();
                $.ajax({
                    url: "/api/comment",
                    data : {articleID : id, 
                        hasComment : true, 
                        comment : newComment
                    },
                    method : "UPDATE"
                })
                break;
            }
        })
    })
})