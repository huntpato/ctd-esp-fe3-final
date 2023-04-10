import React, { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Box, TextField } from '@mui/material';

interface ControlledInputProps {
  name: string;
  label: string;
  defaultValue?: string;
  maxLength?: number;
  regex?: RegExp;
  type?: 'text' | 'password' | 'number' | 'tel' | string;
}

const ControlledInput: FC<ControlledInputProps> = ({ name, label, defaultValue, maxLength, regex, type = 'text' }: ControlledInputProps) => {

  const { control } = useFormContext();

  const { field: { onChange, value, ref }, formState: { errors } } = useController<Record<string, string>>({
    name: name,
    control,
    defaultValue,
  });

  const inputValue = (value: any) => {
    if (regex) {
      return value.match(regex) ? value : '';
    } else {
      return value;
    }
  };

  return (
    <Box
      mb={2}
    >
      <TextField
        onChange={onChange}
        value={inputValue(value)}
        label={label}
        name={name}
        inputRef={ref}
        type={type}
        inputProps={{ maxLength: maxLength }}
        fullWidth
        error={!!errors[name]}
        helperText={`${errors[name]?.message || ''}`}
      />
    </Box>
  );
};

export default ControlledInput;
