let module = (function() {
    const moduleList = {};

    function define(name, modules, action) {
        let modue = []
        modules.forEach((m, i) => {
            modue[i] = moduleList[m]
        })

        moduleList[name] = action.apply(null, modue);
    }

    return {
        define
    };
})()

module.define('hd', [], function() {
    return {
        first(arr) {
            return arr[0];
        },
        max(arr) {
            return arr.sort((a, b) => b - a)[0];
        }
    }
})

module.define('sh', [], function() {
    return {
        name: "小明",
        age: '19'
    }
});

module.define('selec', [], function() {
    return {
        Min(arr) {
            return arr.sort((a, b) => !b - a)[0];
        }
    }
})


module.define('lesson', ['hd', 'sh', 'selec'], function(hd, sh, selec) {
    let data = [1, 23, 6, 9];
    let min = selec.Min(data);
})

export { module };