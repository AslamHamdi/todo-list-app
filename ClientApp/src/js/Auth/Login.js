import axios from 'axios';
import Vue from 'vue';
import vuetify from '/Config/vuetify'
import * as __functionCustom from '../FunctionCustom';

Vue.use(vuetify)

const loginApp = new Vue({
    el: "#loginApp",
    vuetify,
    mounted(){
        console.log("LOGIN APP")
    },
    data () {
        return {
            test: "",
            dialog: true,
            registerForm :{
                model: {
                    email: "",
                    firstName: "",
                    lastName: "",
                    userName: "",
                    passWord: ""
                }
            }
        }
      },
    methods:{
        registerUser(){
            let emptyField = []
            Object.entries(this.registerForm.model).forEach((o, i) => {
                if(o[1] == ""){
                    emptyField.push(o[0])
                }else{}
            })
            if(emptyField.length > 0){
                emptyField.forEach((o, i) => {
                    __functionCustom.showWarnMessage(`Please fill in ${o} field before submitting`)
                })
            }
        }
    }
})