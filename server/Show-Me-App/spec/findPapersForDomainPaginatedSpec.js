var request = require("request");
var baseurl = "http://54.201.123.246:8081/domains/papers"

describe("Find All domains paginated Test", function(){
    describe("GET /", function() {  
		
		it("Post returns status code 200", function(done) {
            request({
                method: 'POST',
                uri: baseurl,
                data :function ( d ) {
                    d.areaid = 0;                    
                },
             },function(request, response,body){                
                expect(response.statusCode).toBe(200);
                done();
             });
        });
        
        it("Get returns status code 200", function(done) {
            request({
                method: 'GET',
                uri: baseurl,
                data :function ( d ) {
                    d.areaid = 0;                    
                },
             },function(request, response,body){                
                expect(response.statusCode).toBe(200);
                done();
             });
        });

        it("Put returns status code 200", function(done) {
            request({
                method: 'PUT',
                uri: baseurl,
                data :function ( d ) {
                    d.areaid = 0;                    
                },
             },function(request, response,body){                
                expect(response.statusCode).toBe(404);
                done();
             });
        });

		
	});
});
