from urllib.request import urlopen
from bs4 import BeautifulSoup
from selenium import webdriver
import csv

def get_list(url):
    '''
    Input: URL for a particular category
    Output: list of hyperliks for papers listed on this page

    Open given URL using selenium, store all hyperlikns on this page in the list and
    return it
    '''
    beautifulSoup_object = None
    
    try:
        driver = webdriver.Firefox()
        driver.get(url)
        html = driver.page_source
        beautifulSoup_object = BeautifulSoup(html, "html.parser")
    except Exception:
        print(Exception)

    articles = beautifulSoup_object.findAll("article", {"class": "search-result"})

    list = []
        
    for article in articles:
        a_tag = i.findAll("a", {"data-selenium-selector": "title-link"})
        link = a_tag.get("href")
        list.append(link)

def has_next_page():
    '''
    return next available page for give category
    if no such page is available return None
    '''
    pass

def get_data(list):
    '''
    Input: list of URL's for a particular page
    visit each URL and store information like Author, Title, DOI, Domain etc in the
    output file
    '''
    with open("output.csv", "a",newline='') as file:
        writer = csv.writer(file)
        writer.writerow([])

        for paper in list:            
            try:
                driver = webdriver.Firefox()
                driver.get(url)
                html = driver.page_source
                beautifulSoup_object = BeautifulSoup(html, "html.parser")
            except Exception:
                print(Exception)            
    
if __name__ == '__main__':

    categories = ["augmented%20reality","cloud%20computing", "computer%20vision"]
    base_url = "https://www.semanticscholar.org/"
    
    for category in categories:
        
        next_page = True
        #s = "%20".join(category.split(" "))
        #print (s)
        url = base_url + "/search?q=" + category + "&sort=relevance"
        page_count = 1
        while (next_page):
            url = url + "page=" + str(page_count)
            page_count += 1
            list = get_list(url)
            get_data(list)            

            if (not has_next_page):
                next_page = False
    
            
