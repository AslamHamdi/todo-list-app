import axios from 'axios';
import Vue from 'vue';
import vuetify from '/Config/vuetify'
import * as __functionCustom from '../FunctionCustom';
var moment = require('moment');

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
const defaultDateFormat = "YYYY-MM-DD"

Vue.use(vuetify)

const noTaskTemplate = {
    template: "#noTask",
    mounted(){
    }
}

const haveTaskTemplate = {
    template: "#haveTask",
    mounted(){
        
    },    
    props:{
        allTasks: ""
    },
    data(){
        return{
        }
    },
    methods:{
        deleteTask(taskId){
            this.$emit('deletetask', taskId)
        },
        addOrRemoveImportantTask(taskId){
            this.$emit('add-or-remove-important-task', taskId)
        },
        addOrRemoveCompletedTask(taskId){
            this.$emit('add-or-remove-completed-task', taskId)
        },
        selectEditTask(taskId){
            this.$emit('select-edit-task', taskId)
        } 
    },
    computed:{
        taskComp(){
            let data = this.allTasks
            let dataSorted = { notCompleted: [], isCompleted: []}
            if(data != ""){
                this.$emit('getAllTasks')
                data.forEach((o, i) => {
                    let time = __functionCustom.tConvert(o.TaskTime)
                    let fullDate = new Date(o.TaskDate)
                    let day = days[ fullDate.getDay() ];
                    let dayNum = fullDate.getUTCDate()
                    let month = months[ fullDate.getMonth() ];
                    o.dateTime = `${day}, ${dayNum + 1} ${month}, ${time}`
                    if(o.IsImportant == 1){
                        o.IsImportantClass = "is-important"
                    }else{
                        o.IsImportantClass = ""
                    }
                    if(o.IsCompleted == 1){
                        dataSorted.isCompleted.push(o)
                    }else{
                        dataSorted.notCompleted.push(o)
                    }
                });
            }else{
                console.log("NO DATA")
            }
            return dataSorted
        }
    }
}

const tasksApp = new Vue({
    el: "#tasksApp",
    vuetify,
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
            menuDate: false,
            modalDate: false,
            menuDate2: false,

            menuTime: false,
            modalTime: false,
            allTasks: "",
            isEdit: false,
            editTaskObj: {}
        }
    },
    mounted(){
        let vApp = document.querySelector(".v-application--wrap")
        vApp.classList.remove("v-application--wrap")
        vApp.classList.add("v-application")
        this.onInitialLoadPage()
    },
    methods:{
        onInitialLoadPage(){
            let data = this.getAlltasks()
        },
        dataSetter(data, variale){
            this.allTasks = data
        },
        getAlltasks(){
            axios.get('/api/getAllTasks')
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
                dataToPost.data = this.newTask.model
                try {
                    axios.post('/api/addNewtask', {
                        data: dataToPost
                    }).then(resp => {
                        __functionCustom.showSuccessMessage("Sucessfully add new task")
                        this.newTask.model.task = ""
                        this.newTask.model.date = undefined
                        this.newTask.model.time = null
                        this.getAlltasks()
                    }).catch(err => {
                        __functionCustom.showErrorMsg("Error in updating data into server")
                    })
                } catch (err) {
                    __functionCustom.showErrorMsg(err)
                } 
            }
        },
        deleteTask(taskId){
            let dataToPost = taskId
            try {
                axios.post('api/deleteTask', {
                    data: dataToPost
                }).then(resp => {
                    __functionCustom.showSuccessMessage("Successfully delete task")
                    this.getAlltasks()
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in deleting data from server",)
                })
                this.getAlltasks()
            } catch (err) {
                __functionCustom.showErrorMsg(err)
            }
        },
        addOrRemoveImportantTask(taskId){
            let dataToPost = { taskId: taskId, isImportant: 1 }
            let taskNow = ""
            let bellSound = new Audio('/assets/important.mp3')
            this.allTasks.forEach((o, i) => {
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
                    this.getAlltasks()
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in updating data in server")
                })
                this.getAlltasks()
            } catch (err) {
                __functionCustom.showErrorMsg(err)
            }
        },
        addOrRemoveCompletedTask(taskId){
            let dataToPost = { taskId: taskId, isCompleted: 1 }
            let taskNow = ""
            let bellSound = new Audio('/assets/completed.mp3')
            this.allTasks.forEach((o, i) => {
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
                    this.getAlltasks()
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in updating data in server")
                })
                this.getAlltasks()
            } catch (err) {
                __functionCustom.showErrorMsg(err)
            }
        },
        onClickButton(event){
            this.buttonNow = event
        },
        selectEditTask(taskId){
            this.allTasks.forEach((o, i) => {
                if(o.TaskId == taskId){
                    this.isEdit = true
                    this.newTask.model.task = o.TaskName
                    this.newTask.model.date = moment(o.TaskDate).format(defaultDateFormat) 
                    this.newTask.model.time = o.TaskTime
                    this.editTaskObj = o
                }
            })
        },
        confirmEditTask(){
            this.editTaskObj.TaskName = this.newTask.model.task
            this.editTaskObj.TaskDate = this.newTask.model.date
            this.editTaskObj.TaskTime = this.newTask.model.time
            let editSound = new Audio('/assets/edited.mp3')
            try {
                axios.post('api/editTask', {
                    data: this.editTaskObj
                }).then(resp => {
                    editSound.play()
                    this.getAlltasks()
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in updating data in server")
                })
                this.getAlltasks()
            } catch (err) {
                __functionCustom.showErrorMsg(err)
            }
        },
        onClickCancel(){
            this.newTask.model.task = ""
            this.newTask.model.date = undefined
            this.newTask.model.time = null
            this.isEdit = false
        }, 
    },
    computed: {
        componentNow(){
            let component = "no-task"
            if(this.allTasks != ""){
                component = "have-task"
            }
            return component
        },
        allTasksProp(){
            let data = this.allTasks
            return data
        }
    },
    components: {
        "no-task": noTaskTemplate,
        "have-task": haveTaskTemplate,
    }
})

export default tasksApp;