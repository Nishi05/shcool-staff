import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
export default class Admin extends Component {
  state = {
    schools: [],
    isLoaded: false,
    error: null,
  }

  componentDidMount() {
    if (this.props.jwt === '') {
      this.props.history.push({
        pathname: '/login',
      })
      return
    }
    fetch(`${process.env.REACT_APP_API_URL}/v1/schools`)
      .then((response) => {
        console.log('Status code is', response.status)
        if (response.status !== '200') {
          let err = Error
          err.message = 'Invalid response code' + response.status
          this.setState({ error: err })
        }
        return response.json()
      })
      .then((json) => {
        this.setState(
          {
            schools: json.schools,
            isLoaded: true,
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            })
          }
        )
      })
  }
  render() {
    const { schools, isLoaded, error } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <p>Loading ...</p>
    } else {
      return (
        <Fragment>
          <h2>Manage Catalogue</h2>
          <div className="list-group">
            {schools.map((m) => (
              <Link
                key={m.id}
                className="list-group-item list-group-item-action"
                to={`/admin/school/${m.id}`}
              >
                {m.title}
              </Link>
            ))}
          </div>
        </Fragment>
      )
    }
  }
}
