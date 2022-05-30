// import '@popperjs/core';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import { createApp, h } from 'vue/dist/vue.esm-bundler'
//import myDayApp from '../MyDay/MyDay';
//import myDayApp from '../MyDay/MyDay';
//import myDayApp from '../../js/MyDay/MyDay'
//import plannedApp from '../Planned/Planned';
const _ = require('lodash')
const $ = require('jquery')

globalThis.__VUE_OPTIONS_API__ = true;
globalThis.__VUE_PROD_DEVTOOLS__ = false;

var hashVal = window.location.hash.substring(1);
//$('#mainContent').load('/Views/Dashboard/dashboard.html');
//$('#mainContentApp2').load(`/Views/MyDay/MyDay.html`);

const dummy = {
    template: "#dummy",
    mounted(){
        console.log("dummy")
    }
}

const layoutApp = createApp({
    created(){
    },
    mounted(){
        this.onInitialLoadPage()
    },
    data(){
        return{
            //Sidebar default config
            isSidebarOpen: false,
            sidebarClass: "w-20",
            whichHeaderIcon: ["", "hidden"],
            showNavText: ["", "hidden"],
            currentHash: "",
            isLoad: false,
        }
    },
    methods:{
        onInitialLoadPage(){
            if(!window.location.hash){
                window.location.hash = "MyDay"
                this.currentHash = "MyDay"
                this.onChangeNav(this.currentHash)
            }else{
                this.currentHash = window.location.hash.substring(1);
                this.onChangeNav(this.currentHash)
            }
        },
        expandSidebar(){
            if(!this.isSidebarOpen){ //Open side bar
                this.isSidebarOpen = true;
                this.sidebarClass = "w-60"
                this.whichHeaderIcon = ["hidden", ""]
                setTimeout(() => {
                    this.showNavText = ["hidden", ""]
                }, 300)
            }else{ //Close side bar
                this.isSidebarOpen = false;
                this.sidebarClass = "w-20"
                this.whichHeaderIcon = ["", "hidden"]
                this.showNavText = ["", "hidden"]
            }
        },
        onChangeNav(hash){
            this.isLoad = false
            window.location.hash = hash
            this.currentHash = hash
            if(this.currentHash == "MyDay"){
                $('#mainContentApp').load(`/Views/MyDay/${this.currentHash}.html`);
                // myDayApp.unmount()
                $.getScript(`/dist/js/MyDay/${this.currentHash}.entry.js`)
            }else if(this.currentHash == "Important"){
                $('#mainContentApp').load(`/Views/Important/${this.currentHash}.html`);
                //$.getScript(`/dist/js/Important/${this.currentHash}.entry.js`)
            }else if(this.currentHash == "Planned"){
                $('#mainContentApp').load(`/Views/Planned/${this.currentHash}.html`);
                $.getScript(`/dist/js/Planned/${this.currentHash}.entry.js`)
            }
            setTimeout(() => {
                this.isLoad = true
            }, 200)
        }
    },
    computed:{
        componentNow(){
            let component = "dummy-dummy"
            if(this.currentHash == "MyDay" || this.currentHash == ""){
                console.log("HERE")
                component = "dashboard-app"
            }else if(this.currentHash == "Planned"){
                component = "planned-app"
            }
            return component
        }
    },
    components:{
        "dummy-dummy": dummy,
        //"dashboard-app": myDayApp,
        //"planned-app": plannedApp,
    }
}).mount("#layoutApp")







