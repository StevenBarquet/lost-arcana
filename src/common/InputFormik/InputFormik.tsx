// ---Dependencies
import { Input, InputProps } from 'antd';
import { FormikProps } from 'formik';
import React, { KeyboardEvent } from 'react';
import { LabelWithTooltip } from '../LabelWithTooltip/LabelWithTooltip';

interface Props<T> extends InputProps {
  formik: FormikProps<T>;
  valueName: keyof T;
  label?: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
  submitOnEnter?: boolean;
  hide?: boolean;
}

/**
 * InputFormik Component:  Descripción del comportamiento...
 * @param {Props} props - Parámetros del componente como: ...
 */
export function InputFormik<T>({
  formik,
  valueName,
  submitOnEnter,
  label,
  hide,
  ...props
}: Props<T>) {
  // -----------------------CONSTS, HOOKS, STATES
  const errMessage = formik.errors[valueName];
  const isError = !!errMessage && !!formik.touched[valueName];
  const safeValueName = String(valueName);

  // -----------------------MAIN METHODS
  /** Función para hacer submit al presionar enter */
  function onKeyPress(event: KeyboardEvent<unknown>) {
    if (submitOnEnter && event.key === 'Enter') {
      formik.submitForm();
    }
  }
  // -----------------------AUX METHODS
  // -----------------------RENDER
  if (hide) return null;
  return (
    <div className='InputFormik' style={{ marginTop: '8px' }}>
      <LabelWithTooltip label={label} required={props.required} tooltip={props.tooltip}  />
      <Input
        onChange={formik.handleChange(valueName)}
        value={String(formik.values[valueName] || '')}
        name={safeValueName}
        onKeyDown={onKeyPress}
        status={isError ? 'error' : undefined}
        {...props}
      />
      {isError ? (
        <div className='ant-form-item-explain-error customHelper'>{String(errMessage)}</div>
      ) : null}
    </div>
  );
}
