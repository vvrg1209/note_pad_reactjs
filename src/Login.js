import React from 'react'

const Login = ({loginuser,loginuserChange,loginpassword,loginpasswordChange,ProceedLogin,fetchError}) => {
  return (
    <div className='offset-lg-3 col-lg-6'>
      <form action="" className='container' onSubmit={ProceedLogin}>
        <div className='card'>
          <div className='card-header'>
            <h1>Login </h1>
          </div>
          <div className='card-body'>
            {/* Error message section */}
            {fetchError && (
              <div className="alert alert-danger" role="alert">
                {fetchError}
              </div>
            )}
            <div className='row'>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor="">User Name <span className='errmsg'>*</span></label>
                  <input required type="text" className='form-control' value={loginuser} onChange={e=>loginuserChange(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor="">Password <span className='errmsg'>*</span></label>
                  <input required type="password" className='form-control' value={loginpassword} onChange={e=>loginpasswordChange(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
          <div className='card-footer'>
              <button type="submit" className='btn btn-primary'>Login</button>&nbsp; &nbsp;
              <a href="/register" className='btn btn-danger'>Register</a>
          </div>

        </div>

      </form>
    </div>
  )
}

export default Login