export class Banner {
    constructor() {
        this.box = document.querySelector('.write-banner');
        this.ul = document.querySelector('.write-banner>ul');
        this.li = document.querySelectorAll('.write-banner>ul>li');
        this.width = this.box.parentNode.offsetWidth;
        this.height = this.box.parentNode.offsetHeight

        //定时器
        this.tiem;
        //切换效果时间
        this.cutTime = 500;

        this.index = 1;
        //防止用户多次点击导致卡顿
        this.flab = true;
        //切换时间
        this.switchtime = 3000;

        //选中效果 fadein
        this.effect = '';
        //这个函数是用来判断那个效果的
        this.hanshu;
    }


    //传入参数 height 是高度 width 是宽度 automatic 是否自动轮播 switchtime 是切换时间就是回调函数切换时间 scroll 滚动效果 fadein 淡入淡出效果
    parame({ height = '100%', width = '100%', automatic = true, switchtime = 3000, isaor = 'touchdisplay', effect = 'scroll' } = {}) {
        if (height != '100%') {
            height = height.replace('px', '');
            this.height = height;
        };


        if (width != '100%') {
            width = width.replace('px', '');
            this.width = width;
        };

        this.switchtime = switchtime;



        //判断是否要启用淡入淡出效果

        if (effect == 'fadein') {
            this.index = 0;
            this.effect = 'fadein';
            this.setboxWdith();

            this.hanshu = this.setFadein;
        } else {
            //创建节点的
            this.addNode();

            this.hanshu = this.landscapeBane;
        }

        //这个是是左右2边按钮是否显示
        if (isaor != 'hide') {
            //isaor = auto 自动 isaor = hide 隐藏 isaor = touchdisplay //隐藏

            //左右2边箭头事件这个是创建
            this.arrowButton(isaor);
            //左右2边箭头事件这个是
            this.arrowClick();
        }



        //生成轮播图按钮
        this.generateButton();

        //轮播图按钮切换事件
        this.buttonClick();

        //当我们把鼠标放到这个元素上面的时候就会取消轮播移开后就继续轮播
        this.stopBy(isaor);
        //是否自动轮播
        if (automatic == true) {
            //自动轮播
            this.rotate();
        }

    }

    //自动轮播
    rotate() {
        this.tiem = setInterval(() => {
            this.index++;
            this.hanshu(this.index);
        }, this.switchtime);
    }

    //自动生成节点这个是轮播的时候需要
    addNode() {
        //由于滚动轮播图需要第一个节点复制和最后一个点击复制
        //第一个节点
        let li = this.li[0].cloneNode(true);
        //第最后一个节点
        let chili = this.li[this.li.length - 1].cloneNode(true);
        this.ul.appendChild(li);
        this.ul.insertBefore(chili, this.li[0]);
        this.li = document.querySelectorAll('.write-banner>ul>li');
        //设置ul和里的宽高
        this.setUlWid();
    }

    //设置ul 和 li 的宽高
    setUlWid() {
        this.ul.style.width = (this.width * this.li.length) + 'px';
        this.ul.style.height = this.height
        this.box.style.width = this.width + 'px';
        this.box.style.height = this.height + 'px'
        this.li.forEach((tiem) => {
            tiem.style.width = this.width + 'px';
        })
        this.ul.style.transform = `translate3d(${-this.width*1}px,0,0)`;
    }


    //生成轮播图按钮
    generateButton() {
        //这里由于淡入淡出效果的参数不一样
        let num = this.effect == 'fadein' ? 0 : 2
        let ide = this.effect == 'fadein' ? num : num - 1
            //创建按钮节点
        let div = document.createElement('div');
        div.className = 'write-banner-button';

        for (let i = 0; i < this.li.length - num; i++) {
            let _div = document.createElement('div');
            i == 0 ? _div.className = 'write-banner-button-div select' : _div.className = 'write-banner-button-div';
            _div.setAttribute('write-num', i + ide);
            div.appendChild(_div);
        }
        this.box.appendChild(div);
    }


    //按钮样式切换
    buttonSwitching(num) {
        //这里由于淡入淡出效果的参数不一样
        let digital = this.effect == 'fadein' ? 0 : 1;
        let sle = this.effect == 'fadein' ? -1 : 0;
        //找到按钮
        let button = document.querySelectorAll('.write-banner-button-div');
        //找到选中的按钮
        let seleButton = document.querySelector('.write-banner-button-div.select');
        //重置选中的按钮
        seleButton.classList.remove('select');
        if (num >= this.li.length - digital) {
            button[0].classList.add('select');
        } else if (num <= sle) {
            button[button.length - 1].classList.add('select')
        } else {
            button[num - digital].classList.add('select');
        }
    }

