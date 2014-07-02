import threading
import time
import AllBoxxParser
import AllBoxxSingleton
import OnlyOne

exitFlag = 0
rows = 17865

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'


class myThread (threading.Thread):
    def __init__(self, threadID, name, urls, lines):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name        
        self.urls = urls
        self.lines = lines
    def run(self):
        prds = AllBoxxSingleton.AllBoxxSingleton()
        failed = OnlyOne.OnlyOne()
        items = []
        for url in self.urls:
            current_item = url.split(';')[3]
            try:
                updated_line = url.replace('\n', '') + ";" +  AllBoxxParser.products(current_item)
                print(current_item)
                items.append(updated_line)
            except Exception:
                print(bcolors.FAIL + current_item + ' in Thread ' + self.name + bcolors.ENDC)
                self.urls.append(url)
                time.sleep(5)
        f = open(self.name + '.csv', 'w')
        for x in items:
            f.write(x)
        f.close()
