import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBookForm from '../components/InputBookForm'

const useStyles = makeStyles(
  createStyles({
    link: {
      color: 'white',
      marginLeft: 'auto',
      textDecoration: 'none'
    }
  })
)

export default function New() {
  const classes = useStyles({})
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">書籍新規追加</Typography>
          <Link to="/books" className={classes.link}>
            書籍一覧
          </Link>
        </Toolbar>
      </AppBar>
      <InputBookForm action="new" id="0" />
    </div>
  )
}
