from flask import Flask, redirect, url_for, render_template, request
import os
from werkzeug.utils import secure_filename
import cv2
import ANPR_Detection
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS
CORS(app)

# Set the upload folder for storing images
UPLOAD_FOLDER = 'static/cars'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # Handle POST Request here
        return render_template('index.html')
    return render_template('index.html')

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from the POST request
        f = request.files['file1']

        # Save the file to the specified upload folder
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename))
        f.save(file_path)

        # Use the saved image to detect the number plate
        final_detected_number_plate = ANPR_Detection.detected_number_plate(file_path)
        
        if not final_detected_number_plate:
            return render_template("index.html", output="Number plate could not be detected. Please upload a clearer image.")

        # Get vehicle information from the local database
        vehicle_info = ANPR_Detection.get_vehicle_info(final_detected_number_plate)
        
        # Render the template with the vehicle information
        return render_template("index.html", output=vehicle_info)

    return render_template('index.html')

if __name__ == '__main__':
    # DEBUG is set to True. Change for production
    app.run(debug=True)