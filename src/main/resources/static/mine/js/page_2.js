// page_2的js代码
// 专利审核
DeptDropDownBox();
fingHandInApplicant_page2();

$("#inquire").on('click', function () {
    auditList();
});

$("#page2_status").on('change', function () {
    auditList();
});

function auditList() {

    var handInName = $("#handInName").val();
    var handInApplicant = $("#handInApplicant").val();
    var handInInventor = $("#handInInventor").val();
    var dept_name = $("#dept_name").val();
    var page2_status = $("#page2_status").val();
    var levelId = $("#level_id").val();

    $("#page2Table").bootstrapTable("destroy");
    $("#page2Table").bootstrapTable({
        url: "p_level/findAllByCondition",
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
        queryParams: function () {
            return {
                handInName: handInName,
                handInApplicant: handInApplicant,
                handInInventor: handInInventor,
                deptId: dept_name,
                handInAuditStatus: page2_status,
                pLevelId: levelId
            };
        },
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
                    return "<a href='javascript:;' onclick='fileDownLoad(" + row.fileId + ")'>" + row.handInName + "</a>"
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
                    if (row.handInAuditStatus == 0) {
                        return "待审核"
                    }
                    if (row.handInAuditStatus == 1) {
                        return "审核通过"
                    }
                    if (row.handInAuditStatus == 2) {
                        return "审核驳回"
                    }
                }
            },
            {
                title: '操作',
                formatter: function (value, row, index) {
                    if (row.handInAuditStatus==1) {
                        return "<a>查看</a>"
                    }else if (row.handInAuditStatus==2) {
                        return "<a>查看</a>"
                    }else {
                        return "<a href='javascript:selectShenhe(" + row.id + ")'>审核</a>";
                    }

                }
            }
        ]
    });
}

// 申请人下拉框
function fingHandInApplicant_page2() {
    $.post({
        url: "UserCon/fingHandInApplicant_page2",
        success: function (data) {
            var option = "";
            for (var a = 0; a < data.length; a++) {
                if (a === 0) {
                    option += "<option value='" + data[a].id + "' selected>" + data[a].realName + "</option>"
                } else {
                    option += "<option value='" + data[a].id + "'>" + data[a].realName + "</option>"
                }
            }
            $("#handInApplicant").html("")
            $("#handInApplicant").html(option);
            auditList();
        }
    }, "json");
}

//部门下拉框
function DeptDropDownBox() {
    $.ajax({
        url: "DeptCon/ShowDeptName",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data) {
            $(data).each(function (a, b) {
                $("#dept_name").append("<option value='" + b.id + "'>" + b.deptName + "</option>");
            })
        }
    })
}

// 下载文件
function fileDownLoad(id) {
    console.log(id);
    var downloadName = $("#fileDownloadName");
    $.post({
        url: "p_file/findFileById",
        data: {id: id},
        success: function (data) {
            $("#downloadFile").modal("show");
            console.log(data);
            console.log(data.filePath);
            $("#filePath").val(data.filePath);
            downloadName.html("<span>" + data.fileName + "</span><div><a href='javascript:;' class='text-primary' onclick='downloadFile();'>点击下载</a></div>");
        },
        error: function () {
            alert("系统繁忙");
        }
    }, "json");
}

function downloadFile() {
    var filePath = $("#filePath").val();
    console.log(filePath)
    $.post({
        url: "p_file/downloadFile",
        data: {filePath: filePath},
        success: function (data) {
            alert("文件下载到" + data);
            $("#downloadFile").modal("hide");
        },
        error: function () {
            alert("系统繁忙");
        }
    }, "json");
}

function selectShenhe(id) {
    $("#shenhePage").modal('show');
    //alert(id)
    $.ajax({
        url: "p_hand_in/findShenheContent",
        type: "post",
        dataType: "json",
        data:{id:id},
        success: function (data) {
            if (data) {
                $("#id").val(data.id);
                $("#hand_in_no").val(data.handInNo);
                $("#hand_in_name").val(data.handInName);
                $("#hand_in_applicant").val(data.handInInventor);

                $("#dept_name2").val(data.pdept.deptName);

            }else {
                alert("failed")
            }
        },
        error:function (err) {
            alert("Error")
            console.log(err)
        }
    })
}

function shenheReject() {
    $("#shenhePage").modal('hide');
    $("#tuihuiPage").modal('show');
    var id = $("#id").val();
    $.ajax({
        url:'p_hand_in/applyReject',
        type:'post',
        data:{id:id},
        dataType:'json',
        async:false,
        success:function (data) {
            if (data){
                alert("成功退回")
            }
        }
    })
}

function shenhePass() {
    var id = $("#id").val();
    $.ajax({
        url:'p_hand_in/applyPass',
        type:'post',
        data:{id:id},
        dataType:'json',
        async:false,
        success:function (data) {
            if (data){
                alert("审核成功");
            }
        }
    })
}



// function find_PHandIn_Only_page2() {
//     var handInName = $("#handInName").val();
//     var handInApplicant = $("#handInApplicant").val();
//     var handInInventor = $("#handInInventor").val();
//     var dept_name = $("#dept_name").val();
//     $.ajax({
//         url: "p_hand_in/ShowTabHandAndMoHu",
//         type: "post",
//         dataType: "json",
//         data: {
//             handInName: handInName, handInApplicant: handInApplicant, handInInventor: handInInventor, deptId: dept_name
//         },
//         success: function (data) {
//             $("#page2Table").bootstrapTable('load', data);
//         }
//     })
// }
//
// function table_status() {
//     var handInName = $("#handInName").val();
//     var handInApplicant = $("#handInApplicant").val();
//     var handInInventor = $("#handInInventor").val();
//     var dept_name = $("#dept_name").val();
//     var page2_status = $("#page2_status").val();
//     $.ajax({
//         url: "p_hand_in/ShowTabHandAndMoHu",
//         type: "post",
//         dataType: "json",
//         data: {
//             handInName: handInName,
//             handInApplicant: handInApplicant,
//             handInInventor: handInInventor,
//             deptId: dept_name,
//             handInAuditStatus: page2_status
//         },
//         success: function (data) {
//             $("#page2Table").bootstrapTable('load', data);
//         }
//     })
// }