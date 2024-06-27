import PropTypes from 'prop-types';
import dummyImage from '../assets/images/dummyImage.webp';
import Image from 'next/image';

const Images = ({ alt, className = '', imageUrl = dummyImage, width = 200, height = 200 }) => {
  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={className || ''}
      width={width}
      height={height}
    />
  );
};

Images.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Images;
