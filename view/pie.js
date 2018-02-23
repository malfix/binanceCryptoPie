$('body').append("<div id='fixedContainer'></div>");
$('body').append("<div id='navbar'><span id='show'><img id='icon1' class='icoopen' src=''/></span><span id='hide'><span id='show'><img id='icon2' class='icoclose' src=''/></span></div>");;

$('#show').click(function() {
	console.log('show');
	invert();
	reload();
	}
);
$('#hide').click(function() {
	console.log('hide');
	invert();
	}
);

$(function() {
	$('#fixedContainer').hide()
	$('#hide').hide();
	$('#show').show();
	var imgURL = chrome.extension.getURL("img/list.png");
	document.getElementById("icon1").src = imgURL;
	document.getElementById("icon2").src = imgURL;
	});

function invert(){
	$('#fixedContainer').toggle();
	$('#hide').toggle();
	$('#show').toggle();
}

function reload() {
	$('#fixedContainer').text("")	;
		var datapoints = []
		$('div.items.f-cb').each(function (idx, v){
			if (idx > 0  ) {
				value = parseFloat($(v).find('.equalValue').text());
				if (value > 0.0001) {
					name = $(v).find('.fullName').text().replace(/(\r\n|\n|\r|\s)/gm,"");
					datapoints.push({y: value, label: name})
				}
			}
		});

		var chart = new CanvasJS.Chart("fixedContainer", {
			animationEnabled: true,
			title: {
				text: "My  crypto wallet"
			},
			data: [{
				type: "pie",
				startAngle: 240,
				yValueFormatString: "##0.0000 \"btc\"",
				indexLabel: "{label}",
				dataPoints: datapoints
			}]
		});
		chart.render();
	}
