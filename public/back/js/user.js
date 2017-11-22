$(function () {
    var currentPage = 1; //页码
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                $('tbody').html(template('tpl', data));
                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    onPageClicked: function (_, _, _, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        });
    }
    render();
    //禁启用按钮
    $('tbody').on('click', '.btn', function () {
        $("#userModal").modal('show');
        var id = $(this).parent().data('id');
        var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
        $('.btn_confirm').off().on('click', function () {
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function (info) {

                    if (info.success) {
                        //关闭模态框
                        $("#userModal").modal("hide");

                        //重新渲染表格
                        render();
                    }

                }
            });
        })


    })
})