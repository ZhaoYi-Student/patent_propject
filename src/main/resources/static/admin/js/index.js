var scope = {
    link: 'back_menu1'
};
var string1 = {
    string: ""
};
$(function () {
    $.post({
        url: "real_permission/findAllByParentId",
        data: {parentId: 0},
        async: false,
        success: function (data) {
            var left_menu = $("#leftMenu");
            for (var a = 0; a < data.length; a++) {
                leftMenu(data[a], data[a].id);
            }
            left_menu.html(string1.string);
        }
    }, "json");
});

function leftMenu(list, parentId) {
    $.post({
        url: "real_permission/findAllByParentId",
        data: {parentId: parentId},
        async: false,
        success: function (data) {
            if (data.length === 0) {
                string1.string +=
                    "<li class=\"layui-nav-item layui-nav-itemed\">\n" +
                    "<a href=\"javascript:;\" data-url='page_" + list.id + "' data-id='" + list.id + "' data-text='" + list.permName + "'><i class=\"iconfont\">&#xe607;</i>" + list.permName + "</a>\n" +
                    "</li>";
            } else {
                var stringChild = "<dl class=\"layui-nav-child\"><dd>";
                for (var b = 0; b < data.length; b++) {
                    stringChild +=
                        "<a href=\"javascript:;\" data-url='page_" + data[b].id + "' data-id='" + data[b].id + "' data-text='" + data[b].permName + "'><span\n" +
                        "        class=\"l-line\"></span>" + data[b].permName + "</a>";
                }
                stringChild += "</dd></dl>";
                string1.string +=
                    "<li class=\"layui-nav-item layui-nav-itemed\">\n" +
                    "<a href=\"javascript:;\"><i class=\"iconfont\">&#xe607;</i>" + list.permName + "</a>" +
                    stringChild +
                    "</li>";
            }
        }
    }, "json");
}