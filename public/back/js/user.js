/**
 * Created by hong on 2018/6/26.
 */


$(function () {
   var currentPage=1;
  var pageSize=5;
  var currentId;
  var isDelete;
  render();
  function render() {
    $.ajax({
      url:"/user/queryUser",
      type:"get",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        var strHtml=template("tmp",info);
        $("tbody").html(strHtml);

        //分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked(a,b,c,page){
            currentPage=page;
            render();
          }

        })


      }

    })

  }

$('tbody').on('click','.btn',function () {
    $('#userModal').modal('show');
    currentId=$(this).parent().data('id');
    isDelete=$(this).hasClass('btn-danger')?0:1;

})

  $('#userBtn').click(function () {

    $.ajax({
      type:"post",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      url:"/user/updateUser",
      success:function (info) {
        console.log(info);
        if(info.success){
          $('#userModal').modal('hide');
          render()
        }
      }
    })

  })




})





