// ---Dependencies
import React from 'react';
// ---Styles
import { ClickableTooltip } from '../ClickableTooltip/ClickableTooltip';

interface Props {
  label?: string | React.ReactNode;
  lineBreak?: boolean;
  tooltip?: string | React.ReactNode;
  required?: boolean;
}
/**
 * LabelWithTooltip Component:  Descripción del comportamiento...
 */
export function LabelWithTooltip({
  label,
  tooltip: tooltipContent,
  required,
  lineBreak = true,
}: Props) {
  // -----------------------CONSTS, HOOKS, STATES
  const content = (
    <>
      {label && label !== '' ? (
        <label style={lineBreak ? { padding: '5px 0', margin: 0, display: 'block' } : undefined}>
          {required && <span className='required'>*</span>}
          {label}
        </label>
      ) : null}
      <ClickableTooltip content={tooltipContent} />
    </>
  );
  // -----------------------RENDER
  if (lineBreak)
    return (
      <div className="LabelWithTooltip">
        <div style={{ display: 'flex', alignItems: 'center' }}>{content}</div>
      </div>
    );
  return (
    <span className="LabelWithTooltip" style={{ padding: '5px 14px 5px 0', margin: 0 }}>
      {content}
    </span>
  );
}
