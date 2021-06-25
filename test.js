import { dish } from './模块化测试/text1 copy.js';

document.querySelector('button').addEventListener('click', function() {
    dish.user(['Bane', 'Dog', 'Mao'], function() {
        let mao = new dish.Mao;
        let Bane = new dish.Bane;
        mao.setAttur('123', '456');
        document.body.innerHTML += 'mao=>' + mao + ' Bane =>' + Bane
    })
})

dish.user(['Bane', 'Dog', 'Mao'], function() {
    let mao = new dish.Mao;
    let Bane = new dish.Bane;
    mao.setAttur('123', '456');
    console.log(mao, Bane);
})