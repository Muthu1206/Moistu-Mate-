import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from '../App';
import { 
  ShoppingCart, 
  Store, 
  IndianRupee, 
  Search, 
  Filter,
  Star,
  Heart,
  MapPin,
  Truck,
  CreditCard,
  Package,
  Users,
  TrendingUp,
  Plus
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: string;
  location: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  description: string;
  delivery: string;
}

export function EcommercePlatform() {
  const { t } = useLanguage();
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: '1',
      name: 'Tomato Seeds - Cherry Variety',
      price: 150,
      originalPrice: 200,
      image: 'https://images.unsplash.com/photo-1592841200221-76dc79c5e4b6?w=300&h=200&fit=crop',
      seller: 'Green Valley Seeds',
      location: 'Maharashtra, India',
      rating: 4.8,
      reviews: 124,
      category: 'seeds',
      inStock: true,
      description: 'High-quality cherry tomato seeds with excellent germination rate',
      delivery: '2-3 days'
    },
    {
      id: '2',
      name: 'Organic Fertilizer - NPK 10:10:10',
      price: 450,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      seller: 'BioFert Solutions',
      location: 'Punjab, India',
      rating: 4.6,
      reviews: 89,
      category: 'fertilizers',
      inStock: true,
      description: '5kg organic fertilizer perfect for all vegetables and fruits',
      delivery: '1-2 days'
    },
    {
      id: '3',
      name: 'Smart Irrigation Drip Kit',
      price: 2500,
      originalPrice: 3000,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      seller: 'AquaTech Systems',
      location: 'Karnataka, India',
      rating: 4.9,
      reviews: 67,
      category: 'tools',
      inStock: true,
      description: 'Complete drip irrigation system for small to medium gardens',
      delivery: '3-5 days'
    },
    {
      id: '4',
      name: 'Neem Oil Pesticide - Organic',
      price: 320,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      seller: 'Natural Pest Control',
      location: 'Tamil Nadu, India',
      rating: 4.7,
      reviews: 156,
      category: 'pesticides',
      inStock: true,
      description: '500ml pure neem oil for organic pest management',
      delivery: '2-4 days'
    },
    {
      id: '5',
      name: 'Basil Plant - Live',
      price: 80,
      image: 'https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=300&h=200&fit=crop',
      seller: 'Fresh Herbs Farm',
      location: 'Kerala, India',
      rating: 4.5,
      reviews: 203,
      category: 'plants',
      inStock: true,
      description: 'Healthy live basil plant ready for transplanting',
      delivery: '1-2 days'
    },
    {
      id: '6',
      name: 'Garden Tool Set - 5 Pieces',
      price: 850,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      seller: 'Garden Pro Tools',
      location: 'Haryana, India',
      rating: 4.4,
      reviews: 78,
      category: 'tools',
      inStock: false,
      description: 'Complete gardening tool set with spade, rake, and pruners',
      delivery: '5-7 days'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'plants', label: 'Live Plants' },
    { value: 'fertilizers', label: 'Fertilizers' },
    { value: 'pesticides', label: 'Pesticides' },
    { value: 'tools', label: 'Tools & Equipment' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(id => id !== productId));
  };

  const isInCart = (productId: string) => {
    return cart.includes(productId);
  };

  const sellerStats = {
    totalSales: 125000,
    activeListings: 24,
    customerRating: 4.7,
    totalOrders: 340
  };

  return (
    <div className="space-y-6">
      {/* User Type Toggle */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={userType === 'buyer' ? 'default' : 'outline'}
              onClick={() => setUserType('buyer')}
              className="flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t('buyer')}</span>
            </Button>
            <Button
              variant={userType === 'seller' ? 'default' : 'outline'}
              onClick={() => setUserType('seller')}
              className="flex items-center space-x-2"
            >
              <Store className="w-4 h-4" />
              <span>{t('seller')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {userType === 'buyer' ? (
        <Tabs defaultValue="browse" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Products</TabsTrigger>
            <TabsTrigger value="cart">
              Cart ({cart.length})
            </TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
          </TabsList>

          {/* Browse Products */}
          <TabsContent value="browse" className="space-y-4">
            {/* Search and Filter */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/90"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                          <Badge variant="secondary" className="bg-gray-800 text-white">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-600">{product.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            <span className="font-medium">{product.price}</span>
                          </div>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1 text-xs">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                          <span className="text-gray-500">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center space-x-1 mb-1">
                          <Store className="w-3 h-3" />
                          <span>{product.seller}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                          <MapPin className="w-3 h-3" />
                          <span>{product.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Truck className="w-3 h-3" />
                          <span>Delivery: {product.delivery}</span>
                        </div>
                      </div>
                      
                      <Button
                        className="w-full"
                        size="sm"
                        disabled={!product.inStock}
                        onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product.id)}
                      >
                        {!product.inStock ? 'Out of Stock' :
                         isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Shopping Cart */}
          <TabsContent value="cart" className="space-y-4">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shopping Cart ({cart.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(productId => {
                      const product = products.find(p => p.id === productId);
                      if (!product) return null;
                      
                      return (
                        <div key={productId} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.seller}</p>
                            <div className="flex items-center space-x-1">
                              <IndianRupee className="w-4 h-4 text-green-600" />
                              <span className="font-medium">{product.price}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(productId)}
                          >
                            Remove
                          </Button>
                        </div>
                      );
                    })}
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-medium">Total:</span>
                        <div className="flex items-center">
                          <IndianRupee className="w-5 h-5 text-green-600" />
                          <span className="text-xl font-medium">
                            {cart.reduce((total, productId) => {
                              const product = products.find(p => p.id === productId);
                              return total + (product?.price || 0);
                            }, 0)}
                          </span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-4">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Order #MOM{1000 + i}</span>
                        <Badge className="bg-green-100 text-green-600">Delivered</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Ordered on: {new Date(2024, 0, 15 - i).toLocaleDateString()}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{450 + i * 100}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        /* Seller Dashboard */
        <div className="space-y-6">
          {/* Seller Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <IndianRupee className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-medium">₹{sellerStats.totalSales.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Active Listings</p>
                <p className="text-2xl font-medium">{sellerStats.activeListings}</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-medium">{sellerStats.customerRating}</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-medium">{sellerStats.totalOrders}</p>
              </CardContent>
            </Card>
          </div>

          {/* Seller Actions */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Store className="w-5 h-5 mr-2" />
                  Seller Dashboard
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="products" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="products">My Products</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.slice(0, 3).map((product) => (
                      <Card key={product.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded mb-3"
                          />
                          <h4 className="font-medium mb-1">{product.name}</h4>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <IndianRupee className="w-4 h-4 text-green-600" />
                              <span className="font-medium">{product.price}</span>
                            </div>
                            <Badge className={product.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              Analytics
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Order #MOM{2000 + i}</p>
                            <p className="text-sm text-gray-600">
                              {products[i % products.length].name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(2024, 0, 20 - i).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <IndianRupee className="w-4 h-4 text-green-600" />
                              <span className="font-medium">{products[i % products.length].price}</span>
                            </div>
                            <Badge className="bg-blue-100 text-blue-600">
                              {i % 3 === 0 ? 'Processing' : i % 3 === 1 ? 'Shipped' : 'Delivered'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Sales Trend
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>This Month</span>
                            <span className="font-medium">₹25,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Last Month</span>
                            <span className="font-medium">₹22,000</span>
                          </div>
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Growth</span>
                            <span className="font-medium">+13.6%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center">
                          <Package className="w-4 h-4 mr-2" />
                          Top Products
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {products.slice(0, 3).map((product, index) => (
                            <div key={product.id} className="flex justify-between text-sm">
                              <span className="truncate">{product.name}</span>
                              <span className="font-medium">{45 - index * 10} sold</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}