import React, { useState, useEffect, useCallback } from 'react'
import axios from '../api/axios'
import './Row.css'
import MovieModal from './MovieModal'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import styled from 'styled-components';

const Row = ({ title, id, fetchUrl }) => {

    const [movies, setMovies] = useState([]); //전체영화정보
    const [isModalOpen, setIsModalOpen] = useState(false); //기본값은 false
    const [movieSelected, setMovieSelected] = useState({}); //특정영화하나여서 객체를 기본값으로

    //컴포넌트가 랜더링될때 함수가 다시 생성되기때문에 그것을 없대주기위해
    //useCallback을넣어주고 fetchUrl이 바뀔때 새로 생성되도록한다
    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        console.log('response', response);
        setMovies(response.data.results);
    }, [fetchUrl])

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData])

    /***
     * movie state를 넘겨줌
     */
    const handleClick = (movie) => {
        setMovieSelected(movie);
        setIsModalOpen(true);
    }

    return (
        <div>
            <h2>{title}</h2>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    1378: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    },
                    998: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    625: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    }
                }}
            >
                <Content id={id}>
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <img
                                key={movie.id}
                                className="row__poster"
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.name}
                                onClick={() => handleClick(movie)}
                            />
                        </SwiperSlide>
                    ))}
                </Content>

            </Swiper>


            {isModalOpen &&
                <MovieModal
                    {...movieSelected}
                    setIsModalOpen={setIsModalOpen}
                />
            }
        </div>
    )
}

export default Row

const Container = styled.div`
    padding: 0 0 26px;
`

const Content = styled.div`
`