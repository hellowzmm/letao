/**
 * Created by HUCC on 2017/11/21.
 */

//表单验证功能
//1. 用户名不能为空
//2. 用户密码不能为空
//3. 用户密码的长度是6-12位

/**
 * Created by HUCC on 2017/11/21.
 */
// $(function () {
//     var $form = $("form");
//     $form.bootstrapValidator({
//         //配置校验时的图标,
//         feedbackIcons: {
//             valid: 'glyphicon glyphicon-ok',
//             invalid: 'glyphicon glyphicon-remove',
//             validating: 'glyphicon glyphicon-refresh'
//         },
//         //字段，校验字段
//         fields: {
//             username: {
//                 validators: {
//                     notEmpty: {
//                         message: "用户名不能为空"
//                     },
//                     callback: {
//                         message: "用户名不存在"
//                     }
//                 }
//             },
//             password: {
//                 validators: {
//                     notEmpty: {
//                         message: "用户密码不能为空"
//                     },
//                     stringLength: {
//                         min: 6,
//                         max: 12,
//                         message: "用户名不能为空"
//                     },
//                     callback: {
//                         message: "密码错误"
//                     }
//                 }
//             }
//         }
//     });
//     //需要给表单注册一个校验成功的事件  success.form.bv
//     $form.on("success.form.bv", function (e) {
//         e.preventDefault();
//         $.ajax({
//             type: "post",
//             url: "/employee/employeeLogin",
//             data: $form.serialize(),
//             success: function (data) {
//                 if (data.success) {
//                     location.href = "index.html";
//                 }
//                 if (data.error === 1000) {
//                     $form.data("bootstrapValidator").updateStatus("username", "INVALID",

//                         "callback");
//                 }
//                 if (data.error === 1001) {
//                     $form.data("bootstrapValidator").updateStatus("password", "INVALID",
//                         "callback");
//                 }
//             }
//         });
//     });
//     //重置功能，重置样式
//     $("[type='reset']").on("click", function () {
//         $form.data("bootstrapValidator").resetForm();
//     });
// });
$(function () {
    var $form = $('form');
    //表单校验
    $form.bootstrapValidator({
        //配置校验时的图标,
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: "用户名错误"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                    callback:{
                        message:"密码错误"
                    }

                }
            }

        }
    });
    //表单校验成功
    $form.on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $form.serialize(),
            success: function (data) {
                if (data.success) {
                    location.href = "index.html";
                }
                if (data.error == 1000 ) {
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID",
                        "callback");
                }
                if( data.error == 1001){
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID",
                    "callback")
                }
            }
        });
    })
    //重置按钮

    $("[type='reset']").on("click", function () {
        $form.data("bootstrapValidator").resetForm();
    });

})