import { selectThree } from '../components/scenes/selectThree';

export const choosePet = () => {
  return selectThree([
    { img: 'https://pixel-pet-paradise.s3.amazonaws.com/assets/bunny.png', name: 'Bunny' },
    { img: 'https://pixel-pet-paradise.s3.amazonaws.com/assets/cat.png', name: 'Cat' },
    { img: 'https://pixel-pet-paradise.s3.amazonaws.com/assets/dog.png', name: 'Dog' },
  ]);
};
