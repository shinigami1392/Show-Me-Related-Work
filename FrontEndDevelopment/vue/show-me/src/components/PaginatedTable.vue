<template>
  <app-box v-bind:boxHeaderProp="researchPapersBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
    <grid :data="papers " :move-pages="movePages" :start-row="startRow" :rows-per-page="rowsPerPage">
    </grid>

  </app-box>
</template>

<script>

import axios from "axios";

function getPapersFromId(vm) {
  let areaid = vm.$route.params.areaid
  axios
    .get(this.$store.state.IP_Config +`/domains/` + areaid)
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
      startRow: 0,
      rowsPerPage: 5,
      researchPapersBoxHeader: "Research Papers",
      papers: [],
      columns:["Title", "Author(s)"],
      cardStyle: "height:100%;",
      cardBlockStyle: "height:90%;",
      cardBlockContentStyle: "height:100%;"
    };
  },
  created() {

  },
  methods: {
    movePages: function(amount) {
      let newStartRow = this.startRow + amount * this.rowsPerPage;
      if (newStartRow >= 0 && newStartRow < this.papers.length) {
        this.startRow = newStartRow;
      }
    },
    resetStartRow: function() {
      this.startRow = 0;
    }
  },
  created() {
    getPapersFromId(this);
  },
  watch: {
    '$route'(to, from) {
      this.areaid = to.params.areaid;
    }
  }
};
</script>


<style>

</style>
