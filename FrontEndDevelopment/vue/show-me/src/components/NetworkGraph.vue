<template>
    <app-box v-bind:boxHeaderProp = "graphBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
        <div class="container" style="height:100%;">
        <div class="row" style="height:100%;">
        <div class="col-md-8" style="height:100%;">
        <div id = "details" style="height:100%;">
        </div>
        </div>
        
        <div class="col-md-4" style="padding: 0px 0px;">
            <!--<button class="btn btn-primary" type="button" v-on:click='isOpen = !isOpen' >
                    View Legend
            </button>
            <br/>-->
            <div style="height:100%; width:inherit;">
                        <!--<table id ="legend" class="table table-condensed" style="height:100%;">
                            <thead><tr><th>Paper Id</th><th>Paper Name</th></tr></thead>
                            <tbody>
                            <tr v-if="graphLegendElements && graphLegendElements.length" v-for="graphElement in graphLegendElements">
                                <td class="small">{{ graphElement.id }}</td><td class="small">{{ graphElement.name }}</td>
                            </tr>
                            </tbody>       
                        </table>-->
                        <div class="legendTable" style="height:100%; width:inherit;">
                             <div class="tblHead" style="width:inherit;">
                                 <div class="tblRow" style="width:inherit;">
                                    <div class="divCell">Paper Id </div>
                                    <div class="divCell">Paper Name </div>
                                 </div>
                              </div>   
                              <div class="tblBody" style="width:inherit;">
                                  <div class="tblRow" style="width:inherit;">
                                            <div class="divCell">1</div>
                                            <div class="divCell">Paper 1</div>
                                   </div>  
                                     <div class="tblRow">
                                            <div class="divCell">2</div>
                                            <div class="divCell">Paper 2</div>
                                   </div>  
                                     <div class="tblRow">
                                            <div class="divCell">3</div>
                                            <div class="divCell">Paper 3</div>
                                   </div>   
                              </div>    
                         </div>
            </div>
         </div> 
         </div>
        </div>        
    </app-box>    
</template>

<script>


function plotGraph(vm, paperInfo){

    var nodes = [];
    var edges = [];
    var graph_elements = [];
    var legend_elements = [];

    nodes.push({data:{id:paperInfo.id}});
    legend_elements.push({id:paperInfo.id, name:paperInfo.name});

    for(var i = 0; i < paperInfo.incoming_relations.length ; i++){
        var nodeObj = { 
            data:{id:''}
        };

        var edgeObj = {
            data:{id:'',source:'',target: paperInfo.id}
        }
    
        nodeObj.data.id = paperInfo.incoming_relations[i].source_id;
        legend_elements.push({id:paperInfo.incoming_relations[i].source_id, name:paperInfo.incoming_relations[i].source_name});
        
        edgeObj.data.id = paperInfo.incoming_relations[i].id;
        edgeObj.data.source = paperInfo.incoming_relations[i].source_id;
        nodes.push(nodeObj);
        edges.push(edgeObj);
    }

    for(var i = 0; i < paperInfo.outgoing_relations.length ; i++){
        var nodeObj = { 
            data:{id:''}
        };

        var edgeObj = {
            data:{id:'',source:paperInfo.id, target:''}
        }
    
        nodeObj.data.id = paperInfo.outgoing_relations[i].destination_id;
        legend_elements.push({id:paperInfo.outgoing_relations[i].destination_id, name:paperInfo.outgoing_relations[i].destination_name});

        edgeObj.data.id = paperInfo.outgoing_relations[i].id;
        edgeObj.data.target = paperInfo.outgoing_relations[i].destination_id;
        nodes.push(nodeObj);
        edges.push(edgeObj);
    }
    console.log(JSON.stringify(nodes));
    console.log(JSON.stringify(edges));

    graph_elements.push.apply(graph_elements, nodes);
    graph_elements.push.apply(graph_elements, edges);
    console.log(JSON.stringify(graph_elements));
    console.log("Inside plotGraph");

    vm.graphLegendElements = legend_elements;
    var cy = cytoscape({
            container: document.getElementById('details'), // container to render in
            elements:graph_elements,
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#ff0000',
                        'label': 'data(id)',
                        'width': '30px',
                        'height': '30px'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1,
                        'line-color': '#ff0000',
                        'curve-style': 'bezier',
                        'target-arrow-color': '#ff0000',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],
            layout: {
                name: 'circle'//,
                //rows: 2
            }
        });

        cy.getElementById(paperInfo.id).style( 'background-color', 'yellow' );
        return cy;
}



export default {
    data() {
        return {
            graphBoxHeader: "Network Graph",
            graphElements:[],
            graphLegendElements:[],
            isOpen:false
        }
    },
    created() {
        this.cardStyle = "height:100%";
        this.cardBlockStyle = "height:90%;"
        this.cardBlockContentStyle = "height:100%;"
    },
    mounted() {
        //console.log(this.$route.matched[0].props.text);
        
        console.log("Component Route: ");
        console.log(this.$route)
        var paperInfo = this.$route.matched[0].props.paperInfo;
        console.log("Router:");
        console.log(this.$router);
        var router = this.$router;
        var route = this.$route;

        var cy = plotGraph(this, paperInfo);
         cy.on('tap', 'node', function (evt) {
            var selectedNodeId = evt.target.id();
            console.log('Node Id: '+selectedNodeId);
            router.replace('/areas/'+route.params.areaid+'/paper/'+selectedNodeId);
         });
          cy.on('mouseover', 'node', function (evt) {
            var selectedNodeId = evt.target.id();
            console.log('Mouseover Node Id: '+selectedNodeId);
            cy.getElementById(selectedNodeId).style( 'height', '40px' );
            cy.getElementById(selectedNodeId).style( 'width', '40px' );
            //cy.getElementById(selectedNodeId).style('cursor','pointer');
         });
          cy.on('mouseout', 'node', function (evt) {
            var selectedNodeId = evt.target.id();
            console.log('Mouseout Node Id: '+selectedNodeId);
            cy.getElementById(selectedNodeId).style( 'height', '30px' );
            cy.getElementById(selectedNodeId).style( 'width', '30px' );
            //cy.getElementById(selectedNodeId).style('cursor','default');
         });

          cy.on('tap', 'edge', function (evt) {
            var selectedEdgeId = evt.target.id();
            console.log('Edge Id: '+selectedEdgeId);
            router.replace('/areas/'+route.params.areaid+'/paper/'+route.params.paperid+'/links/'+selectedEdgeId);
         });
    }
  
};


</script>

<style>
   #details {
      
        height: 350px;
        width: 600px;
        display: block;
  }
 #legend{
     border: 1px solid #999
 }
 #legend_elements_list{
     list-style: none;
 }
 
 .legendTable{
     display:  table;
     border:1px solid  #666666;
     width:auto;
 }
 .tblRow
    {
       display: table-row;
       width: auto;
       clear: both;
       border:1px solid  #666666;
    }

 .divCell{
     float:left;/*fix for  buggy browsers*/
     display:table-column;
     border:1px solid  #666666;
 }
</style>