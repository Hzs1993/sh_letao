/**
 * Created by hong on 2018/6/25.
 */
$(document).ajaxStart(function () {
    NProgress.start();
})




$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  },1000)

})


