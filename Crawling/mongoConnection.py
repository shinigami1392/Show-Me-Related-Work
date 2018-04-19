from pymongo import MongoClient

class mongoClient:
	def __init__(self):
		self.host = "127.0.0.1"
		self.port = "27017"
		self.client = None
		self.dbName = "showMe"
		self.totalDomains = 5

	def formMongoURL(self):
		# return "mongodb://" + self.host + ":" + self.port
		username = 'ShowMeAdmin2'
		password = 'h0wM3MoN50!f'
		ip = '54.201.123.246'
		port = '27017'
		database = 'showMe'

		uri = 'mongodb://%s:%s@%s:%s/%s' % (username, password, ip, port, database)
		client = MongoClient(uri)[database]
		return client

	def createMongoClient(self):
		client = self.formMongoURL()
		self.client = client

	def saveDomain(self, domain):
		db = self.client[self.dbName]
		result = db.domainmodels.insert_one(domain)

	def disconnectMongoClient(self):
		# self.client.close()
		self.client = None

	def savePapers(self, objects, stream):
		db = self.client
		print 'saving papers', len(objects)
		errors = []
		document = db.newdomainmodels.find_one({'domainName':stream})
		if document:
			print 'domain name is present'
			try:
				papers = document['papers']
				papers += objects
				db.newdomainmodels.update_one(
					{"id":document['id']}, 
					{"$set":{"papers":papers}
					})
			except Exception, e:
				print e.message
			
		else:
			db.newdomainmodels.insert_one({
				'id': str(self.totalDomains),
				'domainName': stream,
				'papers': objects
				})
			self.totalDomains += 1
		return errors
			