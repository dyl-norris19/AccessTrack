import { imagesRef } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Uploads an image to Firebase Storage
// takes a file as an argument
// returns the download URL of the image, which should ideally be saved in the database
export async function uploadImage(file) {
  const storageRef = ref(imagesRef, file.name);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!");
  } catch (error) {
    console.error(error);
  }

  // uploadTask.then(
  //   (snapshot) => {
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     console.log("Uploaded a blob or file!");
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );

  // Upload completed successfully, now we can get the download URL
  return getDownloadURL(ref(imagesRef, file.name)).then((url) => {
    console.log("File available at", url);
    return url;
  });
}

// // returns the download URL of the image
// export function downloadImage(url, imgID) {
//     const img = document.getElementById("img");
//     img.src = url;

// }
