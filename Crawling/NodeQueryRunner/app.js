const neo4j = require('neo4j-driver').v1;
const fs = require("fs");
var n = 0;
var i = 0;
var querySet;

fs.readFile("query.txt", function (err, data) {
    if (err) throw err;
    query = data.toString('utf-8');
    var count = 0;
    var querySet = query.split("\n");
    		const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo4j123"));
			const session = driver.session();
			const resultPromise = session.run(query);

			resultPromise.then(result => {
				session.close();

				// const singleRecord = result.records[0];
				// const node = singleRecord.get(0);
				// console.log(node.properties);
				driver.close();
			});
    		count++;
    		console.log(querySet[i]+count+ " Executed");

});

// var caller = function(i){
//    		if (n == i) {
//    			return;
//    		}
//    		while(i<n){
//    			console.log(i);
//    			if(querySet[i].startsWith("CREATE")){
// 	    		console.log(querySet[i]);
// 	    		const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo4j123"));
// 				const session = driver.session();
// 				console.log("session created");
// 				const resultPromise = session.run(querySet[i]);

// 				resultPromise.then(result => {
// 					session.close();

// 					// const singleRecord = result.records[0];
// 					// const node = singleRecord.get(0);
// 					// console.log(node.properties);
// 					driver.close();
// 					console.log(i+ " Executed");
// 					caller(i+1);
// 				});
//     		}
//    		}
//    }

// fs.readFile("query.txt", function (err, data) {
//     if (err) throw err;
//     query = data.toString('utf-8');
//     var count = 0;
//     querySet = query.split("\n");
//     n = querySet.length;
//     console.log(n);
//     caller(0);
// });
// 0. global variable
// def function
// 	if n == i:
// 		return
// 	1. while i < n:
// 		1. create query 
// 		2. callback
// 			function(i+1) 



