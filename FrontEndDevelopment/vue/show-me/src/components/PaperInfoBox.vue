<template>

<div>
 <app-box v-bind:boxHeaderProp = "infoBoxHeader">
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
      infoBoxHeader: "Paper Information",
      errors: [],
      paperInfo: {
        id: "p1",
        name: "paper_a",
        author: ["abc", "def"],
        year: 1993,
        url: `http://abc.com`,
        incoming_relations: [
          {
            id: "e13",
            source_id: "p3",
            source_name: "pqr",
            weight: 32
          },
          {
            id: "e12",
            source_id: "p2",
            source_name: "xyz",
            weight: 45
          }
        ],
        outgoing_relations: [
          {
            id: "e14",
            destination_id: "p4",
            destination_name: "mno",
            weight: 65
          },
          {
            id: "e15",
            destination_id: "p5",
            destination_name: "good",
            weight: 87
          }
        ]
      }
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
    //alert(this.$route.params.paperid);
    //getPaperInfo(this);
  }
};
</script>






<style>

</style>
