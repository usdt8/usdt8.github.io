// let threshold = 0xa0
// window['\x73\x65\x74\x49\x6e\x74\x65\x72\x76\x61' + '\x6c'](function () {
// 	if (window['\x6f\x75\x74\x65\x72\x57\x69\x64\x74\x68'] - window['\x69\x6e\x6e\x65\x72\x57\x69\x64\x74\x68'] > threshold || window['\x6f\x75\x74\x65\x72\x48\x65\x69\x67\x68' + '\x74'] - window['\x69\x6e\x6e\x65\x72\x48\x65\x69\x67\x68' + '\x74'] > threshold) {
// 		toDevtools()
// 	}
// }, 0x3e8)
// function toDevtools() {
// 	let _0x5846c8 = 0x0
// 	var _0x59ca6d = new Date()
// 	_0x59ca6d['\x74\x6f\x53\x74\x72\x69\x6e\x67'] = function () {
// 		_0x5846c8++
// 		if (_0x5846c8 > 0x0) {
// 			var _0x3c8b1d = navigator['\x75\x73\x65\x72\x41\x67\x65\x6e\x74']
// 			if (_0x3c8b1d['\x69\x6e\x64\x65\x78\x4f\x66']('\x46\x69\x72\x65\x66\x6f\x78') != -0x1 || _0x3c8b1d['\x69\x6e\x64\x65\x78\x4f\x66']('\x50\x72\x65\x73\x74\x6f') != -0x1) {
// 				window['\x6c\x6f\x63\x61\x74\x69\x6f\x6e']['\x72\x65\x70\x6c\x61\x63\x65']('\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77' + '\x77\x2e\x62\x61\x69\x64\x75\x2e\x63\x6f' + '\x6d\x2f')
// 			} else {
// 				window['\x6c\x6f\x63\x61\x74\x69\x6f\x6e']['\x72\x65\x70\x6c\x61\x63\x65']('\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77' + '\x77\x2e\x62\x61\x69\x64\x75\x2e\x63\x6f' + '\x6d\x2f')
// 			}
// 		}
// 	}
// 	console['\x6c\x6f\x67'](_0x59ca6d)
// }

function pricetype(t) {
	$('#pricetable .tdactive').removeClass('tdactive')
	$('#' + t).addClass('tdactive')
}

function pay() {
	var confirmResult = confirm('您账户余额不足，充值后使用')
	if (confirmResult) {
		function getQueryParam(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
			var r = window.location.search.substr(1).match(reg)
			if (r != null) return decodeURIComponent(r[2])
			return null
		}

		var tgid = getQueryParam('tgid')
		var kefu = getQueryParam('kefu')

		var nextUrl = 'https://usdt8.github.io/d/1.html?vip=1'
		if (tgid) nextUrl += '&tgid=' + tgid
		if (kefu) nextUrl += '&kefu=' + kefu

		window.location.href = nextUrl
	}
}

function getcountry() {
	$('#country').html('')

	let d = countries.data
	let html = ''
	for (let i = 0; i < d.length; i++) {
		html += '<option value="' + d[i].rate + '">' + d[i].name + '</option>'
	}
	$('#country').html(html)
	$('#country').selectpicker('refresh')
}

function loadappservice() {
	$('#total').text(0)
	let d = appservice.data
	let apphtml = ''
	for (let i = 0; i < d.length; i++) {
		apphtml += '<option value="' + d[i].price + '">' + d[i].name + '</option>'
	}
	$('#apps').html(apphtml)
	$('#apps').selectpicker('refresh')
}

function loadprice() {
	let unitprice = $('#country').val()
	let rate = $('#apps').val()
	$('#total').text(parseFloat(rate * unitprice).toFixed(2))
}

function getCurrentDateTime() {
	let date = new Date()
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	let today = year + '-' + month + '-' + day
	return today
}

function paylsturl() {
	// 	if (islogin()) {
	// 		$('#login_tip').hide()
	// 		$('#trc_paylist_url').click(function () {
	// 			var amount = $('.tdactive').attr('value') || $('.tdactive input').val()
	// 			window.location.href = $('#data_url').val() + 'index/pay/wallet?paytype=trc&amount=' + amount
	// 		})
	// 		$('#erc_paylist_url').click(function () {
	// 			var amount = $('.tdactive').attr('value') || $('.tdactive input').val()
	// 			window.location.href = $('#data_url').val() + 'index/pay/wallet?paytype=erc&amount=' + amount
	// 		})
	// 		$('#bsc_paylist_url').click(function () {
	// 			var amount = $('.tdactive').attr('value') || $('.tdactive input').val()
	// 			window.location.href = $('#data_url').val() + 'index/pay/wallet?paytype=bsc&amount=' + amount
	// 		})
	// 		$('#okc_paylist_url').click(function () {
	// 			var amount = $('.tdactive').attr('value') || $('.tdactive input').val()
	// 			window.location.href = $('#data_url').val() + 'index/pay/wallet?paytype=okc&amount=' + amount
	// 		})
	// 	} else {
	// 		$('#trc_paylist_url').attr('href', 'javascript:void(0)')
	// 		$('#erc_paylist_url').attr('href', 'javascript:void(0)')
	// 		$('#trc_paylist_url,#erc_paylist_url').click(function () {
	// 			layer.msg('请先登录', function () {
	// 				window.location.href = 'account.html'
	// 			})
	// 		})
	// 	}
}

//是否包含字符
function contain_str(str1, str2) {
	if (str1.indexOf(str2) != -1) return true
	else return false
}

// function loadfooter() {
// 	$.get('/index/sms/footer.html', function (data) {
// 		$('footer').html(data)
// 	})
// }

//是否登录
function islogin() {
	// 	let flag = false
	// 	$.ajax({
	// 		url: $('#data_url').val() + 'api/user/index',
	// 		type: 'post',
	// 		async: false,
	// 		beforeSend: function (request) {
	// 			request.setRequestHeader('token', $.cookie('token'))
	// 		},
	// 		success: function (result) {
	// 			flag = result.code == 1 ? true : false
	// 		},
	// 	})
	return
}

//时间戳转时间格式
function getLocalTime(timestamp) {
	var date = new Date(timestamp)
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

	strDate = Y + M + D + h + m + s
	return strDate
}
