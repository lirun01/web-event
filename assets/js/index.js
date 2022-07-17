$(function () {
    getUserinfo()
    $('#btnlogin').on('click', function () {
        // console.log('ok');
        layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('请求失败')
            }
            renderAvatar(res.data)
        },
        complete:function(res){
            // console.log(res);
            if(res.responseJSON.status ===1&&res.responseJSON.message){
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
}

//渲染用户名称
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcom').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}