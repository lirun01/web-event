$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#lay_btn').on('click', function () {
        $('#fileimg').click()
    })

    $('#fileimg').on('change', function (e) {
        let filelist = e.target.files
        // console.log(filelist);
        if (filelist.length === 0) {
            return layui.layer.msg('请选择图片')
        }
        //拿到用户选择的文件
        var file = e.target.files[0]
        // 将文件转化为路径
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    $('#upload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

            $.ajax({
                method:'POST',
                url:'http://www.liulongbin.top:3007/my/update/avatar',
                headers:{
                    Authorization:localStorage.getItem('token')||''
                },
                data:{
                    avatar:dataURL
                },
                success:function(res){
                    if(res.status !== 0){
                        return layui.layer.msg('头像更新失败')
                    }
                    layui.layer.msg('头像更新成功')
                    window.parent.getUserinfo()
                }
            })
    })
})