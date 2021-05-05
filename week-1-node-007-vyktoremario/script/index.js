// Fetching the api and catch and display error if something goes wrong
fetch("https://swapi.dev/api/people")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    appendData(data);
  })
  .catch((err) => {
    let error = `<div class=""><h1>Error: ${err}</h1></div>`;
    document.getElementById("gridLine").innerHTML = error;
    console.log("error: " + err);
  });

//   A function that manipulates the DOM with the fetched data
function appendData(data) {
  let myData = data.results;
  let content = "";

  //   Iterating through the array of data(object) and using its values to populate the browser
  for ([index, element] of myData.entries()) {
    let src = `./assets/${index}.jpeg`;

    content += `
        <div class="cell effect box">
          <img src=${src}  alt = "star wars character"/>
          <a tabindex="0" class="btn btn-lg btn-info" role="button" data-toggle="popover" data-trigger="focus" 
          data-placement="top" title="<h3>${myData[index].name}</h3>" 
          data-content="<div class='divWidth'><h4><div>Gender: ${myData[index].gender}</div></h4>
          <h4><div>Height: ${myData[index].height}cm</div></h4></div>">${myData[index].name}</a>
        </div> 
    `;

    // A function that displays and hides additional info(popover)
    $(function () {
      $("[data-toggle=popover]").popover({
        html: true,
        content: function () {
          var content = $(this).attr("data-popover-content");
          return $(content).children("#myPopover-content").html();
        },
        title: function () {
          var title = $(this).attr("data-popover-content");
          return $(title).children("#myPopover-title").html();
        },
      });
    });
  }
  document.getElementById("gridLine").innerHTML = content;
}
