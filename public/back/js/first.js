$(function () {
    var currentPage = 1; //页码
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            success: function (data) {
                $('tbody').html(template('tpl', data));
                $('#paginator').bootstrapPaginator({
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

    };
    render();
    //添加一级分类
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');

    })
    //校验
    var $form = $('#form');
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryName: {

                validators: {
                    notEmpty: {
                        message: "请输入一级分类的名称"
                    }
                }

            }
        }
    });
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),//表单序列化
            success:function(e){
                if(e.success){
                    $("#addModal").modal("hide");
                    currentPage=1;
                    render();
                }
                //数据格式化
                $form.data('bootstrapValidator').resetForm();
                $form[0].reset();
            }
        })
    })

})