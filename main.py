from flask import Flask, render_template, jsonify
app = Flask(__name__)

from app.db_interface import Database

db = Database()

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/models', methods=['GET'])
def models_get():
    return jsonify([model.serialize() for model in db.get_model_all()])

@app.route('/brands', methods=['GET'])
def brands_get():
    return jsonify([brand.serialize() for brand in db.get_brand_all()])

@app.route('/os', methods=['GET'])
def os_get():
    return jsonify([os.serialize() for os in db.get_os_all()])

@app.route('/carriers', methods=['GET'])
def carriers_get():
    return jsonify([carrier.serialize() for carrier in db.get_carrier_all()])

if __name__ == '__main__':
  app.run(debug=True)
