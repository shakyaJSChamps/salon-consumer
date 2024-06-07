import PropTypes from 'prop-types';
import dummyImage from '../assets/images/dummyImage.webp';
import Image from 'next/image';

const Images = ({ alt, className, imageUrl }) => {
  return (
    <Image
      src={imageUrl ? imageUrl : dummyImage}
      alt={alt}
      className={className}
      width={300} 
      height={200}
    />
  );
};

Images.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
};

export default Images;
