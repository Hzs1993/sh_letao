/**
 * Created by hong on 2018/6/27.
 */
$(function () {


  var currentPage=1;
  var pageSize=5;
  render();
  function render() {

    $.ajax({
      url:"/category/querySecondCategoryPaging",
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataPype:'json',
      success:function (info) {
        //console.log(info);
        var strHtml=template('tmp',info);
        $('tbody').html(strHtml);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currtPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked(a,b,c,page) {
              currentPage=page,
                render()
          }
        })


      }

    })


  }

$('.btn').click(function () {
    $('#secondModal').modal('show')

  $.ajax({

    url:'/category/queryTopCategoryPaging',
    type:'get',
    dataType:'json',
    data:{
      page:1,
      pageSize:1000
    },
    success:function (info) {
      //console.log(info);
      var strHtml1=template("tml",info);
      $('.dropdown ul').html(strHtml1)
    }
  })
})

  $('.dropdown-menu').on('click','a',function () {
      var txt=$(this).text();
      $('.dropdownTxt').text(txt)
      var id=$(this).data('id')
      $('[name="categoryId"]').val(id);
      $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
  })



  $('#fileUplode').fileupload({
    dataType:"json",
    done:function (e,data) {
      console.log(data.result.picAddr);
      var picUrl=data.result.picAddr;
      $("#imgBox img").attr('src',picUrl)
      $('[name="brandLogo"]').val(picUrl);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
    }

  })

  //校验

  $('#form').bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },

    }

  })

  $('#form').on('success.form.bv',function (e) {
      e.preventDefault()
      $.ajax({
        url:'/category/addSecondCategory',
        data:$('#form').serialize(),
        type:'post',
        dataType:'json',
        success:function (info) {
          if(info.success){
            $('#secondModal').modal('hide');
            $('#form').data('bootstrapValidator').resetForm(true)
            currentPage=1;
            render()
            $('.dropdownTxt').text('请选择一级分类')
            $('#imgBox img').attr("src", "images/none.png");

          }
        }
      })



  })



})