import React,{useState} from 'react';
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password} = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if (json.sucess){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
            props.showAlert("Account Created Sucessfully","success");

        }
        else{
           props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter email" name="name" onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email"aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword" id="cpassword" >Confirm Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="cpassword" onChange={onChange}/>
  </div>
  

  <button type="submit" className="btn btn-primary my-5">Submit</button>
</form>
        </div>
    )
}

export default Signup
