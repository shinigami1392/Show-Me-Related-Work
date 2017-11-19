<template>
  <ul class="list-group" v-if="categories && categories.length">
    <li v-for="category in categories" class="list-group-item">
      <a href="#"> {{ category.name }} </a>
      <span class="badge badge-primary badge-pill">{{ category.count }}</span>
    </li>
  </ul>
</template>

<script>
import axios from "axios";

function getPaperCatagories(vm) {
  axios
    .get(`http://localhost:8000/`)
    .then(response => {
      vm.categories = response.data.categories;
      console.log("cl: "+vm.categories.length);
    })
    .catch(err => {
      vm.errors.push(err);
    });
}

export default {
  data() {
    return {
      categories: [],
      errors: []
    };
  },

  methods: {},

  created() {
    getPaperCatagories(this);
  }
};
</script>


<style>

</style>
