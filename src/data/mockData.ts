import type { 
  ZoneData, 
  FarmSummary, 
  SensorOverview, 
  AiDetectionResult, 
  AlertItem, 
  AdvisoryItem, 
  HistoricalDataPoint,
  ChatMessage
} from '../types/farm';

export const initialFarmSummary: FarmSummary = {
  area: '1 Acre',
  zonesCount: 2,
  crop: 'Wheat',
  overallCropHealth: 89,
  edgeAiStatus: 'online',
  activeAlertsCount: 3,
  offlineReady: true,
};

export const initialSensorOverview: SensorOverview = {
  soilMoisture: 38, // average between Zone 1 (48%) and Zone 2 (28%)
  temperature: 28, // average between 27°C and 29°C
  humidity: 66, // average between 69% and 63%
  light: 74, // average between 72% and 76%
  rainfall: 'No Rain Detected',
};

export const initialZones: Record<string, ZoneData> = {
  'zone-1': {
    id: 'zone-1',
    name: 'Zone 1 (North Sector)',
    status: 'healthy',
    statusLabel: 'Healthy',
    soilMoisture: 48,
    temperature: 27,
    humidity: 69,
    light: 72,
    rainfall: 'No Rain Detected',
    cropHealth: 94,
    cropType: 'Wheat (PBW-550)',
    disease: 'None detected',
    cameraStatus: 'online',
    sensorStatus: 'online',
    pumpStatus: 'OFF',
    lastUpdated: 'Just now (Edge Sync)',
    loRaSignalDbm: -68,
    batteryLevel: 96,
  },
  'zone-2': {
    id: 'zone-2',
    name: 'Zone 2 (South Sector)',
    status: 'attention',
    statusLabel: 'Attention Required',
    soilMoisture: 28,
    temperature: 29,
    humidity: 63,
    light: 76,
    rainfall: 'No Rain Detected',
    cropHealth: 81,
    cropType: 'Wheat (PBW-550)',
    disease: 'Leaf Blight',
    diseaseConfidence: 94,
    diseaseSeverity: 'Moderate',
    cameraStatus: 'online',
    sensorStatus: 'online',
    pumpStatus: 'OFF',
    lastUpdated: 'Just now (Edge Sync)',
    loRaSignalDbm: -72,
    batteryLevel: 91,
  },
};

export const edgeAiDetection: AiDetectionResult = {
  disease: 'Leaf Blight',
  confidence: 94,
  zone: 'Zone 2',
  zoneId: 'zone-2',
  severity: 'Moderate',
  detectedAt: 'Today at 07:15 AM',
  recommendation: 'Inspect affected leaves and follow appropriate disease-management practices. Avoid unnecessary pesticide application and monitor the zone closely.',
  model: 'YOLOv8-Nano-Edge (Quantized INT8)',
  latencyMs: 14.2,
  hardwareTarget: 'Raspberry Pi 4B (Edge AI Local Inference)',
  affectedPlantType: 'Triticum aestivum (Wheat)',
  symptoms: [
    'Elongated brownish-grey necrotic lesions with yellow halo borders',
    'Leaf tip necrosis observed along marginal vascular bundles',
    'Canopy hydration stress accelerating fungal lesion expansion in Zone 2'
  ],
};

export const initialAlerts: AlertItem[] = [
  {
    id: 'alert-1',
    severity: 'warning',
    title: 'Zone 2 soil moisture is low – 28%',
    description: 'Zone 2 soil moisture has dropped to 28%, which is below the 35% optimal threshold for wheat. Irrigation is recommended.',
    zone: 'Zone 2',
    zoneId: 'zone-2',
    timestamp: '15 mins ago',
    isRead: false,
    actionLabel: 'Manage Irrigation',
    actionTab: 'irrigation',
  },
  {
    id: 'alert-2',
    severity: 'warning',
    title: 'Leaf Blight detected in Zone 2 – 94% confidence',
    description: 'Edge YOLO camera model detected fungal Leaf Blight lesions on lower canopy leaves in Zone 2 with 94% confidence.',
    zone: 'Zone 2',
    zoneId: 'zone-2',
    timestamp: '42 mins ago',
    isRead: false,
    actionLabel: 'Review Detection',
    actionTab: 'edge-ai',
  },
  {
    id: 'alert-3',
    severity: 'advisory',
    title: 'Zone 2 requires irrigation',
    description: 'Recommended irrigation cycle for Zone 2: 450 Liters via low-pressure drip lines to restore root zone moisture.',
    zone: 'Zone 2',
    zoneId: 'zone-2',
    timestamp: '1 hour ago',
    isRead: false,
    actionLabel: 'Start Pump',
    actionTab: 'irrigation',
  },
  {
    id: 'alert-4',
    severity: 'normal',
    title: 'Zone 1 crop health is optimal',
    description: 'Zone 1 conditions are optimal with 48% moisture, 27°C, and 94% crop health index. No action required.',
    zone: 'Zone 1',
    zoneId: 'zone-1',
    timestamp: '3 hours ago',
    isRead: true,
    actionLabel: 'View Monitoring',
    actionTab: 'monitoring',
  },
];

