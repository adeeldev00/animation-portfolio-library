import React, { Fragment } from 'react';
import { Alert as AlertUI, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface IAlertProps {
  title: string;
  description: string | string[] | React.ReactNode;
  icon?: React.ReactNode;
  styles?: {
    alert?: string;
  };
  variant?: 'error' | 'success';
}

const Alert = ({ title, description, icon, styles, variant = 'error' }: IAlertProps) => {
  return (
    <AlertUI
      className={cn(
        variant === 'error'
          ? 'border-red-600 bg-red-500/10 text-red-600'
          : 'border-green-600 bg-green-500/10 text-green-600',
        styles?.alert
      )}
    >
      {icon && icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="capitalize">
        {typeof description === 'string' && description}
        {Array.isArray(description) && (
          <Fragment>
            {description.map((desc, idx) => {
              return <p key={idx}>{desc}</p>;
            })}
          </Fragment>
        )}
        {typeof description === 'object' && !Array.isArray(description) && description}
      </AlertDescription>
    </AlertUI>
  );
};

export default Alert;
