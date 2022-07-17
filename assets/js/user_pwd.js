$(function(){

    let form = layui.form
    let layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samePwd:function(value){
            if($('[name=password]').val() === value){
                return '新密码和旧密码不能一致'
            }
        },
        savePwd:function(value){
            if($('[name=newpassword]').val() !== value){
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/updatepwd',
            headers:{
                Authorization:localStorage.getItem('token')
            },
            data:{
                oldPwd: $('.layui-form [name=password]').val(),
                newPwd: $('.layui-form [name=newpassword]').val()
            },
            success:function(res){
                if(res.status !==0){
                    return layer.msg('更新失败')
                }
                // console.log(res);
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
                localStorage.removeItem('token')
                window.parent.location.href = '../login.html'
            }
        })
    })
})