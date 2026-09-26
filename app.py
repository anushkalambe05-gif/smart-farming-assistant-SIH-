import streamlit as st
import cv2
import numpy as np
import requests
import hashlib


# ============================================================
# PAGE CONFIGURATION
# ============================================================

st.set_page_config(
    page_title="Smart Farming Assistant",
    page_icon="🌱",
    layout="wide"
)


# ============================================================
# CONSTANTS
# ============================================================

MOISTURE_THRESHOLD = 50

# Android phone running the SMS Gateway
SMS_GATEWAY_URL = "http://10.87.172.208:8080/send-sms" 
 
 
# ============================================================ 
# SESSION STATE 
# ============================================================ 
 
if "edge_ai_results" not in st.session_state: 
    st.session_state.edge_ai_results = {} 
 
if "camera_results" not in st.session_state: 
    st.session_state.camera_results = {} 
 
if "sms_status" not in st.session_state: 
    st.session_state.sms_status = "" 
 
if "last_sms_check" not in st.session_state: 
    st.session_state.last_sms_check = None 
 
 
# ============================================================ 
# DEMO SITUATIONS 
# ============================================================ 
 
SITUATIONS = { 
    "Normal": { 
        "moisture": 55, 
        "soil_temp": 27, 
        "ph": 6.5, 
        "ec": 1.2, 
        "air_temp": 29, 
        "humidity": 60, 
        "pressure": 1012, 
        "rainfall": 2 
    }, 
 
    "Water Stress / Drought": { 
        "moisture": 15, 
        "soil_temp": 34, 
        "ph": 6.5, 
        "ec": 1.1, 
        "air_temp": 38, 
        "humidity": 35, 
        "pressure": 1005, 
        "rainfall": 0 
    }, 
 
    "Natural Calamity": { 
        "moisture": 90, 
        "soil_temp": 27, 
        "ph": 6.8, 
        "ec": 1.4, 
        "air_temp": 29, 
        "humidity": 94, 
        "pressure": 985, 
        "rainfall": 80 
    }, 
 
    "Heat Stress": { 
        "moisture": 25, 
        "soil_temp": 42, 
        "ph": 6.4, 
        "ec": 1.2, 
        "air_temp": 43, 
        "humidity": 30, 
        "pressure": 1002, 
        "rainfall": 0 
    }, 
 
    "Soil Health Problem": { 
        "moisture": 48, 
        "soil_temp": 29, 
        "ph": 8.5, 
        "ec": 3.2, 
        "air_temp": 30, 
        "humidity": 58, 
        "pressure": 1010, 
        "rainfall": 2 
    }, 
 
    "Pest Infestation": { 
        "moisture": 48, 
        "soil_temp": 29, 
        "ph": 6.5, 
        "ec": 1.3, 
        "air_temp": 31, 
        "humidity": 78, 
        "pressure": 1008, 
        "rainfall": 5 
    }, 
 
    "Crop Disease": { 
        "moisture": 48, 
        "soil_temp": 28, 
        "ph": 6.5, 
        "ec": 1.3, 
        "air_temp": 30, 
        "humidity": 82, 
        "pressure": 1008, 
        "rainfall": 5 
    }, 
 
    "Multiple Problems": { 
        "moisture": 18, 
        "soil_temp": 43, 
        "ph": 8.4, 
        "ec": 3.4, 
        "air_temp": 42, 
        "humidity": 30, 
        "pressure": 995, 
        "rainfall": 0 
    } 
} 
 
 
# ============================================================ 
# GET SITUATION VALUES 
# ============================================================ 
 
def get_situation_values(situation): 
 
    values = SITUATIONS.get( 
        situation, 
        SITUATIONS["Normal"] 
    ) 
 
    return values.copy() 
 
 
# ============================================================ 
# SMS GATEWAY 
# ============================================================ 
 
def send_sms(phone_number, message): 
 
    if not phone_number.strip(): 
        return False, "Farmer phone number is empty." 
 
    try: 
 
        response = requests.post( 
            SMS_GATEWAY_URL, 
            data={ 
                "message": message 
            }, 
            timeout=30 
        ) 
 
        if response.status_code == 200: 
 
            return True, response.text 
 
        return False, ( 
            f"Gateway returned HTTP " 
            f"{response.status_code}: " 
            f"{response.text}" 
        ) 
 
    except requests.exceptions.Timeout: 
 
        return False, ( 
            "SMS Gateway connection timed out." 
        ) 
 
    except requests.exceptions.ConnectionError: 
 
        return False, ( 
            "Cannot connect to Android SMS Gateway. " 
            "Check that the Android app is open " 
            "and both devices are connected to " 
            "the same Wi-Fi." 
        ) 
 
    except Exception as e: 
 
        return False, f"SMS error: {e}" 
 
 
# ============================================================ 
# CROP IMAGE ANALYSIS 
# ============================================================ 
 
