layui.use(['layer', 'form', 'element'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;
    var addHandIn = $("#addHandIn");
    var file = $('#file');
    var handInNo = $("input[name=handInNo]");
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
                handInNo.val(data);
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

    // page_3的js
    // 缴费通知

});

$(function () {
    $("#dantiaoZhuanLi").hide();
})

function FindByIdAll(id) {

    $("#myModal").modal("show");


    $.ajax({
        url:"/p_hand_in/FindByIdAll",
        type:"post",
        dataType:"json",
        data:{"id":id},
        success:function (data) {
          $("#bianhao").val(data.handInNo);
            $("#famingren").val(data.handInInventor);
            $("#shijian").val(data.handInTime);
            $("#jiaodishu").val(data.handInName);
            $("#bumen").val(data.pdept.deptName);
            ;

        }
    })
}



