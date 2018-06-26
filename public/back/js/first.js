/**
 * Created by hong on 2018/6/26.
 */
$(function () {
    var currentPage=1;
  var pageSize=2;
  render()
  function render() {
      $.ajax({
        type:"get",
        data:{
          page:currentPage,
          pageSize:pageSize,
        },
        dataType:"json",
        url:"/category/queryTopCategoryPaging",
        success:function (info) {
          console.log(info);
          var strHtml=template('tmp',info);
          $('tbody').html(strHtml);

        //分页初始化
          $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion:3,
            totalPages:Math.ceil(info.total/info.size),
            currentPage:info.page,
            onPageClicked:function (a,b,c,page) {
                currentPage=page;
              render()
            }

          })

        }

      })
  }

  $('.addPag').click(function () {
      $('#addModal').modal('show')
  })

  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"一级分类不能为空"
          }
        }
      }
    }
  })

  $('#form').on('success.form.bv',function (e) {
      e.preventDefault();
      $.ajax({
        url:'/category/addTopCategory',
        type:"post",
        data:$('#form').serialize(),
        dataType:'json',
        success:function (info) {
          if(info.success){
            $('#addModal').modal('hide')
            currentPage=1;
            render();
            $('#form').data('bootstrapValidator').resetForm(true)
          }
        }
      })


  })




})