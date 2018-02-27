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

	def savePapers(self, objects, stream):
		db = self.client[self.dbName]
		print 'saving papers', len(objects)
		errors = []
		document = db.domainmodels.find_one({'domainName':stream})
		if document:
			print 'inserting objects'
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
			print 'creating documents'
			db.domainmodels.insert_one({
				'id': self.totalDomains,
				'domainName': stream,
				'papers': objects
				})
		for paper in objects:
			try:
				result = db.papermodels.insert_one(paper)
			except Exception as e:
				errors.append(paper['id'])
		return errors
			