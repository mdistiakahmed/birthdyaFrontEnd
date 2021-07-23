const months = ["January", "February", "March", "April", "May", "June", "July", "August",
"September", "October", "November", "December"];
const cumulativeSums = [31, 59, 90, 120, 151, 181, 212, 243, 274, 304, 335, 365];
const days = [1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];


// Set month select options
let selectBox = document.getElementById('months');
for(let i = 0, l = months.length; i < l; i++){
  let month = months[i];
  selectBox.options.add( new Option(month) );
}

// Set day select options
selectBox = document.getElementById('days');
for(let i = 0, l = days.length; i < l; i++){
  let day = days[i];
  selectBox.options.add( new Option(day) );
}

let allBirthdayEvents = new Array();

function findEventsOnBirthDay(){
    // Calculate day (1~365) from input month and day
    let m = document.getElementById("months").value;
    let d = parseInt(document.getElementById("days").value);
    let cum_day = 0;
    for(let i=0;i<months.length ;i++){
        if(months[i] === m){
            if(i>0) {
                console.log(i);
                console.log(cumulativeSums[i-1]);
                cum_day = cumulativeSums[i-1];
            }
            break;
        }
    }
    cum_day = cum_day + d;
    // Call the GET Api with day as parameter
    fetch("http://localhost:8080/api/photos/getAllPhoto?day="+cum_day)
        .then(response => {
           return response.json();
        }).then(json=>{
            // Clear the screen
            removeelement();
            // Set title, descriptino and photo as a list 
            Object.entries(json).forEach(([key, value]) => {
                let title = value["title"];
                let description = value["description"];
                let myPhoto = value["image"].data;

                let x = "data:image/;base64,"+myPhoto;
                let imgString = "<img  src=\"" + x +  "\">";
                var completelist= document.getElementById("theEventList");
                completelist.innerHTML += imgString;
                completelist.innerHTML += "<li>" + title + "</li>";
                completelist.innerHTML += "<li>" + description + "</li>";
            })
           
        }).catch(function(error){
            console.log(error);
        })
}

// clear the display list
function removeelement() {
    var completelist= document.getElementById("theEventList");
    
    completelist.innerHTML = '';
}


        