def analyze_crop_image(image_bytes): 
 
    try: 
 
        image_array = np.frombuffer( 
            image_bytes, 
            np.uint8 
        ) 
 
        image = cv2.imdecode( 
            image_array, 
            cv2.IMREAD_COLOR 
        ) 
 
        if image is None: 
            return { 
                "status": "Unknown Disease", 
                "disease": "Unknown Disease", 
                "confidence": 0 
            } 
 
        image = cv2.resize( 
            image, 
            (512, 512) 
        ) 
 
        hsv = cv2.cvtColor( 
            image, 
            cv2.COLOR_BGR2HSV 
        ) 
 
        # ---------------------------------------------------- 
        # GREEN CROP MASK 
        # ---------------------------------------------------- 
 
        lower_green = np.array( 
            [25, 30, 30] 
        ) 
 
        upper_green = np.array( 
            [95, 255, 255] 
        ) 
 
        green_mask = cv2.inRange( 
            hsv, 
            lower_green, 
            upper_green 
        ) 
 
        # ---------------------------------------------------- 
        # DAMAGE / BROWN / YELLOW MASK 
        # ---------------------------------------------------- 
 
        lower_damage = np.array( 
            [5, 40, 30] 
        ) 
 
        upper_damage = np.array( 
            [35, 255, 255] 
        ) 
 
        damage_mask = cv2.inRange( 
            hsv, 
            lower_damage, 
            upper_damage 
        ) 
 
        # ---------------------------------------------------- 
        # WHITE / PALE MASK 
        # ---------------------------------------------------- 
 
        lower_white = np.array( 
            [0, 0, 150] 
        ) 
 
        upper_white = np.array( 
            [180, 80, 255] 
        ) 
 
        white_mask = cv2.inRange( 
            hsv, 
            lower_white, 
            upper_white 
        ) 
 
        # ---------------------------------------------------- 
        # MORPHOLOGY 
        # ---------------------------------------------------- 
 
        kernel = np.ones( 
            (5, 5), 
            np.uint8 
        ) 
 
        green_mask = cv2.morphologyEx( 
            green_mask, 
            cv2.MORPH_OPEN, 
            kernel 
        ) 
 
        green_mask = cv2.morphologyEx( 
            green_mask, 
            cv2.MORPH_CLOSE, 
            kernel 
        ) 
 
        damage_mask = cv2.morphologyEx( 
            damage_mask, 
            cv2.MORPH_OPEN, 
            kernel 
        ) 
 
        damage_mask = cv2.morphologyEx( 
            damage_mask, 
            cv2.MORPH_CLOSE, 
            kernel 
        ) 
 
        # ---------------------------------------------------- 
        # RATIOS 
        # ---------------------------------------------------- 
 
        total_pixels = 512 * 512 
 
        green_ratio = ( 
            np.count_nonzero(green_mask) 
            / total_pixels 
        ) 
 
        damage_ratio = ( 
            np.count_nonzero(damage_mask) 
            / total_pixels 
        ) 
 
        white_ratio = ( 
            np.count_nonzero(white_mask) 
            / total_pixels 
        ) 
 
        # ---------------------------------------------------- 
        # NO CROP 
        # ---------------------------------------------------- 
 
        if green_ratio < 0.10: 
 
            return { 
                "status": "Unknown Disease", 
                "disease": "Unknown Disease", 
                "confidence": 45 
            } 
 
        # ---------------------------------------------------- 
        # HEALTHY 
        # ---------------------------------------------------- 
 
        if ( 
            green_ratio >= 0.30 
            and damage_ratio < 0.08 
            and white_ratio < 0.25 
        ): 
 
            return { 
                "status": "Healthy", 
                "disease": "Healthy Crop", 
                "confidence": 90 
            } 
 
        # ---------------------------------------------------- 
        # POWDERY MILDEW 
        # ---------------------------------------------------- 
 
        if ( 
            green_ratio >= 0.20 
            and white_ratio >= 0.25 
            and damage_ratio < 0.20 
        ): 
 
            return { 
                "status": "Known Disease", 
                "disease": "Powdery Mildew", 
                "confidence": 82 
            } 
 
        # ---------------------------------------------------- 
        # LEAF BLIGHT 
        # ---------------------------------------------------- 
 
        if ( 
            green_ratio >= 0.20 
            and damage_ratio >= 0.30 
        ): 
 
            return { 
                "status": "Known Disease", 
                "disease": "Leaf Blight", 
                "confidence": 80 
            } 
 
        # ---------------------------------------------------- 
        # LEAF SPOT 
        # ---------------------------------------------------- 
 
        if ( 
            green_ratio >= 0.20 
            and 
            0.15 <= damage_ratio < 0.30 
        ): 
 
            return { 
                "status": "Known Disease", 
                "disease": "Leaf Spot", 
                "confidence": 78 
            } 
 
        # ---------------------------------------------------- 
        # RUST 
        # ---------------------------------------------------- 
 
        if ( 
            green_ratio >= 0.20 
            and damage_ratio >= 0.08 
        ): 
 
            return { 
                "status": "Known Disease", 
                "disease": "Rust", 
                "confidence": 74 
            } 
 
        # ---------------------------------------------------- 
        # UNKNOWN DISEASE 
        # ---------------------------------------------------- 
 
        if ( 
            green_ratio >= 0.15 
            and damage_ratio >= 0.05 
        ): 
 
            return { 
                "status": "Unknown Disease", 
                "disease": "Unknown Disease", 
                "confidence": 65 
            } 
 
        # ---------------------------------------------------- 
        # FALLBACK 
        # ---------------------------------------------------- 
 
        return { 
            "status": "Healthy", 
            "disease": "Healthy Crop", 
            "confidence": 70 
        } 
 
    except Exception: 
 
        return { 
            "status": "Unknown Disease", 
            "disease": "Unknown Disease", 
            "confidence": 40 
        } 
 
 
