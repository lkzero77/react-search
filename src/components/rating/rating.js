import React from 'react'
import './rating.scss'

const Rating = (props) => {
    const {currentRating = 0, numberOfStars = 5} = props;

    return (
        <div
            className="rating-star"
            data-rating={currentRating}
        >
            {[...Array(+numberOfStars).keys()].map(val => {
                return (
                    <span
                        className={`star ${currentRating >= val + 1 ? 'checked' : ''}`}
                        key={val + 1}
                        data-value={val + 1}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    )
}

export default Rating