<template>
  <div>
  <ul class="list-group" v-if="catagories && catagories.length">
    <li v-for="catagory in catagories" class="list-group-item justify-content-between">
      {{ catagory.name }}
      <span class="badge badge-primary badge-pill">{{ catagory.count }}</span>
    </li>
  </ul>

  <ul v-if="errors && errors.length">
    <li v-for="error in errors">
      {{error.message}}
    </li>
  </ul>
  </div>
</template>

<script>
import axios from "axios";

function getPaperCatagories(vm) {
  axios
    .get(`http://localhost:8000/`)
    .then(response => {
      vm.catagories = response.data.categories;
    })
    .catch(err => {
      vm.errors.push(err);
    });
}

export default {
  data() {
    return {
      catagories: [],
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
