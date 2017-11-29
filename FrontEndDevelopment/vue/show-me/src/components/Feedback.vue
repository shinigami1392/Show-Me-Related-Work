<template>
    <app-box v-bind:boxHeaderProp = "feedbackBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
         <div style="width:100%; height:66%">
         <ul class="list-group" style="height:100%; overflow-y:auto;">
              <li>Good</li>
              <li>Teekh Hain</li>
              <li>Bahut Acha Hain</li>    
              <li>Good</li>
              <li>Teekh Hain</li>
              <li>Bahut Acha Hain</li>                                         
        </ul>
        </div>   
        <div style="width:100%; height:34%">
             <textarea class="form-control" type="text" rows="1" placeholder="Your comments" style="width:100%; height:100%;"/>
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
        this.weight = linkInfo.weight;
    }
}            
</script>

<style>
</style>