var request = require("request");
var base_url = "http://54.201.123.246:8081/relations/downvote/remove?"

describe("Remove downvote for a relation", function(){
   describe("PUT /", function() {      
       	   
	   //test to check if 200 status code is returned or not.
        it("returns status code 200", function(done) { 
		   var query_string = "domain=0&source=399838&destination=404723&user=user0";
           var url = base_url + query_string;
           request({
               method: 'PUT',
               uri: url
            },function(request, response,body){                
               expect(response.statusCode).toBe(200);
               done();
            });
       });
	
	//test to check if invalid user Id is properly handled by the application.
    it("returns status code 404", function(done) { 
		   var query_string = "domain=1&source=399838&destination=404723&user=user10";
           var url = base_url + query_string;
           request({
               method: 'PUT',
               uri: url
            },function(request, response,body){                
               expect(response.statusCode).not.toBe(200);
               done();
            });
       });
	  
	//test to see if the downvote entry is updated to the DB properly or not.
    it("returns the value of updated field as true r false", function(done) { 
		   var query_string = "domain=0&source=399838&destination=404723&user=user0";
           var url = base_url + query_string;
           request({
               method: 'PUT',
               uri: url
            },function(request, response,body){ 
			   var body_res = JSON.parse(body);
               expect(body_res.updated).toBe(true);
               done();
            });
       });
  });
});

