from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)