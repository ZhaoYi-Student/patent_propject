layui.use(['layer', 'form', 'element'], function () {
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;
    var addHandIn = $("#addHandIn");
    addHandIn.on('click', function () {
        console.log(1111);
        $("#addHandInPage").modal("show");
    });
    form.on('submit(formDemo)', function () {
        var file = $('#file').get(0).files[0];
        if (file) {
            layer.msg("有了");
        } else {
            layer.msg("请选择上传文件！");
        }
    })
});