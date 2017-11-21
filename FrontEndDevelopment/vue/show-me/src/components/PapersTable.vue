<template>

<div>
<span>Catagory id is : {{$route.params.catId}}</span>
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
        <td><router-link :to="`/graph/paper/${paper.id}`">{{  paper.name }}</router-link></td>
        <td>{{ paper.author }}</td>
        <td>{{ paper.year }}</td>
        <td>{{ paper.url }}</td>
        <td>{{ paper.no_of_citations }}</td>
    </tr>
  </tbody>
</table>
 


</div>

</template>


<script>
import axios from "axios";

function getPapersFromId(vm){
    let catId = vm.$route.params.catId
    axios
    .get(`http://localhost:8000/`+catId)
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
      catId : this.$route.params.catId,
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
          name: "ABC",
          author: ["abc", "def"],
          year: 2001,
          url: `http://abc.com`,
          no_of_citations: 7
        },
        {
          id: 3,
          name: "ABC",
          author: ["abc", "def"],
          year: 2001,
          url: `http://abc.com`,
          no_of_citations: 7
        },
        {
          id: 4,
          name: "ABC",
          author: ["abc", "def"],
          year: 2001,
          url: `http://abc.com`,
          no_of_citations: 7
        }
      ]
    };
  },

  watch:{
      '$route'(to,from){
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
