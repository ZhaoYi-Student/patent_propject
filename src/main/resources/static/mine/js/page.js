layui.use(['layer', 'form', 'element'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;
    var addHandIn = $("#addHandIn");
    var file = $('#file');
    addHandIn.on('click', function () {
        $("#addHandInPage").modal("show");
    });
    form.on('submit(formDemo)', function () {
        var fileObject = file.get(0).files[0];
        if (file) {
            // $("#fileLabel").html("<span style='cursor:pointer;'>"+fileList.name+"</span>");
        } else {
            layer.msg("请选择上传文件！");
        }
    })
    file.on('change', function () {
        var fileObject = file.get(0).files[0];
        $("#fileLabel").html("<span style='cursor:pointer;'>" + fileObject.name + "</span>");
    })
});



