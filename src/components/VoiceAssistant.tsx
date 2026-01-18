import React, { useState, useRef, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { useLanguage } from '../App';
import { 
  Mic, 
  MicOff, 
  Send, 
  MessageSquare, 
  Bot,
  User,
  Volume2,
  VolumeX
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'command' | 'recommendation';
}

export function VoiceAssistant() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm your plant care assistant. I can help you with watering schedules, plant identification, disease diagnosis, and farming recommendations. How can I help you today?`,
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock plant care knowledge base
  const plantResponses = {
    watering: [
      "Most plants need watering when the top inch of soil feels dry. For your current plants, I recommend checking the moisture levels in your sensor dashboard.",
      "Based on your sensor data, your tomato plants need watering. The soil moisture is below 40%.",
      "Different plants have different watering needs. Succulents need less water, while tropical plants need more consistent moisture."
    ],
    diseases: [
      "Common plant diseases include fungal infections, bacterial spots, and viral diseases. Can you describe the symptoms you're seeing?",
      "Yellow leaves can indicate overwatering, nutrient deficiency, or disease. Check your soil drainage and nutrition levels.",
      "For pest control, I recommend using integrated pest management: beneficial insects, organic sprays, and proper plant spacing."
    ],
    fertilizer: [
      "Most plants benefit from balanced fertilizer (10-10-10) during growing season. Check your soil pH first - it should be between 6.0-7.0.",
      "Organic compost is excellent for soil health. Apply 2-3 inches around plants, keeping it away from stems.",
      "Signs of nutrient deficiency: yellowing leaves (nitrogen), purple leaves (phosphorus), brown edges (potassium)."
    ],
    planting: [
      "Best planting time depends on your location and plant type. Most vegetables are planted after the last frost date.",
      "Prepare soil by adding compost and ensuring good drainage. Test soil pH and adjust if needed.",
      "Space plants according to their mature size to prevent overcrowding and disease."
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock voice recognition
  const startListening = () => {
    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      const voiceCommands = [
        "How often should I water my tomato plants?",
        "Check soil moisture levels",
        "What's wrong with my plant leaves turning yellow?",
        "When should I fertilize my garden?",
        "Show me plant disease detection results"
      ];
      
      const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
      setInputText(randomCommand);
      setIsListening(false);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const getPlantAdvice = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
      return plantResponses.watering[Math.floor(Math.random() * plantResponses.watering.length)];
    } else if (lowerMessage.includes('disease') || lowerMessage.includes('sick') || lowerMessage.includes('yellow') || lowerMessage.includes('pest')) {
      return plantResponses.diseases[Math.floor(Math.random() * plantResponses.diseases.length)];
    } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrition') || lowerMessage.includes('compost')) {
      return plantResponses.fertilizer[Math.floor(Math.random() * plantResponses.fertilizer.length)];
    } else if (lowerMessage.includes('plant') || lowerMessage.includes('grow') || lowerMessage.includes('seed')) {
      return plantResponses.planting[Math.floor(Math.random() * plantResponses.planting.length)];
    } else if (lowerMessage.includes('sensor') || lowerMessage.includes('moisture') || lowerMessage.includes('humidity')) {
      return "I can see your current sensor readings. Your soil moisture is at 45%, humidity is 65%, and temperature is 24°C. Your tomato plant in Garden A1 needs attention.";
    } else if (lowerMessage.includes('weather')) {
      return "Today's weather forecast shows 25°C with 60% chance of rain this afternoon. Good time for outdoor planting! I'll send you an alert if conditions change.";
    } else {
      return "I'm here to help with plant care, farming advice, sensor monitoring, and agricultural recommendations. You can ask me about watering, diseases, fertilizers, or check your plant status!";
    }
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getPlantAdvice(inputText),
        sender: 'assistant',
        timestamp: new Date(),
        type: 'recommendation'
      };

      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);

      // Text-to-speech for assistant responses
      if (speechEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(assistantResponse.text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const quickCommands = [
    "Check plant health",
    "Water schedule",
    "Disease diagnosis",
    "Fertilizer recommendations",
    "Weather update",
    "Sensor status"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2 text-green-600" />
              {t('voiceAssistant')}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className="p-2"
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <Card className="h-96">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'assistant' && (
                          <Bot className="w-4 h-4 mt-1 text-green-600" />
                        )}
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 mt-1 text-white" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                          {message.type === 'recommendation' && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              AI Recommendation
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-green-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>
          </Card>

          {/* Quick Commands */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Quick Commands:</p>
            <div className="flex flex-wrap gap-2">
              {quickCommands.map((command, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText(command)}
                  className="text-xs"
                >
                  {command}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or use voice command..."
              className="flex-1"
              disabled={isListening}
            />
            
            <Button
              onClick={isListening ? stopListening : startListening}
              variant={isListening ? "destructive" : "outline"}
              className={`p-2 ${isListening ? 'animate-pulse' : ''}`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            
            <Button onClick={sendMessage} className="p-2">
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {isListening && (
            <div className="text-center">
              <Badge variant="secondary" className="animate-pulse">
                Listening... Speak now
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}