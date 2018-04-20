<template>
    <app-box v-bind:boxHeaderProp="feedbackBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
            <ul class="list-group" style="max-height:300px; overflow-y:auto;">
                <li v-for="comment in comments">
                   <span style="color:green; font-weight:bold;"> {{comment.user_name}}</span> <span style="color:grey;">[{{ getTimeStamp(comment.timestamp) }}]</span>: {{comment.text}} <hr />
                </li>
            </ul>
        <div style="width:100%;">
            <div style="width:70%; margin-right:25px;float:left;">
                <textarea v-model="user_comment" class="form-control" type="text" rows="5" style="height:95%;" placeholder="Your comments" />
            </div>
            <div style="width:25%; margin-top:5px; float:left;">                
                <button v-bind:class="upvoteButtonClass" v-on:click="addRemoveUpvote">Upvote
                    <i class="fa fa-thumbs-o-up"></i>
                </button>
                <button v-bind:class="downvoteButtonClass" v-on:click="addRemoveDownvote">Downvote
                    <i class="fa fa-thumbs-o-down"></i>
                </button>
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
            weight: 0,
            user_comment: [],
            givenname:'',
            authenticated: false,
            upvoteButtonClass : "btn btn-primary btn-sm",
            downvoteButtonClass :"btn btn-primary btn-sm",
            domain :'',
            source :'',
            destination :'',
        }
    },
    props: ['userData'],
    created() {
        this.cardStyle = "";
        this.cardBlockStyle = "height:80%;"
        this.cardBlockContentStyle = "height:100%;"
    },
    mounted() {
        var linkInfo = this.$route.matched[0].props.linkInfo;        
        this.comments = linkInfo.relation.comments;
        console.log(JSON.stringify(this.comments));
        if (linkInfo.upvotes == undefined){
            this.weight = 0;
        } 
        else {
            this.weight = linkInfo.upvotes;
        }   

        this.domain = this.$route.params.areaid;        
        var nodes = this.$route.params.linkid
        this.source = nodes.split("_")[0];
        this.destination = nodes.split("_")[1];            
        this.givenname = userData.given_name;
        this.authenticated = userData.authenticated;        
    },
    methods: {

        isAuthenticated: function(){
            this.authenticated = localStorage.getItem('authorized');
        },
        getTimeStamp: function(timeInMilliseconds){
            
            var date = new Date(parseInt(timeInMilliseconds,10)); 
            var timestamp =  date.getFullYear() +":"+ this.monthFormat(date.getMonth()+1) +":"+  date.getDate()+":"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
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
            //this.givenname = "Abc";

            if(this.upvoteButtonClass === 'btn btn-primary btn-sm'){
                this.upvoteButtonClass = 'btn btn-default'
               
                axios
                    .put(`http://54.201.123.246:8081/relations/upvote/add?domain=` + this.domain + `&source=` + this.source + `&destination=` + this.destination +
                         `&user=` + this.givenname)
                    .then(response => {
                            if (response.status == 200) {
                                //console.log("Upvote added");
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
                               // console.log("Upvote removed");
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
            //this.givenname = "Abc";

            if(this.downvoteButtonClass === 'btn btn-primary btn-sm'){
                this.downvoteButtonClass = 'btn btn-default'
               
                axios
                    .put(`http://54.201.123.246:8081/relations/downvote/add?domain=` + this.domain + `&source=` + this.source + `&destination=` + this.destination +
                        `&user=` + this.givenname)
                    .then(response => {
                            if (response.status == 200) {
                               // console.log("Downvote added");
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
                        `&user=` + this.givenname)
                    .then(response => {
                            if (response.status == 200) {
                                //console.log("Downvote removed");
                            }
                    })
                    .catch(err => {
                        console.log(err);
                    }
                );

            }   
        },
        addComment: function() {

                let domainId = this.$route.params.areaid;
                let relationId = (this.$route.params.linkid).split('_'); 
                let sourceId = relationId[0];
                let destinationId = relationId[1];
                let textContent =  this.user_comment;
                let userId = '';
                if((localStorage.getItem("userData") != null)){
                    let userObj = JSON.parse(localStorage.getItem("userData"));
                    userId = userObj.sub;
                }

                let requestUrl = `http://54.201.123.246:8081/relations/comment/add?domain=` + domainId + `&source=` + sourceId + `&destination=` + destinationId + `&user=` + userId+`&text=` + textContent; 
                console.log(requestUrl);
            
            axios
                .put(requestUrl)
                .then(response => {

                    // if true then 
                    console.log(response.data);


                    axios
                        .get(`http://54.201.123.246:8081/relations/get?id=` + this.$route.params.linkid + `&user=` + this.username)
                        .then(response => {
                             this.comments =  response.data.relation.comments;
                             this.user_comment='';
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
            
            this.$store.state.comments.push({linkid:this.$route.params.linkid,text:this.user_comment});
        }
    },
    computed:{
        users(){
            return this.$store.state.users;
        }
    }
}            
</script>

<style>

</style>