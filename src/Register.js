import React from 'react'

const Register = ({handlesubmit,id,idChange,password,passwordChange,fullname,fullnameChange,email,emailChange,fetchError}) => {
  return (
    <div className='offset-lg-3 col-lg-6'>
      <form action="" className='container' onSubmit={handlesubmit}>
        <div className='card'>
          <div className='card-header'>
            <h1>User Registeration</h1>
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
                  <input required type="text" className='form-control' value={id} onChange={e=>idChange(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor="">Password <span className='errmsg'>*</span></label>
                  <input required type="password" className='form-control' value={password} onChange={e=>passwordChange(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor="">Full Name <span className='errmsg'>*</span></label>
                  <input required type="text" className='form-control' value={fullname} onChange={e=>fullnameChange(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className='row'>
            <div className='col-lg-6'>
                <div className='form-group'>
                  <label htmlFor="">E-Mail <span className='errmsg'>*</span></label>
                  <input required type="email" className='form-control' value={email} onChange={e=>emailChange(e.target.value)}/>
                </div>
              </div>
            </div>
            

          </div>
          <div className='card-footer'>
              <button type="submit" className='btn btn-primary'>Register</button>&nbsp; &nbsp;
              <a href="/login" className='btn btn-danger'>Back</a>
          </div>

        </div>

      </form>
    </div>
    
  )
}

export default Register