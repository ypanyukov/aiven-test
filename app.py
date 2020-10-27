from flask import Flask, render_template
from flask_caching import Cache

from services.aiven import Aiven

cache = Cache(config={'CACHE_TYPE': 'simple'})

app = Flask(__name__)
cache.init_app(app)

aiven_client = Aiven()

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/static/<path:path>")
def get_static(path):
    return app.send_from_directory('client/build/static', path)

# 10 seconds caching just for testing
@app.route('/api/clouds')
@cache.cached(timeout=10)
def api_clouds():
    try:
        clouds = aiven_client.clouds()
        return {
            'success': True,
            'data': clouds
        }
    except Exception as e:
        print(e)
        return {
            'success': False,
            'error': {
                'code': 1,
                'message': 'Something wrong'
            }
        }
