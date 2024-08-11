import numpy as np
import cv2
import re
import sqlite3
import pytesseract

# Load the Haar Cascade classifier for detecting Russian car plates
carplate_haar_cascade = cv2.CascadeClassifier('./haarcascade_russian_plate_number.xml')

# Function to detect car plates in an image
def carplate_detect(image):
    carplate_overlay = image.copy() 
    carplate_rects = carplate_haar_cascade.detectMultiScale(carplate_overlay, scaleFactor=1.1, minNeighbors=3)
    for x, y, w, h in carplate_rects: 
        cv2.rectangle(carplate_overlay, (x, y), (x + w, y + h), (0, 255, 0), 5) 
    return carplate_overlay, carplate_rects

# Function to extract the car plate from the image
def carplate_extract(carplate_img_rgb):
    carplate_rects = carplate_haar_cascade.detectMultiScale(carplate_img_rgb, scaleFactor=1.1, minNeighbors=5)
    if len(carplate_rects) == 0:
        return None
    
    for x, y, w, h in carplate_rects: 
        carplate_img = carplate_img_rgb[y:y + h, x:x + w]
        return carplate_img

# Function to detect the number plate and return the detected number
def detected_number_plate(img_path):
    # Read the car image
    carplate_img = cv2.imread(img_path)
    if carplate_img is None:
        return "Image not found."

    # Convert to RGB
    carplate_img_rgb = cv2.cvtColor(carplate_img, cv2.COLOR_BGR2RGB)

    # Detect the car plate
    detected_carplate_img, carplate_rects = carplate_detect(carplate_img_rgb)
    carplate_extract_img = carplate_extract(carplate_img_rgb)

    if carplate_extract_img is None:
        return "No license plate detected."

    # Resize the extracted image for better OCR results
    carplate_extract_img = cv2.resize(carplate_extract_img, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)

    # Convert the image to grayscale for better text detection
    gray = cv2.cvtColor(carplate_extract_img, cv2.COLOR_RGB2GRAY)

    # Apply adaptive thresholding to prepare the image for OCR
    thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

    # Use morphology to clean up the thresholded image (optional, improves accuracy)
    kernel = np.ones((3, 3), np.uint8)
    morph = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

    # Use pytesseract to perform OCR on the processed image
    custom_config = r'--oem 3 --psm 8 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    detected_number = pytesseract.image_to_string(morph, config=custom_config)

    # Clean up the detected number by removing any unwanted characters
    detected_number = detected_number.strip().replace(" ", "")

    return detected_number

# Function to get vehicle information from the local database
def get_vehicle_info(plate_number):
    try:
        # Connect to SQLite database
        conn = sqlite3.connect('vehicle_database.db')
        cursor = conn.cursor()

        # Query the database for vehicle information based on the plate number
        cursor.execute("SELECT * FROM vehicles WHERE plate_number = ?", (plate_number,))
        vehicle = cursor.fetchone()

        conn.close()

        if vehicle:
            details = (
                f"\nVehicle Registration Number : {vehicle[0]}\n"
                f"Owner name : {vehicle[1]}\n"
                f"Car Company : {vehicle[2]}\n"
                f"Car Model : {vehicle[3]}\n"
                f"Fuel Type : {vehicle[4]}\n"
                f"Registration Year : {vehicle[5]}\n"
                f"Insurance : {vehicle[6]}\n"
                f"Vehicle ID : {vehicle[7]}\n"
                f"Engine No. : {vehicle[8]}\n"
                f"Location RTO : {vehicle[9]}"
            )
            return details
        else:
            return "Vehicle information not found in the database."
    except Exception as e:
        return f"Database error: {str(e)}"

if __name__ == "__main__":
    img_path = './user_car_Image/sample_image.jpg'  # Path to the image
    detected_plate_number = detected_number_plate(img_path)
    
    if detected_plate_number:
        print(f"Detected Number Plate: {detected_plate_number}")
        vehicle_info = get_vehicle_info(detected_plate_number)
        print(vehicle_info)
