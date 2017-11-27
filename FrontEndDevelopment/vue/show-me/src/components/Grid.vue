<template>
<div>
  <table class="table">
    <thead class="h6">
      <th>Name</th>
      <th>Authors</th>
      <th>Year</th>
      <th>URL</th>
      <th>Citations</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="paper in limitBy(data,rowsPerPage,startRow)">
        <td><router-link :to="{ name:'paperInfo', params:{ areaid:$route.params.areaid, paperid:paper.id }}">{{  paper.name }}</router-link></td>
        <td>{{ paper.author }}</td>
        <td>{{ paper.year }}</td>
        <td><a href='${paper.url}'>{{ paper.url }}</a></td>
        <td>{{ paper.no_of_citations }}</td>
      </tr>
    </tbody>
  </table>
  <div id="page-navigation">
    <button type="button" class="btn btn-outline-dark btn-sm" @click="movePages(-1)">Back</button>
    <p>{{startRow / rowsPerPage + 1}} out of {{Math.ceil(data.length / rowsPerPage)}}</p>
    <button type="button" class="btn btn-outline-dark btn-sm" @click="movePages(1)">Next</button>
  </div>
</div>
</template>


<script>
export default {
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
}

#page-navigation p {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}

</style>
