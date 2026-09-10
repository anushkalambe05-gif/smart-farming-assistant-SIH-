export type TabType = 
  | 'dashboard'
  | 'monitoring'
  | 'edge-ai'
  | 'irrigation'
  | 'analytics'
  | 'alerts'
  | 'advisory'
  | 'ask-ai';

export type ZoneId = 'zone-1' | 'zone-2';

export interface ZoneData {
  id: ZoneId;
  name: string;
  status: 'healthy' | 'attention';
  statusLabel: string;
  soilMoisture: number; // percentage
  temperature: number; // °C
  humidity: number; // percentage
  light: number; // percentage
  rainfall: string;
  cropHealth: number; // percentage
  cropType: string;
  disease: string;
  diseaseConfidence?: number;
  diseaseSeverity?: 'None' | 'Mild' | 'Moderate' | 'Severe';
  cameraStatus: 'online' | 'offline' | 'standby';
  sensorStatus: 'online' | 'offline' | 'standby';
  pumpStatus: 'OFF' | 'ON';
  lastUpdated: string;
  loRaSignalDbm: number;
  batteryLevel: number;
}

export interface FarmSummary {
  area: string;
  zonesCount: number;
  crop: string;
  overallCropHealth: number;
  edgeAiStatus: 'online' | 'offline' | 'degraded';
  activeAlertsCount: number;
  offlineReady: boolean;
}

export interface SensorOverview {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  light: number;
  rainfall: string;
}

export interface AiDetectionResult {
  disease: string;
  confidence: number;
  zone: string;
  zoneId: ZoneId;
  severity: string;
  detectedAt: string;
  recommendation: string;
  model: string;
  latencyMs: number;
  hardwareTarget: string;
  affectedPlantType: string;
  symptoms: string[];
}

export type AlertSeverity = 'critical' | 'warning' | 'advisory' | 'normal';

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  zone: string;
  zoneId?: ZoneId;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionTab?: TabType;
}

export interface AdvisoryItem {
  id: string;
  category: 'crop-health' | 'water-management' | 'disease-management' | 'weather';
  icon: string;
  title: string;
  recommendation: string;
  zone: string;
  zoneId?: ZoneId;
  priority: 'high' | 'medium' | 'low';
  actionPrompt: string;
  actionTab: TabType;
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

export interface ChatMessage {
  id: string;
  sender: 'farmer' | 'ai';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    tab: TabType;
  };
}
