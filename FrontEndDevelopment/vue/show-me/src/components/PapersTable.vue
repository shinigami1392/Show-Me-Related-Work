<template>

<div>
<span>Paper id is : {{$route.params.paperId}}</span>
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
        <td>{{ paper.name }}</td>
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
    let paperId = vm.$route.params.paperId
    axios
    .get(`http://localhost:8000/`+paperId)
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
      paperId : this.$route.params.paperId,
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
        //   alert(to.params.paperId);
      }
  },

  methods: { },

  created(){
      //alert(this.$route.params.paperId);
      //getPapersFromId(this);
  }
  
};
</script>

<style>

</style>
