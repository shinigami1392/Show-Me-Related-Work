<template>
    <app-box v-bind:boxHeaderProp = "graphBoxHeader">
        <div id = "details">
        </div>
    </app-box>    
</template>

<script>

function fetchPaperInfo(vm, paperInfo){

//var paperInfo =  {"id":"p1","name":"paper_a","author":["abc","def"],"year":1993,"url":"http://abc.com","incoming_relations":[{"id":"e13","source_id":"p3","source_name":"pqr","weight":32},{"id":"e12","source_id":"p2","source_name":"xyz","weight":45}],"outgoing_relations":[{"id":"e14","destination_id":"p4","destination_name":"mno","weight":65},{"id":"e15","destination_id":"p5","destination_name":"good","weight":87}]};
var nodes = [];
var edges = [];
var elements = [];
nodes.push({data:{id:paperInfo.id}});
for(var i = 0; i < paperInfo.incoming_relations.length ; i++){
    var nodeObj = { 
        data:{id:''}
    };

    var edgeObj = {
        data:{id:'',source:'',target: paperInfo.id}
    }
    
    nodeObj.data.id = paperInfo.incoming_relations[i].source_id;
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
    edgeObj.data.id = paperInfo.outgoing_relations[i].id;
    edgeObj.data.target = paperInfo.outgoing_relations[i].destination_id;
    nodes.push(nodeObj);
    edges.push(edgeObj);
}
console.log(JSON.stringify(nodes));
console.log(JSON.stringify(edges));

elements.push.apply(elements, nodes);
elements.push.apply(elements, edges);
console.log(JSON.stringify(elements));
vm.graphElements = elements;
}

function plotGraph(vm, paperInfo){

    var nodes = [];
    var edges = [];
    var graph_elements = [];
    nodes.push({data:{id:paperInfo.id}});
    for(var i = 0; i < paperInfo.incoming_relations.length ; i++){
        var nodeObj = { 
            data:{id:''}
        };

        var edgeObj = {
            data:{id:'',source:'',target: paperInfo.id}
        }
    
        nodeObj.data.id = paperInfo.incoming_relations[i].source_id;
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
            text:''
        }
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
        //console.log(this.$route.matched[0].props);
        //fetchPaperInfo(this, paperInfo);
        var cy = plotGraph(this, paperInfo);
         cy.on('tap', 'node', function (evt) {
            var selectedNodeId = evt.target.id();
            console.log('Node Id: '+selectedNodeId);
            //this.$route.router.go('/areas/'+this.$route.params.areaid+'/paper/'+selectedNodeId);
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
    }
  
};


</script>

<style>
   #details {
      
        height: 300px;
        display: block;
    }
</style>