import crawler
from lxml.html import document_fromstring
import time
import random

def products(url):
    time.sleep(random.randint(1,3))
    print(url)
    html = crawler.get(crawler.SITE + url).read().decode('utf_8')
    page = document_fromstring(html)   
    title = page.get_element_by_id('page_title').text    
    breadcrumb = page.get_element_by_id('breadcrumb')     
    cat_str = ""
    for a in breadcrumb.cssselect('a'):
        if a.text == 'Главная':
            continue
        else:
            cat_str = cat_str + a.text + ';'

        # print('\t' + a.text)
    if len(cat_str.split(';')) < 7:
        for i in range(7 - len(cat_str.split(';'))):
            cat_str += '_;'
    return cat_str + '\n'