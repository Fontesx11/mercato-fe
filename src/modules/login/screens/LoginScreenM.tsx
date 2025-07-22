'use client';

import { Apple, Facebook, Mail, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRequest } from '@/shared/hooks/useResquest';

export default function LoginScreenM() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authRequest } = useRequest();
  const navigate = useNavigate();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleLogin = () => {
    authRequest(
      {
        email: email,
        password: password,
      },
      navigate,
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Teal Background */}
      <div className="flex-1 bg-teal-500 flex flex-col justify-center items-start p-12 text-white">
        {/* Logo */}
        <div className="bg-white p-4 rounded-lg mb-8">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-teal-500" />
            <div>
              <div className="font-bold text-teal-500 text-lg">Mercato</div>
              <div className="text-teal-500 text-sm">ONLINE</div>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-4xl font-bold mb-6 text-yellow-300">Conheça o Mercato Online!</h1>
        <p className="text-lg mb-4">Se cansou da confusão de outros marketplaces?</p>
        <p className="text-lg">Conheça nossas interfaces intuitivas e com auxílio de IA</p>
      </div>

      {/* Right Column - Cream Background */}
      <div className="flex-1 bg-yellow-100 flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Que bom que você voltou!</h2>
            <p className="text-gray-600">Faça o seu login aqui!</p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                E-mail ou telefone
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Escreva seu e-mail ou telefone aqui!"
                value={email}
                onChange={handleEmail}
                className="mt-1 bg-white/70 border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Escreva sua senha"
                value={password}
                onChange={handlePassword}
                className="mt-1 bg-white/70 border-gray-300"
              />
              <div className="text-right mt-1">
                <Link to={'#'} className="text-sm text-gray-500 hover:text-gray-700">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full"
            >
              Entre agora
            </Button>
          </div>

          {/* Social Login */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Ou acesse por outros meios</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                <Apple className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link to="/register" className="font-bold text-gray-800 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
