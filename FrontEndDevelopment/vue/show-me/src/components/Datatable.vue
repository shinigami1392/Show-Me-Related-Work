<template>
    <app-box v-bind:boxHeaderProp="researchPapersBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
        <table id ='dtable'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author(s)</th>
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
                cardBlockContentStyle: "height:100%;"
            };
        },
        mounted(){
           var vm = this;
           console.log("Mounted");
           $('#dtable').DataTable({
                "processing" : true,
                "serverSide" : true,
                "deferRender": true,
                "paging" : true,
                "searching": false,
                "ordering": false,
				"ajax" : {
					"url": "http://localhost:8081/domains/papers",
                    "contentType":"application/json",
                    "type": "POST",
                    "data": function ( d ) {
                        d.areaid = vm.$route.params.areaid
                        console.log("Here");
                        return JSON.stringify(d);
                    },
                    "dataType": "json",
                    "columns" : [ 
					    { 'data' : 'title' }, 
                        { 'data' : 'author'}
                    ]
                } 
           });
        }
    }
</script>


<style>


</style>