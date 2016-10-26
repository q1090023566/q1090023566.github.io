function GetRequestValue(strParame) {
    var args = new Object();
    var query = location.search.substring(1);

    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        args[argname] = value;
    }
    return args[strParame];
}
var c = GetRequestValue("c");
var Apple = {};
Apple.UA = navigator.userAgent;
Apple.Device = false;
Apple.Types = ["iPhone", "iPod", "iPad"];
for (var d = 0; d < Apple.Types.length; d++) {
    var t = Apple.Types[d];
    Apple[t] = !!Apple.UA.match(new RegExp(t, "i"));
    Apple.Device = Apple.Device || Apple[t];
}
if (Apple.Device) {
    if (Apple["iPhone"] || Apple["iPod"]) {

        if (c != undefined && c != "") {
            window.location.href = "/iphone.html?c=" + c;
        }
        else {
            window.location.href = "/iphone.html";
        }
    }
    else {
        if (c != undefined && c != "") {
            window.location.href = "/ipad.html?c=" + c;
        }
        else {
            window.location.href = "/ipad.html";
        }
    }
}
else {

    if (c != undefined && c == "10") {
        window.location.href = "/star.html";
    }

}

if (Apple.UA.indexOf('Android') > -1 || Apple.UA.indexOf('Linux') > -1) //android终端或uc浏览器
{
    if (c != undefined && c != "") {
        window.location = "/android.html?c=" + c;
    }
    else {
        window.location.href = "/android.html";
    }
}

$(function () {
    //添加关闭按钮事件
    $(".b_closed").click(function () {
        $(".banner_box").slideUp();

        $(".qq_icon").animate({
            opacity: 'show',
            right: '-50px'
        });
    })

    function banner_play() {
        $(".byy").css({ "left": "-260px", "opacity": "0" });
        $(".freeapp").css({ "left": "580px", "opacity": "0" });
        $(".qrcode").css({ "width": "245px", "height": "173px", "opacity": "0" });
        $(".largedisplay").css({ "left": "580px", "opacity": "0" });
        $(".byy").animate({
            left: "0",
            opacity: "1"
        }, 600);
        $(".freeapp").animate({
            left: "0",
            opacity: "1"
        }, 600)
        $(".largedisplay").delay(100).animate({
            left: "453px",
            opacity: "1"
        }, 500)
        $(".qrcode").delay(600).animate({
            width: "183px",
            height: "133px",
            opacity: "1"
        }, 200)
    }
    banner_play();
    $(".menu ul li").last().css("background", "none");
    //加载精彩推荐 begin
    $(".hm_list").load("/getIndex.ashx?c=" + Math.random(), null, function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success") {
            //添加样式 begin
            $(".jctj ul li").hover(
                function () {
                    $(this).find(".jctj_nr").hide();
                    $(this).find(".az").show();
                    return false;
                },
                function () {
                    $(this).find(".jctj_nr").show();
                    $(this).find(".az").hide();
                    return false;
                }
                );
            $(".jctj_img").hover(
                function () {
                    $(this).parent().children(".h_show").show();
                },
                function () {
                    $(this).parent().children(".h_show").hide();
                }
            );
            $(".jctj ul li:nth-child(8n-1),.jctj ul li:nth-child(8n)").find(".h_show").css("background", "url(http://img.haima.me/images/freeapp/hmge/images/h_show1.png) no-repeat");
            $(".jctj ul li:nth-child(8n-1),.jctj ul li:nth-child(8n)").find(".h_show").css("left", "-198px");
            $(".jctj ul li:nth-child(8n-1),.jctj ul li:nth-child(8n)").find(".h_show").css("padding", "none");
            $(".jctj ul li:nth-child(8n-1),.jctj ul li:nth-child(8n)").find(".h_show").css("padding", "17px 25px 10px 14px");
            //添加样式 end
        }
    });
    //加载精彩推荐 end
    $(".s_down_banner").delay(1500).slideDown();
    $(".s_down_banner .close").bind("click", function () {
        $(".s_down_banner").slideUp();
    })
})
$(function () {
    var page = 1;
    var i = 1;
    var $parent = $("div.jctj_box");//根据当前点击元素获取到父元素
    var $v_show = $("div.hm_list"); //寻找到"视频内容展示区域"
    var $v_content = $("div.hm_box"); //寻找到"视频内容展示区域"外围的DIV元素
    var v_width = $v_content.width();
    var len = $v_show.find("ul").length;
    if (!(len > i)) {
        $("span.next").hide();
        $("span.prev").hide();
    }
    else {
        $("span.next").show();
        $("span.prev").show();
    }
    var page_count = Math.ceil(len / i);
    var sp = "<span></span>";
    for (var s = 0; s < page_count; s++) {
        $(".highlight_tip").append(sp);
    }
    $(".highlight_tip span").eq(0).addClass("current");
    $(".next").click(function () {    //绑定click事件
        $(".prev").css("css", "url(http://img.haima.me/images/freeapp/hmge/images/left_arrow.png)");
        var $parent = $(this).parents("div.jctj_box");//根据当前点击元素获取到父元素
        var $v_show = $("div.hm_list"); //寻找到"视频内容展示区域"
        var $v_content = $("div.hm_box"); //寻找到"视频内容展示区域"外围的DIV元素
        var v_width = $v_content.width();
        var len = $v_show.find("ul").length;
        var page_count = Math.ceil(len / i);   //只要不是整数，就往大的方向取最小的整数
        if (!$v_show.is(":animated")) {    //判断"视频内容展示区域"是否正在处于动画
            if (page == page_count) {  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
                $v_show.animate({ left: '0px' }, "slow"); //通过改变left值，跳转到第一个版面
                page = 1;
            } else {
                $v_show.animate({ left: '-=' + v_width });  //通过改变left值，达到每次换一个版面
                page++;
            }
        }
        $(".highlight_tip span").eq((page - 1)).addClass("current").siblings().removeClass("current");
    });
    //往前 按钮
    $(".prev").click(function () {
        $(".next").css("css", "url(http://img.haima.me/images/freeapp/hmge/images/right_arrow.png)");
        var $parent = $(this).parents("div.jctj_box");//根据当前点击元素获取到父元素
        var $v_show = $parent.find("div.hm_list"); //寻找到"视频内容展示区域"
        var $v_content = $parent.find("div.hm_box"); //寻找到"视频内容展示区域"外围的DIV元素
        var v_width = $v_content.width();
        var len = $v_show.find("ul").length;
        var page_count = Math.ceil(len / i);   //只要不是整数，就往大的方向取最小的整数
        if (!$v_show.is(":animated")) {    //判断"视频内容展示区域"是否正在处于动画
            if (page == 1) {  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
                $v_show.animate({ left: '-=' + v_width * (page_count - 1) });
                page = page_count;
            } else {
                $v_show.animate({ left: '+=' + v_width }, "slow");
                page--;
            }
        }
        $(".highlight_tip span").eq((page - 1)).addClass("current").siblings().removeClass("current");
    });
});
$(function () {
    $(".header_add>.dl").click(function () {
        $(".tanchuceng").show();
    })
    $(".tanchuceng>.con>.close").click(function () {
        $(".tanchuceng").hide();
    })
})


