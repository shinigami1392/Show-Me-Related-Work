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

def fetchData(page):
	crawledData = []
	completeLink = requests.get("https://www.sciencedirect.com" + links_list[0])
	completeLink_data = completeLink.text

	paperDoi = ""
	paperTitle = ""
	paperAbstract = ""

	completeLink_soup = BeautifulSoup(completeLink_data, "lxml")

	for spandata in completeLink_soup.find_all('a', {"class": "doi"}):
		doi = BeautifulSoup(str(spandata), "lxml")
		paperDoi = doi.a.get_text(strip=True)
		print(paperDoi)
		
	for spandata in completeLink_soup.find_all('span', {"class": "title-text"}):
		something = BeautifulSoup(str(spandata), "lxml")
		paperTitle = something.span.get_text(strip=True)
		print(paperTitle)
	
	for abstract in completeLink_soup.find_all('p', {"id": "d1e2432"}):
		abstractData = BeautifulSoup(str(abstract), "lxml")
		paperAbstract = abstractData.p.get_text(strip=True)
		print(paperAbstract)
	
def main():
	#Crawling document
	page = crawl()
	fetchData(page)
	#saving the response into file
	save(page)


if __name__ == '__main__':
	main()