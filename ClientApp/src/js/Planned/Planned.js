import axios from 'axios';
import Vue from 'vue';
import vuetify from '/Config/vuetify'
import AjaxCall from '../AjaxCall'
import * as __functionCustom from '../FunctionCustom';
var moment = require('moment');

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];

Vue.use(vuetify)

Vue.filter('truncate', __functionCustom.textFilter);

const noTaskTemplate = {
    template: "#noTask",
    mounted(){

    }
}

const haveTaskTemplate = {
    template: "#haveTask",
    data(){
        return{
            openMenu: false,
            menuList: [
                { id: 1, name: "Overdue" },
                { id: 2, name: `Today ()` },
                { id: 3, name: `Tomorrow ()` },
                { id: 4, name:`This week ()` },
                { id: 5, name: "All Planned" },
            ],
            currentMenuSelected: { id: 1, name: "Overdue"},
            startDate: undefined,
            endDate: undefined,
            dtMenuList: {},
        }
    },
    props:{
        allTasks: ""
    },
    mounted(){
        let vApp = document.querySelector(".v-application--wrap")
        vApp.classList.remove("v-application--wrap")
        vApp.classList.add("v-application")
        this.onInitialLoadPage()
    },
    methods:{
        onInitialLoadPage(){
            this.onDropDownSelect(this.currentMenuSelected)
        },
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
        onDropDownSelect(menu){
            this.currentMenuSelected = menu
            this.getDataFromServer(menu.id)
        },
        getDataFromServer(selected){
            this.$emit('get-data-from-server', selected)
        },
        deleteTask(taskId){
            this.$emit('deletetask', taskId)
        },
        addOrRemoveImportantTask(taskId){
            this.$emit('add-or-remove-important-task', taskId)
        },
        addOrRemoveCompletedTask(taskId){
            this.$emit('add-or-remove-completed-task', taskId)
        } 
    },
    computed:{
        menuListComp(){
            let today = moment()
            this.startDate = today.startOf('week').format()
            this.endDate = today.endOf('week').format()

            let startDay = moment(this.startDate, 'YYYY/MM/DD');
            startDay = startDay.format('D')

            let endDate2 = moment(this.endDate, 'YYYY/MM/DD');
            let endDay = endDate2.format('D')
            let endMonth = endDate2.format('MMMM')
            
            let dateToday = new Date()
            let tomorrow = new Date(dateToday)

            tomorrow.setDate(tomorrow.getDate() + 1)

            let dayToday = moment(new Date()).format("ddd")
            let dayTomorrow = moment(tomorrow).format("ddd")

            this.dtMenuList.dayToday = dayToday
            this.dtMenuList.dayTomorrow = dayTomorrow
            this.dtMenuList.weekRange = `${startDay} - ${endDay} ${endMonth}`

            let data = [
                { id: 1, name: "Overdue" },
                { id: 2, name: `Today (${dayToday})` },
                { id: 3, name: `Tomorrow (${dayTomorrow})` },
                { id: 4, name:`This week (${startDay} - ${endDay} ${endMonth})` },
                { id: 5, name: "All Planned" },
            ]

            return data
        },
        taskComp(){
            let data = this.allTasks
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
                });
            }else{
                console.log("NO DATA")
            }
            return data
        }
    },
    components: {
        "no-task": noTaskTemplate,
    }
}

const plannedApp = new Vue({
    el: "#plannedApp",
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
            date: undefined,
            menuDate: false,
            modalDate: false,
            menuDate2: false,

            time: null,
            menuTime: false,
            modalTime: false,

            allTasks: "",
            startDate: undefined,
            endDate: undefined,
            selectedNow: ""
        }
    },
    mounted(){
        this.onInitialLoadPage()
    },
    methods:{
        onInitialLoadPage(){
            let data = this.getDataFromServer()
        },
        dataSetter(data, variale){
            this.allTasks = data
        },
        getDataFromServer(selected){
            if(selected != undefined) this.selectedNow = selected 
            else {}
            let today = moment()
            this.startDate = today.startOf('week').format()
            this.endDate = today.endOf('week').format()
            var apiPath = (this.selectedNow == 1) ? ("/api/getAllOverdueTasks") 
                            : (this.selectedNow == 2) ? ("/api/getAllTodayTasks") 
                            : (this.selectedNow == 3) ? ("/api/getAllTomorrowTasks") 
                            : (this.selectedNow == 4) ? ("/api/getAllThisWeekTasks") 
                            : (this.selectedNow == 5) ? ("/api/getAllPlannedTasks")
                            : "/api/getAllOverdueTasks"

            var dataToPost = (this.selectedNow == 4) ? ({startDate: this.startDate, endDate: this.endDate}) : ""
            try {
                axios.post(apiPath, {
                    data: dataToPost
                }).then(resp => {
                    let result = resp.data.data[0][0];
                    this.dataSetter(resp.data.data[0][0])
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in retreiving data from server")
                })
            } catch (err) {
                __functionCustom.showErrorMsg(err)
            }
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
                        this.getDataFromServer()
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
                    this.getDataFromServer()
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in deleting data from server",)
                })
                this.getDataFromServer()
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
                    this.getDataFromServer()
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in updating data in server")
                })
                this.getDataFromServer()
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
                    this.getDataFromServer()
                }).catch(err => {
                    __functionCustom.showErrorMsg("Error in updating data in server")
                })
                this.getDataFromServer()
            } catch (err) {
                __functionCustom.showErrorMsg(err)
            }
        },
        testNotification(){

        }, 
        onClickButton(event){
            this.buttonNow = event
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
        "have-task": haveTaskTemplate,
    }
})