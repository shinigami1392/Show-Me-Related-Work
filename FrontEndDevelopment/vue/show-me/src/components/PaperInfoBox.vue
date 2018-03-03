<template>
  <div style="height:100%;">
    <app-box v-bind:boxHeaderProp="infoBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
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

        <!-- TEST-->
    <ul class="list-group">
      <li v-for="paper in testPaperInfo" class="list-group-item">
        {{ paper.name }} | {{ paper.author }} | {{ paper.year }} | {{paper.url}}
      </li>
    </ul>
  

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
      testPaperInfo:[{'name':'Genetic Algorithms and Machine Learning','author':'David E. GoldbergJohn H. Holland','year':1988,'url':'www.example.com'},
      {'name':'Machine Learning for High-Speed Corner Detection','author':'Edward RostenTom Drummond','year':2006,'url':'www.example.com'},
      {'name':'Analysis of gray level corner detection','author':'Khwang Teoh','year':1999,'url':'www.example.com'},
      {'name':'Machine learning','author':'CS Dojo','year':2002,'url':'www.example.com'}]

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
