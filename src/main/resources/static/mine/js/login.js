layui.use(['element', 'layer'], function () {
    var element = layui.element;
    var layer = layui.layer;
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


    var canvas = document.getElementById("canvas");//演员
    var context = canvas.getContext("2d");//舞台，getContext() 方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性。
    var button = document.getElementById("btn");//获取按钮
    var input = document.getElementById("captcha");//获取输入框
    draw();
    canvas.onclick = function () {
        draw();
    };

    // 随机颜色函数
    function getColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    var num;

    function draw() {
        context.clearRect(0, 0, 120, 40);//在给定的矩形内清除指定的像素
        context.strokeRect(0, 0, 120, 40);//绘制矩形（无填充）
        var aCode = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        // 绘制字母
        var arr = [];//定义一个数组用来接收产生的随机数
        // var num;//定义容器接收验证码
        for (var i = 0; i < 4; i++) {
            var x = 20 + i * 20;//每个字母之间间隔20
            var y = 20 + 10 * Math.random();//y轴方向位置为20-30随机
            var index = Math.floor(Math.random() * aCode.length);//随机索引值
            var txt = aCode[index];
            context.font = "bold 20px 微软雅黑";//设置或返回文本内容的当前字体属性
            context.fillStyle = getColor();//设置或返回用于填充绘画的颜色、渐变或模式，随机
            context.translate(x, y);//重新映射画布上的 (0,0) 位置，字母不可以旋转移动，所以移动容器
            var deg = 90 * Math.random() * Math.PI / 180;//0-90度随机旋转
            context.rotate(deg);// 	旋转当前绘图
            context.fillText(txt, 0, 0);//在画布上绘制“被填充的”文本
            context.rotate(-deg);//将画布旋转回初始状态
            context.translate(-x, -y);//将画布移动回初始状态
            arr[i] = txt //接收产生的随机数
        }
        num = arr[0] + arr[1] + arr[2] + arr[3] //将产生的验证码放入num
        // 绘制干扰线条
        for (var i = 0; i < 8; i++) {
            context.beginPath();//起始一条路径，或重置当前路径
            context.moveTo(Math.random() * 120, Math.random() * 40);//把路径移动到画布中的随机点，不创建线条
            context.lineTo(Math.random() * 120, Math.random() * 40);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
            context.strokeStyle = getColor();//随机线条颜色
            context.stroke();// 	绘制已定义的路径
        }
        // 绘制干扰点，和上述步骤一样，此处用长度为1的线代替点
        for (var i = 0; i < 20; i++) {
            context.beginPath();
            var x = Math.random() * 120;
            var y = Math.random() * 40;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.strokeStyle = getColor();
            context.stroke();
        }
    }

    $("#btn").on('click', function () {
        var text = $("#captcha").val();//获取输入框的值
        if (text === num) {
            $("#btn").attr("disabled", "disabled");
            var btnHtml = $("#btn").attr("data-value");
            if (btnHtml === "1") {
                $.post({
                    url: "/UserCon/login",
                    data: $("#loginForm").serialize(),
                    success: function (data) {
                        console.log(data);
                        if (data) {
                            window.location.href = "index";
                        } else {
                            layer.msg("用户名或密码错误");
                            $("#btn").removeAttr("disabled");
                            $("input[name=reset]").trigger('click');
                        }
                    }
                }, "json")
            }
        } else {
            layer.msg("验证码有误");
            draw();
        }

    })

});


