from selenium import webdriver

dr = webdriver.Firefox()
dr.open('http://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=mechanical%20engineering')
assert "No results found." not in driver.page_source
driver.close()
