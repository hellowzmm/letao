/**
 * Created by HUCC on 2017/11/21.
 */
// 进度条功能

//禁用进度环
NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500);
});

//非登陆页面，判断当前用户是否是登录
if(location.href.indexOf("login.html")==-1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function(data){
            if(data.error === 400){
                location.href="login.html";
            }
        }
    })
}


//二级分类显示隐藏功能
$('.child').prev().on('click',function(){
    $(this).next().slideToggle();
})

//侧边栏显示隐藏功能
$('.icon_menu').on('click',function(){
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
});

//退出功能
$('.icon_logout').on('click',function(){
    $("#logoutModal").modal("show");
    $('.btn_logout').off().on('click',function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function(data){
                // console.log(data.success);
                if(data.success){
                    location.href="login.html";
                }
            }

        });
    })
})

