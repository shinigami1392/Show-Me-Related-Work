<template>
    <app-box class="md-elevation-5" v-bind:boxHeaderProp="graphBoxHeader" v-bind:cardStyle="cardStyle" v-bind:cardBlockStyle="cardBlockStyle" v-bind:cardBlockContentStyle="cardBlockContentStyle">
        <div class="container-fluid" style="height:100%;">
            <div class="row" style="height:100%;">
                <div class="col-md-8" style="height:100%;">
                    <div id="visited_papers" style="height:10%;" class="md-title">
                        Recently Viewed Papers: 
                        <span v-for="(visitedPaper, index) in visitedPapers">
                            <router-link :to="{ name:'paperInfo', params:{ areaid:$route.params.areaid, paperid:visitedPaper.id}}" :title="visitedPaper.name">{{visitedPaper.id}}</router-link>
                            <small v-if="index != visitedPapers.length - 1"><md-icon>forward</md-icon></small>
                        </span>
                    </div>
                    <div id="details" style="width:100%;">
                    </div>
                </div>

                <div class="col-md-4" style="padding: 0px 0px;">
                    <div style="height:100%; width:inherit;">
                        <div>
                        <md-checkbox type="checkbox"  class="md-primary"  id="l1" value="incoming"   
                        v-model="linkType" v-on:change="filterLinks()">Incoming Links</md-checkbox>
                        <md-checkbox type="checkbox" class="md-primary" id="l2" value="outgoing"  
                        v-model="linkType" v-on:change="filterLinks()" checked>Outgoing Links</md-checkbox>
                        </div>
                        <table id="legend" class="table table-condensed table-striped" style="">
                            <thead class="table-head-legend">
                                <tr>
                                    <th>ID</th>
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
    //legend_elements.push({ id: paperInfo.id, name: paperInfo.name, type: 'root'});
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
                    'background-color': '#78bbe6',
                    'label': 'data(id)',
                    'width': '30px',
                    'height': '30px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 1,
                    'line-color': '#35342f',
                    'curve-style': 'bezier',
                    'target-arrow-color': '#35342f',
                    'target-arrow-shape': 'triangle'
                }
            }
        ],
        layout: {
            name: 'dagre',
            rankDir: 'LR',
  
            animate: true,
            animationDuration: 500
        },
        zoom: 1
    });

    cy.getElementById(paperInfo.id).style('background-color', '#3dbd5d');
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

        if(route.params.linkid !== undefined){
            cy.getElementById('e'+route.params.linkid).style('line-color', '#f45844');
            cy.getElementById('e'+route.params.linkid).style('target-arrow-color', '#f45844');
        }

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
        cy.minZoom(0.6);

        this.graph = cy;
        var vm = this;
        $(document).ready(function() {
           vm.datatable = $('#legend').DataTable({
                 "paging":   false,
                 "info": false
            });
            $('#legend_wrapper').css('height','92%');
            $('#legend_filter').css('height','10%');
             $(window).resize(function() {
                 cy.fit(cy.elements);
             });

              $('#legend tbody').on('click', 'tr', function () {
                    var data = vm.datatable.row( this ).data();
                    var id = data[0];
                    var color = vm.graph.$('#'+id).css('background-color');
                    var jAni = vm.graph.$('#'+id).animation({
                        style: {
                                'background-color': '#fadc6d'
                        },
                        duration: 1000
                    });
                    jAni.play().promise().then(function(){ // on completion
                                jAni.stop(); // stop animation
                                vm.graph.$('#'+id).css('background-color',color); 
                    });
            } );
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
    
            $('#legend').DataTable().clear();
            $('#legend').DataTable().rows.add(dtRecords).draw();
        }
    }

};


</script>

<style>
#details {
    height: 100vh;
    width: 100vw;
    display: block;
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
.dataTables_filter {
  float: left !important;
}
table > tbody{
  cursor: pointer;
}

.table-head-legend{
}
</style>
