//Populates the paragraph tag with an id of 'currentDay' with the todays date
$("#currentDay").text(moment().format('dddd, MMMM Do'))


//for loop that creates 9 rows of 3 columns
var eRowHtml =""
var workHours = [9,10,11,12,1,2,3,4,5]

for(let i=0;i<9;i++){

    //conditional statement to distinguish between AM and PM
    if(i<3){

        var rowHtml = `<div class="row row${i}">

                                <div class="col-sm border-top border-right border-bottom border-dark" id="time${[i]}">
                                ${workHours[i]}AM
                                </div>
                                
                                <input type="text" id="textbox${[i]}" class="col-sm-9">
                                
                                
                                <button class="btn btn-primary col-sm" type="submit" id="save${[i]}">Save</button>
                                

                       </div>`


    
    eRowHtml = eRowHtml+" "+rowHtml
    }
    else{

        var rowHtml = `<div class="row row${i}">

                                <div class="col-sm border-top border-right border-bottom border-dark" id="time${[i]}">
                                ${workHours[i]}PM
                                </div>
                                
                                <input type="text" id="textbox${[i]}" class="col-sm-9">
                                
                                
                                <button class="btn btn-primary col-sm" type="submit" id="save${[i]}">Save</button>
                                

                       </div>`


    
    eRowHtml = eRowHtml+" "+rowHtml

    }
}



//jQuery that populates the container div with 9 rows of 3 columns
$(".container").html(eRowHtml)






//Conditional logic to control the color of the textboxes
for(let i in workHours){

    var htmlTime = $(`#time${i}`).text().trim()
    var timeFromNow = moment(htmlTime,"hA").fromNow()
    var currentTimeA = moment().format('hA')

   
    

    if(htmlTime===currentTimeA){
        $(`#textbox${i}`).attr("class","col-sm-9 bg-danger")
    }
    else if(timeFromNow.includes("ago")){
        $(`#textbox${i}`).attr("class","col-sm-9 bg-secondary")
    }
    else if(timeFromNow.includes("in")){
        $(`#textbox${i}`).attr("class","col-sm-9 bg-success")
    }


}
    
//function that runs in the click event listener

function storeLocally(event){
    
    //Creating a relationship between the save button clicked and the corresponding textbox on it's row
    var saveIndex = event.target.getAttribute("id")[4]
    var textboxValue = $(`#textbox${saveIndex}`).val()
    
    //setting the value in the textbox to a local storage key
    localStorage.setItem(`event${saveIndex}`,textboxValue)

    
        
    




}

//function that runs when the document is ready. Used to retrieve info from local storage
function getLocally(){

  
    for(let i=0;i<9;i++){

        if(localStorage.getItem(`event${i}`)){

            $(`#textbox${i}`).val(localStorage.getItem(`event${i}`)) 

        }
    }
    
    
}


//Event listener that runs when you click the save button



$("body").on("click",storeLocally)

//Calling values saved to local storage when the page is open
$(document).ready(getLocally)

