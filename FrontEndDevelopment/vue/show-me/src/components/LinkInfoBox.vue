<template>

<div>
 <app-box v-bind:boxHeaderProp = "infoBoxHeader">
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
}

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
      //   alert(to.params.paperid);
    }
  },
  mounted() {
    //alert(this.$route.params.paperid);
    //getPaperInfo(this);
         this.linkInfo = this.$route.matched[0].props.linkInfo;
  }
};
</script>






<style>

</style>
