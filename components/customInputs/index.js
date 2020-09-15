import React from 'react'; 
import { useField } from 'formik';
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Textarea,
  } from "@chakra-ui/core";
  import styles from './customInputs.module.css';

import { style } from 'styled-system';


export function InputField({ label, textarea, size, ...props}) {
    let InputOrTextArea = Input; 
    if(textarea){
        InputOrTextArea = Textarea
    }
    const [ field, { error }] = useField(props); 
    return (
        <FormControl isInvalid={!!error}> 
            <FormLabel htmlFor={field.name} className={styles.label}>{label} </FormLabel>
            <InputOrTextArea {...field} {...props} id={field.name} className={styles.input}/>
            {error ? <FormErrorMessage>{error}</FormErrorMessage>: null}
        </FormControl>
    );
}
