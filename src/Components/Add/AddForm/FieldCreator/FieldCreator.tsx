import { FC } from 'react'
import { Field, Validator } from 'redux-form'
import s from './FieldCreator.module.css'
import formControlStyle from './FormControl.module.css'

type FormControlPropsType = {
  meta: {
    touched: boolean
    error: string
  }
}

const FormControl: FC<FormControlPropsType> = ({ meta, children }) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={formControlStyle.formControls + ' ' + (hasError && formControlStyle.error)}>
      <div>
        {children}
      </div>
      { <span className={formControlStyle.errorMessage}>{ hasError && meta.error }</span>}
    </div>
  )
}

export const Input = (props: any) => {
  const {input, meta, ...restProps} = props
  return (
    <FormControl {...props}>
      <input 
        {...input}
        {...restProps}
      />
    </FormControl>
  )
}

export const FieldCreator = ( addModePlus: boolean, name: string, text: string, validators: Validator | Validator[] | undefined, type = 'text') => {
    
    return (
        <label className={s.label}> 
            <span className={s.span}>{text}</span>
            <Field 
                onFocus={(e: any) => e.target.labels[0].classList.add(s.set, addModePlus ? s.setPlus : s.setMinus) } 
                onBlur={(e: any) =>{ e.target.labels[0].classList.remove(e.target.value ? s.none : s.set, s.setPlus, s.setMinus)}}
                className={s.input} 
                component={Input} 
                name={name}
                type={type}
                validate={validators}
                autoComplete='off' 
                />
        </label>
    )
  }