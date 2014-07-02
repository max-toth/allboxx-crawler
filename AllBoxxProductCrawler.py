import AllBoxxProduct
import AllBoxxSingleton
import OnlyOne

lines = []


def main():
	x = 0
	thread_count = 0
	urls = []	
	with open('products.csv') as f:
	    while True:
	        line1 = f.readline()
	        if not line1:
	            break
	        if x%600 == 0:
	        	print('chunk [' + str(x - 600) + ', ' + str(x) + ']')	        
	        	thread_count+=1
	        	thread1 = AllBoxxProduct.myThread(x, "Thread-" + str(thread_count), urls, lines)
	        	thread1.start()
	        	urls = []
	        urls.append(line1)
	        x+=1
	f.close()


main()