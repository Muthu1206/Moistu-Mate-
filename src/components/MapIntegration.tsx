import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from '../App';
import { 
  MapPin, 
  Navigation, 
  Locate, 
  Layers,
  Satellite,
  Map,
  Users,
  Truck,
  Home,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Zap
} from "lucide-react";

interface Farm {
  id: string;
  name: string;
  owner: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  area: number; // in acres
  cropType: string;
  plantingDate: string;
  soilMoisture: number;
  status: 'healthy' | 'attention' | 'critical';
  sensors: number;
  lastUpdate: string;
}

interface Supplier {
  id: string;
  name: string;
  type: 'seeds' | 'fertilizer' | 'equipment' | 'pesticide';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  rating: number;
  distance: number; // in km
  deliveryTime: string;
  contact: string;
}

export function MapIntegration() {
  const { t } = useLanguage();
  const [mapView, setMapView] = useState<'farms' | 'suppliers' | 'delivery'>('farms');
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 19.0760,
    lng: 72.8777,
    address: 'Mumbai, Maharashtra'
  });

  const farms: Farm[] = [
    {
      id: '1',
      name: 'Green Valley Farm',
      owner: 'Rajesh Kumar',
      location: {
        lat: 19.0760,
        lng: 72.8777,
        address: 'Andheri, Mumbai, Maharashtra'
      },
      area: 2.5,
      cropType: 'Tomatoes',
      plantingDate: '2024-01-15',
      soilMoisture: 65,
      status: 'healthy',
      sensors: 4,
      lastUpdate: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Sunrise Organic Farm',
      owner: 'Priya Sharma',
      location: {
        lat: 19.1197,
        lng: 72.9073,
        address: 'Powai, Mumbai, Maharashtra'
      },
      area: 1.8,
      cropType: 'Mixed Vegetables',
      plantingDate: '2024-01-20',
      soilMoisture: 35,
      status: 'attention',
      sensors: 3,
      lastUpdate: '5 minutes ago'
    },
    {
      id: '3',
      name: 'Heritage Herb Garden',
      owner: 'Amit Patel',
      location: {
        lat: 19.0485,
        lng: 72.8285,
        address: 'Bandra, Mumbai, Maharashtra'
      },
      area: 0.8,
      cropType: 'Herbs & Spices',
      plantingDate: '2024-02-01',
      soilMoisture: 15,
      status: 'critical',
      sensors: 2,
      lastUpdate: '1 minute ago'
    }
  ];

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'GreenSeeds Co.',
      type: 'seeds',
      location: {
        lat: 19.0728,
        lng: 72.8826,
        address: 'Kurla, Mumbai, Maharashtra'
      },
      rating: 4.8,
      distance: 8.5,
      deliveryTime: '1-2 days',
      contact: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'BioFert Solutions',
      type: 'fertilizer',
      location: {
        lat: 19.0330,
        lng: 72.8697,
        address: 'Worli, Mumbai, Maharashtra'
      },
      rating: 4.6,
      distance: 12.3,
      deliveryTime: '2-3 days',
      contact: '+91 98765 43211'
    },
    {
      id: '3',
      name: 'AgroTools India',
      type: 'equipment',
      location: {
        lat: 19.1136,
        lng: 72.8697,
        address: 'Malad, Mumbai, Maharashtra'
      },
      rating: 4.7,
      distance: 15.2,
      deliveryTime: '3-5 days',
      contact: '+91 98765 43212'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'attention': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'seeds': return '🌱';
      case 'fertilizer': return '🧪';
      case 'equipment': return '🔧';
      case 'pesticide': return '🛡️';
      default: return '📦';
    }
  };

  // Simulate getting current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(prev => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              {t('mapIntegration')}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Locate className="w-4 h-4 mr-1" />
                Current Location
              </Button>
              <Select value={mapView} onValueChange={(value: any) => setMapView(value)}>
                <SelectTrigger className="w-32">
                  <Layers className="w-4 h-4 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farms">Farms</SelectItem>
                  <SelectItem value="suppliers">Suppliers</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mock Map Area */}
          <div className="bg-gradient-to-br from-green-100 to-blue-100 h-96 rounded-lg relative overflow-hidden border border-gray-200">
            {/* Map placeholder with simulated locations */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Interactive Map View</p>
                <p className="text-sm text-gray-500">Real-time farm and supplier locations</p>
              </div>
            </div>
            
            {/* Simulated location pins */}
            {mapView === 'farms' && farms.map((farm, index) => (
              <div
                key={farm.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform ${getStatusColor(farm.status)}`}
                style={{
                  top: `${20 + index * 25}%`,
                  left: `${30 + index * 20}%`
                }}
                onClick={() => setSelectedFarm(selectedFarm === farm.id ? null : farm.id)}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
            
            {mapView === 'suppliers' && suppliers.map((supplier, index) => (
              <div
                key={supplier.id}
                className="absolute w-8 h-8 bg-blue-500 rounded-lg border-2 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform flex items-center justify-center text-white text-xs"
                style={{
                  top: `${25 + index * 20}%`,
                  left: `${40 + index * 15}%`
                }}
              >
                {getTypeIcon(supplier.type)}
              </div>
            ))}

            {/* Current location indicator */}
            <div className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"
                 style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location List */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  {mapView === 'farms' && <Home className="w-5 h-5 mr-2 text-green-600" />}
                  {mapView === 'suppliers' && <Truck className="w-5 h-5 mr-2 text-blue-600" />}
                  {mapView === 'delivery' && <Navigation className="w-5 h-5 mr-2 text-purple-600" />}
                  {mapView === 'farms' ? 'Farm Locations' : 
                   mapView === 'suppliers' ? 'Nearby Suppliers' : 'Delivery Tracking'}
                </div>
                {mapView === 'farms' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Farm
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mapView === 'farms' ? (
                <div className="space-y-4">
                  {farms.map((farm) => (
                    <div
                      key={farm.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedFarm === farm.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedFarm(selectedFarm === farm.id ? null : farm.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium">{farm.name}</h3>
                            <Badge className={`${getStatusColor(farm.status)} text-white`}>
                              {farm.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><span className="font-medium">Owner:</span> {farm.owner}</p>
                              <p><span className="font-medium">Area:</span> {farm.area} acres</p>
                              <p><span className="font-medium">Crop:</span> {farm.cropType}</p>
                            </div>
                            <div>
                              <p><span className="font-medium">Moisture:</span> {farm.soilMoisture}%</p>
                              <p><span className="font-medium">Sensors:</span> {farm.sensors} active</p>
                              <p><span className="font-medium">Updated:</span> {farm.lastUpdate}</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mt-2 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {farm.location.address}
                          </p>
                        </div>
                        
                        <div className="flex space-x-1 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : mapView === 'suppliers' ? (
                <div className="space-y-4">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium">{supplier.name}</h3>
                            <Badge variant="secondary" className="capitalize">
                              {supplier.type}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><span className="font-medium">Rating:</span> ⭐ {supplier.rating}</p>
                              <p><span className="font-medium">Distance:</span> {supplier.distance} km</p>
                            </div>
                            <div>
                              <p><span className="font-medium">Delivery:</span> {supplier.deliveryTime}</p>
                              <p><span className="font-medium">Contact:</span> {supplier.contact}</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mt-2 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {supplier.location.address}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Delivery Tracking */
                <div className="space-y-4">
                  {[1, 2, 3].map((delivery) => (
                    <div key={delivery} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium">Delivery #{1000 + delivery}</h3>
                          <p className="text-sm text-gray-600">Seeds & Fertilizer Order</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-600">
                          {delivery === 1 ? 'Out for Delivery' : delivery === 2 ? 'In Transit' : 'Preparing'}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">From:</span> GreenSeeds Co., Kurla</p>
                        <p><span className="font-medium">To:</span> Green Valley Farm, Andheri</p>
                        <p><span className="font-medium">ETA:</span> {delivery === 1 ? '30 minutes' : delivery === 2 ? '2 hours' : 'Tomorrow'}</p>
                      </div>
                      
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${delivery === 1 ? 85 : delivery === 2 ? 60 : 25}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {delivery === 1 ? '85%' : delivery === 2 ? '60%' : '25%'}
                        </span>
                      </div>
                      
                      <Button variant="outline" size="sm" className="mt-3">
                        <Navigation className="w-3 h-3 mr-1" />
                        Track Live
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Location Details Sidebar */}
        <div>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Find Nearest Supplier
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Zap className="w-4 h-4 mr-2" />
                  Emergency Services
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Layers className="w-4 h-4 mr-2" />
                  Satellite View
                </Button>
              </div>
              
              <hr className="border-gray-200" />
              
              <div>
                <h4 className="font-medium mb-2">Current Weather</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>🌤️ Partly Cloudy</p>
                  <p>🌡️ 24°C</p>
                  <p>💧 65% Humidity</p>
                  <p>💨 12 km/h Wind</p>
                </div>
              </div>
              
              <hr className="border-gray-200" />
              
              <div>
                <h4 className="font-medium mb-2">Nearby Services</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>🏥 Veterinary: 2.5 km</p>
                  <p>🔧 Repair Shop: 1.8 km</p>
                  <p>🚛 Transport Hub: 4.2 km</p>
                  <p>💧 Water Supply: 0.9 km</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Selected Farm Details */}
          {selectedFarm && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mt-4">
              <CardHeader>
                <CardTitle className="text-base">Farm Details</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const farm = farms.find(f => f.id === selectedFarm);
                  if (!farm) return null;
                  
                  return (
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">{farm.name}</h4>
                        <p className="text-sm text-gray-600">{farm.owner}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-gray-600">Area</p>
                          <p className="font-medium">{farm.area} acres</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-gray-600">Crop</p>
                          <p className="font-medium">{farm.cropType}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-gray-600">Moisture</p>
                          <p className="font-medium">{farm.soilMoisture}%</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-gray-600">Sensors</p>
                          <p className="font-medium">{farm.sensors}</p>
                        </div>
                      </div>
                      
                      <Button className="w-full" size="sm">
                        <Navigation className="w-3 h-3 mr-1" />
                        Navigate to Farm
                      </Button>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}