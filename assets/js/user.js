$(function(){
    //验证nickname的长度
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return '昵称长度不能大于6'
            }
        }
    })
    inituserInfo()

    function inituserInfo(){
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            headers:{
                Authorization:localStorage.getItem('token')
            },
            success:function(res){
                console.log(res);
                if(res.status !==0){
                    return layer.msg('获取用户失败')
                }
                form.val('formUserInfo',res.data)
            }
        })
    }

    $('#btnReset').on('click',function(e){
        e.preventDefault()
        inituserInfo()
    })

    $('#btn_from').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/userinfo',
            headers:{
                Authorization:localStorage.getItem('token')
            },
            data:{ id: $('#btn_from [name=id]').val(),nickname: $('#btn_from [name=nickname]').val(),email: $('#btn_from [name=email]').val() },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('修改用户成功')
                window.parent.getUserinfo()
            }
        })
    })
})