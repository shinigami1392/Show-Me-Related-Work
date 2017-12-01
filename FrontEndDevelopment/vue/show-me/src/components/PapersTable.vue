<template>
  <div>
    <app-box v-bind:boxHeaderProp="researchPaperAndRelationsBoxHeader">
      <!--<span>Catagory id is : {{$route.params.areaid}}</span>-->
      <table class="table">
        <thead>
          <tr class="h6">
            <th>Name</th>
            <th>Authors</th>
            <th>Year</th>
            <th>URL</th>
            <th>Citations</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paper in papers">
            <td>
              <router-link :to="{ name:'paperInfo', params:{ areaid:$route.params.areaid, paperid:paper.id }}">{{ paper.title }}</router-link>
            </td>
            <td>{{ paper.authors }}</td>
            <td>{{ paper.date }}</td>
            <td>
              <a href='${paper.url}'>{{ paper.url }}</a>
            </td>
            <td>{{ paper.no_of_citations }}</td>
          </tr>
        </tbody>
      </table>
    </app-box>
  </div>
</template>


<script>
import axios from "axios";

function getPapersFromId(vm) {
  let areaid = vm.$route.params.areaid
  axios
    .get(`http://localhost:8081/domains/` + areaid)
    .then(response => {
      vm.papers = response.data.papers;
    })
    .catch(err => {
      vm.errors.push(err);
    });
}





export default {

  data() {
    return {
      researchPaperAndRelationsBoxHeader: "Research Papers and References",
      areaid: this.$route.params.areaid,
      errors: [],
      papers: []
    };
  },

  watch: {
    '$route'(to, from) {
      this.areaid = to.params.areaid;
    }
  },

  methods: {},

  created() {
    getPapersFromId(this);
  }

};
</script>

<style>

</style>
