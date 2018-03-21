<template>
  <div style="height:110%;">
    <app-box v-bind:boxHeaderProp="infoBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
      <table class="table">
        <tbody>
          <tr>
            <td> <b> Title </b></td>
            <td>{{paperInfo.name}}</td>
          </tr>
          <tr>
            <td> <b>Authors </b></td>
            <td>{{paperInfo.author}}</td>
          </tr>
          <tr>
            <td><b>Year </b></td>
            <td>{{paperInfo.year}}</td>
          </tr>
          <tr>
            <td><b> URL </b></td>
            <td>{{paperInfo.url}}</td>
          </tr>
        </tbody>
      </table>

      <!--test
      <table class="table">
      <tbody>
          <tr>
            <td>Title</td>
            <td>{{testPaperInfo.name}}</td>
          </tr>
          <tr>
            <td>Authors</td>
            <td>{{testPaperInfo.author}}</td>
          </tr>
          <tr>
            <td>Year</td>
            <td>{{testPaperInfo.year}}</td>
          </tr>
          <tr>
            <td>URL</td>
            <td>{{testPaperInfo.url}}</td>
          </tr>
        </tbody>
      </table>-->

    </app-box>
  </div>
</template>




<script>
import axios from "axios";
export default {
  data() {
    return {
      infoBoxHeader: "Paper Information",
      errors: [],
      paperInfo: {},
      testPaperInfo:{'name':'Machine learning','author':'CS Dojo','year':2002,'url':'www.example.com'}
    };
  },

  methods: {},
  watch: {
    $route(to, from) {
      this.paperInfo.id = to.params.paperid;
    }
  },
  created() {
    this.cardStyle = "height:100%";
    this.cardBlockStyle = "height:80%;";
    this.cardBlockContentStyle = "height:100%; overflow-y:auto;";
  },
  mounted() {
    this.paperInfo = this.$route.matched[0].props.paperInfo;
  }
};
</script>

<style>

</style>
