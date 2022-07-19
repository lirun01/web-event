$(function () {

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    //美化时间
    template.defaults.imports.dataFormat = function (date) {
        var dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    var p = {
        pagenum: 1,  //页码值
        pagesize: 2,  //每页显示多少条数据
        cate_id: '',     //文章分类的 Id
        state: ''     //	文章的状态，可选值有：已发布、草稿
    }
    initTable()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/list',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: p,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表失败')
                }
                console.log(res);
                var htmlstr = template('tpl-table', res)
                $('tbody').html(htmlstr)
                // console.log(res.total);
                renderpage(res.total)
            }
        })
    }

    function renderpage(total) {
        laypage.render({
            elem: 'pagebox',
            count: total,
            limit: p.pagesize,
            curr: p.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                console.log(obj.curr);
                p.pagenum = obj.curr
                p.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }
    initCate()
    //初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/cates',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                var htmlstr = template('initcate', res)
                $('#lintcate').html(htmlstr)
                form.render()
            }
        })
    }
    $('#form-arch').on('submit', function (e) {
        e.preventDefault()
        // console.log('ok');
        var cate_id = $('[name="cate_id"]').val()
        // console.log(cate_id);
        var state = $('[name="state"]').val()
        p.cate_id = cate_id
        p.state = state
        initTable()
    })

    $('tbody').on('click', '.btn-delet', function () {
        // console.log('ok');
        var id = $(this).attr('data-id')
        var len = $('.btn-delet').length
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: 'http://www.liulongbin.top:3007/my/article/delete/' + id,
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    if(len ===1){
                        p.pagenum = p.pagenum===1 ? 1 :  p.pagenum-1
                    }
                    initTable()
                    layer.msg('删除成功')
                }
            })
            layer.close(index);
        });

    })

})