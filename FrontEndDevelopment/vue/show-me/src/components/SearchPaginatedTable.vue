<template>
    <app-box v-bind:boxHeaderProp="researchPapersBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
        <table id ='dtable' style="width:100%;" class="table md-subheading">
            <thead class="thead-light">
                  
                <tr>
                    <th v-for="column in columns">{{column}}</th>
                <tr> 
                 <tr v-for="paper in papers">
                    <td><router-link :to="{ name:'paperInfo', params:{ areaid:paper.domainId, paperid:paper.id }}">{{ paper.title }}</router-link></td>
                    <td>{{paper.authors}}</td>
                    <td>{{paper.year}}</td>
                    <td>{{paper.stream}}</td>
                 </tr>
            </thead>
            <tbody>
            </tbody>    
        </table>
    </app-box> 
</template>

<script>
    export default {
        data() {
            return {
                researchPapersBoxHeader: "Research Papers",
                cardStyle: "height:100%;",
                cardBlockStyle: "height:90%; overflow-y:scroll;",
                cardBlockContentStyle: "height:100%;",
                papers:[],
                columns: []
            };
        },
        mounted(){
            var vm = this;
            vm.researchPapersBoxHeader = "Research Papers [Search Results for \""+vm.$route.query.q+"\"]"
            $('#dtable').DataTable({
                "processing" : true,
                "serverSide" : true,
                "deferRender": true,
                "paging" : true,
                "searching": false,
                "ordering": false,
				"ajax" : {
					"url": "http://54.201.123.246:8081/search/papers",
                    "contentType":"application/json",
                    "type": "POST",
                    "data": function ( d ) {
                        d.text = vm.$route.query.q
                        return JSON.stringify(d);
                    },
                   "dataSrc": function ( json ) {
                        vm.papers = [];
                        if(json.data && json.data.length > 0){
                            vm.columns = ["Title","Authors","Year","Stream"];
                        }
                        for ( var i=0, len=json.data.length ; i<len ; i++ ) {
                            var obj = {};
                            obj.id = json.data[i][0];
                            obj.title = json.data[i][1];
                            obj.authors = json.data[i][2];
                            obj.year = json.data[i][3];
                            obj.domainId = json.data[i][4];
                            obj.stream = json.data[i][5];
                            vm.papers.push(obj);
                        }
                      return json.data;

                    },
                    "dataType": "json",
                },
                "columnDefs": [
                        {
                          "targets": [ 0 ],
                          "visible": false
                        },
                        { "targets": [ 1 ],
                          "visible": false  
                        },
                        { "targets": [ 2 ],
                          "visible": false  
                        },
                        {                        
                          "targets": [ 3 ],
                          "visible": false
                        },
                        { "targets": [ 4 ],
                          "visible": false  
                        },
                        { "targets": [ 5 ],
                          "visible": false  
                        }
                ] 
           });
        }
    }
</script>


<style>


</style>