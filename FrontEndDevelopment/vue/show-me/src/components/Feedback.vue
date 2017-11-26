<template>
    <app-box v-bind:boxHeaderProp = "feedbackBoxHeader">
         <ul class="list-group">
              <li v-for="comment in comments" class="list-group-item comment">
                     {{comment.text}} <br/>
                     {{comment.user_name}}                                       
               </li>
                                                      
        </ul>   
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
    mounted() {
        var linkInfo = this.$route.matched[0].props.linkInfo;
        this.comments = linkInfo.comments;
        this.weight = linkInfo.weight;
    }
}            
</script>

<style>
</style>