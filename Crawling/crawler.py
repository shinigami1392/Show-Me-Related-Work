from bs4 import BeautifulSoup
from mongoConnection import mongoClient
import subprocess
import json
import subprocess
import os
import requests
from Neo4jQueryGenerator import loadData

class MyCrawler:
	def __init__(self):
		self.URL = "curl 'http://ieeexplore.ieee.org/rest/search' -H 'Host: ieeexplore.ieee.org' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: http://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=Mechanical%20Engineering' -H 'Content-Type: application/json;charset=utf-8' -H 'Cookie: WLSESSION=186802828.20480.0000; TS011813a0=012f350623c8c013ce6556768f9c89c407f8db32f8786967b3036418983e31b5af4bca05bc6186ccf8cbaaeca609b37719d1a291b5c1fa664cae4069cf1f86336bdca51a02e13b87e4754a55ba2864dcc1c482debb; JSESSIONID=9LxTgs_On01JY2sKffqSifM8MX--V8h5zGuF8llnp04lH4O2HdVP!-1925613294; ipCheck=129.219.8.220; ERIGHTS=OLrMFse41kmux2FFwpcvB15zX4yhE7sux2B4*ZUPWbox2BBxx0s5Mw1hmcilRAx3Dx3D-18x2dUkAzx2BQwRY0kVa0lgrsEC0Qx3Dx3DGsLICmpcsvFKicXlQXJVowx3Dx3D-gdpPDF74rjhVhbSezWo23Ax3Dx3D-hAF6CbSbyWBiTg9Gw04M9Ax3Dx3D; TS01d430e1=012f350623d0970c2b33ae816726a1e2bc789d18ca786967b3036418983e31b5af4bca05bc6186ccf8cbaaeca609b37719d1a291b5fe3762d84cd2f4cd830dc5e64bd8c01c736f6644caa015081b51eef2c85b7d8e08eb809a87c287648c9fcd088f33b568e1808f61745ce1ce0f6e086b351e5dca6936005072985d26860fd76136f6f696fd4daa6bb5b6d8683efc3baf76e952f1; visitstart=15:35; unicaID=kRGSliiGbxt-asboTcm; fp=8e414249fbfbee52c30cb6d0c5fbe37e; utag_main=v_id:01615382d856001dfb836744ddf301052002a00f00838$_sn:1$_ss:1$_st:1517526339479$ses_id:1517524539479%3Bexp-session$_pn:1%3Bexp-session$vapi_domain:ieee.org; s_fid=46998C7E5607A3B5-03789B92BDB36ACA; s_cc=true; ipList=129.219.8.220; TS01f64340=012f35062397e4ce56485137d940b240c2f2afa16b786967b3036418983e31b5af4bca05bc6186ccf8cbaaeca609b37719d1a291b5c1fa664cae4069cf1f86336bdca51a02925ba28d6123d03df64de1626174a1540d5bcc97d8a1ec437d8c87eb4b7d8c3d; cmTPSet=Y; CoreID6=27992855159615175245399&ci=52820000; 52820000_clogin=v=1&l=1517524539&e=1517526356230; __gads=ID=68e446c5a533cbad:T=1517524540:S=ALNI_MY28RR9o6C0Yqsl2TPKoir9xsoIgw; s_sq=ieeexplore.prod%3D%2526pid%253DXplore%252520Home%2526pidt%253D1%2526oid%253D%25250A%252509%252509%252509%252509%252509%252509%25250A%252509%252509%252509%252509%252509%2526oidt%253D3%2526ot%253DSUBMIT; seqId=4895' -H 'Connection: keep-alive' --data "
		# self.STREAMS = ['Mechanical Engineering', 'Electrical Engineering', 'Electronics', 'Telecommunications', 'Civil Engineering', 'Computer Science']
		self.STREAMS = ['Mechanical Engineering']
		self.PAPERS = []
		self.OBJECTS = []
		self.databaseClient = mongoClient()
		self.mURL = 'http://ieeexplore.ieee.org/rest/search'
		self.rURL = 'http://ieeexplore.ieee.org/rest/document/'
		self.paperHeaders = {
			"Host": "ieeexplore.ieee.org",
			"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0",
			"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Language": "en-US,en;q=0.5",
			"Accept-Encoding": "gzip, deflate",
			"Referer": "http://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=Mechanical%20Engineering",
			"Cookie": "WLSESSION=186802828.20480.0000; unicaID=kRGSliiGbxt-asboTcm; fp=8e414249fbfbee52c30cb6d0c5fbe37e; utag_main=v_id:01615382d856001dfb836744ddf301052002a00f00838$_sn:5$_ss:0$_st:1517696378746$vapi_domain:ieee.org$ses_id:1517694570117%3Bexp-session$_pn:2%3Bexp-session; s_fid=46998C7E5607A3B5-03789B92BDB36ACA; CoreID6=27992855159615175245399&ci=52820000; __gads=ID=68e446c5a533cbad:T=1517524540:S=ALNI_MY28RR9o6C0Yqsl2TPKoir9xsoIgw; JSESSIONID=fgRdpUhn3QKSCATS9M5go3rAMSSP0tsCo8PqYMRph67joLzdFP6B!-1925613294; ipCheck=129.219.8.1; ERIGHTS=czjFURsOaOezpmLSr7Wx2BOMjqqgRaQHLZ*ZUPWbox2BBxx0tVxxZwVcXrsewx3Dx3D-18x2daHMrx2B7wHYwbsoix2BefrHXeAx3Dx3DFx2BhCvKje9u0IxxB5pRx2FGjNgx3Dx3D-ICiWWFk1V0sztTx2FaouVejAx3Dx3D-HkZjWsU0yPIC0RD8x2BnFD6Ax3Dx3D; TS011813a0=012f350623086b8608f0ec6b1f1852f40d225be19770a24b0af74c2aa5e3583040b78ed04139020f3e8684f6547ddb0f43cb0d6c12b177408764b693ae9e3ca356e5274dcd3d98d6c984ea93c928156b041914cec9; TS01d430e1=012f350623f7a3f46d4cfd6bf2531ec3302ec0612570a24b0af74c2aa5e3583040b78ed041def9414d53bdbea8af6c1c0f09bf0ec86b4a2ffb702a83713ac4db903866afbd01b3b40fe2aa587fdf136b67542f1598dec4f8c71fb39a1622c933d4857000a2f62249fe649a9eec782be5e90f70527bfdf1218e4e47d48692145e3b578bbcfb; visitstart=14:49; s_cc=true; cmTPSet=Y; 52820000_clogin=l=1517694570&v=1&e=1517696559278; ipList=129.219.8.1; TS01f64340=012f3506234cbaa46e93c487033b9fe67d2f18671370a24b0af74c2aa5e3583040b78ed04139020f3e8684f6547ddb0f43cb0d6c12b177408764b693ae9e3ca356e5274dcd08b7b62f27730a4d33270b67b12b88a5d04d23f572ba2d3cf3b8b0346401e296; s_sq=%5B%5BB%5D%5D; seqId=4895",
			"Connection": "keep-alive"
		}
		self.pageHeaders = {
			"Host": "ieeexplore.ieee.org",
			"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0",
			"Accept": "application/json, text/plain, */*",
			"Accept-Language": "en-US,en;q=0.5",
			"Accept-Encoding": "gzip, deflate",
			"Referer": "http://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=Mechanical%20Engineering",
			"Content-Type": "application/json;charset=utf-8",
			# "Content-Length": "74",
			"Cookie": "WLSESSION=186802828.20480.0000; TS011813a0=012f350623c8c013ce6556768f9c89c407f8db32f8786967b3036418983e31b5af4bca05bc6186ccf8cbaaeca609b37719d1a291b5c1fa664cae4069cf1f86336bdca51a02e13b87e4754a55ba2864dcc1c482debb; JSESSIONID=9LxTgs_On01JY2sKffqSifM8MX--V8h5zGuF8llnp04lH4O2HdVP!-1925613294; ipCheck=129.219.8.220; ERIGHTS=OLrMFse41kmux2FFwpcvB15zX4yhE7sux2B4*ZUPWbox2BBxx0s5Mw1hmcilRAx3Dx3D-18x2dUkAzx2BQwRY0kVa0lgrsEC0Qx3Dx3DGsLICmpcsvFKicXlQXJVowx3Dx3D-gdpPDF74rjhVhbSezWo23Ax3Dx3D-hAF6CbSbyWBiTg9Gw04M9Ax3Dx3D; TS01d430e1=012f350623d0970c2b33ae816726a1e2bc789d18ca786967b3036418983e31b5af4bca05bc6186ccf8cbaaeca609b37719d1a291b5fe3762d84cd2f4cd830dc5e64bd8c01c736f6644caa015081b51eef2c85b7d8e08eb809a87c287648c9fcd088f33b568e1808f61745ce1ce0f6e086b351e5dca6936005072985d26860fd76136f6f696fd4daa6bb5b6d8683efc3baf76e952f1; visitstart=15:35; unicaID=kRGSliiGbxt-asboTcm; fp=8e414249fbfbee52c30cb6d0c5fbe37e; utag_main=v_id:01615382d856001dfb836744ddf301052002a00f00838$_sn:1$_ss:0$_st:1517526359210$ses_id:1517524539479%3Bexp-session$_pn:2%3Bexp-session$vapi_domain:ieee.org; s_fid=46998C7E5607A3B5-03789B92BDB36ACA; s_cc=true; ipList=129.219.8.220; TS01f64340=012f35062397e4ce56485137d940b240c2f2afa16b786967b3036418983e31b5af4bca05bc6186ccf8cbaaeca609b37719d1a291b5c1fa664cae4069cf1f86336bdca51a02925ba28d6123d03df64de1626174a1540d5bcc97d8a1ec437d8c87eb4b7d8c3d; cmTPSet=Y; CoreID6=27992855159615175245399&ci=52820000; 52820000_clogin=v=1&l=1517524539&e=1517526365634; __gads=ID=68e446c5a533cbad:T=1517524540:S=ALNI_MY28RR9o6C0Yqsl2TPKoir9xsoIgw; s_sq=%5B%5BB%5D%5D; seqId=4895",
			"Connection": "keep-alive"
		}
		self.payload = {
			"queryText": "Mechanical Engineering",
			"pageNumber": "1",
			"newsearch": "true"
		}

	def call(self, url, headers, payload=None, post=None, isJson=None):
		if post:
			r = requests.post(url, headers=headers, data=json.dumps(payload))
		else:
			r = requests.get(url, headers=headers)

		content = r.content
		if isJson:
			content = json.loads(r.content)
		return content

	def formURL(self, stream, index):
		payload = self.payload
		payload['queryText'] = stream
		payload['pageNumber'] = str(index)
		return self.call(self.mURL, self.pageHeaders, payload, post=True, isJson=True)

	def decodeString(self, string):
		string = string.replace('[::', '').replace('::]', '')
		string = string.replace('\'', '').replace('\"', '')
		return string

	def extractPapers(self, content):
		papers = content['records']
		i = 0
		for record in papers:
			if record['articleNumber'] in self.PAPERS:
				continue
			else:
				if len(self.PAPERS) < 5000:
					self.PAPERS.append(record['articleNumber'])
			i += 1


	def getReferences(self, paperId):
		url = self.rURL + paperId + '/references'
		content = self.call(url, self.pageHeaders, isJson=True)
		paperReferences = []
		try:
			references = content['references']
			for reference in references:
				try:
					link = reference['links']['documentLink']
					referenceId = link.split('/')[2]
					paperReferences.append(referenceId)
					if referenceId in self.PAPERS:
						pass
					else:
						if len(self.PAPERS) < 5000:
							self.PAPERS.append(referenceId)
				except:
					pass
		except:
			pass
		return paperReferences

	def fetchDocumentContent(self, content):
		try:
			soup = BeautifulSoup(content, 'html.parser')
			data = soup.find_all('script')[27].string
			j1 = data.split('global.document.metadata=')[1].rsplit('};')[0]
			j1 += '}'
			r = json.loads(j1)
			return r
		except Exception, e:
			print 'caught in fetching document', e.message


	def checkReferences(self, content, stream):
		stream = stream.lower()

		#finding the title
		title = self.decodeString(content['title']).lower()
		if stream in title:
			return True

		#finding stream in keywords
		try:
			keywords = content['keywords']

			for keyword in keywords:
				kwds = keyword['kwd']
				
				for kwd in kwds:
					kwd = kwd.lower()
					if kwd == stream:
						return True
		except:
			pass
		return False


	def extractPaperInfo(self, stream):
		i = 0
		paperCount = 0

		while i <  len(self.PAPERS):
			paperId = self.PAPERS[i]
			print i, paperId
			i += 1

			url = 'http://ieeexplore.ieee.org/document/' + paperId + '/'
			content = self.call(url, self.paperHeaders)
			content = self.fetchDocumentContent(content)

			try:
				paperObject = {}
				paperObject['id'] = content['articleNumber']
				paperObject['doi'] = content['doi']
				paperObject['title'] = self.decodeString(content['title'])
				paperObject['publicationTitle'] = content['publicationTitle']
				paperObject['abstract'] = self.decodeString(content['abstract'])
				paperObject['publicationYear'] = content['publicationYear']
				paperObject['stream'] = stream
				paperObject['link'] = 'http://ieeexplore.ieee.org/document/' + paperObject['id'] + '/'

				#getting authors
				paperObject['authors'] = []
				for author in content['authors']:
					paperObject['authors'].append(author['name'])
				
				references = self.getReferences(paperObject['id'])
				referenceArray = {}
				for reference in references:
					refereneObject = {'id':reference, 'upvotes':[], 'downvotes':[], 'comments':[]}
					referenceArray[reference] = refereneObject
				paperObject['references'] = referenceArray
				paperCount += 1
				
				self.OBJECTS.append(paperObject)

				if len(self.OBJECTS) == 10:
					self.savePapers(stream)	
					# print self.OBJECTS		
			except Exception as e:
				i -= 1
				del self.PAPERS[i]
				print e.message
		
		print 'came out of loop', len(self.	OBJECTS)
		if len(self.OBJECTS):
			self.savePapers(stream)

	def savePapers(self, stream):
		try:
			loadData(self.OBJECTS)
			dir_path = os.path.dirname(os.path.realpath(__file__))
			filepath = os.path.join(dir_path, 'NodeQueryRunner')
			filepath = os.path.join(filepath, 'app.js')
			test = subprocess.Popen(["node", filepath], stdout=subprocess.PIPE)
			test.communicate()[0]

			self.databaseClient.createMongoClient()
			self.databaseClient.savePapers(self.OBJECTS, stream)
			self.databaseClient.disconnectMongoClient()
			# for paper in errors:
			# 	self.PAPERS.remove(paper)
			

			#deleting a file
			# test = subprocess.Popen(["truncate", "query.txt", "-s", "0"], stdout=subprocess.PIPE)
			# test.communicate()[0]

		except Exception as e:
			print e.message

		self.OBJECTS = []


	def crawlStreams(self):
		for index, stream in enumerate(self.STREAMS):
			for i in xrange(1, 2):
				print 'Crawling papers for the stream: ' + stream
				content = self.formURL(stream, i)
				self.extractPapers(content)
			self.extractPaperInfo(stream)
			self.saveStream(index, stream)


	def saveStream(self, index, stream):
		streamObject = {'id':index, 'domainName':stream, 'papers':self.PAPERS}
		# self.databaseClient.saveDomain(streamObject)
		self.PAPERS = []

def main():
	myCrawlObject = MyCrawler()
	try:
		myCrawlObject.databaseClient.createMongoClient()
		myCrawlObject.crawlStreams()
	except Exception as e:
		print 'Error connecting to database', e.message


if __name__ == '__main__':
	main()
