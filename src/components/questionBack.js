import React from 'react'

function questionBack({ questionInfo, handleAnswer }) {

    const { question, correct_answer, incorrect_answers: [inc1, inc2, inc3] } = questionInfo;
    const answers = [correct_answer, inc1, inc2, inc3];
    const shuffled = answers.sort(() => 0.5 - Math.random());
    let filterShuffled = shuffled.filter(item => item !== undefined); // If we had true and false answers.

    filterShuffled = filterShuffled.map(item => (
        item.replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&micro/g, "µ")
    ));

    console.log(filterShuffled);
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
                    !!filterShuffled && filterShuffled.map((ans, index) => (
                        <span onClick={() => handleAnswer(ans, questionInfo)} key={index} className="answerLink">{index + 1}-{ans}</span>
                    )
                    )}
            </div>
        </div>
    )
}

export default questionBack
