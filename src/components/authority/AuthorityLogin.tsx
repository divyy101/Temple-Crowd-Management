import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, User, ArrowLeft, Fingerprint, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';

interface AuthorityLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

// Hardcoded authority credentials
const VALID_CREDENTIALS = [
  { username: 'admin', password: 'Temple@360', name: 'Temple Administrator', role: 'Super Admin' },
  { username: 'authority', password: 'Auth@2025', name: 'Temple Authority', role: 'Authority' },
  { username: 'manager', password: 'Manager@360', name: 'Operations Manager', role: 'Manager' },
];

const AuthorityLogin: React.FC<AuthorityLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const match = VALID_CREDENTIALS.find(
      cred => cred.username === username.toLowerCase() && cred.password === password
    );

    if (match) {
      localStorage.setItem('authority_session', JSON.stringify({
        name: match.name,
        role: match.role,
        loginTime: new Date().toISOString(),
        token: `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }));
      setIsLoading(false);
      onLoginSuccess();
    } else {
      setLoginAttempts(prev => prev + 1);
      setError(
        loginAttempts >= 2
          ? 'Too many failed attempts. Please verify your credentials carefully.'
          : 'Invalid username or password. Please try again.'
      );
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setUsername('admin');
    setPassword('Temple@360');
    setError('');
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    localStorage.setItem('authority_session', JSON.stringify({
      name: 'Temple Administrator',
      role: 'Super Admin',
      loginTime: new Date().toISOString(),
      token: `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }));
    setIsLoading(false);
    onLoginSuccess();
  };

  return (
    <div className="authority-login-wrapper">
      {/* Animated background */}
      <div className="authority-login-bg">
        <div className="authority-login-orb authority-login-orb-1"></div>
        <div className="authority-login-orb authority-login-orb-2"></div>
        <div className="authority-login-orb authority-login-orb-3"></div>
      </div>

      <div className="authority-login-container">
        {/* Back button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="authority-login-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Role Selection
        </Button>

        <Card className="authority-login-card">
          <CardHeader className="text-center pb-2">
            <div className="authority-login-icon-ring">
              <div className="authority-login-icon-inner">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold mt-4" style={{color: '#1e1b4b'}}>
              Authority Portal
            </CardTitle>
            <CardDescription className="text-gray-500">
              Secure access for temple administrators & staff
            </CardDescription>

            <div className="flex justify-center gap-2 mt-3">
              <Badge className="authority-login-badge bg-violet-100 text-violet-700 border-violet-200">
                <Lock className="h-3 w-3 mr-1" />
                Encrypted
              </Badge>
              <Badge className="authority-login-badge bg-emerald-100 text-emerald-700 border-emerald-200">
                <Fingerprint className="h-3 w-3 mr-1" />
                Verified Access
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            {error && (
              <Alert className="mb-4 bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="auth-username" className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="auth-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10 h-11 border-gray-200 focus:border-violet-400 focus:ring-violet-400"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auth-password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-violet-400 focus:ring-violet-400"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !username || !password}
                className="w-full h-12 text-base font-semibold authority-login-btn"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="authority-login-spinner"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Sign In to Authority Portal
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500 mb-3">Quick access for demonstration</p>
              <Button
                type="button"
                variant="outline"
                onClick={handleQuickLogin}
                disabled={isLoading}
                className="w-full h-10 border-violet-200 text-violet-700 hover:bg-violet-50"
              >
                <Fingerprint className="h-4 w-4 mr-2" />
                Demo Login (Admin)
              </Button>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-xs font-medium text-gray-600 mb-2">Available Credentials:</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p><span className="font-mono bg-gray-100 px-1 rounded">admin</span> / <span className="font-mono bg-gray-100 px-1 rounded">Temple@360</span></p>
                  <p><span className="font-mono bg-gray-100 px-1 rounded">authority</span> / <span className="font-mono bg-gray-100 px-1 rounded">Auth@2025</span></p>
                  <p><span className="font-mono bg-gray-100 px-1 rounded">manager</span> / <span className="font-mono bg-gray-100 px-1 rounded">Manager@360</span></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-white/60 mt-6">
          Temple Insight 360 © {new Date().getFullYear()} • Gujarat Temple Board
        </p>
      </div>
    </div>
  );
};

export default AuthorityLogin;
