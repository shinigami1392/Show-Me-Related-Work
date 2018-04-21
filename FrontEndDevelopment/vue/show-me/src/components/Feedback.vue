<template>
    <app-box v-bind:boxHeaderProp="feedbackBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
            <ul class="list-group" style="max-height:300px; overflow-y:auto;">
                <li v-for="com in comments">
                   <span style="color:green; font-weight:bold;"> {{com.username}}</span>&ensp;<span style="color:#696969;font-weight:bold;">{{ getTimeStamp(com.timestamp) }}</span>:&ensp; {{com.comment}} <hr />
                </li>
            </ul>
        <div v-if="userObjTemp.authorized" style="width:100%;">
            <div style="width:70%; margin-right:25px;float:left;">
                <textarea v-model="user_comment" class="form-control" type="text" rows="5" style="height:95%;" placeholder="Your comments" />
            </div>
            <div style="width:25%; margin-top:5px; float:left;">                
                
                <i class="fa fa-thumbs-up upvoteButtonClass"  v-on:click="addRemoveUpvote"></i>                
                <span><b>{{this.upvotesCount}}</b></span>                
                <i class="fa fa-thumbs-down downvoteButtonClass" v-on:click="addRemoveDownvote"></i>
                <span><b>{{this.downvotesCount}}</b></span>
                <button type="button" v-on:click="addComment()" class="btn btn-success btn-sm">Comment</button> &nbsp;
            </div>
            <div style="clear:both;"></div>
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
            weight: 0,
            upvoteButtonClass : "btn btn-primary btn-sm",
            downvoteButtonClass :"btn btn-primary btn-sm",
            domain :'',
            source :'',
            destination :'',
            upvotesCount : 0,
            downvotesCount : 0,
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
        this.upvotesCount = linkInfo.relation.upvotes.length;
        this.downvotesCount = linkInfo.relation.downvotes.length;        
        this.comments = linkInfo.relation.comments;
        console.log(JSON.stringify(this.comments));
        if (linkInfo.upvotes == undefined){
            this.weight = 0;
        } 
        else {
            this.weight = linkInfo.upvotes;
        }   
             
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
        addRemoveUpvote : function(){        
            this.weight = this.weight + 1;
            if(this.upvoteButtonClass === 'btn btn-primary btn-sm'){
                this.upvoteButtonClass = 'btn btn-default'
                axios
                    .put(`http://54.201.123.246:8081/relations/upvote/add?domain=` + this.domain + `&source=` + this.source + `&destination=` + this.destination +
                         `&user=` + this.userObjTemp.userid)
                    .then(response => {
                            if (response.status == 200) {
                                this.upvotesCount = this.upvotesCount + 1;
                            }  
                    })
                    .catch(err => {
                        console.log(err);
                    }
                );           

            }    
            else if(this.upvoteButtonClass === 'btn btn-default') {
                this.upvoteButtonClass = 'btn btn-primary btn-sm'
                axios
                    .put(`http://54.201.123.246:8081/relations/upvote/remove?domain=` + this.domain + `&source=` + this.source + `&destination=` + this.destination +
                        `&user=` + this.givenname)
                    .then(response => {
                            if (response.status == 200) {                               
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
            
            this.weight = this.weight + 1;                     

            if(this.downvoteButtonClass === 'btn btn-primary btn-sm'){
                this.downvoteButtonClass = 'btn btn-default'
                axios
                    .put(`http://54.201.123.246:8081/relations/downvote/add?domain=` + this.domain + `&source=` + this.source + `&destination=` + this.destination +
                        `&user=` + this.userObjTemp.userid)
                    .then(response => {
                            if (response.status == 200) {                               
                               this.downvotesCount = this.downvotesCount + 1;
                            }
                    })
                    .catch(err => {
                        console.log(err);
                    }
                );           
            }    
            else if(this.downvoteButtonClass === 'btn btn-default') {
                this.downvoteButtonClass = 'btn btn-primary btn-sm'
                axios
                    .put(`http://54.201.123.246:8081/relations/downvote/remove?domain=` + this.domain + `&source=` + this.source + `&destination=` + this.destination +
                        `&user=` + this.userObjTemp.userid)
                    .then(response => {
                            if (response.status == 200) {                                
                                this.downvotesCount = this.downvotesCount - 1;
                            }
                    })
                    .catch(err => {
                        console.log(err);
                    }
                );

            }   
        },
        addComment: function() {

                let requestUrl = `http://54.201.123.246:8081/relations/comment/add?domain=` + this.domain + `&source=` + this.source + `&destination=` + this.destination + `&user=` + this.userObjTemp.userid+`&text=` + this.user_comment; 
                console.log(requestUrl);
            axios
                .put(requestUrl)
                .then(response => {

                    // if true then 
                    console.log(response.data);
                    let text = this.user_comment;
                    let userCom = {};
                    userCom.comment = this.user_comment;
                    userCom.userId = this.userObjTemp.userid;
                    userCom.username = this.userObjTemp.given_name + " "+ this.userObjTemp.family_name;
                    var d = new Date();
                    userCom.timestamp = d.toISOString();

                    this.comments.push(userCom);
                    
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}            
</script>

<style>

</style>