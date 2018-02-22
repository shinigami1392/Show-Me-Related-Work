<template>
  <div style="height:100%;">
    <app-box v-bind:boxHeaderProp="infoBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
      <!--<table class="table">
        <tbody>
          <tr>
            <td>Source Paper</td>
            <td>{{linkInfo.relation.source_name}}</td>
          </tr>
          <tr>
            <td>Destination Paper</td>
            <td>{{linkInfo.relation.destination_name}}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{{linkInfo.relation.upvotes}}</td>
          </tr>
        </tbody>
      </table>-->

      <!-- TEST -->
      <table class="table">
        <tbody>
          <tr>
            <td>Source Paper</td>
            <td>{{testLinkInfo.relation.source_name}}</td>
          </tr>
          <tr>
            <td>Destination Paper</td>
            <td>{{testLinkInfo.relation.destination_name}}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{{testLinkInfo.relation.upvotes}}</td>
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
      testLinkInfo: {'relation': {'source_name':'Methods in machine learning', 'destination_name':'art of machine learning','upvotes':12}}
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
    this.linkInfo = this.$route.matched[0].props.linkInfo;
  }
};
</script>

<style>

</style>
