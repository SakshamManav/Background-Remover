from flask import Flask, request, send_file, jsonify
from rembg import remove
from PIL import Image
import io
import platform
from flask_cors import CORS
import os

# Debug PORT
print(f"PORT environment variable: {os.environ.get('PORT', 'Not set')}")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Add root route for health check
@app.route('/', methods=['GET', 'HEAD'])
def health_check():
    return jsonify({'status': 'ok'}), 200

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/remove-bg', methods=['POST'])
def remove_background():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        if not allowed_file(file.filename):
            return jsonify({'error': 'Unsupported file format. Use PNG, JPG, or JPEG'}), 400

        input_image = Image.open(file.stream)
        output_image = remove(input_image)

        output_buffer = io.BytesIO()
        output_image.save(output_buffer, format='PNG')
        output_buffer.seek(0)

        return send_file(
            output_buffer,
            mimetype='image/png',
            as_attachment=True,
            download_name='background_removed.png'
        )

    except Exception as e:
        return jsonify({'error': f'Processing failed: {str(e)}'}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Fallback for local development
    app.run(host='0.0.0.0', port=port)
