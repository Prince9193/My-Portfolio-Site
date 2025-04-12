from flask import Flask, render_template, send_from_directory, url_for

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

# Serve static files
@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('./css', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('./js', filename)

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('./assets', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)