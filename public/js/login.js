function login_dl() {
    $("#dlazz").toggleClass("hidden");
    $("#zcazz").toggleClass("hidden");
  }

$("#reg-btn").click(function () {
    console.log(1)
    var uname = $("#reg-name").val();
    var upwd = $("#reg-pwd").val();
    var nameReg = new RegExp(/^[A-Za-z0-9]{2,9}$/);
    var pwdReg = new RegExp(/^\d{3,9}$/);

    if (nameReg.test(uname) !== true) {
        alert("用户名不符合规范，请重新输入...");
        return;
    }
    if (pwdReg.test(upwd) !== true) {
        alert("密码不符合规范，请重新输入...");
        return;
    }

    $.ajax({
        url: "/product/reg",
        type: "get",
        data: {
            uname: uname,
            upwd: upwd
        },
        success: (result) => {
            if (result.code > 0) {
                alert("注册成功");
                location.reload();
            } else {
                alert("注册失败");
            }
        }
    });
});
// document.onkeydown = cdk;
// function cdk () {
//     if(event.keyCodes = '13'){
//         $("#login-btn").click();
//         }
// }

$("#login-btn").click(function () {
    var uname = $("#login-name").val();
    var upwd = $("#login-pwd").val();

    $.ajax({
        url: "/product/my_login",
        type: "get",
        data: {
            uname: uname,
            upwd: upwd
        },
        success: (result) => {
            if (result.code > 0) {
                //增加的保存cookie代码
                var exp = new Date();
                exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
                document.cookie = "uname=" + uname + ";expires=" + exp.toGMTString();
                document.cookie = "upwd=" + upwd + ";expires=" + exp.toGMTString();
                //新增结束
                window.location.replace("/azz.html");
            } else {
                alert("fail...");
            }
        }
    });
});

$('.no_label').focus(function (e) {
    e.preventDefault();
    $(this).prev().hide()
  })
$(".no_label").blur(function (e) { 
    e.preventDefault();
    if($(this).val()==""){
        $(this).prev().show()
    }
    
});
        

    

