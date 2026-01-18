import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from '../App';
import { 
  Leaf, 
  MapPin, 
  Calendar, 
  Droplets, 
  Sun, 
  Thermometer,
  Star,
  Clock,
  TrendingUp,
  Award,
  Zap,
  Shield
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Plant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  season: string;
  wateringFrequency: string;
  sunRequirement: string;
  growthTime: string;
  benefits: string[];
  spacing: string;
  soilType: string;
  description: string;
  rating: number;
  popularity: string;
}

export function PlantRecommendations() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [season, setSeason] = useState('all');

  const recommendedPlants: Plant[] = [
    {
      id: '1',
      name: 'Tomato',
      scientificName: 'Solanum lycopersicum',
      image: 'https://images.unsplash.com/photo-1592841200221-76dc79c5e4b6?w=300&h=200&fit=crop',
      difficulty: 'medium',
      season: 'Summer',
      wateringFrequency: 'Daily',
      sunRequirement: 'Full Sun (6-8 hrs)',
      growthTime: '60-85 days',
      benefits: ['High Vitamin C', 'Antioxidants', 'Versatile cooking'],
      spacing: '18-24 inches',
      soilType: 'Well-draining, pH 6.0-6.8',
      description: 'Perfect for beginners, high yield, disease-resistant varieties available',
      rating: 4.8,
      popularity: 'Very Popular'
    },
    {
      id: '2',
      name: 'Basil',
      scientificName: 'Ocimum basilicum',
      image: 'https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=300&h=200&fit=crop',
      difficulty: 'easy',
      season: 'Spring-Fall',
      wateringFrequency: 'Every 2-3 days',
      sunRequirement: 'Partial Sun (4-6 hrs)',
      growthTime: '30-45 days',
      benefits: ['Culinary herb', 'Natural pest deterrent', 'Aromatic'],
      spacing: '6-12 inches',
      soilType: 'Well-draining, pH 6.0-7.0',
      description: 'Easy to grow, perfect for containers, harvest leaves continuously',
      rating: 4.9,
      popularity: 'Very Popular'
    },
    {
      id: '3',
      name: 'Lettuce',
      scientificName: 'Lactuca sativa',
      image: 'https://images.unsplash.com/photo-1556800060-dc3e894bb64b?w=300&h=200&fit=crop',
      difficulty: 'easy',
      season: 'Spring-Fall',
      wateringFrequency: 'Daily',
      sunRequirement: 'Partial Sun (4-6 hrs)',
      growthTime: '30-60 days',
      benefits: ['Fast growing', 'Continuous harvest', 'Low calorie'],
      spacing: '4-6 inches',
      soilType: 'Rich, well-draining, pH 6.0-7.0',
      description: 'Quick growing, perfect for salads, can be grown year-round in containers',
      rating: 4.6,
      popularity: 'Popular'
    },
    {
      id: '4',
      name: 'Mint',
      scientificName: 'Mentha',
      image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300&h=200&fit=crop',
      difficulty: 'easy',
      season: 'Spring-Fall',
      wateringFrequency: 'Every 2 days',
      sunRequirement: 'Partial Shade (2-4 hrs)',
      growthTime: '30-40 days',
      benefits: ['Medicinal properties', 'Natural pest repellent', 'Aromatic'],
      spacing: '12-18 inches',
      soilType: 'Moist, well-draining, pH 6.0-7.0',
      description: 'Very hardy, spreads quickly, excellent for beginners',
      rating: 4.7,
      popularity: 'Popular'
    },
    {
      id: '5',
      name: 'Spinach',
      scientificName: 'Spinacia oleracea',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop',
      difficulty: 'easy',
      season: 'Spring-Fall',
      wateringFrequency: 'Every 2-3 days',
      sunRequirement: 'Partial Sun (4-6 hrs)',
      growthTime: '40-50 days',
      benefits: ['High iron content', 'Fast growing', 'Cold tolerant'],
      spacing: '3-6 inches',
      soilType: 'Rich, well-draining, pH 6.0-7.0',
      description: 'Nutrient-dense, cool weather crop, perfect for continuous harvesting',
      rating: 4.5,
      popularity: 'Popular'
    },
    {
      id: '6',
      name: 'Chili Pepper',
      scientificName: 'Capsicum annuum',
      image: 'https://images.unsplash.com/photo-1583468374351-2a7ca0ba3de7?w=300&h=200&fit=crop',
      difficulty: 'medium',
      season: 'Summer',
      wateringFrequency: 'Every 2-3 days',
      sunRequirement: 'Full Sun (6-8 hrs)',
      growthTime: '70-90 days',
      benefits: ['Long shelf life', 'High vitamin content', 'Natural preservative'],
      spacing: '12-18 inches',
      soilType: 'Well-draining, pH 6.0-6.8',
      description: 'Heat-loving plant, produces abundant fruit, many varieties available',
      rating: 4.4,
      popularity: 'Popular'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'hard': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Leaf className="w-3 h-3" />;
      case 'medium': return <TrendingUp className="w-3 h-3" />;
      case 'hard': return <Award className="w-3 h-3" />;
      default: return <Leaf className="w-3 h-3" />;
    }
  };

  const filteredPlants = recommendedPlants.filter(plant => {
    if (filter === 'easy' && plant.difficulty !== 'easy') return false;
    if (filter === 'popular' && plant.popularity !== 'Very Popular') return false;
    if (season !== 'all' && !plant.season.toLowerCase().includes(season.toLowerCase())) return false;
    return true;
  });

  const seasonalTips = {
    spring: [
      'Start seedlings indoors 6-8 weeks before last frost',
      'Prepare soil with compost and organic matter',
      'Begin hardening off transplants'
    ],
    summer: [
      'Ensure consistent watering during hot weather',
      'Provide shade for cool-season crops',
      'Watch for pest activity and diseases'
    ],
    fall: [
      'Plant cool-season crops for winter harvest',
      'Begin saving seeds from mature plants',
      'Prepare garden beds for winter'
    ],
    winter: [
      'Focus on indoor growing and seed starting',
      'Plan next year\'s garden layout',
      'Maintain cold frames and greenhouses'
    ]
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-green-600" />
              {t('plantRecommendations')}
            </div>
            <div className="flex items-center space-x-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plants</SelectItem>
                  <SelectItem value="easy">Easy to Grow</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => (
              <Card key={plant.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 flex items-center space-x-1">
                      <Badge className={getDifficultyColor(plant.difficulty)}>
                        {getDifficultyIcon(plant.difficulty)}
                        <span className="ml-1 capitalize">{plant.difficulty}</span>
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <div className="flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{plant.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-medium">{plant.name}</h3>
                      <p className="text-sm text-gray-600 italic">{plant.scientificName}</p>
                      <p className="text-sm text-gray-600 mt-1">{plant.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-blue-500" />
                        <span>{plant.season}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-green-500" />
                        <span>{plant.growthTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span>{plant.wateringFrequency}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Sun className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs">{plant.sunRequirement.split(' ')[0]} {plant.sunRequirement.split(' ')[1]}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Benefits:</h4>
                      <div className="flex flex-wrap gap-1">
                        {plant.benefits.slice(0, 2).map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {plant.benefits.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{plant.benefits.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Spacing:</span> {plant.spacing}
                      </div>
                      <div>
                        <span className="font-medium">Soil:</span> pH {plant.soilType.split('pH ')[1]}
                      </div>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      Add to Garden Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Gardening Tips */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Seasonal Gardening Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(seasonalTips).map(([season, tips]) => (
              <div key={season} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3 capitalize flex items-center">
                  {season === 'spring' && <Leaf className="w-4 h-4 mr-1 text-green-500" />}
                  {season === 'summer' && <Sun className="w-4 h-4 mr-1 text-yellow-500" />}
                  {season === 'fall' && <Leaf className="w-4 h-4 mr-1 text-orange-500" />}
                  {season === 'winter' && <Thermometer className="w-4 h-4 mr-1 text-blue-500" />}
                  {season}
                </h4>
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Plant Care Guide */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            Quick Plant Care Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center">
                <Droplets className="w-4 h-4 mr-2 text-blue-500" />
                Watering Guidelines
              </h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Check soil moisture with finger test</li>
                <li>• Water deeply but less frequently</li>
                <li>• Water early morning or evening</li>
                <li>• Avoid watering leaves directly</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium flex items-center">
                <Sun className="w-4 h-4 mr-2 text-yellow-500" />
                Light Requirements
              </h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Full Sun: 6-8 hours direct sunlight</li>
                <li>• Partial Sun: 4-6 hours direct sunlight</li>
                <li>• Partial Shade: 2-4 hours direct sunlight</li>
                <li>• Full Shade: Less than 2 hours</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium flex items-center">
                <Zap className="w-4 h-4 mr-2 text-green-500" />
                Fertilizing Tips
              </h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Feed during growing season</li>
                <li>• Use balanced fertilizer (10-10-10)</li>
                <li>• Organic compost improves soil</li>
                <li>• Don't over-fertilize flowering plants</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}