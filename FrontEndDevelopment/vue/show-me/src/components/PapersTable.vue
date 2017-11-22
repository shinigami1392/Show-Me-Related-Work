<template>

<div>
<span>Catagory id is : {{$route.params.areaid}}</span>
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Authors</th>
      <th>Year</th>
      <th>URL</th>
      <th>CitaTions</th>
    </tr>
  </thead>
  <tbody>
   <tr v-for="paper in papers">
        <td><router-link :to="{ name:'paperInfo', params:{ areaid:$route.params.areaid, paperid:paper.id }}">{{  paper.name }}</router-link></td>
        <td>{{ paper.author }}</td>
        <td>{{ paper.year }}</td>
        <td>{{ paper.url }}</td>
        <td>{{ paper.no_of_citations }}</td>
    </tr>
  </tbody>
</table>
 
<router-view></router-view>

</div>

</template>


<script>
import axios from "axios";

function getPapersFromId(vm){
    let areaid = vm.$route.params.areaid
    axios
    .get(`http://localhost:8000/`+areaid)
    .then(response => {
      vm.papers = response.data.categories;
    })
    .catch(err => {
      vm.errors.push(err);
    });
}





export default {

  data() {
    return {
      areaid : this.$route.params.areaid,
      errors : [],
      papers: [
        {
          id: 1,
          name: "ABC",
          author: ["abc", "def"],
          year: 2001,
          url: `http://abc.com`,
          no_of_citations: 7
        },
        {
          id: 2,
          name: "xyz",
          author: ["abc", "xyz"],
          year: 4566,
          url: `http://xyz.com`,
          no_of_citations: 37
        },
        {
          id: 3,
          name: "xcv",
          author: ["xcv", "def"],
          year: 8547,
          url: `http://xcv.com`,
          no_of_citations: 76
        },
        {
          id: 4,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }
      ]
    };
  },

  watch:{
      '$route'(to,from){
        this.areaid = to.params.areaid;
        //   alert(to.params.catId);
      }
  },

  methods: { },

  created(){
      //alert(this.$route.params.catId);
      //getPapersFromId(this);
  }
  
};
</script>

<style>

</style>
