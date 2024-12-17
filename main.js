$(function () {
	/** SVG Fallback **/
	// can be removed when LE support for IE11 no longer required
	svg4everybody();
	
	/** Tooltips and Popovers **/
	$('.tooltips-link').tooltip();
	$('.popovers-link').popover({
		html: true
	}); // enable html in popover
	$('body').on('click', function (e) {
		$('[data-toggle="popover"]').each(function () {
			//the 'is' for buttons that trigger popups
			//the 'has' for icons within a button that triggers a popup
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});

	/** Tabs **/
	// Set aria attributes on tabs
	$('a[data-toggle="tab"]').click(function () {
		$('a[data-toggle="tab"]').attr("aria-selected", "false"); //deselect all the tabs 
		$(this).attr("aria-selected", "true"); // select this tab
		var tabpanid = $(this).attr("aria-controls"); //find out what tab panel this tab controls  
		$("div[role='tabpanel']").attr("aria-hidden", "true"); //hide all the panels 
		$("#" + tabpanid).focus().attr("aria-hidden", "false"); // show our panel
	})

	/** Graphic Tabs **/
	// Add/Remove active class from anchor in graphic tab
	// Used to set font color of active tab
	$('.tab-graphic a').click(function () {
		$('a.active').removeClass('active');
		$(this).addClass('active');
	});

	/** Button Disabled **/
   //$('.reveal').on('show.bs.collapse', function () {
   $.each($(".btn-reveal"), function (index, value) {
      if ($(value).hasClass('MC-QuizBtn1')) {
         // do nothing
      } else {
         var num = index + 1;
         $(value).attr("data-target", "#clickRevealq" + num);
         $(value).next(".panel-reveal").attr("id", "clickRevealq" + num);
         $(value).parent().next('.col-reveal').find('.tab-pane').attr("id", "clickRevealq" + num);
         $(value).on('click', function () {
            var $_this = $(value);
            setTimeout(function () {
               $_this.attr('disabled', true);
            }, 500);
         });
      }
   });

	//	/* responsive image within full width wrapper */
	//	$('.fullwidth-wrapper img').addClass('img-responsive');
	
	//Add Unique IDs to True & False Questions
		var TFRevealNumber = 1;
		$('.TF-Quiz').each(function () {
			$(this).find('.panel-reveal').attr('id', 'TF-QuizFeedback' + TFRevealNumber);

			$(this).find('.btn-reveal')
				.attr('data-target', '#TF-QuizFeedback' + TFRevealNumber)
				.on('click', function () {
					$(this).attr('disabled', true);
					$(this).siblings('.panel-reveal').addClass('in')
				});

			TFRevealNumber++;
		})

		//for legacy quizzes: the Check Answer button was disabled on load
		//$(".MC-QuizBtn1").removeClass("disabled");
		
		//Add Unique IDs to Multiple Choice Questions
		var MCRevealNumber = 1;
		$('.MC-Quiz').each(function () {
			var options = $(this).find('input[type=radio]');
			options.each(function (index) {
				var singleOption = $(this);
				var optionId = 'MC-ans' + MCRevealNumber + '-' + index;
				singleOption.attr({
					id: optionId,
					name: 'MC-answer' + MCRevealNumber,
					value: optionId
				});
				singleOption.siblings('label').attr('for', optionId);
			})

			$(this).find('.panel-reveal').attr('id', 'MC-QuizFeedback' + MCRevealNumber);

			$(this).find('.btn-reveal')
				.attr('data-target', '#MC-QuizFeedback' + MCRevealNumber)
				.on('click', function () {
					$(this).attr('disabled', true);
					$(this).siblings('.panel-reveal').addClass('in')
				});

			MCRevealNumber++;
		})
		
		/* Quick Assessment - Multiple Selection */
		//for legacy quizzes: the Check Answer button was disabled on load
		//$(".MS-QuizBtn1").removeClass("disabled");
		
		//Add Unique IDs to Multiple Choice Questions
		var MSRevealNumber = 1;
		$('.MS-Quiz').each(function () {
			var options = $(this).find('input[type=checkbox]');
			options.each(function (index) {
				var singleOption = $(this);
				var optionId = 'MS-ans' + MSRevealNumber + '-' + index;
				singleOption.attr({
					id: optionId,
					name: 'MC-answer' + MSRevealNumber,
					value: optionId
				});
				singleOption.siblings('label').attr('for', optionId);
			})

			$(this).find('.panel-reveal').attr('id', 'MS-QuizFeedback' + MSRevealNumber);

			$(this).find('.btn-reveal')
				.attr('data-target', '#MS-QuizFeedback' + MSRevealNumber)
				.on('click', function () {
					$(this).attr('disabled', true);
					$(this).siblings('.panel-reveal').addClass('in')
				});

			MSRevealNumber++;
		})

});

/** Trigger Click on Focus + Enter **/
$(document).keydown(function (e) {
	var keyCode = (e.keyCode ? e.keyCode : e.which);
	if (keyCode === 13) {
		$(e.target).trigger('click');
	}
});
window.cardsRan = false;

$(window).resize(function () {
	if (window.cardsRan === false) {
		$('.flip-cards').each(function () {
			getFlipCardHeightMax($(this));
		});
		window.cardsRan = true;
	}
});

/** Flip Tiles **/
$(window).load(function () {
		$('.flip-cards').each(function () {
			getFlipCardHeightMax($(this));
		});
	$('.card').click(function () {
		$(this).toggleClass('apply-flip');
	});
});

function getFlipCardHeightMax(el) {
	var maxHeight = 0;
	el.find('.card-front').each(function () {
		var currentFront = 0;
		var currentBack = 0;
		$(this).children().each(function () {
			currentFront += $(this).outerHeight(true);
		});
		$(this).next().children().each(function () {
			currentBack += $(this).outerHeight(true);
		});
		if (currentFront > maxHeight || currentBack > maxHeight) {
			maxHeight = Math.max(currentFront, currentBack);
		}
	});
	setFlipCardHeight(el, (maxHeight + 30));

	function setFlipCardHeight(el, height) {
		el.find('.content').css('height', height);
	}
}
/** Accordions - dynamically add id **/
$.each($(".accordion"), function(index) {
   $(this).attr("id", "accordion" + parseInt(index + 1));
});

/** Accordions - dynamically add interaction **/
$.each($(".accordion > .panel"), function (index, value) {
   var num = index + 1;
   $(value).children(".panel-heading").attr("id", "heading_acc_" + num);
   $(value).find(".panel-heading > .panel-title > a").attr({
      href: "#collapse_acc_" + num,
      "aria-controls": "collapse_acc_" + num
   });
   $(value).children(".panel-collapse").attr({
      id: "collapse_acc_" + num,
      "aria-labelledby": "heading_acc_" + num
   });
});

//button to open & close all accordion slides.
$('.expandall').on('click', function () {
   var nextAccordion = $(this).parent().next('.accordion');
   // in case button is not in p tag
   if ($(this).next('.accordion').length > 0) {
      nextAccordion = $(this).next('.accordion');
   }
   var nextAccId = '#' + nextAccordion.attr('id');
   //console.log(nextAccId);
   if ($(nextAccId).hasClass("show-all")) {
      $(nextAccId + ' .panel-collapse.in').collapse('hide');
      $(nextAccId).removeClass("show-all");
      $(this).text("Open All Panels");
   } else {
      $(nextAccId + ' .panel-collapse:not(".in")').collapse('show');
      $(nextAccId).addClass("show-all");
      $(this).text("Close All Panels");
   }
});

/* Hyperlink icon ONLY if NOT creator+ */

   // Function to check if an element has an ancestor with class "d2l-element"
function hasD2LElementAncestor(element) {
    let currentNode = element.parentElement;
    while (currentNode) {
        if (currentNode.classList.contains('d2l-element')) {
            return true;
        }
        currentNode = currentNode.parentElement;
    }
    return false;
}

// Get all <a> elements in the document
const allLinks = document.getElementsByTagName('a');

// Process each link
Array.from(allLinks).forEach(link => {
    if (hasD2LElementAncestor(link)) {
        console.log('Link with d2l-element ancestor:', link.href);
        // You can add any specific handling for links with d2l-element ancestors here
    } else {
        console.log('Link without d2l-element ancestor:', link.href);
        // Only add the external link icon to links without d2l-element ancestors
        if (link.target === '_blank') {
            var external_link = ' <span class="sr-only">opens in new window</span><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>';
            link.insertAdjacentHTML('beforeend', external_link);
        }
    }
});
