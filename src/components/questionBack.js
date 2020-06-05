import React from 'react'

function questionBack({ questionInfo, handleAnswer }) {

    const { question, correct_answer, incorrect_answers: [inc1, inc2, inc3] } = questionInfo;
    const shuffled = [correct_answer, inc1, inc2, inc3]
        .filter((item) => item !== undefined) // not to get undefined value
        .sort(() => 0.5 - Math.random())
        .sort() // for not twice refresh shuffle 
        .map(
            (item) =>
                !!item &&
                item
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'")
                    .replace(/&micro/g, 'µ'),
        );

    console.log(shuffled);
    return (
        <div className="questionInfo">
            <h3>
                {question.replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'")
                    .replace(/&micro/g, "µ")
                }
            </h3>
            <div className="question-links">
                {
                    !!shuffled && shuffled.map((ans, index) => (
                        <span onClick={() => handleAnswer(ans, questionInfo)} key={index} className="answerLink">{index + 1}-{ans}</span>
                    )
                    )}
            </div>
        </div>
    )
}

export default questionBack
