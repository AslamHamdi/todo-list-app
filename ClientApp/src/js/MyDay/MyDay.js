import { createApp } from 'vue/dist/vue.esm-bundler'
// import 'flowbite'
// import Datepicker from 'flowbite/dist/datepicker'
const _ = require('lodash')
const $ = require('jquery')

globalThis.__VUE_OPTIONS_API__ = true;
globalThis.__VUE_PROD_DEVTOOLS__ = false;

const noTaskTemplate = {
    template: "#noTask",
    mounted(){
        //console.log("DASHBOARD APP")
    }
}

const haveTaskTemplate = {
    template: "#haveTask",
    mounted(){
        //console.log("DASHBOARD APP")
    }
}

const myDayApp = createApp({
    data(){
        return{
            buttonNow: "add"
        }
    },
    mounted(){
        console.log("MY DAY APP")
    },
    methods:{
        onClickButton(event){
            this.buttonNow = event
        }   
    },
    computed: {
        componentNow(){
            let component = "no-task"
            if(this.buttonNow == "add"){
                component = "have-task"
            }
            return component
        }
    },
    components: {
        "no-task": noTaskTemplate,
        "have-task": haveTaskTemplate
    }
}).mount("#myDayApp")

export default myDayApp;