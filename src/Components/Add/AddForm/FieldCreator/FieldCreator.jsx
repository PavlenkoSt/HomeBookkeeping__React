import { Field } from 'redux-form'
import s from './FieldCreator.module.css'
import formControlStyle from './FormControl.module.css'

const FormControl = ({ input, meta, children, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
      <div className={formControlStyle.formControls + ' ' + (hasError && formControlStyle.error)}>
        <div>
          {children}
        </div>
        { <span className={formControlStyle.errorMessage}>{ hasError && meta.error }</span>}
      </div>
    );
};

export const Input = props => {
    const {input, meta, ...restProps} = props
    return (
      <FormControl {...props}>
        <input 
          {...input}
          {...restProps}
        />
      </FormControl>
    );
  };

export const FieldCreator = ( addModePlus, name, text, validators, type = 'text', classN = '', disabled = false) => {
    
    return (
        <label className={`${s.label} ${classN} ${disabled ? s.disabled : ''}`}> 
            <span className={s.span}>{text}</span>
            <Field 
                onFocus={e => e.target.labels[0].classList.add(s.set, addModePlus ? s.setPlus : s.setMinus) } 
                onBlur={e =>{ e.target.labels[0].classList.remove(e.target.value ? s.none : s.set, s.setPlus, s.setMinus)}}
                className={s.input} 
                component={Input} 
                name={name}
                type={type}
                disabled={disabled}
                validate={validators}
                autoComplete='off' 
                />
        </label>
    );
  }