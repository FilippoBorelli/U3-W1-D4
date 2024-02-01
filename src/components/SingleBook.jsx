import { Component } from 'react'
import { Card } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'

class SingleBook extends Component {
  state = {
    selected: false,
  }

  CommentArea = () => {
    fetch("https://striveschool-api.herokuapp.com/api/comments/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzk5YTE4N2U1YzAwMTgxNGM2MGQiLCJpYXQiOjE3MDY3OTMzNDYsImV4cCI6MTcwODAwMjk0Nn0.9Ye9o2Cpa9hGolJPjtWmX_CS3qVyDQmehjLhGf79VIE"
}
  })
  .than((res) => {
    if(res.ok){
      res.JSON()
    }
  })
  .than((comments) => {
    this.setState({
      selected: comments
    })
  })
  .catch((err) => {
    console.log(err)
  })
  }

  componentDidMount() {
    this.CommentArea()
  }

  render() {
    return (
      <Card
        onClick={() => this.setState({ selected: !this.state.selected })}
        style={{ border: this.state.selected ? '3px solid blue' : 'none' }}
      >
        <Card.Img variant="top" src={this.props.book.img} />
        <Card.Body>
          <Card.Title style={{ color: 'black' }}>
            {this.props.book.title}
          </Card.Title>

          {this.state.selected= true ? (
             <div>    
              <ListGroup>
              {this.state.selected.map((comment) => {
                  return (
                    <ListGroup.Item
                      key={comment._id}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <span>
                        {comment.comment}
                      </span>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
           </div> 
            ) : (
              <Alert variant= "danger">Si è verificato un problema</Alert>
            )}
        </Card.Body>
      </Card>
    )
  }
}

export default SingleBook
