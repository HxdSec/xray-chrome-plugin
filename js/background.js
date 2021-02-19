
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type == "openUrl") {
		openUrl(request.data);
	} else if (request.type == "sendUrlList") {
		saveUrlList(request.data);

	}

});

function openUrl(url) {
	chrome.tabs.create({ 'url': url, 'selected': false }, function (tab2) {

	});
}

function saveUrlList(data) {
	chrome.storage.sync.set({ url_list: data }, function () {
		showMsg("IP已经导入到插件中，请打开插件查看")
	});
}




function sendMsg(url, data) {
	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/json; charset=utf-8",
		data: data,
		dataType: "json",
		success: function (message) {
			chrome.notifications.create(null, {
				type: 'basic',
				iconUrl: 'images/icon_48.png',
				title: '系统提示',
				message: '任务已经发送到钉钉'
			});
		},
		error: function (message) {

		}
	});
}


function getActionCardData(obj) {
	var root = {};
	var actionCard = {};

	actionCard.title = obj.project;
	actionCard.text = "#### " + obj.project + "\n\n" + "* " + "问题名称：" + obj.subject + " \n" + "* " + "指派对象：" + obj.assignedto + " \n" + "* " + "开始时间：" + obj.start_date + " \n" + "* " + "完成日期：" + obj.due_date + "  ";
	actionCard.hideAvatar = "0";
	actionCard.btnOrientation = "0";
	actionCard.singleTitle = "查看详情";
	actionCard.singleURL = obj.link;
	root.actionCard = actionCard;
	root.msgtype = "actionCard";


	console.log(root);
	return JSON.stringify(root);
}


function getMarkDownData(obj, phone_list) {
	var root = {};
	var markdown = {};
	var at = {};

	root.msgtype = "markdown";

	var atinfo = obj.assignedto;
	var phone = "";
	if (phone_list[obj.assignedto] != null && phone_list[obj.assignedto] != undefined && phone_list[obj.assignedto] != "") {
		phone = phone_list[obj.assignedto]
		atinfo = "@" + phone;
	}

	markdown.title = obj.project;
	markdown.text = "#### " + obj.project + "\n\n" + "* " + "问题名称：[" + obj.subject + "](" + obj.link + ")" + " \n" + "* " + "指派对象：" + atinfo + " \n" + "* " + "开始时间：" + obj.start_date + " \n" + "* " + "完成日期：" + obj.due_date + "  ";
	root.markdown = markdown;

	var atMobiles = [];
	if (obj.assignedto != atinfo) {
		atMobiles.push(phone);
	}

	at.atMobiles = atMobiles;
	at.isAtAll = false;
	root.at = at;

	console.log(root);
	return JSON.stringify(root);
}

function showMsg(msg) {
	chrome.notifications.create(null, {
		type: 'basic',
		iconUrl: 'images/icon_48.png',
		title: '系统提示',
		message: msg
	});
}







