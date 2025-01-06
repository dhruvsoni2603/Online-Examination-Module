/* eslint-disable react/prop-types */
import axiosInstance from "@/services/axiosInstance";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { toast } from "sonner";

const authenticator = async () => {
  try {
    const response = await axiosInstance.get("/imagekit/auth");

    if (response.status !== 200) {
      throw new Error(`Authentication request failed: ${response.statusText}`);
    }

    const data = response.data;
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export const Upload = ({ children, type, setData, setProgress }) => {
  const ref = useRef(null);

  const onError = (error) => {
    console.error("Image upload failed: ", error);
    toast.error("Image upload failed");
  };

  const onSuccess = (response) => {
    console.log("Image upload successful", response.url);
    setData(response.url);
  };

  const onUploadProgress = (progress) => {
    // console.log("Upload progress: ", progress);
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <div className="flex items-center gap-4">
        <IKUpload
          // fileName="test-upload.png"
          useUniqueFileName={true}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          accept={`${type}/*`}
          ref={ref}
          className="hidden"
        />
        <div className="cursor-pointer" onClick={() => ref.current.click()}>
          {children}
        </div>
      </div>
    </IKContext>
  );
};
