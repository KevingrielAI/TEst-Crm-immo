import React from 'react';
import { Link, NavLink, LinkProps, NavLinkProps, useLocation } from 'react-router-dom';

/**
 * Hook to detect if we're inside a Router context
 */
function useIsInsideRouter(): boolean {
  try {
    useLocation();
    return true;
  } catch {
    return false;
  }
}

/**
 * SafeLink: renders Link if inside Router, otherwise renders <a>
 */
export const SafeLink: React.FC<LinkProps & { children: React.ReactNode }> = ({
  to,
  children,
  className,
  ...props
}) => {
  const isInsideRouter = useIsInsideRouter();

  if (isInsideRouter) {
    return (
      <Link to={to} className={className} {...props}>
        {children}
      </Link>
    );
  }

  // Fallback to <a> tag
  const href = typeof to === 'string' ? to : to.pathname || '/';
  return (
    <a href={`#${href}`} className={className} {...props}>
      {children}
    </a>
  );
};

/**
 * SafeNavLink: renders NavLink if inside Router, otherwise renders <a>
 */
export const SafeNavLink: React.FC<NavLinkProps & { children: React.ReactNode }> = (props) => {
  const { to, children, className, onClick } = props;
  const isInsideRouter = useIsInsideRouter();

  if (isInsideRouter) {
    return (
      <NavLink {...props}>
        {children}
      </NavLink>
    );
  }

  // Fallback to <a> tag
  const href = typeof to === 'string' ? to : to.pathname || '/';
  const classNameStr = typeof className === 'function' ? '' : className;
  const handleClick = typeof onClick === 'function' ? onClick : undefined;

  return (
    <a href={`#${href}`} className={classNameStr} onClick={handleClick as any}>
      {children}
    </a>
  );
};
