
import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 flex flex-col items-center justify-center">
      <div className="flex items-center gap-3">
        <Shield className="h-10 w-10 text-primary-blue" />
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Truth Sifter</h1>
      </div>
      <div className="flex items-center mt-2 gap-2 text-muted-foreground">
        <AlertTriangle className="h-4 w-4" />
        <p className="text-sm">AI-Powered Misinformation Detection</p>
      </div>
    </header>
  );
};

export default Header;
