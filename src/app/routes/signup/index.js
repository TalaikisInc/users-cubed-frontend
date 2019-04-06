export default class Signup extends React.Component {
  submit = values => {
    // print the form values to the console
    console.log(values)
  }
  render() {
    return <ContactForm onSubmit={this.submit} />
  }
}
