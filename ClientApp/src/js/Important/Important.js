import axios from 'axios';
import Vue from 'vue';
import vuetify from '/Config/vuetify'
import * as __functionCustom from '../FunctionCustom';

Vue.use(vuetify)

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];

const noTaskTemplate = {
    template: "#noTask",
    mounted(){
       
    }
}

const haveTaskTemplate = {
    template: "#haveTask",
    mounted(){
        
    },
    data(){
        return{

        }
    },
    props:{
        allImportantTasks: ""
    },
    methods:{
        removeImportantTask(taskId){
            this.$emit('remove-important-task', taskId)
        },
        removeCompletedTask(taskId){
            this.$emit('remove-completed-task', taskId)
        }
    },
    computed: {
        allImportantTasksComp(){
            let data = this.allImportantTasks
            if(data != ""){
                this.$emit('getAllImportantTasks')
                data.forEach((o, i) => {
                    let time = __functionCustom.tConvert(o.TaskTime)
                    let fullDate = new Date(o.TaskDate)
                    let day = days[ fullDate.getDay() ];
                    let dayNum = fullDate.getUTCDate()
                    let month = months[ fullDate.getMonth() ];
                    o.dateTime = `${day}, ${dayNum + 1} ${month}, ${time}`
                    o.IsImportantClass = "is-important"
                });
            }else{
                console.log("NO DATA")
            }
            return data
        }
    }
}

const importantApp = new Vue({
    el: "#importantApp",
    vuetify,
    mounted(){
        let vApp = document.querySelector(".v-application--wrap")
        vApp.classList.remove("v-application--wrap")
        vApp.classList.add("v-application")
        this.onInitialLoadPage()
    },
    data(){
        return{
            newTask: {
                model:{
                    task: "",
                    date: undefined,
                    time: null,
                }
            },
            buttonNow: "add",
            date: undefined,
            menuDate: false,
            modalDate: false,
            menuDate2: false,

            time: null,
            menuTime: false,
            modalTime: false,
            allImportantTasks: "",
        }
    },
    methods:{
        onInitialLoadPage(){
            this.getImportantTasks()
        },
        dataSetter(data, variale){
            this.allImportantTasks = data
        },
        getImportantTasks(){
            axios.get('/api/getAllImportantTasks')
                .then(resp => {
                    let result = resp.data.data[0][0];
                    this.dataSetter(resp.data.data[0][0])
                })
                .catch(err => {
                    __functionCustom.showErrorMsg("Error in fetching data from server")
                })
        },
        addNewTask(){
            let dataToPost = {}
            let emptyField = []
            Object.entries(this.newTask.model).forEach((o) => {
                if(o[1] == null || o[1] == 'undefined' || o[1] == undefined || o[1] == ''){
                    emptyField.push(o[0])
                }else{}
            })
            if(emptyField.length > 0){
                emptyField.forEach((o) =>{
                    __functionCustom.showWarnMessage(`please fill in ${o} field before submitting`)
                })
            }else{
                this.newTask.model.isImportant = 1
                dataToPost.data = this.newTask.model
                try {
                    axios.post('/api/addNewtask', {
                        data: dataToPost
                    }).then(resp => {
                        __functionCustom.showSuccessMessage("Sucessfully add new task")
                        this.newTask.model.task = ""
                        this.newTask.model.date = undefined
                        this.newTask.model.time = null
                        this.getImportantTasks()
                    }).catch(err => {
                        __functionCustom.showErrorMsg("Error in updating data into server")
                    })
                } catch (err) {
                    __functionCustom.showErrorMsg(err)
                } 
            }
        },
        removeImportantTask(taskId){
            let dataToPost = { taskId: taskId, isImportant: 1 }
            let taskNow = ""
            let bellSound = new Audio('/assets/important.mp3')
            this.allImportantTasks.forEach((o, i) => {
                if(o.TaskId == taskId){
                    taskNow = o
                }
            })
            if(taskNow.IsImportant == 1){
                dataToPost.isImportant = null
            }else{}
            try {
                axios.post('api/addOrRemoveImportantTask', {
                    data: dataToPost
                }).then(resp => {
                    bellSound.play()
                    this.getImportantTasks()
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in updating data in server")
                })
                this.getImportantTasks()
            } catch (err) {
                __functionCustom.showErrorMsg(err)
            }
        },
        removeCompletedTask(taskId){
            let dataToPost = { taskId: taskId, isCompleted: 1 }
            let taskNow = ""
            let bellSound = new Audio('/assets/completed.mp3')
            this.allImportantTasks.forEach((o, i) => {
                if(o.TaskId == taskId){
                    taskNow = o
                }
            })
            if(taskNow.IsCompleted == 1){
                dataToPost.isCompleted = null
            }else{}
            try {
                axios.post('api/addOrRemoveCompletedTask', {
                    data: dataToPost
                }).then(resp => {
                    bellSound.play()
                    this.getImportantTasks()
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in updating data in server")
                })
                this.getImportantTasks()
            } catch (err) {
                __functionCustom.showErrorMsg(err)
            }
        },
        onClickButton(event){
            this.buttonNow = event
        }   
    },
    computed: {
        componentNow(){
            let component = "no-task"
            if(this.allImportantTasks != ""){
                component = "have-task"
            }
            return component
        },
        allImportantTasksProps(){
            let data = this.allImportantTasks
            return data
        }
    },
    components: {
        "no-task": noTaskTemplate,
        "have-task": haveTaskTemplate,
    }
})