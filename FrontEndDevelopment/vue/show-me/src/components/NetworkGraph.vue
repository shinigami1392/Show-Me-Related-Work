<template>
    <app-box v-bind:boxHeaderProp = "graphBoxHeader">
        <div id = "details">
            {{text}}
        </div>
    </app-box>    
</template>

<script>

function fetchPaperInfo(vm){
//console.log(JSON.stringify(vm.paperInfo));
console.log(vm.paperid);
var paperInfo =  {"id":"p1","name":"paper_a","author":["abc","def"],"year":1993,"url":"http://abc.com","incoming_relations":[{"id":"e13","source_id":"p3","source_name":"pqr","weight":32},{"id":"e12","source_id":"p2","source_name":"xyz","weight":45}],"outgoing_relations":[{"id":"e14","destination_id":"p4","destination_name":"mno","weight":65},{"id":"e15","destination_id":"p5","destination_name":"good","weight":87}]};
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

function plotGraph(vm){
            console.log("Inside plotGraph");
            var cy = cytoscape({
    
            container: document.getElementById('details'), // container to render in
            elements:vm.graphElements,
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#ff0000',
                        'label': 'data(id)'
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
        console.log(this.$route);
        fetchPaperInfo(this);
        plotGraph(this);
        
    }
  
};


</script>

<style>
   #details {
      
        height: 300px;
        display: block;
    }
</style>