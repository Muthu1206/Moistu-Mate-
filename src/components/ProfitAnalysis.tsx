import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { useLanguage } from '../App';
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  // BarChart3,
  PieChart,
  Calendar,
  Download,
  FileText,
  Target,
  Leaf,
  Package,
  Users,
  Activity
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

interface ProfitData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  crops: {
    tomatoes: number;
    herbs: number;
    vegetables: number;
  };
}

interface CropPerformance {
  crop: string;
  planted: number;
  harvested: number;
  revenue: number;
  cost: number;
  profit: number;
  yield: number; // kg per plant
  roi: number; // return on investment %
}

export function ProfitAnalysis() {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('profit');

  // Mock profit data for the last 12 months
  const profitData: ProfitData[] = [
    { month: 'Jan', revenue: 45000, expenses: 28000, profit: 17000, crops: { tomatoes: 15000, herbs: 12000, vegetables: 18000 } },
    { month: 'Feb', revenue: 52000, expenses: 31000, profit: 21000, crops: { tomatoes: 18000, herbs: 14000, vegetables: 20000 } },
    { month: 'Mar', revenue: 48000, expenses: 29000, profit: 19000, crops: { tomatoes: 16000, herbs: 13000, vegetables: 19000 } },
    { month: 'Apr', revenue: 58000, expenses: 35000, profit: 23000, crops: { tomatoes: 20000, herbs: 16000, vegetables: 22000 } },
    { month: 'May', revenue: 62000, expenses: 38000, profit: 24000, crops: { tomatoes: 22000, herbs: 18000, vegetables: 22000 } },
    { month: 'Jun', revenue: 55000, expenses: 33000, profit: 22000, crops: { tomatoes: 19000, herbs: 15000, vegetables: 21000 } },
    { month: 'Jul', revenue: 67000, expenses: 40000, profit: 27000, crops: { tomatoes: 25000, herbs: 20000, vegetables: 22000 } },
    { month: 'Aug', revenue: 71000, expenses: 42000, profit: 29000, crops: { tomatoes: 28000, herbs: 21000, vegetables: 22000 } },
    { month: 'Sep', revenue: 64000, expenses: 38000, profit: 26000, crops: { tomatoes: 24000, herbs: 18000, vegetables: 22000 } },
    { month: 'Oct', revenue: 59000, expenses: 35000, profit: 24000, crops: { tomatoes: 21000, herbs: 16000, vegetables: 22000 } },
    { month: 'Nov', revenue: 72000, expenses: 43000, profit: 29000, crops: { tomatoes: 28000, herbs: 22000, vegetables: 22000 } },
    { month: 'Dec', revenue: 68000, expenses: 41000, profit: 27000, crops: { tomatoes: 26000, herbs: 20000, vegetables: 22000 } }
  ];

  const cropPerformance: CropPerformance[] = [
    {
      crop: 'Tomatoes',
      planted: 500,
      harvested: 480,
      revenue: 240000,
      cost: 120000,
      profit: 120000,
      yield: 2.8,
      roi: 100
    },
    {
      crop: 'Basil',
      planted: 300,
      harvested: 290,
      revenue: 145000,
      cost: 60000,
      profit: 85000,
      roi: 142
    },
    {
      crop: 'Lettuce',
      planted: 400,
      harvested: 385,
      revenue: 96250,
      cost: 40000,
      profit: 56250,
      roi: 141
    },
    {
      crop: 'Peppers',
      planted: 200,
      harvested: 195,
      revenue: 117000,
      cost: 55000,
      profit: 62000,
      roi: 113
    }
  ];

  // Calculate summary metrics
  const totalRevenue = profitData.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = profitData.reduce((sum, month) => sum + month.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const avgMonthlyProfit = totalProfit / profitData.length;
  const profitMargin = (totalProfit / totalRevenue) * 100;

  // Calculate growth rate (comparing last 6 months to previous 6 months)
  const recentProfit = profitData.slice(-6).reduce((sum, month) => sum + month.profit, 0);
  const previousProfit = profitData.slice(0, 6).reduce((sum, month) => sum + month.profit, 0);
  const growthRate = ((recentProfit - previousProfit) / previousProfit) * 100;

  // Pie chart data for crop distribution
  const cropDistribution = [
    { name: 'Tomatoes', value: cropPerformance[0].revenue, color: '#ef4444' },
    { name: 'Basil', value: cropPerformance[1].revenue, color: '#22c55e' },
    { name: 'Lettuce', value: cropPerformance[2].revenue, color: '#3b82f6' },
    { name: 'Peppers', value: cropPerformance[3].revenue, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              {t('profitAnalysis')} & Financial Dashboard
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <Calendar className="w-4 h-4 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="12months">12 Months</SelectItem>
                  <SelectItem value="2years">2 Years</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <IndianRupee className="w-5 h-5 text-green-600 mr-1" />
                <span className="text-sm text-gray-600">Total Revenue</span>
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-medium">₹{(totalRevenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500 mt-1">
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <IndianRupee className="w-5 h-5 text-blue-600 mr-1" />
                <span className="text-sm text-gray-600">Total Profit</span>
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-medium">₹{(totalProfit / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500 mt-1">
              +{growthRate.toFixed(1)}% growth
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-purple-600 mr-1" />
                <span className="text-sm text-gray-600">Profit Margin</span>
              </div>
              <Badge className="bg-green-100 text-green-600">Good</Badge>
            </div>
            <p className="text-2xl font-medium">{profitMargin.toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-1">
              Industry avg: 35%
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-orange-600 mr-1" />
                <span className="text-sm text-gray-600">Avg Monthly</span>
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-medium">₹{(avgMonthlyProfit / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500 mt-1">
              Profit per month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Trend */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Profit Trend Analysis
              </div>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profit">Profit</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`₹${(value / 1000).toFixed(0)}K`, selectedMetric]} />
                  <Area 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Crop Revenue Distribution */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-green-600" />
              Crop Revenue Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPieChart data={cropDistribution} cx="50%" cy="50%" outerRadius={80}>
                    {cropDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <Tooltip formatter={(value: any) => [`₹${(value / 1000).toFixed(0)}K`]} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {cropDistribution.map((crop, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: crop.color }}
                  ></div>
                  <span>{crop.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crop Performance Table */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-green-600" />
            Crop Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-medium">Crop</th>
                  <th className="text-left p-3 font-medium">Planted</th>
                  <th className="text-left p-3 font-medium">Harvested</th>
                  <th className="text-left p-3 font-medium">Revenue</th>
                  <th className="text-left p-3 font-medium">Cost</th>
                  <th className="text-left p-3 font-medium">Profit</th>
                  <th className="text-left p-3 font-medium">ROI</th>
                </tr>
              </thead>
              <tbody>
                {cropPerformance.map((crop, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Leaf className="w-4 h-4 text-green-500" />
                        <span className="font-medium">{crop.crop}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{crop.planted}</td>
                    <td className="p-3 text-gray-600">
                      {crop.harvested}
                      <span className="text-xs text-gray-500 ml-1">
                        ({((crop.harvested / crop.planted) * 100).toFixed(1)}%)
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <IndianRupee className="w-3 h-3 text-green-600" />
                        <span>{(crop.revenue / 1000).toFixed(0)}K</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <IndianRupee className="w-3 h-3 text-red-600" />
                        <span>{(crop.cost / 1000).toFixed(0)}K</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <IndianRupee className="w-3 h-3 text-blue-600" />
                        <span className="font-medium">{(crop.profit / 1000).toFixed(0)}K</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={crop.roi > 120 ? 'bg-green-100 text-green-600' : 
                                     crop.roi > 100 ? 'bg-yellow-100 text-yellow-600' : 
                                     'bg-red-100 text-red-600'}>
                        {crop.roi}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown Chart */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
            Monthly Revenue vs Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`₹${(value / 1000).toFixed(0)}K`]} />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Financial Goals & Targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Financial Goals (2024)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Annual Revenue Target</span>
                <span>₹750K / ₹800K</span>
              </div>
              <Progress value={93.75} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">93.8% achieved</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Profit Margin Target</span>
                <span>40.0% / 45.0%</span>
              </div>
              <Progress value={88.9} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">88.9% achieved</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cost Reduction Target</span>
                <span>15% / 20%</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">75% achieved</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Financial Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center mb-1">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-800">Best Performer</span>
              </div>
              <p className="text-xs text-green-700">
                Basil shows highest ROI at 142%. Consider expanding cultivation.
              </p>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center mb-1">
                <Activity className="w-4 h-4 text-yellow-600 mr-1" />
                <span className="text-sm font-medium text-yellow-800">Opportunity</span>
              </div>
              <p className="text-xs text-yellow-700">
                Reduce fertilizer costs by 8% to improve overall profit margin.
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-1">
                <Target className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-sm font-medium text-blue-800">Recommendation</span>
              </div>
              <p className="text-xs text-blue-700">
                Focus on premium varieties to increase average selling price.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}