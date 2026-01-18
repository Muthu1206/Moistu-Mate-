import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Leaf, Globe } from "lucide-react";
import { useLanguage } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AuthPageProps {
  onLogin: (userData: any) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिंदी' },
    { code: 'bengali', name: 'বাংলা' },
    { code: 'telugu', name: 'తెలుగు' },
    { code: 'marathi', name: 'मराठी' },
    { code: 'tamil', name: 'தமிழ்' },
    { code: 'gujarati', name: 'ગુજરાતી' },
    { code: 'urdu', name: 'اردو' },
    { code: 'kannada', name: 'ಕನ್ನಡ' },
    { code: 'odia', name: 'ଓଡ଼ିଆ' },
    { code: 'malayalam', name: 'മലയാളം' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, validate against backend
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        alert('Please fill all fields');
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        alert('Please fill all fields');
        return;
      }
    }

    // Mock successful login
    onLogin({
      id: '1',
      name: formData.name || 'User',
      email: formData.email,
      phone: formData.phone
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-100 via-blue-50 to-emerald-100">
      <div className="w-full max-w-md">
        {/* Language Selector */}
        <div className="flex justify-center mb-6">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-48">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {t('logoName')}
            </CardTitle>
            <CardDescription className="text-lg">
              {t('appName')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div>
                    <Input
                      name="name"
                      type="text"
                      placeholder={t('name')}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder={t('phone')}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300"
                    />
                  </div>
                </>
              )}
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder={t('email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300"
                />
              </div>
              
              <div>
                <Input
                  name="password"
                  type="password"
                  placeholder={t('password')}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300"
                />
              </div>
              
              {isSignUp && (
                <div>
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder={t('confirmPassword')}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300"
                  />
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                {isSignUp ? t('signUp') : t('signIn')}
              </Button>
            </form>
            
            {!isSignUp && (
              <div className="text-center mt-4">
                <button className="text-sm text-blue-600 hover:underline">
                  {t('forgotPassword')}
                </button>
              </div>
            )}
            
            <div className="text-center mt-6">
              <span className="text-sm text-gray-600">
                {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
              </span>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-sm text-blue-600 hover:underline"
              >
                {isSignUp ? t('signIn') : t('signUp')}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}