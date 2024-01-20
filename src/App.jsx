import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "./config/firebase";
import "./App.css"; // Import the CSS file

const App = () => {
    const [movieList, setMovieList] = useState([]);
    const movieCollectionRef = collection(db, "movies");

    // movie state
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newMovieRelease, setNewMovieRelease] = useState(0);
    const [isNewMovieOscar, setNewMovieOscar] = useState(false);

    const getMovieList = () => {
        try {
            const unsubscribe = onSnapshot(
                movieCollectionRef,
                (querySnapshot) => {
                    const newData = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setMovieList(newData);
                }
            );

            return () => unsubscribe(); // Unsubscribe when the component unmounts
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMovieList();
        console.log("run");
    }, []);

    // add movie
    const onSubmitMovie = async () => {
        try {
            await addDoc(movieCollectionRef, {
                title: newMovieTitle,
                releaseDate: newMovieRelease,
                receivedAnOscar: isNewMovieOscar,
            });
            setNewMovieTitle("");
            setNewMovieRelease(0);
            setNewMovieOscar(false);
        } catch (err) {
            console.log(err);
        }
    };

    // delete movie
    const deleteMovie = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id);
            await deleteDoc(movieDoc);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <Auth />
            <div className="movie-form">
                <input
                    type="text"
                    placeholder="movie title"
                    value={newMovieTitle}
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="release date"
                    value={newMovieRelease}
                    onChange={(e) => setNewMovieRelease(e.target.value)}
                />
                <input
                    type="checkbox"
                    onChange={(e) => setNewMovieOscar(e.target.checked)}
                    checked={isNewMovieOscar}
                />
                <label htmlFor="isNewMovieOscar">Received an Oscar</label>
                <button onClick={onSubmitMovie}>Add Movie</button>
            </div>
            <div className="movie-list">
                {movieList.map((item) => (
                    <div key={item.id} className="movie-card">
                        <p>{item.title}</p>
                        <p>{item.releaseDate}</p>
                        {item.receivedAnOscar ? <p>Won Oscar</p> : ""}
                        <button
                            className="delete-button"
                            onClick={() => deleteMovie(item.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
