<template>
  <div>
    <app-box class="md-elevation-5" v-bind:boxHeaderProp="infoBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
      <table class="table">
        <tbody>
          <tr>
              <div style="width:25%; margin-top:5px; float:left;">
              <td><i class="fa fa-thumbs-up" id="upvoteButton" style="font-size:24px; color:gray"  v-on:click="userObject.authorized ? addRemoveUpvote():showErrMsg()"></i></td>              
              <td> <span><b>{{this.upvotesCount}}</b></span>  </td>              
              <td><i class="fa fa-thumbs-down" id="downvoteButton" style="font-size:24px; color:gray" v-on:click="userObject.authorized ?addRemoveDownvote():showErrMsg()"></i></td>
              <td> <span><b>{{this.downvotesCount}}</b></span></td>
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
    </app-box>

  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
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
      downvoteButtonClicked :false,
    };
  },

  methods: {},
  watch: {
    $route(to, from) {
      this.linkInfo.id = to.params.linkid;
    }
  },
  created() {
    this.cardStyle = "height:100%;";
    this.cardBlockStyle = "height:80%;"
    this.cardBlockContentStyle = "height:100%; overflow-y:auto; overflow-x: hidden"
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
    /*this.upvotesCount = this.$route.matched[0].props.linkInfo.relation.upvotes;
    this.downvotesCount = this.$route.matched[0].props.linkInfo.relation.downvotes;
    this.source = this.$route.matched[0].props.linkInfo.sourceTitle;
    this.destination = this.$route.matched[0].props.linkInfo.destinationTitle;
    console.log(this.upvotesCount); */
     
    //this.linkInfo = this.$route.matched[0].props.linkInfo;    
  },
  methods:{
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
};
</script>

<style>

</style>
