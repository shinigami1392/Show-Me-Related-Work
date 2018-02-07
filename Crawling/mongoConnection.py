from pymongo import MongoClient

class mongoClient:
	def __init__(self):
		self.host = "127.0.0.1"
		self.port = "27017"
		self.client = None
		self.dbName = "showMe"

	def formMongoURL(self):
		return "mongodb://" + self.host + ":" + self.port

	def createMongoClient(self):
		client = MongoClient(self.formMongoURL())
		# print client
		self.client = client

	def saveDomain(self, domain):
		db = self.client[self.dbName]
		result = db.domainmodels.insert_one(domain)


	def savePapers(self, objects):
		db = self.client[self.dbName]
		print 'saving papers', len(objects)
		for paper in objects:
			result = db.papermodels.insert_one(paper)
			