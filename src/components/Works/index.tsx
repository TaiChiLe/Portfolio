import { Image } from 'antd';

export default function Works() {
  return (
    <div className="flex flex-col max-w-200 m-auto mt-10">
      <div className="text-2xl font-bold pb-4">Selected Work</div>
      <div className="flex flex-row gap-6 items-center">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="src\assets\ToDo.jpg"
        />
        <div className="w-400">
          <div className="font-bold pb-4">A simple ToDo List</div>
          <div className="pb-4">
            Need to make lists and check off items in your to do? I got you!
          </div>
          <a href="src\projects\ToDo\index.html" className="underline">
            See it in action!
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center mt-4">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="src\assets\quizApp.jpg"
        />
        <div className="w-400">
          <div className="font-bold pb-4">A Quiz App with a timer</div>
          <div className="pb-4">
            Answer questions with a timer! You can also see the correct answer
            after you answer a question.
          </div>
          <a href="src\projects\QuizApp\quiz.html" className="underline">
            See it in action!
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center mt-4">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="src\assets\guessNumber.png"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Guess My Number Game</div>
          <div className="pb-4">
            Can you get a high score? Try to guess the number I am thinking of
            in the least amount of tries!
          </div>
          <a
            href="src\projects\GuessMyNumber\guessMyNum.html"
            className="underline"
          >
            See it in action!
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center mt-4">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="src\assets\pigGame.png"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Pig Game</div>
          <div className="pb-4">
            A fun dice game where you can play against a friend!
          </div>
          <a href="src\projects\PigGame\pigGame.html" className="underline">
            See it in action!
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center mt-4">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="src\assets\ProfilePage.jpg"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Profile Page</div>
          <div className="pb-4">A simple mock-up of a profile page.</div>
          <a href="src\projects\Profile\index.html" className="underline">
            See it in action!
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center mt-4">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="src\assets\Vitalogy.png"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Vitalogy</div>
          <div className="pb-4">
            A bootstrap website design submitted as a part of a competition.
          </div>
          <a href="src\projects\Vitalogy\index.html" className="underline">
            See it in action!
          </a>
        </div>
      </div>
    </div>
  );
}
