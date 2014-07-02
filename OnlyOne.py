class OnlyOne:
    class __OnlyOne:
        def __init__(self):
            self.products = []
        def __str__(self):
            return repr(self) + self.products
    instance = None
    def __init__(self):
        if not OnlyOne.instance:
            OnlyOne.instance = OnlyOne.__OnlyOne()
        else:
            OnlyOne.instance.failed = []
    def __getattr__(self, name):
        return getattr(self.instance, name)