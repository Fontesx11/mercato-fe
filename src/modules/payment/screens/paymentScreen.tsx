'use client';

import { Check, Copy, QrCode } from 'lucide-react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PaymentScreen() {
  const [selectedPayment, setSelectedPayment] = useState('pix');
  const [pixKey, setPixKey] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  const pixCode =
    '00020126580014BR.GOV.BCB.PIX013636401234-5678-9012-3456-789012345678520400005303986540568.945802BR5913MERCATO ONLINE6009SAO PAULO62070503***6304';

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Ajuste a URL

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
    });

    socket.on('payment-status', (data) => {
      alert(`Pagamento ${data.status} - ID: ${data.id}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-400 to-teal-500">
      {/* Main Content */}
      <div className="bg-yellow-50 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Confirm and pay</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Pay with</h2>
                <div className="flex space-x-4 mb-6">
                  <Button
                    variant={selectedPayment === 'pix' ? 'default' : 'outline'}
                    onClick={() => setSelectedPayment('pix')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    PIX
                  </Button>
                  <Button
                    variant={selectedPayment === 'card' ? 'default' : 'outline'}
                    onClick={() => setSelectedPayment('card')}
                    className="bg-gray-200 text-gray-600"
                  >
                    Credit Card
                  </Button>
                </div>

                <div className="mb-4">
                  <Badge variant="secondary" className="bg-gray-300 text-gray-700">
                    ⭐ SAVED CONTACT INFO
                  </Badge>
                </div>
              </div>

              {/* PIX Payment Form */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">PIX Payment</h3>

                  <div className="space-y-6">
                    {/* PIX Key Input */}
                    <div>
                      <Label
                        htmlFor="pixKey"
                        className="text-sm font-medium text-gray-600 uppercase tracking-wide"
                      >
                        PIX KEY (OPTIONAL)
                      </Label>
                      <Input
                        id="pixKey"
                        type="text"
                        placeholder="Enter your PIX key (email, phone, CPF, or random key)"
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                        className="mt-2 bg-white/50 border-gray-300"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Optional: Fill to speed up future payments
                      </p>
                    </div>

                    {/* QR Code Section */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="text-center">
                        <div className="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center mb-4">
                          <QrCode className="w-32 h-32 text-gray-400" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">Scan the QR Code</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Open your bank app and scan the QR code to pay
                        </p>

                        {/* PIX Code */}
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <p className="text-xs text-gray-600 mb-2">Or copy the PIX code:</p>
                          <div className="flex items-center space-x-2">
                            <code className="text-xs bg-white px-2 py-1 rounded border flex-1 truncate">
                              {pixCode}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCopyPixCode}
                              className="shrink-0 bg-transparent"
                            >
                              {copied ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Save Info Checkbox */}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saveInfo" checked={saveInfo} onCheckedChange={setSaveInfo} />
                      <Label htmlFor="saveInfo" className="text-sm text-gray-700">
                        Save PIX key for future payments
                      </Label>
                    </div>

                    {/* Confirm Button */}
                    <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 text-lg font-semibold">
                      Confirm and pay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Price Details */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Price details</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>$20 × 2</span>
                      <span>$40</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span>$0.00</span>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="bg-blue-100 -mx-6 px-6 py-3">
                      <div className="flex justify-between font-semibold text-gray-800">
                        <span>Total (USD)</span>
                        <span>$68.94</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
