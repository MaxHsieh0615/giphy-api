$(function(){
    populateButtons(searchArray, "searchButton", "#allButtons");
    console.log("loaded");
})

const searchArray = ["Andre Iguodala", "Javale McGee", "Klay Thompson"];

function populateButtons(searchArray, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0; i < searchArray.length; i++){
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", searchArray[i]);
        a.text(searchArray[i])
        $(areaToAddTo).append(a);
    }
}

$(document).on("click", ".searchButton", function(){
    $("#results").empty();
    var type = $(this).data("type");
    console.log(type);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=IJILX0O4Hgjr6ZDZVz4QLKC8wlurhBmX&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
          console.log(response);
        for(var i=0; i<response.data.length; i++){
            var searchDiv = $("<div class='search-item'>");
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img>");
            //add attribute all images loaded in with still version first
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            //add attr data state and referencing the still string, not the string url
            image.attr("data-state", "still");
            image.addClass("searchImage");
            searchDiv.append(p);
            searchDiv.append(image);
            $("#results").append(searchDiv);
        }
      });
})

$(document).on("click",".searchImage", function(){
    var state = $(this).attr("data-state");
    if(state == "still"){
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else{
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
})

$("#addSearch").on("click", function(){
    //grab the info from what we type into the variable newSearch, eq(0) means grab the first input value
    var newSearch = $("input").eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray, "searchButton", "#allButtons");
    //submit button always tries to reload the page and makes the page goes back to only 3 buttons, return false to prevent reloading
    return false;
})