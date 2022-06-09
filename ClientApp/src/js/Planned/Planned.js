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
    data(){
        return{
            openMenu: false,
        }
    },
    mounted(){
        //console.log("DASHBOARD APP")
        let vApp = document.querySelector(".v-application--wrap")
        vApp.classList.remove("v-application--wrap")
        vApp.classList.add("v-application")
    },
    methods:{
        openDropdown(){
            document.getElementById("dropdownMenu").classList.toggle("show");
            
            // Close the dropdown if the user clicks outside of it
            window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
                }
            }
            }
        }, 
    }
}

const plannedApp = new Vue({
    el: "#plannedApp",
    vuetify,
    mounted(){
        console.log("PLANNED APP")
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
        },  
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