/**
 * jQuery url get parameters function [获取URL的GET参数值]
 * @character_set UTF-8
 * @author Jerry.li(lijian@dzs.mobi)
 * @version 1.2012.12.11.1400
 *  Example
 *  <code>
 *      var GET = $.urlGet(); //获取URL的Get参数
 *      var id = GET['id']; //取得id的值
 *  </code>
 */
; (function ($) {
    $.extend(
    {
        /**
         * url get parameters
         * @public
         * @return array()
         */
        urlGet: function () {
            var aQuery = window.location.href.split("?");//取得Get参数
            var aGET = new Array();
            if (aQuery.length > 1) {
                var aBuf = aQuery[1].split("&");
                for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                    var aTmp = aBuf[i].split("=");//分离key与Value
                    aGET[aTmp[0]] = aTmp[1];
                }
            }
            return aGET;
        },
    });
})(jQuery);


var ifProcess = false;
var inteFlag = false;
var downloadFlag = false;
var gCmd = "";
var gParam = "";
var gIconUrl = "";
var gName = "";
var pcDownloadUrl = "";
if (c != undefined && c != "") {
    pcDownloadUrl = "/PcDownload.ashx?c=" + c + "&r=" + Math.random();
}
else {
    pcDownloadUrl = "/PcDownload.ashx?r=" + Math.random();
}

function jump() {
    if (inteFlag) {
        clearInterval(ifProcess);
        inteFlag = false;
        if ((/msie/.test(navigator.userAgent.toLowerCase()) || /trident/.test(navigator.userAgent.toLowerCase())) && !isIEError) {
            isIEError = true;
            downloadClicked(gCmd, gParam, gIconUrl, gName);
            return;
        }
    }
    showPop(".tcbox");
}
//pc助手下载地址
$(".tc_nohm a").attr("href", pcDownloadUrl);
function showPop(target) {
    var kuandu = document.documentElement.clientWidth;
    var gaodu = document.documentElement.clientHeight;
    var top = Math.ceil((gaodu - 424) / 2);
    var left = Math.ceil((kuandu - 643) / 2);
    $(target).css("top", top);
    $(target).css("left", left);
    $(target).show();
    $("#big_zz").css("width", kuandu);
    $("#big_zz").css("height", gaodu);
    $("#big_zz").show();
    $(window).resize(function () {
        var kuandu = document.documentElement.clientWidth;
        var gaodu = document.documentElement.clientHeight;
        var top = Math.ceil((gaodu - 424) / 2);
        var left = Math.ceil((kuandu - 643) / 2);
        $(target).css("top", top);
        $(target).css("left", left);
        $("#big_zz").css("width", kuandu);
        $("#big_zz").css("height", gaodu);
    })
}
function downloadClicked(cmd, param, iconUrl, name) {
    gCmd = cmd;
    gParam = param;
    gIconUrl = iconUrl;
    gName = name;
    postData('http://127.0.0.1:44444/', cmd, param);
}
var isIEError = false;
function postData(url, cmd, param) {
    if (!inteFlag) {
        ifProcess = setInterval(jump, 2000);
        //说明定时已启动
        inteFlag = true;
    }
    $.ajax({
        type: "get",
        async: false,
        cache: false,
        url: url + "?" + (new Date()) + "&param=" + param,
        dataType: "jsonp",
        data: {},
        jsonp: "callbackparam", //服务端用于接收callback调用的function名的参数
        jsonpCallback: "jsoncallback", //callback的function名称
        success: function (json) {
            isIEError = true;
            if (json == 'ok') {
                if (/msie/.test(navigator.userAgent.toLowerCase()) || /trident/.test(navigator.userAgent.toLowerCase())) {
                    window.frames[0].location.href = cmd + "://" + param;
                }
                else {
                    window.location.href = cmd + "://" + param;
                }
            }

            if (inteFlag) {
                clearInterval(ifProcess);
                inteFlag = false;
            }
        },
        error: function (textStatus, errorThrown) {
            downloadFlag = true;
            jump();
        }
    });
}

