import { User } from "@/components/interfaces/data";

interface UserInfoRowProps {
    user: User;
    onDelete: () => void;
    onModify: () => void;
}

const UserInfoRow: React.FC<UserInfoRowProps> = ({ user, onDelete, onModify }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.address}</td>
            <td>{user.city}</td>
            <td>{user.country}</td>
            <td>
                <button 
                    onClick={onModify} 
                    className="bg-blue-500 text-white p-1 mx-1"
                >
                    Modify
                </button>
                <button 
                    onClick={onDelete} 
                    className="bg-red-500 text-white p-1 mx-1"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default UserInfoRow;