# ============================================================ 
# SOIL ANALYSIS 
# ============================================================ 
 
def analyze_soil( 
    moisture, 
    soil_temp, 
    ph, 
    ec 
): 
 
    problems = [] 
 
    if moisture < MOISTURE_THRESHOLD: 
 
        problems.append( 
            f"Soil moisture is below irrigation threshold ({moisture}%)." 
        ) 
 
    elif moisture > 80: 
 
        problems.append( 
            "Excess soil moisture detected." 
        ) 
 
    if soil_temp > 40: 
 
        problems.append( 
            "Soil temperature is very high." 
        ) 
 
    if ph < 5.5: 
 
        problems.append( 
            "Soil is acidic." 
        ) 
 
    elif ph > 8.0: 
 
        problems.append( 
            "Soil is alkaline." 
        ) 
 
    if ec > 3.0: 
 
        problems.append( 
            "High EC detected; possible salt stress." 
        ) 
 
    return problems 
 
 
# ============================================================ 
# ENVIRONMENT ANALYSIS 
# ============================================================ 
 
def analyze_environment( 
    air_temp, 
    humidity, 
    pressure 
): 
 
    problems = [] 
 
    if air_temp >= 40: 
 
        problems.append( 
            "Extreme heat detected." 
        ) 
 
    elif air_temp >= 35: 
 
        problems.append( 
            "High air temperature detected." 
        ) 
 
    if humidity >= 90: 
 
        problems.append( 
            "Very high humidity detected." 
        ) 
 
    if pressure < 990: 
 
        problems.append( 
            "Low atmospheric pressure detected." 
        ) 
 
    return problems 
 
 
# ============================================================ 
# NATURAL CALAMITY ANALYSIS 
# ============================================================ 
 
def analyze_calamity( 
    moisture, 
    temperature, 
    humidity, 
    rainfall 
): 
 
    problems = [] 
 
    if ( 
        moisture < 20 
        and rainfall == 0 
    ): 
 
        problems.append( 
            "Water stress / drought conditions detected." 
        ) 
 
    if ( 
        moisture > 85 
        or rainfall >= 60 
    ): 
 
        problems.append( 
            "Natural calamity: excess water conditions detected." 
        ) 
 
    if temperature >= 42: 
 
        problems.append( 
            "Extreme heat conditions detected." 
        ) 
 
    if rainfall >= 80: 
 
        problems.append( 
            "Heavy rainfall detected." 
        ) 
 
    return problems 
 
 
# ============================================================ 
# AUTOMATIC IRRIGATION 
# ============================================================ 
 
def automatic_irrigation(moisture, rainfall): 
 
    if moisture < MOISTURE_THRESHOLD: 
 
        return { 
            "status": "ON", 
            "reason": ( 
                f"Soil moisture is {moisture}%, " 
                f"which is below the fixed threshold " 
                f"of {MOISTURE_THRESHOLD}%." 
            ) 
        } 
 
    return { 
        "status": "OFF", 
        "reason": ( 
            f"Soil moisture is {moisture}%, " 
            f"which is at or above the fixed threshold " 
            f"of {MOISTURE_THRESHOLD}%." 
        ) 
    } 
 
 
# ============================================================ 
# CAMERA SMS PROBLEM / RECOMMENDATION 
# ============================================================ 
 
def camera_problem_and_recommendation( 
    camera_name, 
    result 
): 
 
    if not result: 
        return [], [] 
 
    status = result.get( 
        "status", 
        "" 
    ) 
 
    disease = result.get( 
        "disease", 
        "" 
    ) 
 
    problems = [] 
    recommendations = [] 
 
    if status == "Unknown Disease": 
 
        problems.append( 
            f"{camera_name}: Unknown crop disease detected." 
        ) 
 
        recommendations.append( 
            "Inspect the affected crop immediately." 
        ) 
 
    elif status == "Known Disease": 
 
        problems.append( 
            f"{camera_name}: {disease} detected." 
        ) 
 
        recommendations.append( 
            f"Inspect {camera_name} and take suitable disease-control action." 
        ) 
 
    return problems, recommendations 
 
 
# ============================================================ 
# CREATE FARMER-FRIENDLY SMS 
# ============================================================ 
 