export const aiAdvisories: AdvisoryItem[] = [
  {
    id: 'adv-1',
    category: 'crop-health',
    icon: '🌱',
    title: 'CROP HEALTH',
    recommendation: 'Zone 1 is currently healthy with 94% crop health. Continue regular monitoring.',
    zone: 'Zone 1',
    zoneId: 'zone-1',
    priority: 'low',
    actionPrompt: 'Inspect Zone 1 Node',
    actionTab: 'monitoring',
  },
  {
    id: 'adv-2',
    category: 'water-management',
    icon: '💧',
    title: 'WATER MANAGEMENT',
    recommendation: 'Zone 2 has 28% soil moisture. Irrigation is recommended.',
    zone: 'Zone 2',
    zoneId: 'zone-2',
    priority: 'high',
    actionPrompt: 'Go to Irrigation Controls',
    actionTab: 'irrigation',
  },
  {
    id: 'adv-3',
    category: 'disease-management',
    icon: '🦠',
    title: 'DISEASE MANAGEMENT',
    recommendation: 'Leaf Blight has been detected in Zone 2 with 94% confidence. Inspect affected plants and take appropriate disease-management action.',
    zone: 'Zone 2',
    zoneId: 'zone-2',
    priority: 'high',
    actionPrompt: 'Open Edge AI Analysis',
    actionTab: 'edge-ai',
  },
  {
    id: 'adv-4',
    category: 'weather',
    icon: '☀️',
    title: 'WEATHER ADVISORY',
    recommendation: 'No immediate rainfall alert. Continue monitoring temperature and humidity.',
    zone: 'Farm Wide',
    priority: 'medium',
    actionPrompt: 'View Analytics Trends',
    actionTab: 'analytics',
  },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'ai',
    text: 'Namaste Farmer! I am your Edge AI Smart Farming Assistant. You can ask me anything about your 1-acre wheat crop, soil moisture, irrigation needs, or disease alerts.',
    timestamp: 'Just now',
  },
  {
    id: 'msg-init-2',
    sender: 'farmer',
    text: 'What is the soil condition?',
    timestamp: 'Just now',
  },
  {
    id: 'msg-init-3',
    sender: 'ai',
    text: 'Zone 1 has 48% moisture and is currently optimal. Zone 2 has 28% moisture and requires irrigation.',
    timestamp: 'Just now',
    suggestedAction: {
      label: 'Open Irrigation Controls',
      tab: 'irrigation',
    },
  },
];

export const historicalDataToday: HistoricalDataPoint[] = [
  { time: '04:00', zone1Moisture: 49, zone2Moisture: 31, temperature: 22, humidity: 76, cropHealth: 90, waterUsageLiters: 0 },
  { time: '07:00', zone1Moisture: 48, zone2Moisture: 30, temperature: 24, humidity: 72, cropHealth: 90, waterUsageLiters: 110 },
  { time: '10:00', zone1Moisture: 48, zone2Moisture: 29, temperature: 26, humidity: 68, cropHealth: 89, waterUsageLiters: 160 },
  { time: '13:00', zone1Moisture: 47, zone2Moisture: 28, temperature: 29, humidity: 63, cropHealth: 89, waterUsageLiters: 90 },
  { time: '16:00', zone1Moisture: 48, zone2Moisture: 28, temperature: 28, humidity: 65, cropHealth: 89, waterUsageLiters: 60 },
  { time: 'Now',   zone1Moisture: 48, zone2Moisture: 28, temperature: 28, humidity: 66, cropHealth: 89, waterUsageLiters: 40 },
];

export const historicalData7Days: HistoricalDataPoint[] = [
  { time: 'Day 1', zone1Moisture: 52, zone2Moisture: 41, temperature: 26, humidity: 71, cropHealth: 93, waterUsageLiters: 390 },
  { time: 'Day 2', zone1Moisture: 50, zone2Moisture: 38, temperature: 27, humidity: 69, cropHealth: 91, waterUsageLiters: 360 },
  { time: 'Day 3', zone1Moisture: 49, zone2Moisture: 35, temperature: 28, humidity: 66, cropHealth: 90, waterUsageLiters: 420 },
  { time: 'Day 4', zone1Moisture: 48, zone2Moisture: 32, temperature: 27, humidity: 68, cropHealth: 89, waterUsageLiters: 310 },
  { time: 'Day 5', zone1Moisture: 47, zone2Moisture: 30, temperature: 29, humidity: 64, cropHealth: 88, waterUsageLiters: 380 },
  { time: 'Day 6', zone1Moisture: 48, zone2Moisture: 29, temperature: 28, humidity: 65, cropHealth: 89, waterUsageLiters: 440 },
  { time: 'Today', zone1Moisture: 48, zone2Moisture: 28, temperature: 28, humidity: 66, cropHealth: 89, waterUsageLiters: 460 },
];

export const historicalData30Days: HistoricalDataPoint[] = [
  { time: 'Week 1', zone1Moisture: 54, zone2Moisture: 46, temperature: 25, humidity: 74, cropHealth: 95, waterUsageLiters: 2450 },
  { time: 'Week 2', zone1Moisture: 51, zone2Moisture: 39, temperature: 26, humidity: 70, cropHealth: 93, waterUsageLiters: 2600 },
  { time: 'Week 3', zone1Moisture: 49, zone2Moisture: 33, temperature: 27, humidity: 68, cropHealth: 91, waterUsageLiters: 2780 },
  { time: 'Week 4', zone1Moisture: 48, zone2Moisture: 28, temperature: 28, humidity: 66, cropHealth: 89, waterUsageLiters: 2920 },
];
