import { useState, useEffect } from "react";

export default function ImagePost({ uri }: { uri: string }) {
  const [srcImage, setSrcImage] = useState<string>("");

  useEffect(() => {
    if (uri) {
      const fetchImage = async () => {
        const response = await fetch(uri);
        const jsonReponse = await response.json();
        setSrcImage(jsonReponse.image);
      };

      fetchImage();
    }
  }, [uri]);

  return (
    <img
      src={srcImage}
      alt="Image"
      width={400}
      height={400}
      className="object-cover aspect-square"
    />
  );
}
