from flask import Flask
#flask_cors importing
from flask_cors import CORS,cross_origin

app = Flask(__name__)
#to allow the react js app to access back-end
CORS(app)
# This line adds the hasura example routes form the hasura.py file.
# Delete these two lines, and delete the file to remove them from your project
from .hasura import hasura_examples
app.register_blueprint(hasura_examples)
#importing the actual code from server.py
from .server import *
