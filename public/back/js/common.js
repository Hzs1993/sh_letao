/**
 * Created by hong on 2018/6/25.
 */


if(location.href.indexOf("login.html")===-1){

  $.ajax({
    url:"/employee/checkRootLogin",
    dateType:"json",
    type:"get",
    success:function (info) {

      if(info.error===400){
          location.href="login.html"
        }
      if(info.success){

      }
    }
  })
}






$(document).ajaxStart(function () {
    NProgress.start();
})


$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  },1000)

})


//公共功能

$(function(){

  $('.lt_aside .category').click(function() {
    $('.lt_aside .child').stop().slideToggle();
  });

  $('.lt_topbar .icon_menu').click(function() {
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
  });


  $('.lt_topbar .icon_logout').click(function () {
      $('#logoutModal').modal('show')
      $('#logoutBtn').click(function () {
          $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function (info) {
                if(info.success){
                  location.href='login.html'
                }
            }

          })
      })



  })




})













