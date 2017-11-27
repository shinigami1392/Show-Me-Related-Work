<template>
  <app-box v-bind:boxHeaderProp = "researchPaperAndRelationsBoxHeader">
    <span>Catagory id is : {{$route.params.areaid}}</span>
    <grid :data="gridData "  :move-pages="movePages" :start-row="startRow" :rows-per-page="rowsPerPage">
    </grid>
  </app-box>

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
      startRow: 0,
      rowsPerPage: 5,
      researchPaperAndRelationsBoxHeader: "Research Papers and References",
      gridData: [
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
        },
        {
          id: 5,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        },
        {
          id: 6,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        },
        {
          id: 7,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        },
        {
          id: 8,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        },
        {
          id: 9,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        },
        {
          id: 10,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        },
        {
          id: 11,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        },
        {
          id: 13,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 14,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 15,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 16,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 17,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 18,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 19,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 20,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 21,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 22,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 23,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        }, {
          id: 24,
          name: "qwe",
          author: ["abc", "qwe"],
          year: 8665,
          url: `http://qwe.com`,
          no_of_citations: 137
        },
      ]
    };
  },

  methods: {
    movePages: function(amount) {
      let newStartRow = this.startRow + amount * this.rowsPerPage;
      console.log(newStartRow);
      if (newStartRow >= 0 && newStartRow < this.gridData.length) {
        this.startRow = newStartRow;
      }
    },
    resetStartRow: function() {
      this.startRow = 0;
    }
  },
  watch:{
      '$route'(to,from){
        this.areaid = to.params.areaid;
        //   alert(to.params.catId);
      }
  }
};
</script>


<style>

</style>
