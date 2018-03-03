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
		expect(body_res.id).toBe("23");
		expect(body_res.id).toBe("23");
		done();
	  });
	});
	
	//test to check the inbound connections of the currently fetched node.
    it("returns the inbound connections of a graph node", function(done) {
	    var user_url = base_url + "graphNode/graphNode/7";
	    request.get(user_url, function(error, response, body){
		var body_res = JSON.parse(body);
		expect(body_res.incoming_relations[0].id).toBe("7");
		expect(body_res.incoming_relations[0].source_name).toBe("Learning boolean concepts in the presence of many irrelevant features");
		expect(body_res.incoming_relations[0].source_id).toBe("2");		
		expect(body_res.incoming_relations[1].id).toBe("8");
		expect(body_res.incoming_relations[1].source_name).toBe("A study of instance-based algorithms for supervised learning tasks: mathematical, empirical and psychological evaluations");
		expect(body_res.incoming_relations[1].source_id).toBe("10");	
		done();
	  });
	});
  });
});

