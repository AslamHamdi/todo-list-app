import Vue from 'vue';
import vuetify from '/plugins/vuetify'

const _ = require('lodash')
const $ = require('jquery')

Vue.use(vuetify)

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

const importantApp = new Vue({
    el: "#importantApp",
    vuetify,
    mounted(){
        console.log("IMPORTANT APP")
    },
    data(){
        return{
            buttonNow: "add",
            date: undefined,
            menuDate: false,
            modalDate: false,
            menuDate2: false,

            time: null,
            menuTime: false,
            modalTime: false,
        }
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
        "have-task": haveTaskTemplate,
    }
})