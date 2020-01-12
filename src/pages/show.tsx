import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperBasicInfo: {
      display: 'flex',
      margin: theme.spacing(2),
      padding: theme.spacing(3, 2)
    },
    basicInfo: {
      margin: theme.spacing(2)
    },
    paperImpressions: {
      margin: theme.spacing(2),
      padding: theme.spacing(3, 2)
    },
    textWhite: {
      color: 'white'
    },
    link: {
      textDecoration: 'none',
      padding: theme.spacing(1)
    },
    marginLeftAuto: {
      marginLeft: 'auto'
    },
    img: {
      height: 300
    },
    button: {
      marginRight: theme.spacing(2)
    }
  })
)

export default function Show(props: { match: { params: { id: string } } }) {
  const classes = useStyles({})
  const [book, setBook] = useState({
    id: 0,
    title: '',
    author: '',
    publisher: '',
    status: '',
    gist: '',
    impression: '',
    image: ''
  })
  const { id } = props.match.params
  useEffect(() => {
    getShow()
    // eslint-disable-next-line
  }, [])
  function getShow() {
    axios
      .get(`http://localhost:3000/api/books/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(results => {
        console.log(results)
        setBook(results.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  function deleteBook() {
    axios
      .delete(`http://localhost:3000/api/books/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(results => {
        console.log(results)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">書籍個別</Typography>
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
      <Paper className={classes.paperBasicInfo}>
        <img src={book.image} alt="書籍" className={classes.img} />
        <div className={classes.basicInfo}>
          <Table aria-label="simple table">
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell>{book.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>著者</TableCell>
              <TableCell>{book.author}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>出版社</TableCell>
              <TableCell>{book.publisher}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ステータス</TableCell>
              <TableCell>{book.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>各種ボタン</TableCell>
              <TableCell>
                <Button variant="contained" className={classes.button}>
                  <Link to={`/books/${id}/edit`}>編集</Link>
                </Button>
                <Button variant="contained" onClick={deleteBook}>
                  削除
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </div>
      </Paper>
      <Paper className={classes.paperImpressions}>
        <Typography variant="h6" gutterBottom>
          要点
        </Typography>
        <Typography variant="body1">{book.gist}</Typography>
      </Paper>
      <Paper className={classes.paperImpressions}>
        <Typography variant="h6" gutterBottom>
          感想
        </Typography>
        <Typography variant="body1">{book.impression}</Typography>
      </Paper>
    </div>
  )
}
