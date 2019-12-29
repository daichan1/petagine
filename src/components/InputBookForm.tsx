import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
import API from '../settings/api'

interface Props {
  action: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      margin: theme.spacing(2),
      padding: theme.spacing(2)
    },
    table: {
      margin: 'auto',
      width: 960,
      minWidth: 650
    },
    tableRow: {
      marign: theme.spacing(2)
    },
    tableCell: {
      width: '30%'
    },
    inputForm: {
      margin: theme.spacing(2),
      width: '70%'
    },
    submit: {
      margin: theme.spacing(2),
      width: 150
    }
  })
)

export default function InputBookForm(props: Props) {
  const classes = useStyles({})
  const [book, setBook] = useState({
    title: '',
    author: '',
    publisher: '',
    status: '',
    gist: '',
    impression: ''
  })
  function requestUrl(): string {
    if (props.action === 'new') {
      return API.url.create
    } else {
      return API.url.create
    }
  }
  function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setBook({ ...book, title: event.target.value })
  }
  function changeAuthor(event: React.ChangeEvent<HTMLInputElement>) {
    setBook({ ...book, author: event.target.value })
  }
  function changePublisher(event: React.ChangeEvent<HTMLInputElement>) {
    setBook({ ...book, publisher: event.target.value })
  }
  function changeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    setBook({ ...book, status: event.target.value })
  }
  function changeGist(event: React.ChangeEvent<HTMLInputElement>) {
    setBook({ ...book, gist: event.target.value })
  }
  function changeImpression(event: React.ChangeEvent<HTMLInputElement>) {
    setBook({ ...book, impression: event.target.value })
  }
  function postParams() {
    const url: string = requestUrl()
    axios
      .post(url, {
        book,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((results): void => {
        console.log(results)
      })
      .catch((err): void => {
        console.log(err)
      })
  }
  return (
    <form autoComplete="off">
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table" className={classes.table}>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>タイトル</TableCell>
            <TextField
              label="タイトル"
              variant="outlined"
              className={classes.inputForm}
              onChange={changeTitle}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>著者</TableCell>
            <TextField
              label="著者"
              variant="outlined"
              className={classes.inputForm}
              onChange={changeAuthor}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>出版社</TableCell>
            <TextField
              label="出版社"
              variant="outlined"
              className={classes.inputForm}
              onChange={changePublisher}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>ステータス</TableCell>
            <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value="0"
              className={classes.inputForm}
              onChange={changeStatus}
            >
              <option value={0}>読んでない</option>
              <option value={1}>読んだ</option>
              <option value={2}>読書中</option>
            </NativeSelect>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>要点</TableCell>
            <TextField
              id="filled-multiline-static"
              label="要点"
              multiline
              rows="4"
              variant="filled"
              className={classes.inputForm}
              onChange={changeGist}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>感想</TableCell>
            <TextField
              id="filled-multiline-static"
              label="感想"
              multiline
              rows="4"
              variant="filled"
              className={classes.inputForm}
              onChange={changeImpression}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>
              画像アップロード
            </TableCell>
            <input type="file" className={classes.inputForm} />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>送信</TableCell>
            <input
              type="button"
              value="保存"
              className={classes.submit}
              onClick={postParams}
            />
          </TableRow>
        </Table>
      </TableContainer>
    </form>
  )
}
