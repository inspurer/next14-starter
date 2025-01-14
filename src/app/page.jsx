import Link from 'next/link';
import styles from './home.module.css'
import Image from 'next/image';

const Home = () => {
  return <div className={styles.container}>
    <div className={styles.textContainer}>
      <h1 className={styles.title}>Creative Thoughts Agency.</h1>
      <p className={styles.desc}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
        blanditiis adipisci minima reiciendis a autem assumenda dolore.
      </p>
      <div className={styles.buttons}>
        <Link className={styles.button} href='/about'>Learn More</Link>
        <Link className={styles.button} href='/nearby'>Try Now</Link>
      </div>
      <div className={styles.brands}>
        <Image src="/brands.png" alt="" fill className={styles.brandImg}/>
      </div>
    </div>
    <div className={styles.imgContainer}>
    <Image src="/hero.gif" alt="" fill className={styles.heroImg}/>
    </div>
  </div>
};

export default Home;