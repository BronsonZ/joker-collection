import {Cloudinary} from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { dpr } from "@cloudinary/url-gen/actions/delivery";

const cld = new Cloudinary({
    cloud: {
      cloudName: 'dar0pitop'
    }
  });

export const createImageUrl = (id) => {
  
    const myImage = cld.image(id);

    myImage
    .quality('auto')
    .format('webp')
    .resize(fill().width(500).height(700))
    .delivery(dpr('auto'))

    return myImage;
}

export const createSingleImageUrl = (id) => {
  
    const myImage = cld.image(id);

    myImage
    .quality('auto')
    .format('webp')
    .delivery(dpr('auto'))

    return myImage;
}