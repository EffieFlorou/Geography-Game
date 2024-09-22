 function shuffle(array) {
   let currentIndex = array.length,  randomIndex;

       // While there remain elements to shuffle.
       while (currentIndex != 0) {

           // Pick a remaining element.
           randomIndex = Math.floor(Math.random() * currentIndex);
           currentIndex--;

           // And swap it with the current element.
           [array[currentIndex], array[randomIndex]] = [
           array[randomIndex], array[currentIndex]];
       }
       return array;
   }
       
    function clickablePaths() {
        let paths = document.querySelectorAll("path");
        let pathName = [];
        let states= [];
        paths.forEach(path => {
            pathName.push(path.getAttribute("name"));           
        });
        pathName.forEach(name => {
            states.push(name);          
        });
        return states ;
    }
    const states= clickablePaths();
    let RandomState = shuffle(states); //let γτ δεν μπορει να αλλάξουν οι τιμές του στο restart()
   
   function EndOfGame() { 
                           //Show Pop Up Text //   ΔΙΟΡΘΩΣΗΗΗΗΗΗ!!!!!!
        let element_score = document.createElement("div");
        let element_timer = document.createElement("div");
        element_score.className = "label_score_time";    
        element_timer.className = "label_score_time";
        element_score.innerText =document.getElementById("score").innerText;
        element_timer.innerText =document.getElementById("timer").innerText;
        document.getElementById("label_score").append(element_score);
        document.getElementById("label_timer").append(element_timer);
        myPopup.classList.add("show"); 
        clearInterval(timer);
   };
   
    document.getElementById("closePopup").addEventListener("click", function() {
        $( ".label_score_time" ).remove();
    });

   function restart() {
      tr = 0 ; 
      index = 0;
      clearInterval(timer);
      RandomState = shuffle(states);
      document.getElementById("RandomState").innerText  = RandomState[index];
      $( "path" ).removeClass( "FirstTry SecondTry ThirdTry Fail" );
      document.getElementById("timer").innerText  = "0:00";
      seconds = 0 ;
      timer = setInterval(upTimer, 1000);
      document.getElementById("score").innerText ="0%" ;

} ;
        
   let tr = 0 ; 
   let index = 0 ; 
   $(document).ready(function(){
      document.getElementById("RandomState").innerText  = RandomState[index];  //index = 0 show the first region
      
      $("path").click(function(){
          //<---Change the colour -->
            if ( RandomState[index] == ( $(this).attr('name') )  ){
                switch (tr){
                    case 0 :
                        $(this).addClass("FirstTry") ;
                        document.getElementById("score").innerText  = Math.floor((document.getElementsByClassName("FirstTry").length/states.length)*100) +"%";   
                        break;
                    case 1 :
                        $(this).addClass("SecondTry") ;
                        tr = 0 ;
                        break;
                    case 2 :
                        $(this).addClass("ThirdTry") ;
                        tr = 0 ; 
                        break;
                    case 3 :
                        $(this).removeClass("blinking") ;
                        tr=0 ;
                        break;
                }
                index ++ ; 
                if (index ==  states.length){
                    EndOfGame();    
                }
                else {                
                document.getElementById("RandomState").innerText  = RandomState[index]; // show the next region
                }
            }
            else{
               if (tr==2) {
                    let right = document.getElementsByName(RandomState[index]);
                    $(right).addClass("Fail") ;
                    $(right).addClass("blinking") ;
                    tr++ ;
                } else if (tr<2){
                    tr ++;
                } 
                
           }
       
      });
   
       
   });

                  //// TIMER ///
   var seconds = 0 ; // It's a global variable!!
   var timer = setInterval(upTimer, 1000);
   
   function upTimer() {
   ++seconds;
   var minute = Math.floor((seconds ) / 60);
   var updSecond = seconds - ( minute * 60);
   document.getElementById("timer").innerText  =  minute + ":" + updSecond;
   } ; 
   


    