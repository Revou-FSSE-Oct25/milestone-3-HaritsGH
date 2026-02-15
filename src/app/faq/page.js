export const dynamic = "force-static"
import Link from "next/link"

const FAQQnA = [
  {
    questionNumber:1,
    question:"Are you going to update this website?", 
    answer:"Maybe."
  },
  {
    questionNumber:2,
    question:"Are you a human?", 
    answer:"Yes."
  },
]

async function getFAQ() {
  return FAQQnA;
}

const FAQPage = async () => {
  const QueAns = await getFAQ();
  return (
    <div className="flex flex-col items-center">
      <Link href={"/"} className="underline hover:text-blue-600 active:text-red-600 mb-2 text-xl">Browse products</Link>
      <h2 className="text-2xl my-4">Frequently Asked Questions</h2>
      <ol className="list-decimal">
        {QueAns.map((qa) => (
          <li key={qa.questionNumber}>
            <p>{qa.question}</p>
            <strong>{qa.answer}</strong>
          </li>
          )
        )}
      </ol>
    </div>
  )
}

export default FAQPage
