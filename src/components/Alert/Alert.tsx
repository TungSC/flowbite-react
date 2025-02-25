import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';
import { HiX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, FlowbiteColors } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';

export interface FlowbiteAlertTheme {
  base: string;
  borderAccent: string;
  closeButton: FlowbiteAlertCloseButtonTheme;
  color: FlowbiteColors;
  icon: string;
  rounded: string;
  wrapper: string;
}

export interface FlowbiteAlertCloseButtonTheme {
  base: string;
  color: FlowbiteColors;
  icon: string;
}

export interface AlertProps extends PropsWithChildren<Omit<ComponentProps<'div'>, 'color'>> {
  additionalContent?: ReactNode;
  color?: keyof FlowbiteColors;
  icon?: FC<ComponentProps<'svg'>>;
  onDismiss?: boolean | (() => void);
  rounded?: boolean;
  theme?: DeepPartial<FlowbiteAlertTheme>;
  withBorderAccent?: boolean;
}

export const Alert: FC<AlertProps> = ({
  additionalContent,
  children,
  className,
  color = 'info',
  icon: Icon,
  onDismiss,
  rounded = true,
  theme: customTheme = {},
  withBorderAccent,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.alert, customTheme);

  return (
    <div
      className={twMerge(
        theme.base,
        theme.color[color],
        rounded && theme.rounded,
        withBorderAccent && theme.borderAccent,
        className,
      )}
      role="alert"
      {...props}
    >
      <div className={theme.wrapper} data-testid="flowbite-alert-wrapper">
        {Icon && <Icon className={theme.icon} data-testid="flowbite-alert-icon" />}
        <div>{children}</div>
        {typeof onDismiss === 'function' && (
          <button
            aria-label="Dismiss"
            className={twMerge(theme.closeButton.base, theme.closeButton.color[color])}
            onClick={onDismiss}
            type="button"
          >
            <HiX aria-hidden className={theme.closeButton.icon} />
          </button>
        )}
      </div>
      {additionalContent && <div>{additionalContent}</div>}
    </div>
  );
};

Alert.displayName = 'Alert';
