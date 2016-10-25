$(function(){
	//如果有背景墙body内边距要向下移动120像素
	if ($("div").hasClass("wallpaper")) {
		$("body").animate({paddingTop:"120px"});
	}else {
		$("body").animate({paddingTop:"0"});
	}
	//关闭背景墙
	$(".wallpaper .btn-close").click(function(){
			$(".wallpaper").remove();
			$("body").animate({"paddingTop":"0px"});
	})
	//轮播图
    $('#marquee').bxSlider({
        displaySlideQty:1,//显示li的个数
        moveSlideQty: 1,//移动li的个数
        captions: true,//自动控制
        auto: true,
        controls: true,//左右按钮
        slideWidth: 1150,
            // autoControls: true,
        minSlides: 1,
        maxSlides: 1,
        slideMargin: 10
    });
		//关闭底部浮动广告
	$(".m-ad-index-bottom .close").click(function(){
			$(".m-ad-index-bottom").remove()
	});

	toptap($(".home-top .col-lg-4:eq(0) ul li"));
	toptap($(".home-top .col-lg-4:eq(1) ul li"));
	toptap($(".home-top .col-lg-4:eq(2) ul li"));
	init_returnTop();
})

/*
 *排行榜切换显示
 */
function toptap(obj){
	obj.hover(function(){
		obj.find(".img").hide();
		$(this).find(".img").show();
	})

}
