import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage, useUser } from '../App';
import { 
  Leaf, 
  Bell, 
  Users, 
  ShoppingCart, 
  CloudRain, 
  BarChart3,
  Camera,
  Droplets,
  Navigation,
  Phone,
  Mail,
  MapPin,
  Award,
  Shield,
  Zap
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();
  const { user, logout } = useUser();

  const benefits = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t('realTimeMonitoring'),
      description: "Monitor soil moisture, humidity, and plant health in real-time"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: t('smartAlerts'),
      description: "Receive intelligent alerts for watering, fertilizing, and care"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('expertRecommendations'),
      description: "Get expert advice and plant care recommendations"
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: t('ecommercePlatform'),
      description: "Buy and sell plants, seeds, and gardening supplies"
    },
    {
      icon: <CloudRain className="w-6 h-6" />,
      title: t('weatherIntegration'),
      description: "Weather-based recommendations and automated care"
    }
  ];

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: t('plantScanner'),
      description: "AI-powered plant identification and health assessment"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: t('moistureLevel'),
      description: "Real-time soil moisture monitoring with smart sensors"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('pesticideDetection'),
      description: "Detect and get recommendations for pest management"
    },
    {
      icon: <Navigation className="w-8 h-8" />,
      title: t('mapIntegration'),
      description: "Track your garden locations and manage multiple plots"
    }
  ];

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
                <p className="text-sm text-gray-600">{t('appName')}</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button className="text-gray-700 hover:text-green-600 transition-colors">
                {t('home')}
              </button>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {t('dashboard')}
              </button>
              <button className="text-gray-700 hover:text-green-600 transition-colors">
                {t('about')}
              </button>
              <button className="text-gray-700 hover:text-green-600 transition-colors">
                {t('contact')}
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t('plantMonitoring')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Advanced IoT sensors, AI-powered plant care, and comprehensive farming solutions all in one platform
          </p>
          <Button 
            onClick={() => onNavigate('dashboard')}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 text-lg"
          >
            {t('dashboard')}
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl text-center mb-12 text-gray-800">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <div className="text-green-600">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl text-center mb-12 text-gray-800">
            {t('appBenefits')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h4 className="text-xl mb-3 text-gray-800">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl text-green-600 mb-2">50K+</div>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="p-6">
            <div className="text-3xl text-blue-600 mb-2">1M+</div>
            <p className="text-gray-600">Plants Monitored</p>
          </div>
          <div className="p-6">
            <div className="text-3xl text-green-600 mb-2">95%</div>
            <p className="text-gray-600">Success Rate</p>
          </div>
          <div className="p-6">
            <div className="text-3xl text-blue-600 mb-2">24/7</div>
            <p className="text-gray-600">Monitoring</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl mb-8 text-gray-800">{t('about')}</h3>
            <p className="text-lg text-gray-600 mb-8">
              MOISTUE-MATE is a revolutionary agricultural technology platform that combines IoT sensors, 
              artificial intelligence, and e-commerce to provide comprehensive plant care solutions. 
              Our platform helps farmers, gardeners, and plant enthusiasts monitor their crops in real-time, 
              make data-driven decisions, and connect with a community of agricultural experts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl mb-2">Award Winning</h4>
                <p className="text-gray-600">Recognized for innovation in agricultural technology</p>
              </div>
              <div className="p-6">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl mb-2">Secure & Reliable</h4>
                <p className="text-gray-600">Enterprise-grade security and 99.9% uptime</p>
              </div>
              <div className="p-6">
                <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl mb-2">Fast & Efficient</h4>
                <p className="text-gray-600">Real-time data processing and instant alerts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl mb-8 text-gray-800">{t('contact')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg mb-2">Phone</h4>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg mb-2">Email</h4>
              <p className="text-gray-600">support@moistue-mate.com</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg mb-2">Address</h4>
              <p className="text-gray-600">Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-full mr-3">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg">{t('logoName')} - {t('appName')}</span>
          </div>
          <p className="text-gray-400">
            © 2024 MOISTUE-MATE. All rights reserved. Empowering sustainable agriculture through technology.
          </p>
        </div>
      </footer>
    </div>
  );
}