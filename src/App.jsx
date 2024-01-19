import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./config/firebase";

const App = () => {
    const [movieList, setMovieList] = useState([]);
    const movieCollectionRef = collection(db, "movies");

    // movie state
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newMovieRelease, setNewMovieRelease] = useState(0);
    const [isNewMovieOscar, setNewMovieOscar] = useState(false);


    const getMovieList = async () => {
        try {
            const data = await getDocs(movieCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMovieList(filteredData);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        getMovieList();
        console.log('run');
    }, []);


    // add movie
    const onSubmitMovie = async () => {
        try {
            await addDoc(movieCollectionRef, {title: newMovieTitle, releaseDate: newMovieRelease, receivedAnOscar: isNewMovieOscar})
            getMovieList()
        } catch (err) {
            console.log(err);
        }
    }

    // delete movie
    const deleteMovie = async (id) => {
        try {
          const movieDoc = doc(db, 'movies', id);
          await deleteDoc(movieDoc);
        } catch (err) {
          console.log(err);
        }
        getMovieList();
      };

    return (
        <div>
            <Auth />
            <div>
                <input
                    type="text"
                    placeholder="movie title"
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="release data"
                    onChange={(e) => setNewMovieRelease(e.target.value)}
                />
                <input
                    type="checkbox"
                    placeholder="movie title"
                    onChange={(e) => setNewMovieOscar(e.target.checked)}
                    checked={isNewMovieOscar}
                />
                <label htmlFor="">received an oscar</label>
                <button onClick={onSubmitMovie}>Add Movie</button>
            </div>
            <div>
                {movieList.map((item) => {
                    return (
                        <div key={item.id} style={{border: '1px solid black', margin: '5px'}}>
                            <p>{item.title}</p>
                            <p>{item.releaseDate}</p>
                            {item.receivedAnOscar ? <p>won oscar</p> : ""}
                            <button onClick={() => deleteMovie(item.id)}>delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default App;
