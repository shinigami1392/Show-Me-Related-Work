<template>
  <div style="height:auto;">
    <app-box class="md-elevation-5" v-bind:boxHeaderProp="infoBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
      <table class="table">
        <tbody>
          <tr>
            <td class="table-success table-back md-subheading"> Title </td>
            <td class="table-success table-back-text md-subheading">{{paperInfo.name}}</td>
          </tr>
          <tr>
            <td class="table-success table-back md-subheading"> Authors </td>
            <td class="table-success table-back-text md-subheading">{{paperInfo.author}}</td>
          </tr>
          <tr>
            <td class="table-success table-back md-subheading">Year </td>
            <td class="table-success table-back-text md-subheading">{{paperInfo.year}}</td>
          </tr>
          <tr>
            <td class="table-success table-back md-subheading"> URL </td>
            <td class="table-success table-back-text md-subheading">{{paperInfo.url}}</td>
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
.table-back{
    background-color:#ececec;
    color:#000
}
.table-back-text{
    background-color:#f5f5f5;
}

</style>
