class AllBoxxSingleton:
    class AllBoxxSingleton:
        def __init__(self):
        	self.products = []            
        def __str__(self):
            return repr(self) + self.val
    instance = None
    def __init__(self):
        if not AllBoxxSingleton.instance:
            AllBoxxSingleton.instance = AllBoxxSingleton.AllBoxxSingleton()
        else:
            AllBoxxSingleton.instance.val = []
    def __getattr__(self, name):
        return getattr(self.instance, name)