def create_farmer_sms( 
    zone_camera_data, 
    zone_analysis_data 
): 
 
    all_problems = [] 
    all_recommendations = [] 
 
    urgent_unknown = False 
 
    # -------------------------------------------------------- 
    # CAMERA RESULTS 
    # -------------------------------------------------------- 
 
    for zone_name, cameras in zone_camera_data.items(): 
 
        for camera_name, result in cameras.items(): 
 
            problems, recommendations = ( 
                camera_problem_and_recommendation( 
                    camera_name, 
                    result 
                ) 
            ) 
 
            if result: 
                if result.get("status") == "Unknown Disease": 
                    urgent_unknown = True 
 
            for problem in problems: 
 
                all_problems.append( 
                    f"{zone_name} - {problem}" 
                ) 
 
            for recommendation in recommendations: 
 
                all_recommendations.append( 
                    f"{zone_name} - {recommendation}" 
                ) 
 
    # -------------------------------------------------------- 
    # SENSOR / ENVIRONMENT / CALAMITY RESULTS 
    # -------------------------------------------------------- 
 
    for zone_name, data in zone_analysis_data.items(): 
 
        soil_problems = data.get( 
            "soil_problems", 
            [] 
        ) 
 
        environment_problems = data.get( 
            "environment_problems", 
            [] 
        ) 
 
        calamity_problems = data.get( 
            "calamity_problems", 
            [] 
        ) 
 
        irrigation = data.get( 
            "irrigation", 
            {} 
        ) 
 
        # ---------------------------------------------------- 
        # SOIL 
        # ---------------------------------------------------- 
 
        for problem in soil_problems: 
 
            all_problems.append( 
                f"{zone_name} - {problem}" 
            ) 
 
            lower = problem.lower() 
 
            if "moisture" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Start irrigation and conserve available water." 
                ) 
 
            elif "acidic" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Apply suitable soil amendment after soil testing." 
                ) 
 
            elif "alkaline" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Apply suitable soil correction after soil testing." 
                ) 
 
            elif ( 
                "ec" in lower 
                or "salt" in lower 
            ): 
 
                all_recommendations.append( 
                    f"{zone_name} - Check salinity and use suitable soil/water management." 
                ) 
 
            elif "temperature" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Protect the crop from excessive soil heat." 
                ) 
 
        # ---------------------------------------------------- 
        # ENVIRONMENT 
        # ---------------------------------------------------- 
 
        for problem in environment_problems: 
 
            all_problems.append( 
                f"{zone_name} - {problem}" 
            ) 
 
            lower = problem.lower() 
 
            if ( 
                "heat" in lower 
                or "temperature" in lower 
            ): 
 
                all_recommendations.append( 
                    f"{zone_name} - Protect the crop from heat stress." 
                ) 
 
            elif "humidity" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Monitor the crop for fungal disease." 
                ) 
 
            elif "pressure" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Monitor weather conditions closely." 
                ) 
 
        # ---------------------------------------------------- 
        # CALAMITY 
        # ---------------------------------------------------- 
 
        for problem in calamity_problems: 
 
            all_problems.append( 
                f"{zone_name} - {problem}" 
            ) 
 
            lower = problem.lower() 
 
            if "drought" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Start irrigation and conserve available water." 
                ) 
 
            elif "excess water" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Stop irrigation and check field drainage." 
                ) 
 
            elif "heat" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Protect the crop from extreme heat." 
                ) 
 
            elif "rain" in lower: 
 
                all_recommendations.append( 
                    f"{zone_name} - Monitor drainage and protect the crop from excess water." 
                ) 
 
        # ---------------------------------------------------- 
        # IRRIGATION 
        # ---------------------------------------------------- 
 
        if irrigation.get("status") == "ON": 
 
            all_recommendations.append( 
                f"{zone_name} - Irrigation has been started automatically." 
            ) 
 
    # -------------------------------------------------------- 
    # REMOVE DUPLICATES 
    # -------------------------------------------------------- 
 
    all_problems = list( 
        dict.fromkeys(all_problems) 
    ) 
 
    all_recommendations = list( 
        dict.fromkeys(all_recommendations) 
    ) 
 
    # -------------------------------------------------------- 
    # HEALTHY MESSAGE 
    # -------------------------------------------------------- 
 
    if not all_problems: 
 
        return ( 
            "🌱 SMART FARMING UPDATE\n\n" 
            "📍 Zone 1 & Zone 2\n\n" 
            "✅ Status:\n" 
            "No major problem detected.\n\n" 
            "💡 Recommendation:\n" 
            "Continue normal monitoring.\n\n" 
            "💧 Irrigation: OFF" 
        ) 
 
    # -------------------------------------------------------- 
    # ALERT MESSAGE 
    # -------------------------------------------------------- 
 
    if urgent_unknown: 
 
        message = ( 
            "🚨 SMART FARMING ALERT\n\n" 
        ) 
 
    else: 
 
        message = ( 
            "🌱 SMART FARMING ALERT\n\n" 
        ) 
 
    message += "⚠️ Problems detected:\n" 
 
    for problem in all_problems: 
 
        message += ( 
            f"• {problem}\n" 
        ) 
 
    message += "\n💡 Recommendations:\n" 
 
    for recommendation in all_recommendations: 
 
        message += ( 
            f"• {recommendation}\n" 
        ) 
 
    # -------------------------------------------------------- 
    # IRRIGATION SUMMARY 
    # -------------------------------------------------------- 
 
    irrigation_statuses = [] 
 
    for zone_name, data in zone_analysis_data.items(): 
 
        irrigation = data.get( 
            "irrigation", 
            {} 
        ) 
 
        status = irrigation.get( 
            "status", 
            "OFF" 
        ) 
 
        irrigation_statuses.append( 
            f"{zone_name}: {status}" 
        ) 
 
    message += ( 
        "\n💧 Irrigation:\n" 
        + "\n".join( 
            f"• {x}" 
            for x in irrigation_statuses 
        ) 
    ) 
 
    if urgent_unknown: 
 
        message += ( 
            "\n\n🚨 URGENT: " 
            "Please check the affected crop immediately." 
        ) 
 
    return message 
 
 
