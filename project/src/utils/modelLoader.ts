import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel | null = null;

export async function loadModel() {
  if (!model) {
    // Note: In a production environment, you would host your own model
    // This is a placeholder URL - you need to replace it with your actual model URL
    model = await tf.loadLayersModel('https://your-model-url/model.json');
  }
  return model;
}

export async function preprocessImage(imageElement: HTMLImageElement) {
  // Convert the image to a tensor
  const tensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224]) // Resize to model input size
    .toFloat()
    .expandDims();
  
  // Normalize the image
  return tensor.div(255.0);
}

export async function predict(image: HTMLImageElement) {
  const modelInstance = await loadModel();
  const preprocessedImage = await preprocessImage(image);
  
  const prediction = await modelInstance.predict(preprocessedImage) as tf.Tensor;
  const result = await prediction.data();
  
  // Cleanup
  preprocessedImage.dispose();
  prediction.dispose();
  
  return result[0];
}