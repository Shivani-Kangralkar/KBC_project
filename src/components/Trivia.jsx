import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../asset/play.mp3";
import correct from "../asset/correct.mp3";
import wrong from "../asset/wrong.mp3";


export default function Trivia({
    data,
    setStop ,
    questionNumber,
    setQuestionNumber,
}) {
    const[question,setQuestion]= useState(null);
    const[selectedAns,setSelectedAns]=useState(null);
    const[className,setClassName]=useState("ans");
    const[letsPlay]=useSound(play);
    const[correctAnswer] = useSound(correct);
    const[wrongAnswer] = useSound(wrong);

    useEffect(()=>{
        letsPlay();
    },[letsPlay]);
    
    useEffect(()=>{
        setQuestion(data[questionNumber - 1]);
    },[data,questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
          callback();
        }, duration);
      };

    const handleClick =(a)=>{
        setSelectedAns(a);
        setClassName("ans active");
        delay(3000, () => {
            setClassName(a.correct ? "ans correct" : "ans wrong");
         } );
          delay(5000,()=>{
              if(a.correct){
                correctAnswer();
                delay(1000,()=>{
                  setQuestionNumber((prev)=>prev + 1);
                  setSelectedAns(null);
                });    
              }
              else{
                wrongAnswer();
                delay(1000,()=>{
                setStop(true);
                })
              }
          });
    };
    return (
        <div className="trivia">
          <div className="question">
              {question?.question}
          </div>
          <div className="answers">
            {question?.answers.map((a) => (
              <div
                className={selectedAns === a ? className : "ans"}
                onClick={() => !selectedAns && handleClick(a)}
              >
                {a.text}
              </div>
            ))}
          </div>
        </div>
      );
    }
