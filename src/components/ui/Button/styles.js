import styled from 'styled-components';

export const ButtonContainer = styled.button`
  background: ${(props) =>
    props.variant === 'outlined'
      ? 'transparent'
      : props.theme.palette[props.color]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.variant === 'outlined'
      ? `${
          props.color
            ? props.theme.palette[props.color]
            : props.theme.palette.border
        }`
      : props.theme.palette.text.contrast};
  border-radius: 4px;
  font-size: 0.875rem;
  text-align: center;
  padding: ${(props) => (props.size === 'small' ? '8px' : '12px')};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: none;
  outline: none;
  width: ${(props) => (props.fullWidth ? '100%' : 'inherit')};
  border: ${(props) =>
    props.variant === 'outlined'
      ? `1px solid ${
          props.color
            ? props.theme.palette[props.color]
            : props.theme.palette.border
        }`
      : 'none'};
  transition: filter 0.3s;
  &:hover {
    filter: brightness(90%);
  }

  svg {
    fill: ${(props) =>
      props.variant === 'outlined'
        ? `${
            props.color
              ? props.theme.palette[props.color]
              : props.theme.palette.border
          }`
        : props.theme.palette.text.contrast};
    margin-right: 8px;
  }
`;

export const IconButtonContainer = styled(ButtonContainer)`
  background: ${(props) =>
    props.color ? props.theme.palette[props.color] : 'transparent'};
  border-radius: 100%;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  padding: 5px;

  > svg {
    fill: ${(props) => props.theme.palette.text.secondary};
    height: 2em;
    width: 2em;
    margin: 0px;
  }
`;
