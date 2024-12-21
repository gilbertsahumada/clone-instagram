import {
  BookmarkIcon,
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useWriteContract } from "wagmi";

export default function Like({ postId }: { postId: number }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const {
    writeContractAsync: sendTx,
    isSuccess,
    isPending,
    isError,
  } = useWriteContract();

  const likePost = async (idPost: number) => {
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
      functionName: "like",
      args: [BigInt(idPost)],
    });

    console.log(tx);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={() => likePost(postId)}>
        <motion.div
          whileTap={{ scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <HeartIcon
            className={`size-6 ${isLiked ? "text-red-500 fill-red-500" : ""}`}
          />
        </motion.div>
        <span className="sr-only">Like</span>
      </Button>
      <Button variant="ghost" size="icon">
        <MessageCircleIcon className="size-6" />
        <span className="sr-only">Comment</span>
      </Button>
      <Button variant="ghost" size="icon">
        <SendIcon className="size-6" />
        <span className="sr-only">Share</span>
      </Button>
    </div>
  );
}
