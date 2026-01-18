import React, { useState, useRef } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from '../App';
import { 
  Camera, 
  Upload, 
  Scan, 
  Leaf, 
  Bug, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Zap,
  Shield,
  Target
} from "lucide-react";
import { unsplash_tool } from './ui/unsplash-tool';

interface ScanResult {
  id: string;
  plantName: string;
  confidence: number;
  health: string;
  diseases: string[];
  recommendations: string[];
  pestDetection: string[];
  image: string;
  timestamp: Date;
}

export function PlantScanner() {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([
    {
      id: '1',
      plantName: 'Tomato Plant (Solanum lycopersicum)',
      confidence: 94,
      health: 'not good',
      diseases: [],
      recommendations: ['Regular watering', 'Provide support stakes', 'Monitor for pests'],
      pestDetection: [],
      image: 'https://images.unsplash.com/photo-1592841200221-76dc79c5e4b6?w=300&h=200&fit=crop',
      timestamp: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      plantName: 'Rose Bush (Rosa species)',
      confidence: 87,
      health: 'needsAttention',
      diseases: ['Early Powdery Mildew'],
      recommendations: ['Improve air circulation', 'Apply fungicide treatment', 'Remove affected leaves'],
      pestDetection: ['Aphids detected on lower leaves'],
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
      timestamp: new Date('2024-01-14T15:45:00')
    },
    {
      id: '3',
      plantName: 'Basil (Ocimum basilicum)',
      confidence: 91,
      health: 'critical',
      diseases: ['Bacterial Leaf Spot', 'Root Rot'],
      recommendations: ['Reduce watering frequency', 'Improve drainage', 'Remove infected plants', 'Apply copper-based fungicide'],
      pestDetection: ['Whitefly presence detected'],
      image: 'https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=300&h=200&fit=crop',
      timestamp: new Date('2024-01-13T09:15:00')
    }
  ]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);

    // Simulate AI processing
    setTimeout(async () => {
      // Generate mock scan result
      const plantTypes = [
        'Lettuce (Lactuca sativa)',
        'Carrot (Daucus carota)',
        'Spinach (Spinacia oleracea)',
        'Cucumber (Cucumis sativus)',
        'Pepper (Capsicum annuum)'
      ];
      
      const healthStates = ['not good', 'needsAttention', 'critical'];
      const diseases = [
        'Leaf Spot', 'Powdery Mildew', 'Root Rot', 'Bacterial Blight', 
        'Downy Mildew', 'Fusarium Wilt', 'Mosaic Virus'
      ];
      
      const pests = [
        'Aphids', 'Spider Mites', 'Whiteflies', 'Thrips', 'Scale Insects', 'Caterpillars'
      ];

      const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];
      const randomHealth = healthStates[Math.floor(Math.random() * healthStates.length)];
      const randomConfidence = 85 + Math.random() * 15;
      
      const detectedDiseases = randomHealth === 'healthy' ? [] : 
        diseases.slice(0, Math.floor(Math.random() * 2) + 1);
      
      const detectedPests = randomHealth === 'critical' ? 
        pests.slice(0, Math.floor(Math.random() * 2) + 1) : [];

      const newResult: ScanResult = {
        id: Date.now().toString(),
        plantName: randomPlant,
        confidence: randomConfidence,
        health: randomHealth,
        diseases: detectedDiseases,
        recommendations: generateRecommendations(randomHealth, detectedDiseases, detectedPests),
        pestDetection: detectedPests,
        image: URL.createObjectURL(file),
        timestamp: new Date()
      };

      setScanResults(prev => [newResult, ...prev]);
      setIsScanning(false);
    }, 3000);
  };

  const generateRecommendations = (health: string, diseases: string[], pests: string[]) => {
    const recommendations = [];
    
    if (health === 'not good') {
      recommendations.push('Continue current care routine', 'Monitor regularly for changes', 'Ensure proper watering schedule');
    } else if (health === 'needsAttention') {
      recommendations.push('Increase monitoring frequency', 'Check soil drainage', 'Adjust watering if needed');
    } else {
      recommendations.push('Immediate intervention required', 'Isolate plant if possible', 'Consult agricultural expert');
    }
    
    if (diseases.length > 0) {
      recommendations.push('Apply appropriate fungicide', 'Remove affected plant parts', 'Improve air circulation');
    }
    
    if (pests.length > 0) {
      recommendations.push('Apply pest control measures', 'Use beneficial insects', 'Check surrounding plants');
    }
    
    return recommendations;
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'not good': return 'text-green-600 bg-green-100';
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
      default: return <Leaf className="w-4 h-4" />;
    }
  };

  const commonDiseases = [
    { name: 'Powdery Mildew', symptoms: 'White powdery coating on leaves', treatment: 'Fungicide spray, improve air circulation' },
    { name: 'Leaf Spot', symptoms: 'Brown or black spots on leaves', treatment: 'Remove affected leaves, apply copper fungicide' },
    { name: 'Root Rot', symptoms: 'Yellowing leaves, wilting, soft roots', treatment: 'Improve drainage, reduce watering' },
    { name: 'Bacterial Blight', symptoms: 'Water-soaked spots, yellowing', treatment: 'Copper-based bactericide, remove infected parts' }
  ];

  const commonPests = [
    { name: 'Aphids', signs: 'Small green/black insects on leaves', control: 'Insecticidal soap, ladybugs, neem oil' },
    { name: 'Spider Mites', signs: 'Fine webbing, yellow stippling', control: 'Predatory mites, increase humidity' },
    { name: 'Whiteflies', signs: 'Small white flying insects', control: 'Yellow sticky traps, beneficial wasps' },
    { name: 'Thrips', signs: 'Silver streaks on leaves', control: 'Blue sticky traps, predatory mites' }
  ];

  return (
    <div className="space-y-6">
      {/* Scanner Interface */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2 text-green-600" />
            {t('plantScanner')} & {t('pesticideDetection')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            {isScanning ? (
              <div className="space-y-4">
                <div className="animate-spin mx-auto">
                  <Scan className="w-12 h-12 text-green-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg">Analyzing Plant Image...</p>
                  <p className="text-sm text-gray-600">AI is identifying plant species and detecting diseases</p>
                  <Progress value={65} className="w-64 mx-auto" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <Camera className="w-12 h-12 text-gray-400" />
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">Upload Plant Image</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload a clear photo of your plant for AI-powered analysis
                  </p>
                  <Button onClick={triggerFileInput} className="bg-green-600 hover:bg-green-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium">Plant Identification</h4>
              <p className="text-sm text-gray-600">AI identifies plant species with 95%+ accuracy</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <Bug className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h4 className="font-medium">Disease Detection</h4>
              <p className="text-sm text-gray-600">Detects common plant diseases and deficiencies</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">Treatment Recommendations</h4>
              <p className="text-sm text-gray-600">Provides specific treatment and care advice</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="results" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Scan Results</TabsTrigger>
          <TabsTrigger value="diseases">Disease Guide</TabsTrigger>
          <TabsTrigger value="pests">Pest Control</TabsTrigger>
        </TabsList>

        {/* Scan Results */}
        <TabsContent value="results" className="space-y-4">
          {scanResults.map((result) => (
            <Card key={result.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Plant Image */}
                  <div className="space-y-4">
                    <img 
                      src={result.image} 
                      alt={result.plantName}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="text-center">
                      <Badge className="bg-blue-100 text-blue-600">
                        Confidence: {result.confidence.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>

                  {/* Plant Information */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{result.plantName}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        {getHealthIcon(result.health)}
                        <Badge className={getHealthColor(result.health)}>
                          {t(result.health)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Scanned: {result.timestamp.toLocaleDateString()} {result.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {result.diseases.length > 0 && (
                      <div>
                        <h4 className="font-medium text-red-600 mb-2 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Detected Diseases
                        </h4>
                        <ul className="space-y-1">
                          {result.diseases.map((disease, index) => (
                            <li key={index} className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                              {disease}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.pestDetection.length > 0 && (
                      <div>
                        <h4 className="font-medium text-orange-600 mb-2 flex items-center">
                          <Bug className="w-4 h-4 mr-1" />
                          Pest Detection
                        </h4>
                        <ul className="space-y-1">
                          {result.pestDetection.map((pest, index) => (
                            <li key={index} className="text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded">
                              {pest}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium text-green-600 mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm bg-green-50 p-2 rounded border-l-4 border-green-500">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Disease Guide */}
        <TabsContent value="diseases" className="space-y-4">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Common Plant Diseases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonDiseases.map((disease, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-red-600 mb-2">{disease.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Symptoms: </span>
                        <span className="text-gray-600">{disease.symptoms}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Treatment: </span>
                        <span className="text-gray-600">{disease.treatment}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pest Control */}
        <TabsContent value="pests" className="space-y-4">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bug className="w-5 h-5 mr-2 text-orange-600" />
                Pest Identification & Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonPests.map((pest, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-orange-600 mb-2">{pest.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Signs: </span>
                        <span className="text-gray-600">{pest.signs}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Control: </span>
                        <span className="text-gray-600">{pest.control}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}