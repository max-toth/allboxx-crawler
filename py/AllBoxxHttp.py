import urllib.request
from http.client import HTTPResponse

def get(url):
    r = urllib.request.Request(url)
    r.add_header('Cookie', 'viewTypeId=c048635f3df6670078f614b8dffd1bc8; sus=391082033a70dce9f6b8d612f752d366c9687ed0f4eb2538163cff6bbb89f6577f1ae47a02c29b888b31d9a8525f7b3a5957d8ea5b06005dc80a4a45709804620a6cf36754fcc8ad1a82cf4eb50d887fb29150bfa5cbfb6c6dba6c7fa4e69091; _ga=GA1.2.8194496.1403945770; _ym_visorc_22052620=w; viewType=def')
    r.add_header('Content-Type', 'application/json; charset=UTF-8')
    r.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36')
    resp = HTTPResponse
    resp = urllib.request.urlopen(r)
    return resp
