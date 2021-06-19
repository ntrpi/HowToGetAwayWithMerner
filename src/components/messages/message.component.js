

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          subject:'',
          message: ''
        }
    }
    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onSubjectChange(event) {
        this.setState({subject: event.target.value})
    }

    onMsgChange(event) {
        this.setState({message: event.target.value})
    }

    submitEmail(e){
        e.preventDefault();
        axios({
          method: "POST", 
          url:"/send", 
          data:  this.state
        }).then((response)=>{
          if (response.data.status === 'success'){
              alert("Message Sent."); 
              this.resetForm()
          }else if(response.data.status === 'fail'){
              alert("Message failed to send.")
          }
        })
}

resetForm(){
        this.setState({name: '', email: '',subject:'', message: ''})
}








render() {
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h2 className="title">Contact Poster About This Product</h2>
                            <hr/>
                            <form id="contact-form" onSubmit={this.submitEmail.bind(this)} 
                                method="POST">
                            <div className="form-group">
                            <div className="row">
                            <div className="col-md-6">
                                <input placeholder = "Name"  id="name" type="text" 
                                   className="form-control" required value={this.state.name} 
                                   onChange={this.onNameChange.bind(this)}/>
                            </div>
                            <div className="col-md-6">
                                <input placeholder = "Email"  id="email" type="email"
                                  className="form-control" aria-describedby="emailHelp"
                                  required value={this.state.email} onChange=
                                  {this.onEmailChange.bind(this)}/>
                            </div>
                            </div>
                            </div>
                            <div className="form-group">
                                <input placeholder = "Subject"  id="subject" type="text"
                                  className="form-control" required value={this.state.subject}
                                  onChange={this.onSubjectChange.bind(this)}/>
                            </div>
                            <div className="form-group">
                                <textarea placeholder = "Message"  id="message" 
                                   className="form-control" rows="1" 
                                   required value={this.state.message}
                                   onChange= {this.onMsgChange.bind(this)}/>
                            </div>
                            <button type="submit" className="primary-btn submit">Submit</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
