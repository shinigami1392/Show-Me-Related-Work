<template>
<div style="height:100%;">
  <div style="height:80%; overflow-y:auto;">
  <table class="table">
    <thead class="h6">
      <th>Name</th>
      <th>Authors</th>
    </thead>
    <tbody>
      <tr v-for="paper in limitBy(data,rowsPerPage,startRow)">
        <td><router-link :to="{ name:'paperInfo', params:{ areaid:$route.params.areaid, paperid:paper.id }}">{{  paper.title }}</router-link></td>
        <td>{{ (paper.authors).toString().slice(0,-1) }}</td>
      </tr>
    </tbody>
  </table>
  </div>
  <div id="page-navigation">
    <button type="button" class="btn btn-outline-dark btn-sm" @click="movePages(-1)">Back</button>
    <p id="paginator">
      {{startRow / rowsPerPage + 1}} out of {{Math.ceil(data.length / rowsPerPage)}}
    </p>
    <button type="button" class="btn btn-outline-dark btn-sm" @click="movePages(1)">Next</button>
     <ul class="list-group">
      <li v-for="paper in testData" class="list-group-item">
        {{ paper.title }} | {{ paper.authors }}
      </li>
    </ul>
  </div>
  <div>
    <ul class="list-group">
      <li v-for="paper in testData" class="list-group-item">
        {{ paper.title }} | {{ paper.authors }}
      </li>
    </ul>
  </div>
   
</div>
</template>


<script>
export default {
  data() {
    return {
      testData: [{'title':'A threshold selection method from gray-level histograms','authors':'N Otsu'},
                  {'title':"Pattern Analysis and Machine Intelligence",'authors':"J Canny"},
                  {'title':"Pattern Analysis and Machine",'authors':"Geman"},
                  {'title':"Workshop on statistical",'authors':"Willamowski"}]
    };
  },
  props: {
    data: Array,
    movePages: Function,
    startRow: Number,
    rowsPerPage: Number
  },

  methods:{
    limitBy(data,rowsPerPage,startRow) {
        if(startRow > 0 && startRow <= data.length){
            rowsPerPage = startRow + rowsPerPage;
        }
        data = data.slice(startRow, rowsPerPage)
        return data;
    }
  }
}
</script>


<style>
#page-navigation {
    display: -webkit-flex; /* Safari */
    -webkit-align-items: center; /* Safari 7.0+ */
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
}

#page-navigation p {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}


</style>
