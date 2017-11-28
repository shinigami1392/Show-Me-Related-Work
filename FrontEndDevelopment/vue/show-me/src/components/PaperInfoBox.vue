<template>

<div style="height:100%;">
 <app-box v-bind:boxHeaderProp = "infoBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
 <span>Paper id is : {{$route.params.paperid}}</span>
 <table class="table">
    <tbody>
      <tr>
        <td>Title</td>
        <td>{{paperInfo.name}}</td>
      </tr>
      <tr>
        <td>Authors</td>
        <td>{{paperInfo.author}}</td>
      </tr>
      <tr>
        <td>Year</td>
        <td>{{paperInfo.year}}</td>
      </tr>
      <tr>
        <td>URL</td>
        <td>{{paperInfo.url}}</td>
      </tr>
    </tbody>
  </table>
</app-box>
</div>

</template>




<script>
import axios from "axios";
/*
function getPaperInfo(vm) {
  axios
    .get(`http://localhost:8000/`)
    .then(response => {
      vm.categories = response.data.categories;
      console.log("cl: " + vm.categories.length);
    })
    .catch(err => {
      vm.errors.push(err);
    });
}*/

export default {
  data() {
    return {
      infoBoxHeader: "Paper Information",
      errors: [],
      paperInfo: {}
    };
  },

  methods: {},
  watch: {
    $route(to, from) {
      this.paperInfo.id = to.params.paperid;
      //   alert(to.params.paperid);
    }
  },
  created() {
        this.cardStyle = "height:100%";
        this.cardBlockStyle = "height:80%;";
        this.cardBlockContentStyle = "height:100%; overflow-y:auto;";
  },
  mounted() {
    console.log("PaperInfoBox mounted");
    this.paperInfo = this.$route.matched[0].props.paperInfo;
  }
};
</script>






<style>

</style>
