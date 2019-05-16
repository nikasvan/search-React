import React, { Component } from 'react';
import _ from 'lodash'
import { Table } from 'semantic-ui-react'


const data = [
  {
  "username": "richard",
  "email": "richard@sample.com",
  "age": 20
  },
  {
    "username": "michael",
    "email": "michael@sample.com",
    "age": 23
  },
  {
    "username": "diego",
    "email": "diego@sample.com",
    "age": 24
  },
  {
    "username": "rene",
    "email": "rene@sample.com",
    "age": 22
  },
  {
    "username": "agustin",
    "email": "agustin@sample.com",
    "age": 32
  }
]


export default class App extends Component {
  state = {
    column: null,
    data: data,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  handleKeyUp(e) {
    const inputVal = e.target.value
    if (!inputVal) {
      this.setState({
        data
      })
    } else {
      const newArray = this.state.data.filter((user) => {
        return user.username.includes(inputVal) ? 
        user : null
      })
      this.setState({
        data:newArray
      })
    }
  }

  render() {
    const { column, data, direction } = this.state

    return (
      <div className="App">
        <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'username' ? direction : null}
              onClick={this.handleSort('username')}
            >
              Username
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'Email' ? direction : null}
              onClick={this.handleSort('Email')}
            >
              Email
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'age' ? direction : null}
              onClick={this.handleSort('age')}
            >
              Age
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ username, email, age, index }) => (
            <Table.Row key={index}>
              <Table.Cell>{username}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{age}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <input onKeyUp={(e) => this.handleKeyUp(e)}></input>
      </div>
    );
  }
}