


(function () {

    $(".menu li a").click(function (e) {
        $(this).parent().addClass("on");
        $(this).parent().siblings("li").removeClass("on");
        var index = $(this).parent().index();

        $(".tab").children().eq(index).show().siblings().hide();
    });

    chrome.storage.sync.get({ url_list: -1 }, function (items) {

        var url_list = items.url_list;
        if (url_list == "-1") {
            url_list = [];
        }

        for (j = 0; j < url_list.length; j++) {
            $("#url-content").append(url_list[j]);
            $("#url-content").append("\n");
        }

    });





    function saveRobot() {
        var robotname = $("#robot_name").val()
        if (robotname == "") {
            showMsg("群机器人名称不能为空")
            return;
        }

        var roboturl = $("#robot_url").val()
        if (roboturl == "") {
            showMsg("群机器人webhook地址不能为空")
            return;
        }



    }



    function showMsg(msg) {
        chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'images/icon_48.png',
            title: '系统提示',
            message: msg
        });
    }

    function loadPhoneList() {
        chrome.storage.sync.get({ phone_list: -1 }, function (items) {
            if (items.phone_list != "-1") {
                $("#phone-list").html("");
                for (var key in items.phone_list) {
                    $("#phone-list").append("<li>" + key + "<span>" + items.phone_list[key] + "</span></li>");
                }
            }
        });
    }

    function loadRobotList() {
        chrome.storage.sync.get({ robot_list: -1 }, function (items) {
            if (items.robot_list != "-1") {
                $("#robot-list").html("");
                for (var index in items.robot_list) {
                    var robot = items.robot_list[index];
                    console.log(robot);
                    $("#robot-list").append('<li>' + robot.name + ' <span class="robot-delete">删除</span></li>');
                }
            }
        });
    }

    function deleteRobot(index) {
        chrome.storage.sync.get({ robot_list: -1 }, function (items) {
            if (items.robot_list != "-1") {
                items.robot_list.splice(index, 1);
                chrome.storage.sync.set({ robot_list: items.robot_list }, function () {
                    showMsg("删除成功")
                    loadRobotList();

                });

            }
        });
    }


    $(".btn-clear").click(function (e) {
        $("#url-content").val("");
        chrome.storage.sync.set({ url_list: -1 }, function () {


        });

    });

    $(".btn-copy").click(function (e) {
        var Url2 = document.getElementById("url-content");
        Url2.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        showMsg("复制成功");
    });




})();