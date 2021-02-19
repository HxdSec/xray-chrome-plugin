

(function () {
	var btn = '<span  class="btn-send" >打开链接</span>';


	$("body").on("hover", ".ant-table-row", function (e) {
		var html = $(".ant-tabs-tab-active").html();
		if (html.indexOf("Web") == -1) {
			return;
		}

		var item = $(this).find("td:first-child");
		item.css({ "position": "relative" });
		item.append(btn);
	});

	$("body").on("mouseleave", ".ant-table-row", function (e) {

		$(this).find("td .btn-send").remove();
	});

	$("body").on("click", ".btn-send", function (e) {
		e.stopPropagation();
		var item_th = $(this).parent().parent();
		var url = item_th.attr("data-row-key");
		console.log(url);
		chrome.runtime.sendMessage({ type: "openUrl", data: url }, function (response) {

		});



	});


	$("body").on("click", ".ant-tabs-tab", function (e) {
		var html = $(this).html();
		if (html.indexOf("Web") == -1) {
			$(".btn-send-list").remove();
			return;
		}

		$(".btn-send-list").remove();

		var btn = '<button type="button" class="btn-send-list ant-btn ant-btn-primary"><span>导出全部IP</span></button>';
		$(".f1nhqnzq").append(btn);
	});


	$("body").on("click", ".btn-send-list", function (e) {
		e.stopPropagation();
		var list = [];

		$(".ant-table-row").each(function (e) {
			list.push($(this).attr("data-row-key"));
		})

		console.log(list);

		chrome.runtime.sendMessage({ type: "sendUrlList", data: list }, function (response) {

		});

	});







	// $("body").on("click", ".robot", function (e) {
	// 	e.stopPropagation();
	// 	var btnsend = $(this).parent().parent().parent();
	// 	var subject = btnsend.siblings("a").html();
	// 	var link = "http://redmine.huixdou.com" + btnsend.siblings("a").attr("href");
	// 	var project = btnsend.parent().siblings(".project").find("a").html();
	// 	var assignedto = btnsend.parent().siblings(".assigned_to").find("a").html();
	// 	var start_date = btnsend.parent().siblings(".start_date").html();
	// 	var due_date = btnsend.parent().siblings(".due_date").html();
	// 	var index = $(this).index();

	// 	chrome.runtime.sendMessage({ project: project, link: link, subject: subject, assignedto: assignedto, start_date: start_date, due_date: due_date, index: index }, function (response) {

	// 	});

	// });

})();