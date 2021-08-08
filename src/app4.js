import './app4.css'
import $ from 'jquery'

//  引入html内容
const html = `
<section id="app4">
    <div class="circle"></div>
</section>`;

//  放到html文件
const $element = $(html).appendTo($('body > .page'));

const $Circle = $('#app4 .circle');


//  当鼠标在circle区域内添加active
$Circle.on('mouseenter', () => {
    $Circle.addClass('active');
}).on('mouseleave', () => {
    $Circle.removeClass('active');
})