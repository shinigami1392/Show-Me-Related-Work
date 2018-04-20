<template>
    <app-box v-bind:boxHeaderProp="graphBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
        <div class="container" style="height:100%;">
            <div class="row" style="height:100%;">
                <div class="col-md-8" style="height:100%;">
                    <div id="visited_papers" style="height:10%;">
                        Recently Viewed Papers: 
                        <span v-for="(visitedPaper, index) in visitedPapers">
                            <router-link :to="{ name:'paperInfo', params:{ areaid:$route.params.areaid, paperid:visitedPaper.id}}" :title="visitedPaper.name">{{visitedPaper.id}}</router-link>
                            <small v-if="index != visitedPapers.length - 1"> > </small>
                        </span>
                    </div>
                    <div id="details">
                    </div>
                </div>

                <div class="col-md-4" style="padding: 0px 0px; height:100%;">
                    <div style="height:100%; width:inherit;">
                        <div style="height:7%;">
                        <input type="checkbox"  id="l1" value="incoming"  
                        v-model="linkType" v-on:change="filterLinks()">Incoming Links</input>
                        <input type="checkbox"  id="l2" value="outgoing"  
                        v-model="linkType" v-on:change="filterLinks()" checked>Outgoing Links</input>
                        </div>
                        <table id="legend" class="table table-condensed" style="display: block; height: 90%; overflow-y:scroll; table-layout:fixed;">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Weight</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-if="graphLegendElements && graphLegendElements.length" v-for="graphElement in graphLegendElements" :key="graphElement.id">
                                    <td class="small">{{ graphElement.id }}</td>
                                    <td class="small">{{ graphElement.name }}</td>
                                    <td class="small">{{ graphElement.weight }}</td>
                                </tr>
                            </tbody>

                        </table>
                        
                    </div>
                </div>
            </div>
        </div>
    </app-box>
</template>

<script>



function plotGraph(vm, paperInfo) {

    var nodes = [];
    var edges = [];
    var graph_elements = [];
    var legend_elements = [];
    var incoming_citations = [];
    nodes.push({ data: { id: paperInfo.id , type: 'root'} });
    legend_elements.push({ id: paperInfo.id, name: paperInfo.name, type: 'root'});
    for (var i = 0; i < paperInfo.incoming_relations.length; i++) {
        var nodeObj = {
            data: { id: '' , type: 'incoming'}
        };
        
        var edgeObj = {
            data: { id: '', source: '', target: paperInfo.id, type: 'incoming' }
        }
       
        nodeObj.data.id = paperInfo.incoming_relations[i].source_id;
        incoming_citations.push(nodeObj.data.id);
        legend_elements.push({ id: paperInfo.incoming_relations[i].source_id, name: paperInfo.incoming_relations[i].source_name, weight: paperInfo.incoming_relations[i].weight, type: 'incoming'});

        edgeObj.data.id = 'e' + paperInfo.incoming_relations[i].source_id+'_'+paperInfo.id;
        edgeObj.data.source = paperInfo.incoming_relations[i].source_id;
        
        nodes.push(nodeObj);
        edges.push(edgeObj);
        
    }

    const incoming_citations_set = new Set(incoming_citations);

    for (var i = 0; i < paperInfo.outgoing_relations.length; i++) {
        
        var nodeObj = {};
        if(incoming_citations_set.has(paperInfo.outgoing_relations[i].destination_id)){
            for(var j = 0; j < nodes.length ; j++) {
                   if(nodes[j].data.id == paperInfo.outgoing_relations[i].destination_id){
                       nodes[j].data.type = 'incoming_outgoing';
                       nodeObj = nodes[j];
                       break;
                   }
            }
        }
        else{
            nodeObj = {
                data: { id: paperInfo.outgoing_relations[i].destination_id, type: 'outgoing'}
            };
            legend_elements.push({ id: paperInfo.outgoing_relations[i].destination_id, name: paperInfo.outgoing_relations[i].destination_name, weight: paperInfo.outgoing_relations[i].weight, type: 'outgoing'});
        }
        var edgeObj = {
            data: { id: '', source: paperInfo.id, target: '', type: 'outgoing' }
        }

        edgeObj.data.id = 'e' +paperInfo.id+'_'+paperInfo.outgoing_relations[i].destination_id;
        edgeObj.data.target = paperInfo.outgoing_relations[i].destination_id;
        nodes.push(nodeObj);
        edges.push(edgeObj);
    }
    //console.log(JSON.stringify(nodes));
    //console.log(JSON.stringify(edges));
    graph_elements.push.apply(graph_elements, nodes);
    graph_elements.push.apply(graph_elements, edges);

    vm.graphLegendElements = legend_elements;
    vm.legendElements = JSON.parse(JSON.stringify(legend_elements));
    var cy = cytoscape({
        container: document.getElementById('details'), // container to render in
        elements: graph_elements,
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
            name: 'dagre',
            rankDir: 'LR',
  
            animate: true,
            animationDuration: 500
        }
    });

    cy.getElementById(paperInfo.id).style('background-color', 'yellow');
    return cy;
}



