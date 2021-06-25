export class Dog {
    constructor({ name = '哈士奇', age = 5, color = '黑色' }) {
        this.name = name;
        this.age = age;
        this.color = color;
    }


    doginformation() {
        console.log(`他的名字叫 => ${this.name} ,他的年龄是 => ${this.age},他的毛色是 => ${this.color}`);
    }
}