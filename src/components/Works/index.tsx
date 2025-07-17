import { Image } from 'antd';

export default function Works() {
  return (
    <div className="flex flex-col max-w-200 m-auto mt-10">
      <div className="text-2xl font-bold pb-4">Selected Work</div>
      <div className="flex flex-row gap-6 items-center">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="\Portfolio\assets\tobereadlater.jpg"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Shareable Letter Style Posts</div>
          <div className="pb-4">
            To Be Read Later is a space for heartfelt connection. We believe
            that words carry weight, memories, and meaning — especially when
            shared with those we love. Our app lets you write and share
            letter-style posts with your loved ones, whether to be read now or
            saved for the future. It's a modern way to preserve emotions,
            stories, and messages that matter — creating a lasting legacy of
            love, reflection, and remembrance.
          </div>
          <a href="https://www.tobereadlater.com" className="underline">
            See it in action!
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center mt-4">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="\Portfolio\assets\popularOpinion.png"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Social Media Voting App</div>
          <div className="pb-4">
            Want a new way to interact with people on social media? This app
            allows you to create polls and vote on them!
          </div>
          <a href="https://taichile.github.io/popop/" className="underline">
            See it in action!
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center mt-4">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="\Portfolio\assets\ToDo.jpg"
        />
        <div className="w-400">
          <div className="font-bold pb-4">A simple ToDo List</div>
          <div className="pb-4">
            Need to make lists and check off items in your to do? I got you!
          </div>
          <a href="\Portfolio\projects\ToDo\index.html" className="underline">
            See it in action!
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center mt-4">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="\Portfolio\assets\quizApp.jpg"
        />
        <div className="w-400">
          <div className="font-bold pb-4">A Quiz App with a timer</div>
          <div className="pb-4">
            Answer questions with a timer! You can also see the correct answer
            after you answer a question.
          </div>
          <a href="\Portfolio\projects\QuizApp\quiz.html" className="underline">
            See it in action!
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center mt-4">
        <Image
          preview={false}
          className="rounded-2xl border-2"
          src="\Portfolio\assets\guessNumber.png"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Guess My Number Game</div>
          <div className="pb-4">
            Can you get a high score? Try to guess the number I am thinking of
            in the least amount of tries!
          </div>
          <a
            href="\Portfolio\projects\GuessMyNumber\guessMyNum.html"
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
          src="\Portfolio\assets\pigGame.png"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Pig Game</div>
          <div className="pb-4">
            A fun dice game where you can play against a friend!
          </div>
          <a
            href="\Portfolio\projects\PigGame\pigGame.html"
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
          src="\Portfolio\assets\ProfilePage.jpg"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Profile Page</div>
          <div className="pb-4">A simple mock-up of a profile page.</div>
          <a
            href="\Portfolio\projects\Profile\index.html"
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
          src="\Portfolio\assets\Vitalogy.png"
        />
        <div className="w-400">
          <div className="font-bold pb-4">Vitalogy</div>
          <div className="pb-4">
            A bootstrap website design submitted as a part of a competition.
          </div>
          <a
            href="\Portfolio\projects\Vitalogy\index.html"
            className="underline"
          >
            See it in action!
          </a>
        </div>
      </div>
      <div className="pb-20"></div>
    </div>
  );
}
