<template>
    <app-box v-bind:boxHeaderProp="feedbackBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
        <div style="width:100%; height:70%">
            <ul class="list-group" style="height:100%; overflow-y:auto;">
                <li v-for="comment in comments">
                   <span style="color:green; font-weight:bold;"> {{comment.user_name}}</span> <span style="color:grey;">[{{ getTimeStamp(comment.timestamp) }}]</span>: {{comment.text}} <hr />
                </li>
            </ul>
        </div>
        <div style="width:100%; height:30%">
            <div style="width:70%; height:100%; margin-right:25px;float:left;">
                <textarea v-model="user_comment" class="form-control" type="text" rows="10" style="height:95%;" placeholder="Your comments" />
            </div>
            <div style="width:25%; height:100%; margin-top:5px; float:left;">
                <button type="button" v-on:click="addComment()" class="btn btn-success">Comment</button> &nbsp;
                <button v-bind:class="likeButtonClass" v-on:click="toggleLikeButton">Like
                    <i class="fa fa-thumbs-o-up"></i>
                </button>
            </div>
            <div style="clear:both;"></div>
        </div>
    </app-box>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            feedbackBoxHeader: "Feedback",
            comments: [],
            weight: 0,
            user_comment: [],
            likeButtonClass : "btn btn-primary"
        }
    },
    created() {
        this.cardStyle = "height:100%";
        this.cardBlockStyle = "height:80%;"
        this.cardBlockContentStyle = "height:100%;"
    },
    mounted() {
        var linkInfo = this.$route.matched[0].props.linkInfo;
        this.comments = linkInfo.relation.comments;
        this.weight = linkInfo.upvotes;
    },
    methods: {
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
        toggleLikeButton : function(){
            if(this.likeButtonClass === 'btn btn-primary'){
                this.likeButtonClass = 'btn btn-default'
            }    
            else if(this.likeButtonClass === 'btn btn-default') {
                this.likeButtonClass = 'btn btn-primary'
            }   
        },
        addComment: function() {
            axios
                .put(`http://localhost:8081/relations/comment/add?relationId=` + this.$route.params.linkid + `&text=` + this.user_comment + `&user_name=user0`)
                .then(response => {
                    axios
                        .get(`http://localhost:8081/relations/get?id=` + this.$route.params.linkid + `&user=user0`)
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