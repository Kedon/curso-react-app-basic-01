import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


const Slider = ({data}) => {

    return (
        <Carousel>
            {data.map((banana, index) => (
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banana.src}
                        alt={banana.alt}
                    />
                    <Carousel.Caption>
                        <h3>{banana.title}</h3>
                        <p>{banana.caption}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Slider;