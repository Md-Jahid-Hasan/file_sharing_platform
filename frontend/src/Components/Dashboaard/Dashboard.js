import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterFromModal from "../User/RegisterFromModal";
import {getUser} from "../../context/action/auth";
import {GlobalContext} from "../../context/Provider";

const Dashboard = () => {
  //   Register Modal Function
  const {notificationDispatch} = useContext(GlobalContext)
  const [reShow, setReShow] = useState(false);
  const [users, setUsers] = useState([])
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    getUser()
        .then(res => {
          if (res.status === 200){
            setUsers(res.result)
          } else if(res.status === 400){
            notificationDispatch({
              type: "ADD_ALERT",
              payload: res.message
            })
          }
        })
  }, [])

  const userUpdate = (user, create=false) => {
    if (create){
      setUsers(prevState => [...prevState, user])
    } else{
      let new_user = users.map(u => u.pk === user.pk ? user : u)
      setUsers(new_user)
    }
  }

  const reHandleClose = () => setReShow(false);
  const reHandleShow = (user={}) => {
    setReShow(true)
    setUserDetails(user)
  };

  //   Password Eye Function
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <>
      <section className="dashboard-section">
        <div className="dashboard-div">
          <h3>Dashboard</h3>
          <button className="btn-login" onClick={() => reHandleShow()}>
            Create User
          </button>
        </div>

        <div className="dashboard-table">
          <table className="table">
            <thead>
              <th>Name</th>
              <th>Type</th>
              <th>Email</th>
              <th>User Details</th>
            </thead>
            <tbody>
                {users && users.map((user, key) =>
                    <tr key={key}>
                    <td data-label="Name" className="td">
                      {user.name}
                    </td>
                    <td data-label="Type">{user.is_staff ? "Admin" : "User"}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="User">
                      <button className="btn-login" onClick={() => reHandleShow(user)}>
                        Details
                      </button>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </section>

      <div>
        <Modal show={reShow} onHide={reHandleClose}>
          <RegisterFromModal
            reHandleClose={reHandleClose}
            clickPassword={handleClickShowPassword}
            valueShow={values.showPassword}
            user={userDetails||false}
            userUpdate={userUpdate}
          />
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
