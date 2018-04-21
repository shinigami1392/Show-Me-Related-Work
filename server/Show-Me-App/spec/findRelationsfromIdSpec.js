var request = require("request");
var base_url = "http://54.201.123.246:8081/relations/get?";

describe(" SHowMe Relations", function() {
  describe("GET /", function() {
	  
	//test to check if invalid relation Id is properly handled by the application.
    it("returns status code 200", function(done) {
	  var relation_url = base_url + "domain=0&source=399838&destination=404723&user=user0";
      request.get(relation_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
	
	//test to check if invalid user Id is properly handled by the application.
    it("returns status code 200", function(done) {
	  var user_url = base_url + "domain=1&source=399838&destination=404723&user=user0";
      request.get(user_url, function(error, response, body) {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    });
	  
	//test to see if all relation properties can be fetched properly
    it("returns realtions based on the Relation Id", function(done) {
	  var rel_url = base_url + "domain=0&source=399838&destination=404723&user=user0";
      request.get(rel_url, function(error, response, body) {
		var body_res = JSON.parse(body);
		expect(body_res.relation.id).toBe('404723');
		//expect(body_res.relation.source_id).toBe();
		//expect(body_res.relation.source_name).toBe();
		//expect(body_res.relation.destination_id).toBe();
		//expect(body_res.relation.destination_name).toBe();
		//expect(body_res.relation.upvotes).toBe(None);
		//expect(body_res.relation.downvotes).toBe();
		//expect(body_res.relation.comments.text).toBe("");
		//expect(body_res.relation.comments.timestamp).toBe("");
		//expect(body_res.relation.comments).toBe();
		expect(body_res.upvotedByUser).toBe(false);
		expect(body_res.downvotedByUser).toBe(true);	
		done();
      });
    });
  });
});

