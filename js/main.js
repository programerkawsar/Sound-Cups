//jQuery ready function
$(function() {
    //Use bootstrap popover
    $('[data-toggle="popover"]').popover({
        trigger: 'focus'
    });

    //Calling all functions
    playPause();
    volumeSliderFade();
    eachSoundOffOn();
    volumeControl();
    infoBtnActiveCheck();
})

//Play and Pause functionality
function playPause() {
    $('.big-icon').click(function() { // <--Selector
        if(!$('#soundOffOn').hasClass('active')) { //It is for sound muted check. If selector '#soundOffOn' not has class 'active'
            var $this = $(this); //Current selector
            var id = $this.attr('id').replace(/btn/, ''); //Getting id and replacing
            
            $this.toggleClass('active'); //Adding 'active' class remove also

            /* 
                Select all audio elements where id is similar name 'sound' for example id is 'sound1' last number will be changed.
                We know every array start in '0' but our 'id' number started in '1'.
                Example: id is 'sound1' array value is '0' 1-1 = 0 this for matching our array value.
            */
            if($this.hasClass('active')) { //Checking if class 'active' then sound is playing
                $('audio[id^="sound"]')[id-1].play(); //Sound play
            }else {
                $('audio[id^="sound"]')[id-1].pause(); //Sound pause
            }
        }
    });
}

//Volume Slider fadeIn and fadeOut functionality
function volumeSliderFade() {
    $('.big-icon').click(function() { // <--Selector
        if($(this).hasClass('active')) { //Checking if class 'active' then fadeIn Volume Slider
            $(this).next().filter('.volume-slider').fadeIn(); //fadeIn Volume Slider
        }else {
            $(this).next().filter('.volume-slider').fadeOut(); //fadeOut Volume Slider
        }
    });
}

//Each of sounds on and off functionality
function eachSoundOffOn() {
    $('#soundOffOn').click(function() { // <--Selector
        $(this).toggleClass('active'); //Adding 'active' class remove also

        if($(this).hasClass('active')) { //Checking if class 'active'
            $('audio').each(function() { //Select all of audio elements
                this.pause(); //Paused all of sounds 
                $('.big-icon').removeClass('active');
                $('.volume-slider').fadeOut();
            }); 
        }
    });
}

//Volume control functionality
function volumeControl() {
    var sliderValue; //This variable for store slider value

    $('.big-icon').click(function() { // <--Selector
        if($(this).hasClass('active')){ //Checking if class 'active'
            var id = $(this).nextAll().slice(1, 2).filter('audio').attr('id'); //Getting id form step 3 next elements on selector
            var replace = id.replace(/sound/, ''); //Replacing id

            /*
                We are has lots of lots audio elements and every element has sound control slider.
                It is not possible to create separate functions for every sound control slider.
                So we've all done with one function by getting current class to 3 step next elements id
            */
            $('#slider' + replace).slider({ //This selector was provide multiple id's
                value : sliderValue ? sliderValue : 70, //Checking if slider value stored then set the value or not. If it has no stored value then set by default 70
                step  : 1,
                range : 'min',
                min   : 0, //Slider min value
                max   : 100, //Slider max value
                slide : function(){ //This function worked on slide
                    var value = $(this).slider("value"); //Get current slider value
                    $('audio[id^="sound"]')[replace-1].volume = (value / 100); //Set audio element volume
                    sliderValue = value; //Stored slider value on this 'sliderValue' variable
                }
            });

            //This is for by default volume
            if(!sliderValue) {
                $('audio[id^="sound"]')[replace-1].volume = 0.7;
            }
        }
    });
}

//Info button active check functionality
function infoBtnActiveCheck() {
    /*
        Selector has 'active' class then remove this.
        Selector not has 'active' class then add this.
    */
    $('.information').click(function() { // <--Selector
        $('.information').removeClass('active');
        $(this).addClass('active');
    });

    setInterval(function() { //This function called every 10 mili sec
        if(!$('.popover').is(':visible')) { //Checking bootstarp popover visible or not
            if($(".information").hasClass("active")) { //Checking if class 'active'
                $('.information').removeClass('active'); 
            }
        }
    }, 10);
}