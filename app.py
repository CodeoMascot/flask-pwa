from flask import Flask, render_template, make_response, send_from_directory

app = Flask(__name__)


@app.route('/home')
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/offline')
def offline():
    return render_template('offline.html')

@app.route('/orders')
def orders():
    return render_template('generic.html', content="orders")

@app.route('/dashboards')
def dashboards():
    return render_template('generic.html', content="dashboards")

@app.route('/products')
def products():
    return render_template('generic.html', content="products")

@app.route('/customers')
def customers():
    return render_template('generic.html', content="customers")


@app.route('/service-worker.js')
def service_worker():
    response = make_response(send_from_directory('static', 'js/service-worker.js'))
    return response

@app.after_request
def add_header(response):
    """
    Add headers to tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response