//助手下载地址
var downloadUrl = "";
var ipadDownloadUrl = "";
if (c != undefined && c != "") {
    downloadUrl = "Download.ashx?t=1&c=" + c + "&r=" + Math.random();
    ipadDownloadUrl = "Download.ashx?t=2&c=" + c + "&r=" + Math.random();
}
else {
    downloadUrl = "Download.ashx?t=1&r=" + Math.random();
    ipadDownloadUrl = "Download.ashx?t=2&r=" + Math.random();
}
//pc助手下载地址
$(".mobileurl").attr("href", downloadUrl);
$(".ipadurl").attr("href", ipadDownloadUrl);
$(function () {
    $(window).resize(function () {
        if (downloadFlag) {
            jump();
        }
    });

    $(".tctop").click(function () {
        $(".tc_showbox").hide();
        $("#big_zz").hide();
        downloadFlag = false;
        if (inteFlag) {
            clearInterval(ifProcess);
            inteFlag = false;
        }
    })
    //海马助手pc端下载统计
});/////////////////////getScript结束
///通知 begin
function tongzhi() {
    var kuandu = document.documentElement.clientWidth;
    var gaodu = document.documentElement.clientHeight;
    var top = Math.ceil((gaodu - 413) / 2);
    var left = Math.ceil((kuandu - 660) / 2);
    $(".tctongzhi").css("top", top);
    $(".tctongzhi").css("left", left);
    $(".tctongzhi").show();
    $("#big_zz").css("width", kuandu);
    $("#big_zz").css("height", gaodu);
    $("#big_zz").show();
    $(window).resize(function () {
        var kuandu = document.documentElement.clientWidth;
        var gaodu = document.documentElement.clientHeight;
        var top = Math.ceil((gaodu - 413) / 2);
        var left = Math.ceil((kuandu - 660) / 2);
        $(".tctongzhi").css("top", top);
        $(".tctongzhi").css("left", left);
        $("#big_zz").css("width", kuandu);
        $("#big_zz").css("height", gaodu);
    })
}
//闪退通知
$(".tctop").click(function () {
    $(".tcbox,.tcbox1,.tcbox2,.tcbox3,.tcbox4,.tctongzhi").hide();
    $("#big_zz").hide();
})
///通知end

function login() {
    $.get(
        "/User/Login.ashx",
        { account: $("#account").val(), pwd: cmdEncrypt($("#pwd").val()) },
        function (result) {
            result = JSON.parse(result);
            if (result.status == 22000) {
                $(".tanchuceng").hide();
                $("#divAccount").show();
                $("#divAccount").html($("#account").val());
                $(".zx").show();
                $(".zc").hide();
                $("#register").hide();
                $(".dl").hide();
            }
            else {
                alert(result.error_msg);
            }
        });
    //window.location.href = "/index.html";
}

function checkLogin() {
    $.get("/User/GetAccount.ashx", function (result) {
        if (result != "^&*%$") {
            account = result;
            if (account == '') {
                var get = $.urlGet(); //获取URL的Get参数
                var account = get['account']; //取得id的值
            }
            if (account != null) {
                $(".tanchuceng").hide();
                $("#divAccount").show();
                $("#account").val(account);
                $("#divAccount").html($("#account").val());
                $(".zx").show();
                $(".zc").hide();
                $("#register").hide();
                $(".dl").hide();
            }
        }
    });
    $(".header_add").show().delay(1000);
}
checkLogin();

function logout() {
    $.get("/User/Logout.ashx", function (result) {
        //$(".tanchuceng").hide();
        $("#divAccount").hide();
        //$("#account").val(account);
        //$("#divAccount").html($("#account").val());
        $(".zx").hide();
        $(".zc").show();
        $("#register").show();
        $(".dl").show();
    })
}
