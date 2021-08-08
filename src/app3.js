import './app3.css'
import $ from 'jquery'

//  引入html内容
const html = `
<section id="app3">
    <div class="square"></div>
</section>
`;

//  放到html文件
const $element = $(html).appendTo($('body > .page'));

const $square = $('#app3 .square');
const localKey = 'app3.active';

//  获取当前的状态
const active = localStorage.getItem(localKey) === 'yes';  //  默认undefined ,有true 和 false


/*  等价于下面的代码
if (active) {
    $square.addClass('active');
}
else {
    $square.removeClass('active');
}
*/
//  如果active为true，则添加active
$square.toggleClass('active', active);

$square.on('click', () => {
    //  如果没有，就加上active，如果有就删除
    if ($square.hasClass('active')) {
        $square.removeClass('active');
        localStorage.setItem('app3.active', 'no');
    }
    else {
        $square.addClass('active');
        localStorage.setItem('app3.active', 'yes');
    }
})