import axios from 'axios';
import Vue from 'vue';
import vuetify from '/Config/vuetify'
import * as __functionCustom from '../FunctionCustom';

Vue.use(vuetify)

const customLoader = {
    template: "#customLoader",
    mounted(){

    }
}

const loginApp = new Vue({
    el: "#loginApp",
    vuetify,
    mounted(){

    },
    data () {
        return {
            test: "",
            dialog: false,
            registerForm: {
                model: {
                    email: "",
                    firstName: "",
                    lastName: "",
                    userName: "",
                    passWord: ""
                }
            },
            loginForm: {
                model: {
                    email: "",
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
            }else{
                let dataToPost = this.registerForm.model
                try {
                    axios.post('/auth/RegisterUser', {
                        data: dataToPost
                    }).then(resp => {
                        let loaderEle = this.$refs.loaderDiv
                        this.registerForm.model.email = ""
                        this.registerForm.model.firstName = ""
                        this.registerForm.model.lastName = ""
                        this.registerForm.model.userName = ""
                        this.registerForm.model.passWord = ""
                        this.dialog = false
                        loaderEle.classList.remove("loader-class")
                        setTimeout(() => {
                            loaderEle.classList.add("loader-class")
                            __functionCustom.showSuccessMessage("Sucessfully registered. Please login to continue")
                        }, 8000)
                    }).catch(err => {
                        __functionCustom.showErrorMsg(err.response.data.data)
                    })
                } catch (err) {
                    __functionCustom.showErrorMsg(err)
                } 
            }
        },
        loginLocal(){
            let emptyField = []
            Object.entries(this.loginForm.model).forEach((o, i) => {
                if(o[1] == ""){
                    emptyField.push(o[0])
                }else{}
            })
            if(emptyField.length > 0){
                //do nothing
            }else{
                let dataToPost = this.loginForm.model
                try {
                    axios.post('/loginLocal', {
                        email: this.loginForm.model.email,
                        password: this.loginForm.model.passWord
                    }).then(resp => {
                        window.location.href = "/";
                    }).catch(err => {
                        __functionCustom.showErrorMsg("Email or password might be incorrect")
                    })
                } catch (error) {
                    __functionCustom.showErrorMsg("There are an error during login. Please contact developer")
                }
            }
            
        }
    },
    components: {
        "custom-loader": customLoader,
    }
})