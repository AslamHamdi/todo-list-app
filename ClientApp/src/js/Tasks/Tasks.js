import Vue from 'vue';
import vuetify from '/Config/vuetify'

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

const tasksApp = new Vue({
    el: "#tasksApp",
    vuetify,
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
    mounted(){
        console.log("TASKS APP")
        let vApp = document.querySelector(".v-application--wrap")
        vApp.classList.remove("v-application--wrap")
        vApp.classList.add("v-application")
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

export default tasksApp;