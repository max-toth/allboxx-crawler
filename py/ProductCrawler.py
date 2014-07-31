import Product

lines = []


def main():
	x = 0
	with open('products.csv') as f:
	    while True:
	        line1 = f.readline()
	        if not line1:
	            break
	        line2 = f.readline()
	        line3 = f.readline()
	        line4 = f.readline()
	        urls = [line1, line2, line3, line4]
	        thread1 = Product.myThread(x, "Thread-" + str(x), urls, lines)
	        thread1.start()
	        x+=1
	f.close()


main()