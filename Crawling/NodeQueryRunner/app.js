const neo4j = require('neo4j-driver').v1;
const fs = require("fs");
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo4j123"));
const session = driver.session();

fs.readFile("query.txt", function (err, data) {
    if (err) throw err;
    query = data.toString('utf-8');
    console.log(query)
    const resultPromise = session.run(
	  query
	);

	resultPromise.then(result => {
	  session.close();

	  const singleRecord = result.records[0];
	  const node = singleRecord.get(0);

	  console.log(node.properties);

	  driver.close();
	});
});



