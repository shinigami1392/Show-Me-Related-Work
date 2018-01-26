import mechanize

def crawl():
	br = mechanize.Browser()
	response = br.open('http://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=mechanical%20engineering')
	print response.code
	print response.info()
	page = response.read()
	# page = page.encode('utf-8')
	return page

def save(response):
	with open('response.html', 'wb') as filename:
		filename.write(response)

def main():
	#Crawling document
	page = crawl()
	
	#saving the response into file
	save(page)


if __name__ == '__main__':
	main()