export default {
    data() {
        return {
            graphBoxHeader: "Network Graph",
            graphElements: [],
            graphLegendElements: [],
            legendElements:[],
            visitedPapers:[],
            isOpen: false,
            linkType:["incoming","outgoing"],
            graph:{},
            datatable:{}
        }
    },
    created() {
        this.cardStyle = "height:100%";
        this.cardBlockStyle = "height:90%;"
        this.cardBlockContentStyle = "height:100%;"
    },
    mounted() {

        var paperInfo = this.$route.matched[0].props.paperInfo;
        this.visitedPapers = this.$route.matched[0].props.visitedPapers;
        var router = this.$router;
        var route = this.$route;

        var cy = plotGraph(this, paperInfo);
        cy.on('tap', 'node', function(evt) {
            var selectedNodeId = evt.target.id();
            router.replace('/areas/' + route.params.areaid + '/paper/' + selectedNodeId);
        });
        cy.on('mouseover', 'node', function(evt) {
            var selectedNodeId = evt.target.id();
            cy.getElementById(selectedNodeId).style('height', '40px');
            cy.getElementById(selectedNodeId).style('width', '40px');
            $('html,body').css('cursor', 'pointer');
        });
        cy.on('mouseout', 'node', function(evt) {
            var selectedNodeId = evt.target.id();
            cy.getElementById(selectedNodeId).style('height', '30px');
            cy.getElementById(selectedNodeId).style('width', '30px');
            $('html,body').css('cursor', 'default');

        });

        cy.on('mouseover', 'edge', function(evt) {
            $('html,body').css('cursor', 'pointer');
        });

        cy.on('mouseout', 'edge', function(evt) {
            $('html,body').css('cursor', 'default');
        });

        cy.on('tap', 'edge', function(evt) {
            var selectedEdgeId = evt.target.id();
            selectedEdgeId = selectedEdgeId.substr(1);
            router.replace('/areas/' + route.params.areaid + '/paper/' + route.params.paperid + '/links/' + selectedEdgeId);
        });

        cy.maxZoom(2.0);

        this.graph = cy;
        $(document).ready(function() {
           this.datatable = $('#legend').DataTable({
                 "paging":   false,
                 "info": false
            });
            $('#legend_wrapper').css('height','92%');
            $('#legend_filter').css('height','10%');
        });
    },
    methods: {
        filterLinks: function () {
            var vm = this;
            vm.graph.elements().forEach(function( ele ){
                 if(ele.data('type') == 'root'){
                     return;
                 }

                 if(ele.data('type') != 'incoming_outgoing' && !vm.linkType.includes(ele.data('type'))){
                     ele.style('visibility', 'hidden');
                 }
                 else{
                     ele.style('visibility', 'visible');
                 }

                if(vm.linkType.length == 0 && ele.data('type') == 'incoming_outgoing'){
                     ele.style('visibility', 'hidden');
                 }
            });
            var dtRecords = [];
            vm.legendElements.filter(function (element) {
                        if(element.type == 'root' || vm.linkType.includes(element.type)){
                            var row = [];
                            row.push(element.id);
                            row.push(element.name);
                            if(element.weight == null || element.weight === undefined){
                                row.push(0);
                            }
                            else{
                                row.push(element.weight);
                            }
                            dtRecords.push(row);
                            return true;
                        }
                        return false;
            });
            vm.graphLegendElements = [];
            $('#legend').DataTable().clear();
            $('#legend').DataTable().rows.add(dtRecords).draw();
        }
    }

};


</script>

<style>
#details {

    height: 350px;
    width: 600px;
    display: block;
}

#legend {
    border: 1px solid #999
}

#legend_elements_list {
    list-style: none;
}

.legendTable {
    display: table;
    border: 1px solid #666666;
    width: auto;
}

#legend_wrapper{
    height:100%;
}

.tblRow {
    display: table-row;
    width: auto;
    clear: both;
    border: 1px solid #666666;
}

.divCell {
    float: left;
    /*fix for  buggy browsers*/
    display: table-column;
    border: 1px solid #666666;
}
</style>
