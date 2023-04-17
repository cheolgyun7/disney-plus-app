import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

const DetailPage = () => {
    let { movieId } = useParams();
    const [movie, setMovie] = useState({});

    //useeffect로 요청보내기    
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `movie/${movieId}`
            )
            console.log('response', response);
            setMovie(response.data); //setmovie에 response.data를 넣어줌
        }
        fetchData();
    }, [movieId]); //movieId가 바뀔때마다 호출
    if (!movie) return null;
    return (
        <section>
            <img
                className='modal__poster-img'
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt="img"
            />
        </section>
    )
}

export default DetailPage