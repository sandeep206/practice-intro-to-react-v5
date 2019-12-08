import React from 'react';

class Carousel extends React.Component {
  state = { 
    photos: [],
    active: 0
  };

  static getDerivedStateFromProp({ media }) {
    let photos = ['http://placeorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({large}) => large);
    }

    return photos;
  }

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index
    })
  }
  render() {
    const {photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-small">
          {
            photos.map((photo, index) => (
              // eslint-disable-next-line
              <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className= {index === active ? "active" : ""}
              alt="aniaml thumbnail" />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel;