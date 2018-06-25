/**
 * Created by hong on 2018/6/25.
 */
$(function () {



$("#form").bootstrapValidator({

  feedbackIcons:{
    valid: 'glyphicon glyphicon-ok',   // 校验成功
    invalid: 'glyphicon glyphicon-remove', // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中
  },


  fields:{
    username:{
      validators:{
        notEmpty:{
          message:"用户名不能为空"
        },
        stringLength:{
          min:2,
          max:6,
          message:"用户名必须是2-6位"
        },
        callback:{
          message:"用户名不存在"
        }

      }
    },

    password:{
      validators:{
        notEmpty:{
          message:"密码不能为空"
        },
        stringLength:{
          min:6,
          max:12,
          message:"密码长度必须6-12位"
        },
        callback:{
          message:"密码错误"
        }

      }
    },

  }

})

$("#form").on("success.form.bv",function (e) {

  e.preventDefault();
  console.log(" 阻止了提交")
  $.ajax({
    type:"post",
    dateType:"json",
    data:$("#form").serialize(),
    url:"/employee/employeeLogin",
    success:function (info) {
      console.log(info);
      if(info.success){
        location.href="index.html";
      }
      if(info.error===1001){
        $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
      }
      if(info.error===1000){
        $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
      }
    }

  })
  
})

//点击重置按钮时
  $('[type="reset"]').click(function () {
    //重置表单样式
    $('#form').data("bootstrapValidator").resetForm();
  })

})