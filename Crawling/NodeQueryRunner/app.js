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
    // for (var i=0; i<querySet.length; i++){
    //     console.log(i);
    //     console.log(querySet[i]);
    // }
	const driver = neo4j.driver("bolt://54.201.123.246:7687", neo4j.auth.basic("neo4j", "N30forj2990T##"));
	const session = driver.session();
    // console.log(query);
	const resultPromise = session.run(query);

	resultPromise.then(result => {
		session.close();
		driver.close();
	});
	count++;
	// console.log(querySet[i]+count+ " Executed");

});