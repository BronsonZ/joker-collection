import {Cloudinary} from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
    cloud: {
      cloudName: 'dar0pitop'
    }
  });

export const createImageUrl = (id) => {
  
    const myImage = cld.image(id);

    myImage
    .quality(40)
    .format('webp')
    .resize(fill().width(500).height(700))

    return myImage;
}

export const createSingleImageUrl = (id) => {
  
    const myImage = cld.image(id);

    myImage
    .quality(90)
    .format('webp')

    return myImage;
}