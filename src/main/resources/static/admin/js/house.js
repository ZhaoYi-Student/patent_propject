layui.use(['upload', 'form', 'element'], function () {
    var upload = layui.upload;
    var form = layui.form;
    var element = layui.element;
    //多文件列表示例
    var demoListView = $('#demoList')
        , uploadListIns = upload.render({
        elem: '#testList'
        , url: 'real_images/addImage'
        , accept: 'file'
        , data: {houseType: "house_image"}   //可放扩展数据  key-value
        , multiple: true
        , auto: false
        , bindAction: '#testListAction'
        , choose: function (obj) {
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function (index, file, result) {
                var tr = $(['<tr id="upload-' + index + '">'
                    , '<td><img src=' + result + '></td>'
                    , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                    , '<td style="width: 100px;">等待上传</td>'
                    , '<td>'
                    , '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
                    , '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                    , '</td>'
                    , '</tr>'].join(''));

                //单个重传
                tr.find('.demo-reload').on('click', function () {
                    obj.upload(index, file);
                });

                //删除
                tr.find('.demo-delete').on('click', function () {
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                demoListView.append(tr);
            });
        }
        , done: function (res, index, upload) {
            if (res.code == 0) //上传成功
                var tr = demoListView.find('tr#upload-' + index)
                    , tds = tr.children();
            tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
            tds.eq(3).html(''); //清空操作
            return delete this.files[index]; //删除文件队列已经上传成功的文件
        }//code为后台传回来的数据，具体多少自己定，

        //后台只能传回json格式数据，不然会走error函数；

        , error: function (index, upload) {

        }
    });
    //提交表单
    form.on("submit(sub)", function () {
        var demo_list = $("#demoList").html();
        if (demo_list === "" || demo_list == null) {
            alert("图片不能为空");
        } else {
            var house_info = "";
            house_info += $("#house_type_room").val() + "室/" + $("#house_type_hall").val() + "厅/" + $("#house_type_bathroom").val() + "卫";
            house_info += "~" + $("#house_area").val() + "㎡";
            $("input[name=houseInfo]").val(house_info);
            $.post({
                url: "realHouse/addNewHouse",
                data: $("#house_form").serialize(),
                success: function (data) {
                    if (data) {
                        var a = $("#testListAction").trigger('click');
                        if (a.length > 0) {
                            alert("上传成功");
                            window.location.href = "page_14";
                        } else {
                            alert("系统繁忙");
                        }
                    }
                }
            }, "json");
        }
    });
    //地区
    $(function () {
        $.post({
            url: "realArea/findAllByLevel",
            data: {level: 2},
            async: false,
            success: function (data) {
                if (data) {
                    $("#area_select").html("");
                    var string = "";
                    for (var a = 0; a < data.length; a++) {
                        string += "<option value='" + data[a].id + "'>" + data[a].areaName + "</option>";
                    }
                    $("#area_select").html(string);
                    form.render()
                } else {
                    alert("轻点!!");
                }
            }
        })
    });
});