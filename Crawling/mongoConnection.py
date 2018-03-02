from pymongo import MongoClient

class mongoClient:
	def __init__(self):
		self.host = "127.0.0.1"
		self.port = "27017"
		self.client = None
		self.dbName = "showMe"
		self.totalDomains = 0

	def formMongoURL(self):
		return "mongodb://" + self.host + ":" + self.port

	def createMongoClient(self):
		client = MongoClient(self.formMongoURL())
		self.client = client

	def saveDomain(self, domain):
		db = self.client[self.dbName]
		result = db.domainmodels.insert_one(domain)

	def disconnectMongoClient(self):
		self.client.close()
		self.client = None

	def savePapers(self, objects, stream):
		db = self.client[self.dbName]
		print 'saving papers', len(objects)
		errors = []
		document = db.domainmodels.find_one({'domainName':stream})
		if document:
			try:
				papers = document['papers']
				papers += objects
				db.domainmodels.update_one(
					{"id":document['id']}, 
					{"$set":{"papers":papers}
					})
			except Exception, e:
				print e.message
			
		else:
			db.domainmodels.insert_one({
				'id': str(self.totalDomains),
				'domainName': stream,
				'papers': objects
				})
			self.totalDomains += 1
		
		return errors
			