# ============================================================ 
# SIDEBAR 
# ============================================================ 
 
st.sidebar.title("🌱 Smart Farming Assistant") 
 
st.sidebar.subheader( 
    "📱 Farmer SMS Alert" 
) 
 
farmer_phone = st.sidebar.text_input( 
    "Farmer Phone Number", 
    placeholder="+91XXXXXXXXXX" 
) 
 
st.sidebar.caption( 
    "The Android SMS Gateway sends the alert " 
    "to the saved/selected number(s)." 
) 
 
st.sidebar.divider() 
 
st.sidebar.subheader( 
    "🎯 Demo Situation" 
) 
 
demo_situation = st.sidebar.selectbox( 
    "Select Situation", 
    list(SITUATIONS.keys()) 
) 
 
st.sidebar.divider() 
 
st.sidebar.subheader( 
    "🌾 Farm Setup" 
) 
 
st.sidebar.write( 
    "Farm Size: 1 Acre" 
) 
 
st.sidebar.write( 
    "Sensing Zones: 2" 
) 
 
st.sidebar.write( 
    "Zone 1 + Zone 2" 
) 
 
st.sidebar.write( 
    "Local Edge AI: Enabled" 
) 
 
st.sidebar.write( 
    "Core Operation: Offline" 
) 
 
st.sidebar.divider() 
 
st.sidebar.subheader( 
    "💧 Fixed Irrigation Threshold" 
) 
 
st.sidebar.metric( 
    "Soil Moisture", 
    f"{MOISTURE_THRESHOLD}%" 
) 
 
st.sidebar.caption( 
    "If soil moisture is below 25%, " 
    "automatic irrigation is ON." 
) 
 
 
# ============================================================ 
# MAIN TITLE 
# ============================================================ 
 
st.title( 
    "🌱 Smart Farming Assistant" 
) 
 
st.caption( 
    "Edge AI based crop, soil, environment and irrigation monitoring" 
) 
 
 
# ============================================================ 
# DEFAULT VALUES 
# ============================================================ 
 
defaults = get_situation_values( 
    demo_situation 
) 
 
 
# ============================================================ 
# TWO ZONES 
# ============================================================ 
 
zone1, zone2 = st.columns(2) 
 
 
# ============================================================ 
# ZONE 1 
# ============================================================ 
 
with zone1: 
 
    st.header("🟢 Zone 1") 
 
    st.subheader("📊 Sensors") 
 
    moisture1 = st.slider( 
        "Soil Moisture (%)", 
        0, 
        100, 
        defaults["moisture"], 
        key="moisture1" 
    ) 
 
    soil_temp1 = st.slider( 
        "Soil Temperature (°C)", 
        0, 
        60, 
        defaults["soil_temp"], 
        key="soil_temp1" 
    ) 
 
    ph1 = st.slider( 
        "pH", 
        0.0, 
        14.0, 
        float(defaults["ph"]), 
        0.1, 
        key="ph1" 
    ) 
 
    ec1 = st.slider( 
        "EC (mS/cm)", 
        0.0, 
        10.0, 
        float(defaults["ec"]), 
        0.1, 
        key="ec1" 
    ) 
 
    air_temp1 = st.slider( 
        "Air Temperature (°C)", 
        0, 
        60, 
        defaults["air_temp"], 
        key="air_temp1" 
    ) 
 
    humidity1 = st.slider( 
        "Humidity (%)", 
        0, 
        100, 
        defaults["humidity"], 
        key="humidity1" 
    ) 
 
    pressure1 = st.slider( 
        "Pressure (hPa)", 
        900, 
        1100, 
        defaults["pressure"], 
        key="pressure1" 
    ) 
 
    rainfall1 = st.slider( 
        "Rainfall (mm)", 
        0, 
        200, 
        defaults["rainfall"], 
        key="rainfall1" 
    ) 
 
    st.subheader("📷 Camera 1") 
 
    camera1_1 = st.camera_input( 
        "Capture Zone 1 - Camera 1", 
        key="camera1_1" 
    ) 
 
    st.subheader("📷 Camera 2") 
 
    camera1_2 = st.camera_input( 
        "Capture Zone 1 - Camera 2", 
        key="camera1_2" 
    ) 
 
    st.subheader("📁 Upload Crop Image") 
 
    upload1 = st.file_uploader( 
        "Upload Zone 1 Crop Image", 
        type=[ 
            "jpg", 
            "jpeg", 
            "png" 
        ], 
        key="upload1" 
    ) 
 
 
