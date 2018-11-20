$(function () {

    //Array of Giphy emotions
    var arrayGiphy = ["love",
        "inspired",
        "sick",
        "scared",
        "happy",
        "excited",
        "frustrated",
        "shocked",
        "hungry",
        "lonely",
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
        //iterate through the array 
        for (i = 0; i < array.length; i++) {

            $(".containerButtons").append("<button type=button data=" + array[i] + " class='buttonDisplay btn btn-success ml-3 mt-2'>" + array[i]);
        }

    };

    //create Row 
    function createRow() {
        gifDivRow = $("<div>");
        gifDivRow.addClass("row");
    }

    //create column
    function createCol() {
        gifDivCol = $("<div>");
        gifDivCol.addClass("col-4");
    }

    //append content to the divs created
    function appendContent(p, giphyImage, gifDivCol) {
        gifDivCol.append(p);
        gifDivCol.append(giphyImage);
       // gifDivRow.append(gifDivCol);
    }

    //remove container
    function removeContainer() {
        $(".gifs-appear-here").remove();
    };

    //Click listener to buttons of the array
    $(document).on("click", ".buttonDisplay", function () {
        // clear the container
        removeContainer();

        //get the query search term
        var searchTerm = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=dc6zaTOxFJmzC&limit=12";

        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;

                //create a container for the images
                var divContainer = $("<div>");
                divContainer.addClass("row gifs-appear-here ml-0 mt-5");

                //iterate through the array three by three
                for (var i = 1; i < results.length; i++) {

                    console.log(i);
                    //create a row and column 
                    //createRow();
                    createCol();

                    // create Giphy element to be displayed to the DOM
                    var p = $("<h6>").text("Rating: " + results[i].rating);

                    var giphyImage = $("<img>");
                    giphyImage.attr("src", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                    giphyImage.attr("data-state", "still");
                    // giphyImage.addClass(".img-fluid .img-thumbnail rounded float-left gif");

                    appendContent(p, giphyImage, gifDivCol);

                    

                    divContainer.append(gifDivCol);

                }
                $("#result").append(divContainer)
            });

    });

    //click listener to the gif
    $(document).on("click", ".gif", function () {
        // get the state of the gif
        var state = $(this).attr("data-state");


        // check if still or animate and change images accordingly 
        if (state === "still") {
            var imgAnimate = $(this).attr("data-animate");
            $(this).attr("src", imgAnimate);
            $(this).attr("data-state", "animate");
        } else {
            var imgStill = $(this).attr("data-still");
            console.log(imgStill);
            $(this).attr("src", imgStill);
            $(this).attr("data-state", "still");
        }


    });

    //click listener to search button
    $(document).on("click", ".submit", function () {

        event.preventDefault()
        //push search to the array and reset search 
        arrayGiphy.push($(".userSearch").val());
        $(".userSearch").val("");

        //Add button to the DOM
        lastPosition = arrayGiphy.length - 1
        $(".containerButtons").append("<button type=button data=" + arrayGiphy[lastPosition] + " class='buttonDisplay btn btn-success ml-3 mt-2'>" + arrayGiphy[lastPosition]);


    });

})