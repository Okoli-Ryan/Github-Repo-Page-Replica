var display = false;
document.querySelector('.header-bottom').style.display = display ? 'flex' : 'none'


const menu = document.querySelector('#menu')
menu.onclick = function () {
    display = !display;
    document.querySelector('.header-bottom').style.display = display ? 'flex' : 'none'
}