# ============================================================ 
# ZONE 2 
# ============================================================ 
 
with zone2: 
 
    st.header("🔵 Zone 2") 
 
    st.subheader("📊 Sensors") 
 
    moisture2 = st.slider( 
        "Soil Moisture (%)", 
        0, 
        100, 
        defaults["moisture"], 
        key="moisture2" 
    ) 
 
    soil_temp2 = st.slider( 
        "Soil Temperature (°C)", 
        0, 
        60, 
        defaults["soil_temp"], 
        key="soil_temp2" 
    ) 
 
    ph2 = st.slider( 
        "pH", 
        0.0, 
        14.0, 
        float(defaults["ph"]), 
        0.1, 
        key="ph2" 
    ) 
 
    ec2 = st.slider( 
        "EC (mS/cm)", 
        0.0, 
        10.0, 
        float(defaults["ec"]), 
        0.1, 
        key="ec2" 
    ) 
 
    air_temp2 = st.slider( 
        "Air Temperature (°C)", 
        0, 
        60, 
        defaults["air_temp"], 
        key="air_temp2" 
    ) 
 
    humidity2 = st.slider( 
        "Humidity (%)", 
        0, 
        100, 
        defaults["humidity"], 
        key="humidity2" 
    ) 
 
    pressure2 = st.slider( 
        "Pressure (hPa)", 
        900, 
        1100, 
        defaults["pressure"], 
        key="pressure2" 
    ) 
 
    rainfall2 = st.slider( 
        "Rainfall (mm)", 
        0, 
        200, 
        defaults["rainfall"], 
        key="rainfall2" 
    ) 
 
    st.subheader("📷 Camera 1") 
 
    camera2_1 = st.camera_input( 
        "Capture Zone 2 - Camera 1", 
        key="camera2_1" 
    ) 
 
    st.subheader("📷 Camera 2") 
 
    camera2_2 = st.camera_input( 
        "Capture Zone 2 - Camera 2", 
        key="camera2_2" 
    ) 
 
    st.subheader("📁 Upload Crop Image") 
 
    upload2 = st.file_uploader( 
        "Upload Zone 2 Crop Image", 
        type=[ 
            "jpg", 
            "jpeg", 
            "png" 
        ], 
        key="upload2" 
    ) 
 
 
# ============================================================ 
# CAMERA ANALYSIS 
# ============================================================ 
 
st.divider() 
 
st.header( 
    "📷 Crop Health Detection" 
) 
 
if st.button( 
    "🔍 RUN EDGE AI CROP CAMERA ANALYSIS", 
    use_container_width=True 
): 
 
    camera_results = { 
        "Zone 1": {}, 
        "Zone 2": {} 
    } 
 
    # -------------------------------------------------------- 
    # ZONE 1 CAMERA 1 
    # -------------------------------------------------------- 
 
    if camera1_1 is not None: 
 
        result = analyze_crop_image( 
            camera1_1.getvalue() 
        ) 
 
        camera_results["Zone 1"][ 
            "Camera 1" 
        ] = result 
 
    # -------------------------------------------------------- 
    # ZONE 1 CAMERA 2 
    # -------------------------------------------------------- 
 
    if camera1_2 is not None: 
 
        result = analyze_crop_image( 
            camera1_2.getvalue() 
        ) 
 
        camera_results["Zone 1"][ 
            "Camera 2" 
        ] = result 
 
    # -------------------------------------------------------- 
    # ZONE 1 UPLOAD 
    # -------------------------------------------------------- 
 
    if upload1 is not None: 
 
        result = analyze_crop_image( 
            upload1.getvalue() 
        ) 
 
        camera_results["Zone 1"][ 
            "Uploaded Image" 
        ] = result 
 
    # -------------------------------------------------------- 
    # ZONE 2 CAMERA 1 
    # -------------------------------------------------------- 
 
    if camera2_1 is not None: 
 
        result = analyze_crop_image( 
            camera2_1.getvalue() 
        ) 
 
        camera_results["Zone 2"][ 
            "Camera 1" 
        ] = result 
 
    # -------------------------------------------------------- 
    # ZONE 2 CAMERA 2 
    # -------------------------------------------------------- 
 
    if camera2_2 is not None: 
 
        result = analyze_crop_image( 
            camera2_2.getvalue() 
        ) 
 
        camera_results["Zone 2"][ 
            "Camera 2" 
        ] = result 
 
    # -------------------------------------------------------- 
    # ZONE 2 UPLOAD 
    # -------------------------------------------------------- 
 
    if upload2 is not None: 
 
        result = analyze_crop_image( 
            upload2.getvalue() 
        ) 
 
        camera_results["Zone 2"][ 
            "Uploaded Image" 
        ] = result 
 
    st.session_state.camera_results = ( 
        camera_results 
    ) 
 
 
