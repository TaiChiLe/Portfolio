import ParticlesBg from 'particles-bg';
import './index.css';

export default function Hero() {
  return (
    <div className="flex flex-col max-w-200 m-auto h-80 relative">
      {/* Add particles background */}
      <ParticlesBg type="square" bg={false} />
      <div className="text-center text-5xl font-bold mt-0 md:mt-20 absolute ">
        A developer interested in designing systems that change the world.
      </div>
    </div>
  );
}
