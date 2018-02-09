import mechanize

from bs4 import BeautifulSoup

import requests


def crawl():
	br = mechanize.Browser()
	r  = requests.get("https://www.sciencedirect.com/search?qs=machine+learning&authors=&pub=&volume=&issue=&page=&origin=home&zone=qSearch")

	data = r.text

	soup = BeautifulSoup(data, "lxml")
	links_list = list()

	for link in soup.find_all('a'):
		paperLink = link.get('href')
		if "article" in paperLink:
			links_list.append(paperLink)
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