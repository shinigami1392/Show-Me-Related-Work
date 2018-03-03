var request = require("request");
var base_url = "http://localhost:8081/";

describe(" checks showME Server is running or not", function() {
  describe("GET /", function() {
	  
	//test to check the status code to 200  
    it("returns status code 200", function(done){
		request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
	
	//test to see complete graph with incoming/outgoing nodes and the attributes are fetched properly or not.
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
  });
});

