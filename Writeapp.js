class Write {
    constructor() {

    }

    //组件的名字就是是一个数组 ,还有一个回调函数
    que(moduleName, Callback) {
        let tiem;
        let str = Object.prototype.toString.call(moduleName);

        if (str == '[object Array]') {
            moduleName.forEach(tiem => {
                this.loadModule(tiem);
            })
        } else if (str == '[object String]') {
            this.loadModule(moduleName);
        }


        //监听浏览器文档是否加载完成

        window.onload = function() {
            setTimeout(() => {
                Callback();
            }, 10)
        }
    }

    //这个是也是可以引入别人的模块
    loadModule(name, url) {
        url ? url : url = `./module/${name}.js`;
        import (url).then(value => {
            this[name] = new value[name];
        })
    }
}


let write = new Write();

write.que('Banner', function() {
    write.Banner.parame({
        width: '500px',
        height: '300px',
        switchtime: 3000,
    })
})
