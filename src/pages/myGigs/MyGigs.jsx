import React from 'react'
import styles from './myGigs.module.css'
import { Link } from 'react-router'

const MyGigs = () => {
  return (
     <div className={styles.myGigs}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>Gigs</h1>
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
              <tr key={gig._id}>
                <td>
                  <img className={styles.image} src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                </td>
                <td>Gig1</td>
                <td>88</td>
                <td>123</td>
                <td>
                  <img
                    className={styles.delete}
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
          </table>
        </div>
    </div>
  )
}

export default MyGigs