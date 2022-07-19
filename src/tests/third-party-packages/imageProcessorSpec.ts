import { resizeImage } from '../../third-party-packages/image-processor';

describe('Test image processor suite', () => {
  it('resize an existing image', async () => {
    const imagePath = await resizeImage('encenadaport.jpg', 100, 100);
    expect(imagePath).toBeDefined();
  });

  it('resize non existing image', async () => {
    const imagePath = await resizeImage('image.jpg', 100, 100);
    expect(imagePath).toBeFalsy();
  });
});
