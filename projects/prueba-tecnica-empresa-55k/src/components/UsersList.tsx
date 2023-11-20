import { SortBy, type User } from "../types/users.types"

interface Props {
    users: User[];
    enableColors: boolean;
    handleDelete: (uuid: string) => void;
    handleChangeSorting: (sort: SortBy) => void;
}

export function UsersList({ users, enableColors, handleDelete, handleChangeSorting }: Props) {
    return (
        <table width="100%">
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className="pointer" onClick={() => handleChangeSorting(SortBy.NAME)}>Name</th>
                    <th className="pointer" onClick={() => handleChangeSorting(SortBy.LAST)}>Apellido</th>
                    <th className="pointer" onClick={() => handleChangeSorting(SortBy.COUNTRY)}>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {

                        const backgroundColor = index % 2 === 0 ? "#333" : "#555"
                        const color = enableColors ? backgroundColor : "transparent"

                        return (
                            <tr key={user.login.uuid} style={{ backgroundColor: color } }>
                                <td><img src={user.picture.thumbnail} alt="User image" /></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td><button onClick={() => handleDelete(user.login.uuid)}>Borrar</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
} 