$(function () {

    //Array of Giphy emotions
    var arrayGiphy = ["angry",
        "bored",
        "disappointed",
        "drunk",
        "embarrassed",
        "excited",
        "frustrated",
        "happy",
        "hungry",
        "inspired",
        "lonely",
        "love",
        "nervous",
        "pain",
        "reaction",
        "relaxed",
        "sad",
        "sassy",
    ];
    var gifDivRow = "";
    var gifDivCol = "";
    //call a function to create buttons into the DOM
    createButtons(arrayGiphy);

    function createButtons(array) {

        for (i = 0; i < array.length; i++) {

            $(".containerButtons").append("<button type=button data=" + array[i] + " class='buttonDisplay btn btn-info ml-3 mt-2'>" + array[i]);
        }

    };

    
    function createRow() {
        gifDivRow = $("<div>");
        gifDivRow.addClass("row");
    }
    function createCol() {
        gifDivCol = $("<div>");
        gifDivCol.addClass("col-sm-4");
    }

    function appendContent(p, giphyImage, gifDivCol) {
        gifDivCol.append(p);
        gifDivCol.append(giphyImage);
        gifDivRow.append(gifDivCol);
    }

    function removeContainer() {
        $(".gifs-appear-here").remove();
    };

    $(document).on("click", ".buttonDisplay", function () {

        removeContainer();


        var searchTerm = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                var results = response.data;
                // results.length

                var divContainer =$("<div>");
                divContainer.addClass("container gifs-appear-here ml-0 mt-5");

                for (var i = 1; i < results.length; i += 3) {


                    createRow();
                    createCol();


                    var p = $("<h6>").text("Rating: " + results[i].rating);

                    var giphyImage = $("<img>");
                    giphyImage.attr("src", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-still",results[i].images.fixed_height_still.url );
                    giphyImage.attr("data-animate",results[i].images.fixed_height.url );
                    giphyImage.attr("data-state","still");
                    giphyImage.addClass(".img-fluid .img-thumbnail rounded float-left gif");

                    appendContent(p, giphyImage, gifDivCol);

                    createCol();
                    var p = $("<h6>").text("Rating: " + results[i + 1].rating);
                   // p.addClass("font-weight-bold");

                    var giphyImage = $("<img>");
                    giphyImage.attr("src", results[i + 1].images.fixed_height_still.url);
                    giphyImage.attr("data-still",results[i+1].images.fixed_height_still.url );
                    giphyImage.attr("data-animate",results[i+1].images.fixed_height.url );
                    giphyImage.attr("data-state","still");
                    giphyImage.addClass(".img-fluid .img-thumbnail rounded float-left gif");

                    appendContent(p, giphyImage, gifDivCol);


                    createCol();
                    var p = $("<h6>").text("Rating: " + results[i + 2].rating);

                    var giphyImage = $("<img>");
                    giphyImage.attr("src", results[i + 2].images.fixed_height_still.url);
                    giphyImage.attr("data-still",results[i+2].images.fixed_height_still.url );
                    giphyImage.attr("data-animate",results[i+2].images.fixed_height.url );
                    giphyImage.attr("data-state","still");
                    giphyImage.addClass(".img-fluid .img-thumbnail rounded float-left gif");

                    appendContent(p, giphyImage, gifDivCol);

                    divContainer.append(gifDivRow , "<br>");

                }
                $("#result").append(divContainer)
            });
               
    });


    $(document).on("click", ".gif", function () {
        
        var state = $(this).attr("data-state");
        console.log(state);
  
       
        if ( state === "still") {
          var imgAnimate = $(this).attr("data-animate");
          $(this).attr("src",imgAnimate);
          $(this).attr("data-state","animate");  
        } else {
          var imgStill= $(this).attr("data-still");
          console.log(imgStill);
          $(this).attr("src",imgStill);
          $(this).attr("data-state","still");  
        }
  
       
      });

      $(document).on("click", ".submit", function () {
        event.preventDefault()
        arrayGiphy.push($(".userSearch").val());
        console.log($(".userSearch").val());

      });

})