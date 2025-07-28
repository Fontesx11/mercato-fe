import { Apple, Facebook, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from "@/logo.svg?react";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Teal Background */}
      <div className="flex-1 bg-teal-500 flex flex-col justify-center items-start p-12 text-white">
        {/* Logo */}
        <div className="bg-white p-4 rounded-lg mb-8">
          <div className="flex items-center space-x-2">
            <Logo className="w-10 h-10" />
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Crie sua conta</h2>
            <p className="text-gray-600">É grátis, fácil e seguro</p>
          </div>

          {/* Register Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-gray-700 font-medium">
                Nome Completo
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Digite seu nome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 bg-white/70 border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                E-mail ou telefone
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail ou telefone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-white/70 border-gray-300"
              />
              <p className="text-xs text-gray-500 mt-1">Deve ter ao menos 8 caracteres</p>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                Ao criar sua conta você concorda com os Termos e Condições, e nossa Política de
                Privacidade
              </Label>
            </div>

            <Button
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full"
              disabled={!acceptTerms}
            >
              Cadastre-se
            </Button>
          </div>

          {/* Social Register */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Ou cadastre-se por outros meios</p>
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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/" className="font-bold text-gray-800 hover:underline">
                Faça o login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
