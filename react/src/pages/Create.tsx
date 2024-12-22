import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Image, Film, ImagePlus, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Create: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      navigate(selectedOption);
    }
  };

  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <Card className="w-full max-w-md mx-auto mt-2">
        <Button className="w-full" onClick={() => handleBack()}>
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
      </Card>
      <Card className="w-full max-w-md mx-auto mt-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Crear Nuevo Post
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant={selectedOption === "single-image" ? "default" : "outline"}
            className="flex items-center justify-start h-16 text-lg"
            onClick={() => handleOptionClick("single-image")}
          >
            <ImagePlus className="w-6 h-6 mr-2" />
            Crear Post Instagram
          </Button>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="w-full"
          >
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Create;
