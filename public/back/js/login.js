/**
 * Created by hong on 2018/6/25.
 */
$(function () {

$("#form").bootstrapValidator({
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
        }

      }
    },

  }

})


})