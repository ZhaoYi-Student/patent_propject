layui.use(['layer', 'form', 'element'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;
    var addHandIn = $("#addHandIn");
    var file = $('#file');
    var handInNo = $("input[name=handInNo]");
    var deptName = $("#dept_name");
    var deptName2 = $("#dept_name2");
    var hand_in_name = $("#hand_in_name");
    var reset = $("#reset");

    ShowAllDept();

    /* 查询部门表所有信息*/
    function ShowAllDept() {
        $.ajax({
            url: "/DeptCon/ShowDeptName",
            type: "get",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        deptName.append("<option value='" + data[i].id + "'>" + data[i].deptName + "</option>");
                        deptName2.append("<option value='" + data[i].id + "'>" + data[i].deptName + "</option>");
                    }
                }
            }

        })
    }

    addHandIn.on('click', function () {
        $("#addHandInPage").modal("show");
        $.post({
            url: "untils/getOrderIdByUUId",
            success: function (data) {
                handInNo.val(data);
            }
        }, "json");
    });

    form.on('submit(formDemo)', function () {
        var fileObject = file.get(0).files[0];
        if (fileObject) {
            // $("#fileLabel").html("<span style='cursor:pointer;'>"+fileList.name+"</span>");
            $.post({
                url: "p_hand_in/addHandIn",
                data: $("#addHandInForm").serialize(),
                success: function (data) {
                    console.log(data);
                    if (data) {
                        reset.trigger('click');
                        alert("提交成功");
                    }
                }
            }, 'json');
        } else {
            layer.msg("请选择上传文件！");
        }
    });

    file.on('change', function () {
        var fileObject = file.get(0).files[0];
        $("#fileLabel").html("<span style='cursor:pointer;'>" + fileObject.name + "</span>");
    })
});



