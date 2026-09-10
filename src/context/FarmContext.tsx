import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { 
  AppView, 
  ZoneId, 
  ZoneData, 
  FarmSummary, 
  SensorDataPoint, 
  CameraFeedItem, 
  AlertItem, 
  ActivityItem, 
  WeatherData, 
  FarmSettings 
} from '../types/farm';
import { 
  initialFarmSummary, 
  initialWeatherData, 
  initialZones, 
  initialCameraFeeds, 
  initialSensorsList, 
  initialAlerts, 
  initialActivities, 
  initialSettings 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

export interface IrrigationState {
  activeZoneId: ZoneId | null;
  isRunning: boolean;
  waterUsedLiters: number;
  secondsRemaining: number;
  totalDurationSeconds: number;
  smartModeActive: boolean;
}

interface FarmContextType {
  isLoggedIn: boolean;
  loginAsDemo: () => void;
  loginAsFarmer: (farmerName?: string) => void;
  logout: () => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  // State
  zones: Record<string, ZoneData>;
  farmSummary: FarmSummary;
  weather: WeatherData;
  sensorsList: SensorDataPoint[];
  cameraFeeds: CameraFeedItem[];
  alerts: AlertItem[];
  unreadAlertsCount: number;
  activities: ActivityItem[];
  settings: FarmSettings;
  updateSettings: (newSettings: Partial<FarmSettings>) => void;
  // Scalability Modal
  scaleModalOpen: boolean;
  setScaleModalOpen: (open: boolean) => void;
  scaledAssets: { id: string; type: 'zone' | 'sensor' | 'camera'; name: string; location: string; addedAt: string }[];
  addScaledAsset: (type: 'zone' | 'sensor' | 'camera', name: string, location: string) => void;
  // Modals
  selectedZoneDetail: ZoneId | null;
  openZoneDetail: (zoneId: ZoneId) => void;
  closeZoneDetail: () => void;
  // Irrigation
  irrigation: IrrigationState;
  startIrrigation: (zoneId: ZoneId, durationSeconds?: number) => void;
  stopIrrigation: () => void;
  completeIrrigationCycle: (zoneId?: ZoneId) => void;
  toggleSmartIrrigation: () => void;
  // Alerts
  markAlertAsRead: (id: string) => void;
  dismissAlert: (id: string) => void;
  restoreAlerts: () => void;
  // AI Scan
  isScanningAi: boolean;
  aiScanStep: 'idle' | 'sensors' | 'images' | 'environment' | 'recommendation' | 'done';
  lastAiScanResult: string | null;
  runAiAnalysis: () => void;
  // Camera capture & scanning
  isScanningCamera: boolean;
  scanningCameraId: string | null;
  runCameraScan: (cameraId: string) => void;
  captureCameraSnapshot: (cameraId: string) => void;
  // Chatbot
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: { id: string; sender: 'farmer' | 'ai'; text: string; timestamp: string; actionButtons?: { label: string; actionId: any; primary?: boolean }[] }[];
  sendFarmerMessage: (text: string) => void;
  executeChatAction: (actionId: string) => void;
  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // App authentication & view state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');

  // Farm core state
  const [zones, setZones] = useState<Record<string, ZoneData>>(initialZones);
  const [farmSummary, setFarmSummary] = useState<FarmSummary>(initialFarmSummary);
  const [weather] = useState<WeatherData>(initialWeatherData);
  const [sensorsList, setSensorsList] = useState<SensorDataPoint[]>(initialSensorsList);
  const [cameraFeeds] = useState<CameraFeedItem[]>(initialCameraFeeds);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [settings, setSettings] = useState<FarmSettings>(initialSettings);
  const [selectedZoneDetail, setSelectedZoneDetail] = useState<ZoneId | null>(null);

  // Irrigation system state
  const [irrigation, setIrrigation] = useState<IrrigationState>({
    activeZoneId: null,
    isRunning: false,
    waterUsedLiters: 12,
    secondsRemaining: 300, // 05:00
    totalDurationSeconds: 300,
    smartModeActive: true,
  });

  // AI analysis state
  const [isScanningAi, setIsScanningAi] = useState<boolean>(false);
  const [lastAiScanResult, setLastAiScanResult] = useState<string | null>(null);

  // Toast messages
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev.slice(-4), { id, title, message, type, timestamp: Date.now() }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Auto remove toasts
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setInterval(() => {
      const now = Date.now();
      setToasts((prev) => prev.filter((t) => now - t.timestamp < 4000));
    }, 1000);
    return () => clearInterval(timer);
  }, [toasts]);

  // Login methods
  const loginAsDemo = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    addToast('Welcome to Demo Mode', 'Smart Farming Assistant is loaded with 1-acre live simulated telemetry.', 'success');
  };

  const loginAsFarmer = (farmerName: string = 'Ramesh Patel') => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    addToast(`Namaste, ${farmerName}!`, 'Logged into Greenfield Smart Farm via local edge gateway.', 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
    addToast('Logged Out', 'Returned to welcome portal.', 'info');
  };

  // Modals
  const openZoneDetail = (zoneId: ZoneId) => {
    setSelectedZoneDetail(zoneId);
  };

  const closeZoneDetail = () => {
    setSelectedZoneDetail(null);
  };

  // Irrigation Controls
  const startIrrigation = (zoneId: ZoneId, durationSeconds: number = 300) => {
    setIrrigation({
      activeZoneId: zoneId,
      isRunning: true,
      waterUsedLiters: 12,
      secondsRemaining: durationSeconds,
      totalDurationSeconds: durationSeconds,
      smartModeActive: true,
    });

    setZones((prev) => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        pumpStatus: 'ON',
        irrigationRecommendation: 'ACTIVE',
      },
    }));

    setFarmSummary((prev) => ({
      ...prev,
      irrigationStatus: 'Irrigating',
    }));

    const zoneName = zoneId === 'zone-1' ? 'Zone 1' : 'Zone 2';
    addToast(
      '🟢 IRRIGATION RUNNING',
      `Smart solenoid valve opened for ${zoneName}. Water flow: 12 L delivered. Duration: 05:00.`,
      'success'
    );

    // Add activity record
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActivities((prev) => [
      { id: `act-${Date.now()}`, time: nowTime, description: `Irrigation started for ${zoneName}`, type: 'irrigation' },
      ...prev.slice(0, 7),
    ]);
  };

  const stopIrrigation = () => {
    if (!irrigation.activeZoneId) return;
    const activeZone = irrigation.activeZoneId;
    const zoneName = activeZone === 'zone-1' ? 'Zone 1' : 'Zone 2';

    setIrrigation((prev) => ({
      ...prev,
      isRunning: false,
      activeZoneId: null,
    }));

    setZones((prev) => ({
      ...prev,
      [activeZone]: {
        ...prev[activeZone],
        pumpStatus: 'OFF',
        irrigationRecommendation: activeZone === 'zone-2' ? 'OFF' : 'OFF',
        soilMoisture: Math.min(68, prev[activeZone].soilMoisture + 15),
        waterStatus: 'Optimal',
        status: 'healthy',
        statusLabel: 'Healthy',
      },
    }));

    setFarmSummary((prev) => ({
      ...prev,
      irrigationStatus: 'Optimal',
      waterUsageLiters: prev.waterUsageLiters + 14,
    }));

    addToast(
      '🔵 Irrigation Completed',
      `${zoneName} irrigation shut down successfully. Root zone moisture restored.`,
      'info'
    );

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActivities((prev) => [
      { id: `act-${Date.now()}`, time: nowTime, description: `Irrigation completed for ${zoneName} (+14 L)`, type: 'irrigation' },
      ...prev.slice(0, 7),
    ]);
  };

  const toggleSmartIrrigation = () => {
    setIrrigation((prev) => {
      const next = !prev.smartModeActive;
      addToast(
        next ? 'Smart Irrigation: ACTIVE' : 'Smart Irrigation: MANUAL',
        next ? 'AI recommends irrigation based on soil moisture.' : 'Automated threshold triggers disabled.',
        next ? 'success' : 'warning'
      );
      return { ...prev, smartModeActive: next };
    });
  };

  // Periodic timer countdown and moisture increase during irrigation
  useEffect(() => {
    if (!irrigation.isRunning) return;

    const interval = setInterval(() => {
      setIrrigation((prev) => {
        if (prev.secondsRemaining <= 1) {
          stopIrrigation();
          return { ...prev, isRunning: false, secondsRemaining: 0 };
        }
        return {
          ...prev,
          secondsRemaining: prev.secondsRemaining - 1,
          waterUsedLiters: prev.waterUsedLiters + 0.2,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [irrigation.isRunning]);

  // Subtle live sensor fluctuation simulation (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorsList((prev) =>
        prev.map((s) => {
          if (typeof s.value === 'number') {
            const delta = (Math.random() * 0.4 - 0.2);
            let newVal = Math.round((s.value + delta) * 10) / 10;
            if (s.name === 'Soil Moisture') newVal = Math.min(65, Math.max(59, Math.round(newVal)));
            if (s.name === 'Soil Temperature') newVal = Math.min(26, Math.max(23, Math.round(newVal)));
            if (s.name === 'Air Temperature') newVal = Math.min(30, Math.max(27, Math.round(newVal)));
            if (s.name === 'Humidity') newVal = Math.min(74, Math.max(68, Math.round(newVal)));
            return {
              ...s,
              value: newVal,
              lastUpdated: 'Just now',
            };
          }
          return s;
        })
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);


  // Camera capture simulation
  const captureCameraSnapshot = (cameraId: string) => {
    const camName = cameraId === 'cam-1' ? 'Camera 01' : 'Camera 02';
    addToast('Snapshot Captured', `Captured high-res leaf frame on ${camName}. Running local INT8 inference...`, 'info');

    setTimeout(() => {
      addToast('Vision Scan Complete', `${camName} analyzed: Wheat foliage verified. No severe defoliation.`, 'success');
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setActivities((prev) => [
        { id: `act-${Date.now()}`, time: nowTime, description: `${camName} captured crop snapshot`, type: 'camera' },
        ...prev.slice(0, 7),
      ]);
    }, 1200);
  };

  // Scalability state
  const [scaleModalOpen, setScaleModalOpen] = useState<boolean>(false);
  const [scaledAssets, setScaledAssets] = useState<{ id: string; type: 'zone' | 'sensor' | 'camera'; name: string; location: string; addedAt: string }[]>([
    { id: 'sc-1', type: 'zone', name: 'Zone 3 (Polyhouse)', location: 'North-East 0.25 Acre', addedAt: 'Demo Ready' },
    { id: 'sc-2', type: 'sensor', name: 'LoRa Soil Node 3', location: 'Zone 3 Depth Probe', addedAt: 'Demo Ready' },
    { id: 'sc-3', type: 'camera', name: 'Canopy Camera 03', location: 'Zone 3 Mast', addedAt: 'Demo Ready' },
  ]);

  const addScaledAsset = (type: 'zone' | 'sensor' | 'camera', name: string, location: string) => {
    const newAsset = {
      id: `sc-${Date.now()}`,
      type,
      name,
      location,
      addedAt: 'Just added',
    };
    setScaledAssets((prev) => [newAsset, ...prev]);
    addToast(
      'Hardware Scaled',
      `Successfully registered ${name} (${type.toUpperCase()}) to local Edge Gateway mesh.`,
      'success'
    );
  };

  // Camera scan state
  const [isScanningCamera, setIsScanningCamera] = useState<boolean>(false);
  const [scanningCameraId, setScanningCameraId] = useState<string | null>(null);

  const runCameraScan = (cameraId: string) => {
    setIsScanningCamera(true);
    setScanningCameraId(cameraId);
    const camName = cameraId === 'cam-1' ? 'Camera 01' : 'Camera 02';
    addToast('Crop Vision Scanning', `Running Edge AI INT8 vision model on ${camName}...`, 'info');

    setTimeout(() => {
      setIsScanningCamera(false);
      setScanningCameraId(null);
      const isZ2 = cameraId === 'cam-2';
      addToast(
        `${camName} Vision Result`,
        isZ2 
          ? 'SIMULATED DEMO AI: Wheat detected (78% vigor). High water stress confirmed. Irrigation recommended.'
          : 'SIMULATED DEMO AI: Wheat PBW-550 detected (92% vigor). Healthy foliage with minor pest activity.',
        isZ2 ? 'warning' : 'success'
      );
    }, 1500);
  };

  // Multi-step AI analysis state
  const [aiScanStep, setAiScanStep] = useState<'idle' | 'sensors' | 'images' | 'environment' | 'recommendation' | 'done'>('idle');

  const runAiAnalysis = () => {
    setIsScanningAi(true);
    setAiScanStep('sensors');
    addToast('AI Analysis Started', 'Edge AI is monitoring your farm: Collecting sensor data...', 'info');

    setTimeout(() => {
      setAiScanStep('images');
    }, 800);

    setTimeout(() => {
      setAiScanStep('environment');
    }, 1600);

    setTimeout(() => {
      setAiScanStep('recommendation');
    }, 2400);

    setTimeout(() => {
      setAiScanStep('done');
      setIsScanningAi(false);
      setLastAiScanResult('Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      addToast(
        'AI Result: Zone 2 requires irrigation',
        'SIMULATED DEMO AI: Soil moisture is 43% and water-stress indicators are elevated. Recommended action: Start irrigation for Zone 2.',
        'success'
      );

      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setActivities((prev) => [
        { id: `act-${Date.now()}`, time: nowTime, description: 'Edge AI completed full farm scan: Zone 2 water stress flagged', type: 'ai' },
        ...prev.slice(0, 7),
      ]);
    }, 3200);
  };

  // Chatbot State
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<{
    id: string;
    sender: 'farmer' | 'ai';
    text: string;
    timestamp: string;
    actionButtons?: { label: string; actionId: any; primary?: boolean }[];
  }[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'Hello Farmer 👋 What would you like to know about your farm?',
      timestamp: 'Just now',
    },
  ]);

  // Complete Irrigation Cycle (Instant demo resolution for judges)
  const completeIrrigationCycle = (zoneId: ZoneId = 'zone-2') => {
    setIrrigation({
      activeZoneId: null,
      isRunning: false,
      waterUsedLiters: 44,
      secondsRemaining: 0,
      totalDurationSeconds: 300,
      smartModeActive: true,
    });

    setZones((prev) => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        pumpStatus: 'OFF',
        irrigationRecommendation: 'OFF',
        soilMoisture: 60,
        soilTemperature: 24,
        waterStatus: 'Optimal',
        status: 'healthy',
        statusLabel: 'Healthy',
        cropHealth: 90,
        aiRecommendationText: 'Soil moisture has reached the optimal 60% threshold. Drip irrigation successfully paused.',
      },
    }));

    setFarmSummary((prev) => ({
      ...prev,
      soilMoisture: 62,
      overallCropHealth: 92,
      irrigationStatus: 'Optimal',
      waterUsageLiters: prev.waterUsageLiters + 12,
    }));

    // Remove or resolve critical low moisture alert and add Irrigation Completed
    setAlerts((prev) => [
      {
        id: `alert-comp-${Date.now()}`,
        severity: 'normal',
        title: 'Irrigation Completed',
        description: 'Zone 2 irrigation completed successfully. Soil moisture increased to 60%.',
        zone: 'Zone 2',
        zoneId: 'zone-2',
        timestamp: 'Just now',
        isRead: false,
        actionLabel: 'View Zone',
        actionView: 'zones',
      },
      ...prev.filter((a) => !a.title.toLowerCase().includes('low soil moisture')),
    ]);

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActivities((prev) => [
      { id: `act-${Date.now()}`, time: nowTime, description: 'Irrigation completed for Zone 2: Soil moisture 43% → 60%', type: 'irrigation' },
      ...prev.slice(0, 7),
    ]);

    addToast(
      '🟢 IRRIGATION COMPLETED',
      'Zone 2 soil moisture increased from 43% → 60%! Water stress resolved.',
      'success'
    );
  };

  // Chatbot question handler reading LIVE APP STATE
  const sendFarmerMessage = (queryText: string) => {
    const qLower = queryText.toLowerCase();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Farmer's question
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'farmer' as const,
      text: queryText,
      timestamp: timeNow,
    };

    // Evaluate live farm state
    const z2Moisture = zones['zone-2']?.soilMoisture ?? 43;
    const isZ2Irrigated = z2Moisture >= 55;

    let aiReplyText = '';
    let buttons: { label: string; actionId: any; primary?: boolean }[] = [];

    if (qLower.includes('irrigate')) {
      if (!isZ2Irrigated) {
        aiReplyText = `Zone 2 has ${z2Moisture}% soil moisture. Irrigation is recommended.`;
        buttons = [
          { label: 'Start Irrigation', actionId: 'start-irrigation', primary: true },
          { label: 'View Zone 2', actionId: 'open-zone-2' },
        ];
      } else {
        aiReplyText = `Zone 1 is at ${zones['zone-1'].soilMoisture}% and Zone 2 is at ${z2Moisture}%. Soil moisture is in the optimal range. No irrigation required.`;
        buttons = [
          { label: 'View Zone 2', actionId: 'open-zone-2' },
        ];
      }
    } else if (qLower.includes('healthy') || qLower.includes('crop health')) {
      if (!isZ2Irrigated) {
        aiReplyText = `Overall crop health is 87%. Zone 1 is healthy, while Zone 2 is showing water stress.`;
        buttons = [
          { label: 'Open Zone 2', actionId: 'open-zone-2', primary: true },
          { label: 'Run AI Scan', actionId: 'run-ai-scan' },
        ];
      } else {
        aiReplyText = `Overall crop health is 93%. Both Zone 1 and Zone 2 are in optimal condition with zero water stress.`;
        buttons = [
          { label: 'Open Zone 2', actionId: 'open-zone-2' },
          { label: 'Run AI Scan', actionId: 'run-ai-scan' },
        ];
      }
    } else if (qLower.includes('disease')) {
      aiReplyText = `No high-risk disease is currently detected. Zone 2 shows mild crop stress, so continued monitoring is recommended.`;
      buttons = [
        { label: 'Scan Camera 2', actionId: 'open-camera-2', primary: true },
      ];
    } else if (qLower.includes('pest')) {
      aiReplyText = `Zone 1 shows slightly increasing pest indicators. Inspecting Camera 1 is recommended.`;
      buttons = [
        { label: 'Scan Camera 1', actionId: 'open-camera-1', primary: true },
      ];
    } else if (qLower.includes('what should i do') || qLower.includes('today')) {
      if (!isZ2Irrigated) {
        aiReplyText = `Today's priorities are:\n1. Irrigate Zone 2 (soil moisture is ${z2Moisture}%)\n2. Check Camera 2 for crop-health monitoring\n3. Monitor increasing pest activity in Zone 1\n4. Check environmental weather conditions.`;
        buttons = [
          { label: 'Start Irrigation', actionId: 'start-irrigation', primary: true },
          { label: 'Scan Camera 2', actionId: 'open-camera-2' },
          { label: 'View Environment', actionId: 'view-environment' },
        ];
      } else {
        aiReplyText = `Today's priorities are:\n1. Zone 2 irrigation completed successfully!\n2. Monitor pest activity on Zone 1 Camera 1\n3. Check environmental weather conditions.`;
        buttons = [
          { label: 'Scan Camera 1', actionId: 'open-camera-1', primary: true },
          { label: 'View Environment', actionId: 'view-environment' },
        ];
      }
    } else if (qLower.includes('which zone')) {
      if (!isZ2Irrigated) {
        aiReplyText = `Zone 2 needs attention because soil moisture is ${z2Moisture}% and water stress is high.`;
        buttons = [
          { label: 'Open Zone 2', actionId: 'open-zone-2', primary: true },
        ];
      } else {
        aiReplyText = `Both zones are currently in optimal condition! Zone 1 is at 64% and Zone 2 is at ${z2Moisture}%.`;
        buttons = [
          { label: 'Open Farm Map', actionId: 'show-todays-actions' },
        ];
      }
    } else {
      aiReplyText = `Your farm is operating under local Edge AI. Current farm health is ${farmSummary.overallCropHealth}%, soil moisture is ${farmSummary.soilMoisture}%, and weather is ${weather.temp}°C (${weather.condition}).`;
      buttons = [
        { label: 'Show Today\'s Actions', actionId: 'show-todays-actions', primary: true },
        { label: 'View Alerts', actionId: 'view-alerts' },
      ];
    }

    const aiMsg = {
      id: `ai-${Date.now()}`,
      sender: 'ai' as const,
      text: aiReplyText,
      timestamp: timeNow,
      actionButtons: buttons,
    };

    setChatMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  // Execute chatbot action buttons
  const executeChatAction = (actionId: string) => {
    switch (actionId) {
      case 'start-irrigation':
        setCurrentView('irrigation');
        startIrrigation('zone-2', 300);
        break;
      case 'open-zone-2':
        setCurrentView('zones');
        openZoneDetail('zone-2');
        break;
      case 'open-zone-1':
        setCurrentView('zones');
        openZoneDetail('zone-1');
        break;
      case 'open-camera-2':
        setCurrentView('cameras');
        runCameraScan('cam-2');
        break;
      case 'open-camera-1':
        setCurrentView('cameras');
        runCameraScan('cam-1');
        break;
      case 'run-ai-scan':
        setCurrentView('ai-insights');
        runAiAnalysis();
        break;
      case 'view-alerts':
        setCurrentView('alerts');
        break;
      case 'view-environment':
        setCurrentView('environment');
        break;
      case 'show-todays-actions':
        setCurrentView('dashboard');
        break;
      default:
        setCurrentView('dashboard');
    }
  };

  // Alerts Management
  const markAlertAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    addToast('Alert Dismissed', 'Notification cleared from notification center.', 'info');
  };

  const restoreAlerts = () => {
    setAlerts(initialAlerts);
    addToast('Alerts Restored', 'Reset all standard farm notifications.', 'success');
  };

  // Settings
  const updateSettings = (newSettings: Partial<FarmSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      addToast('Settings Saved', 'Farm parameters updated in local Edge memory.', 'success');
      return updated;
    });
  };

  const unreadAlertsCount = alerts.filter((a) => !a.isRead).length;

  return (
    <FarmContext.Provider
      value={{
        isLoggedIn,
        loginAsDemo,
        loginAsFarmer,
        logout,
        currentView,
        setCurrentView,
        zones,
        farmSummary,
        weather,
        sensorsList,
        cameraFeeds,
        alerts,
        unreadAlertsCount,
        activities,
        settings,
        updateSettings,
        scaleModalOpen,
        setScaleModalOpen,
        scaledAssets,
        addScaledAsset,
        selectedZoneDetail,
        openZoneDetail,
        closeZoneDetail,
        irrigation,
        startIrrigation,
        stopIrrigation,
        completeIrrigationCycle,
        toggleSmartIrrigation,
        markAlertAsRead,
        dismissAlert,
        restoreAlerts,
        isScanningAi,
        aiScanStep,
        lastAiScanResult,
        runAiAnalysis,
        isScanningCamera,
        scanningCameraId,
        runCameraScan,
        captureCameraSnapshot,
        chatOpen,
        setChatOpen,
        chatMessages,
        sendFarmerMessage,
        executeChatAction,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