    //按钮点击切换轮播图事件
    buttonClick() {
        let _this = this
        let button = document.querySelector('.write-banner-button');
        button.addEventListener('click', function(e) {
            e = e || window.e;
            let tar = e.target;
            let str = /\bwrite-banner-button-div\b/;
            if (str.test(tar.className)) {
                let side = tar.getAttribute('write-num');
                _this.index = side;
                _this.hanshu(side);

            }
        })
    }


    //横向滚动的轮播图
    landscapeBane(index) {
        //切换按钮
        this.buttonSwitching(index);
        if (index >= this.li.length - 1) {
            setTimeout(() => {
                this.index = 1;
                //切换样式
                setStyle.call(this)
            }, this.cutTime);
            this.ul.style.transitionDuration = `${this.cutTime/1000}s`;
        } else if (index <= 0) {
            setTimeout(() => {
                this.index = this.li.length - 2;
                //切换样式
                setStyle.call(this)
            }, this.cutTime);
            this.ul.style.transitionDuration = `${this.cutTime/1000}s`;
        } else {
            this.ul.style.transitionDuration = `${this.cutTime/1000}s`;
        }
        this.ul.style.transform = `translate3d(${-this.width*index}px,0,0)`;

        //设置样式
        function setStyle() {
            this.ul.style.transitionDuration = '0s';
            this.ul.style.transform = `translate3d(${-this.width*this.index}px,0,0)`;
        }
    }


    //左右按钮
    arrowButton(str) {
        let div = document.createElement('div');
        div.innerHTML = '<';
        let _div = document.createElement('div');
        _div.innerHTML = '>';

        div.className = 'write-button-arrowleft';
        _div.className = 'write-button-arrowright';

        if (str != 'auto') {
            div.classList.add('no');
            _div.classList.add('no');
        }



        this.box.appendChild(div);
        this.box.appendChild(_div);

    }

    //左右按钮点击事件
    arrowClick() {
        let arrowletf = document.querySelector('.write-button-arrowleft');
        let arrowright = document.querySelector('.write-button-arrowright');
        let _this = this


        arrowletf.addEventListener('click', function() {
            if (!_this.flab) return;
            _this.index--;
            //防止用户连续点击出现页面错乱问题
            clike()
            _this.hanshu(_this.index);
        })


        arrowright.addEventListener('click', function() {
            if (!_this.flab) return;
            _this.index++;
            clike();
            _this.hanshu(_this.index);
        })

        //防止用户多次点击导致卡顿
        function clike() {
            _this.flab = false;
            setTimeout(() => {
                _this.flab = true;
            }, _this.cutTime)
        }
    }


    //这个是把鼠标放到改元素是停止轮播图轮播
    stopBy(str) {
        //这个str 接收的是我们一个是否显示箭头按钮
        let left = document.querySelector('.write-button-arrowleft')
        let right = document.querySelector('.write-button-arrowright');
        //事件移出去后
        this.box.addEventListener('mouseleave', () => {
            this.rotate();
            if (str != 'touchdisplay') return;

            //隐藏箭头按钮
            hideAutow()
        })

        //事件移进去之后取消定时器
        this.box.addEventListener('mouseover', () => {
            clearInterval(this.tiem);
            if (str != 'touchdisplay') return

            //显示箭头按钮
            disAutow()

        })


        //显示箭头按钮
        function disAutow() {
            left.classList.remove('no');
            right.classList.remove('no');
        }

        //隐藏箭头按钮

        function hideAutow() {
            left.classList.add('no');
            right.classList.add('no');
        }
    }


    //这个是设置box的参数，淡出淡入的效果

    setboxWdith() {
        this.ul.style.width = (this.width * this.li.length) + 'px';
        this.ul.style.height = this.height
        this.box.style.width = this.width + 'px';
        this.box.style.height = this.height + 'px'
        this.ul.style.position = 'relative'

        this.li.forEach((tiem, i) => {
            tiem.style.width = this.width + 'px';
            i == 0 ? tiem.className = 'write-banner-fian select' : tiem.className = 'write-banner-fian'
            tiem.style.zIndex = (-i - 1);
            tiem.style.transitionDuration = `${this.cutTime/1000}s`;
        });
    }


    //设置淡入淡出动画

    setFadein(index) {
        //选中的节点
        let sel = document.querySelector('.write-banner-fian.select');
        //按钮事件
        this.buttonSwitching(index);
        if (index >= this.li.length) {
            this.index = 0;
        } else if (index < 0) {
            this.index = this.li.length - 1;
        }

        sel.classList.remove('select');

        this.li[this.index].classList.add('select');
    }

    //自动隐藏




}