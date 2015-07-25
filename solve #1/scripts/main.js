var main = function() {
 	$(window).bind('scroll', function () {
	    if ($(window).scrollTop() > 80) {
	        $('#main').find('thead').find('th').each( function() {
	        	$(this).addClass('sticky');
	        });
	    } else {
	        $('#main').find('thead').find('th').each( function() {
	        	$(this).removeClass('sticky');
	        });
	    }
	});

	var allCells = $("#main td,#main th");

	allCells.mouseover( function() {
	    var el = $(this), pos = el.index();
	    el.parent().find("th, td").addClass("hover");
	    allCells.filter(":nth-child(" + (pos+1) + ")").addClass("hover");
	  });
	allCells.mouseout( function() {
	    allCells.removeClass("hover");
	  });

	$("#main tbody tr").click( function() {
		var InfoWindow = window.open("", $(this).find("td.id").html(), "width=500, height=400, top=100, left=300");
		InfoWindow.document.write($(this).find("td.info").html());
	});

	$("#arrive").click( function() {
		$('.arrival').removeClass('hidden');
		$('.departure').addClass('hidden');
		$('#depart').removeClass('active');
		$('#all').removeClass('active');
		$(this).addClass('active');
	});

	$("#depart").click( function() {
		$('.departure').removeClass('hidden');
		$('.arrival').addClass('hidden');
		$('#arrive').removeClass('active');
		$('#all').removeClass('active');
		$(this).addClass('active');
	});

	$("#all").click( function() {
		$('.departure').removeClass('hidden');
		$('.arrival').removeClass('hidden');
		$('#arrive').removeClass('active');
		$('#depart').removeClass('active');
		$(this).addClass('active');
	});
}

$(document).ready(main);