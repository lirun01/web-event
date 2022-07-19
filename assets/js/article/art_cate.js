$(function () {
    let layer = layui.layer
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/cates',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类失败')
                }
                // console.log(res);
                let va = template('tpl-table', res)
                $('tbody').html(va)
            }
        })
    }

    $('#btn-compile').on('click', function () {
        layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '300px'],
            content: $('#bar-table').html()
        });
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        // console.log('ok');
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/my/article/addcates',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data:
                // name: $('#form-edit [name="name"]').val(),
                // alias: $('#form-edit [name="alias"]').val()
                $(this).serialize()
            ,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章分类失败')
                }
                console.log(res);
                initArtCateList()
            }
        })
        console.log($('#form-edit [name=name]').val());
    })

    let indexEdit = null
    $('tbody').on('click', '#btn-edit', function (e) {
        e.preventDefault()
        indexEdit = layer.open({
            title: '编辑文章分类',
            type: 1,
            area: ['500px', '300px'],
            content: $('#bianji-table').html()
        });

        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/cates/' + id,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败！')
                }
                console.log(res);
                $('#form-bianji [name=name]').val(res.data.name)
                $('#form-bianji [name=alias]').val(res.data.alias)
            }
        })
    })

    $('body').on('submit', '#form-bianji', function (e) {
        var id = $(this).attr('data-id')
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/my/article/updatecate',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            // data: $(this).serialize(),
            data: {
                Id: id,
                name: $('#form-bianji [name=name]').val(),
                alias: $('#form-bianji [name=alias]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.close(indexEdit)
                initArtCateList()
                console.log(res);
            }
        })
    })


    $('tbody').on('click', '.btn-edit', function () {
        var id = $(this).attr('data-id')
        // console.log(id);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: 'http://www.liulongbin.top:3007/my/article/deletecate/' + id,
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.close(index)
                    layer.msg('删除成功')
                    initArtCateList()
                }
            })
        })
    })
})