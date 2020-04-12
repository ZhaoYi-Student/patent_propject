layui.use(['layer', 'form', 'element'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;
    var addHandIn = $("#addHandIn");
    var file = $('#file');
    var handInNo = $("input[name=handInNo]");
    addHandIn.on('click', function () {
        $("#addHandInPage").modal("show");
        $.post({
            url:"untils/getOrderIdByUUId",
            success:function (data) {
                handInNo.val(data);
            }
        },"json");
    });

    form.on('submit(formDemo)', function () {
        var fileObject = file.get(0).files[0];
        if (file) {
            // $("#fileLabel").html("<span style='cursor:pointer;'>"+fileList.name+"</span>");
            $.post({
                url:"",
                data:$("#addHandInForm").serialize(),
                success:function(data){

                }
            },'json');
        } else {
            layer.msg("请选择上传文件！");
        }
    })

    file.on('change', function () {
        var fileObject = file.get(0).files[0];
        $("#fileLabel").html("<span style='cursor:pointer;'>" + fileObject.name + "</span>");
    })
});



