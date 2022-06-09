import axios from 'axios';
import AjaxCall from '/dist/js/AjaxCall.entry'
import Vue from 'vue';
import vuetify from '/Config/vuetify'

const _ = require('lodash')
const $ = require('jquery')

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];

Vue.use(vuetify)

function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}

const noTaskTemplate = {
    template: "#noTask",
    mounted(){
        //console.log("DASHBOARD APP")
    }
}

const haveTaskTemplate = {
    template: "#haveTask",
    mounted(){
        setTimeout(() => {
            console.log("ALL TASKS PROPS: ", this.allTasks)
        }, 800)
    },    
    props:{
        allTasks: ""
    },
    data(){
        return{

        }
    },
    methods:{
        
    },
    computed:{
        taskComp(){
            let data = this.allTasks
            if(data != ""){
                data.forEach((o, i) => {
                    let time = tConvert(o.TaskTime)
                    let fullDate = new Date(o.TaskDate)
                    let day = days[ fullDate.getDay() ];
                    let dayNum = fullDate.getUTCDate()
                    let month = months[ fullDate.getMonth() ];
                    o.dateTime = `${day}, ${dayNum} ${month}, ${time}`
                    // o.time = time.toLocaleString('en-US', { hour: 'numeric', hour12: true })
                });
            }else{
                console.log("NO DATA")
            }
            return data
        }
    }
}

const myDayApp = new Vue({
    el: "#myDayApp",
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
            allTasks: ""
        }
    },
    mounted(){
        console.log("MY DAY APP")
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
            console.log("ALL TAKS: ", this.allTasks)
        },
        getAlltasks(){
            axios.get('/api/getAllTasks')
                .then(resp => {
                    let result = resp.data.data[0][0];
                    this.dataSetter(resp.data.data[0][0])
                })
                .catch(err => {
                    console.error(err); throw err;
                })
        },
        onClickButton(event){
            this.buttonNow = event
        },
        addNewTask(){
            let dataToPost = {}
            dataToPost.data = this.newTask.model
            try {
                axios.post('/api/addNewtask', {
                    data: dataToPost
                })
            } catch (error) {
                console.log("ERROR:", error)
            }
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

export default myDayApp;