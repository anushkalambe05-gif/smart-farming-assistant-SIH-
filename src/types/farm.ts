export type AppView = 
  | 'dashboard'
  | 'my-farm'
  | 'zones'
  | 'cameras'
  | 'sensors'
  | 'ai-insights'
  | 'irrigation'
  | 'problems'
  | 'solutions'
  | 'environment'
  | 'alerts'
  | 'analytics'
  | 'settings';

export type ZoneId = 'zone-1' | 'zone-2';

export interface ZoneData {
  id: ZoneId;
  name: string;
  status: 'healthy' | 'attention';
  statusLabel: string;
  soilMoisture: number; // percentage
  temperature: number; // °C
  humidity: number; // percentage
  soilTemperature: number; // °C
  waterStatus: 'Optimal' | 'Low' | 'Adequate';
  light: number; // percentage
  rainfall: string;
  cropHealth: number; // percentage
  cropType: string;
  area: string;
  disease: string;
  diseaseConfidence?: number;
  diseaseSeverity?: 'None' | 'Mild' | 'Moderate' | 'Severe';
  cameraStatus: 'online' | 'offline' | 'standby';
  sensorStatus: 'online' | 'offline' | 'standby';
  pumpStatus: 'OFF' | 'ON';
  irrigationRecommendation: 'OFF' | 'RECOMMENDED' | 'ACTIVE';
  lastUpdated: string;
  loRaSignalDbm: number;
  batteryLevel: number;
  aiRecommendationText: string;
}

export interface FarmSummary {
  area: string;
  zonesCount: number;
  crop: string;
  overallCropHealth: number;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  soilTemperature: number;
  waterUsageLiters: number;
  weatherCondition: string;
  weatherTemp: number;
  connectivity: string;
  edgeAiStatus: 'online' | 'offline' | 'degraded';
  irrigationStatus: 'Optimal' | 'Action Needed' | 'Irrigating';
  activeAlertsCount: number;
  offlineReady: boolean;
}

export interface SensorDataPoint {
  id: string;
  name: string;
  value: string | number;
  unit: string;
  status: 'optimal' | 'normal' | 'attention';
  history: number[];
  lastUpdated: string;
  description: string;
}

export interface AiVisionAnalysis {
  cropDetected: string;
  cropCondition: string;
  diseaseProbability: number;
  pestProbability: number;
  waterStress: 'Low' | 'Moderate' | 'High';
  modelLatencyMs: number;
  lastScanned: string;
}

export interface CameraFeedItem {
  id: string;
  title: string;
  zone: string;
  zoneId: ZoneId;
  status: 'LIVE' | 'STANDBY';
  imageUrl: string;
  analysis: AiVisionAnalysis;
}

export interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'advisory' | 'normal';
  title: string;
  description: string;
  zone: string;
  zoneId?: ZoneId;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionView?: AppView;
}

export interface ActivityItem {
  id: string;
  time: string;
  description: string;
  type: 'ai' | 'sensor' | 'irrigation' | 'camera';
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  rainProbability: number;
  windSpeed: string;
}

export interface FarmSettings {
  farmName: string;
  farmSize: string;
  cropType: string;
  zoneConfiguration: string;
  irrigationThreshold: number; // e.g. 45%
  aiSensitivity: 'Standard' | 'High' | 'Low';
  scanFrequency: 'Every 30 Mins' | 'Hourly' | 'Twice Daily';
  offlineMode: boolean;
  smsAlerts: boolean;
  audioBuzzer: boolean;
}

export interface HistoricalDataPoint {
  time: string;
  zone1Moisture: number;
  zone2Moisture: number;
  temperature: number;
  humidity: number;
  cropHealth: number;
  waterUsageLiters: number;
}

export interface ChatActionButton {
  label: string;
  actionId: 'start-irrigation' | 'open-zone-2' | 'open-zone-1' | 'open-camera-2' | 'open-camera-1' | 'run-ai-scan' | 'view-alerts' | 'view-environment' | 'show-todays-actions';
  primary?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'farmer' | 'ai';
  text: string;
  timestamp: string;
  actionButtons?: ChatActionButton[];
}

export interface ScaledAsset {
  id: string;
  type: 'zone' | 'sensor' | 'camera';
  name: string;
  location: string;
  addedAt: string;
}
