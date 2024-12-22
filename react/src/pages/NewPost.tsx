import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";
import React, { useState } from "react";
import { AlertCircle, CircleCheck } from "lucide-react";
import { uploadFile, uploadMetadataToPinata } from "@/utils/pinata";
// Transacciones blockchain
import { useWriteContract } from "wagmi";

const postSchema = z.object({
  files: z.array(z.instanceof(File)).nonempty("At least one file is required"),
  description: z
    .string()
    .min(10, "Description is required and Min length is 10"),
});

export default function NewPost() {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const {
    writeContractAsync: sendTx,
    isSuccess,
    isPending,
    isError,
  } = useWriteContract();

  // Maneja el cambio en los archivos
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  // Maneja el cambio en la descripcion
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  // Creacion de Posts
  const handlePost = async () => {
    const validationResult = postSchema.safeParse({
      files: files,
      description,
    });

    if (!validationResult.success) {
      let localErrors: string[] = [];
      console.log(validationResult.error.errors);
      validationResult.error.errors.forEach((e) => {
        localErrors.push(e.message);
      });
      setErrors(localErrors);
    } else {
      setErrors([]);
      const pinImage = await uploadFile(files[0]);
      const pinMetadata = await uploadMetadataToPinata(
        "Post Instagram",
        description,
        pinImage || ""
      );
      console.log(pinMetadata);

      const post = {
        description: description,
        uri: pinMetadata,
      };

      const tx = await sendTx({
        abi: [
          {
            inputs: [
              {
                internalType: "uint256",
                name: "postId",
                type: "uint256",
              },
            ],
            name: "PostDoesNotExist",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "uint256",
                name: "postId",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "address",
                name: "user",
                type: "address",
              },
            ],
            name: "Like",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "uint256",
                name: "postId",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "PostAdded",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "uint256",
                name: "postId",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "address",
                name: "user",
                type: "address",
              },
            ],
            name: "Unlike",
            type: "event",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "description",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "uri",
                    type: "string",
                  },
                ],
                internalType: "struct Instagram.Post",
                name: "_post",
                type: "tuple",
              },
            ],
            name: "addPost",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_start",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_end",
                type: "uint256",
              },
            ],
            name: "getAllPosts",
            outputs: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "description",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "uri",
                    type: "string",
                  },
                ],
                internalType: "struct Instagram.Post[]",
                name: "",
                type: "tuple[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_postId",
                type: "uint256",
              },
            ],
            name: "getLikesOfPost",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_postId",
                type: "uint256",
              },
            ],
            name: "getPost",
            outputs: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "description",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "uri",
                    type: "string",
                  },
                ],
                internalType: "struct Instagram.Post",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_user",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_postId",
                type: "uint256",
              },
            ],
            name: "getPostUser",
            outputs: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "description",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "uri",
                    type: "string",
                  },
                ],
                internalType: "struct Instagram.Post",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_user",
                type: "address",
              },
            ],
            name: "getPostsCounterByUser",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_postId",
                type: "uint256",
              },
            ],
            name: "getUri",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_postId",
                type: "uint256",
              },
            ],
            name: "like",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "s_postCounterId",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_postId",
                type: "uint256",
              },
            ],
            name: "unlike",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        address: "0xD51460104000b19d855ef873c03897ea1E17c407",
        functionName: "addPost",
        args: [{ description: post.description, uri: post.uri! }],
      });

      console.log("tx hash : ", tx);
      //Agregando transaccion a la blockchain
    }
  };

  return (
    <Card className="w-full max-w-sm mt-2 mx-auto">
      <CardHeader className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold">Create Instagram Post</h2>
        <p className="text-muted-foreground">Add an image and description</p>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div>
          <Label htmlFor="image">Image</Label>
          <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-muted-foreground/30 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="flex text-sm text-muted-foreground">
                <label
                  htmlFor="image"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-foreground"
                >
                  <span>Upload a file</span>
                  <Input
                    id="image"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleFilesChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={3}
            className="mt-1 w-full"
            placeholder="Write a description..."
            onChange={handleDescriptionChange}
          />
        </div>
        <Alert variant={"destructive"}>
          <AlertCircle className="size-4" />
          <AlertTitle>Errors</AlertTitle>
          <AlertDescription className="flex flex-col">
            {errors &&
              errors.map((e, index) => <label key={index}>- {e}</label>)}
          </AlertDescription>
        </Alert>
        <Alert className="bg-green-500">
          <CircleCheck className="size-4" />
          <AlertTitle>Message</AlertTitle>
          <AlertDescription className="flex flex-col">
            {errors &&
              errors.map((e, index) => <label key={index}>- {e}</label>)}
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-end p-6">
        <Button onClick={handlePost}>Post</Button>
      </CardFooter>
    </Card>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
