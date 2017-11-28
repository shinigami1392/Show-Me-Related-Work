<template>

<div style="height:100%;">
 <app-box v-bind:boxHeaderProp = "infoBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle"  v-bind:cardBlockContentStyle="cardBlockContentStyle">
 <span>Link id is : {{$route.params.linkid}}</span>
 <table class="table">
    <tbody>
      <tr>
        <td>Source Paper</td>
        <td>{{linkInfo.source_name}}</td>
      </tr>
      <tr>
        <td>Destination Paper</td>
        <td>{{linkInfo.destination_name}}</td>
      </tr>
      <tr>
        <td>Weight</td>
        <td>{{linkInfo.weight}}</td>
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
    },
  mounted() {
         this.linkInfo = this.$route.matched[0].props.linkInfo;
  }
};
</script>






<style>

</style>
