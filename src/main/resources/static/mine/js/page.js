layui.use(['layer', 'form', 'element'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;
    var addHandIn = $("#addHandIn");
    var file = $('#file');
    var paymentNo = $("input[name=paymentNo]");
    var deptName1 = $("#dept_name1");
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
                        deptName1.append("<option value='" + data[i].id + "'>" + data[i].deptName + "</option>");
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
                paymentNo.val(data);
            }
        }, "json");
    });

    form.on('submit(formDemo)', function () {
        var fileObject = file.get(0).files[0];
        if (fileObject) {
            // $("#fileLabel").html("<span style='cursor:pointer;'>"+fileList.name+"</span>");
            var formData = new FormData();
            formData.append("multipartFile", fileObject);
            $.post({
                url: "p_file/addFile",
                data: formData,
                processData: false, //因为data值是FormData对象，不需要对数据做处理。
                contentType: false,
                async: false,
                success: function (data) {
                    if (data) {
                        $.post({
                            url: "p_hand_in/addHandIn",
                            data: $("#addHandInForm").serialize(),
                            async: false,
                            success: function (data) {
                                if (data) {
                                    reset.trigger('click');
                                    alert("提交成功");
                                    $("#addHandInPage").modal("hide");
                                    PHandInListAll();
                                } else {
                                    layer.msg("系统繁忙")
                                }
                            }
                        }, 'json');
                    } else {
                        layer.msg("文件提交失败,请稍后重试...")
                    }
                }
            }, "json");

        } else {
            layer.msg("请选择上传文件！");
        }
    });

    file.on('change', function () {
        var fileObject = file.get(0).files[0];
        $("#fileLabel").html("<span style='cursor:pointer;'>" + fileObject.name + "</span>");
    })

    PHandInListAll();


    $("#likeSelect").on('click', function () {
        PHandInListAll();
    });

    /*bootTable展示所有专利信息*/
    function PHandInListAll() {
        $('#PHandInListId').bootstrapTable('destroy');
        var handInName = $("input[name=handInName]").val();
        $("#PHandInListId").bootstrapTable({
            url: "/p_hand_in/ShowTabHandAndMoHu",//路径
            method: "get", 			 //请求方式
            cache: false,		    //关闭缓存
            striped: true,        //是否有斑马线效果
            pagination: true,      //开启分页
            sortable: true,     //是否启用排序
            sortOrder: "asc",   //排序的方式
            sidePagination: "client", //client客户端分页,"server"服务端分页
            clickToSelect: true,	 //设置复选框头

            columns: [
                {field: "handInNo", title: "编号", align: "center"},
                {field: "handInName", title: "专利名称", align: "center"},
                {field: "handInFrequency", title: "申请文件数", align: "center"},
                {field: "handInInventor", title: "发明人", align: "center"},
                {field: "puser.realName", title: "申请人", align: "center"},
                {field: "pdept.deptName", title: "部门", align: "center"},
                {field: "handInTime", title: "申请时间", align: "center"},
                {
                    field: "handInAuditStatus", title: "目前状态", align: "center",
                    formatter: function (value, row, index) {
                        if (value === 0) {
                            return "正在审核"
                        } else if (value === 1) {
                            return "审核通过"
                        } else {
                            return "驳回"
                        }
                    }
                },
                {
                    field: "", title: "操作", align: "center",
                    formatter: function (value, row, index) {
                        return "<a href='javaScript:FindByIdAll(" + row.id + ")'>查看</a>";
                    }
                }

            ],
            queryParams: function (params) {
                return $("#selectItem").serialize();
            },
        })
    }
});

$(function () {
    $("#dantiaoZhuanLi").hide();
    findAll();
});

function FindByIdAll(id) {

    $("#myModal").modal("show");
    $.ajax({
        url: "/p_hand_in/FindByIdAll",
        type: "post",
        dataType: "json",
        data: {"id": id},
        success: function (data) {
            $("#bianhao").html(data.handInNo);
            $("#famingren").html(data.handInInventor);
            $("#shijian").html(data.handInTime);
            $("#jiaodishu").html(data.handInName);
            $("#bumen").html(data.pdept.deptName);
            $("#shenqingren").html(data.puser.realName);
            $("#wenjianming").html(data.pfile.fileName);
            $("#jindu").html(data.handInSchedule);
            $("#shenqingcishu").html(data.handInFrequency);
            $("#zhuguanyijian").val(data.supervisorOpinion);
            $("#jishufuzerenyijian").val(data.technicalPersonOpinion);
            var process = data.handInProcess;
            for (var a = 1; a <= process; a++) {
                var backgroung_color = $("#process" + a + ">b>b");
                var line_color = $("#process" + a + ">p");
                var text = $("#process" + a + ">div");
                backgroung_color.css("background", "#3c763d");
                line_color.css("border", "1px dashed #3c763d")
                text.css("color", "#3c763d");
            }
        }
    })
}

// 进度
function findAll() {
    $.post({
        url: "p_process/findAll",
        success: function (data) {
            var append = "";
            for (var a = 0; a < data.length; a++) {
                append += "<div class=\"s-step s-step" + a + "\" id='process" + data[a].id + "'>\n" +
                    "                <b>\n" +
                    "                    <b></b>\n" +
                    "                </b>\n" +
                    "                <p></p>\n" +
                    "                <div>" + data[a].processName + "</div>\n" +
                    "            </div>";
            }
            $("#process_image").html("");
            $("#process_image").html(append);
        }
    }, "json");
}



