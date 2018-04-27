<template>
  <app-box class="md-elevation-5" v-bind:boxHeaderProp="feedbackBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle"
    v-bind:cardBlockContentStyle="cardBlockContentStyle">
        <table class="table table-bordered">
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
              <td class="table-success table-back md-subheading">Source Paper</td>
              <td  class="table-success table-back-text md-subheading">{{this.sourceName}}</td>
            </tr>
            <tr>
              <td class="table-success table-back md-subheading">Destination Paper</td>
              <td  class="table-success table-back-text md-subheading">{{this.destinationName}}</td>
            </tr>
            <tr>
              <td class="table-success table-back md-subheading">Weight</td>
              <td class="table-success table-back-text md-subheading">{{this.upvotesCount - this.downvotesCount}}</td>
            </tr>
          </tbody>
        </table>
    <div class="card-header" style="margin-top:10px;margin-bottom:15px;"><h3 class="md-title">Comments</h3></div>
    <ul class="list-group" style="max-height:500px; overflow-y:auto;">
      <li style="padding-left:5px; " v-for="com in comments">
        <span style="color:#f45844; font-weight:bold;"> {{com.username}}</span>&ensp;
        <br/>
        <span style="color:#35342f;font-weight:bold;">{{ getTimeStamp(com.timestamp) }}</span>&ensp;&ensp; {{com.comment}}
        <hr/>
      </li>
    </ul>
    <div style="width:80%; padding:10px">
      <div style="width:90%; margin-right:25px;float:left;padding:10px">
        <textarea v-model="user_comment" class="form-control" type="text" rows="1" style="height:90%; " placeholder="Your comments"
        />
        <button type="button" class="btn btn-success" style="color:#fff;background-color:#3dbd5d;margin:5px;" v-on:click="userObject.authorized ?(user_comment!=''?addComment():showTextErrMsg()):showErrMsg()">Comment</button> &nbsp;
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
            infoBoxHeader: "Link Information",
            errors: [],
            domain:'',
            upvotesCount :0,
            downvotesCount: 0,
            sourceName :'',
            sourceId:0,
            destinationName:'',
            destinationId:0,
            upvoteButtonClicked : false,
            downvoteButtonClicked :false,
            userObject : this.$store.state.userObjStore,
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

        var linkdata =  this.$route.matched[0].props.linkInfo;

        this.upvotesCount = linkdata.relation.upvotes;
        this.downvotesCount = linkdata.relation.downvotes;
        this.sourceName = linkdata.sourceTitle;
        this.destinationName = linkdata.destinationTitle;

        var params = this.$route.params;    
        this.domain = params.areaid;
        this.sourceId = params.linkid.split('_')[0];
        this.destinationId = params.linkid.split('_')[1];
    },
    mounted() {
        var linkInfo = this.$route.matched[0].props.linkInfo;       
        this.comments = linkInfo.relation.comments;

        this.upvoteButtonClicked = linkInfo.upvotedByUser;
        this.downvoteButtonClicked = linkInfo.downvotedByUser;

        if (this.upvoteButtonClicked === true) {        
            Object.assign(document.getElementById('upvoteButton').style,{'font-size':"30px",color:"#0081c6"});
        }
        if (this.downvoteButtonClicked === true) {
            Object.assign(document.getElementById('downvoteButton').style,{'font-size':"30px",color:"#0081c6"});
        }
    },
    methods: {

        getTimeStamp: function(timeInMilliseconds){
            // let d  = new Date(timeInMilliseconds)
            // var date = new Date(timeInMilliseconds); 
            // var timestamp =  date.getFullYear() +"/"+ this.monthFormat(date.getMonth()+1) +"/"+  date.getDate()+" at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
            return this.$moment(timeInMilliseconds).format('YYYY-MM-DD h:mm:ss a');
        },
        monthFormat : function(val){
		    if(val < 10){
			    val = "0" + val;
		    }
		    return val;
        },
        addComment: function() {
                let requestUrl = this.$store.state.IP_Config + `/relations/comment/add?domain=` + this.domain + `&source=` + this.sourceId + `&destination=` + this.destinationId + `&user=` +this.userObject.userid+`&text=` + this.user_comment; 
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
                        userCom.userId = this.userObject.userid;
                        userCom.username = this.userObject.given_name + " "+ this.userObject.family_name;
                        
                        var d = new Date();
                        let curr = d.toISOString();
                        userCom.timestamp = curr;
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
                    timeout: 2000, // Timeout in ms
                    position: 'toast-top-full-width', // Toastr position
                    type: 'info' // Toastr type
            });
        },
        showTextErrMsg:function(){
            this.$toastr('add', {
                    title: 'Please enter text', // Toast Title
                    msg: '', // Message
                    timeout: 1500, // Timeout in ms
                    position: 'toast-bottom-left', // Toastr position
                    type: 'error' // Toastr type
            });
        },

        toggleUpvoteButton : function (){
            if(this.upvoteButtonClicked === false){
                this.upvotesCount = this.upvotesCount + 1;
                this.upvoteButtonClicked = true
                Object.assign(document.getElementById('upvoteButton').style,{'font-size':"30px",color:"#0081c6"});
            }
            else {
                this.upvotesCount = this.upvotesCount - 1;
                this.upvoteButtonClicked = false
                Object.assign(document.getElementById('upvoteButton').style,{'font-size':"24px",color:"gray"});
            }
        },

        toggleDownvoteButton : function () {
            if (this.downvoteButtonClicked === false) {
                this.downvotesCount = this.downvotesCount + 1;
                Object.assign(document.getElementById('downvoteButton').style,{'font-size':"30px",color:"#0081c6"});
                this.downvoteButtonClicked = true;
            }
            else {
                this.downvotesCount = this.downvotesCount - 1;
                Object.assign(document.getElementById('downvoteButton').style,{'font-size':"24px",color:"gray"});
                this.downvoteButtonClicked = false
            }
        },

        //---------
        addRemoveUpvote : function() {     
        if(this.upvoteButtonClicked === false){
            //this.upvoteButtonClicked = true
           //Object.assign(document.getElementById('upvoteButton').style,{'font-size':"30px",color:"#0081c6"});
            this.toggleUpvoteButton();
            axios
                .put(this.$store.state.IP_Config +`/relations/upvote/add?domain=` + this.domain + `&source=` + this.sourceId + `&destination=` + this.destinationId +
                        `&user=` + this.userObject.userid)
                .then(response => {
                        if (response.status == 200) {                                                          
                            //this.upvotesCount = this.upvotesCount + 1;
                            if (response.data.isDownvotedByUser) {
                                //this.downvotesCount = this.downvotesCount - 1;
                                //Object.assign(document.getElementById('downvoteButton').style,{'font-size':"24px",color:"gray"});
                                //this.downvoteButtonClicked = false;
                                this.toggleDownvoteButton();
                            }
                        }  
                })
                .catch(err => {
                    this.upvotesCount = this.upvotesCount - 1;
                    console.log(err);
                }
            );           

        }    
        else if(this.upvoteButtonClicked === true) {
           // Object.assign(document.getElementById('upvoteButton').style,{'font-size':"24px",color:"gray"});
           // this.upvoteButtonClicked = false;
           this.toggleUpvoteButton();
            axios
                .put(this.$store.state.IP_Config +`/relations/upvote/remove?domain=` + this.domain + `&source=` + this.sourceId + `&destination=` + this.destinationId +
                        `&user=` + this.userObject.userid)
                .then(response => {
                        if (response.status == 200) {                                                           
                            //this.upvotesCount = this.upvotesCount - 1;
                        }
                })
                .catch(err => {
                    //console.log(err);
                    this.upvotesCount = this.upvotesCount + 1;
                }
            );
        }   
        },

        addRemoveDownvote : function(){  
        if(this.downvoteButtonClicked === false){
            //Object.assign(document.getElementById('downvoteButton').style,{'font-size':"30px",color:"#0081c6"});
            //this.downvoteButtonClicked = true;
            this.toggleDownvoteButton();
            axios
                .put(this.$store.state.IP_Config +`/relations/downvote/add?domain=` + this.domain + `&source=` + this.sourceId + `&destination=` + this.destinationId +
                        `&user=` + this.userObject.userid)
                .then(response => {
                        if (response.status == 200) {                                                           
                           // this.downvotesCount = this.downvotesCount + 1;
                            if (response.data.isUpvotedByUser) {
                                //this.upvotesCount = this.upvotesCount - 1;
                               // Object.assign(document.getElementById('upvoteButton').style,{'font-size':"24px",color:"gray"});
                                //this.upvoteButtonClicked = false;
                                this.toggleUpvoteButton();
                            }
                        }
                })
                .catch(err => {
                    //console.log(err);
                    this.downvotesCount = this.downvotesCount - 1;
                }
            );           
        }    
        else if(this.downvoteButtonClicked === true) {
            //Object.assign(document.getElementById('downvoteButton').style,{'font-size':"24px",color:"gray"});
           // this.downvoteButtonClicked = false
           this.toggleDownvoteButton();
            axios
                .put(this.$store.state.IP_Config +`/relations/downvote/remove?domain=` + this.domain + `&source=` + this.sourceId + `&destination=` + this.destinationId +
                        `&user=` + this.userObject.userid)
                .then(response => {
                        if (response.status == 200) {                                                         
                           // this.downvotesCount = this.downvotesCount - 1;
                        }
                })
                .catch(err => {
                    this.downvotesCount = this.downvotesCount + 1;
                }
            );

        }   
        },
        showErrMsg : function() {
        this.$toastr('add', {
                title: 'We value your feedback?', // Toast Title
                msg: 'Please sign in', // Message
                timeout: 2000, // Timeout in ms
                position: 'toast-top-full-width', // Toastr position
                type: 'info' // Toastr type
        });
        },
    }
}            
</script>

<style>

.table-back{
    background-color:#ececec;
    color:#000
}
.table-back-text{
    background-color:#f5f5f5;
}

</style>