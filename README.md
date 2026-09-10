# SMART FARMING ASSISTANT
> **Tagline:** *“Edge AI for Smarter Farming”*  
> **SIH Round-1 PPT & Working Demo Prototype**

---

### ⚠️ Prototype Transparency Notice
> **"Prototype Simulation – Hardware Integration Planned"**  
> This application is a fully interactive, browser-based working software prototype built for Smart India Hackathon (SIH) Round-1 evaluation. It runs 100% on client-side simulated data and simulated edge AI inference. Physical microcontrollers (ESP32) and LoRa radios are modeled in software and are not physically wired yet.

---

## 1. System Overview & Problem Statement

Agriculture in remote areas frequently suffers from unreliable high-speed internet connectivity and delayed pest/disease diagnoses. **Smart Farming Assistant** introduces an **offline-first Edge AI architecture** designed for a **1-acre farm** divided into **2 zones** (Zone 1: North Sector, Zone 2: South Sector).

```
1-Acre Farm (Wheat: PBW-550)
         │
         ├── Zone 1 (0.5 Acre) ── [OV2640 HD Camera + ESP32 + Moisture/DHT22 Sensors]
         │
         └── Zone 2 (0.5 Acre) ── [OV2640 HD Camera + ESP32 + Moisture/DHT22 Sensors]
                                            │
                                      (LoRa 868MHz)
                                            │
                                            ▼
                           Raspberry Pi 4B (Farm Shed Edge Hub)
                                            │
                               ┌────────────┴────────────┐
                               ▼                         ▼
                        Edge Vision AI         Autonomous Decision Engine
                     [OpenCV + YOLOv8 + TFLite]   [Relay Solenoid Pump Triggers]
                               │                         │
                               └────────────┬────────────┘
                                            ▼
                               Farmer Recommendations
                                            │
                                            ▼
                            Mobile / Web Farmer Dashboard
                                  & Farmer Ask AI
```

---

## 2. Key Features

1. **Overview Dashboard**:
   - 1-acre summary (2 Zones, Wheat crop, 89% overall health index).
   - Core AI: **ONLINE** | Cloud Internet: **OPTIONAL / NOT REQUIRED FOR CORE AI**.
   - Live telemetry cards: Soil Moisture (Z1: 48%, Z2: 28%), Temperature (Z1: 27°C, Z2: 29°C), Humidity (Z1: 69%, Z2: 63%), Light (Z1: 72%, Z2: 76%), Rain (No Rain Detected).
   - **AI Suggestion Card**: Immediate attention card for Zone 2 moisture stress & Leaf Blight detection with direct shortcuts to advisory and Ask AI.
   - Interactive 1-acre topographic field visualization with clickable zone cards.

2. **Farm Monitoring**:
   - Visual topographic map showing crop rows, camera positions, ESP32 sensor nodes, LoRa indicators, and drip irrigation pipelines.
   - Animated 4-step communication pipeline: `Camera + Sensors` → `ESP32` → `LoRa (868MHz)` → `Raspberry Pi`.
   - Node pinging and packet telemetry stream inspection.

3. **Edge AI Vision Hub**:
   - 6-stage edge pipeline: `CAMERA` → `IMAGE PROCESSING` → `YOLO DETECTION` → `DISEASE/PEST DETECTION` → `AI ANALYSIS` → `RECOMMENDATION`.
   - Local INT8 quantized YOLOv8 inference running at **14.2ms latency** on Raspberry Pi.
   - Simulated camera preview with live HUD overlays, RTSP streaming metrics, and leaf blight bounding box extraction.

4. **Interactive Drip Irrigation**:
   - Zone 1 (48% Moisture, Optimal, Pump OFF).
   - Zone 2 (28% Moisture, Low, Pump OFF/ON).
   - **Functional START PUMP / STOP PUMP buttons**: Changes pump state, triggers toast feedback, and dynamically increments simulated Zone 2 moisture over time (`28% → 32% → 37% → 42%`).

5. **Historical Analytics**:
   - Interactive charts built with **Recharts** for Soil Moisture, Ambient Temperature, Canopy Humidity, Crop Health Index, and Water Usage (Liters).
   - Filterable by time range (**Today**, **7 Days**, **30 Days**) and zone (**Both Zones**, **Zone 1**, **Zone 2**).

6. **Alert Notification Center**:
   - Categorized by **Critical**, **Warning**, **Advisory**, and **Normal**.
   - Mark as read/unread, clear/dismiss, and actionable shortcuts routing to relevant panels.

7. **AI Advisory**:
   - 4 farmer-friendly sections:
     - **CROP HEALTH**: Vigor status and chlorophyll stability.
     - **WATER MANAGEMENT**: Root zone hydration and drip scheduling.
     - **DISEASE MANAGEMENT**: Leaf Blight identification protocol.
     - **WEATHER ADVISORY**: 48-hour atmospheric forecast and spray timing.

