import './app1.css';

//  引入jquery的新办法:
//  1. yarn  add jquery
//  2.删除新增的三个文件
//  3.yarn init -y
//  4.再次运行 yarn add jquery
import $ from 'jquery'  // $ 是jquery的别名
//console.log($)

//
const  eventBus = $(window);

//  数据相关的放到m
const m = {
    //  初始化数据
    data: {
        n: parseInt(localStorage.getItem("n"))
    },
    create(){},
    delete(){},
    update(data){
        //  data的值一一赋值到m.data
        Object.assign(m.data,data);
        //  触发事件
        eventBus.trigger('m:updated');
        //  把m.data.n 放到 n里
        localStorage.setItem('n',m.data.n);
    },
    get(){}

};

//  视图相关的放到v
const v = {
    el: null,
    //  html内容
    html: `
    <!--   实现加减乘除  -->
    <div>
        <div class="output">
            <span id="number">{{n}}</span>
        </div>
        <div class="actions">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">×2</button>
            <button id="divide2">÷2</button>
        </div>
    </div>
    `,
    //  初始化
    init(container){
        v.el = $(container);
    },
    render(n) {
        //  如果当前html内容存在，则清空
        if(v.el.children.length !== 0)
            v.el.empty();
        //  直接替换当前html内容
        $(v.html.replace('{{n}}',n))
            .appendTo(v.el);
    }
}

//  其他内容放到c
const c = {
    //  传一个参数，说明渲染到页面的位置
    init(container) {
        v.init(container);
        v.render(m.data.n);
        c.autoBindEvent();
        //  绑定更新事件，更新时渲染页面
        eventBus.on('m:updated',()=>{
            v.render(m.data.n);
        });
        },

    //  把事件组织成哈希表
    events:{
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'div',
    },
    add(){
        m.update({n:m.data.n + 1});
    },
    minus(){
        m.update({n:m.data.n - 1});
    },
    mul(){
        m.update({n:m.data.n * 2});
    },
    div(){
        m.update({n:m.data.n / 2});
    },
    autoBindEvent(){
        //  遍历events
        for (let key in c.events){
            const value = c[c.events[key]];
            const spaceIndex = key.indexOf(' ');
            // part1 => click , 返回一个子数组,从0到空格的值
            const part1 = key.slice(0,spaceIndex);
            //  part2 => add1 / minus1 / mul2 / divide2
            const part2 = key.slice(spaceIndex + 1);  //  从空格后第一个字符到最后
            v.el.on(part1,part2,value);
        }
    }
}

//  为了得到container，把c作为接口暴露
export default c;







