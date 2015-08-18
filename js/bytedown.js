(function() {
	"use strict";

var b1;
var b2;
var b3;
var b4;
var b5;
var b6;
var b7;
var b8;
var bit;
var decider;
var score = 0;
var usersAnswer;
var bits = $(".bits");
var currentValueInDecimal;
var counter = $(".counter");
var btnAnswer = $('.btn-answer');
var bitValues = $(".bit-values");
var answerField = $(".answer-field");
var btnHideShow = $('.btn-hide-show');
var bitContainer = $(".bit-container");


//                                           * Core Logic: Function Junction *
// ===========================================================================>

/* ----------------------------------------
1. First we'll create a utility to randomly
   determine whether our bit value will be
   a 1 or a 0
---------------------------------------- */
var determineBitValue = function() {

	decider = Math.random();

		if (decider < 0.5) {
			bit = 0;
		} else {
			bit = 1;
		}
};



	/* -----------------------------------------
	1.1 Then depending on which value we receive 
	    we'll either apply one color or another.
	    This is to help with pattern recognition.
	----------------------------------------- */
	var highlightNumbers = function() {
		for(var i = 0; i < bitContainer.length; i++) {
			if(bitContainer.eq(i).html() == 1) {
				bitContainer.eq(i).css("color", "rgb(104,187,93)");
			} else {
				bitContainer.eq(i).css("color", "rgb(197,102,145)");
			}
		}
	};




/* --------------------------------------------------------
2. Then we use a for loop plus the two functions from above
   to populate the byte with 1's and 0's
-------------------------------------------------------- */
var populateBits = function() {

	for(var i = 0; i <= bitContainer.length; i++) {
		determineBitValue();
		bitContainer.eq(i).html(bit);
		highlightNumbers();

	}
};



	/* ---------------------------------------
	2.2 Then once the 1's and 0's are in place
	    we use the following function to 
	    determine the decimal value of the byte
	    so that we have the ability to verify 
	    whether the user is correct
	--------------------------------------- */

	var gatherAndAssignValues = function() {

			if(bitContainer.eq(0).html() == 1) {
				b1 = 128;
			} else {
				b1 = 0;
			}
			if(bitContainer.eq(1).html() == 1) {
				b2 = 64;
			} else {
				b2 = 0;
			}
			if(bitContainer.eq(2).html() == 1) {
				b3 = 32;
			} else {
				b3 = 0;
			}
			if(bitContainer.eq(3).html() == 1) {
				b4 = 16;
			} else {
				b4 = 0;
			}
			if(bitContainer.eq(4).html() == 1) {
				b5 = 8;
			} else {
				b5 = 0;
			}
			if(bitContainer.eq(5).html() == 1) {
				b6 = 4;
			} else {
				b6 = 0;
			}
			if(bitContainer.eq(6).html() == 1) {
				b7 = 2;
			} else {
				b7 = 0;
			}
			if(bitContainer.eq(7).html() == 1) {
				b8 = 1;
			} else {
				b8 = 0;
			}

			currentValueInDecimal = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8;
	};




/* ----------------------------------------
3. Then once the user has entered a value,
   we use this function to determine if the 
   answer is correct
---------------------------------------- */
var validateAnswer = function() {
	
	usersAnswer = answerField.val();

	if(usersAnswer == currentValueInDecimal) {
		populateBits();

		btnAnswer.html("Submit");
		incrementCounter();

			answerField.each(function() {
				this.value = '';
			});

	} else {
		btnAnswer.html('Try Again');
	}

};



	/* ---------------------------------
	3.3 If the users answer was correct
	    we then move the score up by one
	--------------------------------- */
	var incrementCounter = function() {
		score++;
		counter.html('Score: ' + score);
	};




//                                                   * User Initiated Events *
// ===========================================================================>

btnAnswer.click(function(e) {
	e.preventDefault();

	if(btnAnswer.html() === 'Go') {

		btnAnswer.html("Submit");
		bitValues.slideUp(800);
		btnHideShow.html('Show Hint');
		counter.fadeIn(800);
		populateBits();
		bits.show();

	} else {
		gatherAndAssignValues();
		validateAnswer();
	}
});

// Allows user to press 'Enter' instead of the submit button
answerField.bind('keypress', function(e) {
	if(e.keyCode==13){
		gatherAndAssignValues();
		validateAnswer();

	}
});

// Reveals and hides the hint section
btnHideShow.click(function() {
	if(btnHideShow.html() === 'Show Hint') {
		bitValues.slideDown(800);
		btnHideShow.html('Hide Hint');
	} else {
		bitValues.slideUp(800);
		btnHideShow.html('Show Hint');
	}
});



counter.hide();
bits.hide();


})();