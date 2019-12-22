import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBookForm from '../components/InputBookForm'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textWhite: {
      color: 'white'
    },
    link: {
      textDecoration: 'none',
      padding: theme.spacing(1)
    },
    marginLeftAuto: {
      marginLeft: 'auto'
    }
  })
)

export default function Edit() {
  const classes = useStyles({})
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">書籍編集</Typography>
          <Link
            to="/books"
            className={`${classes.textWhite} + ${classes.link} + ${classes.marginLeftAuto}`}
          >
            書籍一覧
          </Link>
          <Link
            to="/books/new"
            className={`${classes.textWhite} + ${classes.link}`}
          >
            新規作成
          </Link>
        </Toolbar>
      </AppBar>
      <InputBookForm />
    </div>
  )
}
