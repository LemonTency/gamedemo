// const Index = require("../models/index");


class IndexController{
    constructor(){

    }
    actionIndex(){
        //SSR 
        return async(ctx, next) => {
            // const index = new Index();
            // const result = await index.getData();
            //ctx.body = 'hello 我是zty'
            //render(渲染)index.html这个模板
            // ctx.body = await ctx.render("index",{
            //     data:result.data
            // })
            ctx.body = "hello world"
        }
    }
    actionAdd(){
        //SSR 
        return async(ctx, next) => {
            // ctx.body = await ctx.render("add")
            ctx.body = "hello world"
        }
    }
}

module.exports = IndexController;