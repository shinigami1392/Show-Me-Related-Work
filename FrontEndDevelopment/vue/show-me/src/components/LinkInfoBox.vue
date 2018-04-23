<template>
  <div>
    <app-box v-bind:boxHeaderProp="infoBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
      <table class="table">
        <tbody>
          <tr>
            <td>Source Paper</td>
            <td>{{linkInfo.sourceTitle}}</td>
          </tr>
          <tr>
            <td>Destination Paper</td>
            <td>{{linkInfo.destinationTitle}}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{{linkInfo.relation.upvotes - linkInfo.relation.downvotes}}</td>
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
      linkInfo: {}
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
