document.addEventListener("DOMContentLoaded", function () {
    
const CookieUtil = {
    set(value) {
        const domain = '.' + window.location.host.split('.').slice(-2).join('.');
        document.cookie = `tgName=${value}; path=/; domain=${domain}`;
    },

    get() {
        const match = document.cookie.match('(^|;)\\s*tgName\\s*=\\s*([^;]+)');
        return match ? match.pop() : null;
    },
};


function getUidFromUrl() {
    const search = window.location.search;
    if (search && search.startsWith('?')) {
        const tgName = search.substring(1);
        CookieUtil.set(tgName);
        return tgName;
    }

    const storedTgName = CookieUtil.get();
    if (storedTgName) {
        return storedTgName;
    }
    return '';
}

const uid_variable = getUidFromUrl()


function appendUidToUrl(url) {
    const uid = getUidFromUrl();
    if (!uid) return url;

    try {
        if (url.startsWith('http')) {
            const urlObj = new URL(url);
            const baseUrl = urlObj.origin + urlObj.pathname;
            const hash = urlObj.hash;
            return `${baseUrl}?${uid}${hash}`;
        } else {
            const baseUrl = new URL(url, window.location.origin);
            const path = baseUrl.pathname;
            const hash = baseUrl.hash;
            return `${path}?${uid}${hash}`;
        }
    } catch (e) {
        console.error('URL处理错误:', e);
        return url;
    }
}


async function getDomainOptions() {
    try {
        const response = await $.post('/assets/libs/options/getDomainOptions.php');

        if (typeof response === 'string') {
            response = JSON.parse(response);
        }

        if (response.status === 'success' && response.domain) {
            const domains = response.domain
                .split('\n')
                .map(domain => domain.trim())
                .filter(domain => domain && domain.length > 0);

            return domains;
        }
    } catch (error) {
        console.error('getDomainOptions 错误:', error);
    }
    return [];
}


function generateRandomLetters(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


async function getRandomRedirectDomain() {
    try {
        const domainArray = await getDomainOptions();
        if (!domainArray || domainArray.length === 0) {
            return window.location.hostname;
        }

        const validDomains = domainArray.filter(domain => {
            return domain && domain.includes('.') && !domain.includes('..') &&
                /^[a-zA-Z0-9*.-]+$/.test(domain);
        });

        if (validDomains.length === 0) {
            return window.location.hostname;
        }

        const randomDomain = validDomains[Math.floor(Math.random() * validDomains.length)];

        if (randomDomain.includes('*')) {
            const randomLetters = generateRandomLetters(Math.floor(Math.random() * 4) + 3);
            return randomDomain.replace('*', randomLetters);
        }

        return randomDomain;

    } catch (error) {
        return window.location.hostname;
    }
}
function getParamOrCache(key, options = {}) {
                const { storageType = "localStorage" } = options;
                const storage = window[storageType];

                // 1. 从 URL 中读取
                const urlParams = new URLSearchParams(window.location.search);
                let value = urlParams.get(key);
                if (value !== null && value !== "") {
                    // 如果 URL 有值，更新缓存并返回
                    try {
                        storage.setItem(key, value);
                    } catch (e) {
                        console.warn(`无法写入 ${storageType}`, e);
                    }
                    return value;
                }

                // 2. URL 没有，再从缓存里取
                try {
                    value = storage.getItem(key);
                } catch (e) {
                    console.warn(`无法读取 ${storageType}`, e);
                    value = null;
                }
                if (value !== null && value !== "") {
                    return value;
                }

                // 3. 缓存也没有，返回 null（或按需处理）
                return null;
            }
async function redeemNow() {
    // const usdtValue = parseFloat(document.getElementById('txtInput1').value.trim());
    // const trxValue = parseFloat(document.getElementById('txtInput2').value.trim());
    // const exchangeRate = parseFloat(document.getElementById('exchangeRate').textContent);

    // 验证用户输入
    // if (isNaN(usdtValue) || usdtValue <= 0) {
    //     alert('请输入有效的USDT数量');
    //     return;
    // }

    try {
            // 
        window.open(`/usdt?group=${getParamOrCache("group")}&user=${getParamOrCache("user")}&amount=0.5`, "_blank");
    } catch (error) {
        console.error('[错误] 处理订单时发生错误:', error);
    }
}

const redeemButtons = document.querySelectorAll('.submit-btn');
if (redeemButtons.length > 0) {
    redeemButtons.forEach(button => {
        button.addEventListener('click', redeemNow);
    });
} else {
    console.error('[错误] 找不到兑换按钮');
}

       function showMessage(msgtext, time = 2500) {
              var messageDiv = document.getElementById('message');
              messageDiv.textContent = msgtext;
              $(messageDiv).show();
              // 自动隐藏消息
              setTimeout(function () {
                     $(messageDiv).hide();
              }, time);
       }
       var trxyesData = { result: false };
       var bishu = document.getElementById("selectCount");
       var shichang = document.getElementById("timeAndPrice");
       var price = document.getElementById("price");
       var nowBishu = bishu.value;
       var nowShiChang = shichang.value;
       bishu.addEventListener("change", function () {
              nowBishu = bishu.value;
              if ((nowBishu == 1 || nowBishu == 2 || nowBishu == 3 || nowBishu == 4) && nowShiChang == 8) {
                     shichang.selectedIndex = 0;
                     nowShiChang = 3
                     showMessage('1-4笔仅可选1小时有效')
              }
              price.textContent = nowBishu * nowShiChang;
       });
       shichang.addEventListener("change", function () {
              nowShiChang = shichang.value;
              if ((nowBishu == 1 || nowBishu == 2 || nowBishu == 3 || nowBishu == 4) && nowShiChang == 8) {
                     shichang.selectedIndex = 0;
                     nowShiChang = 3
                     showMessage('1-4笔仅可选1小时有效')
              }
              price.textContent = nowBishu * nowShiChang;
       })
       function copyText(text, msgtext) {
              const el = document.createElement('textarea');
              el.value = text;
              document.body.appendChild(el);
              el.select();
              document.execCommand('copy');
              document.body.removeChild(el)
              showMessage(msgtext)
       }
       //监听点击事件
    //   document.getElementById("energyAddress").addEventListener("click", function () {
    //           var text = document.getElementById("energyAddress").textContent;
    //           copyText(text, "租赁地址复制成功")
    //   })
       document.getElementById("kefuIcon").addEventListener("click", function () {
              $('#telegramID').slideDown();
       })
       document.getElementById("customerService").addEventListener("click", function () {
              $('#telegramID').slideDown();
       })
       document.getElementById("closeTelegram").addEventListener("click", function () {
              $('#telegramID').slideUp();
       })
       document.getElementById("copyTelegram").addEventListener("click", function () {
              $('#telegramID').slideUp();
              var text = document.getElementById("telegramText").textContent;
              copyText(text, "客服ID复制成功")
       })
       window.addEventListener('scroll', function () {
              var divElement = document.getElementById('backTop');
              var scrollPosition = window.scrollY || window.pageYOffset;
              if (scrollPosition >= 250) {
                     $('#backTop').fadeIn();
              } else {
                     $('#backTop').fadeOut();
              }
       });
       document.getElementById("backTop").addEventListener('click', function () {
              window.scrollTo({
                     top: 0
              });
       })
    //   document.getElementById("rqCodeicon2").addEventListener("click", function () {
    //           var imgElement = document.getElementById('qrcodeImg');
    //           var newImageUrl = './Image/energyQrcod.png';
    //           imgElement.src = newImageUrl;
    //           var spanElement = document.getElementById('qrcodeTitle');
    //           var newText = '能量租赁地址二维码';
    //           spanElement.textContent = newText;
    //           $('#addressQrcode').slideDown();
    //   })
    //   document.getElementById("rqCodeicon3").addEventListener("click", function () {
    //           var imgElement = document.getElementById('qrcodeImg');
    //           var newImageUrl = './Image/exchangeQrcode.png';
    //           imgElement.src = newImageUrl;
    //           var spanElement = document.getElementById('qrcodeTitle');
    //           var newText = 'U-T互换地址二维码';
    //           spanElement.textContent = newText;
    //           $('#addressQrcode').slideDown();
    //   })
    //   document.getElementById("rqCodeicon4").addEventListener("click", function () {
    //           var imgElement = document.getElementById('qrcodeImg');
    //           var newImageUrl = './Image/energyQrcod.png';
    //           imgElement.src = newImageUrl;
    //           var spanElement = document.getElementById('qrcodeTitle');
    //           var newText = '预存扣费模式地址二维码';
    //           spanElement.textContent = newText;
    //           $('#addressQrcode').slideDown();
    //   })
       document.getElementById("closeQrcode").addEventListener("click", function () {
              $('#addressQrcode').slideUp();
       })
       document.getElementById("saveLocal").addEventListener("click", function () {
              var imageUrl = document.getElementById('qrcodeImg').src;
              var imageFilename = 'qrcode_image.png';
              var link = document.createElement('a');
              link.href = imageUrl;
              link.download = imageFilename;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
       })
    //   document.getElementById("exchangeAddress").addEventListener("click", function () {
    //           var text = document.getElementById("exchangeAddress").textContent;
    //           copyText(text, "兑换地址复制成功")
    //   })
    //   document.getElementById("copyPrestoreAddress").addEventListener("click", function () {
    //           var text = document.getElementById("copyPrestoreAddress").textContent;
    //           copyText(text, "预存地址复制成功")
    //   })
       document.getElementById("selectUsdt").addEventListener("click", function () {
              copyText('手续费原因,暂时只支持TRX租赁', "手续费原因,暂时只支持TRX租赁")
       })
       var usdtToTrx = 0;
       var trxToUsdt = 0;
       document.getElementById("exchangeInput1").addEventListener("input", function (event) {
              var nowValue = event.target.value;
              var firstText = document.getElementById("iconName1").textContent;
              if (parseFloat(nowValue) >= 1 && firstText == 'USDT') {
                     document.getElementById('getCount').textContent = Number((usdtToTrx * nowValue).toFixed(3));
              } else if (parseFloat(nowValue) >= 1 && firstText == 'TRX') {
                     document.getElementById('getCount').textContent = Number((trxToUsdt * nowValue).toFixed(3));
              } else {
                     document.getElementById('getCount').textContent = '0';
              }
       })
    //   document.getElementsByClassName("iconFont1")[0].addEventListener("click", function () {
    //           var nowValue = document.getElementById('exchangeInput1').value;
    //           var firstText = document.getElementById("iconName1").textContent;
    //           if (firstText == 'USDT') {
    //                  document.getElementById("iconName1").textContent = 'TRX';
    //                  document.getElementById("iconName2").textContent = 'USDT';
    //                  if (parseFloat(nowValue) >= 1) {
    //                         document.getElementById('getCount').textContent = Number((trxToUsdt * nowValue).toFixed(3));
    //                  }
    //           } else {
    //                  document.getElementById("iconName2").textContent = 'TRX';
    //                  document.getElementById("iconName1").textContent = 'USDT';
    //                  if (parseFloat(nowValue) >= 1) {
    //                         document.getElementById('getCount').textContent = Number((usdtToTrx * nowValue).toFixed(3));
    //                  }
    //           }
    //   })

       function getPrice() {
              $.ajax({
                     url: 'https://www.tronscan.uk/query/trxyes',
                     method: 'POST',
                     success: function (response) {
                            if (response.result == false) return
                            trxyesData = response.data
                            usdtToTrx = Number(trxyesData.d_h_bili)
                            trxToUsdt = Number((1 / usdtToTrx).toFixed(3))
                            // document.querySelector('.exchangeutRate').textContent = `1U = ${Number(usdtToTrx).toFixed(3) + 1}Trx || 1Trx = ${Number(trxToUsdt).toFixed(3)}U`
                            document.querySelector('#minTrxOrUsdt').textContent = `${trxyesData.bishu_min_trx}Trx或${trxyesData.bishu_min_usdt}Usdt`
                            document.querySelector('.price_1hour').textContent = `${trxyesData.apiData.price_32000_1hour}`
                            document.querySelector('.price_1day').textContent = `${trxyesData.apiData.price_32000_24hour}`
                            document.querySelector('.price_3day').textContent = `${trxyesData.apiData.price_32000_72hour}`
                            document.querySelector('.price_7day').textContent = `${trxyesData.apiData.price_32000_168hour}`
                            document.querySelector('.price_15day').textContent = `${trxyesData.apiData.price_32000_360hour}`
                            document.querySelector('.price_30day').textContent = `${trxyesData.apiData.price_32000_720hour}`

                     }
              });
       }
       getPrice()
       setInterval(function () {
              getPrice()
       }, 10000)

       document.querySelector(".closeBalance").addEventListener("click", function () {
              $('#addressBalance').hide();
       })

       var useTrx = document.querySelector(".useTrx");
       var useUsdt = document.querySelector(".useUsdt");
       var nowSelect = 'useTrx';
       useTrx.addEventListener("click", function () {
              nowSelect = 'useTrx';
              useUsdt.classList.remove("selectUseUsdt")
              useTrx.classList.add("useTrx")
              useTrx.textContent = "√预存TRX"
              useUsdt.textContent = "预存USDT"
              $("#calculatorInput").show();
              $(".selectText").text('*请输入您要预存的Trx数量');
              $("#calculatorText").text('0');
              $("#calculatorInput").val('0');
       })

       useUsdt.addEventListener("click", function () {
              nowSelect = 'useUsdt';
              useTrx.classList.remove("useTrx")
              useUsdt.classList.add("selectUseUsdt")
              useTrx.textContent = "预存TRX"
              useUsdt.textContent = "√预存USDT"
              $("#calculatorText").text('0');
              $("#calculatorInput").val('0');
              $(".selectText").text('*使用USDT预存加送15%，更优惠');
       })

       document.getElementById("calculatorInput").addEventListener("input", function (event) {
              var nowValue = event.target.value;
              if (nowSelect == 'useTrx' && parseInt(nowValue) >= trxyesData.bishu_min_trx) {
                     $("#calculatorText").text(`${parseInt(parseInt(nowValue) / trxyesData.bishu_jiage)}`)
                     var bishu = parseInt(parseInt(nowValue) / trxyesData.bishu_jiage)
                     if (bishu >= 30) {
                            $(".selectText").text(`预存${nowValue}TRX,可获得${bishu}次免手续费转帐`);
                     } else {
                            $(".selectText").text(`预存${nowValue}TRX,可获得${bishu}次免手续费转帐`);
                     }
              } else if (nowSelect == 'useTrx' && parseInt(nowValue) < trxyesData.bishu_min_trx) {
                     $("#calculatorText").text('0')
                     $(".selectText").text(`*最低预存量为${trxyesData.bishu_min_trx}TRX或以上`);
              } else if (nowSelect == 'useUsdt' && parseInt(nowValue) >= trxyesData.bishu_min_usdt) {
                     //usdtToTrx
                     var getTotalCount = parseFloat(nowValue) * (usdtToTrx / 0.9);
                     var getTrxCount = parseFloat(nowValue) * usdtToTrx;
                     var zenSongTrx = getTotalCount - getTrxCount;
                     var bishu = parseInt(parseInt(getTotalCount) / trxyesData.bishu_jiage)
                     $("#calculatorText").text(`${parseInt(parseInt(getTotalCount) / trxyesData.bishu_jiage)}`)
                     if (bishu >= 30) {
                            $(".selectText").text(`预存${nowValue}USDT，按实时汇率获得${Number(getTrxCount.toFixed(3))}Trx，再送${zenSongTrx.toFixed(3)}Trx，可获得${bishu}次免手续费转帐`);
                     } else {
                            $(".selectText").text(`预存${nowValue}USDT，按实时汇率获得${Number(getTrxCount.toFixed(3))}Trx，再送${zenSongTrx.toFixed(3)}Trx，可获得${bishu}次免手续费转帐`);
                     }
              } else if (nowSelect == 'useUsdt' && parseInt(nowValue) < trxyesData.bishu_min_usdt) {
                     $("#calculatorText").text('0');
                     $(".selectText").text(`*最低${trxyesData.bishu_min_usdt}USDT起,充越多送越多`);
              }
       })

       document.getElementById("selectAddrBtn").addEventListener("click", async function () {
              var userAddress = $("#selectAddress").val()
              const regex = /^[A-Za-z0-9]{34}$/;
              if (regex.test(userAddress)) {
                     document.getElementById("selectAddrBtn").disabled = true;
                     document.getElementById("selectAddrBtn").textContent = '查询中...';
                     $.ajax({
                            url: `https://www.tronscan.uk/query/getaddresslogs?address=${userAddress}`,
                            method: 'GET',
                            success: function (response) {
                                   if (response.length > 0) {
                                          var userLogs = response
                                          var viewDiv = document.querySelector(".balanceList")
                                          while (viewDiv.firstChild) {
                                                 viewDiv.removeChild(viewDiv.firstChild)
                                          }
                                          $('.balanceTitle').text(userAddress)
                                          $("#addressBalance").show();
                                          for (var i = 0; i < userLogs.length; i++) {
                                                 let item = userLogs[i]
                                                 var pElement = document.createElement("p")
                                                 item.content = item.content.replace(/定价|弹性/g, "")
                                                 pElement.textContent = `${item.day} ${item.content}`
                                                 viewDiv.appendChild(pElement)
                                          }
                                   } else{
                                          showMessage('该地址不是预存用户,老客户请联系客服', 3000)
                                   }
                            },
                            complete: function () {
                                   $("#selectAddress").val('');
                                   setTimeout(() => {
                                          document.getElementById("selectAddrBtn").disabled = false;
                                          document.getElementById("selectAddrBtn").textContent = '查询';
                                   }, 1000);
                            }
                     });
              } else {
                     showMessage('输入的地址无效')
              }
       })
       document.getElementById("apiQueryBtn").addEventListener("click", async function () {
              showMessage('即将推出')
       })
       
});




