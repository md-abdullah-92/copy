"use client";

import { listAll, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "./firebaseConfig";
import Image from "next/image";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]); // State to store the list of image URLs

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, "images/"); // Reference to the images directory in Firebase Storage

      try {
        const result = await listAll(imagesRef); // List all items in the images directory
        const urls = await Promise.all(result.items.map((item) => getDownloadURL(item))); // Get the download URLs for all images
        setImages(urls); // Set the list of image URLs
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages(); // Fetch images when the component mounts
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {images.map((url, index) => (
          <div
            key={url}
            style={{
              margin: 10,
              position: "relative",
              width: "300px",
              height: "500px",
            }}
          >
            <Image
              src={url}
              alt={`Image ${index}`}
              sizes="300px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
