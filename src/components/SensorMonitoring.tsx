import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useLanguage } from '../App';
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Wifi,
  WifiOff,
  Settings,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface SensorData {
  humidity: number;
  soilMoisture: number;
  temperature: number;
  lightLevel: number;
  ph: number;
}

interface SensorMonitoringProps {
  sensorData: SensorData;
}

export function SensorMonitoring({ sensorData }: SensorMonitoringProps) {
  const { t } = useLanguage();
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Soil moisture low in Garden A1', active: true },
    { id: 2, type: 'success', message: 'Optimal humidity levels maintained', active: true },
    { id: 3, type: 'error', message: 'Sensor connection lost - Garden C3', active: false }
  ]);
  const [sensorSettings, setSensorSettings] = useState({
    autoWatering: true,
    alertsEnabled: true,
    dataLogging: true,
    realTimeUpdates: true
  });

  // Generate historical data for charts
  useEffect(() => {
    const generateHistoricalData = () => {
      const data = [];
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          time: time.getHours() + ':00',
          humidity: 60 + Math.random() * 20,
          soilMoisture: 40 + Math.random() * 30,
          temperature: 20 + Math.random() * 10,
          lightLevel: i < 6 || i > 18 ? 20 + Math.random() * 30 : 70 + Math.random() * 30,
          ph: 6.5 + Math.random() * 1
        });
      }
      
      setHistoricalData(data);
    };

    generateHistoricalData();
  }, []);

  const getSensorStatus = (value: number, type: string) => {
    switch (type) {
      case 'moisture':
        if (value > 70) return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
        if (value > 40) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        return { status: 'critical', color: 'text-red-600', bg: 'bg-red-100' };
      case 'humidity':
        if (value >= 50 && value <= 70) return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
        if (value >= 40 && value <= 80) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        return { status: 'critical', color: 'text-red-600', bg: 'bg-red-100' };
      case 'temperature':
        if (value >= 20 && value <= 26) return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
        if (value >= 15 && value <= 30) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        return { status: 'critical', color: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
    }
  };

  const sensorLocations = [
    { id: 1, name: 'Garden A1', status: 'online', moisture: sensorData.soilMoisture, humidity: sensorData.humidity },
    { id: 2, name: 'Garden B2', status: 'online', moisture: 35, humidity: 58 },
    { id: 3, name: 'Indoor C1', status: 'online', moisture: 80, humidity: 72 },
    { id: 4, name: 'Garden C3', status: 'offline', moisture: 0, humidity: 0 },
    { id: 5, name: 'Greenhouse D1', status: 'online', moisture: 65, humidity: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* Real-time Sensor Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Droplets className="w-6 h-6 text-blue-500" />
              <Badge className={getSensorStatus(sensorData.humidity, 'humidity').bg + ' ' + getSensorStatus(sensorData.humidity, 'humidity').color}>
                {getSensorStatus(sensorData.humidity, 'humidity').status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{t('humidityLevel')}</p>
            <p className="text-2xl">{sensorData.humidity.toFixed(1)}%</p>
            <Progress value={sensorData.humidity} className="mt-2" />
            <div className="flex items-center mt-1 text-xs text-gray-500">
              {sensorData.humidity > 65 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {sensorData.humidity > 65 ? '+2.3%' : '-1.8%'}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Droplets className="w-6 h-6 text-green-500" />
              <Badge className={getSensorStatus(sensorData.soilMoisture, 'moisture').bg + ' ' + getSensorStatus(sensorData.soilMoisture, 'moisture').color}>
                {getSensorStatus(sensorData.soilMoisture, 'moisture').status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{t('moistureLevel')}</p>
            <p className="text-2xl">{sensorData.soilMoisture.toFixed(1)}%</p>
            <Progress value={sensorData.soilMoisture} className="mt-2" />
            <div className="flex items-center mt-1 text-xs text-gray-500">
              {sensorData.soilMoisture > 50 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {sensorData.soilMoisture > 50 ? '+1.2%' : '-3.1%'}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="w-6 h-6 text-orange-500" />
              <Badge className={getSensorStatus(sensorData.temperature, 'temperature').bg + ' ' + getSensorStatus(sensorData.temperature, 'temperature').color}>
                {getSensorStatus(sensorData.temperature, 'temperature').status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="text-2xl">{sensorData.temperature.toFixed(1)}°C</p>
            <Progress value={(sensorData.temperature - 15) / 15 * 100} className="mt-2" />
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.5°C
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Sun className="w-6 h-6 text-yellow-500" />
              <Badge className="bg-green-100 text-green-600">optimal</Badge>
            </div>
            <p className="text-sm text-gray-600">Light Level</p>
            <p className="text-2xl">{sensorData.lightLevel.toFixed(0)}%</p>
            <Progress value={sensorData.lightLevel} className="mt-2" />
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <TrendingDown className="w-3 h-3 mr-1" />
              -5.2%
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-6 h-6 text-purple-500" />
              <Badge className="bg-green-100 text-green-600">good</Badge>
            </div>
            <p className="text-sm text-gray-600">Soil pH</p>
            <p className="text-2xl">{sensorData.ph.toFixed(1)}</p>
            <Progress value={(sensorData.ph - 6) / 2 * 100} className="mt-2" />
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.1
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historical Data Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-blue-500" />
              Humidity & Moisture Trends (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity %" />
                  <Line type="monotone" dataKey="soilMoisture" stroke="#10b981" strokeWidth={2} name="Soil Moisture %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-orange-500" />
              Temperature & Light (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="temperature" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} name="Temperature °C" />
                  <Area type="monotone" dataKey="lightLevel" stackId="2" stroke="#eab308" fill="#eab308" fillOpacity={0.3} name="Light Level %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Locations Status */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Sensor Network Status
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Real-time Updates</span>
                <Switch 
                  checked={sensorSettings.realTimeUpdates}
                  onCheckedChange={(checked) => setSensorSettings(prev => ({ ...prev, realTimeUpdates: checked }))}
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sensorLocations.map((sensor) => (
              <div key={sensor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {sensor.status === 'online' ? (
                      <Wifi className="w-5 h-5 text-green-500" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-medium">{sensor.name}</span>
                  </div>
                  <Badge className={sensor.status === 'online' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}>
                    {sensor.status}
                  </Badge>
                </div>
                
                {sensor.status === 'online' && (
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Moisture</p>
                      <p className="font-medium">{sensor.moisture}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Humidity</p>
                      <p className="font-medium">{sensor.humidity}%</p>
                    </div>
                  </div>
                )}
                
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
              Active Alerts
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Alerts Enabled</span>
              <Switch 
                checked={sensorSettings.alertsEnabled}
                onCheckedChange={(checked) => setSensorSettings(prev => ({ ...prev, alertsEnabled: checked }))}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.filter(alert => alert.active).map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg ${
                alert.type === 'error' ? 'bg-red-50 border border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-center space-x-3">
                  {alert.type === 'error' ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : alert.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <span className="text-sm">{alert.message}</span>
                </div>
                <Button variant="outline" size="sm">
                  Resolve
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Settings */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Automation Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto Watering</p>
                  <p className="text-sm text-gray-600">Automatically water when moisture drops below threshold</p>
                </div>
                <Switch 
                  checked={sensorSettings.autoWatering}
                  onCheckedChange={(checked) => setSensorSettings(prev => ({ ...prev, autoWatering: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Logging</p>
                  <p className="text-sm text-gray-600">Store sensor data for historical analysis</p>
                </div>
                <Switch 
                  checked={sensorSettings.dataLogging}
                  onCheckedChange={(checked) => setSensorSettings(prev => ({ ...prev, dataLogging: checked }))}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Moisture Threshold (%)</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress value={40} className="flex-1" />
                  <span className="text-sm font-medium">40%</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Temperature Alert (°C)</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress value={80} className="flex-1" />
                  <span className="text-sm font-medium">30°C</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}