import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBookForm from '../components/InputBookForm'

export default function New() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">書籍新規追加</Typography>
        </Toolbar>
      </AppBar>
      <InputBookForm />
    </div>
  )
}
