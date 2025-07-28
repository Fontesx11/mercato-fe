'use client';

import { Check, Copy, QrCode } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGlobalContext } from '@/shared/hooks/useGlobalContext';

interface PixData {
  qrCodeBase64: string;
}

interface PaymentStatusData {
  status: 'approved' | 'pending' | 'failed';
  id?: string;
}

export default function PaymentScreen() {
  const [selectedPayment, setSelectedPayment] = useState<'pix'>('pix');
  const [copied, setCopied] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);

  const { setNotification } = useGlobalContext();
  const navigate = useNavigate();

  const pixCode =
    '00020126580014BR.GOV.BCB.PIX013636401234-5678-9012-3456-789012345678520400005303986540568.945802BR5913MERCATO ONLINE6009SAO PAULO62070503***6304';

  const handleCopyPixCode = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    const storedPix = localStorage.getItem('pixData');
    if (storedPix) {
      try {
        setPixData(JSON.parse(storedPix) as PixData);
      } catch (e) {
        console.error('Erro ao parsear pixData:', e);
      }
    }
  }, []);

  useEffect(() => {
    const socket: Socket = io('http://localhost:3000'); // Ajuste a URL

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
    });

    socket.on('payment-status', (data: PaymentStatusData) => {
      if (data.status === 'approved') {
        setNotification('Pagamento efetuado', 'success');
        navigate('/home');
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate, setNotification]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-400 to-teal-500">
      <div className="bg-yellow-50 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Confirm and pay</h1>

          <div className="grid lg:grid-cols-3 gap-8">
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
                </div>

                <div className="mb-4">
                  <Badge variant="secondary" className="bg-gray-300 text-gray-700">
                    ⭐ SAVED CONTACT INFO
                  </Badge>
                </div>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">PIX Payment</h3>
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="text-center">
                        <div className="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center mb-4 relative">
                          {pixData?.qrCodeBase64 ? (
                            <img
                              src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                              alt="QR Code"
                              className="w-48 h-48 rounded-lg"
                            />
                          ) : (
                            <QrCode className="w-32 h-32 text-gray-400" />
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">Scan the QR Code</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Open your bank app and scan the QR code to pay
                        </p>

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
                  </div>
                </CardContent>
              </Card>
            </div>

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
