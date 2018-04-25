<template>
    <app-box class="md-elevation-5" v-bind:boxHeaderProp="feedbackBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
            <ul class="list-group" style="max-height:300px; overflow-y:auto;">
                <li style="padding-left:5px; " v-for="com in comments">
                   <span style="color:green; font-weight:bold;"> {{com.username}}</span>&ensp;<br/><span style="color:#696969;font-weight:bold;">{{ getTimeStamp(com.timestamp) }}</span>&ensp;&ensp; {{com.comment}} <hr />
                </li>
            </ul>
        <div style="width:80%; padding:10px">
            <div style="width:90%; margin-right:25px;float:left;padding:10px">
                <textarea v-model="user_comment" class="form-control" type="text" rows="1" style="height:90%; " placeholder="Your comments" />
                <md-button style="color:#fff;background-color:#3dbd5d" v-on:click="userObjTemp.authorized ?(user_comment!=''?addComment():showTextErrMsg()):showErrMsg()">Comment</md-button> &nbsp;
            </div>
        </div>
    </app-box>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            feedbackBoxHeader: "Feedback",
            comments: [],
            user_comment:'',
            domain :'',
            source :'',
            destination :'',
            userObjTemp: this.$store.state.userObjStore
        }
    },
    components: {
        "icon": require("vue-icons")    
    },
    created() {
        this.cardStyle = "";
        this.cardBlockStyle = "height:80%;";
        this.cardBlockContentStyle = "height:100%;";
        this.domain = this.$route.params.areaid;    
        var nodes = this.$route.params.linkid
        this.source = nodes.split("_")[0];
        this.destination = nodes.split("_")[1];    
    },
    mounted() {
        var linkInfo = this.$route.matched[0].props.linkInfo;       
        this.comments = linkInfo.relation.comments;
        //console.log(JSON.stringify(this.comments));          
    },
    methods: {

        getTimeStamp: function(timeInMilliseconds){
            let d  = new Date(timeInMilliseconds)
            var date = new Date(timeInMilliseconds); 
            var timestamp =  date.getFullYear() +"/"+ this.monthFormat(date.getMonth()+1) +"/"+  date.getDate()+" at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
            return timestamp;
        },
        monthFormat : function(val){
		    if(val < 10){
			    val = "0" + val;
		    }
		    return val;
        },
        addComment: function() {
                let requestUrl = `http://54.201.123.246:8081/relations/comment/add?domain=` + this.domain + `&source=` + this.source + `&destination=` + this.destination + `&user=` +this.userObjTemp.userid+`&text=` + this.user_comment; 
                console.log(requestUrl);
            axios
                .put(requestUrl)
                .then(response => {

                    // if true then 
                    console.log(response.data.updated);
                    if(response.data.updated){
                        let text = this.user_comment;
                        let userCom = {};
                        userCom.comment = this.user_comment;
                        userCom.userId = this.userObjTemp.userid;
                        userCom.username = this.userObjTemp.given_name + " "+ this.userObjTemp.family_name;
                        var d = new Date();
                        userCom.timestamp = d.toISOString();
                        this.comments.push(userCom);
                        this.user_comment='';
                        this.$toastr('add', {
                            title: 'Successfully Posted', // Toast Title
                            msg: '', // Message
                            timeout: 2000, // Timeout in ms
                            position: 'toast-bottom-left', // Toastr position
                            type: 'success' // Toastr type
                        });
                    }
                    else{
                        this.$toastr('warning', 'Something went wrong', 'Please check if you are logged in');
                    }
                    
                })
                .catch(err => {
                    let errObj = JSON.parse(JSON.stringify(err));
                    this.$toastr('add', {
                    title: 'Bad request', // Toast Title
                    msg: errObj.response.data, // Message
                    timeout: 5000, // Timeout in ms
                    position: 'toast-bottom-full-width', // Toastr position
                    type: 'error' // Toastr type
                    });
                });
        },
        showErrMsg : function(){
            this.$toastr('add', {
                    title: 'Want to get involved?', // Toast Title
                    msg: 'Please sign in', // Message
                    timeout: 5000, // Timeout in ms
                    position: 'toast-top-full-width', // Toastr position
                    type: 'info' // Toastr type
            });
        },
        showTextErrMsg:function(){
            this.$toastr('add', {
                    title: 'Please enter text', // Toast Title
                    msg: '', // Message
                    timeout: 2000, // Timeout in ms
                    position: 'toast-bottom-left', // Toastr position
                    type: 'error' // Toastr type
            });
        }
    }
}            
</script>

<style>

</style>