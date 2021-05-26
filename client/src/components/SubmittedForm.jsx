import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Button, Modal, TextField } from '@material-ui/core';
import styled from 'styled-components'

const SubmittedForm = (props) => {
  return (
    <SubmitStyle>
      <InnerStyle>
        <img src="https://img.icons8.com/cotton/50/000000/tomato-and-garlic-1.png"/>Recipe Submitted!
      </InnerStyle>

    </SubmitStyle>
  )
}

const SubmitStyle = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  Height: 250px;
  font-family: 'Amatic SC', cursive;
  font-size: 40px;
`
const InnerStyle = styled.div`
 height: 50px;
`




export default SubmittedForm;