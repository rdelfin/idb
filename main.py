from flask import Flask, render_template, jsonify
from functools import lru_cache
import os
app = Flask(__name__)

from app.db_interface import Database

db = Database()

@app.route('/')
@lru_cache(maxsize=1)
def hello_world():
    return render_template('index.html')

@app.route('/models', methods=['GET'])
@lru_cache(maxsize=1)
def models_get():
    return jsonify([model.serialize() for model in db.get_model_all()])

@app.route('/brands', methods=['GET'])
@lru_cache(maxsize=1)
def brands_get():
    return jsonify([brand.serialize() for brand in db.get_brand_all()])

@app.route('/os', methods=['GET'])
@lru_cache(maxsize=1)
def os_get():
    return jsonify([os.serialize() for os in db.get_os_all()])

@app.route('/carriers', methods=['GET'])
@lru_cache(maxsize=1)
def carriers_get():
    return jsonify([carrier.serialize() for carrier in db.get_carrier_all()])

@app.route('/models/<id>')
@lru_cache(maxsize=1024)
def model_id_get(id):
    model = db.get_model_id(id)
    if model is None:
        return jsonify({"error": "Model not found"}), 404
    return jsonify(model.serialize())

@app.route('/brands/<id>')
@lru_cache(maxsize=1024)
def brands_id_get(id):
    brand = db.get_brand_id(id)
    if brand is None:
        return jsonify({"error": "Brand not found"}), 404
    return jsonify(brand.serialize())

@app.route('/os/<id>')
@lru_cache(maxsize=1024)
def os_id_get(id):
    os = db.get_os_id(id)
    if os is None:
        return jsonify({"error": "OS not found"}), 404
    return jsonify(os.serialize())

@app.route('/carriers/<id>')
@lru_cache(maxsize=1024)
def carriers_id_get(id):
    carrier = db.get_carrier_id(id)
    if carrier is None:
        return jsonify({"error": "Carrier not found"}), 404
    return jsonify(carrier.serialize())

if __name__ == '__main__':
    port = os.environ.get('SERVER_PORT')
    if not port is None:
        port = int(port)
    app.run(port=port, debug=True)
