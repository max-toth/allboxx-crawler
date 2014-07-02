import json
import codecs
import urllib.request
import urllib.parse
from lxml.html import document_fromstring
from http.client import HTTPResponse
import threading
import csv
import time
import AllBoxxParser


SITE = 'http://xn--e1affjgipn8i.xn--p1ai'
API_PRODUCTS = "http://xn--e1affjgipn8i.xn--p1ai/ru/api/products?"

# item = {
#     "id": k,                
#     "title": title,
#     "href": href,
#     "img": imgLink,
#     "price": price,
#     "categories": categories
# }   
# http://xn--e1affjgipn8i.xn--p1ai/ru/category/3840
# r = urllib.request.Request("http://xn--e1affjgipn8i.xn--p1ai/ru/product/236821")
def get(url):
    r = urllib.request.Request(url)
    r.add_header('Cookie', 'viewTypeId=c048635f3df6670078f614b8dffd1bc8; sus=391082033a70dce9f6b8d612f752d366c9687ed0f4eb2538163cff6bbb89f6577f1ae47a02c29b888b31d9a8525f7b3a5957d8ea5b06005dc80a4a45709804620a6cf36754fcc8ad1a82cf4eb50d887fb29150bfa5cbfb6c6dba6c7fa4e69091; _ga=GA1.2.8194496.1403945770; _ym_visorc_22052620=w; viewType=def')
    r.add_header('Content-Type', 'application/json; charset=UTF-8')
    r.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36')
    resp = HTTPResponse
    resp = urllib.request.urlopen(r)
    return resp


def main():
    k=0    
    csv_f = open("products.csv", "w")
    for i in range(359):
        if i == 2:
            continue
        url = API_PRODUCTS + "page=" + str(i)
        print(url)
        resp = get(url)
        jsonString = resp.read().decode("utf_8")             
        j = json.loads(jsonString)
        page = document_fromstring(j['data']['productsHtml'])
        for li in page.cssselect('li.qr-view-wrapper'):
            title = li.cssselect('a.name_lnk')[0].get('title')            
            # print(title)
            href = li.cssselect('a.name_lnk')[0].get('href')                        
            imgLink = li.cssselect('div.product_info_wrapper')[0].cssselect('img')[0].get('src')
            price = li.cssselect('span.price_value')[0].text.replace('\n', "").replace(" ", "").replace("\t", "").replace("\r", "")      
            line = str(k) + ";" + title + ";" + price + ";" + href + ";" + imgLink + "\n"   
            # print(line)
            csv_f.write(line)            
            k+=1                
    csv_f.close()


def items():
    f = open('c_products.csv', 'w')
    for x in open('products.csv', 'r'):
        f.write(AllBoxxParser.products(x + ';' + x.split(';')[3]))
    f.close()


items()        