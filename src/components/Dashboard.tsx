import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { useLanguage, useUser } from '../App';
import { 
  Leaf, 
  Mic, 
  Send, 
  Droplets, 
  Thermometer,
  Camera,
  ShoppingCart,
  MapPin,
  TrendingUp,
  Cloud,
  Bell,
  Home,
  Scan,
  Bug,
  Users,
  IndianRupee,
  AlertTriangle,
  CheckCircle,
  Activity,
  Settings,
  MessageSquare
} from "lucide-react";
import { VoiceAssistant } from './VoiceAssistant';
import { SensorMonitoring } from './SensorMonitoring';
import { PlantScanner } from './PlantScanner';
import { EcommercePlatform } from './EcommercePlatform';
import { MapIntegration } from './MapIntegration';
import { ProfitAnalysis } from './ProfitAnalysis';
import { WeatherDetector } from './WeatherDetector';
import { PlantRecommendations } from './PlantRecommendations';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { t } = useLanguage();
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock sensor data
  const [sensorData, setSensorData] = useState({
    humidity: 65,
    soilMoisture: 45,
    temperature: 24,
    lightLevel: 80,
    ph: 6.8
  });

  // Mock plant health data
  const [plantHealth, setPlantHealth] = useState([
    { id: 1, name: 'Tomato Plant #1', health: 'healthy', moisture: 85, location: 'Garden A1' },
    { id: 2, name: 'Rose Bush #2', health: 'needsAttention', moisture: 35, location: 'Garden B2' },
    { id: 3, name: 'Mint Plant #3', health: 'critical', moisture: 15, location: 'Indoor C1' },
    { id: 4, name: 'Basil Plant #4', health: 'healthy', moisture: 75, location: 'Kitchen D1' }
  ]);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'needsAttention': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'needsAttention': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  // Simulate sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        humidity: Math.max(40, Math.min(80, prev.humidity + (Math.random() - 0.5) * 5)),
        soilMoisture: Math.max(20, Math.min(90, prev.soilMoisture + (Math.random() - 0.5) * 3)),
        temperature: Math.max(18, Math.min(30, prev.temperature + (Math.random() - 0.5) * 2)),
        lightLevel: Math.max(60, Math.min(100, prev.lightLevel + (Math.random() - 0.5) * 4)),
        ph: Math.max(6.0, Math.min(7.5, prev.ph + (Math.random() - 0.5) * 0.2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-full">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {t('logoName')}
                </h1>
                <p className="text-sm text-gray-600">{t('dashboard')}</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => onNavigate('home')}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {t('home')}
              </button>
              <button className="text-green-600">
                {t('dashboard')}
              </button>
            </nav>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {user?.name}
              </span>
              <Button 
                onClick={logout}
                variant="outline" 
                size="sm"
                className="border-gray-300"
              >
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="overview" className="text-xs p-2">
              <Home className="w-4 h-4 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="voice" className="text-xs p-2">
              <Mic className="w-4 h-4 mr-1" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="sensors" className="text-xs p-2">
              <Droplets className="w-4 h-4 mr-1" />
              Sensors
            </TabsTrigger>
            <TabsTrigger value="scanner" className="text-xs p-2">
              <Camera className="w-4 h-4 mr-1" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="ecommerce" className="text-xs p-2">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Shop
            </TabsTrigger>
            <TabsTrigger value="maps" className="text-xs p-2">
              <MapPin className="w-4 h-4 mr-1" />
              Maps
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs p-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="weather" className="text-xs p-2">
              <Cloud className="w-4 h-4 mr-1" />
              Weather
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{t('humidityLevel')}</p>
                      <p className="text-2xl">{sensorData.humidity.toFixed(1)}%</p>
                    </div>
                    <Droplets className="w-8 h-8 text-blue-500" />
                  </div>
                  <Progress value={sensorData.humidity} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{t('moistureLevel')}</p>
                      <p className="text-2xl">{sensorData.soilMoisture.toFixed(1)}%</p>
                    </div>
                    <Thermometer className="w-8 h-8 text-green-500" />
                  </div>
                  <Progress value={sensorData.soilMoisture} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="text-2xl">{sensorData.temperature.toFixed(1)}°C</p>
                    </div>
                    <Thermometer className="w-8 h-8 text-orange-500" />
                  </div>
                  <Progress value={(sensorData.temperature - 18) / 12 * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Plants</p>
                      <p className="text-2xl">{plantHealth.length}</p>
                    </div>
                    <Leaf className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="flex space-x-1 mt-2">
                    {plantHealth.map(plant => (
                      <div 
                        key={plant.id} 
                        className={`w-2 h-2 rounded-full ${
                          plant.health === 'healthy' ? 'bg-green-500' :
                          plant.health === 'needsAttention' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plant Health Overview */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Plant Health Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plantHealth.map(plant => (
                    <div key={plant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getHealthIcon(plant.health)}
                        <div>
                          <p className="font-medium">{plant.name}</p>
                          <p className="text-sm text-gray-600">{plant.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getHealthColor(plant.health)}>
                          {t(plant.health)}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">
                          Moisture: {plant.moisture}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Plant Recommendations Preview */}
            <PlantRecommendations />
          </TabsContent>

          {/* Voice Assistant Tab */}
          <TabsContent value="voice">
            <VoiceAssistant />
          </TabsContent>

          {/* Sensor Monitoring Tab */}
          <TabsContent value="sensors">
            <SensorMonitoring sensorData={sensorData} />
          </TabsContent>

          {/* Plant Scanner Tab */}
          <TabsContent value="scanner">
            <PlantScanner />
          </TabsContent>

          {/* E-commerce Tab */}
          <TabsContent value="ecommerce">
            <EcommercePlatform />
          </TabsContent>

          {/* Maps Tab */}
          <TabsContent value="maps">
            <MapIntegration />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <ProfitAnalysis />
          </TabsContent>

          {/* Weather Tab */}
          <TabsContent value="weather">
            <WeatherDetector />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}