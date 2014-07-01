import threading
import time
import Parser

exitFlag = 0
rows = 17865

class myThread (threading.Thread):
    def __init__(self, threadID, name, urls, lines):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name        
        self.urls = urls
        self.lines = lines
    def run(self):
        print("Starting " + self.name)        
        for url in self.urls:
            updated_line = url.replace('\n', '') + ";" +  Parser.products(url.split(';')[3])
            print(updated_line)
            self.lines.append(updated_line)
        print("Exiting " + self.name)