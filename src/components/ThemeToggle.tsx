
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-brass" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-brass"
      />
      <Moon className="h-4 w-4 text-brass" />
    </div>
  );
};

export default ThemeToggle;
