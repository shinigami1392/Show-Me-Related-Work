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
               <!-- <tr>
                    <td>Multimedia Web Databases</td>
                    <td>Selcuk Candan</td>
                </tr>
                <tr>
                    <td>Aritificial Intelligence</td>
                    <td>Khambapatti</td>    
                </tr>    -->
            </tbody>    
        </table>
    </app-box> 
</template>

<script>
    export default {
        data() {
            return {
                /*columns: [],
                data: Array,
                url: String */
                researchPapersBoxHeader: "Research Papers",
                cardStyle: "height:100%;",
                cardBlockStyle: "height:90%;",
                cardBlockContentStyle: "height:100%;"
            };
        },
        mounted(){
           var vm = this;
           $('#dtable').DataTable({
                "processing" : true,
                "serverSide" : true,
                "deferRender": true,
				"ajax" : {
					"url": "http://localhost:8081/domains/papers",
                    "contentType":"application/json",
                    "type": "POST",
                    "data": function ( d ) {
                        d.areaid = vm.$route.params.areaid
                        return JSON.stringify(d);
                    },
                    "dataType": "json",
                    "dataSrc": function (json) {
                            console.log("Inside"); 
                           /*var displayData = new Array();
                            displayData.push({'title':'Multimedia Web Databases','author':'Selcuk Candan'});
                            displayData.push({'title':'Artificial Intelligence','author':'Khambapatti'})
                            return displayData; */
                              /*var displayData = new Object();
                     displayData["draw"] = 1;
                     displayData["recordsTotal"] = 2;
                     displayData["recordsTotal"] = 2;
                     displayData["data"] = new Array();
                       
                     var displayArray = new Array();
                     displayArray.push("Multimedia Web Databases");
                     displayArray.push("Selcuk Candan");
                     displayData["data"].push(displayArray);

                     displayArray = new Array();
                     displayArray.push("Artificial Intelligence");
                     displayArray.push("Khambapatti");
                     displayData["data"].push(displayArray);
                     return displayData;*/
                    var displayData = {
                        "draw": 1,
                        "recordsTotal": 2,
                        "recordsFiltered": 2 ,
                        "data": [
                            [   "Multimedia Web Databases",
                                "Selcuk Candan"
                            ],
                            [   "Artificial Intelligence",
                                "Khambapatti"
                            ]
                        ]
                    }
                    return displayData;
                    }
				},
				"columns" : [ 
					{ 'data' : 'title' }, 
                    { 'data' : 'author'}
                ]
           });
           // $(this.$el).DataTable();
        }
    }
</script>


<style>


</style>