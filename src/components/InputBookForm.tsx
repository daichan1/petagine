import React, { useEffect, useState } from 'react'
import aws from 'aws-sdk'
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
import { accessKeyId, secretKey, bucket } from '../settings/aws'
import API from '../settings/api'

interface Props {
  action: string
  id: string
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
// AWS接続先設定
aws.config.update({
  region: 'ap-northeast-1',
  accessKeyId: accessKeyId,
  secretAccessKey: secretKey
})

export default function InputBookForm(props: Props) {
  const classes = useStyles({})
  const [book, setBook] = useState({
    title: '',
    author: '',
    publisher: '',
    status: '',
    gist: '',
    impression: '',
    image: ''
  })
  useEffect(() => {
    getEdit()
    // eslint-disable-next-line
  }, [])
  function paramsRequest(): void {
    if (props.action === 'new') {
      postParams()
    } else {
      putParams()
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
  function changeImage(event: React.ChangeEvent<HTMLInputElement>) {
    // nullチェック必須(ts)
    if (event.target.files != null) {
      event.preventDefault()
      const image = event.target.files[0]
      // S3に画像をアップロード
      s3UploadImage(image)
    }
  }
  // S3画像アップロード
  function s3UploadImage(file: File) {
    const s3 = new aws.S3()
    const fileName = setFileName(file.type.split('/')[1])
    const imageUrl = makeImageUrl(fileName)
    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read'
    }
    // S3にサムネイルを保存
    s3.putObject(params, (err, data): void => {
      // 正常にアップロードされた時だけ画像URLを更新
      if (err == null) {
        setBook({ ...book, image: imageUrl })
      }
      console.log(data)
      console.log(err)
    })
  }
  // ファイル名を設定
  function setFileName(fileType: string) {
    const today = new Date()
    const fileName = `${today.getFullYear()}${today.getMonth() +
      1}${today.getDate()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}.${fileType}`
    return fileName
  }
  // 画像URLを生成
  function makeImageUrl(fileName: string) {
    const url = `https://${bucket}.s3-ap-northeast-1.amazonaws.com/${fileName}`
    return url
  }
  // 書籍データを送信(json形式)
  function postParams() {
    axios
      .post(API.url.create, {
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
  // 書籍データ取得(編集処理用)
  function getEdit() {
    axios
      .get(`http://localhost:3000/api/books/${props.id}/edit`, {
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
  // 更新する書籍データを送信(json)
  function putParams() {
    axios
      .put(`http://localhost:3000/api/books/${props.id}`, {
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
              value={book.title}
              onChange={changeTitle}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>著者</TableCell>
            <TextField
              label="著者"
              variant="outlined"
              className={classes.inputForm}
              value={book.author}
              onChange={changeAuthor}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>出版社</TableCell>
            <TextField
              label="出版社"
              variant="outlined"
              className={classes.inputForm}
              value={book.publisher}
              onChange={changePublisher}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>ステータス</TableCell>
            <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              className={classes.inputForm}
              value={book.status}
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
              value={book.gist}
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
              value={book.impression}
              onChange={changeImpression}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>
              画像アップロード
            </TableCell>
            <input
              type="file"
              className={classes.inputForm}
              onChange={changeImage}
            />
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>送信</TableCell>
            <input
              type="button"
              value="保存"
              className={classes.submit}
              onClick={paramsRequest}
            />
          </TableRow>
        </Table>
      </TableContainer>
    </form>
  )
}
