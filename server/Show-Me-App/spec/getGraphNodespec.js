var request = require("request");
var base_url = "http://54.201.123.246:8081/";

describe(" checks showME Server is running or not", function() {
  describe("GET /", function() {
	  
	//test to check the status code to 200  
    it("returns status code 200", function(done){
		request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
	
	//test to check the attributes of the currently fetched node.
    it("returns a node in graph details", function(done) {
	    var user_url = base_url + "graphNode/graphNode/23";
	    request.get(user_url, function(error, response, body){
		var body_res = JSON.parse(body);
		expect(body_res.id).toBe("23");
		expect(body_res.name).toBe("An overview of Machine Learning");
		expect(body_res.author).toBe("Corbonell J.G, Michalski R.S, Mitchell T.M");
		expect(body_res.url).toBe("https://link.springer.com/chapter/10.1007/978-3-662-12405-5_1");
		done();
	  });
	});
	
	//test to check all the inbound connections of the currently fetched node.
    it("returns the inbound connections of a graph node", function(done) {
	    var user_url = base_url + "graphNode/graphNode/7";
	    request.get(user_url, function(error, response, body){
		var body_res = JSON.parse(body);
		expect(body_res.incoming_relations.length).toBe(2);
		expect(body_res.incoming_relations[0].id).toBe("7");
		expect(body_res.incoming_relations[0].source_name).toBe("Learning boolean concepts in the presence of many irrelevant features");
		expect(body_res.incoming_relations[0].source_id).toBe("2");	
		expect(body_res.incoming_relations[0].weight).toBe("0");		
		expect(body_res.incoming_relations[1].id).toBe("8");
		expect(body_res.incoming_relations[1].source_name).toBe("A study of instance-based algorithms for supervised learning tasks: mathematical, empirical and psychological evaluations");
		expect(body_res.incoming_relations[1].source_id).toBe("10");
		expect(body_res.incoming_relations[1].weight).toBe("0");		
		done();
	  });
	});
	
	//test to check all the outbound connections of the currently fetched node.
    it("returns the outbound connections of a graph node", function(done) {
	    var user_url = base_url + "graphNode/graphNode/12";
	    request.get(user_url, function(error, response, body){
		var body_res = JSON.parse(body);
		expect(body_res.outgoing_relations.length).toBe(3);
		expect(body_res.outgoing_relations_relations[0].id).toBe("21");
		expect(body_res.outgoing_relations_relations[0].destination_name).toBe("Knowledge Acquisition Via Incremental Conceptual Clustering");
		expect(body_res.outgoing_relations_relations[0].destination_id).toBe("20");	
		expect(body_res.outgoing_relations[0].weight).toBe("0");
		expect(body_res.outgoing_relations_relations[1].id).toBe("22");
		expect(body_res.outgoing_relations_relations[1].destination_name).toBe("Acquiring a Noun Classification from Predicate-Argument Structures");
		expect(body_res.outgoing_relations_relations[1].destination_id).toBe("21");
		expect(body_res.outgoing_relations[0].weight).toBe("0");
		expect(body_res.outgoing_relations_relations[2].id).toBe("20");
		expect(body_res.outgoing_relations_relations[2].destination_name).toBe("Learning Efficient Classification Procedures and Their Application to Chess End Games");
		expect(body_res.outgoing_relations_relations[2].destination_id).toBe("19");
		expect(body_res.outgoing_relations[0].weight).toBe("0");
		done();
	  });
	});	
  });
});

