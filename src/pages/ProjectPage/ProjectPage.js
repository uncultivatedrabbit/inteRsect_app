import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'

export default class ProjectPage extends Component {
  render() {
    return (
      <>
      <Navbar loggedIn={true}/>
      <section className="Project__Page">
        <h1>Project Page</h1>
      </section>
      </>
    )
  }
}
