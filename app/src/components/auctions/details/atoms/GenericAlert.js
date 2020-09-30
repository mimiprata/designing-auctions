import React from 'react';
import Alert from '@material-ui/lab/Alert';
export const GenericAlert = (props) =>{
    const {name, value } = props;
    return( <Alert variant="filled" severity="info" >

        {`${name}: ${value}`}
    </Alert>);
}