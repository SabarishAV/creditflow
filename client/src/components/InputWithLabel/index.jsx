import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import FormHelperText from '@mui/joy/FormHelperText';

const StyledInput = styled('input')({
  border: 'none', // remove the native input border
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  paddingTop: '1em',
  flex: 1,
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  textOverflow: 'ellipsis',
  '&::placeholder': {
    opacity: 0,
    transition: '0.1s ease-out',
  },
  '&:focus::placeholder': {
    opacity: 1,
  },
  '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
    top: '0.5rem',
    fontSize: '0.75rem',
  },
  '&:focus ~ label': {
    color: 'var(--Input-focusedHighlight)',
  },
  '&:-webkit-autofill': {
    alignSelf: 'stretch', // to fill the height of the root slot
  },
  '&:-webkit-autofill:not(* + &)': {
    marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
    paddingInlineStart: 'var(--Input-paddingInline)',
    borderTopLeftRadius:
      'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    borderBottomLeftRadius:
      'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
  },
});

const StyledLabel = styled('label')(({ theme }) => ({
  position: 'absolute',
  lineHeight: 1,
  top: 'calc((var(--Input-minHeight) - 1em) / 2)',
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}));

// InnerInput component with label passed as a prop
// eslint-disable-next-line react/prop-types
const InnerInput = React.forwardRef(function InnerInput({ labelValue, ...props }, ref) {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledInput {...props} ref={ref} id={id} />
      <StyledLabel htmlFor={id}>{labelValue}</StyledLabel> {/* Dynamically use labelValue */}
    </React.Fragment>
  );
});

// Main component that receives `labelValue` as a prop
// eslint-disable-next-line react/prop-types
export default function FloatingLabelInput({ labelValue,helperText,placeholder,ispassword }) {
  return (
    <>
    <Input
      endDecorator={<CheckCircleOutlined />}
      slots={{ input: InnerInput }}  
      slotProps={{
        input: {
          placeholder: `${placeholder}`,
          type: ispassword==true?"password":"",
          labelValue,  // Pass labelValue to InnerInput
        },
      }}
      sx={{ '--Input-minHeight': '56px', '--Input-radius': '6px', 'width': '70%' }}
    />
    <FormHelperText>{helperText}</FormHelperText>
    </>
  );
}
