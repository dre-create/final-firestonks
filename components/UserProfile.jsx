

export default function UserProfile({ user }) {
    return (
        <div className="box-center">
            <img
                src={user.photoURL || '/hacker.png'} 
                className="card-img-center" 
                alt ="image"/>
            <p>
                <i>@{user.username}</i> 
            </p>
            <h1>Posts by {user.username}</h1>
        </div>
    );
}  
