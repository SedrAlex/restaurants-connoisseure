import { useRouter } from "next/router";
import Link from "next/link";
import CoffeStoresData from "../../data/coffee-stores.json";
import Head from "next/Head";
import styles from "../../styles/cake-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCakeStores } from "../../lib/cakes-stores";


export async function getStaticProps(staticProps) {

  const params = staticProps.params;
  const cakeStores = await fetchCakeStores();
  const findCakeStoreById = cakeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  })

  return {
    props: {
      CoffeStore: findCakeStoreById ? findCakeStoreById : {}  ,
    },
  };
}

export async function getStaticPaths() {
  const cakesStores = await fetchCakeStores()
  const paths = cakesStores.map((coffeStore) => {
    return {
      params: {
        id: coffeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true ,
  };
}

const handleUpvoteButton = () => {
  console.log("handle upvote");
};
const CakeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name,locality,imgUrl } = props.CoffeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>

          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={imgUrl || "https://i1.fnp.com/images/pr/l/v20181026212033/pineapple-cake-half-kg_1.jpg"} 
            width={600}
            height={360}
            alt={name}
          ></Image>
        </div>

        <div className={cls("glass", styles.col2)}>
          { address &&(
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" />
            <p className={styles.text}>{address}</p>
          </div>
          )}
          {locality && (
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" />
            <p className={styles.text}>{locality}</p>
          </div>
)} 
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CakeStore;
