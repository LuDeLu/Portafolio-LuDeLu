'use client';

import { useLanguage } from '@/contexts/language';
import { Button } from './ui/button';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-accent/50 transition-colors"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">
            {language === 'es' ? 'Cambiar idioma' : 'Change language'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        <DropdownMenuItem 
          onClick={() => setLanguage('es')}
          className={cn(
            "cursor-pointer flex items-center justify-between gap-2",
            language === 'es' && "bg-accent"
          )}
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">🇦🇷</span>
            <span>Español</span>
          </span>
          {language === 'es' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={cn(
            "cursor-pointer flex items-center justify-between gap-2",
            language === 'en' && "bg-accent"
          )}
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">🇬🇧</span>
            <span>English</span>
          </span>
          {language === 'en' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
