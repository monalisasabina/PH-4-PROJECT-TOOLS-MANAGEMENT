#!/usr/bin/env python 3

from flask import Flask,request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Employee, StoreEmployee, Tools, ToolRecords

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)




if __name__ == '__main__':
    app.run(port=5555, debug=True)