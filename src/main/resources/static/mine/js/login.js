layui.use(['element'], function () {
    var element = layui.element;
    element.on('nav(top)', function (elem) {

        var text = elem.attr("data-text");
        var container = $("#container");
        var regist = $("#regist");
        var title = $("#title");
        var btn = $("#btn");
        var reset = $("input[name=reset]");

        container.css("display", "");
        regist.html("");
        regist.css("display", "none");
        reset.trigger('click');
        container.removeClass("layui-anim layui-anim-scaleSpring layui-anim-fadein")
        if (text === "login") {
            title.html("登录");
            btn.html("登录");
            container.addClass("layui-anim layui-anim-fadein");
        } else if (text === "regist") {
            title.html("注册");
            btn.html("开始注册");
            regist.css("display", "");
            container.addClass("layui-anim layui-anim-scaleSpring")
            regist.append("" +
                "<label for=\"password2\" class=\"col-sm-3 control-label\">确认密码:</label>" +
                "<div class=\"col-sm-8\">" +
                "<input type=\"email\" class=\"form-control\" id=\"password2\" placeholder=\"verify password\"></input>" +
                "</div>" +
                "");
        }


    });

    $("#btn").on('click', function () {
        var btnHtml = $("#btn").html();
        $("#btn").attr("disabled", "disabled");
        if (btnHtml === "登录") {
            $.post({
                url: "/UserCon/login",
                data: $("#loginForm").serialize(),
                success: function (data) {
                    console.log(data);
                    if (data) {
                        window.location.href = "index";
                    } else {
                        alert("用户名或密码错误");
                        $("#btn").removeAttr("disabled");
                    }
                }
            }, "json");
        }
    })


});
