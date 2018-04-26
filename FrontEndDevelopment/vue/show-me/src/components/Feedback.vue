<template>
  <app-box class="md-elevation-5" v-bind:boxHeaderProp="feedbackBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle"
    v-bind:cardBlockContentStyle="cardBlockContentStyle">
        <table class="table">
          <tbody>
            <tr>
              <div style="width:25%; margin-top:5px; float:left;">
                <td>
                  <i class="fa fa-thumbs-up" id="upvoteButton" style="font-size:24px; color:gray" v-on:click="userObject.authorized ? addRemoveUpvote():showErrMsg()"></i>
                </td>
                <td>
                  <span>
                    <b>{{this.upvotesCount}}</b>
                  </span>
                </td>
                <td>
                  <i class="fa fa-thumbs-down" id="downvoteButton" style="font-size:24px; color:gray" v-on:click="userObject.authorized ?addRemoveDownvote():showErrMsg()"></i>
                </td>
                <td>
                  <span>
                    <b>{{this.downvotesCount}}</b>
                  </span>
                </td>
              </div>
            </tr>
            <tr>
              <td>Source Paper</td>
              <td>{{this.sourceName}}</td>
            </tr>
            <tr>
              <td>Destination Paper</td>
              <td>{{this.destinationName}}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{{this.upvotesCount - this.downvotesCount}}</td>
            </tr>
          </tbody>
        </table>
    <md-toolbar class="md-dense" style="margin-top:10px;margin-bottom:15px;">
      <h3 class="md-title" style="text-align: center;">Comments on Relationship</h3>
    </md-toolbar>
    <ul class="list-group" style="max-height:300px; overflow-y:auto;">
      <li style="padding-left:5px; " v-for="com in comments">
        <span style="color:green; font-weight:bold;"> {{com.username}}</span>&ensp;
        <br/>
        <span style="color:#696969;font-weight:bold;">{{ getTimeStamp(com.timestamp) }}</span>&ensp;&ensp; {{com.comment}}
        <hr />
      </li>
    </ul>
    <div style="width:80%; padding:10px">
      <div style="width:90%; margin-right:25px;float:left;padding:10px">
        <textarea v-model="user_comment" class="form-control" type="text" rows="1" style="height:90%; " placeholder="Your comments"
        />
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
            feedbackBoxHeader: "Feedback on Relationship",
            comments: [],
            user_comment:'',
            domain :'',
            source :'',
            destination :'',
            userObjTemp: this.$store.state.userObjStore,


            infoBoxHeader: "Link Information",
            errors: [],
            linkInfo: {},
            domain:'',
            upvotesCount :0,
            downvotesCount: 0,
            sourceName :'',
            sourceId:0,
            destinationName:'',
            destinationId:0,
            userObject: '',
            upvoteButtonClicked : false,
            downvoteButtonClicked :false
        }
    },
    watch: {
        $route(to, from) {
        this.linkInfo.id = to.params.linkid;
        }
    },
    components: {
        "icon": require("vue-icons")    
    },
    created() {
        this.cardStyle = "";
        this.cardBlockStyle = "height:80%;";
        this.cardBlockContentStyle = "height:100%;";

        this.userObject = this.$store.state.userObjStore;
        //console.log(this.userObject.authorized)
        var linkdata =  this.$route.matched[0].props.linkInfo;
        this.upvotesCount = linkdata.relation.upvotes;
        this.downvotesCount = linkdata.relation.downvotes;
        this.sourceName = linkdata.sourceTitle;
        this.destinationName = linkdata.destinationTitle;
        var params = this.$route.params;    
        //console.log(params);
        this.domain = params.areaid;
        this.sourceId = params.linkid.split('_')[0];
        this.destinationId = params.linkid.split('_')[1];
        
        this.upvoteButtonClicked = linkdata.upvotedByUser;
        this.downvoteButtonClicked = linkdata.downvotedByUser;

        console.log("data: " + (linkdata.upvotedByUser));





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
        },

        //---------
        addRemoveUpvote : function() {     
        if(this.upvoteButtonClicked === false){
            this.upvoteButtonClicked = true
            //document.getElementById('upvoteButton').style.color = 'blue'&& font-size ='24px';
            Object.assign(document.getElementById('upvoteButton').style,{'font-size':"30px",color:"blue"});
            axios
                .put(`http://54.201.123.246:8081/relations/upvote/add?domain=` + this.domain + `&source=` + this.sourceId + `&destination=` + this.destinationId +
                        `&user=` + this.userObject.userid)
                .then(response => {
                        if (response.status == 200) {
                            console.log(response.status)
                            this.upvotesCount = this.upvotesCount + 1;
                        }  
                })
                .catch(err => {
                    console.log(err);
                }
            );           

        }    
        else if(this.upvoteButtonClicked === true) {
            Object.assign(document.getElementById('upvoteButton').style,{'font-size':"24px",color:"gray"});
            this.upvoteButtonClicked = false;
            axios
                .put(`http://54.201.123.246:8081/relations/upvote/remove?domain=` + this.domain + `&source=` + this.sourceId + `&destination=` + this.destinationId +
                        `&user=` + this.userObject.userid)
                .then(response => {
                        if (response.status == 200) {
                            console.log(response.status)                               
                            this.upvotesCount = this.upvotesCount - 1;
                        }
                })
                .catch(err => {
                    console.log(err);
                }
            );
        }   
        },

        addRemoveDownvote : function(){  
        if(this.downvoteButtonClicked === false){
            Object.assign(document.getElementById('downvoteButton').style,{'font-size':"30px",color:"blue"});
            this.downvoteButtonClicked = true;
            axios
                .put(`http://54.201.123.246:8081/relations/downvote/add?domain=` + this.domain + `&source=` + this.sourceId + `&destination=` + this.destinationId +
                        `&user=` + this.userObject.userid)
                .then(response => {
                        if (response.status == 200) { 
                            console.log(response.status)                              
                            this.downvotesCount = this.downvotesCount + 1;
                        }
                })
                .catch(err => {
                    console.log(err);
                }
            );           
        }    
        else if(this.downvoteButtonClicked === true) {
            Object.assign(document.getElementById('downvoteButton').style,{'font-size':"24px",color:"gray"});
            this.downvoteButtonClicked = false
            axios
                .put(`http://54.201.123.246:8081/relations/downvote/remove?domain=` + this.domain + `&source=` + this.sourceId + `&destination=` + this.destinationId +
                        `&user=` + this.userObject.userid)
                .then(response => {
                        if (response.status == 200) {   
                            console.log(response.status)                             
                            this.downvotesCount = this.downvotesCount - 1;
                        }
                })
                .catch(err => {
                    console.log(err);
                }
            );

        }   
        },
        showErrMsg : function() {
        this.$toastr('add', {
                title: 'Want to get involved?', // Toast Title
                msg: 'Please sign in', // Message
                timeout: 5000, // Timeout in ms
                position: 'toast-top-full-width', // Toastr position
                type: 'info' // Toastr type
        });
        },
    }
}            
</script>

<style>

</style>