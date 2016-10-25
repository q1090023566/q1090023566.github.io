// 加载
$(function () {
	//初始化懒加载
	$("img.lazy").show().lazyload();
    init_page_header();
    init_removePlus();
    init_returnTop();

    // 搜索输入框获得焦点后，选中内容
    $("#main_search").focus(function() {
        $("#main_search").select();
    });



});

/**
 * 初始化页面头部
 * version : 1.0.0
 * author : lw
 */
function init_page_header() {
    var $select = $("#j_search_select");
    var $cur_val = $select.find(".cur-val");
    var $select_list = $("#j_search_select .val-list");

    // 初始化搜索类型
    var init_search_type = $("[name='search_type']").val();
    $(".val-list li").each(function() {
        var $this = $(this);

        if($this.val() == init_search_type) {
            $cur_val.text($this.text());
            $this.prependTo($select_list);
        }
    });

    // 打开下拉列表
    $select.on("click", ".cur-val", function (e) {
        e.stopPropagation();
        $select.addClass("open");
    });
    // 选择值
    $select.on("click", ".val-list li", function (e) {
        var $this = $(this);
        e.stopPropagation();
        $cur_val.text($this.text());

        // 搜索类型
        $("[name='search_type']").val($this.val());
        $select.removeClass("open");
        $this.prependTo($select_list);
    });

    //隐藏下拉列表
    $("body").click(function(){
    	$(".search-type.open").removeClass("open");
    });

    $(".search-form").on("keydown", function (e) {
        var $this = $(this);
        var keyCode = e.keyCode;
        if (keyCode == 13) {
            $this.find(".j_submit_btn").trigger("click");
            e.stopPropagation();
            e.preventDefault();

            MainSearch();
        }
    });
}

// 搜索
function MainSearch() {
    $("#search_form").submit();
}

/**
 * 去掉教育专题-5至6岁专题的”+“号
 */
function init_removePlus() {
    if($(".edu .edu-title:last").text().indexOf("+")){
        var str=$(".edu .edu-title:last").text();
        str=str.replace("+","");
        $(".edu .edu-title:last").text(str);
    }else {
        return ;
    }
}

/*
 *返回顶部
 */
function init_returnTop() {
	var $goTop=$(".arrow-up,#goTop");
	window.onscroll = function() {
		var top = document.documentElement.scrollTop || document.body.scrollTop;
		if (top >= 291) {
			$goTop.fadeIn();
		} else {
			$goTop.fadeOut();
		}
	}
	$goTop.click(function(){
		$('html,body').animate({scrollTop: '0px'});
	});
}
