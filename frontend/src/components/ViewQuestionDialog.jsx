/* eslint-disable react/prop-types */
import { Badge } from "./ui/badge";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";

export const ViewQuestionDialog = ({ selectedQuestion }) => {
  console.log(selectedQuestion);

  return (
    <div>
      <DialogContent
        aria-label="View question"
        className="bg-gray-900 min-w-[10rem]"
      >
        <DialogHeader>
          <DialogTitle>
            <div className="text-gray-100">
              <h1 className="text-lg font-bold m-0 p-0 mb-2">View Question</h1>
              <Separator className="mb-2" />
              <h2
                className="text-2xl font-bold max-w-[90%] overflow-ellipsis overflow-hidden"
                dangerouslySetInnerHTML={{ __html: selectedQuestion?.text }}
              />
            </div>
          </DialogTitle>
        </DialogHeader>
        <div>
          {/* Badges */}
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-700 hover:bg-blue-800 cursor-default">
              {selectedQuestion?.category}
            </Badge>
            <Badge className="bg-purple-700 hover:bg-purple-800 cursor-default">
              {selectedQuestion?.type}
            </Badge>
            <Badge className="bg-red-700 hover:bg-red-800 cursor-default">
              {selectedQuestion?.difficultyLevel}
            </Badge>
            <Badge className="bg-yellow-700 hover:bg-yellow-800 cursor-default">
              Marks: {selectedQuestion?.marks}
            </Badge>
          </div>
          {/* Options */}
          {selectedQuestion?.type === "MCQ" ? (
            <div className="flex flex-col items-center justify-center gap-2 mt-4">
              {selectedQuestion?.options.map((option, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-2 bg-gray-800 py-2 px-4 rounded-md w-full"
                >
                  <div className="text-lg font-medium text-gray-100 flex items-center gap-2">
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: `${option.text}`,
                      }}
                    />
                    {option.isCorrect && (
                      <Badge className="bg-green-700">Correct</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-8">
              <h3 className="text-lg font-bold text-gray-100">
                Reference Answer:
              </h3>
              <div className="flex justify-between items-center gap-2 bg-gray-800 py-2 px-4 rounded-md w-full">
                <div className="text-lg font-medium text-gray-100">
                  <div
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: selectedQuestion?.referenceAnswer,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </div>
  );
};
