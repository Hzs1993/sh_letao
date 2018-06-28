/**
 * Created by hong on 2018/6/28.
 */
$(function () {

  var currentPage=1;
  var pageSize=2;
  var picArr=[];
  render()
  function render() {
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      success:function (info) {
        var htmlStr=template('tmp',info);
        $('tbody').html(htmlStr)
        //初始化分页功能

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          size:'mini',
          itemTexts:function (type,page,current) {
              switch (type){
                case "first":
                  return "首页";
                case "prev":
                  return "上一页";
                case "next":
                  return "下一页";
                case "last":
                  return "尾页";

                case "page":
                  return page;
              }
          },

          tooltipTitles:function (type,page,current) {
            switch (type){
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "前往"+page+"页";
            }
          },

          useBootstrapTooltip:true,

          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render()
          }

        })

      }
    })
  }


//点击添加按钮模态框显示

  $('.btn').click(function () {
      $('#addModal').modal('show')
      $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'get',
        data:{
          page:1,
          pageSize:100,
        },
        success:function (info) {
          //console.log(info);
          var htmlsters=template('tml',info);
          $('.dropdown-menu').html(htmlsters)
        }
      })
  })


//添加二级分类名称

  $('.dropdown-menu').on("click",'a',function () {

    var id=$(this).attr('data-id');
    $('[name="brandId"]').val(id)
    var txt=$(this).text();
    $('.dropdownTxt').text(txt)
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  })




  //上传图片

  $('#fileUplode').fileupload({
    dataType:'json',
    done:function (e,data) {
      //console.log(data.result);
      var picUrl=data.result.picAddr;
      picArr.unshift(data.result);
      $('#imgBox').prepend('<img src="' + picUrl + '" width="100" height="100">')

      if(picArr.length>3){
        picArr.pop();
        $('#imgBox img:last-of-type').remove()
      }

      if(picArr.length===3){
        $('#form').data('bootstrapValidator').updateStatus("picStatus","VALID")
      }

    }

  })


  //表单校验

  $('#form').bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'商品库存必须是非零开头的数字'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },

          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message: '商品尺码必须是 xx-xx 的格式, 例如 32-40'
          }
        }
      },

      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          },
        }
      },

      price:{
        validators:{
          notEmpty:{
            message:'请输入商品现价'
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:'请输入三张图片'
          }
        }
      },
    },

  })


$('#form').on("success.form.bv",function (e) {
    e.preventDefault();

    //console.log($('#form').serialize())

    var moreStr=$('#form').serialize();
    moreStr+="&picAdd1="+picArr[0].picAddr + "&picName1=" +picArr[0].picName;
    moreStr+="&picAdd2="+picArr[1].picAddr + "&picName2=" +picArr[1].picName;
    moreStr+="&picAdd3="+picArr[2].picAddr + "&picName3=" +picArr[2].picName;

    $.ajax({

      url:'/product/addProduct',
      data:moreStr,
      type:'post',
      success:function (info) {
        //console.log(info);
        if(info.success){
          $('#addModal').modal('hide');
          $("#form").data('bootstrapValidator').resetForm(true);
          currentPage=1
          render();
          $('.dropdownTxt').text("请选择二级分类");
          $("#imgBox img").remove();
        }

      }

    })


})


})