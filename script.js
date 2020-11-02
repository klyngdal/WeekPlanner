
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $("#text" + key).text(value);
    }
}

$( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (let i = 7; i < 20; i++) {
    
        // row
        let row = $(`<div data-time=${i} id='${i}' class="row">`);

        // column
        let col1 = $('<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + '</p>');

        // column 
        let col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here..."></textarea>`);        
       
        // column 
        let col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
        
        // append col to row
        row.append(col1);
        row.append(col2);
        row.append(col3);

        // add rows to container
        $(".container").append(row);

        getLocalStorage(i);
    }

    function formatAMPM(hours) {
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
formatAMPM();
    // current time
    
    let hour = moment().hour();
    let minute = moment().minute();
    let second = moment().second();


// creating clock
   // let updateColors = setInterval(function() {
     //   second++;
       // if(second>=60){
         //   second=0;
           // minute++
            //if(minute>=60){
              //  hour++;
               // if(hour>=24){
                 //   clearInterval(undateColors);
                   // setCurrentDateTime(container);
               // }
                // updateColors();
           // }
       //  }
       //  formatedHour = getLocalStorage(hour, minute, second);
      //   updateColors.text(formatedHour);
  //   },1000)



    function updateColors(){
        let currentTime = new Date().getHours();
            for (let i = 7; i < 20; i++) { 
            console.log(currentTime, $(`#${i}`).data("time"));
            if ($(`#${i}`).data("time") == currentTime){
           $(`#text${i}`).addClass( "present");
         } else if (currentTime < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass( "future");
         }
      }
 }
setInterval(function() {
     updateColors();
 }, 1000);

 // creating hover btn 
let saveBtn = $('.saveBtn');
saveBtn.on('click', function(){
    let eventId = $(this).attr('id');
    let eventText = $(this).parent().siblings().children('.description').val();
    localStorage.setItem(eventId, eventText);
});});