8. **Farmer Ask AI (Core Feature)**:
   - Dedicated natural language chat interface.
   - Clickable quick question buttons:
     - *“Should I irrigate?”*
     - *“Why are my leaves yellow?”*
     - *“Is my crop healthy?”*
     - *“Is there any disease?”*
     - *“What is the soil condition?”*
     - *“What should I do for Zone 2?”*
   - Context-aware rule-based edge inference engine using live telemetry and disease models without requiring external cloud APIs.

---

## 3. Technology Stack

### Current Round-1 Browser Prototype
- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite (configured with relative base `./` for GitHub Pages)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **State Management**: React Context API (`FarmContext`)
- **Telemetry Simulation**: Client-side dynamic periodic ticker

### Proposed Future Architecture (Round-2 / Production)
- **Edge Microcontrollers**: ESP32 with FreeRTOS
- **Edge Gateway**: Raspberry Pi 4B / 5 (Raspberry Pi OS 64-bit)
- **Edge AI Stack**: Python 3.11, OpenCV 4.x, YOLOv8 (Nano), TensorFlow Lite INT8
- **Long-Range Telemetry**: SX1276 LoRa transceivers (868 MHz ISM band)
- **Sensors**: Capacitive Soil Moisture Probes, DHT22 (Air Temp & Humidity), BH1750 (Lux), Tipping Bucket Rain Gauge, OV2640 HD Cameras
- **Future Mobile Application**: React Native (Android & iOS)
- **Future Backend**: FastAPI (Python)
- **Future Database**: Supabase PostgreSQL

---

## 4. Local Setup & Running Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm (version 9 or higher)

### Run Locally
```bash
# 1. Clone the repository
git clone https://github.com/USERNAME/REPOSITORY-NAME.git
cd "smart farming assistant"

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
This outputs compiled, bundled static HTML, CSS, and JS files into the `dist/` directory.

---

## 5. Public Deployment on GitHub Pages

The project is pre-configured with relative asset paths (`base: './'` in `vite.config.ts`), making it immediately deployable to GitHub Pages without server-side routing issues.

### Method A: Automated GitHub Actions (Recommended)
This repository includes `.github/workflows/deploy.yml`:
1. Push your repository to GitHub (`main` or `master` branch).
2. Go to your GitHub repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow will automatically trigger, build the app, and deploy it.
5. Your public URL will be ready at:
   `https://<USERNAME>.github.io/<REPOSITORY-NAME>/`

### Method B: Manual Deployment via `gh-pages`
```bash
# Install gh-pages
npm install -D gh-pages

# Build and deploy the dist folder
npm run build
npx gh-pages -d dist
```

---

## 6. How "Ask AI" Works in this Prototype

The **Ask AI** feature implements an in-browser deterministic semantic parser and rule engine:
- **Keyword Recognition**: Queries containing tokens such as `water`, `irrigate`, `moisture`, `disease`, `leaf`, `yellow`, `pest`, `crop health`, `temp`, `humidity`, `rain`, `soil`, `Zone 1`, `Zone 2`, and `fertilizer` are evaluated against the current simulated farm state.
- **Dynamic Context Injection**: Answers dynamically reference real-time simulated parameters (e.g. Zone 2 moisture percentage, pump state, Leaf Blight confidence score).
- **Embedded Action Shortcuts**: Answers include one-click routing buttons to the relevant tool (e.g., *“Start Zone 2 Pump”* or *“Inspect Camera Feed”*).
- **Graceful Fallback**: Unrecognized questions return an informative overview of available topics.

---

## 7. Current Prototype vs Future Hardware Implementation

| Dimension | Current Round-1 Prototype | Future Real Hardware System |
| :--- | :--- | :--- |
| **Execution Environment** | Client-side web browser | Physical in-field hardware |
| **Edge Compute** | Simulated within browser memory | Raspberry Pi 4B in farm shed |
| **In-Field Nodes** | High-fidelity software models | ESP32 nodes powered by solar + LiFePO4 battery |
| **Sensor Data** | Realistic simulated values | Physical capacitive probes, DHT22, BH1750 |
| **Vision Camera** | Simulated feed canvas with YOLO tags | Physical OV2640 HD camera module |
| **Pump Activation** | UI state update with dynamic moisture curve | 12V Solenoid valve driven by optocoupled relay |
| **Network Link** | Local JavaScript state | Sub-GHz LoRa (868 MHz) wireless packets |
| **Cloud Dependency** | Zero | Zero for core operation (Cloud is optional for sync) |

---

## 8. Limitations of the Current Prototype

- **Simulated Hardware**: Sensor readings and camera imagery are simulated representations to showcase the UI, UX, and edge intelligence architecture for SIH Round-1 evaluation.
- **Client-Side Persistence**: State changes (such as starting irrigation or marking alerts read) are maintained during the browser session.
- **Hardware Integration**: Physical wiring of ESP32, LoRa antennas, and solenoid relays will take place in Round-2.
