import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning';
  className?: string;
}

const variantStyles = {
  default: 'bg-card',
  primary: 'gradient-primary text-primary-foreground',
  accent: 'gradient-accent text-accent-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
};

const iconVariantStyles = {
  default: 'bg-primary/10 text-primary',
  primary: 'bg-white/20 text-white',
  accent: 'bg-white/20 text-white',
  success: 'bg-white/20 text-white',
  warning: 'bg-white/20 text-white',
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}) => {
  const isColored = variant !== 'default';

  return (
    <div
      className={cn(
        'rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg animate-fade-in',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p
            className={cn(
              'text-sm font-medium',
              isColored ? 'text-white/80' : 'text-muted-foreground'
            )}
          >
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {description && (
            <p className={cn('text-sm', isColored ? 'text-white/70' : 'text-muted-foreground')}>
              {description}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive
                    ? isColored
                      ? 'text-white'
                      : 'text-success'
                    : isColored
                    ? 'text-white'
                    : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
              <span className={cn('text-sm', isColored ? 'text-white/70' : 'text-muted-foreground')}>
                vs mês anterior
              </span>
            </div>
          )}
        </div>
        <div className={cn('rounded-lg p-3', iconVariantStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
