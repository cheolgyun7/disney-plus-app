import React, { useRef } from 'react'
// import useOnClickOutside from '../../hooks/useOnClickOutside';
import './MovieModal.css';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const MovieModal = ({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setIsModalOpen
}) => {

    const ref = useRef();
    console.log(ref.current);
    useOnClickOutside(ref, () => setIsModalOpen(false))

    return (
        <div className='presentation'>
            <div className='wrapper-modal'>
                <div className='modal' ref={ref}>
                    <span className='modal-close'
                        onClick={() => setIsModalOpen(false)}
                    >X</span>

                    <img
                        className='modal__poster-img'
                        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                        alt="modal__poster-img"
                    />

                    <div className='modal__content'>
                        <p className='modal__details'>
                            <span>
                                100% for you
                            </span>
                            {release_date ? release_date : first_air_date}
                        </p>
                        <h2 className='modal__title'>{title ? title : name}</h2>
                        <p className='modal__overview'>평점: {vote_average}</p>
                        <p className='modal__overview'>{overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal