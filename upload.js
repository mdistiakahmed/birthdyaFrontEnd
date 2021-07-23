const months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
const days = [1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
let selectBox = document.getElementById('months');
for(let i = 0, l = months.length; i < l; i++){
    let month = months[i];
    selectBox.options.add( new Option(month) );
}

selectBox = document.getElementById('days');
    for(let i = 0, l = days.length; i < l; i++){
    let day = days[i];
    selectBox.options.add( new Option(day) );
}

formElem.onsubmit = async (e) => {
    e.preventDefault(); 
    let response = await fetch('http://localhost:8080/api/photos/addPhoto1', {
        method: 'POST',
        body: new FormData(formElem)
    });

    let result = await response.text();

    alert(result);
};