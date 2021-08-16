import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import Image from 'next/image';


export default function Navbar() {
    const { user, username } = useContext(UserContext); 
    const router = useRouter();

    const signOut =  () => {
        auth.signOut();
        router.reload();
    }

    return (
        <nav className="navbar">
        <ul>
            <li>
                <Link href="/">
                    <a className="btn-logo"> 🏠 Home</a>
                </Link>
            </li>
            <li>
            <Link href="/">
                    <a className="btn-logo"> 🚀 Quick 10</a>
                </Link>
            </li>
            <li>
            <Link href="/">
                    <a className="btn-logo"> 🔥 Top 10</a>
                </Link>
            </li>

        {username && (
            <>
                <li className="push-left">
                    <button onClick={signOut}>Sign Out</button>
                </li>
                <li>
                    <Link href="/admin">
                        <a className="btn-blue">Share Due Dilligence</a>
                    </Link>
                </li>
                <li>
                    <Link href={`/${username}`}>
                        <a>
                            <img
                                src={user?.photoURL || '/hacker.png'} 
                                alt="image"/>
                        </a>
                    </Link>
                </li>
            </>
        )}


        {!username && (
            <li>
                <Link href="/enter">
                    <a className="btn-blue">Log in</a>
                </Link>
            </li>
            )}
        </ul>
        </nav>
    );
}