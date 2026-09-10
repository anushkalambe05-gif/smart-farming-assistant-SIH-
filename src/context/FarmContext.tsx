import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { 
  TabType, 
  ZoneId, 
  ZoneData, 
  FarmSummary, 
  SensorOverview, 
  AlertItem, 
  AdvisoryItem,
  ChatMessage
} from '../types/farm';
import { 
  initialFarmSummary, 
  initialSensorOverview, 
  initialZones, 
  initialAlerts, 
  aiAdvisories,
  initialChatMessages 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

interface FarmContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedZoneId: ZoneId;
  setSelectedZoneId: (zoneId: ZoneId) => void;
  zones: Record<string, ZoneData>;
  farmSummary: FarmSummary;
  sensorOverview: SensorOverview;
  alerts: AlertItem[];
  advisories: AdvisoryItem[];
  unreadAlertsCount: number;
  isSimulatingLive: boolean;
  toggleSimulateLive: () => void;
  triggerLiveTick: () => void;
  startIrrigation: (zoneId: ZoneId) => void;
  stopIrrigation: (zoneId: ZoneId) => void;
  markAlertAsRead: (id: string) => void;
  markAllAlertsAsRead: () => void;
  dismissAlert: (id: string) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  showArchitectureModal: boolean;
  setShowArchitectureModal: (show: boolean) => void;
  quickNavigateToZone: (zoneId: ZoneId, tab?: TabType) => void;
  // Modal states
  selectedCameraZone: ZoneId | null;
  openCameraFeed: (zoneId: ZoneId) => void;
  closeCameraFeed: () => void;
  selectedZoneDetail: ZoneId | null;
  openZoneDetail: (zoneId: ZoneId) => void;
  closeZoneDetail: () => void;
  // Ask AI Farmer Assistant
  chatMessages: ChatMessage[];
  isAiThinking: boolean;
  sendMessage: (userText: string) => void;
  askQuickQuestion: (questionText: string) => void;
  clearChat: () => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedZoneId, setSelectedZoneId] = useState<ZoneId>('zone-1');
  const [zones, setZones] = useState<Record<string, ZoneData>>(initialZones);
  const [farmSummary] = useState<FarmSummary>(initialFarmSummary);
  const [sensorOverview, setSensorOverview] = useState<SensorOverview>(initialSensorOverview);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [advisories] = useState<AdvisoryItem[]>(aiAdvisories);
  const [isSimulatingLive, setIsSimulatingLive] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showArchitectureModal, setShowArchitectureModal] = useState<boolean>(false);
  const [selectedCameraZone, setSelectedCameraZone] = useState<ZoneId | null>(null);
  const [selectedZoneDetail, setSelectedZoneDetail] = useState<ZoneId | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const addToast = useCallback((title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev.slice(-4), { id, title, message, type, timestamp: Date.now() }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Auto-remove toasts after 4.5 seconds
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setInterval(() => {
      const now = Date.now();
      setToasts((prev) => prev.filter((t) => now - t.timestamp < 4500));
    }, 1000);
    return () => clearInterval(timer);
  }, [toasts]);

  // Gentle live data fluctuation and dynamic irrigation moisture increase
  const triggerLiveTick = useCallback(() => {
    setZones((prev) => {
      const nowStr = 'Just now (Edge Sync)';
      const z1 = prev['zone-1'];
      const z2 = prev['zone-2'];

      // Bounded jitter for zone 1 (46-50%)
      const z1MoistureJitter = Math.min(50, Math.max(46, Number((z1.soilMoisture + (Math.random() * 0.4 - 0.2)).toFixed(1))));
      const z1TempJitter = Math.min(28, Math.max(26, Number((z1.temperature + (Math.random() * 0.2 - 0.1)).toFixed(1))));

      // If Zone 2 pump is ON, moisture climbs dynamically: 28% -> 32% -> 37% -> 42%
      let z2Moisture = z2.soilMoisture;
      if (z2.pumpStatus === 'ON') {
        z2Moisture = Math.min(48, Number((z2.soilMoisture + 1.2).toFixed(1)));
      } else {
        z2Moisture = Math.min(30, Math.max(26, Number((z2.soilMoisture + (Math.random() * 0.3 - 0.15)).toFixed(1))));
      }

      // If Zone 1 pump is ON (if triggered)
      let z1Moisture = z1MoistureJitter;
      if (z1.pumpStatus === 'ON') {
        z1Moisture = Math.min(55, Number((z1.soilMoisture + 1.0).toFixed(1)));
      }

      return {
        'zone-1': {
          ...z1,
          soilMoisture: z1Moisture,
          temperature: z1TempJitter,
          lastUpdated: nowStr,
        },
        'zone-2': {
          ...z2,
          soilMoisture: z2Moisture,
          lastUpdated: nowStr,
        },
      };
    });

    setSensorOverview(() => {
      return {
        soilMoisture: Number(((zones['zone-1'].soilMoisture + zones['zone-2'].soilMoisture) / 2).toFixed(0)),
        temperature: Number(((zones['zone-1'].temperature + zones['zone-2'].temperature) / 2).toFixed(0)),
        humidity: 66,
        light: 74,
        rainfall: 'No Rain Detected',
      };
    });
  }, [zones]);

  // Periodic heartbeat tick every 5 seconds when live simulation is active
  useEffect(() => {
    if (!isSimulatingLive) return;
    const interval = setInterval(() => {
      triggerLiveTick();
    }, 5000);
    return () => clearInterval(interval);
  }, [isSimulatingLive, triggerLiveTick]);

  const toggleSimulateLive = () => {
    setIsSimulatingLive((prev) => {
      const next = !prev;
      addToast(
        next ? 'Live Edge Telemetry Resumed' : 'Live Edge Telemetry Paused',
        next ? 'ESP32 simulated packet stream is active.' : 'Sensor updates paused for static inspection.',
        next ? 'success' : 'info'
      );
      return next;
    });
  };

  const startIrrigation = (zoneId: ZoneId) => {
    setZones((prev) => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        pumpStatus: 'ON',
      },
    }));

    const zoneName = zoneId === 'zone-1' ? 'Zone 1' : 'Zone 2';
    addToast(
      `${zoneName} irrigation started – Demo Simulation`,
      `Water pump for ${zoneName} is now ACTIVE. Flow rate: 450 L/h. Drip lines pressurized. Moisture will increase.`,
      'success'
    );
  };

  const stopIrrigation = (zoneId: ZoneId) => {
    setZones((prev) => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        pumpStatus: 'OFF',
      },
    }));

    const zoneName = zoneId === 'zone-1' ? 'Zone 1' : 'Zone 2';
    addToast(
      `${zoneName} irrigation stopped – Demo Simulation`,
      `Water pump for ${zoneName} has been shut OFF. System returned to standby.`,
      'info'
    );
  };

  const markAlertAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, isRead: true } : alert))
    );
  };

  const markAllAlertsAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })));
    addToast('All Alerts Marked as Read', 'Alert center cleared of pending notifications.', 'info');
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    addToast('Alert Dismissed', 'Notification removed from dashboard.', 'info');
  };

  const quickNavigateToZone = (zoneId: ZoneId, tab: TabType = 'monitoring') => {
    setSelectedZoneId(zoneId);
    setActiveTab(tab);
  };

  const openCameraFeed = (zoneId: ZoneId) => {
    setSelectedCameraZone(zoneId);
  };

  const closeCameraFeed = () => {
    setSelectedCameraZone(null);
  };

  const openZoneDetail = (zoneId: ZoneId) => {
    setSelectedZoneDetail(zoneId);
  };

  const closeZoneDetail = () => {
    setSelectedZoneDetail(null);
  };

  // -------------------------------------------------------------
  // ASK AI FARMER ASSISTANT - SIMULATED EDGE AI REASONING ENGINE
  // -------------------------------------------------------------
  const generateAiAnswer = (query: string): { text: string; action?: { label: string; tab: TabType } } => {
    const q = query.toLowerCase().trim();
    const z1 = zones['zone-1'];
    const z2 = zones['zone-2'];

    // 1. Should I irrigate / water
    if (
      (q.includes('irrigate') && (q.includes('zone 2') || q.includes('zone2') || !q.includes('zone 1'))) ||
      (q.includes('should i irrigate') || q.includes('water') && q.includes('should'))
    ) {
      return {
        text: `Yes. Zone 2 currently has ${z2.soilMoisture}% soil moisture, which is below the optimal level. Irrigation is recommended. Start the Zone 2 pump and monitor moisture after irrigation.`,
        action: { label: 'Go to Irrigation Controls', tab: 'irrigation' },
      };
    }

    if (q.includes('irrigate') && (q.includes('zone 1') || q.includes('zone1'))) {
      return {
        text: `No irrigation required for Zone 1. Soil moisture is at ${z1.soilMoisture}%, which is within the optimal 35–55% range for wheat crops.`,
        action: { label: 'View Zone 1 Status', tab: 'monitoring' },
      };
    }

    // 2. Why are the leaves turning yellow?
    if (q.includes('yellow') || (q.includes('leaves') && q.includes('why')) || q.includes('leaf color')) {
      return {
        text: `Yellowing leaves can be caused by water stress, nutrient deficiency or disease. Zone 2 currently has low soil moisture (${z2.soilMoisture}%) and Leaf Blight has also been detected with 94% confidence. Inspect the affected leaves and check irrigation conditions.`,
        action: { label: 'Inspect Leaf Blight in Edge AI', tab: 'edge-ai' },
      };
    }

    // 3. Is my crop healthy?
    if (q.includes('crop healthy') || q.includes('is my crop healthy') || (q.includes('health') && !q.includes('soil'))) {
      return {
        text: `Overall crop health is ${farmSummary.overallCropHealth}%. Zone 1 is healthy at ${z1.cropHealth}%, while Zone 2 requires attention at ${z2.cropHealth}% due to low soil moisture (${z2.soilMoisture}%) and Leaf Blight detection.`,
        action: { label: 'View Full Advisory', tab: 'advisory' },
      };
    }

    // 4. Is there any disease? / pest / pathogen
    if (q.includes('disease') || q.includes('pest') || q.includes('blight') || q.includes('fungus')) {
      return {
        text: `Yes. The Edge AI system has detected Leaf Blight in Zone 2 with 94% confidence. Inspect the affected plants and follow appropriate disease-management practices.`,
        action: { label: 'Review Edge AI Camera Feed', tab: 'edge-ai' },
      };
    }

    // 5. What should I do for Zone 2?
    if (q.includes('zone 2') || q.includes('zone2')) {
      return {
        text: `Zone 2 needs attention. Soil moisture is ${z2.soilMoisture}% and Leaf Blight has been detected with 94% confidence. Recommended actions: start irrigation, inspect affected leaves and continue monitoring the zone.`,
        action: { label: 'Start Zone 2 Pump', tab: 'irrigation' },
      };
    }

    // 6. What is the soil condition? / soil / moisture
    if (q.includes('soil') || q.includes('moisture')) {
      return {
        text: `Zone 1 has ${z1.soilMoisture}% moisture and is currently optimal. Zone 2 has ${z2.soilMoisture}% moisture and requires irrigation.`,
        action: { label: 'Check Soil Analytics', tab: 'analytics' },
      };
    }

    // 7. Temperature / Humidity / Weather / Rain
    if (q.includes('temperature') || q.includes('temp') || q.includes('humidity') || q.includes('weather') || q.includes('rain')) {
      return {
        text: `Farm temperature is 27°C in Zone 1 and 29°C in Zone 2. Humidity is 69% in Zone 1 and 63% in Zone 2. No rain is detected. The weather is dry and warm, ideal for morning drip irrigation.`,
        action: { label: 'View Weather Advisory', tab: 'advisory' },
      };
    }

    // 8. Fertilizer / Nutrients
    if (q.includes('fertilizer') || q.includes('nitrogen') || q.includes('npk') || q.includes('nutrient')) {
      return {
        text: `For PBW-550 wheat, maintain balanced nitrogen application. Avoid excessive nitrogen in Zone 2 until the Leaf Blight outbreak is contained, as lush canopy growth can accelerate fungal spread.`,
        action: { label: 'View AI Advisory', tab: 'advisory' },
      };
    }

    // 9. Zone 1 specific
    if (q.includes('zone 1') || q.includes('zone1')) {
      return {
        text: `Zone 1 (North Sector) is in prime condition. Soil moisture: ${z1.soilMoisture}%, Temperature: ${z1.temperature}°C, Crop Health: ${z1.cropHealth}%. No disease detected. Regular monitoring is sufficient.`,
        action: { label: 'Inspect Zone 1', tab: 'monitoring' },
      };
    }

    // 10. Fallback message specified in user instructions
    return {
      text: 'I can help you with irrigation, crop health, disease detection, soil conditions, weather and zone recommendations.',
      action: { label: 'View Farm Overview', tab: 'dashboard' },
    };
  };

  const sendMessage = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      sender: 'farmer',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAiThinking(true);

    // Simulate edge inference response delay (450ms)
    setTimeout(() => {
      const response = generateAiAnswer(userText);
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: response.action,
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 450);
  };

  const askQuickQuestion = (questionText: string) => {
    sendMessage(questionText);
  };

  const clearChat = () => {
    setChatMessages(initialChatMessages);
    addToast('Chat Reset', 'Conversational history cleared to initial state.', 'info');
  };

  const unreadAlertsCount = alerts.filter((a) => !a.isRead).length;

  return (
    <FarmContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedZoneId,
        setSelectedZoneId,
        zones,
        farmSummary,
        sensorOverview,
        alerts,
        advisories,
        unreadAlertsCount,
        isSimulatingLive,
        toggleSimulateLive,
        triggerLiveTick,
        startIrrigation,
        stopIrrigation,
        markAlertAsRead,
        markAllAlertsAsRead,
        dismissAlert,
        toasts,
        addToast,
        removeToast,
        showArchitectureModal,
        setShowArchitectureModal,
        quickNavigateToZone,
        selectedCameraZone,
        openCameraFeed,
        closeCameraFeed,
        selectedZoneDetail,
        openZoneDetail,
        closeZoneDetail,
        chatMessages,
        isAiThinking,
        sendMessage,
        askQuickQuestion,
        clearChat,
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
