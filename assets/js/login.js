$(function(){
    $('.link_login').on('click',function(){
        $('.login_text').hide()
        $('.reg_text').show()
    })
    $('.link_reg').on('click',function(){
        $('.reg_text').hide()
        $('.login_text').show()
    })

    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须是6到12位，且不能出现空格'],
        repwd:function(value){
            let pwd = $('.reg_text [name=password]').val()
            if(pwd !== value){
                return '两次密码输入不一致'
            }
        }
    })

    //注册submit监听
    $('#submit_reg').on('submit',function(e){
        e.preventDefault()
        $.post('http://www.liulongbin.top:3007/api/reguser',
        { username: $('#submit_reg [name=username]').val() , password: $('#submit_reg [name=password]').val() },
        function(res){
            if(res.status !==0 ){
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('.link_reg').click()
        }
        )
    })

    //登录事件
    $('#submit_login').on('submit',function(e){
        e.preventDefault()
        $.post('http://www.liulongbin.top:3007/api/login',
        { username: $('#submit_login [name=username]').val(), password: $('#submit_login [name=password]').val() },
        function(res){
            if(res.status !==0){
                return layer.msg(res.message);
            }
            layer.msg('登录成功');
            localStorage.setItem('token',res.token)
            console.log(res.token);
            location.href = '/index.html'
        })
    })
})