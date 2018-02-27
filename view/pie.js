var wallet

$('body').append("<div id='fixedContainer'></div>")
$('body').append("<div id='navbar'><span id='show'><img id='icon1' class='icoopen' src=''/></span><span id='hide'><span id='show'><img id='icon2' class='icoclose' src=''/></span></div>")

$('#show').click(function() {
	invert()
	reload()
})

$('#hide').click(function() {
	invert()
})

$(function() {
	$('#fixedContainer').hide()
	$('#hide').hide()
	$('#show').show()
	var imgURL = chrome.extension.getURL("img/list.png")
	document.getElementById("icon1").src = imgURL
	document.getElementById("icon2").src = imgURL
	});

function invert(){
	$('#fixedContainer').toggle()
	$('#hide').toggle()
	$('#show').toggle()
}

function initWallet(){
	if (wallet == undefined) {
		console.log('init WALLET')
		wallet = new Wallet()
		$('div.items.f-cb').each(function (idx, v){
			if (idx > 0  ) {
				value = parseFloat($(v).find('.equalValue').text());
				name = $(v).find('.fullName').text().replace(/(\r\n|\n|\r|\s)/gm,"")
				wallet.addCurrency(name, value)
			}
		})
	} else {
		console.log('using existing WALLET')
	}
}

function reload() {
	initWallet()
	var datapoints = []
	for (const [key, value] of wallet.filterBelow(0.01).entries())
		datapoints.push({y: value, label: key})

	var chart = new CanvasJS.Chart("fixedContainer", {
		animationEnabled: true,
		title: {
			text: "My portfolio"
		},
	subtitles:[
		{
			text: `Your current balance is about  ${ wallet.balance() } btc`,
			fontColor: "lightgray"
		}],
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "##0.0000 \"btc\"",
			indexLabel: "{label}",
			dataPoints: datapoints
		}]
	})
	chart.render()
}
