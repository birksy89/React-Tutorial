//The CommentBox
var CommentBox = React.createClass({

  loadCommentsFromServer: function() {
    $.ajax({
      headers: {
          'X-Auth-Token': 'ea93b0d4d7724762b54ece5762079114'
      },
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({data: data.players});
          console.log(this.state.data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="container">
        Hello, world! I am a CommentBox.

        <h1>Players</h1>

        <CommentList data={this.state.data}/>


      </div>
    );
  }
});

//The CommentList
var CommentList = React.createClass({
  render: function() {

    if (this.props.data) {
      var commentNodes = this.props.data.map(function(comment) {
        return (
          <Comment author={comment.name} key={comment.jerseyNumber}>
            {comment.position}
          </Comment>
        );
      });
    }

    return (
      <div className="row">
        <h2>Hello, world! I am a CommentList</h2>
        {/*{this.props.data.toString()}
        These "..." are needed*/}
        ...{commentNodes}
      </div>
    );
  }
});



//The Actual Comments
var Comment = React.createClass({
  render: function() {
    return (
      <div className="col-sm-3">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render(

  <CommentBox url="http://api.football-data.org/v1/teams/66/players" pollInterval={20000}/>, document.getElementById('content'));
