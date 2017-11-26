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
      linkInfo: {
        id: "e12",
        source_id: "p1",
        source_name: "paper 1",
        destination_id: "p2",
        destination_name: "paper 2",
        weight: 32,
        comments: [
          {
            id: "cmt1",
            user_name: "lucifer",
            timestamp: "some time",
            text: `good relation, I am happy`
          }
        ]
      }
    };
  },

  methods: {},
  watch: {
    $route(to, from) {
      this.linkInfo.id = to.params.linkid;
      //   alert(to.params.paperid);
    }
  },
  created() {
    //alert(this.$route.params.paperid);
    //getPaperInfo(this);
  }
};
</script>






<style>

</style>
