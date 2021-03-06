import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import NativeSelect from '@material-ui/core/NativeSelect'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      backgroundColor: '#C0C0C0'
    },
    toolBar: {
      display: 'flex'
    },
    grid: {
      marginTop: theme.spacing(3)
    },
    img: {
      width: '80%',
      height: 300
    },
    link: {
      color: 'white',
      textDecoration: 'none'
    },
    text: {
      textAlign: 'right'
    },
    select: {
      color: 'white',
      marginLeft: 'auto',
      marginRight: theme.spacing(2)
    }
  })
)

export default function Index() {
  const classes = useStyles({})
  const [books, setBooks] = useState([])
  // ページ読み込み時だけ実行される
  useEffect(() => {
    getIndex('')
    // eslint-disable-next-line
  }, [])
  function getIndex(status: string) {
    axios
      .get('http://localhost:3000/api/books', {
        params: {
          status: status
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(results => {
        console.log(results)
        setBooks(results.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  function changeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    getIndex(event.target.value)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6">書籍一覧</Typography>
          <NativeSelect
            id="demo-customized-select-native"
            className={classes.select}
            onChange={changeStatus}
          >
            <option value={''}>一覧</option>
            <option value={'読んでいない'}>読んでない</option>
            <option value={'読んだ'}>読んだ</option>
            <option value={'読書中'}>読書中</option>
          </NativeSelect>
          <Link to="/books/new" className={classes.link}>
            新規作成
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        {books.map((book: { id: number; title: string; image: string }) => (
          <Grid key={book.id} item xs={6} sm={3} className={classes.grid}>
            <Link to={`/books/${book.id}/show`}>
              <img src={book.image} alt="書籍" className={classes.img} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
