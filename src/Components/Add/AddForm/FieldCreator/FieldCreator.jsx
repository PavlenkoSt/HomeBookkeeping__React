import { Field } from 'redux-form'
import s from './FieldCreator.module.css'

export const FieldCreator = ( addModePlus, component, name, text, type = 'text', classN = '', disabled = false) => {
    
    return (
        <label className={`${s.label} ${classN} ${disabled ? s.disabled : ''}`}> 
            <span className={s.span}>{text}</span>
            <Field 
                onFocus={e => e.target.labels[0].classList.add(s.set, addModePlus ? s.setPlus : s.setMinus) } 
                onBlur={e =>{ e.target.labels[0].classList.remove(e.target.value ? s.none : s.set, s.setPlus, s.setMinus)}}
                className={s.input} 
                component={component} 
                name={name}
                type={type}
                disabled={disabled}
                />
        </label>
    );
  }