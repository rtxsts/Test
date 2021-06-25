 class Dish {
     constructor() {
         this.Dish = {

         }
     }


     user(name, callback) {
         name.forEach(value => {
             this.loadModule(value);
         });


         setTimeout(() => {
             callback.call(this)
         },200)
     }

     loadModule(name) {
         import (`./${name}.js`).then(value => {
             this[name] = value[name];
         })
     }
 }


 export let dish = new Dish();
