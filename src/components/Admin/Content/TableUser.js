const TableUser = (props) => {
    const {listUsers} = props // bằng với const {listUsers} = props.listUsers

    return(
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th> 
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return(
                                <tr key = {`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary">View</button> {/*class của Bootstrap */}
                                        <button 
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(item)}

                                        >
                                            Update
                                        </button> {/*mx-3: margin left và margin right: 3px */}
                                        <button className = "btn btn-danger">Delete</button> {/*class của Bootstrap */}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 && 
                        <tr>
                            <td colSpan = {'4'}>
                                Not found data
                            </td>
                        </tr>
                    }
                </tbody>
            </table>        
        </>
    )
}
export default TableUser


