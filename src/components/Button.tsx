import * as React from "react";

import "./Button.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <button ref={ref} className="button" {...props}>
      {children ?? (
        <>
          <div className="button__newsletter-modal-form-button">
              <span className="button__newsletter-modal-form-button-text">Sign me up</span>
            </div>
        </>
      )}
    </button>
  )
);
Button.displayName = "Button";

export { Button };
