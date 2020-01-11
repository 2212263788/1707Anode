'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async registry() {
    let {ctx} = this;
    let {name,pwd} = ctx.request.body;
    //判断参数是否为空
    if(!name || !pwd){
        ctx.body = {
            code:3,
            mes:'缺少参数'
        }
        return;
    }

    // 判断当前用户名是否注册过
    let user = await ctx.service.user.user.getuser(name);
    if(user.length !== 0){ //有这个人
        ctx.body = {
            code:2,
            mes:'该用户名已经注册过了'
        }
        return;
    }

    let res = await ctx.service.user.user.registry(name,ctx.helper.help(pwd));
    if(res.affectedRows == 1){
        ctx.body = {
            code:1,
            mes:'注册成功'
        }
    } else {
        ctx.body = {
            code:0,
            mes:'注册失败'
        }
    }
  }
}

module.exports = UserController;
