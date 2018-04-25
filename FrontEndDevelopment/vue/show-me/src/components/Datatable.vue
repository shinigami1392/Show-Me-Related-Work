<template>
    <app-box v-bind:boxHeaderProp="researchPapersBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
        <table id ='dtable' style="width:100%;">
            <thead>
                <tr>
                    <th v-for="column in columns">{{column}}</th>
                <tr> 
                 <tr v-for="paper in papers">
                    <td><router-link :to="{ name:'paperInfo', params:{ areaid:$route.params.areaid, paperid:paper.id }}">{{ paper.title }}</router-link></td>
                    <td>{{paper.authors}}</td>
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
        created(){
            var domains = this.$store.state.domains;
            for(var i = 0 ; i < domains.length; i++){
                if(domains[i].id !== undefined && domains[i].id == this.$route.params.areaid){
                    this.researchPapersBoxHeader = "Research Papers in "+domains[i].name;
                    break;
                }
            }
        },
        mounted(){
           var vm = this;
           $('#dtable').DataTable({
                "processing" : true,
                "serverSide" : true,
                "deferRender": true,
                "paging" : true,
                "searching": false,
                "ordering": false,
				"ajax" : {
					"url": "http://54.201.123.246:8081/domains/papers",
                    "contentType":"application/json",
                    "type": "POST",
                    "data": function ( d ) {
                        d.areaid = vm.$route.params.areaid
                        return JSON.stringify(d);
                    },
                   "dataSrc": function ( json ) {
                        vm.papers = [];
                        if(json.data && json.data.length > 0){
                            vm.columns = ["Title","Authors"];
                        }
                        for ( var i=0, len=json.data.length ; i<len ; i++ ) {
                            var obj = {};
                            obj.id = json.data[i][0];
                            obj.title = json.data[i][1];
                            obj.authors = json.data[i][2];
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
                        }
                ] 
           });
        }
    }
</script>


<style>


</style>