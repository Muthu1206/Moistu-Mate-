import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { useLanguage } from '../App';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Zap,
  Bell,
  Settings,
  AlertTriangle,
  CheckCircle,
  Calendar,
  MapPin,
  Activity,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    condition: string;
    icon: string;
    precipitation: number;
  };
  forecast: Array<{
    day: string;
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    humidity: number;
  }>;
  hourly: Array<{
    time: string;
    temperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
  }>;
}

interface AlarmSettings {
  temperatureHigh: boolean;
  temperatureLow: boolean;
  rainAlert: boolean;
  windAlert: boolean;
  frostWarning: boolean;
  highHumidity: boolean;
  lowHumidity: boolean;
  thresholds: {
    tempHigh: number;
    tempLow: number;
    windSpeed: number;
    humidityHigh: number;
    humidityLow: number;
  };
}

export function WeatherDetector() {
  const { t } = useLanguage();
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: {
      temperature: 24,
      humidity: 65,
      windSpeed: 12,
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
      condition: 'Partly Cloudy',
      icon: '🌤️',
      precipitation: 0
    },
    forecast: [
      { day: 'Today', date: '2024-01-15', high: 26, low: 18, condition: 'Partly Cloudy', icon: '🌤️', precipitation: 10, humidity: 65 },
      { day: 'Tomorrow', date: '2024-01-16', high: 28, low: 20, condition: 'Sunny', icon: '☀️', precipitation: 0, humidity: 58 },
      { day: 'Wednesday', date: '2024-01-17', high: 25, low: 19, condition: 'Light Rain', icon: '🌦️', precipitation: 70, humidity: 78 },
      { day: 'Thursday', date: '2024-01-18', high: 23, low: 17, condition: 'Cloudy', icon: '☁️', precipitation: 20, humidity: 72 },
      { day: 'Friday', date: '2024-01-19', high: 27, low: 21, condition: 'Partly Cloudy', icon: '🌤️', precipitation: 15, humidity: 62 },
      { day: 'Saturday', date: '2024-01-20', high: 29, low: 22, condition: 'Sunny', icon: '☀️', precipitation: 5, humidity: 55 },
      { day: 'Sunday', date: '2024-01-21', high: 31, low: 24, condition: 'Hot', icon: '🌡️', precipitation: 0, humidity: 50 }
    ],
    hourly: []
  });

  const [alarmSettings, setAlarmSettings] = useState<AlarmSettings>({
    temperatureHigh: true,
    temperatureLow: true,
    rainAlert: true,
    windAlert: false,
    frostWarning: true,
    highHumidity: false,
    lowHumidity: true,
    thresholds: {
      tempHigh: 35,
      tempLow: 5,
      windSpeed: 25,
      humidityHigh: 85,
      humidityLow: 30
    }
  });

  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, type: 'rain', message: 'Rain expected tomorrow afternoon', severity: 'warning', time: '2 hours ago' },
    { id: 2, type: 'wind', message: 'High winds (28 km/h) expected Thursday', severity: 'info', time: '1 day ago' }
  ]);

  // Generate hourly data for the next 24 hours
  useEffect(() => {
    const generateHourlyData = () => {
      const hourlyData = [];
      const now = new Date();
      
      for (let i = 0; i < 24; i++) {
        const time = new Date(now.getTime() + i * 60 * 60 * 1000);
        hourlyData.push({
          time: time.getHours() + ':00',
          temperature: 20 + Math.random() * 10 + Math.sin(i * 0.26) * 5,
          humidity: 50 + Math.random() * 30,
          precipitation: Math.random() * 100,
          windSpeed: 5 + Math.random() * 20
        });
      }
      
      setWeatherData(prev => ({ ...prev, hourly: hourlyData }));
    };

    generateHourlyData();
    
    // Simulate real-time weather updates
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        current: {
          ...prev.current,
          temperature: prev.current.temperature + (Math.random() - 0.5) * 2,
          humidity: Math.max(30, Math.min(90, prev.current.humidity + (Math.random() - 0.5) * 5)),
          windSpeed: Math.max(0, prev.current.windSpeed + (Math.random() - 0.5) * 3)
        }
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return '☀️';
      case 'partly cloudy': return '🌤️';
      case 'cloudy': return '☁️';
      case 'light rain': case 'rain': return '🌦️';
      case 'heavy rain': return '🌧️';
      case 'thunderstorm': return '⛈️';
      case 'snow': return '🌨️';
      case 'hot': return '🌡️';
      default: return '🌤️';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': case 'hot': return 'text-yellow-600 bg-yellow-100';
      case 'partly cloudy': return 'text-blue-600 bg-blue-100';
      case 'cloudy': return 'text-gray-600 bg-gray-100';
      case 'light rain': case 'rain': return 'text-blue-600 bg-blue-100';
      case 'heavy rain': case 'thunderstorm': return 'text-blue-800 bg-blue-200';
      case 'snow': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-600 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const updateAlarmSetting = (key: keyof AlarmSettings, value: boolean) => {
    setAlarmSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateThreshold = (key: keyof AlarmSettings['thresholds'], value: number[]) => {
    setAlarmSettings(prev => ({
      ...prev,
      thresholds: { ...prev.thresholds, [key]: value[0] }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Cloud className="w-5 h-5 mr-2 text-blue-600" />
              {t('weatherDetector')} - Current Conditions
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Mumbai, Maharashtra</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Main Weather Display */}
            <div className="md:col-span-2 text-center">
              <div className="text-6xl mb-2">{weatherData.current.icon}</div>
              <div className="text-4xl font-medium mb-2">{weatherData.current.temperature.toFixed(1)}°C</div>
              <Badge className={getConditionColor(weatherData.current.condition)}>
                {weatherData.current.condition}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">
                Feels like {(weatherData.current.temperature + 2).toFixed(1)}°C
              </p>
            </div>
            
            {/* Weather Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Droplets className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm">Humidity</span>
                </div>
                <span className="font-medium">{weatherData.current.humidity}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wind className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">Wind Speed</span>
                </div>
                <span className="font-medium">{weatherData.current.windSpeed} km/h</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">Visibility</span>
                </div>
                <span className="font-medium">{weatherData.current.visibility} km</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-sm">Pressure</span>
                </div>
                <span className="font-medium">{weatherData.current.pressure} hPa</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sun className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm">UV Index</span>
                </div>
                <Badge className={weatherData.current.uvIndex > 7 ? 'bg-red-100 text-red-600' : 
                                weatherData.current.uvIndex > 3 ? 'bg-yellow-100 text-yellow-600' : 
                                'bg-green-100 text-green-600'}>
                  {weatherData.current.uvIndex}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CloudRain className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm">Precipitation</span>
                </div>
                <span className="font-medium">{weatherData.current.precipitation}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 24-Hour Temperature Trend */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-orange-500" />
              24-Hour Temperature Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weatherData.hourly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${value.toFixed(1)}°C`, 'Temperature']} />
                  <Area type="monotone" dataKey="temperature" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Humidity & Precipitation */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-blue-500" />
              Humidity & Rain Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherData.hourly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity %" />
                  <Line type="monotone" dataKey="precipitation" stroke="#06b6d4" strokeWidth={2} name="Rain Chance %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Forecast */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            7-Day Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-1">{day.day}</p>
                <p className="text-xs text-gray-600 mb-2">{day.date}</p>
                <div className="text-2xl mb-2">{day.icon}</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-red-500" />
                    <span className="text-sm font-medium">{day.high}°</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingDown className="w-3 h-3 text-blue-500" />
                    <span className="text-sm text-gray-600">{day.low}°</span>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <Badge variant="secondary" className="text-xs">
                    {day.precipitation}% rain
                  </Badge>
                  <p className="text-xs text-gray-600">
                    {day.humidity}% humidity
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-yellow-600" />
            Active Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeAlerts.length === 0 ? (
            <div className="text-center py-6">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-gray-600">No active weather alerts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 border rounded-lg ${getAlertSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      {alert.severity === 'critical' && <AlertTriangle className="w-4 h-4 mt-0.5" />}
                      {alert.severity === 'warning' && <AlertTriangle className="w-4 h-4 mt-0.5" />}
                      {alert.severity === 'info' && <Bell className="w-4 h-4 mt-0.5" />}
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs opacity-75 mt-1">{alert.time}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alarm Settings */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-gray-600" />
            {t('alarmSettings')} & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alert Types */}
            <div className="space-y-4">
              <h4 className="font-medium">Alert Types</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">High Temperature Alert</p>
                    <p className="text-xs text-gray-600">Alert when temperature exceeds threshold</p>
                  </div>
                  <Switch 
                    checked={alarmSettings.temperatureHigh}
                    onCheckedChange={(checked) => updateAlarmSetting('temperatureHigh', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Low Temperature Alert</p>
                    <p className="text-xs text-gray-600">Alert for frost warnings</p>
                  </div>
                  <Switch 
                    checked={alarmSettings.temperatureLow}
                    onCheckedChange={(checked) => updateAlarmSetting('temperatureLow', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Rain Alert</p>
                    <p className="text-xs text-gray-600">Notify before expected rainfall</p>
                  </div>
                  <Switch 
                    checked={alarmSettings.rainAlert}
                    onCheckedChange={(checked) => updateAlarmSetting('rainAlert', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">High Wind Alert</p>
                    <p className="text-xs text-gray-600">Alert for strong winds</p>
                  </div>
                  <Switch 
                    checked={alarmSettings.windAlert}
                    onCheckedChange={(checked) => updateAlarmSetting('windAlert', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Humidity Alerts</p>
                    <p className="text-xs text-gray-600">High/low humidity warnings</p>
                  </div>
                  <Switch 
                    checked={alarmSettings.highHumidity}
                    onCheckedChange={(checked) => updateAlarmSetting('highHumidity', checked)}
                  />
                </div>
              </div>
            </div>
            
            {/* Thresholds */}
            <div className="space-y-4">
              <h4 className="font-medium">Alert Thresholds</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">High Temperature (°C)</label>
                  <div className="flex items-center space-x-3 mt-1">
                    <Slider
                      value={[alarmSettings.thresholds.tempHigh]}
                      onValueChange={(value) => updateThreshold('tempHigh', value)}
                      max={50}
                      min={25}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{alarmSettings.thresholds.tempHigh}°C</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Low Temperature (°C)</label>
                  <div className="flex items-center space-x-3 mt-1">
                    <Slider
                      value={[alarmSettings.thresholds.tempLow]}
                      onValueChange={(value) => updateThreshold('tempLow', value)}
                      max={15}
                      min={-5}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{alarmSettings.thresholds.tempLow}°C</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Wind Speed (km/h)</label>
                  <div className="flex items-center space-x-3 mt-1">
                    <Slider
                      value={[alarmSettings.thresholds.windSpeed]}
                      onValueChange={(value) => updateThreshold('windSpeed', value)}
                      max={50}
                      min={10}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-16">{alarmSettings.thresholds.windSpeed} km/h</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">High Humidity (%)</label>
                  <div className="flex items-center space-x-3 mt-1">
                    <Slider
                      value={[alarmSettings.thresholds.humidityHigh]}
                      onValueChange={(value) => updateThreshold('humidityHigh', value)}
                      max={100}
                      min={60}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{alarmSettings.thresholds.humidityHigh}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Smart Recommendations</p>
                <p className="text-xs text-gray-600">AI-powered farming suggestions based on weather</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}