# ============================================================ 
# DISPLAY CAMERA RESULTS 
# ============================================================ 
 
if st.session_state.camera_results: 
 
    result_col1, result_col2 = st.columns(2) 
 
    for zone_name, result_col in zip( 
        ["Zone 1", "Zone 2"], 
        [result_col1, result_col2] 
    ): 
 
        with result_col: 
 
            st.subheader( 
                f"📍 {zone_name}" 
            ) 
 
            zone_results = ( 
                st.session_state.camera_results.get( 
                    zone_name, 
                    {} 
                ) 
            ) 
 
            if not zone_results: 
 
                st.info( 
                    "No crop image provided." 
                ) 
 
            for camera_name, result in zone_results.items(): 
 
                status = result.get( 
                    "status", 
                    "Unknown" 
                ) 
 
                disease = result.get( 
                    "disease", 
                    "" 
                ) 
 
                confidence = result.get( 
                    "confidence", 
                    0 
                ) 
 
                st.write( 
                    f"**{camera_name}**" 
                ) 
 
                if status == "Healthy": 
 
                    st.success( 
                        f"✅ Healthy Crop " 
                        f"({confidence}%)" 
                    ) 
 
                elif status == "Known Disease": 
 
                    st.warning( 
                        f"⚠️ {disease} " 
                        f"({confidence}%)" 
                    ) 
 
                elif status == "Unknown Disease": 
 
                    st.error( 
                        f"🚨 Unknown Disease " 
                        f"({confidence}%)" 
                    ) 
 
                else: 
 
                    st.info( 
                        f"Status: {status}" 
                    ) 
 
 
# ============================================================ 
# EDGE AI SENSOR ANALYSIS 
# ============================================================ 
 
st.divider() 
 
st.header( 
    "🤖 Edge AI Analysis" 
) 
 
