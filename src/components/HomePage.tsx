import { Hero } from './Hero';
import { About } from './About';
import { Education } from './Education';
import { Footer } from './Footer';

interface HomePageProps {
  setCurrentPage: (page: 'home' | 'projects' | 'rss') => void;
}

export function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <About />
      <Education />
      <Footer />
    </>
  );
}
