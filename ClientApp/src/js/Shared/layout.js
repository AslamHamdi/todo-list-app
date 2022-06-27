import Vue from 'vue'
import vuetify from '/Config/vuetify'
const _ = require('lodash')
const $ = require('jquery')
import * as __functionCustom from '../FunctionCustom';
import axios from 'axios';

var hashVal = window.location.hash.substring(1);
Vue.use(vuetify)

const layoutApp = new Vue({
    el: "#layoutApp",
    vuetify,
    created(){
    },
    mounted(){
        this.onInitialLoadPage()
    },
    data(){
        return{
            //Sidebar default config
            openUserMenu: true,
            isSidebarOpen: false,
            sidebarClass: "tw-w-20",
            whichHeaderIcon: ["", "tw-hidden"],
            showNavText: ["", "tw-hidden"],
            currentHash: "",
            isLoad: false,
            test: "test",
            userProfile: ""
        }
    },
    methods:{
        openUserDropdown(){
            document.getElementById("userDropdownMenu").classList.toggle("nusuk");
            //Close the dropdown if the user clicks outside of it
            window.onclick = function(event) {
                if (!event.target.matches('.userdropbtn')) {
                    var dropdowns = document.querySelector("#userDropdownMenu")
                    if (!dropdowns.classList.contains('nusuk')) {
                        dropdowns.classList.add('nusuk');
                    }else{}
                }
            }
        },
        ping(){
            try {
                axios.post('ping', {
                }).then(resp => {
                    this.userProfile = resp.data.user
                }).catch(err => {
                    __functionCustom.showErrorMsg("ERROR: ", err)
                })
            } catch (err) {
                __functionCustom.showErrorMsg(err)
            }
        },
        onInitialLoadPage(){
            if(!window.location.hash){
                window.location.hash = "MyDay"
                this.currentHash = "MyDay"
                this.onChangeNav(this.currentHash)
            }else{
                this.currentHash = window.location.hash.substring(1);
                this.onChangeNav(this.currentHash)
            }
            this.ping()
        },
        expandSidebar(){
            if(!this.isSidebarOpen){ //Open side bar
                this.isSidebarOpen = true;
                this.sidebarClass = "tw-w-60"
                this.whichHeaderIcon = ["tw-hidden", ""]
                setTimeout(() => {
                    this.showNavText = ["tw-hidden", ""]
                }, 300)
            }else{ //Close side bar
                this.isSidebarOpen = false;
                this.sidebarClass = "tw-w-20"
                this.whichHeaderIcon = ["", "tw-hidden"]
                this.showNavText = ["", "tw-hidden"]
            }
        },
        onChangeNav(hash){
            if(hash != this.currentHash || this.isLoad == false){
                this.isLoad = false
                window.location.hash = hash
                this.currentHash = hash
                if(this.currentHash == "MyDay"){
                    $('#mainContentApp').load(`/Views/MyDay/${this.currentHash}.html`, function(responseTxt, statusTxt, xhr){
                        $('#mainContentApp').html(responseTxt);
                     });
                    var script = document.createElement('script');
                    script.src = `/dist/js/MyDay/${this.currentHash}.entry.js`;
                    script.defer = "defer"
                    document.body.appendChild(script);
                }else if(this.currentHash == "Important"){
                    $('#mainContentApp').load(`/Views/Important/${this.currentHash}.html`, function(responseTxt, statusTxt, xhr){
                        $('#mainContentApp').html(responseTxt);
                     });
                    var script = document.createElement('script');
                    script.src = `/dist/js/Important/${this.currentHash}.entry.js`;
                    script.defer = "defer"
                    document.body.appendChild(script);
                }else if(this.currentHash == "Planned"){
                    $('#mainContentApp').load(`/Views/Planned/${this.currentHash}.html`, function(responseTxt, statusTxt, xhr){
                        $('#mainContentApp').html(responseTxt);
                     });
                    var script = document.createElement('script');
                    script.src = `/dist/js/Planned/${this.currentHash}.entry.js`;
                    script.defer = "defer"
                    document.body.appendChild(script);
                }else if(this.currentHash == "Tasks"){
                    $('#mainContentApp').load(`/Views/Tasks/${this.currentHash}.html`, function(responseTxt, statusTxt, xhr){
                        $('#mainContentApp').html(responseTxt);
                     });
                    var script = document.createElement('script');
                    script.src = `/dist/js/Tasks/${this.currentHash}.entry.js`;
                    script.defer = "defer"
                    document.body.appendChild(script);
                }
                setTimeout(() => {
                    this.isLoad = true
                }, 200)
            }
        }
    },
    computed:{

    },
})







