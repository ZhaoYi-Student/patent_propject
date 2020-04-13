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
            $.post({
                url:"",
                data:{"file":fileObject},
                success:function(data){
                    console.log(data);
                }
            },"json");
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



