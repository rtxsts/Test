function ck() {
    let box = document.querySelector('.back-button');

    box.addEventListener('click', function() {
        box.innerHTML = '成功进入';
        box.style.background = 'rgb(255, 94, 0)'
    })
}
ck()