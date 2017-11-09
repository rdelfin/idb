import app.inserter
import pickle

models = pickle.load(open('phones.pickle', 'rb'))
carriers = pickle.load(open('carriers.pickle', 'rb'))
oss = pickle.load(open('oss.pickle', 'rb'))
brands = pickle.load(open('brands.pickle', 'rb'))

app.inserter.insert_all(models=models, carriers=carriers, oss=oss, brands=brands)

