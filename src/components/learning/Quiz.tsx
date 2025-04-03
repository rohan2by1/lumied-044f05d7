
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronRight, 
  RefreshCw,
  Timer
} from "lucide-react";
import { quizzes } from "@/data/mockData";
import { Quiz, Question } from "@/types";

interface QuizComponentProps {
  quizId: string;
}

export default function QuizComponent({ quizId }: QuizComponentProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundQuiz = quizzes.find(q => q.id === quizId) || null;
      setQuiz(foundQuiz);
      setLoading(false);
    }, 500);
  }, [quizId]);
  
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };
  
  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    if (!quiz) return;
    
    let correctAnswers = 0;
    
    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (
        Array.isArray(question.correctAnswer) && 
        Array.isArray(userAnswer) &&
        userAnswer.length === question.correctAnswer.length &&
        userAnswer.every(ans => question.correctAnswer.includes(ans))
      ) {
        correctAnswers++;
      } else if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const calculatedScore = (correctAnswers / quiz.questions.length) * 100;
    setScore(calculatedScore);
    
    const passed = calculatedScore >= quiz.passingScore;
    setSubmitted(true);
    
    toast({
      title: passed ? "Quiz Completed Successfully!" : "Quiz Results",
      description: passed 
        ? `You scored ${calculatedScore.toFixed(0)}% and passed the quiz.`
        : `You scored ${calculatedScore.toFixed(0)}%. ${quiz.passingScore}% required to pass.`,
      variant: passed ? "default" : "destructive",
    });
  };
  
  const handleRetry = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSubmitted(false);
    setScore(0);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin">
          <RefreshCw className="h-10 w-10 text-primary" />
        </div>
      </div>
    );
  }
  
  if (!quiz) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Not Found</CardTitle>
          <CardDescription>The requested quiz does not exist.</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  if (submitted) {
    const passed = score >= quiz.passingScore;
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{passed ? "Congratulations!" : "Quiz Results"}</CardTitle>
          <CardDescription>
            You've completed the {quiz.title}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-full w-24 h-24 bg-muted mb-4">
              {passed ? (
                <CheckCircle className="h-12 w-12 text-green-500" />
              ) : (
                <XCircle className="h-12 w-12 text-red-500" />
              )}
            </div>
            <h3 className="text-2xl font-bold">{score.toFixed(0)}%</h3>
            <p className="text-muted-foreground">
              {passed
                ? "You've successfully passed the quiz!"
                : `You need ${quiz.passingScore}% to pass the quiz.`}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Quiz Summary</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Your Score</span>
                  <span>{score.toFixed(0)}%</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Passing Score</span>
                  <span>{quiz.passingScore}%</span>
                </div>
                <Progress value={quiz.passingScore} className="h-2" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Answers Review</h4>
            <div className="space-y-3">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question.id] || "";
                const correctAnswer = Array.isArray(question.correctAnswer)
                  ? question.correctAnswer.join(", ")
                  : question.correctAnswer;
                const isCorrect = 
                  Array.isArray(question.correctAnswer) && Array.isArray(userAnswer)
                    ? userAnswer.length === question.correctAnswer.length &&
                      userAnswer.every(ans => question.correctAnswer.includes(ans))
                    : userAnswer === question.correctAnswer;
                  
                return (
                  <div key={question.id} className="p-3 rounded-lg border">
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Question {index + 1}: {question.text}</p>
                        <div className="mt-1 text-sm">
                          <p className="text-muted-foreground">
                            Your answer: <span className={isCorrect ? "text-green-500" : "text-red-500"}>
                              {userAnswer || "Not answered"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-muted-foreground">
                              Correct answer: <span className="text-green-500">{correctAnswer}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleRetry}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry Quiz
          </Button>
          <Button>
            Continue Learning
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const questionProgress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>{quiz.title}</CardTitle>
          {quiz.timeLimit && (
            <Badge variant="outline" className="flex items-center">
              <Timer className="mr-1 h-3 w-3" /> 
              {quiz.timeLimit} minutes
            </Badge>
          )}
        </div>
        <CardDescription>{quiz.description}</CardDescription>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span>{Math.round(questionProgress)}% Complete</span>
          </div>
          <Progress value={questionProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {currentQuestionIndex + 1}. {currentQuestion.text}
          </h3>
          
          {currentQuestion.type === "multiple-choice" && (
            <RadioGroup
              value={answers[currentQuestion.id] as string || ""}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            >
              {currentQuestion.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2 p-2 border rounded-md">
                  <RadioGroupItem value={option} id={`option-${option}`} />
                  <Label htmlFor={`option-${option}`} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          
          {currentQuestion.type === "true-false" && (
            <RadioGroup
              value={answers[currentQuestion.id] as string || ""}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            >
              <div className="flex items-center space-x-2 p-2 border rounded-md">
                <RadioGroupItem value="True" id="option-true" />
                <Label htmlFor="option-true" className="flex-grow cursor-pointer">
                  True
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded-md">
                <RadioGroupItem value="False" id="option-false" />
                <Label htmlFor="option-false" className="flex-grow cursor-pointer">
                  False
                </Label>
              </div>
            </RadioGroup>
          )}
        </div>
        
        {!answers[currentQuestion.id] && (
          <div className="flex items-center p-2 bg-amber-50 text-amber-800 rounded-md">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">Please select an answer to continue</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <div className="flex space-x-2">
          {isLastQuestion ? (
            <Button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < quiz.questions.length}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              disabled={!answers[currentQuestion.id]}
            >
              Next Question
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
