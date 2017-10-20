from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/models', methods=['GET'])
def models_get():
    raise NotImplementedError

@app.route('/brands', methods=['GET'])
def models_get():
    raise NotImplementedError

@app.route('/os', methods=['GET'])
def models_get():
    raise NotImplementedError

@app.route('/carriers', methods=['GET'])
def models_get():
    raise NotImplementedError

if __name__ == '__main__':
  app.run(debug=True)
