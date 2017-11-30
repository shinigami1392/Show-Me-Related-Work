<template>
    <app-box v-bind:boxHeaderProp = "feedbackBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
         <div style="width:100%; height:70%">
         <ul class="list-group" style="height:100%; overflow-y:auto;">
              <!-- <li>Good<hr/></li> 
              <li>Teekh Hain<hr/></li>
              <li>Bahut Acha Hain<hr/></li>    
              <li>Good<hr/></li>
              <li>Teekh Hain<hr/></li>
              <li>Bahut Acha Hain<hr/></li> -->
              <li v-for="comment in comments">
                  {{comment.user_name}} [{{comment.timestamp}}]: {{comment.text}} <hr />
              </li>                                  
        </ul>
        </div>   
        <!--<div style="width:100%; height:34%">
             <textarea class="form-control" type="text" rows="1" placeholder="Your comments" style="width:100%; height:100%;"/>
        </div> -->
        <div style="width:100%; height:30%">
             <div style="width:70%; height:100%; margin-right:25px;float:left;">
                <textarea class="form-control" type="text" rows="10" style="height:95%;" placeholder="Your comments"/>
             </div>
             <div style="width:25%; height:100%; margin-top:5px; float:left;">  
                <button type="button" class="btn btn-success">Comment</button> &nbsp; <button class="btn btn-primary">Like <i class="fa fa-thumbs-o-up"></i></button>
             </div>
             <div style="clear:both;"></div>
        </div>    
    </app-box>    
</template>

<script>
export default {
    data() {
        return {
            feedbackBoxHeader: "Feedback",
            comments:[],
            weight: 0
        }
    },
    created() {
        this.cardStyle = "height:100%";
        this.cardBlockStyle = "height:80%;"
        this.cardBlockContentStyle = "height:100%;"
    },
    mounted() {
        var linkInfo = this.$route.matched[0].props.linkInfo;
        this.comments = linkInfo.comments;
        this.weight = linkInfo.upvotes;
    }
}            
</script>

<style>
</style>