import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="s px-4 md:px-6">
        <div className="flex flex-col space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to Instagram Web3
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Experience the future of social media with our decentralized,
              blockchain-powered Instagram clone.
            </p>
          </div>
          <div className="space-x-4">
            <Link to="/feed">
              <Button>Explore Feed</Button>
            </Link>
            <Link to="/create">
              <Button variant="outline">Create Post</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
