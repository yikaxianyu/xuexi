$(function () {
    $(".wb").mouseover(function () {
        $("#wb").css("display", "block");
    }).mouseout(function () {
        $("#wb").css("display", "none");
    });
    $(".wx").mouseover(function () {
        $("#wx").css("display", "block");
    }).mouseout(function () {
        $("#wx").css("display", "none");
    })



    $('.prs_btn').click(function () {
        var islogin01 = getCookie("uname");
        if (islogin01 !== '') {
            //location.href = 'mycourse.html'
            if($(this).html()=="关注"){
                $(this).html("取关")
            }else{
                $(this).html("关注")
            }
            
        } else {
            alert("您还没有登录哦！立即登录！");
            location.href = 'login.html';
        }
    })


    $('#exit_login').click(function () {
        document.cookie = "uname=";
        document.cookie = "upwd=";
        location.href = 'azz.html';
    })

    function getCookie(name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == name)
                return arr[1];
        }
        return "";
    }

    var islogin = getCookie("uname");
    if (islogin !== '') {
        $("#main_menu").hide();
        $(".user_menu").show();
        $('#u_name').html(islogin)
    } else {
        $("#main_menu").show();
        $(".user_menu").hide();
    }

    $('.btn-primary').click(function () {
    if (islogin !== '') {
        location.href = 'user.html';
    } else {
        location.href = 'login.html';
    }
      })


    $('#js_password_save').click(function () {
        var uname =getCookie("uname");
        var upw1 = $('#pwd1').val();
        var upw2 = $("#pwd2").val();
        var upw3 = $('#pwd3').val();

        $.ajax({
            url:"/product/confirm",
            type:'get',
            data:{
                uname: uname,
                upwd: upw1,
            },
            success:(result)=>{
                if(result.code > 0){
                    if(upw3 == upw2){
                        $.ajax({
                            url: "/product/modify",
                            type: "get",
                            data: {
                                uname: uname,
                                upwd: upw2
                            },
                            success: (result) => {
                                if (result.code > 0) {
                                    alert("修改成功，请重新登录")
                                    window.location.replace("/login.html");
                                } else {
                                    alert("fail...");
                                }
                            }
                        });
                    }else{
                        alert("密码不同，请重新输入");
                        location.reload();
                    }
                }else{
                    alert("密码错误，请重新输入");
                }
                
              }
            })
        })
        

    $('[role=presentation]').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var name = $(this).data('set');
        if(name == 1){
            $('.reword').show().siblings().hide()   
        }else if(name == 2){
            $('.zz').show().siblings().hide() 
        }else{
            $('.set').show().siblings().hide() 
        }  
      })

    $('.list-group-item').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        if($(this).data('set') == 1){
            $('.set_right').show();
            $('.content-form').hide()
        }else{
            $('.set_right').hide();
            $('.content-form').show()
        }
      })


      $('.js_reply_click').click(function (e) {
        e.preventDefault();
        if(islogin!=""){
            $(this).parent().next().next().toggleClass('hide')
        }else{
            alert("您还没有登录哦！立即登录！");
                location.href = 'login.html';
        } 
    });
})

