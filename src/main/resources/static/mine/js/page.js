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
                {field: "handInAuditStatus", title: "目前状态", align: "center"},
                {
                    field: "", title: "操作", align: "center",
                    formatter: function (value, row, index) {
                        return "<a href='javaScript:Weiqianpi(" + row.id + ")'>查看</a>";
                    }
                }

            ],
            queryParams: function (params) {
                return $("#selectItem").serialize();
            },
        })
    }

    auditList();

    function auditList() {
        $("#page2Table").bootstrapTable({
            url: "p_hand_in/ShowTabHandAndMoHu",
            method: 'post',// 提交方式
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",// 发送到服务器的编码类型
            pageNumber: 1,
            pageSize: 10,
            sortName: 'id',
            sortOrder: 'asc',
            //height: $(window).height()/2,
            pagination: true,// 开启分页
            sidePagination: "client",// 分页方式 'client'为客户端分页
            cache: false,// 是否使用缓存
            columns: [
                {
                    field: 'id',// value值
                    formatter: function (value, row, index) {
                        return index + 1;
                    }
                },
                {
                    title: '专利名称',
                    formatter: function (value, row, index) {
                        return "<a href='/1/1?id=" + row.id + "'>" + row.handInName + "</a>"
                    }
                },
                {
                    title: '申请文件数',
                    formatter: function (value, row, index) {
                        return "<a href='/1/1?id=" + row.id + "'>" + row.handInFrequency + "</a>"
                    }
                },
                {
                    field: 'handInInventor',
                    title: '发明人'
                },
                {
                    field: 'puser.realName',
                    title: '申请人'
                },
                {
                    field: 'pdept.deptName',
                    title: '部门'
                },
                {
                    field: 'handInTime',
                    title: '申请时间'
                },
                {
                    title: '目前状态',
                    formatter: function (value, row, index) {
                        if (row.handInAuditStatus==0) {
                            return "待审核"
                        }
                        if (row.handInAuditStatus==1) {
                            return "审核通过"
                        }
                        if (row.handInAuditStatus==2) {
                            return "审核驳回"
                        }
                    }
                },
                {
                    title: '操作',
                    formatter: function (value, row, index) {
                        return "<input value='审核' type='button'>";
                    }
                }
            ]
        });
        //申请人下拉框
        $.ajax({
            url:"UserCon/fingHandInApplicant_page2",
            type:"post",
            dataType:"json",
            data:{},
            success:function(data){
                $(data).each(function(a,b){
                    $("#handInApplicant").append("<option value='"+b.id+"'>"+b.realName+"</option>");
                })
            }
        })
        //部门下拉框
        $.ajax({
            url:"DeptCon/ShowDeptName",
            type:"post",
            dataType:"json",
            data:{},
            success:function(data){
                $(data).each(function(a,b){
                    $("#dept_name").append("<option value='"+b.id+"'>"+b.deptName+"</option>");
                })
            }
        })
    }


});

function find_PHandIn_Only_page2() {
    var handInName=$("#handInName").val();
    var handInApplicant=$("#handInApplicant").val();
    var handInInventor=$("#handInInventor").val();
    var dept_name=$("#dept_name").val();
    $.ajax({
        url:"p_hand_in/ShowTabHandAndMoHu",
        type:"post",
        dataType:"json",
        data:{
            handInName:handInName,handInApplicant:handInApplicant,handInInventor:handInInventor,deptId:dept_name
        },
        success:function(data){
            $("#page2Table").bootstrapTable('load',data);
        }
    })
}

function table_status() {
    var handInName=$("#handInName").val();
    var handInApplicant=$("#handInApplicant").val();
    var handInInventor=$("#handInInventor").val();
    var dept_name=$("#dept_name").val();
    var page2_status=$("#page2_status").val();
    $.ajax({
        url:"p_hand_in/ShowTabHandAndMoHu",
        type:"post",
        dataType:"json",
        data:{
            handInName:handInName,handInApplicant:handInApplicant,handInInventor:handInInventor,deptId:dept_name
        },
        success:function(data){
            $("#page2Table").bootstrapTable('load',data);
        }
    })
}