if st.button( 
    "🚀 RUN EDGE AI FOR BOTH ZONES", 
    use_container_width=True 
): 
 
    # ======================================================== 
    # ZONE 1 
    # ======================================================== 
 
    soil_problems1 = analyze_soil( 
        moisture1, 
        soil_temp1, 
        ph1, 
        ec1 
    ) 
 
    environment_problems1 = analyze_environment( 
        air_temp1, 
        humidity1, 
        pressure1 
    ) 
 
    calamity_problems1 = analyze_calamity( 
        moisture1, 
        air_temp1, 
        humidity1, 
        rainfall1 
    ) 
 
    irrigation1 = automatic_irrigation( 
        moisture1, 
        rainfall1 
    ) 
 
    # ======================================================== 
    # ZONE 2 
    # ======================================================== 
 
    soil_problems2 = analyze_soil( 
        moisture2, 
        soil_temp2, 
        ph2, 
        ec2 
    ) 
 
    environment_problems2 = analyze_environment( 
        air_temp2, 
        humidity2, 
        pressure2 
    ) 
 
    calamity_problems2 = analyze_calamity( 
        moisture2, 
        air_temp2, 
        humidity2, 
        rainfall2 
    ) 
 
    irrigation2 = automatic_irrigation( 
        moisture2, 
        rainfall2 
    ) 
 
    # ======================================================== 
    # SAVE RESULTS 
    # ======================================================== 
 
    st.session_state.edge_ai_results = { 
 
        "Zone 1": { 
 
            "soil_problems": 
                soil_problems1, 
 
            "environment_problems": 
                environment_problems1, 
 
            "calamity_problems": 
                calamity_problems1, 
 
            "irrigation": 
                irrigation1, 
 
            "moisture": 
                moisture1, 
 
            "soil_temp": 
                soil_temp1, 
 
            "ph": 
                ph1, 
 
            "ec": 
                ec1, 
 
            "air_temp": 
                air_temp1, 
 
            "humidity": 
                humidity1, 
 
            "pressure": 
                pressure1, 
 
            "rainfall": 
                rainfall1 
        }, 
 
        "Zone 2": { 
 
            "soil_problems": 
                soil_problems2, 
 
            "environment_problems": 
                environment_problems2, 
 
            "calamity_problems": 
                calamity_problems2, 
 
            "irrigation": 
                irrigation2, 
 
            "moisture": 
                moisture2, 
 
            "soil_temp": 
                soil_temp2, 
 
            "ph": 
                ph2, 
 
            "ec": 
                ec2, 
 
            "air_temp": 
                air_temp2, 
 
            "humidity": 
                humidity2, 
 
            "pressure": 
                pressure2, 
 
            "rainfall": 
                rainfall2 
        } 
    } 
 
    # ======================================================== 
    # DISPLAY ANALYSIS 
    # ======================================================== 
 
    analysis_col1, analysis_col2 = st.columns(2) 
 
    for zone_name, analysis_col in zip( 
        ["Zone 1", "Zone 2"], 
        [analysis_col1, analysis_col2] 
    ): 
 
        with analysis_col: 
 
            st.subheader( 
                f"📍 {zone_name}" 
            ) 
 
            data = ( 
                st.session_state.edge_ai_results[ 
                    zone_name 
                ] 
            ) 
 
            problems = [] 
 
            problems.extend( 
                data["soil_problems"] 
            ) 
 
            problems.extend( 
                data["environment_problems"] 
            ) 
 
            problems.extend( 
                data["calamity_problems"] 
            ) 
 
            if problems: 
 
                st.warning( 
                    "⚠️ Problems detected" 
                ) 
 
                for problem in problems: 
 
                    st.write( 
                        f"• {problem}" 
                    ) 
 
            else: 
 
                st.success( 
                    "✅ No major problem detected." 
                ) 
 
            st.write( 
                "### 💧 Automatic Irrigation" 
            ) 
 
            if ( 
                data["irrigation"]["status"] 
                == "ON" 
            ): 
 
                st.error( 
                    "🟢 MOTOR + VALVE: ON" 
                ) 
 
                st.write( 
                    data["irrigation"]["reason"] 
                ) 
 
            else: 
 
                st.success( 
                    "⚪ MOTOR + VALVE: OFF" 
                ) 
 
                st.write( 
                    data["irrigation"]["reason"] 
                ) 
 
 
    # ======================================================== 
    # SEND SMS AFTER EVERY CHECK 
    # ======================================================== 
 
    if farmer_phone.strip(): 
 
        sms_message = create_farmer_sms( 
            zone_camera_data=( 
                st.session_state.camera_results 
            ), 
            zone_analysis_data=( 
                st.session_state.edge_ai_results 
            ) 
        ) 
 
        sms_success, sms_result = send_sms( 
            farmer_phone, 
            sms_message 
        ) 
 
        if sms_success: 
 
            st.session_state.sms_status = ( 
                "SUCCESS" 
            ) 
 
            st.success( 
                "📱 SMS sent to farmer." 
            ) 
 
            with st.expander( 
                "📱 View SMS that was sent" 
            ): 
 
                st.code( 
                    sms_message 
                ) 
 
        else: 
 
            st.session_state.sms_status = ( 
                f"FAILED: {sms_result}" 
            ) 
 
            st.error( 
                f"📱 SMS failed: {sms_result}" 
            ) 
 
            with st.expander( 
                "📱 SMS message that was prepared" 
            ): 
 
                st.code( 
                    sms_message 
                ) 
 
    else: 
 
        st.warning( 
            "📱 Enter the farmer phone number " 
            "in the sidebar before running Edge AI " 
            "if you want an SMS." 
        ) 
 
 
# ============================================================ 
# SMS STATUS 
# ============================================================ 
 
if st.session_state.sms_status: 
 
    st.divider() 
 
    st.subheader( 
        "📱 SMS Gateway Status" 
    ) 
 
    if ( 
        st.session_state.sms_status 
        == "SUCCESS" 
    ): 
 
        st.success( 
            "🟢 SMS request successfully sent to Android Gateway." 
        ) 
 
    elif ( 
        st.session_state.sms_status.startswith( 
            "success" 
        ) 
    ): 
 
        st.error( 
            f"🔴 {st.session_state.sms_status}" 
        ) 
 
 
# ============================================================ 
# SYSTEM ARCHITECTURE 
# ============================================================ 
 
st.divider() 
 
with st.expander( 
    "⚙️ System Architecture" 
): 
 
    st.markdown( 
        """ 
### 🌱 Smart Farming Assistant 
 
**Zone 1** 
- Soil Moisture Sensor 
- DS18B20 Soil Temperature Sensor 
- BME280 
- pH Sensor 
- EC Sensor 
- Camera 1 
- Camera 2 
- ESP32 
- LoRa Transmitter 
 
**Zone 2** 
- Soil Moisture Sensor 
- DS18B20 Soil Temperature Sensor 
- BME280 
- pH Sensor 
- EC Sensor 
- Camera 1 
- Camera 2 
- ESP32 
- LoRa Transmitter 
 
**Central System** 
- Raspberry Pi 
- Edge AI 
- LoRa Receiver 
- Local Processing 
- Solar Power 
 
**Automatic Irrigation** 
- Soil Moisture Threshold: 25% 
- Edge AI Decision 
- Wireless Motor Controller 
- Main Motor / Pump 
- Motorized Ball Valve 
- Sprinklers in Zone 2 
 
**Emergency / Farmer Alert** 
- Crop Problem Detection 
- Disease Detection 
- Recommendation Generation 
- Android SMS Gateway 
- Farmer SMS 
""" 
    )